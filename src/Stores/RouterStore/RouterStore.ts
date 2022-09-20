import {
  generatePath as routerGeneratePath,
  match as routerMatch,
  matchPath as routerMatchPath,
  RouteProps
} from "react-router";
import { RouterStore as MobxRouterStore } from "mobx-react-router";
import { History, Location, LocationDescriptorObject } from "history";
import { injectable } from "inversify";
import { computed, makeObservable } from "mobx";
import { parse as parseQuery, stringify as stringifyQuery } from "query-string";
import { ILocation, UrlOptionsType } from "./Types";
import { IRouterStore } from "./IRouterStore";
import { DisposableStore, ValueBoxStore } from "@Infrastructure/Stores";

@injectable()
export class RouterStore implements IRouterStore {

  private readonly _mobxRoutingStore: MobxRouterStore;

  private readonly _location = new ValueBoxStore<Location<unknown>>();

  private readonly _disposer = new DisposableStore();

  constructor(mobxRoutingStore: MobxRouterStore) {
    makeObservable(this);

    this.isCurrentUrlMatchedTo = this.isCurrentUrlMatchedTo.bind(this);
    this.parseParams = this.parseParams.bind(this);
    this.pushPath = this.pushPath.bind(this);
    this.pushPathOrReload = this.pushPathOrReload.bind(this);
    this.reload = this.reload.bind(this);
    this.matchPath = this.matchPath.bind(this);
    this.generatePath = this.generatePath.bind(this);

    this.navigate = this.navigate.bind(this);

    this._mobxRoutingStore = mobxRoutingStore;

    this._disposer.push(
      mobxRoutingStore.history.listen(location => this._location.set(location)),
    );
  }

  private get currentUrlFromLocation(): string {
    const location = this._mobxRoutingStore.location;

    return [
      location.pathname,
      (location.search ? "?" + location.search : null),
      (location.hash ? "#" + location.hash : null),
    ]
      .filter(x => !!x)
      .join("");
  }

  public generatePath<TParameters>(route: string, params?: TParameters): string {
    return routerGeneratePath(route, params);
  }

  public matchPath<TParameters>(
    pathName: string,
    props: string | string[] | RouteProps,
    parent?: routerMatch<TParameters>
  ): routerMatch<TParameters> | null {
    return routerMatchPath<TParameters>(pathName, props, parent);
  }

  @computed
  public get location(): Location {
    return this._location.value || this._mobxRoutingStore.location;
  }

  public get history(): History {
    return this._mobxRoutingStore.history;
  }

  public parseParams<TParameters>(pattern: string): TParameters | null {
    const path = this.matchPath<TParameters>(this._mobxRoutingStore.location.pathname, pattern);

    return path && path.params || null;
  }

  public parseQueryString<TResult>(value: string): TResult {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return parseQuery(value) as any as TResult;
  }

  public parseCurrentQueryString<TResult>(): TResult {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return parseQuery(this.location.search) as any as TResult;
  }

  public makeQueryString<T>(value: T): string {
    return stringifyQuery(value);
  }

  public pushPath<TParameters, TState>(
    path: string,
    params?: TParameters,
    state?: TState
  ): void;

  public pushPath<TParameters, TState>(location: ILocation<TParameters, TState>): void;

  public pushPath<TParameters, TState>(
    location: string | ILocation<TParameters, TState>,
    params?: TParameters,
    state?: TState
  ): void {
    if (typeof location === "object") {
      const pushToLocation: LocationDescriptorObject<TState> = {
        hash: location.hash,
        key: location.key,
        pathname: this.generatePath(location.pathname || "", location.params),
        search: location.search,
        state: location.state,
      };

      this._mobxRoutingStore.push(pushToLocation);
    } else {
      const path = this.generatePath(location, params);
      this._mobxRoutingStore.push(path, state);
    }
  }

  public pushPathOrReload<TParameters, TState, TUrlOptions>(
    path: string,
    params?: TParameters,
    state?: TState,
    options: UrlOptionsType<TUrlOptions> = {
      exact: true
    }
  ): void {
    const route = this.generatePath(path, params);
    if (this.isCurrentUrlMatchedTo(route, options)) {
      this.reload();
    } else {
      this.pushPath(path, params, state);
    }
  }

  public isCurrentUrlMatchedTo<TUrlOptions>(
    path: string,
    options: UrlOptionsType<TUrlOptions>
  ): boolean {
    const match = this.matchPath(
      this.location.pathname,
      {
        path,
        ...options
      }
    );

    return Boolean(match);
  }

  public reload(): void {
    const {
      hash,
      pathname,
      search,
      state,
    } = this.location;

    setImmediate(() => this._mobxRoutingStore.replace({
      hash,
      pathname,
      search,
      state,
    }));
  }

  public navigate<TParameters>(route: string, params?: TParameters): void {
    window.location.href = this.generatePath(route, params);
  }

  public dispose = (): Promise<void> => {
    return this._disposer.dispose();
  }

}

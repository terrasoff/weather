import { injectable } from "inversify";
import { Service, ServiceIdentifier } from "@Container";
import { ICurrentUserStore } from "@Stores/CurrentUser";
import { IAuthStore } from "./IAuthStore";
import { IRouterStore } from "@Stores/RouterStore";
import { computed, makeObservable, reaction } from "mobx";
import { DisposableStore } from "@Infrastructure/Stores";
import { WeatherRoutes } from "@App/Weather/Routes";
import { removeVowels } from "../../Helpers/RemoveVowels";

@injectable()
export class AuthStore implements IAuthStore {

  @Service(ServiceIdentifier.CurrentUserStore)
  private readonly _currentUserStore: ICurrentUserStore;

  @Service(ServiceIdentifier.RouterStore)
  private readonly _routerStore: IRouterStore;

  private readonly _disposer = new DisposableStore();

  constructor() {
    makeObservable(this);
  }

  @computed
  public get isAuthenticated(): boolean {
    return this._currentUserStore.isAuthenticated;
  }

  private addCheckAuthReaction(): void {
    this._disposer.push(
      reaction(
        () => this._currentUserStore.user,
        this.checkAuth,
      )
    );
  }

  private checkAuth = (): void => {
    if (this.isAuthenticated) {
      this._routerStore.pushPath(WeatherRoutes.Weather);
    } else {
      this._routerStore.pushPath(WeatherRoutes.Home);
    }
  };

  public init = (): void => {
    this.checkAuth();
    this.addCheckAuthReaction();
  };

  public login = (
    name: string,
    password: string,
  ): void => {
    const isAuthenticated = password === removeVowels(name);

    if (isAuthenticated) {
      this._currentUserStore.set({
        name,
      });
    }
  };

  public logout = (): void => {
    this._currentUserStore.reset();
  };

  public dispose = (): Promise<void> => {
    return this._disposer.dispose();
  };

}

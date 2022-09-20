import { match, RouteProps } from "react-router";
import { History, Location } from "history";
import { ILocation, UrlOptionsType } from "./Types";
import { IDisposable } from "@Infrastructure/Stores";

export interface IRouterStore extends IDisposable {

  readonly history: History;

  readonly location: Location;

  generatePath<TParameters, TState>(pattern: ILocation<TParameters, TState> | string, params?: TParameters): string;

  matchPath<TParameters>(
    pathName: string,
    props?: string | Array<string> | RouteProps | null,
    parent?: match<TParameters>
  ): match<TParameters> | null;

  /**
   * Tries to extract parameter values for the specified route from the current address.
   *
   * @param pattern Route pattern. For example: Routes.SomeName.
   */
  parseParams<TParameters>(pattern: string): TParameters | null;

  /**
   * Parses a query string and returns an object containing the values found.
   *
   * @param value The query string to parse.
   */
  parseQueryString<TResult>(value: string): TResult;

  /**
   * Parses current query string and returns an object containing the values found.
   *
   * @param value The query string to parse.
   */
  parseCurrentQueryString<TResult>(): TResult;

  /**
   * Converts an object to a query string.
   *
   * @param value The object for convert to the query string.
   */
  makeQueryString<T>(value: T): string;

  /**
   * Pushes a new entry into the history stack using the generatePath function.
   * If the path is same the page will be reloaded.
   *
   * @param path Path or route patter. For example: Routes.SomeName, or "/somepath/:id".
   * @param params Parameters to be inserted into the route. For example: { id: 123 }
   * @param state The state to be passed to the route.
   */
  pushPathOrReload<TParameters, TState>(
    path: string,
    params?: TParameters,
    state?: TState
  ): void;

  /**
   * Pushes a new entry into the history stack using the generatePath function.
   *
   * @param path Path or route patter. For example: Routes.SomeName, or "/somepath/:id".
   * @param params Parameters to be inserted into the route. For example: { id: 123 }
   * @param state The state to be passed to the route.
   */
  pushPath<TParameters, TState>(
    path: string,
    params?: TParameters,
    state?: TState
  ): void;

  /**
   * Pushes a new entry into the history stack using the generatePath function.
   *
   * @param location Parameters of the new location.
   */
  pushPath<TParameters, TState>(location: ILocation<TParameters, TState>): void;

  /**
   * Check if current location url is matched to given path with options.
   *
   * @param path
   * @param options
   */
  isCurrentUrlMatchedTo<TParameters>(
    path: string,
    options?: UrlOptionsType<TParameters>
  ): boolean;

  /**
   * Reloads current page.
   */
  reload(): void;

  /**
   * Navigate to the location without history.
   */
  navigate<TParameters>(route: string, params?: TParameters): void;

}

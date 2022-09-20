export interface ILocation<TParameters, TState> {

  pathname?: string;

  params?: TParameters;

  state?: TState;

  search?: string;

  hash?: string;

  key?: string;

}

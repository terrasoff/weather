export interface IErrorHandlerStore {

  handle(error: Error | string): void;

}

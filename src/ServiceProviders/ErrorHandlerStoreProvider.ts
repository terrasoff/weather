import { ContainerServiceProvider, ServiceIdentifier } from "@Container";
import { ErrorHandlerStore, IErrorHandlerStore } from "@Stores/ErrorHandler";

export class ErrorHandlerStoreProvider extends ContainerServiceProvider {

  public build = (): void => {
    const store = new ErrorHandlerStore();
    this._container
      .bind<IErrorHandlerStore>(ServiceIdentifier.ErrorHandlerStore)
      .toConstantValue(store);
  }

}

import { ContainerServiceProvider, ServiceIdentifier } from "@Container";
import { IStorageService, StorageService } from "@Infrastructure/Services";

export class StorageServiceProvider extends ContainerServiceProvider {

  public build = (): void => {
    this._container
      .bind<IStorageService>(ServiceIdentifier.StorageService)
      .to(StorageService)
      .inSingletonScope();
  }

}

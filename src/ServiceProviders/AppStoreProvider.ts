import { ContainerServiceProvider, ServiceIdentifier } from "@Container";
import { AppStore, IAppStore } from "@Components/App";

export class AppStoreProvider extends ContainerServiceProvider {

  public build = (): void => {
    this._container.bind<IAppStore>(ServiceIdentifier.AppStore)
      .to(AppStore)
      .inSingletonScope();
  }

}

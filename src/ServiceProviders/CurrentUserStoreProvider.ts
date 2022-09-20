import { ContainerServiceProvider, ServiceIdentifier } from "@Container";
import { CurrentUserStore, ICurrentUserStore } from "@Stores/CurrentUser";

export class CurrentUserStoreProvider extends ContainerServiceProvider {

  public build = (): void => {
    this._container
      .bind<ICurrentUserStore>(ServiceIdentifier.CurrentUserStore)
      .to(CurrentUserStore)
      .inSingletonScope()
    ;
  }

}

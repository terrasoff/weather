import { ContainerServiceProvider, ServiceIdentifier } from "@Container";
import { AuthStore, IAuthStore } from "@Stores/Auth";

export class AuthStoreProvider extends ContainerServiceProvider {

  public build = (): void => {
    this._container.bind<IAuthStore>(ServiceIdentifier.AuthStore)
      .to(AuthStore)
      .inSingletonScope()
    ;
  }

}

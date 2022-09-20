import { Service, ServiceIdentifier } from "@Container";
import { DisposableStore } from "@Infrastructure/Stores";
import { reaction } from "mobx";
import { IRouterStore } from "@Stores/RouterStore";
import { injectable } from "inversify";
import { ICurrentUserStore } from "@Stores/CurrentUser";
import { IAppRoutingStore } from "@App/Weather/Stores";
import { WeatherRoutes } from "@App/Weather/Routes";

@injectable()
export class AppRoutingStore implements IAppRoutingStore {

  @Service(ServiceIdentifier.CurrentUserStore)
  private readonly _currentUserStore: ICurrentUserStore;

  @Service(ServiceIdentifier.RouterStore)
  private readonly _routerStore: IRouterStore;

  private readonly _disposer = new DisposableStore();

  public init = (): void => {
    this.addCheckAuthReaction();
  };

  private addCheckAuthReaction(): void {
    this._disposer.push(
      reaction(
        () => this._currentUserStore.user,
        () => {
          const store = this._currentUserStore;
          if (store.isAuthenticated) {
            this.onLogin();
          }
        }
      )
    );
  }

  private onLogin = (): void => {
    this._routerStore.navigate(WeatherRoutes.Weather);
  };

  public dispose = (): Promise<void> => {
    return this._disposer.dispose();
  };

}

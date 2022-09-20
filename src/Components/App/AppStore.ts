import { AsyncOperationWorkflowStore, DisposableStore, IThemeStore } from "@Infrastructure/Stores";
import { computed, makeObservable } from "mobx";
import { Theme } from "@material-ui/core";
import { ICurrentUserStore } from "@Stores/CurrentUser";
import { History } from "history";
import { IRouterStore } from "@Stores/RouterStore";
import { IErrorHandlerStore } from "@Stores/ErrorHandler";
import { IAppStore } from "./IAppStore";
import { Service, ServiceIdentifier } from "@Container";
import { injectable } from "inversify";
import { IAuthStore } from "@Stores/Auth";

@injectable()
export class AppStore implements IAppStore {

  @Service((ServiceIdentifier.ThemeStore))
  private readonly _theme: IThemeStore;

  @Service(ServiceIdentifier.ErrorHandlerStore)
  private readonly _errorHandler: IErrorHandlerStore;

  @Service(ServiceIdentifier.CurrentUserStore)
  private readonly _currentUserStore: ICurrentUserStore;

  @Service(ServiceIdentifier.RouterStore)
  private readonly _routerStore: IRouterStore;

  @Service(ServiceIdentifier.AuthStore)
  private readonly _auth: IAuthStore;

  private readonly _disposer = new DisposableStore();

  constructor() {
    makeObservable(this);
  }

  public readonly init = new AsyncOperationWorkflowStore(
    async () => {
      this.user.restoreUserFromStorage();
      this._auth.init();

      this._disposer.push(this._auth.dispose);
    }
  )

  @computed
  public get theme(): Theme {
    return this._theme.current;
  }

  public get user(): ICurrentUserStore {
    return this._currentUserStore;
  }

  public get auth(): IAuthStore {
    return this._auth;
  }

  @computed
  public get browserHistoryApi(): History {
    return this._routerStore.history;
  }

  public dispose = (): Promise<void> => {
    return this._disposer.dispose();
  }

}

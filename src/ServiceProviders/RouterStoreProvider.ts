import { ContainerServiceProvider, ServiceIdentifier } from "@Container";
import { IRouterStore, RouterStore } from "@Stores/RouterStore";
import { createBrowserHistory } from "history";
import { RouterStore as MobxRouterStore, syncHistoryWithStore } from "mobx-react-router";

export class RouterStoreProvider extends ContainerServiceProvider {

  public build = (): void => {
    const mobxRouterStore = new MobxRouterStore();
    const history = createBrowserHistory();
    syncHistoryWithStore(history, mobxRouterStore);

    const store = new RouterStore(mobxRouterStore);
    this._container.bind<IRouterStore>(ServiceIdentifier.RouterStore).toConstantValue(store);
  }

}

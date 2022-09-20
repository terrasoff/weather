import { AsyncOperationWorkflowStore, IDisposable } from "@Infrastructure/Stores";
import { Theme } from "@material-ui/core";
import { ICurrentUserStore } from "@Stores/CurrentUser";
import { History } from "history";
import { IAuthStore } from "@Stores/Auth";

export interface IAppStore extends IDisposable {

  readonly init: AsyncOperationWorkflowStore;

  readonly theme: Theme;

  readonly user: ICurrentUserStore;

  readonly auth: IAuthStore;

  readonly browserHistoryApi: History;

}

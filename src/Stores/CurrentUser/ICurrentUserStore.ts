import { CurrentUserModel } from "./CurrentUserModel";

export interface ICurrentUserStore {

  readonly user: CurrentUserModel;

  readonly isAuthenticated: boolean;

  restoreUserFromStorage(): void;

  set(user: CurrentUserModel): void;

  reset(): void;

}

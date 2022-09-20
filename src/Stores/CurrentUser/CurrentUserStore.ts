import { ValueBoxStore } from "@Infrastructure/Stores";
import { computed, makeObservable } from "mobx";
import { injectable } from "inversify";
import { CurrentUserModel } from "./CurrentUserModel";
import { ICurrentUserStore } from "./ICurrentUserStore";
import { IStorageService } from "@Infrastructure/Services";
import { AppStorageKeys } from "@Config";
import { Service, ServiceIdentifier } from "@Container";

@injectable()
export class CurrentUserStore implements ICurrentUserStore {

  @Service(ServiceIdentifier.StorageService)
  private readonly _storage: IStorageService;

  private readonly _user = new ValueBoxStore<CurrentUserModel>();

  constructor() {
    makeObservable(this);
  }

  @computed
  public get isAuthenticated(): boolean {
    return this._user.isNotDefault;
  }

  @computed
  public get user(): CurrentUserModel {
    return this._user.value;
  }

  public restoreUserFromStorage = (): void => {
    const model = this._storage.get<CurrentUserModel>(AppStorageKeys.User);
    if (model) {
      this._user.set(model);
    }
  }

  public set = (user: CurrentUserModel): void => {
    this._user.set(user);
    this._storage.set(AppStorageKeys.User, user);
  }

  public reset = (): void => {
    this._user.reset();
    this._storage.remove(AppStorageKeys.User);
  }

}

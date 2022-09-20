import { action, computed, makeObservable, observable } from "mobx";

export enum OperationStateEnum {
  idling = "idling",
  Running = "Running",
  Succeed = "Succeed",
  Terminated = "Terminated",
  Failed = "Failed",
  Cancelled = "Cancelled",
}

export class OperationStateStore {

  @observable
  private _status: OperationStateEnum = OperationStateEnum.idling;

  constructor() {
     makeObservable(this);
  }

  @computed
  public get status(): OperationStateEnum {
    return this._status;
  }

  @computed
  public get isIdling(): boolean {
    return this._status === OperationStateEnum.idling;
  }

  @computed
  public get isRunning(): boolean {
    return this._status === OperationStateEnum.Running;
  }

  @computed
  public get hasSucceed(): boolean {
    return this._status === OperationStateEnum.Succeed;
  }

  @computed
  public get hasTerminated(): boolean {
    return this._status === OperationStateEnum.Terminated;
  }

  @computed
  public get hasFailed(): boolean {
    return this._status === OperationStateEnum.Failed;
  }

  @computed
  public get hasCancelled(): boolean {
    return this._status === OperationStateEnum.Cancelled;
  }

  @computed
  public get isCompleted(): boolean {
    return [
      OperationStateEnum.Succeed,
      OperationStateEnum.Terminated,
      OperationStateEnum.Failed,
      OperationStateEnum.Cancelled,
    ].includes(this._status);
  }

  @computed
  public get isNotCompleted(): boolean {
    return !this.isCompleted;
  }

  @action
  public idle = (): void => {
    this._status = OperationStateEnum.idling;
  }

  @action
  public start = (): void => {
    this._status = OperationStateEnum.Running;
  }

  @action
  public success = (): void => {
    this._status = OperationStateEnum.Succeed;
  }

  @action
  public terminate = (): void => {
    this._status = OperationStateEnum.Terminated;
  }

  @action
  public fail = (): void => {
    this._status = OperationStateEnum.Failed;
  }

  @action
  public cancel = (): void => {
    this._status = OperationStateEnum.Failed;
  }

}

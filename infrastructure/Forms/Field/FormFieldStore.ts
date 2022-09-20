import { computed, makeObservable } from "mobx";
import { ValueBoxStore } from "@Infrastructure/Stores";
import { FormFieldStateStore } from "@Infrastructure/Forms";

export class FormFieldStore<TValue> {

  private readonly _stateStore = new FormFieldStateStore();

  private readonly _valueStore = new ValueBoxStore<TValue>();

  private readonly _errorStore = new ValueBoxStore<string>();

  constructor() {
    makeObservable(this);
  }

  @computed
  public get state(): FormFieldStateStore {
    return this._stateStore;
  }

  @computed
  public get hasError(): boolean {
    return Boolean(this.error);
  }

  @computed
  public get value(): TValue {
    return this._valueStore.value;
  }

  @computed
  public get error(): string | undefined {
    if (!this._stateStore.isChanged) {
      return;
    }

    return this._errorStore.value;
  }

  public setValue = (value: TValue): void => {
    this._valueStore.set(value);
    this._stateStore.setTouched();
    this._stateStore.setChanged();
  }

  public setError = (value: string): void => {
    this._errorStore.set(value);
  }

  public resetState = (): void => {
    this._stateStore.reset();
  }

  public reset = (): void => {
    this.resetState();
    this.resetError();
  }

  public resetError = (): void => {
    this._errorStore.reset();
  }

}

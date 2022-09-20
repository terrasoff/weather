import { action, computed, makeObservable, observable } from "mobx";

export class ValueBoxStore<T> {

  @observable
  private _value: T;

  private readonly _defaultValue: T;

  constructor(options: {
    value?: T,
    defaultValue?: T,
  } = {}) {
    makeObservable(this)

    if (options?.value !== undefined) {
      this._value = options?.value;
    }

    if (options?.defaultValue !== undefined) {
      this._defaultValue = options.defaultValue;

      if (this._value === undefined) {
        this._value = options.defaultValue;
      }
    }
  }

  @action
  public set(value: T): void {
    this._value = value;
  }

  @action
  public reset(): void {
    this._value = this._defaultValue;
  }

  @computed
  public get value(): T {
    return this._value;
  }

  @computed
  public get isNotDefault(): boolean {
    return this._value !== this._defaultValue;
  }

}

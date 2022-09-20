import { computed, makeObservable } from "mobx";
import { ValueBoxStore } from "@Infrastructure/Stores";
import { FormFieldStateModel } from "./FormFieldStateModel";

export class FormFieldStateStore {

  private readonly _touched = new ValueBoxStore<boolean>();

  private readonly _changed = new ValueBoxStore<boolean>();

  public reset(): void {
    this._touched.set(false);
    this._changed.set(false);
  }

  constructor() {
    makeObservable(this);
  }

  @computed
  public get isTouched(): boolean {
    return this._touched.value;
  }

  @computed
  public get isChanged(): boolean {
    return this._changed.value;
  }

  public get current(): FormFieldStateModel {
    return {
      isTouched: this.isTouched,
      isChanged: this.isChanged,
    }
  }

  public setTouched = (): void => {
    this._touched.set(true);
  }

  public setChanged = (): void => {
    this._changed.set(true);
  }

}

import { computed, makeObservable, when } from "mobx";
import { ValueBoxStore, VisibilityStore } from "@Infrastructure/Stores";
import { ModalResult } from "./ModalResult";

export class ModalStore<TResult = undefined> {

  private _result = new ValueBoxStore<ModalResult | TResult>();

  private readonly _visibility = new VisibilityStore();

  constructor() {
    this.open = this.open.bind(this);
    this.closeWithAction = this.closeWithAction.bind(this);
    this.close = this.close.bind(this);

    makeObservable(this);
  }

  @computed
  public get result(): ModalResult | TResult {
    return this._result.value;
  }

  @computed
  public get isVisible(): boolean {
    return this._visibility.isVisible;
  }

  @computed
  public get isHidden(): boolean {
    return this._visibility.isHidden;
  }

  public async open(): Promise<ModalResult | TResult> {
    this._visibility.show();

    await when(() => this._visibility.isHidden);

    return this.result;
  }

  public closeWithAction(result: ModalResult | TResult): void {
    this._result.set(result);
    this._visibility.hide();
  }

  public close(): void {
    this.closeWithAction("Cancel");
  }

}

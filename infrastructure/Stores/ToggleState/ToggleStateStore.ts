import { computed, makeObservable } from "mobx";
import { ValueBoxStore } from "@Infrastructure/Stores";
import { ToggleStateType } from "./ToggleStateType";

export class ToggleStateStore {

  private readonly _state: ValueBoxStore<ToggleStateType>

  constructor(defaultValue: ToggleStateType = "off") {
    this.on = this.on.bind(this);
    this.off = this.off.bind(this);
    this.toggle = this.toggle.bind(this);
    this.indeterminate = this.indeterminate.bind(this);

    this._state = new ValueBoxStore<ToggleStateType>({ defaultValue });

    makeObservable(this);
  }

  @computed
  public get isOn(): boolean {
    return this._state.value === "on";
  }

  @computed
  public get isOff(): boolean {
    return this._state.value === "off";
  }

  @computed
  public get isIndeterminate(): boolean {
    return this._state.value === "indeterminate";
  }

  public toggle(): void {
    const value = this._state.value === "on" ? "off" : "on";
    this._state.set(value);
  }

  public on(): void {
    this._state.set("on");
  }

  public off(): void {
    this._state.set("off");
  }

  public set(value: boolean): void {
    this._state.set(
      value ? "on" : "off"
    );
  }

  public indeterminate(): void {
    this._state.set("indeterminate");
  }

}

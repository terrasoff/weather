import { IDisposable } from "./IDisposable";
import { DisposableType } from "./DisposableType";

export class DisposableStore implements IDisposable {

  private _items: Array<DisposableType> = [];

  constructor() {
    this.push = this.push.bind(this);
    this.dispose = this.dispose.bind(this);
  }

  public push(...items: Array<DisposableType>): DisposableStore {
    this._items.push(...items);
    return this;
  }

  public async dispose(): Promise<void> {
    await Promise.all(
      this._items.map(x => x())
    );

    this._items = [];
  }

}

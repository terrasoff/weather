import { action, computed, makeObservable, observable, toJS } from "mobx";

export class Collection<T> {

  private readonly _items = observable<T>([])

  constructor(items: Array<T> = []) {
    this._items.replace(items);

    makeObservable(this);
  }

  @computed
  public get items(): Array<T> {
    return this._items;
  }

  @computed
  public get length(): number {
    return this._items.length;
  }

  @action
  public add = (...items: T[]): T[] => {
    this._items.push(...items);

    const lastIndex = this.length;
    const splice = this._items.slice(lastIndex - items.length, lastIndex);

    return splice;
  }

  @action
  public set = (items: Array<T>): void => {
    this._items.replace(items);
  }

  @action
  public remove = (model: T): boolean => {
    return this._items.remove(model);
  }

}

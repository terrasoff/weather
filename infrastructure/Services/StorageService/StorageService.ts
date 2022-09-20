import { injectable } from "inversify";
import { IJsonService } from "@Infrastructure/Services";
import { IStorageService } from "./IStorageService";
import { Service, ServiceIdentifier } from "@Container";

@injectable()
export class StorageService implements IStorageService {

  @Service(ServiceIdentifier.JsonService)
  private readonly _jsonService: IJsonService;

  public get length(): number {
    return localStorage.length;
  }

  constructor() {
    this.clear = this.clear.bind(this);
    this.remove = this.remove.bind(this);
    this.get = this.get.bind(this);
    this.set = this.set.bind(this);
  }

  public clear(): void {
    localStorage.clear();
  }

  public remove(key: string): void {
    localStorage.removeItem(key);
  }

  public get<TResult>(key: string): TResult | null {
    const value = localStorage.getItem(key);

    if (typeof value !== "string") {
      return value;
    }

    return this._jsonService.parse<TResult>(value);
  }

  public set(key: string, value: unknown): void {
    const stringValue = this._jsonService.stringify(value);
    localStorage.setItem(key, stringValue);
  }

}

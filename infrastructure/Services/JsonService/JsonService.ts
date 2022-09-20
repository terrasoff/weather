import { injectable } from "inversify";
import { IJsonService } from "./IJsonService";
import { IJsonStringifyOptions } from "./IJsonStringifyOptions";

@injectable()
export class JsonService implements IJsonService {

  public stringify<T = object>(value: T, options?: IJsonStringifyOptions): string {
    return JSON.stringify(value, undefined, (options || {}).space);
  }

  public parse<T = object>(value: string): T {
    return JSON.parse(value) as T;
  }

}

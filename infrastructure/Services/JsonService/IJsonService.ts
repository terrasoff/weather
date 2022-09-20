import { IJsonStringifyOptions } from "./IJsonStringifyOptions";

export interface IJsonService {

  stringify<T = object>(value: T, options?: IJsonStringifyOptions): string;

  parse<T = object>(value: string): T;

}

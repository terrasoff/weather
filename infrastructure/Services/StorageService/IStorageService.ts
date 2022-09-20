export interface IStorageService {

  readonly length: number;

  clear(): void;

  remove(key: string): void;

  get<TResult>(key: string): TResult | null;

  set<T>(key: string, value: T): void;

}

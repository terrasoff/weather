import { IDisposable } from "@Infrastructure/Stores";

export interface IAuthStore extends IDisposable {

  readonly isAuthenticated: boolean;

  init(): void;

  login(name: string, password: string): void;

  logout(): void;

}

import { interfaces } from "inversify/lib/interfaces/interfaces";
import { IServiceProvider } from "@Infrastructure/DiContainer";

export abstract class ContainerServiceProvider implements IServiceProvider {

  protected readonly _container: interfaces.Container;

  constructor(container: interfaces.Container) {
    this._container = container;
  }

  abstract build(): void;

}

import { Container } from "./Container";
import { ContainerServiceProviderConstructor } from "@Container/ContainerServiceProviderConstructor";

export class ContainerBoostrap {

  private readonly _container: Container;

  constructor(container: Container) {
    this._container = container;
  }

  public setProviders = (providers: Array<ContainerServiceProviderConstructor>): void => {
    this._container.build(providers);
  }

}

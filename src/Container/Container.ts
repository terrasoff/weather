import { Container as InversifyContainer } from "inversify";
import { ContainerDecoratorsFactory, IBabelPropertyDescriptor } from "@Infrastructure/DiContainer";
import { ContainerServiceProviderConstructor } from "./ContainerServiceProviderConstructor";
import { interfaces } from "inversify/lib/interfaces/interfaces";

export class Container {

  private readonly _container = new InversifyContainer();

  public build = (
    providers: Array<ContainerServiceProviderConstructor>
  ): this => {
    providers.forEach(provider => new provider(this._container).build());

    return this;
  };

  public get lazyInject(): (
    serviceIdentifier: interfaces.ServiceIdentifier<unknown>
  ) => (this: unknown, proto: unknown, key: string, descriptor?: IBabelPropertyDescriptor) => void {
    const decorators = new ContainerDecoratorsFactory(this._container);

    return decorators.lazyInject;
  }

}

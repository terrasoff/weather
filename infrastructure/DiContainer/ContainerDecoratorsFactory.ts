import { Container } from "inversify";
import { interfaces } from "inversify/lib/interfaces/interfaces";
import getDecorators from "inversify-inject-decorators";
import { IBabelPropertyDescriptor } from "./IBabelPropertyDescriptor";

export class ContainerDecoratorsFactory {

  private readonly _container: Container;

  constructor(container: Container) {
    this._container = container;
  }

  /**
   * You can use lazyInject after the container is built.
   * @see https://github.com/inversify/InversifyJS/issues/1026#issuecomment-504936034
   */
  public lazyInject = (serviceIdentifier: interfaces.ServiceIdentifier<any>) => {
    const original = getDecorators(this._container).lazyInject(serviceIdentifier);

    return function(this: any, proto: any, key: string, descriptor?: IBabelPropertyDescriptor): void {
      original.call(this, proto, key);
      descriptor!.initializer = function() {
        return proto[key];
      };
    };
  };

}

import { ContainerServiceProvider, ServiceIdentifier } from "@Container";
import { IJsonService, JsonService } from "@Infrastructure/Services";

export class JsonServiceProviders extends ContainerServiceProvider {

  public build(): void {
    this._container.bind<IJsonService>(ServiceIdentifier.JsonService)
      .to(JsonService)
      .inSingletonScope();
  }

}

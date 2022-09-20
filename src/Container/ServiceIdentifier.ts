import { ServiceRegistryFactory } from "@Infrastructure/DiContainer";

export const ServiceIdentifier = new ServiceRegistryFactory({})
  .add("AppRoutingStore")
  .add("AppStore")
  .add("ThemeStore")
  .add("CurrentUserStore")
  .add("ErrorHandlerStore")
  .add("AuthStore")
  .add("RouterStore")
  .add("StorageService")
  .add("JsonService")
  .build();

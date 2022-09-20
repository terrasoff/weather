import { ContainerServiceProviderConstructor } from "@Container";
import {
  AppStoreProvider,
  AuthStoreProvider,
  CurrentUserStoreProvider,
  ErrorHandlerStoreProvider,
  JsonServiceProviders,
  RouterStoreProvider,
  StorageServiceProvider,
  ThemeServiceProviders
} from "@ServiceProviders";

export const providers: Array<ContainerServiceProviderConstructor> = [
  JsonServiceProviders,
  ThemeServiceProviders,
  StorageServiceProvider,
  CurrentUserStoreProvider,
  ErrorHandlerStoreProvider,
  AuthStoreProvider,
  RouterStoreProvider,
  AppStoreProvider,
];
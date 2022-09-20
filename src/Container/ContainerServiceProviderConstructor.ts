import { Container as InversifyContainer } from "inversify";
import { ContainerServiceProvider } from "@Container";

export type ContainerServiceProviderConstructor = new (container: InversifyContainer) => ContainerServiceProvider;

import { Container } from "./Container";

export { ContainerServiceProvider } from "./ContainerServiceProvider";
export { ServiceIdentifier } from "./ServiceIdentifier";
export * from "./ContainerServiceProviderConstructor";
export * from "./Container";
export * from "./ContainerBoostrap";

export const container = new Container();
export const Service = container.lazyInject;
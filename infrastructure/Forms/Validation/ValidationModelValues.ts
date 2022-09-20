export type ValidationModelValues<TModel extends object> = {
  [key in keyof TModel]: string;
};

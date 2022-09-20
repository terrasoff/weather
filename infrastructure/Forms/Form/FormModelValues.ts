export type FormModelValues<TModel extends object> = {
  [key in keyof TModel]: string;
};

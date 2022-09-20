import { FormFieldStore } from "@Infrastructure/Forms";

export type FormFields<TModel extends object> = {
  [key in keyof TModel]: FormFieldStore<string>;
};

import { FormFieldStore } from "@Infrastructure/Forms";

export type ValidationModel<TModel extends object> = Record<keyof TModel, FormFieldStore<string>>;
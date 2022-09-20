import { FormFieldStore } from "@Infrastructure/Forms";

export type FormModel<TModel extends object> = Record<keyof TModel, FormFieldStore<string>>;
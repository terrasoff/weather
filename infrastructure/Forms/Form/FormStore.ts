import { computed, makeObservable, reaction } from "mobx";
import { DisposableStore, ValueBoxStore } from "@Infrastructure/Stores";
import { FormModel } from "./FormModel";
import { Validator } from "fluentvalidation-ts";
import { ValidationErrors } from "fluentvalidation-ts/dist/ValidationErrors";
import { FormModelValues } from "./FormModelValues";
import { FormFields, FormFieldStore, FormValidationStore } from "@Infrastructure/Forms";
import { ValidationModelValues } from "@Infrastructure/Forms/Validation/ValidationModelValues";

export class FormStore<TModel extends Record<string, unknown>> {

  private readonly _errors = new ValueBoxStore<ValidationErrors<FormModelValues<TModel>>>();

  private readonly _model: FormModel<TModel>;

  private readonly _disposer = new DisposableStore();

  private readonly _validator: Validator<FormModelValues<TModel>>;

  private readonly _validation: FormValidationStore<TModel>;

  constructor(
    model: FormModel<TModel>,
    validator: Validator<FormModelValues<TModel>>,
  ) {
    makeObservable(this);

    this._model = model;

    this._validator = validator;

    this._validation = new FormValidationStore<TModel>(model, this._validator);

    for(const key in this._model) {
      const model = this._model[key];
      this._disposer.push(
        reaction(
          () => model.value,
          () => {
            this.change(model);
          },
        )
      );
    }
  }

  @computed
  public get errors(): ValidationErrors<ValidationModelValues<TModel>> {
    return this._validation.errors;
  }

  @computed
  public get isValid(): boolean {
    return this._validation.isValid;
  }

  @computed
  public get model(): FormModelValues<TModel> {
    const model: Partial<FormModelValues<TModel>> = {};

    for (const key in this._model) {
      const field = this._model[key];
      if (field) {
        model[key] = field.value;
      }
    }

    // TODO strict types
    return model as FormModelValues<TModel>;
  }

  public get fields(): FormFields<TModel> {
    const model: Partial<FormFields<TModel>> = {};

    for (const key in this._model) {
      model[key] = this._model[key];
    }

    return model as FormFields<TModel>;
  }

  private change = (field: FormFieldStore<string>): void => {
    field.state.setChanged();
    field.state.setTouched();
  }

  private dispose = (): Promise<void> => {
    return this._disposer.dispose();
  }

}

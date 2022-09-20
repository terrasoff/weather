import { computed, makeObservable, reaction } from "mobx";
import { DisposableStore, ValueBoxStore } from "@Infrastructure/Stores";
import { ValidationModel } from "./ValidationModel";
import { Validator } from "fluentvalidation-ts";
import { ValidationErrors } from "fluentvalidation-ts/dist/ValidationErrors";
import { ValidationModelValues } from "./ValidationModelValues";

export class FormValidationStore<TModel extends Record<string, unknown>> {

  private readonly _errors = new ValueBoxStore<ValidationErrors<ValidationModelValues<TModel>>>({
    defaultValue: {},
  });

  private readonly _validator: Validator<ValidationModelValues<TModel>>;

  private readonly _model: ValidationModel<TModel>;

  private readonly _disposer = new DisposableStore();

  constructor(
    model: ValidationModel<TModel>,
    validator: Validator<ValidationModelValues<TModel>>
  ) {
    makeObservable(this);

    this._model = model;

    this._validator = validator;

    for(const key in this._model) {
      this._disposer.push(
        reaction(
          () => this._model[key].value,
          this.validate,
        )
      );
    }
  }

  @computed
  public get errors(): ValidationErrors<ValidationModelValues<TModel>> {
    return this._errors.value;
  }

  @computed
  public get isValid(): boolean {
    return Object.keys(this._errors.value).length < 1;
  }

  @computed
  private get model(): ValidationModelValues<TModel> {
    const model: Partial<ValidationModelValues<TModel>> = {};

    for (const key in this._model) {
      const value = this._model[key];
      if (value) {
        model[key] = value.value;
      }
    }

    // TODO strict types
    return model as ValidationModelValues<TModel>;
  }

  private updateFields = (): void => {
    const errors = this._errors.value;

    for (let key in this.model) {
      const field = this._model[key];
      const fieldError = errors[key];
      if (fieldError) {
        if (field.state.isChanged) {
          field.setError(fieldError);
        }
      } else {
        field.resetError();
      }
    }
  }

  private validate = (): void => {
    const errors = this._validator.validate(this.model);
    this._errors.set(errors);
    this.updateFields();
  }

  private dispose = (): Promise<void> => {
    return this._disposer.dispose();
  }

}

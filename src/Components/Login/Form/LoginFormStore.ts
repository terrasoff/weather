import { LoginFormModel } from "./LoginFormModel";
import { LoginFormModelValidator } from "./LoginFormModelValidator";
import { FormFieldStore, FormStore } from "@Infrastructure/Forms";
import { Service, ServiceIdentifier } from "@Container";
import { AsyncOperationWorkflowStore } from "@Infrastructure/Stores";
import { ICurrentUserStore } from "@Stores/CurrentUser";
import { IAuthStore } from "@Stores/Auth";

export class LoginFormStore {

  @Service(ServiceIdentifier.CurrentUserStore)
  private readonly _currentUserStore: ICurrentUserStore;

  @Service(ServiceIdentifier.AuthStore)
  private readonly _authStore: IAuthStore;

  public readonly form = new FormStore<LoginFormModel>(
    {
      name: new FormFieldStore<string>(),
      password: new FormFieldStore<string>(),
    },
    new LoginFormModelValidator(),
  );

  public readonly submit = new AsyncOperationWorkflowStore(
    async (): Promise<void> => {
      await new Promise(x => setTimeout(x, 2000)); // TODO remove emulation of an async operation
      const model = this.form.model;
      this._authStore.login(
        model.name,
        model.password,
      );
      if (!this._authStore.isAuthenticated) {
        this.form.fields.password.setError("Wrong password");
      }
    }
  );

}

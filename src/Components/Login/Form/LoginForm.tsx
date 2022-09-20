import React, { PureComponent, ReactElement } from "react";
import { LoginFormProps } from "./LoginFormProps";
import { SimpleFieldset, TextField } from "@Components/Form";
import { InputAdornment, Link } from "@material-ui/core";
import { AccountCircle, LockClockRounded } from "@mui/icons-material";
import {
  ForgetPasswordHint,
  FormFieldWrapper,
  LoginButton,
  LoginButtonWrapper,
  LoginContainer,
  LoginFormHint,
  LoginFormTitle,
} from "./LoginFormStyles";
import { observer } from "mobx-react";
import { ServiceIdentifier } from "@Container/ServiceIdentifier";
import { Service } from "@Container";
import { IAppStore } from "@Components/App";

@observer
export class LoginForm extends PureComponent<LoginFormProps> {

  @Service(ServiceIdentifier.AppStore)
  private readonly _appStore: IAppStore;

  public render(): ReactElement {
    const {
      store: {
        form,
        submit,
      },
    } = this.props;

    return (
      <LoginContainer>
        <LoginFormTitle>
          Volante QuickConnect
        </LoginFormTitle>
        <LoginFormHint>
          Please login to your platform
        </LoginFormHint>
        <form
          onSubmit={
            (e): void => {
              e.stopPropagation();
              e.preventDefault();
              submit.execute();
            }
          }
        >
          <SimpleFieldset
            disabled={submit.state.isRunning}
          >
            <FormFieldWrapper>
              <TextField
                required
                fullWidth
                autoComplete="on"
                label="Email"
                store={form.fields.name}
                InputProps={
                  {
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    ),
                  }
                }
              />
            </FormFieldWrapper>
            <FormFieldWrapper>
              <TextField
                required
                fullWidth
                label="Password"
                type="password"
                store={form.fields.password}
                InputProps={
                  {
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockClockRounded />
                      </InputAdornment>
                    ),
                  }
                }
              />
            </FormFieldWrapper>

            <LoginButtonWrapper>
              <LoginButton
                type="submit"
                variant="contained"
                color="primary"
                spinner={submit.state.isRunning}
                disabled={submit.state.isRunning}
              >
                Login
              </LoginButton>
            </LoginButtonWrapper>
            <ForgetPasswordHint>
              <Link>
                Please login to your platform
              </Link>
            </ForgetPasswordHint>
          </SimpleFieldset>
        </form>
      </LoginContainer>
    );
  }

}

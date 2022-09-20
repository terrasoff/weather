import React, { PureComponent, ReactNode } from "react";
import { observer } from "mobx-react";
import { LoginForm, LoginFormStore } from "@Components/Login/Form";
import { LoginLayout } from "@Components/Layout/Login";
import { Container, Copyright, Footer, Main } from "./HomePageStyles";

@observer
export class HomePage extends PureComponent {

  private readonly _loginFormStore = new LoginFormStore();

  public render(): ReactNode {
    return (
      <LoginLayout>
        <Container>
          <Main>
            <LoginForm store={this._loginFormStore} />
          </Main>
          <Footer>
            <Copyright>
              2022 &#64; Volante Quick Connect, Volante Technologies Inc.
            </Copyright>
          </Footer>
        </Container>
      </LoginLayout>
    );
  }
}

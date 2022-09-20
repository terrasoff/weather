import React, { PureComponent, ReactNode } from "react";
import { observer } from "mobx-react";
import { MainLayoutProps } from "./MainLayoutProps";
import { Service, ServiceIdentifier } from "@Container";
import { IAuthStore } from "@Stores/Auth";

@observer
export class MainLayout extends PureComponent<MainLayoutProps> {

  @Service(ServiceIdentifier.AuthStore)
  private readonly _authStore: IAuthStore;

  public render(): ReactNode {
    const {
      children,
      title,
    } = this.props;

    return (
      <div>
        <h1>
          {
            title
          }
        </h1>
        <div>
          <button onClick={this._authStore.logout}>logout</button>
        </div>
        <div>
          {
            children
          }
        </div>
      </div>
    );
  }

}

import React, { PureComponent, ReactNode } from "react";
import { observer } from "mobx-react";
import { ThemeProvider } from "@material-ui/core";
import { Router, Switch } from "react-router-dom";
import { Service, ServiceIdentifier } from "@Container";
import { Suspense } from "@Components/Suspense";
import { IAppStore } from "@Components/App";
import { AppProps } from "./AppProps";

@observer
export class App extends PureComponent<AppProps> {

  @Service(ServiceIdentifier.AppStore)
  private readonly _appStore: IAppStore;

  public componentDidMount(): Promise<void> {
    return this._appStore.init.execute();
  }

  public componentWillUnmount(): void {
    this._appStore.dispose();
  }

  public render(): ReactNode {
    const store = this._appStore;
    const { children } = this.props;

    if (!store.init.state.hasSucceed) {
      return null;
    }

    return (
      <ThemeProvider
        theme={store.theme}
      >
        <Suspense>
          <Router
            history={store.browserHistoryApi}
          >
            <Switch>
              {
                children
              }
            </Switch>
          </Router>
        </Suspense>
      </ThemeProvider>
    );
  }

}

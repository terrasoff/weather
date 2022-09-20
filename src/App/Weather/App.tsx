import React, { PureComponent, ReactNode } from "react";
import { observer } from "mobx-react";
import { App as BaseApplication } from "@Components/App";
import { HomePage } from "@App/Weather/Pages";
import { Route } from "react-router-dom";
import { WeatherRoutes } from "@App/Weather/Routes";
import { WeatherPage } from "@App/Weather/Pages/Weather";

@observer
export class App extends PureComponent {

  public render(): ReactNode {
    return (
      <BaseApplication>
        <Route
          path={WeatherRoutes.Home}
          exact={true}
        >
          <HomePage />
        </Route>
        <Route
          path={WeatherRoutes.Weather}
          exact={true}
        >
          <WeatherPage />
        </Route>
      </BaseApplication>
    );
  }

}

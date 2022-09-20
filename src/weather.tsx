import "reflect-metadata";
import React from "react";
import ReactDOM from "react-dom";
import { App } from "@App/Weather";
import { container, ContainerBoostrap } from "@Container";
import { providers } from "@App/Weather/Container";

const bootstrap = new ContainerBoostrap(container);
bootstrap.setProviders(providers);

ReactDOM.render(
  (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  ),
  document.getElementById("root")
);

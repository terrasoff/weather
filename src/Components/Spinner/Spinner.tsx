import React, { Component, ReactNode } from "react";
import { observer } from "mobx-react";
import { SpinnerContainer } from "./SpinnerStyles";
import { SpinnerProps } from "./SpinnerProps";
import { CircularProgress } from "@material-ui/core";

@observer
export class Spinner extends Component<SpinnerProps> {

  public render(): ReactNode {
    return (
      <SpinnerContainer>
        <CircularProgress />
      </SpinnerContainer>
    );
  }

}

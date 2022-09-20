import React, { Component, ReactNode, Suspense as ReactSuspense } from "react";
import { observer } from "mobx-react";
import { SuspenseProps } from "./SuspenseProps";
import { Spinner } from "@Components/Spinner";

@observer
export class Suspense extends Component<SuspenseProps> {

  public render(): ReactNode {
    const { children } = this.props;

    return (
      <ReactSuspense fallback={<Spinner />}>
        {
          children
        }
      </ReactSuspense>
    );
  }

}

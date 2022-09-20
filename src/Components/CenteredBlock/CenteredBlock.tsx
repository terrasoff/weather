import React, { FunctionComponent } from "react";
import { styled } from "@material-ui/core";

const Container = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
}));

export const CenteredBlock: FunctionComponent = props => {

  return (
    <Container>
      {
        props.children
      }
    </Container>
  );

};

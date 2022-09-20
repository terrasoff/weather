import React, { FunctionComponent } from "react";
import { CssBaseline } from "@material-ui/core";
import { CenteredBlock } from "@Components/CenteredBlock";
import { Container, LeftBlock, Logo, RightBlock } from "./LoginLayoutStyles";
import logoImage from "@Assets/Images/logo.webp";
import mosaicImage from "@Assets/Images/mosaic.webp";

export const LoginLayout: FunctionComponent = props => {

  return (
    <Container>
      <CssBaseline />
      <LeftBlock>
        <Logo>
          <img src={logoImage} />
        </Logo>
        <img src={mosaicImage} />
      </LeftBlock>
      <RightBlock>
        <CenteredBlock>
          {
            props.children
          }
        </CenteredBlock>
      </RightBlock>
    </Container>
  );

};

import React, { FunctionComponent } from "react";
import { Button as MuiButton, ButtonProps as MuiButtonProps, CircularProgress } from "@material-ui/core";
import { SpinnerContainer } from "./ButtonStyles";
import { CenteredBlock } from "@Components/CenteredBlock";

type ButtonProps = MuiButtonProps & {

  spinner?: boolean;

};

export const Button: FunctionComponent<ButtonProps> = props => {

  const {
    spinner,
    variant,
    ...rest
  } = props;

  return (
    <MuiButton
      variant={variant || "contained"}
      {...rest}
    >
      {
        spinner
        && (
          <SpinnerContainer>
            <CenteredBlock>
              <CircularProgress
                color="inherit"
                size={15}
              />
            </CenteredBlock>
          </SpinnerContainer>
        )
      }
      {
        props.children
      }
    </MuiButton>
  );

};

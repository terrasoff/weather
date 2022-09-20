import React, { PureComponent, ReactNode } from "react";
import { TextFieldProps } from "./TextFieldProps";
import { styled, TextField as MuiTextField } from "@material-ui/core";
import { observer } from "mobx-react";

const Styles = styled("div")(({ theme }) => ({
  "& input:disabled": {
    backgroundColor: theme.palette.grey["100"],
  },
  "& input:invalid": {
    borderColor: "red",
    borderWidth: 2,
  },
}));

@observer
export class TextField extends PureComponent<TextFieldProps> {

  public static defaultProps = {
    autoComplete: "off",
  }

  public render(): ReactNode {
    const {
      label,
      store: {
        hasError,
        value,
        error,
        setValue,
      },
      ...rest
    } = this.props;

    const id = `input-with-icon-${label}`;

    return (
      <Styles>
        <MuiTextField
          id={id}
          error={hasError}
          label={label}
          value={value || ""}
          helperText={error}
          onChange={e => setValue(e.currentTarget.value)}
          {...rest}
        />
      </Styles>
    );
  }

}

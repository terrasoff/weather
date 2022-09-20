import { FormFieldStore } from "@Infrastructure/Forms";
import { TextFieldProps as MuiTextFieldProps } from "@material-ui/core";

export type TextFieldProps = {

  label?: string;

  store: FormFieldStore<string>;

} & MuiTextFieldProps;

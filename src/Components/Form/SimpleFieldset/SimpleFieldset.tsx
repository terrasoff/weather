import React, { FunctionComponent } from "react";
import { FieldsetWithoutStyles } from "./SimpleFieldsetStyles";

type FieldsetProps = React.DetailedHTMLProps<React.FieldsetHTMLAttributes<HTMLFieldSetElement>, HTMLFieldSetElement>;

export const SimpleFieldset: FunctionComponent<FieldsetProps> = props => {

  return (
    <FieldsetWithoutStyles {...props}>
      {
        props.children
      }
    </FieldsetWithoutStyles>
  );

};

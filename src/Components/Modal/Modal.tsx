import React, { PureComponent, ReactNode } from "react";
import { observer } from "mobx-react";
import { Card, ClickAwayListener, Modal as MuiModal, styled } from "@material-ui/core";
import { ModalProps } from "./ModalProps";

const Container = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
});


@observer
export class Modal extends PureComponent<ModalProps> {

  public render(): ReactNode {
    const {
      store,
      children,
    } = this.props;

    return (
      <MuiModal
        open={store.isVisible}
        onClose={store.close}
      >
        <Container>
          <Card>
            <ClickAwayListener onClickAway={store.close}>
              <div>
                {
                  children
                }
              </div>
            </ClickAwayListener>
          </Card>
        </Container>
      </MuiModal>
    );
  }

}

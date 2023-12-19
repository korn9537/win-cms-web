import { UseDialogProps } from "@/hooks/useDialog";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import * as React from "react";

type ConfirmDialogProps = {
  children?: React.ReactNode;
  action?: React.ReactNode;
} & UseDialogProps<any, any>;

export default function ConfirmDialog(props: ConfirmDialogProps) {
  const { open, onCancel, onConfirm, title, content, ...dialog } = props;

  const dialogId = React.useId();

  return (
    <Dialog
      open={open}
      onClose={onCancel}
      fullWidth={dialog.DialogProps?.fullWidth || true}
      maxWidth={dialog.DialogProps?.maxWidth || "sm"}
      aria-labelledby={`${dialogId}-dialog-title`}
      aria-describedby={`${dialogId}-dialog-description`}
      {...dialog.DialogProps}
    >
      <DialogTitle id={`${dialogId}-dialog-title`}>{title}</DialogTitle>
      {props.content ? (
        <DialogContent>
          <DialogContentText id={`${dialogId}-dialog-description`}>{content}</DialogContentText>
        </DialogContent>
      ) : (
        props.children
      )}
      <DialogActions>
        {props.action || (
          <>
            <Button
              onClick={onCancel}
              variant={dialog.buttonConfirmProps?.variant || "outlined"}
              color={dialog.buttonConfirmProps?.color || "black80"}
            >
              {props.buttonCancelProps?.text || "ยกเลิก"}
            </Button>
            <Button
              onClick={onConfirm}
              variant={dialog.buttonConfirmProps?.variant || "contained"}
              color={dialog.buttonConfirmProps?.color || "primary"}
              autoFocus
            >
              {props.buttonConfirmProps?.text || "ตกลง"}
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
}

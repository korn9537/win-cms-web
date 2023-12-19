import { UseDialogProps } from "@/hooks/useDialog";
import { CreateOrganizeDTO } from "@/services/graphql/dto/create-organize.input";
import { createOrganize } from "@/services/graphql/organize.service";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import OrganizeTree from "./ModuleTree";

export default function MoveBuDialog(props: UseDialogProps) {
  // statics
  const { open, onCancel, onConfirm, title, content } = props;

  // states
  const [selectedId, setSelectedId] = useState("");

  // mutations
  const mutationMoveBu = useMutation({
    mutationFn: (data: CreateOrganizeDTO) => {
      return createOrganize(data);
    }
  });

  //

  // actions
  const handleOnClose = () => {
    onCancel();
  };

  const handleOnSubmit = async () => {};

  return (
    <Dialog open={open} onClose={handleOnClose} fullWidth={true}>
      <DialogTitle>ย้าย BU</DialogTitle>
      <DialogContent>
        <OrganizeTree />
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="primary" onClick={handleOnSubmit}>
          บันทึก
        </Button>
        <Button onClick={handleOnClose}>ยกเลิก</Button>
      </DialogActions>
    </Dialog>
  );
}

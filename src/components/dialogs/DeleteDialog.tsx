import { UseDialogProps } from "@/hooks/useDialog";
import { Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import * as React from "react";

type DeleteDialogProps = {
  hasRelatedData?: boolean;
} & UseDialogProps<any, any>;

export default function DeleteDialog(props: DeleteDialogProps) {
  // statics
  const { open, onCancel, onConfirm } = props;

  // states
  const [isConfirmed, setIsConfirmed] = React.useState(false);

  // actions
  const handleOnClickConfirm = () => {
    if (props.hasRelatedData == true) {
      setIsConfirmed(true);
      return;
    }

    onConfirm(null);
  };

  return (
    <Box>
      <Dialog open={open} fullWidth={true} maxWidth="sm">
        <DialogTitle>ต้องการลบข้อมูลหรือไม่</DialogTitle>
        <DialogContent>
          {isConfirmed == false && (
            <Typography variant="body_M">หากลบแล้วข้อมูลจะไม่สามารถกู้กลับคืนมาได้อีก ต้องการลบใช่หรือไม่?</Typography>
          )}
          {isConfirmed == true && (
            <Typography variant="body_M">
              ข้อมูลนี้ผูกกับข้อมูลอื่นอยู่ หากลบแล้วข้อมูลจะไม่สามารถกู้กลับคืนมาได้อีก ต้องการลบใช่หรือไม่?้
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={onCancel} color="black80">
            ยกเลิก
          </Button>
          <Button onClick={handleOnClickConfirm} variant="contained" color="error" autoFocus>
            ยืนยันการลบ
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

import { Box, Button, ButtonProps, Stack, Typography } from "@mui/material";
import { IconEdit } from "./Icons";

type ButtonEditProps = {
  editMode?: boolean;
  onClickEditMode?: () => void;
  onClickCancelEditMode?: () => void;
};

export default function ButtonEdit({ onClickEditMode, onClickCancelEditMode, editMode }: ButtonEditProps) {
  return (
    <Stack direction={"row"}>
      <Button
        variant="text"
        onClick={() => onClickEditMode && onClickEditMode()}
        style={{ display: editMode ? "none" : "inherit" }}
      >
        <Box component={"img"} width={17.4} height={16} src="/icons/Line.png" />
        <Typography ml={1}>แก้ไข</Typography>
      </Button>
      <Button
        variant="text"
        onClick={() => onClickCancelEditMode && onClickCancelEditMode()}
        style={{ display: !editMode ? "none" : "inherit" }}
      >
        <Box component={"img"} width={17.4} height={16} src="/icons/Line.png" style={{ visibility: "hidden" }} />
        <Typography ml={1}>ยกเลิก</Typography>
      </Button>
    </Stack>
  );
}

type ButtonEditBaseProps = {
  text?: string;
  withText?: boolean;
  withIcon?: boolean;
} & ButtonProps;

export function ButtonEditBase({
  variant = "text",
  withText = true,
  withIcon = true,
  text = "แก้ไข",
  ...props
}: ButtonEditBaseProps) {
  return (
    <Button variant={variant} {...props}>
      {withIcon && <IconEdit />}
      {withText && <Typography ml={1}>{text}</Typography>}
    </Button>
  );
}

export function ButtonCancelBase(props: ButtonProps) {
  return (
    <Button variant="text" {...props}>
      <Typography>ยกเลิก</Typography>
    </Button>
  );
}

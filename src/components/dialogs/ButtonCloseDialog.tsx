import { Close } from "@mui/icons-material";
import { IconButton, IconButtonProps } from "@mui/material";
import React from "react";

export default function ButtonCloseDialog(props: IconButtonProps) {
  const { sx, ...other } = props;

  return (
    <IconButton
      aria-label="close"
      sx={{
        position: "absolute",
        right: 20,
        top: 20,
        color: (theme) => theme.palette.grey[500],
        ...(sx || {})
      }}
      {...other}
    >
      <Close />
    </IconButton>
  );
}

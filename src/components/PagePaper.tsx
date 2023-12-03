import { Box, BoxProps } from "@mui/material";
import React from "react";

export default function PagePaper(props: BoxProps) {
  const { sx, ...rest } = props;

  return (
    <Box
      sx={{
        bgcolor: "#fff",
        py: "24px",
        px: "24px",
        boxShadow: "0px 1px 8px 0px rgba(0, 0, 0, 0.10)",
        borderRadius: "12px",
        ...(sx || {})
      }}
      {...rest}
    >
      {rest.children}
    </Box>
  );
}

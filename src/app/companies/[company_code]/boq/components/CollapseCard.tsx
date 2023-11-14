import { KeyboardArrowUp } from "@mui/icons-material";
import { Box, BoxProps, IconButton, Stack, Typography } from "@mui/material";
import { useState } from "react";

export type CollapseCardProps = {
  children?: React.ReactNode;
  action?: React.ReactNode;
  title: string;
  open?: boolean;
  disabledPadding?: boolean;
  color?: string;
  titleProps?: BoxProps;
  bodyProps?: BoxProps;
  bordered?: boolean;
} & BoxProps;

export function CollapseCard({
  children,
  action,
  title,
  open,
  disabledPadding,
  color,
  titleProps,
  bodyProps,
  bordered,
  ...props
}: CollapseCardProps) {
  const [collapse, setCollapse] = useState(open || false);
  const { sx, ...boxProps } = props;

  return (
    <Box
      {...boxProps}
      className="win-card"
      sx={{
        ...(sx || {}),
        // borderRadius: "12px",
        overflow: "hidden",
        border: bordered ? "1px solid #E8E8E8" : "none"
      }}
    >
      <Box
        className="win-card-title"
        sx={{
          ...(titleProps?.sx || {}),
          py: 2.5,
          px: 2.5,
          cursor: "pointer"
        }}
        onClick={() => setCollapse(!collapse)}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="body_M_B">{title}</Typography>
          <Stack direction="row" alignItems="center" spacing={2.5}>
            {action}
            <IconButton onClick={() => setCollapse(!collapse)} size="small">
              <KeyboardArrowUp
                fontSize="small"
                sx={{
                  transition: "transform 0.3s ease-in-out",
                  transform: collapse ? "rotate(180deg)" : "rotate(0deg)"
                }}
              />
            </IconButton>
          </Stack>
        </Stack>
      </Box>
      <Box
        sx={
          {
            // maxHeight: collapse ? "10000px" : "0px",
            // transition: "max-height 1s",
            // overflow: "hidden",
            // transform: collapse ? "scaleY(1)" : "scaleY(0)",
            // transition: "transform 0.3s ease-in-out, opacity 0.15s ease-in-out",
            // transformOrigin: "top",
            // opacity: collapse ? 1 : 0
          }
        }
      >
        <Box
          className="win-card-body"
          sx={{
            ...(bodyProps?.sx || {}),
            display: collapse ? "block" : "none",
            padding: disabledPadding ? 0 : 3,
            "& .MuiTableBody-root > .MuiTableRow-root:last-child .MuiTableCell-root": {
              borderBottom: "none"
            }
            // "& .MuiTableHead-root > .MuiTableRow-head > .MuiTableCell-head": (theme) => ({
            //   ...theme.typography.body_M_B
            // })
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}

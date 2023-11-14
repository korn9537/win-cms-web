import { StackProps, Stack } from "@mui/material";

export function CollapseGroup({ children, ...props }: StackProps) {
  return (
    <Stack
      {...props}
      sx={{
        "& > .win-card": {
          "&:first-of-type": {
            borderTopLeftRadius: "12px",
            borderTopRightRadius: "12px"
          },
          "&:last-of-type": {
            borderBottomLeftRadius: "12px",
            borderBottomRightRadius: "12px"
          }
        }
      }}
    >
      {children}
    </Stack>
  );
}

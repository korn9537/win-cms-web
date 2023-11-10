import { Chip, useTheme } from "@mui/material";

type ChipStatusProps = {
  state: "active" | "inactive";
  text?: string;
  color?: string;
};
export default function ChipStatus(props: ChipStatusProps) {
  const theme = useTheme();

  const bgColorMap = {
    inactive: theme.palette.deepBlue[20],
    active: theme.palette.green[10]
  };

  const textColorMap = {
    inactive: theme.palette.deepBlue[60],
    active: theme.palette.green[100]
  };

  let stateText = "";

  switch (props.state) {
    case "active":
      stateText = "เปิดใช้งาน";
      break;
    case "inactive":
      stateText = "ปิดใช้งาน";
      break;
  }

  return (
    <Chip
      label={props.text || stateText}
      sx={{
        "&": {
          bgcolor: bgColorMap[props.state],
          color: textColorMap[props.state],
          ...theme.typography.body_XS_B,
          height: "auto",
          ".MuiChip-label": {
            padding: "2px 8px"
          }
        }
      }}
    />
  );
}

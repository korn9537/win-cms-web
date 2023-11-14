import styled from "@emotion/styled";
import { Box, Stack, Switch, SwitchProps, Typography } from "@mui/material";
import PagePaper from "./PagePaper";

type SwitchStatusProps = {
  disabled?: boolean;
  title?: string;
};

export function SwitchStatus({ title = "เปิดใช้งาน", ...props }: SwitchStatusProps) {
  return (
    <PagePaper>
      <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={3}>
        <Typography variant="title_S">{title}</Typography>
        <Box>
          <IOSSwitch {...props} inputProps={{ "aria-label": "controlled" }} />
        </Box>
      </Stack>
    </PagePaper>
  );
}

export default SwitchStatus;

export const IOSSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme, size }) => ({
  width: 44,
  height: size == "medium" ? 26 : 24,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: `translateX(${44 / 2 - 2}px)`,
      color: "#fff",
      "& + .MuiSwitch-track": {
        // backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
        // backgroundColor: "#65C466",
        // backgroundColor: "#E8E8E8",
        // backgroundColor: theme.palette.neutralGray[100],
        backgroundColor: theme.palette.green[100],
        opacity: 1,
        border: 0
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5
      }
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff"
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      // color: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[600],
      color: "#f5f5f5"
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      // opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
      opacity: 0.7
    }
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: (size == "medium" ? 26 : 24) - 4,
    height: (size == "medium" ? 26 : 24) - 4
  },
  "& .MuiSwitch-track": {
    borderRadius: (size == "medium" ? 26 : 24) / 2,
    // backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
    // backgroundColor: "#E9E9EA",
    backgroundColor: theme.palette.neutralGray[20],
    opacity: 1
    // transition: theme.transitions.create(['background-color'], {
    //   duration: 500,
    // }),
  }
}));

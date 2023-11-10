import { ASIDE_WIDTH_LG, ASIDE_WIDTH_SM } from "@/constants/layout.constant";
import { APP_PATH_HOME } from "@/constants/location.constant";
import { useLayoutStore } from "@/stores/layout.store";
import KeyboardDoubleArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowLeftOutlined";
import KeyboardDoubleArrowRightOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowRightOutlined";
import { Box, IconButton, Tooltip } from "@mui/material";
import Link from "next/link";
import PerfectScrollbar from "react-perfect-scrollbar";

type AppAsideMenuProps = {
  // asideVisible: boolean;
  // onToggleAside: (visible: boolean) => void;
  children?: React.ReactNode;
};

export default function AppAsideMenu(props: AppAsideMenuProps) {
  const { menuSize, toggleMenuSize } = useLayoutStore((state) => ({
    menuSize: state.menuSize,
    toggleMenuSize: state.toggleMenuSize
  }));

  return (
    <Box
      className="app-aside-menu"
      sx={{
        height: "100vh",
        width: menuSize == "large" ? ASIDE_WIDTH_LG : ASIDE_WIDTH_SM,
        // transition: '0.3s',
        bgcolor: "#FFFFFF",
        borderRight: "1px solid #E8E8E8",
        display: "flex",
        flexDirection: "column"
      }}
    >
      {/* Logo */}
      <Box
        sx={{
          height: 70,
          px: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: menuSize == "large" ? "unset" : "center"
        }}
      >
        <Link href={APP_PATH_HOME}>
          <Box
            component="img"
            alt="logo"
            src="/images/Logo.png"
            width={136}
            height={32}
            sx={{
              display: menuSize == "large" ? "block" : "none"
            }}
          />
        </Link>
        <Link href={APP_PATH_HOME}>
          <Box
            component="img"
            alt="logo"
            src="/images/Logo SM.png"
            width={40}
            height={40}
            sx={{
              display: menuSize == "large" ? "none" : "block"
            }}
          />
        </Link>
      </Box>

      {/* Menu */}
      <Box sx={{ flex: 1, position: "relative" }}>
        <Box
          sx={{
            position: "absolute",
            height: "100%",
            width: "100%"
          }}
        >
          <PerfectScrollbar>
            <Box
              sx={{
                px: 1.5,
                pt: 3
              }}
            >
              {props.children}
            </Box>
          </PerfectScrollbar>
        </Box>
      </Box>

      <Box
        sx={{
          px: 1.5,
          pb: 3,
          mt: "10px",
          textAlign: menuSize == "large" ? "left" : "center"
        }}
      >
        <Tooltip title="ย่อ/ขยายเมนูหลัก">
          <IconButton size="small" onClick={() => toggleMenuSize()}>
            {menuSize == "large" ? <KeyboardDoubleArrowLeftOutlinedIcon /> : <KeyboardDoubleArrowRightOutlinedIcon />}
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
}

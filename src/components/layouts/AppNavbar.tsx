"use client";

import { useAuthStore } from "@/stores/auth.store";
import { LockOutlined, LogoutOutlined } from "@mui/icons-material";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import { Avatar, Box, ButtonBase, Divider, Menu, MenuItem, Stack, useTheme } from "@mui/material";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { useRouter, useSelectedLayoutSegment } from "next/navigation";
import React from "react";

const settings = [
  {
    name: "เปลี่ยนรหัสผ่าน",
    icon: <LockOutlined />,
    link: "/auth/change-password"
  },
  {
    name: "ออกจากระบบ",
    icon: <LogoutOutlined />,
    link: "/auth/logout"
  }
];

const modules = [
  {
    name: "Project Master",
    link: "/project"
  },
  {
    name: "Sale Order",
    link: "/saleorder"
  },
  {
    name: "User Management",
    link: "/user-management"
  }
];

export type AppNavbarProps = {
  showLogo?: boolean;
  hideModuleSelector?: boolean;
};

export default function AppNavbar({ hideModuleSelector = false, ...props }: AppNavbarProps) {
  // statics
  const router = useRouter();
  const theme = useTheme();
  const segment = useSelectedLayoutSegment() || "project";
  let module = modules.find((w) => w.link == `/${segment}`);

  if (!module) {
    module = modules[0];
  }

  // load session
  const {
    is_authenticated,
    // loadProfile,
    profile,
    role
  } = useAuthStore((state) => ({
    is_authenticated: state.is_authenticated,
    // loadProfile: state.loadProfile,
    profile: state.profile,
    role: state.role
  }));

  // useEffect(() => {
  //   if (!is_authenticated) {
  //     const token = localStorage.getItem(KEY_SESSION);
  //     if (token) {
  //       loadProfile(token);
  //     }
  //   }
  //   return () => {};
  // }, []);

  // states
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  // actions
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (href: string | null) => () => {
    setAnchorElNav(null);
    if (href) {
      router.push(href);
    }
  };

  const handleCloseUserMenu = (href: string | null) => () => {
    setAnchorElUser(null);
    if (href) {
      router.push(href);
    }
  };

  return (
    <Box
      sx={{
        height: 70,
        display: "flex",
        alignItems: "center",
        borderBottom: "1px solid #E8E8E8",
        bgcolor: "#FFFFFF",
        // position: 'sticky',
        top: 0,
        width: "100%",
        zIndex: theme.zIndex.appBar
      }}
    >
      <Box sx={{ flexGrow: 1, px: 2, display: "flex", justifyContent: "space-between" }}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Typography variant="body_M_B">เอ็ม บี เอส พร้อพเพอร์ตี้</Typography>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={2}>
          {/* Chat, Noti, Lang */}
          <Stack direction="row" spacing={2}>
            <ButtonBase>
              <Image alt="chat" src="/icons/Chat.png" width={24} height={24} />
            </ButtonBase>
            <ButtonBase>
              <Image alt="notify" src="/icons/Notify.png" width={24} height={24} />
            </ButtonBase>
            <ButtonBase>
              <Image alt="lang" src="/icons/TH.png" width={24} height={24} />
            </ButtonBase>
          </Stack>
          <Divider orientation="vertical" flexItem />
          {/* Credit */}
          <Stack direction="row" spacing={0.5}>
            <Image alt="coin" src="/icons/Coin.png" width={24} height={24} />
            <Typography fontSize={15}>50,000,000</Typography>
            <ButtonBase sx={{ p: 0.5 }}>
              <AddCircleOutlineOutlinedIcon sx={{ width: 16, height: 16, color: "#1A73E8" }} />
            </ButtonBase>
          </Stack>
          <Divider orientation="vertical" flexItem />
          {/* Account */}
          <Box>
            <ButtonBase sx={{ display: "flex", alignItems: "center", gap: 2 }} onClick={handleOpenUserMenu}>
              <Avatar alt="user" src="/icons/User.png" sx={{ width: 32, height: 32 }} />
              <Box>
                <Typography fontSize={15} fontWeight={700}>
                  {profile?.name}
                </Typography>
                <Typography fontSize={13} color="#8E8E8E">
                  {role}
                </Typography>
              </Box>
              <ExpandMoreOutlinedIcon
                sx={{
                  width: 20,
                  height: 20
                }}
              />
            </ButtonBase>
            <Menu
              sx={{
                mt: "48px"
              }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu(null)}
            >
              {settings.map((setting) => (
                <MenuItem disableGutters={true} key={setting.link} onClick={handleCloseUserMenu(setting.link)}>
                  {setting.icon}
                  <Typography component="span" ml={1.5}>
                    {setting.name}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}

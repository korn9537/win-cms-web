"use client";

import AppAsideMenu from "@/components/layouts/AppAsideMenu";
import AppNavbar, { AppNavbarProps } from "@/components/layouts/AppNavbar";
import { KEY_SESSION } from "@/configs/app.config";
import { ASIDE_WIDTH_LG, ASIDE_WIDTH_SM } from "@/constants/layout.constant";
import { useAuthStore } from "@/stores/auth.store";
import { useLayoutStore } from "@/stores/layout.store";
import { Box, useTheme } from "@mui/material";
import { useSelectedLayoutSegment, useSelectedLayoutSegments } from "next/navigation";
import { useEffect } from "react";
import AppBackdrop from "./AppBackdrop";
import AppMenu, { MyMenu } from "./AppMenu";
import axios from "axios";

type AppLayoutProps = {
  children: React.ReactNode;
  menus?: MyMenu[];
  requireAuth?: boolean;
  navbarProps?: AppNavbarProps;
};

export default function AppLayout(props: AppLayoutProps) {
  // statics
  const theme = useTheme();
  let selectedMenu = useSelectedLayoutSegment();
  const selectedMenuSegments = useSelectedLayoutSegments();

  if (selectedMenu == "master-data") {
    selectedMenu = selectedMenuSegments[1];
  }

  // console.log('AppLayout', selectedMenu);

  // auth
  const auth = useAuthStore((state) => ({
    is_authenticated: state.is_authenticated,
    is_loading: state.is_loading,
    is_loaded: state.is_loaded,
    loadProfile: state.loadProfile,
    loading: state.loading
  }));

  // aside
  const { menuSize, menus, setMenus } = useLayoutStore((state) => ({
    menuSize: state.menuSize,
    menus: state.menus,
    setMenus: state.setMenus
  }));

  useEffect(() => {
    if (!props.requireAuth) {
      return;
    }

    // check auth
    if (!auth.is_authenticated) {
      const token = localStorage.getItem(KEY_SESSION);
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        auth.loadProfile(token);
      } else {
        window.location.href = "/auth/login";
      }
    }
  }, [props.requireAuth, auth.is_loading]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  useEffect(() => {
    if (props.menus) {
      setMenus(props.menus);
    }
  }, [props.menus]);

  if (props.requireAuth && !auth.is_loaded) {
    return (
      <AppBackdrop
        backdropProps={{
          open: true
        }}
      />
    );
  }

  // aside
  // const menuList = props.menus || menus || [];

  const menuList = menus || [];
  const hasMenu = menuSize != "hidden" && menuList.length > 0;

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh"
      }}
    >
      {hasMenu && (
        <Box
          sx={{
            width: menuSize == "large" ? ASIDE_WIDTH_LG : ASIDE_WIDTH_SM,
            bgcolor: theme.palette.grey[300],
            zIndex: 1
            // boxShadow: '0px 1px 8px 0px rgba(0, 0, 0, 0.10)',
          }}
        >
          <AppAsideMenu>
            <AppMenu disabledText={menuSize == "small"} menus={menuList} value={selectedMenu} />
          </AppAsideMenu>
        </Box>
      )}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column"
        }}
      >
        <AppNavbar {...props.navbarProps} />
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column"
          }}
        >
          {props.children}
        </Box>
      </Box>
    </Box>
  );
}

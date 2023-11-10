'use client';

import { SUB_MENU_WIDTH_LG, SUB_MENU_WIDTH_SM } from '@/constants/layout.constant';
import { useModuleLayoutStore } from '@/stores/module-layout.store';
import { KeyboardDoubleArrowLeftOutlined, KeyboardDoubleArrowRightOutlined } from '@mui/icons-material';
import { Box, IconButton, Tooltip, useTheme } from '@mui/material';
import { useSelectedLayoutSegment } from 'next/navigation';
import React from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import AppMenu, { MyMenu } from './AppMenu';
import { ModuleBreadcrumbItem } from './ModuleBreadcrumb';
import { ModuleTitle } from './ModuleTitle';

export type ModuleLayoutProps = {
  breadcrumb?: ModuleBreadcrumbItem[];
  title: string;
  onBack?: () => void;
  actions?: React.ReactNode;
  menus?: MyMenu[];
  children: React.ReactNode;
};

export default function ModuleLayout(props: ModuleLayoutProps) {
  // statics
  const theme = useTheme();
  let selectedMenu = useSelectedLayoutSegment();

  // console.log('ModuleLayout', selectedMenu);

  selectedMenu = selectedMenu || 'info';

  const layout = useModuleLayoutStore((state) => ({
    isCleanLayout: state.isCleanLayout,
    menuSize: state.menuSize,
    toggleMenuSize: state.toggleMenuSize,
  }));

  const hasMenu = (props.menus && props.menus.length > 0) || false;

  // render
  if (layout.isCleanLayout) {
    return (
      <Box
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {props.children}
      </Box>
    );
  }

  return (
    <Box
      className="main-container"
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Toolbar */}
      <ModuleTitle title={props.title} breadcrumb={props.breadcrumb} onBack={props.onBack} actions={props.actions} />
      {/*  */}

      {/* Body */}
      <Box
        sx={{
          display: 'flex',
          flex: 1,
        }}
      >
        {/* Aside */}
        {hasMenu && (
          <Box
            sx={{
              width: layout.menuSize == 'large' ? SUB_MENU_WIDTH_LG : SUB_MENU_WIDTH_SM,
              bgcolor: theme.palette.common.white,
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              boxShadow: '0px 1px 8px 0px rgba(0, 0, 0, 0.10)',
            }}
          >
            {/* Sub Menu */}
            <Box
              sx={{
                height: '100%',
                position: 'relative',
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  height: '100%',
                  width: '100%',
                }}
              >
                <PerfectScrollbar>
                  <Box
                    sx={{
                      // px:  1.5,
                      pt: layout.menuSize == 'small' ? 2.5 : 0,
                    }}
                  >
                    <AppMenu
                      menus={props.menus || []}
                      disabledText={layout.menuSize == 'small'}
                      type="sub"
                      value={selectedMenu}
                    />
                  </Box>
                </PerfectScrollbar>
              </Box>
            </Box>

            {/* Toggle Button */}
            <Box
              sx={{
                px: 1.5,
                pb: 3,
                mt: '10px',
                textAlign: layout.menuSize == 'large' ? 'left' : 'center',
              }}
            >
              <Tooltip title="ย่อ/ขยายเมนู">
                <IconButton size="small" onClick={() => layout.toggleMenuSize()}>
                  {layout.menuSize == 'large' ? (
                    <KeyboardDoubleArrowLeftOutlined />
                  ) : (
                    <KeyboardDoubleArrowRightOutlined />
                  )}
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        )}
        {/*  */}

        {/* Content */}
        <Box
          className="content-wrapper"
          sx={{
            display: 'flex',
            flex: 1,
            minHeight: '0px',
            position: 'relative',
          }}
        >
          <Box
            className="overflow-container"
            sx={{
              flex: 1,
              height: '100%',
              width: '100%',
              overflow: 'auto',
              position: 'absolute',
            }}
          >
            {props.children}
          </Box>
        </Box>
        {/*  */}
      </Box>
      {/*  */}
    </Box>
  );
}

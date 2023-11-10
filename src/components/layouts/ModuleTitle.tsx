'use client';

import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import { Box, ButtonBase, Stack, Typography, useTheme } from '@mui/material';
import React from 'react';
import { LogoBarWin } from '../Icons';
import ModuleBreadcrumb, { ModuleBreadcrumbItem } from './ModuleBreadcrumb';

export type ModuleTitleProps = {
  onBack?: () => void;
  title: string | React.ReactNode;
  breadcrumb?: ModuleBreadcrumbItem[];
  actions?: React.ReactNode;
};

export function ModuleTitle(props: ModuleTitleProps) {
  // statics
  const theme = useTheme();
  const hasBreadcrumb = (props.breadcrumb && props.breadcrumb.length > 0) || false;

  function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
  }

  return (
    <Box
      sx={{
        px: 4,
        py: 2.5,
        backgroundColor: theme.palette.deepBlue[100],
        color: 'white',
        position: 'relative',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          right: 230,
          top: 0,
        }}
      >
        <LogoBarWin />
      </Box>
      <Stack direction={'row'} justifyContent={'space-between'}>
        <Box className="x-box-breadcrumb">
          {/* Breadcrumb */}
          {hasBreadcrumb && <ModuleBreadcrumb items={props.breadcrumb || []} onClick={handleClick} />}
          {/* Title */}
          <Box
            className="layout-title-box"
            sx={{
              // minHeight: 42,
              display: 'block',
            }}
          >
            <Stack direction="row" spacing={1.5}>
              <ButtonBase
                onClick={() => {
                  props.onBack && props.onBack();
                }}
              >
                <ArrowBackOutlinedIcon sx={{ width: 20, height: 20 }} />
              </ButtonBase>
              <Typography variant="title_S" sx={{ lineHeight: '24px' }}>
                {props.title}
              </Typography>
            </Stack>
          </Box>
        </Box>
        {/* Actions */}
        {props.actions && (
          <Box
            sx={{
              alignSelf: 'end',
            }}
          >
            {props.actions}
          </Box>
        )}
      </Stack>
    </Box>
  );
}

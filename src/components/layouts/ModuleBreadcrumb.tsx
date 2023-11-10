import { Box, Breadcrumbs, Typography, useTheme } from '@mui/material';
import Link from 'next/link';
import React from 'react';

export type ModuleBreadcrumbItem = {
  title: string;
  href?: string;
};

export type ModuleBreadcrumbProps = {
  items: ModuleBreadcrumbItem[];
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

export default function ModuleBreadcrumb(props: ModuleBreadcrumbProps) {
  const theme = useTheme();

  return (
    <Box role="presentation" onClick={props.onClick} mb={1.5}>
      <Breadcrumbs
        aria-label="breadcrumb"
        sx={{
          '&, & .MuiBreadcrumbs-separator, & .MuiTypography-root': {
            ...theme.typography.body_XS,
          },
          '& a > .MuiTypography-root': {
            color: theme.palette.deepBlue[60],
          },
          '& .MuiBreadcrumbs-separator': {
            color: theme.palette.deepBlue[60],
          },
          '& .MuiTypography-root': {
            color: theme.palette.deepBlue[20],
          },
        }}
      >
        {props.items?.map((item) => {
          const key = item.href || item.title;

          if (item.href) {
            return (
              <Link key={key} href={item.href}>
                <Typography component="span">{item.title}</Typography>
              </Link>
            );
          }

          return (
            <Typography key={key} component="span">
              {item.title}
            </Typography>
          );
        })}
      </Breadcrumbs>
    </Box>
  );
}

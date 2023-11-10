'use client';

import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import { Box, BoxProps, ButtonBase, Stack, Typography } from '@mui/material';
import _ from 'lodash';
import { useRouter } from 'next/navigation';
import React, { Fragment, useEffect } from 'react';
import PageToolbarActionMenuButton, { PageToolbarActionMenuButtonProps } from './PageToolbarButtonMenu';
import { SPACING_LAYOUT } from '@/constants/layout.constant';

export type PageToolbarProps = {
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  actions?: React.ReactNode | React.ReactNode[];
  backUrl?: string;
  backFunction?: () => void;
  disableDocumentTitle?: boolean;
  menuButtons?: PageToolbarActionMenuButtonProps;
  flexDirection?: 'row' | 'column';
  sticky?: boolean;
  dropShadow?: boolean;
  disableMargin?: boolean;
};

export default function PageToolbar({
  title,
  description,
  actions,
  backUrl,
  backFunction,
  disableDocumentTitle = false,
  menuButtons,
  flexDirection = 'row',
  sticky = false,
  dropShadow = false,
  disableMargin = false,
}: PageToolbarProps) {
  const router = useRouter();

  //
  useEffect(() => {
    if (!disableDocumentTitle) {
      if (title) {
        document.title = title as string;
      }
    }

    return () => {
      if (!disableDocumentTitle) {
        if (title) {
          document.title = 'WINWIN Platform';
        }
      }
    };
  }, [title]);

  // mb: 5

  // return (
  //   <Box className="app-page-toolbar">
  //     {/* Toolbar */}
  //     <Stack direction={flexDirection} alignItems="start" justifyContent="space-between" spacing={2.5}>
  //       <Box
  //         sx={{
  //           minWidth: 300,
  //         }}
  //       >
  //         <Stack direction="row" spacing={1.5}>
  //           {(backUrl || backFunction) && (
  //             <ButtonBase
  //               onClick={() => {
  //                 if (backUrl) router.push(backUrl);
  //                 if (backFunction) backFunction();
  //               }}
  //             >
  //               <ArrowBackOutlinedIcon sx={{ width: 20, height: 20 }} />
  //             </ButtonBase>
  //           )}

  //           <Stack spacing={0.5}>
  //             {title && typeof title == 'string' ? (
  //               <Typography variant="title_M" fontWeight={700} whiteSpace="nowrap">
  //                 {title}
  //               </Typography>
  //             ) : (
  //               title
  //             )}
  //             {description && typeof description == 'string' ? (
  //               <Typography variant="body_XS">{description}</Typography>
  //             ) : (
  //               description
  //             )}
  //           </Stack>
  //         </Stack>
  //       </Box>
  //       {Array.isArray(actions) ? (
  //         <Stack direction="row" spacing={2}>
  //           {actions.map((action) => (
  //             <Fragment key={_.uniqueId('toolbar-action-')}>{action}</Fragment>
  //           ))}
  //         </Stack>
  //       ) : (
  //         // <Box
  //         //   sx={{
  //         //     whiteSpace: 'nowrap',
  //         //   }}
  //         // >
  //         //   {actions}
  //         // </Box>
  //         actions
  //       )}
  //     </Stack>
  //   </Box>
  // );

  return (
    <Box
      className="app-page-toolbar"
      sx={{
        position: sticky ? 'sticky' : 'relative',
        top: 0,
        zIndex: 2,
        backgroundColor: '#F5F6F8',
        py: sticky ? SPACING_LAYOUT : 0,
        px: sticky ? 4 : 0,
        boxShadow: dropShadow ? '5px 1px 8px 0px rgba(0, 0, 0, 0.10)' : 'none',
        // borderBottom: sticky ? '1px solid' : 'none',
        // borderColor: 'divider',
        // mb: 5,
        // p: 2,
        mb: sticky || disableMargin ? 0 : SPACING_LAYOUT,
      }}
    >
      {/* Toolbar */}
      <Stack direction={flexDirection} alignItems="start" justifyContent="space-between" spacing={2.5}>
        {/* Title */}
        <Box
          sx={{
            flex: 1,
          }}
        >
          <Stack direction="row" spacing={1.5}>
            {(backUrl || backFunction) && (
              <ButtonBase
                onClick={() => {
                  if (backUrl) router.push(backUrl);
                  if (backFunction) backFunction();
                }}
              >
                <ArrowBackOutlinedIcon sx={{ width: 20, height: 20 }} />
              </ButtonBase>
            )}

            <Stack spacing={0.5}>
              {title && typeof title == 'string' ? (
                <Typography variant="title_M" fontWeight={700} whiteSpace="nowrap">
                  {title}
                </Typography>
              ) : (
                title
              )}
              {description && typeof description == 'string' ? (
                <Typography variant="body_XS">{description}</Typography>
              ) : (
                description
              )}
            </Stack>
          </Stack>
        </Box>
        {/* Buttons */}
        <Box>{actions}</Box>
        {/* Action Button */}
        {/* <Box>
          <PageToolbarActionMenuButton onHistory={() => {}} />
        </Box> */}
      </Stack>
    </Box>
  );
}

'use client';

import { useLayoutStore } from '@/stores/layout.store';
import { Backdrop, BackdropProps, Box, CircularProgress, Stack, Typography } from '@mui/material';

type AppBackdropProps = {
  backdropProps?: BackdropProps;
  text?: string;
};

export default function AppBackdrop(props: AppBackdropProps) {
  const { open, ...otherProps } = props.backdropProps || {};
  const isShowBackdrop = useLayoutStore((state) => state.isShowBackdrop);

  return (
    <Backdrop
      sx={{ color: '#000', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={isShowBackdrop || open || false}
      // open
      {...otherProps}
    >
      <Box
        sx={{
          bgcolor: 'background.paper',
          p: 3,
          minWidth: 240,
          minHeight: 240,
          borderRadius: '8px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          boxShadow: (theme) => theme.shadows[4],
        }}
      >
        <Stack spacing={5} alignItems="center" justifyContent="center">
          <Box component="img" alt="logo" src="/images/Logo.png" height={32} />
          <Stack spacing={3} alignItems="center" justifyContent="center">
            <CircularProgress color="success" size="32px" />
            <Typography variant="body_S">{props.text || 'Loading...'}</Typography>
          </Stack>
        </Stack>
      </Box>
    </Backdrop>
  );
}

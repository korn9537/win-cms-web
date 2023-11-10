import { BoxProps, Typography } from '@mui/material';
import React from 'react';

export default function RedStar(props: BoxProps) {
  return (
    <Typography
      component={'span'}
      sx={{
        color: (theme) => theme.palette.red[100],
        display: 'inline',
      }}
      {...props}
    >
      *
    </Typography>
  );
}

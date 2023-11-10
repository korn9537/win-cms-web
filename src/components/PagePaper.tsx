import { Box } from '@mui/material';
import React from 'react';

export default function PagePaper({ children, sx = {} }: { children: React.ReactNode; sx?: any }) {
  return (
    <Box
      sx={{
        bgcolor: '#fff',
        py: '24px',
        // px: '20px',
        px: '24px',
        // mb: 5,
        boxShadow: '0px 1px 8px 0px rgba(0, 0, 0, 0.10)',
        borderRadius: '12px',
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}

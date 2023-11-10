import { Box } from '@mui/material';
import React from 'react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', bgcolor: '#FFF' }}>
      <Box
        sx={{
          width: { xs: '100%', lg: 320 },
          minHeight: '100vh',
          bgcolor: 'primary.main',
          position: 'fixed',
          left: 0,
          top: 0,
          objectFit: 'cover',
        }}
        component="img"
        src="/images/login-bg.png"
      ></Box>
      <Box
        sx={{
          width: '100%',
          maxWidth: 450,
          bgcolor: { xs: '#FFF', lg: 'transparent' },
          p: 3,
          zIndex: 1,
          transition: 'all 0.3s',
          borderRadius: 2,
          boxShadow: { xs: '0px 0px 10px rgba(0, 0, 0, 0.1)', lg: 'none' },
        }}
      >
        {children}
      </Box>
    </Box>
  );

  // return (
  //   <Box sx={{ display: 'flex', minHeight: '100vh', width: '100%', bgcolor: '#FFF' }}>
  //     <Box
  //       sx={{
  //         width: { xs: '100%', lg: 320 },
  //         minHeight: '100vh',
  //         bgcolor: 'primary.main',
  //         // position: 'fixed',
  //         // left: 0,
  //         // top: 0,
  //         objectFit: 'cover',
  //       }}
  //       component="img"
  //       src="/images/login-bg.png"
  //     ></Box>
  //     <Box
  //       sx={{
  //         flex: 1,
  //         display: 'flex',
  //         alignItems: 'center',
  //         justifyContent: 'center',
  //       }}
  //     >
  //       <Box
  //         sx={{
  //           justifyContent: 'center',
  //           width: '100%',
  //           maxWidth: 450,
  //           bgcolor: { xs: '#FFF', lg: 'transparent' },
  //           p: 3,
  //           zIndex: 1,
  //           transition: 'all 0.3s',
  //           borderRadius: 2,
  //           boxShadow: { xs: '0px 0px 10px rgba(0, 0, 0, 0.1)', lg: 'none' },
  //         }}
  //       >
  //         {children}
  //       </Box>
  //     </Box>
  //   </Box>
  // );
}

import { ToastMessage, useLayoutStore } from '@/stores/layout.store';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { Alert, AlertColor, AlertTitle, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import { useState } from 'react';

export default function PanelToastMessage() {
  const theme = useTheme();

  const { toasts, removeToast } = useLayoutStore((state) => {
    return {
      toasts: state.toasts,
      removeToast: state.removeToast,
    };
  });

  const [open, setOpen] = useState<boolean>(false);
  const [toast, setToast] = useState<ToastMessage>();

  const handleClose = () => {
    removeToast(toast?.key);
    setOpen(false);
  };

  if (toasts.length > 0 && !open) {
    setToast(toasts[0]);
    setOpen(true);
  }

  // console.log('toasts', toasts, open);

  if (!open) {
    return null;
  }

  return (
    <Snackbar
      open={open}
      anchorOrigin={toast?.options?.origin || { horizontal: 'right', vertical: 'top' }}
      autoHideDuration={toast?.options?.duration || 3000}
      onClose={handleClose}
      sx={{
        '&': {
          top: 94,
          right: 32,
        },
        '& .MuiPaper-root': {
          p: 1.5,
          boxShadow: '0px 1px 8px 0px rgba(0, 0, 0, 0.10)',
          '> div': {
            p: 0,
          },
          '> .MuiAlert-action': {
            ml: 2.5,
          },
        },
        '& .MuiAlert-message': {
          color: theme.palette.text.primary,
          width: 240,
        },
        '& .MuiAlertTitle-root': {
          m: 0,
          ...theme.typography.body_M_B,
          color: theme.palette[toast?.type || 'success'].main,
        },
      }}
    >
      <Alert
        onClose={handleClose}
        iconMapping={{
          success: (
            <RoundIcon severity={toast?.type as AlertColor}>
              <CheckOutlinedIcon fontSize="inherit" />
            </RoundIcon>
          ),
          error: (
            <RoundIcon severity={toast?.type as AlertColor}>
              <CloseOutlinedIcon fontSize="inherit" />
            </RoundIcon>
          ),
        }}
        severity={toast?.type}
        sx={{ width: '100%' }}
      >
        <AlertTitle>{toast?.title}</AlertTitle>
        {toast?.message}
      </Alert>
    </Snackbar>
  );
}

function RoundIcon({ children, severity }: { children: React.ReactNode; severity: AlertColor }) {
  return (
    <Box
      sx={{
        backgroundColor: (theme) => theme.palette[severity].main,
        width: 32,
        height: 32,
        borderRadius: '50%',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {children}
    </Box>
  );
}

// import { UseDialogProps } from '@/hooks/useDialog';
// import { Close } from '@mui/icons-material';
// import { IconButton } from '@mui/material';
// import Button from '@mui/material/Button';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogTitle from '@mui/material/DialogTitle';

// export default function AlertDialog({
//   buttonConfirmText = 'ตกลง',
//   buttonConfirmVariant = 'contained',
//   buttonConfirmColor = 'primary',
//   buttonConfirmPosition = 'right',
//   ...props
// }: UseDialogProps) {
//   return (
//     <Dialog
//       {...(props.DialogProps || {})}
//       open={props.open}
//       onClose={props.onCancel}
//       fullWidth={true}
//       maxWidth="sm"
//       aria-labelledby="alert-dialog-title"
//       aria-describedby="alert-dialog-description"
//     >
//       {props.title && <DialogTitle>{props.title}</DialogTitle>}
//       <AlertDialogTitle onClose={props.onCancel}>{props.title}</AlertDialogTitle>
//       <DialogContent>{props.content}</DialogContent>
//       <DialogActions
//         sx={{
//           justifyContent: 'center',
//         }}
//       >
//         {/* <Button onClick={props.onCancel}>Disagree</Button> */}
//         <Button onClick={props.onConfirm} autoFocus variant={buttonConfirmVariant} color={buttonConfirmColor}>
//           {buttonConfirmText}
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// }

// export interface AlertDialogTitleProps {
//   id?: string;
//   children?: React.ReactNode;
//   onClose?: () => void;
// }

// function AlertDialogTitle(props: AlertDialogTitleProps) {
//   const { children, onClose, ...other } = props;

//   return (
//     <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
//       {children}
//       {onClose ? (
//         <IconButton
//           aria-label="close"
//           onClick={onClose}
//           sx={{
//             position: 'absolute',
//             right: 8,
//             top: 8,
//             color: (theme) => theme.palette.grey[500],
//           }}
//         >
//           <Close />
//         </IconButton>
//       ) : null}
//     </DialogTitle>
//   );
// }

import { UseDialogProps } from '@/hooks/useDialog';
import { Close } from '@mui/icons-material';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { isString } from 'lodash';

export default function AlertDialog({
  buttonConfirmText = 'ตกลง',
  buttonConfirmVariant = 'contained',
  buttonConfirmColor = 'primary',
  buttonConfirmPosition = 'center',
  ...props
}: UseDialogProps) {
  return (
    <Dialog
      {...(props.DialogProps || {})}
      open={props.open}
      onClose={props.onConfirm}
      fullWidth={true}
      maxWidth="sm"
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent
        sx={{
          '&': {
            px: 4,
            py: 8,
          },
        }}
      >
        <IconButton
          aria-label="close"
          onClick={props.onConfirm}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Close />
        </IconButton>
        <Stack spacing={2.5}>
          {isString(props.title) ? (
            <Typography variant="title_M" textAlign="center">
              {props.title}
            </Typography>
          ) : (
            props.title
          )}
          {props.content}
        </Stack>
        <Box
          sx={{
            mt: 4,
            display: 'flex',
            justifyContent:
              buttonConfirmPosition === 'right'
                ? 'flex-end'
                : buttonConfirmPosition == 'center'
                ? 'center'
                : 'flex-start',
          }}
        >
          <Button
            size="large"
            onClick={props.onConfirm}
            autoFocus
            variant={buttonConfirmVariant}
            color={buttonConfirmColor}
          >
            {buttonConfirmText}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

import { UseDialogProps } from '@/hooks/useDialog';
import { Drawer } from '@mui/material';
import React from 'react';

type DrawerViewerProps = {
  children: React.ReactNode;
} & UseDialogProps;

export default function DrawerViewer(props: DrawerViewerProps) {
  const { open, onCancel, onConfirm, title, data, children } = props;
  return (
    <Drawer
      className="drawer-bg-gray"
      PaperProps={{
        sx: { width: '70%', padding: 4 },
      }}
      anchor={'right'}
      open={open}
      onClose={onCancel}
      transitionDuration={0}
    >
      {children}
    </Drawer>
  );
}

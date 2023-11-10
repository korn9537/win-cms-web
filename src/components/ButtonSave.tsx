import { Box, Button, ButtonProps, Typography } from '@mui/material';
import React from 'react';

type ButtonSaveProps = {
  state?: 'create' | 'update';
} & ButtonProps;

export default function ButtonSave({ type = 'submit', state = 'create', ...props }: ButtonSaveProps) {
  const text = {
    create: 'บันทึกข้อมูล',
    update: 'บันทึกการเปลี่ยนแปลง',
  };
  return (
    <Button color="primary" variant="contained" type={type} {...props}>
      <Box component={'img'} width={24} height={24} src="/icons/Save.png" />
      <Typography ml={1} variant="body_M_B">
        {text[state]}
      </Typography>
    </Button>
  );
}

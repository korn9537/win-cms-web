'use client';

import AlertDialog from '@/components/dialogs/AlertDialog';
import { useDialog } from '@/hooks/useDialog';
import { CheckCircleOutlined } from '@mui/icons-material';
import { Box, Button, Stack, TextField, Typography, useTheme } from '@mui/material';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';

type FormValues = {
  username: string;
};

export default function ForgotPasswordPage() {
  const router = useRouter();
  const theme = useTheme();

  const dialog = useDialog({
    onConfirm(data, dialog, res) {
      console.log('confirm', data);
      dialog.close();

      router.push('/auth/login');
    },
    onCancel(data, dialog) {
      console.log('cancel', data);
      dialog.close();
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FormValues>({ defaultValues: { username: 'user@mbsbiz.co.th' } });

  const handleOnSubmit = handleSubmit((data) => {
    console.log(data);
    // router.push('/company');
    // dialog.open(
    //   '',
    //   <Stack spacing={2.5} alignItems="center">
    //     <CheckCircleOutlined sx={{ color: theme.palette.success.main, fontSize: 32 }} />
    //     <Typography variant="title_M">ส่งคำขอสำเร็จแล้ว</Typography>
    //     <Box textAlign="center">
    //       <Typography variant="body_M" display="block">
    //         โปรดตรวจสอบอีเมลของคุณและกดลิ้งก์เปลี่ยนรหัสผ่านในอีเมล เพื่อดำเนินการต่อ
    //       </Typography>
    //       <Typography variant="body_M" display="block" color="neutralGray.main">
    //         (หากอีเมลไม่ตรงกับบัญชีผู้ใช้ในระบบ ระบบจะไม่ส่งอีเมลไปถึงคุณ)
    //       </Typography>
    //     </Box>
    //   </Stack>,
    // );

    dialog.open(
      <Stack spacing={2.5} alignItems="center">
        <CheckCircleOutlined sx={{ color: theme.palette.success.main, fontSize: 32 }} />
        <Typography variant="title_M">ส่งคำขอสำเร็จแล้ว</Typography>
      </Stack>,
      <Box textAlign="center">
        <Typography variant="body_M" display="block">
          โปรดตรวจสอบอีเมลของคุณและกดลิ้งก์เปลี่ยนรหัสผ่านในอีเมล เพื่อดำเนินการต่อ
        </Typography>
        <Typography variant="body_M" display="block" color="neutralGray.main">
          (หากอีเมลไม่ตรงกับบัญชีผู้ใช้ในระบบ ระบบจะไม่ส่งอีเมลไปถึงคุณ)
        </Typography>
      </Box>,
    );
  });

  return (
    <React.Fragment>
      <Box component="form" autoComplete="off" noValidate onSubmit={handleOnSubmit}>
        <Stack spacing={4}>
          <Typography variant="title_M">ลืมรหัสผ่าน?</Typography>
          <Box>
            <Typography variant="body_M" display="block">
              กรอกอีเมลที่เป็นบัญชีผู้ใช้ของคุณ เพื่อรับลิ้งก์เปลี่ยนรหัสผ่าน
            </Typography>
            <Typography variant="body_M" display="block" color="neutralGray.main">
              (หากอีเมลไม่ตรงกับบัญชีผู้ใช่ในระบบ ระบบจะไม่ส่งอีเมลไปถึงคุณ)
            </Typography>
          </Box>
          <Box>
            <Typography variant="body_M" mb={1} display="block">
              บัญชีผู้ใช้
            </Typography>
            <TextField
              placeholder="อีเมล"
              fullWidth
              {...register('username', { required: true })}
              error={Boolean(errors.username)}
              helperText={errors.username && 'บัญชีผู้ใช้ไม่ถูกต้อง'}
            />
          </Box>
          <Button variant="contained" type="submit" color="primary" size="large">
            ยืนยัน
          </Button>
          {/* <Typography variant="body_S" color="red.main" minHeight={24}>
          {(errors.username || errors.password) && 'โปรดระบุ บัญชีผู้ใช้'}
        </Typography> */}
        </Stack>
      </Box>
      <AlertDialog {...dialog.dialogProps} buttonConfirmText="กลับไปหน้าเข้าสู่ระบบ" />
    </React.Fragment>
  );
}

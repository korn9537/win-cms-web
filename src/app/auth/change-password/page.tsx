"use client";

import PasswordPolicyPanel from "@/components/PasswordPolicyPanel";
import AlertDialog from "@/components/dialogs/AlertDialog";
import { useDialog } from "@/hooks/useDialog";
import { usePasswordPolicy } from "@/hooks/usePasswordPolicy";
import { CheckCircleOutlined, VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";
import { Box, Button, IconButton, Stack, TextField, Typography, useTheme } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";

type FormValues = {
  password: string;
  confirm_password: string;
  show_password: boolean;
  show_confirm_password: boolean;
};

export default function ChangePasswordPage() {
  const router = useRouter();
  const theme = useTheme();

  const dialog = useDialog({
    onConfirm(data, dialog, res) {
      console.log("confirm", data);
      dialog.close();
    },
    onCancel(data, dialog) {
      console.log("cancel", data);
      dialog.close();
    }
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm<FormValues>({ defaultValues: { password: "", confirm_password: "", show_password: false } });

  const show_password = watch("show_password");
  const show_confirm_password = watch("show_confirm_password");

  const password = watch("password");
  const confirm_password = watch("confirm_password");
  const passwordMatch = password === confirm_password;

  const policy = usePasswordPolicy(password, {
    minLength: 8,
    enabled: true
  });

  const handleOnSubmit = handleSubmit((data) => {
    if (!passwordMatch || !policy.is_valid) {
      return;
    }

    dialog.open(
      <Stack spacing={2.5} alignItems="center">
        <CheckCircleOutlined sx={{ color: theme.palette.success.main, fontSize: 32 }} />
        <Typography variant="title_M">เปลี่ยนรหัสผ่านสำเร็จแล้ว</Typography>
      </Stack>,
      <Box textAlign="center">
        <Typography variant="body_M" display="block">
          คุณสามารถใช้รหัสผ่านนี้ในการเข้าสู่ระบบครั้งถัดไป
        </Typography>
      </Box>
    );
  });

  return (
    <React.Fragment>
      <Box component="form" autoComplete="off" noValidate onSubmit={handleOnSubmit}>
        <Stack spacing={4}>
          <Typography variant="title_M">เปลี่ยนรหัสผ่าน</Typography>
          <TextField
            fullWidth
            label="รหัสผ่าน"
            placeholder="รหัสผ่าน"
            {...register("password", { required: true })}
            error={Boolean(errors.password) || policy.is_valid === false}
            inputProps={{ type: show_password ? "text" : "password" }}
            InputProps={{
              endAdornment: (
                <IconButton size="small" onClick={() => setValue("show_password", !show_password)}>
                  {show_password ? <VisibilityOutlined /> : <VisibilityOffOutlined />}
                </IconButton>
              )
            }}
          />
          <TextField
            fullWidth
            label="ยืนยันรหัสผ่าน"
            placeholder="ยืนยันรหัสผ่าน"
            {...register("confirm_password", { required: true })}
            error={Boolean(errors.confirm_password) || !passwordMatch}
            inputProps={{ type: show_confirm_password ? "text" : "password" }}
            InputProps={{
              endAdornment: (
                <IconButton size="small" onClick={() => setValue("show_confirm_password", !show_confirm_password)}>
                  {show_confirm_password ? <VisibilityOutlined /> : <VisibilityOffOutlined />}
                </IconButton>
              )
            }}
          />
          <Button variant="contained" type="submit" color="primary" size="large">
            ยืนยัน
          </Button>
          <PasswordPolicyPanel errors={policy.errors} size="large" />
          {/* <Typography variant="body_S" color="red.main" minHeight={24}>
          {(errors.username || errors.password) && 'โปรดระบุ บัญชีผู้ใช้'}
        </Typography> */}
        </Stack>
      </Box>
      {/* <AlertDialog {...dialog.dialogProps} buttonConfirmText="กลับไปหน้าเข้าสู่ระบบ" /> */}
    </React.Fragment>
  );
}

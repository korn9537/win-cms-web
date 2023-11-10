"use client";

import { useAuthStore } from "@/stores/auth.store";
import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";
import { Box, Button, IconButton, Stack, TextField, Typography, useTheme } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

type LoginFormValues = {
  username: string;
  password: string;
  show_password: boolean;
};

export default function LoginPage() {
  const router = useRouter();
  const theme = useTheme();

  const { is_loading, login } = useAuthStore((state) => ({
    is_loading: state.is_loading,
    login: state.login
  }));

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm<LoginFormValues>({ defaultValues: { show_password: false } });

  const show_password = watch("show_password");

  const handleOnSubmit = handleSubmit((data) => {
    login(data, () => {
      router.push("/companies");
    });
  });

  return (
    <Box component="form" autoComplete="off" noValidate onSubmit={handleOnSubmit}>
      <Stack spacing={4}>
        <Typography variant="title_M">ลงชื่อเข้าใช้ WIN WIN Platform</Typography>
        <Box>
          <Typography variant="body_M" mb={1} display="block">
            บัญชีผู้ใช้
          </Typography>
          <TextField
            placeholder="อีเมล"
            fullWidth
            {...register("username", { required: true })}
            error={Boolean(errors.username)}
          />
        </Box>
        <Box sx={{ position: "relative" }}>
          <Stack direction="row" justifyContent="space-between" mb={1} alignItems="baseline">
            <Typography variant="body_M">รหัสผ่าน</Typography>
          </Stack>
          <TextField
            fullWidth
            placeholder="รหัสผ่าน"
            {...register("password", { required: true })}
            error={Boolean(errors.password)}
            inputProps={{ type: show_password ? "text" : "password" }}
            InputProps={{
              endAdornment: (
                <IconButton size="small" onClick={() => setValue("show_password", !show_password)}>
                  {show_password ? <VisibilityOutlined /> : <VisibilityOffOutlined />}
                </IconButton>
              )
            }}
          />
          <Box sx={{ position: "absolute", right: 0, top: 0, height: 24, display: "flex", alignItems: "center" }}>
            <Link href="/auth/forgot-password">
              <Typography
                sx={{
                  textDecoration: "underline",
                  color: theme.palette.neutralGray[100],
                  ...theme.typography.body_XS
                }}
              >
                ลืมรหัสผ่าน?
              </Typography>
            </Link>
          </Box>
        </Box>
        <Button variant="contained" type="submit" color="primary" size="large" disabled={is_loading}>
          {is_loading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
        </Button>
        <Typography variant="body_S" color="red.main" minHeight={24}>
          {(errors.username || errors.password) && "โปรดระบุ บัญชีผู้ใช้และรหัสผ่าน"}
        </Typography>
      </Stack>
    </Box>
  );
}

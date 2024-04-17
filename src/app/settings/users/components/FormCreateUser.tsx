import SwitchStatus, { IOSSwitch } from "@/components/SwitchStatus";
import UploadImage from "@/components/UploadImage";
import FormContainer from "@/components/forms/FormContainer";
import { SPACING_FORM, SPACING_LAYOUT } from "@/constants/layout.constant";
import { FormControl, FormControlLabel, FormLabel, Grid, MenuItem, Stack, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

export const defaultFormCreateUserValue: FormCreateUserValue = {
  id: null,
  logo_image_id: null,
  logo_image_url: "",
  code: "",
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  password_no_expire: false,
  mobile: "",
  is_active: true,
  department_id: "",
  position_id: "",
  role_ids: [],
  type: "user"
};

export type FormCreateUserValue = {
  id: string | null;
  logo_image_id: string | null;
  logo_image_url: string;
  code: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password_no_expire: boolean;
  mobile: string;
  is_active: boolean;
  department_id: string;
  position_id: string;
  role_ids: string[];
  type: string;
};

export type FormCreateUserProps = {
  disabled?: boolean;
};

export default function FormCreateUser(props: FormCreateUserProps) {
  // statics

  // forms
  const {
    register,
    setValue,
    watch,
    control,
    formState: { errors, isLoading }
  } = useFormContext<FormCreateUserValue>();

  // watches
  const logo_image_url = watch("logo_image_url");

  if (isLoading) {
    return null;
  }

  return (
    <Stack spacing={SPACING_LAYOUT}>
      <Controller
        control={control}
        name="is_active"
        render={({ field }) => (
          <SwitchStatus checked={field.value} onChange={(e, checked) => field.onChange(checked)} />
        )}
      />
      <FormContainer title="ข้อมูลทั่วไป">
        <Grid container spacing={SPACING_FORM}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <FormLabel>รูปถ่าย</FormLabel>
              <UploadImage
                src={logo_image_url}
                onUpload={({ id, url }: { id: string; url: string }) => {
                  setValue("logo_image_url", url);
                  setValue("logo_image_id", id);
                }}
                onDelete={() => {
                  setValue("logo_image_url", "");
                  setValue("logo_image_id", "");
                }}
                disabled={props.disabled}
              />
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <TextField label="รหัสพนักงาน" {...register("code")} />
          </Grid>
          <Grid item xs={8}></Grid>
          <Grid item xs={4}>
            <TextField
              label="ชื่อ"
              {...register("first_name", {
                required: "กรุณาระบุ"
              })}
              error={!!errors.first_name}
              helperText={errors.first_name?.message}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="นามสกุล"
              {...register("last_name", {
                required: "กรุณาระบุ"
              })}
              error={!!errors.last_name}
              helperText={errors.last_name?.message}
            />
          </Grid>
          <Grid item xs={4}></Grid>
          <Grid item xs={4}>
            <TextField label="ตำแหน่ง" select>
              <MenuItem value="">--กดเพื่อเลือก--</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={4}>
            <TextField label="แผนก / ฝ่าย" select>
              <MenuItem value="">--กดเพื่อเลือก--</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={4}></Grid>
          <Grid item xs={4}>
            <TextField label="กลุ่มตำแหน่ง" select>
              <MenuItem value="">--กดเพื่อเลือก--</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={4}>
            <Controller
              control={control}
              name="type"
              rules={{
                required: "กรุณาระบุ"
              }}
              render={({ field }) => (
                <TextField
                  label="ประเภทผู้ใช้งาน"
                  select
                  {...field}
                  error={!!errors.type}
                  helperText={errors.type?.message}
                >
                  {/* <MenuItem value="">--กดเพื่อเลือก--</MenuItem> */}
                  <MenuItem value="user">ผู้ใช้งาน</MenuItem>
                  <MenuItem value="admin">ผู้ดูแล</MenuItem>
                </TextField>
              )}
            />
          </Grid>
          <Grid item xs={4}></Grid>
          <Grid item xs={4}>
            <TextField
              label="อีเมล"
              {...register("email", {
                required: "กรุณาระบุ"
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField label="เบอร์ติดต่อ" {...register("mobile")} />
          </Grid>
          <Grid item xs={4}></Grid>
          <Grid item xs={4}>
            <TextField label="รหัสผ่าน" {...register("password")} />
          </Grid>
          <Grid item xs={4}>
            <Controller
              control={control}
              name="password_no_expire"
              render={({ field }) => (
                <FormControl>
                  <FormLabel>&nbsp;</FormLabel>
                  <FormControlLabel
                    sx={{
                      mx: 0
                    }}
                    control={
                      <IOSSwitch
                        checked={field.value}
                        onChange={(e, checked) => field.onChange(checked)}
                        sx={{ mr: 2 }}
                      />
                    }
                    label="รหัสไม่มีหมดอายุ"
                  />
                </FormControl>
              )}
            />
          </Grid>
        </Grid>
      </FormContainer>
    </Stack>
  );
}

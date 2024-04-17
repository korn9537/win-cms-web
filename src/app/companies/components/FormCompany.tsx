import FormTitle from "@/components/FormTitle";
import PanelSelect from "@/components/PanelSelect";
import UploadImage from "@/components/UploadImage";
import FormAddress, { FormAddressValue, defaultFormAddressValue } from "@/components/forms/FormAddress";
import { SPACING_FORM, SPACING_LAYOUT } from "@/constants/layout.constant";
import { Box, Checkbox, Divider, FormControlLabel, Grid, Stack, TextField, Typography, useTheme } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

type FormCompanyProps = {
  disabled?: boolean;
  children?: React.ReactNode;
};

export const defaultFormCompanyValue: FormCompanyValue = {
  code: "",
  name_th: "",
  name_en: "",
  tax_number: "",
  email: "",
  telephone: "",
  website: "",
  logo_image_id: null,
  logo_image_url: "",
  corporate_crest_id: null,
  corporate_crest_url: "",
  register_vat: false,
  is_active: false,
  interface_code: "",
  change_amount: 0,
  address: {
    ...defaultFormAddressValue
  }
};

export type FormCompanyValue = {
  code: string;
  name_th: string;
  name_en: string;
  tax_number: string;
  email: string;
  telephone: string;
  website: string;
  logo_image_id: string | null;
  logo_image_url: string;
  corporate_crest_id: string | null;
  corporate_crest_url: string;
  register_vat: boolean;
  is_active: boolean;
  interface_code: string;
  change_amount: number;
  address: FormAddressValue;
};

export default function FormCompany({ disabled = false }: FormCompanyProps) {
  // statics
  const theme = useTheme();

  // forms
  const formMethods = useFormContext<FormCompanyValue>();
  const {
    register,
    watch,
    setValue,
    formState: { errors },
    control
  } = formMethods;

  // watches
  const logo_image_url = watch("logo_image_url");
  const corporate_crest_url = watch("corporate_crest_url");

  return (
    <Box>
      <Grid container spacing={SPACING_FORM}>
        <Grid item xs={4}>
          <Stack flexDirection={"column"}>
            <Typography variant="body_M">โลโก้บริษัท</Typography>
            <Stack flexDirection={"row"} spacing={2.5} alignItems={"center"}>
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
                disabled={disabled}
              />
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={4}>
          <Stack flexDirection={"column"}>
            <Typography variant="body_M">ตราประทับบริษัท</Typography>
            <Stack flexDirection={"row"} spacing={2.5} alignItems={"center"}>
              <UploadImage
                src={corporate_crest_url}
                onUpload={({ id, url }: { id: string; url: string }) => {
                  setValue("corporate_crest_url", url);
                  setValue("corporate_crest_id", id);
                }}
                onDelete={() => {
                  setValue("corporate_crest_url", "");
                  setValue("corporate_crest_id", "");
                }}
                disabled={disabled}
              />
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}>
          <TextField
            required
            label="รหัสบริษัท"
            {...register("code", { required: "กรุณาระบุ" })}
            fullWidth
            error={Boolean(errors.code)}
            helperText={errors.code?.message}
            disabled={disabled}
            placeholder="กรอกข้อมูล"
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            required
            label="รหัสผู้เสียภาษี"
            {...register("tax_number", { required: "กรุณาระบุ" })}
            fullWidth
            error={Boolean(errors.tax_number)}
            helperText={errors.tax_number?.message}
            disabled={disabled}
            placeholder="กรอกข้อมูล"
          />
        </Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}>
          <TextField
            required
            label="ชื่อบริษัท (ภาษาไทย)"
            {...register("name_th", { required: "กรุณาระบุ" })}
            fullWidth
            error={Boolean(errors.name_th)}
            helperText={errors.name_th?.message}
            disabled={disabled}
            placeholder="กรอกข้อมูล"
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            required
            label="ชื่อบริษัท (ภาษาอังกฤษ)"
            {...register("name_en", { required: "กรุณาระบุ" })}
            fullWidth
            error={Boolean(errors.name_en)}
            helperText={errors.name_en?.message}
            disabled={disabled}
            placeholder="กรอกข้อมูล"
          />
        </Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={12}>
          <Stack flexDirection={"column"} spacing={1.5}>
            <Typography variant="body_M">จดภาษีมูลค่าเพิ่ม</Typography>
            <PanelSelect>
              <Controller
                name="register_vat"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    label={"จดภาษีมูลค่าเพิ่ม"}
                    disabled={disabled}
                    control={
                      <Checkbox
                        aria-label="register_vat"
                        sx={{ marginRight: "12px", paddingRight: 0 }}
                        checked={field.value}
                        onChange={field.onChange}
                      />
                    }
                    sx={{
                      "& .MuiTypography-root": {
                        ...theme.typography.body_M
                      }
                    }}
                  />
                )}
              />
            </PanelSelect>
          </Stack>
        </Grid>
      </Grid>

      <Divider sx={{ my: SPACING_LAYOUT }} />

      <Grid container spacing={SPACING_FORM}>
        <Grid item xs={12}>
          <Typography variant="title_S">ข้อมูลติดต่อ</Typography>
        </Grid>
        {/* <Grid item xs={4}>
          <TextField
            id="email"
            label="อีเมล"
            {...register('email')}
            fullWidth
            error={Boolean(errors.email)}
            helperText={errors.email?.message}
            disabled={disabled}
          />
        </Grid> */}
        <Grid item xs={4}>
          <TextField
            fullWidth
            required
            label="เบอร์ติดต่อ"
            {...register("telephone", { required: "กรุณาระบุ" })}
            error={Boolean(errors.telephone)}
            helperText={errors.telephone?.message}
            disabled={disabled}
            placeholder="กรอกข้อมูล"
          />
        </Grid>

        <Grid item xs={4}>
          <TextField
            label="เว็บไซต์"
            {...register("website")}
            fullWidth
            error={Boolean(errors.website)}
            helperText={errors.website?.message}
            disabled={disabled}
            placeholder="กรอกข้อมูล"
          />
        </Grid>
        <Grid item xs={4}></Grid>
      </Grid>

      <Divider sx={{ my: SPACING_LAYOUT }} />

      <FormTitle title="ที่อยู่" />
      <FormAddress disabled={disabled} name="address" />

      <Divider sx={{ my: SPACING_LAYOUT }} />

      <Grid container spacing={SPACING_FORM}>
        <Grid item xs={12}>
          <Typography variant="title_S">อินเตอร์เฟซ</Typography>
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="รหัสอินเตอร์เฟซ"
            {...register("interface_code")}
            fullWidth
            error={Boolean(errors.interface_code)}
            helperText={errors.interface_code?.message}
            disabled={disabled}
            placeholder="กรอกข้อมูล"
          />
        </Grid>
        <Grid item xs={8}></Grid>
      </Grid>

      <Divider sx={{ my: SPACING_LAYOUT }} />

      <Grid container spacing={SPACING_FORM}>
        <Grid item xs={12}>
          <Typography variant="title_S">กำหนดค่าอื่นๆ</Typography>
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="จำนวนเงินทอนคืนลูกค้า"
            {...register("change_amount")}
            fullWidth
            error={Boolean(errors.change_amount)}
            helperText={errors.change_amount?.message}
            disabled={disabled}
            placeholder="กรอกข้อมูล"
          />
        </Grid>
        <Grid item xs={8}></Grid>
      </Grid>
    </Box>
  );
}

import { IconCloud } from "@/components/Icons";
import UploadFile from "@/components/UploadFile";
import UploadPanel from "@/components/UploadPanel";
import FormContainer, { FormContainerProps } from "@/components/forms/FormContainer";
import { SPACING_FORM } from "@/constants/layout.constant";
import { Divider, Grid, MenuItem, TextField } from "@mui/material";

export const defaultFormInfoValues: FormInfoValues = {};

export type FormInfoValues = {};

type FormInfoProps = {
  disabled?: boolean;
} & FormContainerProps;

export default function FormInfo({ title = "ข้อมูลทั่วไป", disabled = false, ...props }: FormInfoProps) {
  return (
    <FormContainer title={title} {...props}>
      <Grid container spacing={SPACING_FORM}>
        <Grid item xs={4}>
          <TextField label="รหัสอ้างอิง BOQ Master" disabled />
        </Grid>
        <Grid item xs={4}>
          <TextField label="หมวดเอกสาร" required select>
            <MenuItem value="">--กดเพื่อเลือก--</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={4}></Grid>

        <Grid item xs={4}>
          <TextField label="ชื่อ BOQ" required placeholder="กรอกข้อมูล" />
        </Grid>
        <Grid item xs={2}>
          <TextField label="รหัส BOQ" disabled />
        </Grid>
        <Grid item xs={2}>
          <TextField label="วันที่เอกสาร (วัน/เดือน/ค.ศ.)" disabled />
        </Grid>
        <Grid item xs={4}></Grid>

        <Grid item xs={4}>
          <TextField label="ประเภทโมเดล" select>
            <MenuItem value="">--กดเพื่อเลือก--</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={4}>
          <TextField label="โมเดล" select>
            <MenuItem value="">--กดเพื่อเลือก--</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={4}></Grid>

        <Grid item xs={4}>
          <TextField label="ขนาดพื้นที่" select>
            <MenuItem value="">--กดเพื่อเลือก--</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="พื้นที่ใช้สอยรวม"
            required
            InputProps={{
              endAdornment: <span>ตร.ม.</span>
            }}
          />
        </Grid>
        <Grid item xs={4}></Grid>

        <Grid item xs={4}>
          <TextField label="ต้นทุนรวม" disabled />
        </Grid>
        <Grid item xs={4}>
          <TextField label="ราคาเฉลี่ย / ตร.ม." disabled />
        </Grid>
        <Grid item xs={4}></Grid>
      </Grid>
      <Divider sx={{ my: 3 }} />
      <UploadPanel />
    </FormContainer>
  );
}

import UploadPanel from "@/components/UploadPanel";
import FormContainer, { FormContainerProps } from "@/components/forms/FormContainer";
import { SPACING_FORM } from "@/constants/layout.constant";
import { Divider, Grid, MenuItem, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useBoqCreateStore } from "../../stores/boq-create.store";
import FormTitle from "@/components/FormTitle";

export const defaultFormInfoValues: FormInfoValues = {
  document_no: "",
  running_id: "",
  running_key: "",
  name: "",
  code: "",
  document_date: "",
  model_type_id: "",
  model_id: "",
  area_size_id: "",
  total_area: "",
  total_cost: "",
  average_price: "",
  // upload
  files: []
};

export type FormInfoValues = {
  document_no: string;
  running_id: string;
  running_key: string;
  name: string;
  code: string;
  document_date: string;
  model_type_id: string;
  model_id: string;
  area_size_id: string;
  total_area: string;
  total_cost: string;
  average_price: string;
  // upload
  files: string[];
};

type FormInfoProps = {
  disabled?: boolean;
  onSubmit?: (values: FormInfoValues) => void;
} & FormContainerProps;

export default function FormInfo({ title = "ข้อมูลทั่วไป", disabled = false, ...props }: FormInfoProps) {
  // statics
  const { masterDocumentFormats, masterModelTypes, masterModelSizes } = useBoqCreateStore((state) => ({
    masterDocumentFormats: state.masterDocumentFormats,
    masterModelTypes: state.masterModelTypes,
    masterModelSizes: state.masterModelSizes
  }));

  // form
  const {
    register,
    control,
    formState: { errors },
    watch,
    handleSubmit,
    setValue
  } = useForm<FormInfoValues>({
    defaultValues: {
      ...defaultFormInfoValues,
      running_id: masterDocumentFormats[0]?.id || ""
    }
  });

  // actions
  const handleOnSubmit = (values: FormInfoValues) => {
    console.log(values);
  };

  const handleOnError = () => {};

  // watch
  const model_type_id = watch("model_type_id");

  return (
    <FormContainer title={title} {...props} onSubmit={handleSubmit(handleOnSubmit, handleOnError)}>
      <FormTitle title={title} />
      <Grid container spacing={SPACING_FORM}>
        <Grid item xs={4}>
          <TextField label="รหัสอ้างอิง BOQ Master" disabled />
        </Grid>
        <Grid item xs={4}>
          <Controller
            control={control}
            name="running_id"
            rules={{ required: "โปรดระบุ" }}
            render={({ field }) => (
              <TextField
                label="หมวดเอกสาร"
                required
                select
                value={field.value}
                onChange={field.onChange}
                error={Boolean(errors.running_id)}
                helperText={errors.running_id?.message}
              >
                <MenuItem value="">--กดเพื่อเลือก--</MenuItem>
                {masterDocumentFormats.map((format) => (
                  <MenuItem key={format.id} value={format.id}>
                    {format.running_key} : {format.run_format}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>
        <Grid item xs={4}></Grid>

        <Grid item xs={4}>
          <TextField
            label="ชื่อ BOQ"
            required
            placeholder="กรอกข้อมูล"
            {...register("name", { required: "โปรดระบุ" })}
            error={Boolean(errors.name)}
            helperText={errors.name?.message}
          />
        </Grid>
        <Grid item xs={2}>
          <TextField label="รหัส BOQ" disabled {...register("code")} />
        </Grid>
        <Grid item xs={2}>
          <TextField label="วันที่เอกสาร (วัน/เดือน/ค.ศ.)" disabled {...register("document_date")} />
        </Grid>
        <Grid item xs={4}></Grid>

        <Grid item xs={4}>
          <Controller
            control={control}
            name="model_type_id"
            rules={{
              onChange: () => {
                setValue("model_id", "");
              }
            }}
            render={({ field }) => (
              <TextField label="ประเภทโมเดล" select value={field.value} onChange={field.onChange}>
                <MenuItem value="">--กดเพื่อเลือก--</MenuItem>
                {masterModelTypes?.map((modelType) => (
                  <MenuItem value={modelType.id} key={modelType.id}>
                    {/* {modelType.code}:  */}
                    {modelType.name_th}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>
        <Grid item xs={4}>
          <Controller
            control={control}
            name="model_id"
            render={({ field }) => (
              <TextField label="โมเดล" select value={field.value} onChange={field.onChange}>
                <MenuItem value="">--กดเพื่อเลือก--</MenuItem>
                {masterModelTypes
                  ?.find((w) => w.id == model_type_id)
                  ?.models?.map((model) => (
                    <MenuItem value={model.id} key={model.id}>
                      {/* {model.code}:  */}
                      {model.name_th}
                    </MenuItem>
                  ))}
              </TextField>
            )}
          />
        </Grid>
        <Grid item xs={4}></Grid>

        <Grid item xs={4}>
          <Controller
            control={control}
            name="area_size_id"
            render={({ field }) => (
              <TextField label="ขนาดพื้นที่" select value={field.value} onChange={field.onChange}>
                <MenuItem value="">--กดเพื่อเลือก--</MenuItem>
                {masterModelSizes?.map((model) => (
                  <MenuItem value={model.id} key={model.id}>
                    {/* {model.code}:  */}
                    {model.name_th}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="พื้นที่ใช้สอยรวม"
            required
            InputProps={{
              endAdornment: <span>ตร.ม.</span>
            }}
            {...register("total_area", { required: "โปรดระบุ" })}
            error={Boolean(errors.total_area)}
            helperText={errors.total_area?.message}
          />
        </Grid>
        <Grid item xs={4}></Grid>

        <Grid item xs={4}>
          <TextField label="ต้นทุนรวม" disabled {...register("total_cost")} />
        </Grid>
        <Grid item xs={4}>
          <TextField label="ราคาเฉลี่ย / ตร.ม." disabled {...register("average_price")} />
        </Grid>
        <Grid item xs={4}></Grid>
      </Grid>
      <Divider sx={{ my: 3 }} />
      <UploadPanel />
    </FormContainer>
  );
}

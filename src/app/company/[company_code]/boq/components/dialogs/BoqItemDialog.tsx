import { IconSave } from "@/components/Icons";
import { IOSSwitch } from "@/components/SwitchStatus";
import { FormBase } from "@/components/forms/FormContainer";
import { SPACING_FORM } from "@/constants/layout.constant";
import { UseDialogProps } from "@/hooks/useDialog";
import {
  ButtonBase,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  MenuItem,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";

type BoqItemDialogProps = {
  // children?: React.ReactNode;
  // action?: React.ReactNode;
} & UseDialogProps;

type CreateBoqFormValues = {
  type: string;

  item_code: string;
  item_name: string;

  name: string;

  cost_code: string;

  quantity: number;

  unit_id: string;
  unit_text: string;

  unit_rate_by_owner: boolean;
  unit_rate: number;
  unit_rate_total: number;

  work_rate_by_owner: boolean;
  work_rate: number;
  work_rate_total: number;

  total: number;
};

export default function BoqItemDialog(props: BoqItemDialogProps) {
  // statics
  const { open, onCancel, onConfirm, title, content, data, ...dialog } = props;
  const dialogId = React.useId();
  // -- data
  const { level, parent_id, type: item_type, parent_index } = data || {};

  // refs
  const submitBtnRef = React.useRef<HTMLButtonElement>(null);

  // form
  const {
    register,
    control,
    setValue,
    formState: { errors },
    watch,
    trigger,
    handleSubmit
  } = useForm<CreateBoqFormValues>({
    defaultValues: {
      type: "",
      item_code: "",
      item_name: "",
      name: "",
      cost_code: "",
      quantity: 0,
      unit_id: "",
      unit_text: "",
      unit_rate_by_owner: false,
      unit_rate: 0,
      unit_rate_total: 0,
      work_rate_by_owner: false,
      work_rate: 0,
      work_rate_total: 0,
      total: 0
    }
  });

  React.useEffect(() => {
    if (open) {
      if (item_type === "group") {
        setValue("type", "group");
      } else {
        setValue("type", "item");
      }
    }

    return () => {};
  }, [open]);

  // watches
  const selectedType = watch("type", "group");
  const enableUnitRateOwner = watch("unit_rate_by_owner", false);
  const enableWorkRateOwner = watch("work_rate_by_owner", false);
  const totalUnitRate = watch("unit_rate_total", 0);
  const totalWorkRate = watch("work_rate_total", 0);

  // console.log(watch());

  // ระดับ
  const levelText = "1";
  // รหัส
  const levelCodeText = "1.1";

  // actions
  const handleOnConfirm = async () => {
    submitBtnRef.current?.click();
  };

  const handleOnSubmit = (values: CreateBoqFormValues) => {
    console.log("values", values);

    // mutate
  };

  return (
    <Dialog
      open={open}
      onClose={onCancel}
      fullWidth={dialog.DialogProps?.fullWidth || true}
      maxWidth={dialog.DialogProps?.maxWidth || "md"}
      aria-labelledby={`${dialogId}-dialog-title`}
      aria-describedby={`${dialogId}-dialog-description`}
      {...dialog.DialogProps}
      // fullScreen
    >
      <DialogTitle id={`${dialogId}-dialog-title`}>{title}</DialogTitle>
      <DialogContent>
        <FormBase onSubmit={handleSubmit(handleOnSubmit)}>
          <Grid container spacing={SPACING_FORM}>
            <Grid item xs={12}>
              <Controller
                control={control}
                name="type"
                render={({ field }) => (
                  <FormControl>
                    <RadioGroup
                      onChange={(e) => field.onChange(e.target.value)}
                      value={field.value}
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                    >
                      <FormControlLabel value="group" control={<Radio />} label="หมวดงาน / งาน" />
                      <FormControlLabel value="item" control={<Radio />} label="วัสดุและค่าแรง" />
                    </RadioGroup>
                  </FormControl>
                )}
              />
            </Grid>
            {selectedType === "group" ? (
              <>
                <Grid item xs={6} md={3}>
                  <TextField label="ระดับ" disabled value={levelText} />
                </Grid>
                <Grid item xs={6} md={3}>
                  <TextField label="รหัส" disabled value={levelCodeText} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="ชื่อหมวดงาน / งาน"
                    placeholder="กรอกข้อมูล"
                    required
                    {...register("name", { required: "กรุณาระบุ" })}
                    error={!!errors.name}
                    helperText={errors.name?.message}
                  />
                </Grid>
              </>
            ) : (
              <>
                <Grid item xs={6} md={3}>
                  <TextField label="ระดับ" disabled value={levelText} />
                </Grid>
                <Grid item xs={6} md={3}>
                  <TextField
                    label="รหัสไอเทม"
                    required
                    select
                    {...register("item_code", {
                      required: "กรุณาระบุ"
                    })}
                    error={!!errors.item_code}
                    helperText={errors.item_code?.message}
                  >
                    <MenuItem value="">--กดเพื่อเลือก--</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controller
                    control={control}
                    name="item_name"
                    render={({ field }) => <TextField label="ชื่อไอเทม" disabled value={field.value || "ไม่ระบุ"} />}
                  />
                  {/* <TextField label="ชื่อไอเทม" disabled {...register("item_name")} /> */}
                </Grid>
                <Grid item xs={6}>
                  <TextField label="ข้อมูลไอเทมเพิ่มเติม" placeholder="กรอกข้อมูล" {...register("name")} />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="รหัสต้นทุน"
                    required
                    select
                    {...register("cost_code", {
                      required: "กรุณาระบุ"
                    })}
                    error={!!errors.cost_code}
                    helperText={errors.cost_code?.message}
                  >
                    <MenuItem value="">--กดเพื่อเลือก--</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={6} md={3}>
                  <TextField
                    label="จำนวน"
                    type="number"
                    required
                    {...register("quantity", {
                      required: "กรุณาระบุ",
                      valueAsNumber: true,
                      validate: {
                        positive: (value) => {
                          return value > 0 || "กรุณาระบุจำนวนที่มากกว่า 0";
                        },
                        integer: (value) => {
                          return Number.isInteger(value) || "กรุณาระบุจำนวนเป็นจำนวนเต็ม";
                        },
                        max: (value) => {
                          return value <= 9999 || "กรุณาระบุจำนวนไม่เกิน 9,999";
                        }
                      },
                      onChange: (e) => {
                        setValue("unit_rate_total", e.target.value * watch("unit_rate", 0));
                      }
                    })}
                    error={!!errors.quantity}
                    helperText={errors.quantity?.message}
                  />
                </Grid>
                <Grid item xs={6} md={3}>
                  <TextField label="หน่วย" required select {...register("unit_id")}>
                    <MenuItem value="">--กดเพื่อเลือก--</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} md={6}></Grid>
                <Grid item xs={6} md={3}>
                  <Controller
                    control={control}
                    name="unit_rate"
                    rules={{
                      required: "กรุณาระบุ",
                      validate: {
                        positive: (value) => {
                          return value > 0 || "กรุณาระบุจำนวนที่มากกว่า 0";
                        },
                        integer: (value) => {
                          return Number.isInteger(+value) || "กรุณาระบุจำนวนเป็นจำนวนเต็ม";
                        },
                        max: (value) => {
                          return value <= 9999 || "กรุณาระบุจำนวนไม่เกิน 9,999";
                        }
                      },
                      onChange: (e) => {
                        setValue("unit_rate_total", e.target.value * watch("quantity", 0));
                      }
                    }}
                    render={({ field }) => (
                      <TextField
                        label="ราคาวัสดุต่อหน่วย (บาท)"
                        type={enableUnitRateOwner ? "text" : "number"}
                        required
                        value={enableUnitRateOwner ? "ไม่ระบุ" : field.value}
                        onChange={field.onChange}
                        disabled={enableUnitRateOwner}
                        error={!!errors.unit_rate && !enableUnitRateOwner}
                        helperText={!enableUnitRateOwner && errors.unit_rate?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={6} md={3}>
                  <FormControl>
                    <FormLabel component="div">
                      <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <span>By Owner</span>
                        <Controller
                          control={control}
                          name="unit_rate_by_owner"
                          render={({ field }) => (
                            <IOSSwitch
                              size="small"
                              value={field.value}
                              onChange={(e, checked) => field.onChange(checked)}
                            />
                          )}
                        />
                      </Stack>
                    </FormLabel>
                    <Controller
                      control={control}
                      name="unit_rate"
                      rules={{
                        required: "กรุณาระบุ",
                        validate: {
                          positive: (value) => {
                            return value > 0 || "กรุณาระบุจำนวนที่มากกว่า 0";
                          },
                          integer: (value) => {
                            return Number.isInteger(+value) || "กรุณาระบุจำนวนเป็นจำนวนเต็ม";
                          },
                          max: (value) => {
                            return value <= 9999 || "กรุณาระบุจำนวนไม่เกิน 9,999";
                          }
                        },
                        onChange: (e) => {
                          setValue("unit_rate_total", e.target.value * watch("quantity", 0));
                        }
                      }}
                      render={({ field }) => (
                        <TextField
                          type={!enableUnitRateOwner ? "text" : "number"}
                          required
                          value={!enableUnitRateOwner ? "ไม่ระบุ" : field.value}
                          onChange={field.onChange}
                          disabled={!enableUnitRateOwner}
                          error={!!errors.unit_rate && enableUnitRateOwner}
                          helperText={enableUnitRateOwner && errors.unit_rate?.message}
                        />
                      )}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField label="รวมราคาวัสดุ (บาท)" disabled {...register("unit_rate_total")} />
                </Grid>
                <Grid item xs={6} md={3}>
                  <Controller
                    control={control}
                    name="work_rate"
                    rules={{
                      required: "กรุณาระบุ",
                      validate: {
                        positive: (value) => {
                          return value > 0 || "กรุณาระบุจำนวนที่มากกว่า 0";
                        },
                        integer: (value) => {
                          return Number.isInteger(+value) || "กรุณาระบุจำนวนเป็นจำนวนเต็ม";
                        },
                        max: (value) => {
                          return value <= 9999 || "กรุณาระบุจำนวนไม่เกิน 9,999";
                        }
                      },
                      onChange: (e) => {
                        setValue("work_rate_total", e.target.value * watch("quantity", 0));
                      }
                    }}
                    render={({ field }) => (
                      <TextField
                        label="ค่าแรงต่อหน่วย (บาท)"
                        required
                        type={enableWorkRateOwner ? "text" : "number"}
                        value={enableWorkRateOwner ? "ไม่ระบุ" : field.value}
                        onChange={field.onChange}
                        disabled={enableWorkRateOwner}
                        error={!!errors.work_rate && !enableWorkRateOwner}
                        helperText={!enableWorkRateOwner && errors.work_rate?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={6} md={3}>
                  <FormControl>
                    <FormLabel component="div">
                      <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <span>By Owner</span>
                        <Controller
                          control={control}
                          name="work_rate_by_owner"
                          render={({ field }) => (
                            <IOSSwitch
                              size="small"
                              value={field.value}
                              onChange={(e, checked) => field.onChange(checked)}
                            />
                          )}
                        />
                      </Stack>
                    </FormLabel>
                    <Controller
                      control={control}
                      name="work_rate"
                      rules={{
                        required: "กรุณาระบุ",
                        validate: {
                          positive: (value) => {
                            return value > 0 || "กรุณาระบุจำนวนที่มากกว่า 0";
                          },
                          // integer: (value) => {
                          //   return Number.isInteger(+value) || "กรุณาระบุจำนวนเป็นจำนวนเต็ม";
                          // },
                          max: (value) => {
                            return value <= 9999 || "กรุณาระบุจำนวนไม่เกิน 9,999";
                          }
                        },
                        onChange: (e) => {
                          setValue("work_rate_total", e.target.value * watch("quantity", 0));
                        }
                      }}
                      render={({ field }) => (
                        <TextField
                          required
                          type={!enableWorkRateOwner ? "text" : "number"}
                          value={!enableWorkRateOwner ? "ไม่ระบุ" : field.value}
                          onChange={field.onChange}
                          disabled={!enableWorkRateOwner}
                          error={!!errors.work_rate && enableWorkRateOwner}
                          helperText={enableWorkRateOwner && errors.work_rate?.message}
                        />
                      )}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField label="รวมค่าแรง (บาท)" disabled {...register("work_rate_total")} />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="title_S">รวมราคาวัสดุและค่าแรง</Typography>
                </Grid>
                <Grid item xs={6}>
                  <TextField label="รวมทั้งสิ้น (บาท)" disabled value={totalUnitRate + totalWorkRate} />
                </Grid>
              </>
            )}
          </Grid>
          <ButtonBase
            ref={submitBtnRef}
            type="submit"
            sx={{
              display: "none"
            }}
          >
            Submit
          </ButtonBase>
        </FormBase>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="black80">
          ยกเลิก
        </Button>
        <Button onClick={handleOnConfirm} autoFocus variant="contained" startIcon={<IconSave />}>
          บันทึกข้อมูล
        </Button>
      </DialogActions>
    </Dialog>
  );
}

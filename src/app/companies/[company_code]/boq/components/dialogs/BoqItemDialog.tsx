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
import { BoqItem, BoqItemGroup, useBoqCreateStore } from "../../stores/boq-create.store";
import numeral from "numeral";
import _ from "lodash";

type BoqItemDialogProps = {} & UseDialogProps;

type CreateBoqFormValues = {
  type: string;
  //
  name: string;
  //
  item_id: string;
  item_code: string;
  item_name: string;
  //
  cost_code: string;
  //
  quantity: number;
  //
  unit_id: string;
  unit_text: string;
  //
  unit_rate_by_owner: boolean;
  unit_rate: number;
  unit_rate_total: number;
  //
  work_rate_by_owner: boolean;
  work_rate: number;
  work_rate_total: number;
  //
  total: number;
};

export type BoqItemDialogData = {
  levelType: "child" | "same";
  parentId: string | null;
  itemType?: "group" | "material";
};

export default function BoqItemDialog(props: BoqItemDialogProps) {
  // statics
  const { open, onCancel, onConfirm, title, content, data, ...dialog } = props;
  const dialogId = React.useId();

  //
  const { masterItems, masterItemUnits, masterCostCodes, addItem, updateItem } = useBoqCreateStore((state) => ({
    masterItems: state.masterItems,
    masterItemUnits: state.masterItemUnits,
    masterCostCodes: state.masterCostCodes,
    addItem: state.addItem,
    updateItem: state.updateItem
  }));

  // -- data
  const { levelType, parentId, itemType }: BoqItemDialogData = data || {};

  // refs
  const submitBtnRef = React.useRef<HTMLButtonElement>(null);

  // form
  const {
    register,
    control,
    setValue,
    formState: { errors },
    watch,
    handleSubmit
  } = useForm<CreateBoqFormValues>({
    defaultValues: {
      type: "",
      //
      name: "",
      //
      item_id: "",
      item_code: "",
      item_name: "",
      //
      cost_code: "",
      //
      quantity: 0,
      unit_id: "",
      unit_text: "",
      //
      unit_rate_by_owner: false,
      unit_rate: 0,
      unit_rate_total: 0,
      //
      work_rate_by_owner: false,
      work_rate: 0,
      work_rate_total: 0,
      //
      total: 0
    }
  });

  React.useEffect(() => {
    if (open) {
      if (parentId == null) {
        setValue("type", "group");
      } else {
        setValue("type", itemType || "group");
      }
    }
    return () => {};
  }, [open]);

  // watches
  const selectedType = watch("type", "group");
  //
  const enableUnitRateOwner = watch("unit_rate_by_owner", false);
  const enableWorkRateOwner = watch("work_rate_by_owner", false);
  //
  const quantity = watch("quantity", 0);
  //
  const unit_rate = watch("unit_rate", 0);
  const work_rate = watch("work_rate", 0);
  //
  const totalUnitRate = watch("unit_rate_total", 0);
  const totalWorkRate = watch("work_rate_total", 0);
  //
  const sumTotal = numeral(totalUnitRate).add(totalWorkRate).format("0,0.00");

  // ระดับ
  const levelText = "1";
  // รหัส
  const levelCodeText = "1.1";

  // actions
  const handleOnConfirm = async () => {
    submitBtnRef.current?.click();
  };

  const handleOnSubmit = (values: CreateBoqFormValues) => {
    const submitId = _.uniqueId("boq-item-");

    let item: BoqItem;

    if (values.type == "group") {
      item = {
        id: submitId,
        name: values.name,
        //
        parent_id: parentId,
        //
        type: "group",
        //
        unit_rate_total: 0,
        work_rate_total: 0,
        //
        total: 0
      };
    } else {
      item = {
        id: submitId,
        name: values.name,
        //
        parent_id: parentId,
        //
        type: "material",
        //
        item_id: values.item_id,
        item_code: values.item_code,
        item_name: values.item_name,
        //
        cost_code: values.cost_code,
        //
        quantity: values.quantity,
        //
        unit_id: values.unit_id,
        unit_name: values.unit_text,
        //
        unit_rate_by_owner: values.unit_rate_by_owner,
        unit_rate: values.unit_rate,
        unit_rate_total: values.unit_rate_total,
        //
        work_rate_by_owner: values.work_rate_by_owner,
        work_rate: values.work_rate,
        work_rate_total: values.work_rate_total,
        //
        total: numeral(values.unit_rate_total).add(values.work_rate_total).value() || 0
      };
    }

    //
    addItem(item);
    //
    onConfirm(item);
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
                      <FormControlLabel
                        value="material"
                        control={<Radio disabled={parentId == null} />}
                        label="วัสดุและค่าแรง"
                      />
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
                <Grid item xs={6} md={9}>
                  {/* <Grid item xs={6} md={3}> */}
                  <Controller
                    control={control}
                    name="item_id"
                    rules={{ required: "กรุณาระบุ" }}
                    render={({ field }) => (
                      <TextField
                        label="รหัสไอเทม"
                        required
                        select
                        value={field.value}
                        onChange={(e) => {
                          field.onChange(e);

                          //
                          const item = masterItems.find((item) => item.id == e.target.value);
                          //
                          setValue("item_code", item?.code ?? "");
                          setValue("item_name", item?.name_th ?? "");
                        }}
                        error={!!errors.item_code}
                        helperText={errors.item_code?.message}
                      >
                        <MenuItem value="">--กดเพื่อเลือก--</MenuItem>
                        {masterItems.map((item) => (
                          <MenuItem key={item.id} value={item.id}>
                            {item.code} {item.name_th}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  />
                </Grid>
                {/* <Grid item xs={12} md={6}>
                  <Controller
                    control={control}
                    name="item_name"
                    render={({ field }) => <TextField label="ชื่อไอเทม" disabled value={field.value || "ไม่ระบุ"} />}
                  />
                </Grid> */}
                <Grid item xs={6}>
                  <TextField
                    label="ข้อมูลไอเทมเพิ่มเติม"
                    placeholder="กรอกข้อมูล"
                    {...register("name", { required: false })}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Controller
                    control={control}
                    name="cost_code"
                    rules={{ required: "กรุณาระบุ" }}
                    render={({ field }) => (
                      <TextField
                        label="รหัสต้นทุน"
                        required
                        select
                        value={field.value}
                        onChange={field.onChange}
                        error={!!errors.cost_code}
                        helperText={errors.cost_code?.message}
                      >
                        <MenuItem value="">--กดเพื่อเลือก--</MenuItem>
                        {masterCostCodes.map((item) => (
                          <MenuItem key={item.code} value={item.code}>
                            {item.code} {item.name_th}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  />
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
                        const value = numeral(e.target.value || "0").value();

                        const _unit_rate_total = numeral(value).multiply(unit_rate).value();
                        const _work_rate_total = numeral(value).multiply(work_rate).value();

                        setValue("unit_rate_total", _unit_rate_total || 0);
                        setValue("work_rate_total", _work_rate_total || 0);
                      }
                    })}
                    error={!!errors.quantity}
                    helperText={errors.quantity?.message}
                  />
                </Grid>
                <Grid item xs={6} md={3}>
                  <Controller
                    control={control}
                    name="unit_id"
                    rules={{ required: "กรุณาระบุ" }}
                    render={({ field }) => (
                      <TextField
                        label="หน่วย"
                        required
                        select
                        value={field.value}
                        onChange={field.onChange}
                        error={!!errors.unit_id}
                        helperText={errors.unit_id?.message}
                      >
                        <MenuItem value="">--กดเพื่อเลือก--</MenuItem>
                        {masterItemUnits.map((item) => (
                          <MenuItem key={item.id} value={item.id}>
                            {item.name_th}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  />
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
                        max: (value) => {
                          return value <= 99999 || "กรุณาระบุจำนวนไม่เกิน 99,999";
                        }
                      },
                      onChange: (e) => {
                        const value = numeral(e.target.value || "0")
                          .multiply(quantity)
                          .value();

                        setValue("unit_rate_total", value || 0);
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
                          const value = numeral(e.target.value || "0")
                            .multiply(quantity)
                            .value();

                          setValue("unit_rate_total", value || 0);
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
                  <TextField label="รวมราคาวัสดุ (บาท)" disabled value={numeral(totalUnitRate).format("0,0.00")} />
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
                        const value = numeral(e.target.value || "0")
                          .multiply(quantity)
                          .value();

                        setValue("work_rate_total", value || 0);
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
                          const value = numeral(e.target.value || "0")
                            .multiply(quantity)
                            .value();

                          setValue("work_rate_total", value || 0);
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
                  <TextField label="รวมค่าแรง (บาท)" disabled value={numeral(totalWorkRate).format("0,0.00")} />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="title_S">รวมราคาวัสดุและค่าแรง</Typography>
                </Grid>
                <Grid item xs={6}>
                  <TextField label="รวมทั้งสิ้น (บาท)" disabled value={sumTotal} />
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

"use client";

import { SPACING_FORM } from "@/constants/layout.constant";
import { getDistricts, getProvinces, getSubDistricts } from "@/services/graphql/address.service";
import { Grid, MenuItem, TextField } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import _ from "lodash";
import React, { useCallback, useId } from "react";
import { Controller, FieldError, useFormContext } from "react-hook-form";

export const defaultFormAddressValue: FormAddressValue = {
  country: "",

  address_th: "",
  village_th: "",
  moo_th: "",
  tower_th: "",
  floor_th: "",
  soi_th: "",
  road_th: "",

  address_en: "",
  moo_en: "",
  village_en: "",
  tower_en: "",
  floor_en: "",
  soi_en: "",
  road_en: "",

  sub_district_id: "",
  district_id: "",
  province_id: "",
  zip_code: "",

  latitude: 0,
  longitude: 0,
  google_map_url: ""
};

export type FormAddressValue = {
  country: string;

  address_th: string;
  village_th: string;
  moo_th: string;
  tower_th: string;
  floor_th: string;
  soi_th: string;
  road_th: string;

  address_en: string;
  moo_en: string;
  village_en: string;
  tower_en: string;
  floor_en: string;
  soi_en: string;
  road_en: string;

  sub_district_id: string;
  district_id: string;
  province_id: string;
  zip_code: string;

  latitude: number;
  longitude: number;
  google_map_url: string;
};

type FormAddressProps = {
  showLocation?: boolean;
  disabled?: boolean;
  name?: string;
};

export default function FormAddress({ showLocation = false, disabled = false, name, ...props }: FormAddressProps) {
  const {
    control,
    register,
    watch,
    setValue,
    formState: { errors }
  } = useFormContext();

  const getError = useCallback(
    (
      fieldName: string
    ): {
      error: boolean;
      helperText: string;
    } => {
      const errorMessage = (_.get(errors, fieldName) as FieldError)?.message;

      return {
        error: Boolean(errorMessage),
        helperText: errorMessage || ""
      };
    },
    []
  );

  // statics
  const formId = useId();

  const namePath = name ? name + "." : "";

  // watches
  const province_id = watch(namePath + "province_id", "") || "";
  const district_id = watch(namePath + "district_id", "") || "";

  // province
  const { data: provinces } = useQuery({
    queryKey: ["master-province"],
    queryFn: getProvinces
  });

  // districts
  const { data: districts } = useQuery({
    queryKey: ["master-district", province_id],
    queryFn: () => getDistricts(province_id),
    enabled: !!province_id
  });

  // sub_districts
  const { data: subDistricts } = useQuery({
    queryKey: ["master-subdistrict", district_id],
    queryFn: () => getSubDistricts(district_id),
    enabled: !!district_id
  });

  return (
    <Grid container spacing={SPACING_FORM}>
      <Grid item xs={4}>
        <TextField
          fullWidth
          required
          label="บ้านเลขที่"
          placeholder="กรอกข้อมูล"
          {...register(namePath + "address_th", { required: "กรุณาระบุ" })}
          {...getError(namePath + "address_th")}
          disabled={disabled}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          fullWidth
          label="หมู่ที่"
          placeholder="กรอกข้อมูล"
          {...register(namePath + "moo_th")}
          {...getError(namePath + "moo_th")}
          disabled={disabled}
        />
      </Grid>
      <Grid item xs={4}></Grid>
      <Grid item xs={4}>
        <TextField
          fullWidth
          label="หมู่บ้าน (ภาษาไทย)"
          placeholder="กรอกข้อมูล"
          {...register(namePath + "village_th")}
          {...getError(namePath + "village_th")}
          disabled={disabled}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          fullWidth
          label="หมู่บ้าน (ภาษาอังกฤษ)"
          placeholder="กรอกข้อมูล"
          {...register(namePath + "village_en")}
          {...getError(namePath + "village_en")}
          disabled={disabled}
        />
      </Grid>
      <Grid item xs={4}></Grid>
      <Grid item xs={4}>
        <TextField
          fullWidth
          label="อาคาร (ภาษาไทย)"
          placeholder="กรอกข้อมูล"
          {...register(namePath + "tower_th")}
          {...getError(namePath + "tower_th")}
          disabled={disabled}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          fullWidth
          label="อาคาร (ภาษาอังกฤษ)"
          placeholder="กรอกข้อมูล"
          {...register(namePath + "tower_en")}
          {...getError(namePath + "tower_en")}
          disabled={disabled}
        />
      </Grid>
      <Grid item xs={4}></Grid>
      <Grid item xs={4}>
        <TextField
          fullWidth
          label="ซอย (ภาษาไทย)"
          placeholder="กรอกข้อมูล"
          {...register(namePath + "soi_th")}
          {...getError(namePath + "soi_th")}
          disabled={disabled}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          fullWidth
          label="ซอย (ภาษาอังกฤษ)"
          placeholder="กรอกข้อมูล"
          {...register(namePath + "soi_en")}
          {...getError(namePath + "soi_en")}
          disabled={disabled}
        />
      </Grid>
      <Grid item xs={4}></Grid>
      <Grid item xs={4}>
        <TextField
          fullWidth
          label="ถนน (ภาษาไทย)"
          placeholder="กรอกข้อมูล"
          {...register(namePath + "road_th")}
          {...getError(namePath + "road_th")}
          disabled={disabled}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          fullWidth
          label="ถนน (ภาษาอังกฤษ)"
          placeholder="กรอกข้อมูล"
          {...register(namePath + "road_en")}
          {...getError(namePath + "road_en")}
          disabled={disabled}
        />
      </Grid>
      <Grid item xs={4}></Grid>
      <Grid item xs={4}>
        <Controller
          name={namePath + "sub_district_id"}
          control={control}
          rules={{
            required: "กรุณาระบุตำบล/แขวง",
            onChange: (e) => {
              const item = subDistricts?.find((item) => item.id === e.target.value);
              if (item) {
                setValue(namePath + "zip_code", item.post_code);
                return;
              }

              setValue(namePath + "zip_code", "");
            }
          }}
          render={({ field }) => (
            <TextField
              fullWidth
              select
              label="ตำบล/แขวง"
              {...field}
              required
              disabled={disabled}
              {...getError(namePath + "sub_district_id")}
            >
              <MenuItem value="">--กดเพื่อเลือก--</MenuItem>
              {(subDistricts || []).map((option: any) => (
                <MenuItem key={formId + "-sub_district-" + option.id} value={option.id}>
                  {option.name_th}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
      </Grid>
      <Grid item xs={4}>
        <Controller
          name={namePath + "district_id"}
          control={control}
          rules={{
            required: "กรุณาระบุอำเภอ/เขต",
            onChange: (e) => {
              setValue(namePath + "sub_district_id", "");
              setValue(namePath + "zip_code", "");
            }
          }}
          render={({ field }) => (
            <TextField
              fullWidth
              select
              label="อำเภอ/เขต"
              {...field}
              required
              {...getError(namePath + "district_id")}
              disabled={disabled}
            >
              <MenuItem value="">--กดเพื่อเลือก--</MenuItem>
              {(districts || []).map((option: any) => (
                <MenuItem key={formId + "-district-" + option.id} value={option.id}>
                  {option.name_th}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
      </Grid>
      <Grid item xs={4}></Grid>
      <Grid item xs={4}>
        <Controller
          name={namePath + "province_id"}
          control={control}
          rules={{
            required: "กรุณาระบุจังหวัด",
            onChange: (e) => {
              setValue(namePath + "district_id", "");
              setValue(namePath + "sub_district_id", "");
              setValue(namePath + "zip_code", "");
            }
          }}
          render={({ field }) => (
            <TextField
              fullWidth
              select
              label="จังหวัด"
              {...field}
              required
              {...getError(namePath + "province_id")}
              disabled={disabled}
            >
              <MenuItem value="">--กดเพื่อเลือก--</MenuItem>
              {(provinces || []).map((option: any) => (
                <MenuItem key={formId + "-province-" + option.id} value={option.id}>
                  {option.name_th}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
      </Grid>
      <Grid item xs={4}>
        <Controller
          name={namePath + "zip_code"}
          control={control}
          render={({ field }) => (
            <TextField fullWidth disabled label="รหัสไปรษณีย์" {...field} {...getError(namePath + "zip_code")} />
          )}
        />
      </Grid>
      <Grid item xs={4}></Grid>
      {showLocation && (
        <React.Fragment>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="ละติจูด"
              placeholder="กรอกข้อมูล"
              {...register(namePath + "latitude")}
              {...getError(namePath + "latitude")}
              disabled={disabled}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="ลองติจูด"
              placeholder="กรอกข้อมูล"
              {...register(namePath + "longitude")}
              {...getError(namePath + "longitude")}
              disabled={disabled}
            />
          </Grid>
          <Grid item xs={4}></Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Google map link"
              placeholder="กรอกข้อมูล"
              {...register(namePath + "google_map_url")}
              {...getError(namePath + "google_map_url")}
              disabled={disabled}
            />
          </Grid>
        </React.Fragment>
      )}
    </Grid>
  );
}

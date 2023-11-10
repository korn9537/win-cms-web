'use client';

import { SPACING_FORM } from '@/constants/layout.constant';
import { IAddress } from '@/interfaces/address.interface';
import { getDistricts, getProvinces, getSubDistricts } from '@/services/master-service';
import { Grid, MenuItem, TextField } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React, { useId } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

type FormAddressProps = {
  editMode?: boolean;
  mode?: 'create' | 'edit' | 'view';
  onEdit?: () => void;
  onCancelEdit?: () => void;
  showLocation?: boolean;
  hiddenTitle?: boolean;
};

export const defaultFormAddressValue: FormAddressValue = {
  address: {
    country: '',
    address_th: '',
    village_th: '',
    moo_th: '',
    tower_th: '',
    floor_th: '',
    soi_th: '',
    road_th: '',
    address_en: '',
    moo_en: '',
    village_en: '',
    tower_en: '',
    floor_en: '',
    soi_en: '',
    road_en: '',
    sub_district_id: '',
    district_id: '',
    province_id: '',
    zip_code: '',
    contact_mobile: '',
    web_site: '',
    latitude: 0,
    longitude: 0,
    google_map_url: '',
  },
};

export type FormAddressValue = {
  address: IAddress;
};

export default function FormAddress({
  editMode = false,
  mode,
  onEdit,
  onCancelEdit,
  showLocation = false,
  ...props
}: FormAddressProps) {
  const {
    control,
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<FormAddressValue>();

  // statics
  const formId = useId();

  // watches
  const province_id = watch('address.province_id', '') || '';
  const district_id = watch('address.district_id', '') || '';

  // province
  const { data: provinces } = useQuery({
    queryKey: ['master-province'],
    queryFn: getProvinces,
  });

  // districts
  const { data: districts } = useQuery({
    queryKey: ['master-district', province_id],
    queryFn: () => getDistricts(province_id),
    enabled: !!province_id,
  });

  // sub_districts
  const { data: subDistricts } = useQuery({
    queryKey: ['master-subdistrict', district_id],
    queryFn: () => getSubDistricts(district_id),
    enabled: !!district_id,
  });

  return (
    <Grid container spacing={SPACING_FORM}>
      <Grid item xs={4}>
        <TextField
          fullWidth
          required
          label="บ้านเลขที่"
          placeholder="กรอกข้อมูล"
          {...register('address.address_th', { required: 'กรุณาระบุ', setValueAs: (v) => v || '' })}
          error={Boolean(errors.address?.address_th)}
          helperText={errors.address?.address_th?.message}
          disabled={!editMode}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          fullWidth
          label="หมู่ที่"
          placeholder="กรอกข้อมูล"
          {...register('address.moo_th')}
          error={Boolean(errors.address?.moo_th)}
          helperText={errors.address?.moo_th?.message}
          disabled={!editMode}
        />
      </Grid>
      <Grid item xs={4}></Grid>
      <Grid item xs={4}>
        <TextField
          fullWidth
          label="หมู่บ้าน (ภาษาไทย)"
          placeholder="กรอกข้อมูล"
          {...register('address.village_th', {
            setValueAs: (v) => v || '',
          })}
          error={Boolean(errors.address?.village_th)}
          helperText={errors.address?.village_th?.message}
          disabled={!editMode}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          fullWidth
          label="หมู่บ้าน (ภาษาอังกฤษ)"
          placeholder="กรอกข้อมูล"
          {...register('address.village_en', {
            setValueAs: (v) => v || '',
          })}
          error={Boolean(errors.address?.village_en)}
          helperText={errors.address?.village_en?.message}
          disabled={!editMode}
        />
      </Grid>
      <Grid item xs={4}></Grid>
      <Grid item xs={4}>
        <TextField
          fullWidth
          label="อาคาร (ภาษาไทย)"
          placeholder="กรอกข้อมูล"
          {...register('address.tower_th')}
          error={Boolean(errors.address?.tower_th)}
          helperText={errors.address?.tower_th?.message}
          disabled={!editMode}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          fullWidth
          label="อาคาร (ภาษาอังกฤษ)"
          placeholder="กรอกข้อมูล"
          {...register('address.tower_en')}
          error={Boolean(errors.address?.tower_en)}
          helperText={errors.address?.tower_en?.message}
          disabled={!editMode}
        />
      </Grid>
      <Grid item xs={4}></Grid>
      <Grid item xs={4}>
        <TextField
          fullWidth
          label="ซอย (ภาษาไทย)"
          placeholder="กรอกข้อมูล"
          {...register('address.soi_th')}
          error={Boolean(errors.address?.soi_th)}
          helperText={errors.address?.soi_th?.message}
          disabled={!editMode}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          fullWidth
          label="ซอย (ภาษาอังกฤษ)"
          placeholder="กรอกข้อมูล"
          {...register('address.soi_en')}
          error={Boolean(errors.address?.soi_en)}
          helperText={errors.address?.soi_en?.message}
          disabled={!editMode}
        />
      </Grid>
      <Grid item xs={4}></Grid>
      <Grid item xs={4}>
        <TextField
          fullWidth
          label="ถนน (ภาษาไทย)"
          placeholder="กรอกข้อมูล"
          {...register('address.road_th')}
          error={Boolean(errors.address?.road_th)}
          helperText={errors.address?.road_th?.message}
          disabled={!editMode}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          fullWidth
          label="ถนน (ภาษาอังกฤษ)"
          placeholder="กรอกข้อมูล"
          {...register('address.road_en')}
          error={Boolean(errors.address?.road_en)}
          helperText={errors.address?.road_en?.message}
          disabled={!editMode}
        />
      </Grid>
      <Grid item xs={4}></Grid>
      <Grid item xs={4}>
        <Controller
          name="address.sub_district_id"
          control={control}
          rules={{
            required: 'กรุณาระบุตำบล/แขวง',
            onChange: (e) => {
              const item = subDistricts?.find((item) => item.id === e.target.value);
              if (item) {
                setValue('address.zip_code', item.post_code);
                return;
              }

              setValue('address.zip_code', '');
            },
          }}
          render={({ field }) => (
            <TextField
              fullWidth
              select
              label="ตำบล/แขวง"
              {...field}
              required
              error={Boolean(errors.address?.sub_district_id)}
              helperText={errors.address?.sub_district_id?.message}
              disabled={!editMode}
            >
              <MenuItem value="">--กดเพื่อเลือก--</MenuItem>
              {(subDistricts || []).map((option: any) => (
                <MenuItem key={formId + '-sub_district-' + option.id} value={option.id}>
                  {option.name_th}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
      </Grid>
      <Grid item xs={4}>
        <Controller
          name="address.district_id"
          control={control}
          rules={{
            required: 'กรุณาระบุอำเภอ/เขต',
            onChange: (e) => {
              setValue('address.sub_district_id', '');
              setValue('address.zip_code', '');
            },
          }}
          render={({ field }) => (
            <TextField
              fullWidth
              select
              label="อำเภอ/เขต"
              {...field}
              required
              error={Boolean(errors.address?.district_id)}
              helperText={errors.address?.district_id?.message}
              disabled={!editMode}
            >
              <MenuItem value="">--กดเพื่อเลือก--</MenuItem>
              {(districts || []).map((option: any) => (
                <MenuItem key={formId + '-district-' + option.id} value={option.id}>
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
          name="address.province_id"
          control={control}
          rules={{
            required: 'กรุณาระบุจังหวัด',
            onChange: (e) => {
              setValue('address.district_id', '');
              setValue('address.sub_district_id', '');
              setValue('address.zip_code', '');
            },
          }}
          render={({ field }) => (
            <TextField
              fullWidth
              select
              label="จังหวัด"
              {...field}
              required
              error={Boolean(errors.address?.province_id)}
              helperText={errors.address?.province_id?.message}
              disabled={!editMode}
            >
              <MenuItem value="">--กดเพื่อเลือก--</MenuItem>
              {(provinces || []).map((option: any) => (
                <MenuItem key={formId + '-province-' + option.id} value={option.id}>
                  {option.name_th}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
      </Grid>
      <Grid item xs={4}>
        <Controller
          name="address.zip_code"
          control={control}
          render={({ field }) => (
            <TextField
              fullWidth
              disabled
              label="รหัสไปรษณีย์"
              {...field}
              error={Boolean(errors.address?.zip_code)}
              helperText={errors.address?.zip_code?.message}
            />
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
              {...register('address.latitude')}
              error={Boolean(errors.address?.latitude)}
              helperText={errors.address?.latitude?.message}
              disabled={!editMode}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="ลองติจูด"
              placeholder="กรอกข้อมูล"
              {...register('address.longitude')}
              error={Boolean(errors.address?.longitude)}
              helperText={errors.address?.longitude?.message}
              disabled={!editMode}
            />
          </Grid>
          <Grid item xs={4}></Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Google map link"
              placeholder="กรอกข้อมูล"
              {...register('address.google_map_url')}
              error={Boolean(errors.address?.google_map_url)}
              helperText={errors.address?.google_map_url?.message}
              disabled={!editMode}
            />
          </Grid>
        </React.Fragment>
      )}
    </Grid>
  );
}

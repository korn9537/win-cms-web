// "use client";

// import { SPACING_FORM } from "@/constants/layout.constant";
// import { getDistricts, getProvinces, getSubDistricts } from "@/services/graphql/address.service";
// import { Grid, MenuItem, TextField } from "@mui/material";
// import { useQuery } from "@tanstack/react-query";
// import React, { forwardRef, useId, useImperativeHandle } from "react";
// import { Controller, useForm } from "react-hook-form";

// type FormAddressProps = {
//   showLocation?: boolean;
//   disabled?: boolean;
// };

// export const defaultFormAddressValue: FormAddressValue = {
//   country: "",
//   address_th: "",
//   village_th: "",
//   moo_th: "",
//   tower_th: "",
//   floor_th: "",
//   soi_th: "",
//   road_th: "",
//   address_en: "",
//   moo_en: "",
//   village_en: "",
//   tower_en: "",
//   floor_en: "",
//   soi_en: "",
//   road_en: "",
//   sub_district_id: "",
//   district_id: "",
//   province_id: "",
//   zip_code: "",
//   contact_mobile: "",
//   web_site: "",
//   latitude: 0,
//   longitude: 0,
//   google_map_url: ""
// };

// export type FormAddressValue = {
//   country: string;
//   address_th: string;
//   village_th: string;
//   moo_th: string;
//   tower_th: string;
//   floor_th: string;
//   soi_th: string;
//   road_th: string;
//   address_en: string;
//   moo_en: string;
//   village_en: string;
//   tower_en: string;
//   floor_en: string;
//   soi_en: string;
//   road_en: string;
//   sub_district_id: string;
//   district_id: string;
//   province_id: string;
//   zip_code: string;
//   contact_mobile: string;
//   web_site: string;
//   latitude: number;
//   longitude: number;
//   google_map_url: string;
// };

// const FormAddress = forwardRef(function FormAddress(
//   { showLocation = false, disabled = false, ...props }: FormAddressProps,
//   ref
// ) {
//   // hooks
//   useImperativeHandle(
//     ref,
//     () => {
//       return {
//         submit: () => {},
//         reset: () => {}
//       };
//     },
//     []
//   );

//   const {
//     control,
//     register,
//     watch,
//     setValue,
//     formState: { errors },
//     reset
//   } = useForm<FormAddressValue>();

//   // refs

//   // statics
//   const formId = useId();

//   // watches
//   const province_id = watch("province_id", "") || "";
//   const district_id = watch("district_id", "") || "";

//   // province
//   const { data: provinces } = useQuery({
//     queryKey: ["master-province"],
//     queryFn: getProvinces
//   });

//   // districts
//   const { data: districts } = useQuery({
//     queryKey: ["master-district", province_id],
//     queryFn: () => getDistricts(province_id),
//     enabled: !!province_id
//   });

//   // sub_districts
//   const { data: subDistricts } = useQuery({
//     queryKey: ["master-subdistrict", district_id],
//     queryFn: () => getSubDistricts(district_id),
//     enabled: !!district_id
//   });

//   return (
//     <Grid container spacing={SPACING_FORM}>
//       <Grid item xs={4}>
//         <TextField
//           fullWidth
//           required
//           label="บ้านเลขที่"
//           placeholder="กรอกข้อมูล"
//           {...register("address_th", { required: "กรุณาระบุ", setValueAs: (v) => v || "" })}
//           error={Boolean(errors.address_th)}
//           helperText={errors.address_th?.message}
//           disabled={disabled}
//         />
//       </Grid>
//       <Grid item xs={4}>
//         <TextField
//           fullWidth
//           label="หมู่ที่"
//           placeholder="กรอกข้อมูล"
//           {...register("moo_th")}
//           error={Boolean(errors.moo_th)}
//           helperText={errors.moo_th?.message}
//           disabled={disabled}
//         />
//       </Grid>
//       <Grid item xs={4}></Grid>
//       <Grid item xs={4}>
//         <TextField
//           fullWidth
//           label="หมู่บ้าน (ภาษาไทย)"
//           placeholder="กรอกข้อมูล"
//           {...register("village_th", {
//             setValueAs: (v) => v || ""
//           })}
//           error={Boolean(errors.village_th)}
//           helperText={errors.village_th?.message}
//           disabled={disabled}
//         />
//       </Grid>
//       <Grid item xs={4}>
//         <TextField
//           fullWidth
//           label="หมู่บ้าน (ภาษาอังกฤษ)"
//           placeholder="กรอกข้อมูล"
//           {...register("village_en", {
//             setValueAs: (v) => v || ""
//           })}
//           error={Boolean(errors.village_en)}
//           helperText={errors.village_en?.message}
//           disabled={disabled}
//         />
//       </Grid>
//       <Grid item xs={4}></Grid>
//       <Grid item xs={4}>
//         <TextField
//           fullWidth
//           label="อาคาร (ภาษาไทย)"
//           placeholder="กรอกข้อมูล"
//           {...register("tower_th")}
//           error={Boolean(errors.tower_th)}
//           helperText={errors.tower_th?.message}
//           disabled={disabled}
//         />
//       </Grid>
//       <Grid item xs={4}>
//         <TextField
//           fullWidth
//           label="อาคาร (ภาษาอังกฤษ)"
//           placeholder="กรอกข้อมูล"
//           {...register("tower_en")}
//           error={Boolean(errors.tower_en)}
//           helperText={errors.tower_en?.message}
//           disabled={disabled}
//         />
//       </Grid>
//       <Grid item xs={4}></Grid>
//       <Grid item xs={4}>
//         <TextField
//           fullWidth
//           label="ซอย (ภาษาไทย)"
//           placeholder="กรอกข้อมูล"
//           {...register("soi_th")}
//           error={Boolean(errors.soi_th)}
//           helperText={errors.soi_th?.message}
//           disabled={disabled}
//         />
//       </Grid>
//       <Grid item xs={4}>
//         <TextField
//           fullWidth
//           label="ซอย (ภาษาอังกฤษ)"
//           placeholder="กรอกข้อมูล"
//           {...register("soi_en")}
//           error={Boolean(errors.soi_en)}
//           helperText={errors.soi_en?.message}
//           disabled={disabled}
//         />
//       </Grid>
//       <Grid item xs={4}></Grid>
//       <Grid item xs={4}>
//         <TextField
//           fullWidth
//           label="ถนน (ภาษาไทย)"
//           placeholder="กรอกข้อมูล"
//           {...register("road_th")}
//           error={Boolean(errors.road_th)}
//           helperText={errors.road_th?.message}
//           disabled={disabled}
//         />
//       </Grid>
//       <Grid item xs={4}>
//         <TextField
//           fullWidth
//           label="ถนน (ภาษาอังกฤษ)"
//           placeholder="กรอกข้อมูล"
//           {...register("road_en")}
//           error={Boolean(errors.road_en)}
//           helperText={errors.road_en?.message}
//           disabled={disabled}
//         />
//       </Grid>
//       <Grid item xs={4}></Grid>
//       <Grid item xs={4}>
//         <Controller
//           name="sub_district_id"
//           control={control}
//           rules={{
//             required: "กรุณาระบุตำบล/แขวง",
//             onChange: (e) => {
//               const item = subDistricts?.find((item) => item.id === e.target.value);
//               if (item) {
//                 setValue("zip_code", item.post_code);
//                 return;
//               }

//               setValue("zip_code", "");
//             }
//           }}
//           render={({ field }) => (
//             <TextField
//               fullWidth
//               select
//               label="ตำบล/แขวง"
//               {...field}
//               required
//               error={Boolean(errors.sub_district_id)}
//               helperText={errors.sub_district_id?.message}
//               disabled={disabled}
//             >
//               <MenuItem value="">--กดเพื่อเลือก--</MenuItem>
//               {(subDistricts || []).map((option: any) => (
//                 <MenuItem key={formId + "-sub_district-" + option.id} value={option.id}>
//                   {option.name_th}
//                 </MenuItem>
//               ))}
//             </TextField>
//           )}
//         />
//       </Grid>
//       <Grid item xs={4}>
//         <Controller
//           name="district_id"
//           control={control}
//           rules={{
//             required: "กรุณาระบุอำเภอ/เขต",
//             onChange: (e) => {
//               setValue("sub_district_id", "");
//               setValue("zip_code", "");
//             }
//           }}
//           render={({ field }) => (
//             <TextField
//               fullWidth
//               select
//               label="อำเภอ/เขต"
//               {...field}
//               required
//               error={Boolean(errors.district_id)}
//               helperText={errors.district_id?.message}
//               disabled={disabled}
//             >
//               <MenuItem value="">--กดเพื่อเลือก--</MenuItem>
//               {(districts || []).map((option: any) => (
//                 <MenuItem key={formId + "-district-" + option.id} value={option.id}>
//                   {option.name_th}
//                 </MenuItem>
//               ))}
//             </TextField>
//           )}
//         />
//       </Grid>
//       <Grid item xs={4}></Grid>
//       <Grid item xs={4}>
//         <Controller
//           name="province_id"
//           control={control}
//           rules={{
//             required: "กรุณาระบุจังหวัด",
//             onChange: (e) => {
//               setValue("district_id", "");
//               setValue("sub_district_id", "");
//               setValue("zip_code", "");
//             }
//           }}
//           render={({ field }) => (
//             <TextField
//               fullWidth
//               select
//               label="จังหวัด"
//               {...field}
//               required
//               error={Boolean(errors.province_id)}
//               helperText={errors.province_id?.message}
//               disabled={disabled}
//             >
//               <MenuItem value="">--กดเพื่อเลือก--</MenuItem>
//               {(provinces || []).map((option: any) => (
//                 <MenuItem key={formId + "-province-" + option.id} value={option.id}>
//                   {option.name_th}
//                 </MenuItem>
//               ))}
//             </TextField>
//           )}
//         />
//       </Grid>
//       <Grid item xs={4}>
//         <Controller
//           name="zip_code"
//           control={control}
//           render={({ field }) => (
//             <TextField
//               fullWidth
//               disabled
//               label="รหัสไปรษณีย์"
//               {...field}
//               error={Boolean(errors.zip_code)}
//               helperText={errors.zip_code?.message}
//             />
//           )}
//         />
//       </Grid>
//       <Grid item xs={4}></Grid>
//       {showLocation && (
//         <React.Fragment>
//           <Grid item xs={4}>
//             <TextField
//               fullWidth
//               label="ละติจูด"
//               placeholder="กรอกข้อมูล"
//               {...register("latitude")}
//               error={Boolean(errors.latitude)}
//               helperText={errors.latitude?.message}
//               disabled={disabled}
//             />
//           </Grid>
//           <Grid item xs={4}>
//             <TextField
//               fullWidth
//               label="ลองติจูด"
//               placeholder="กรอกข้อมูล"
//               {...register("longitude")}
//               error={Boolean(errors.longitude)}
//               helperText={errors.longitude?.message}
//               disabled={disabled}
//             />
//           </Grid>
//           <Grid item xs={4}></Grid>
//           <Grid item xs={4}>
//             <TextField
//               fullWidth
//               label="Google map link"
//               placeholder="กรอกข้อมูล"
//               {...register("google_map_url")}
//               error={Boolean(errors.google_map_url)}
//               helperText={errors.google_map_url?.message}
//               disabled={disabled}
//             />
//           </Grid>
//         </React.Fragment>
//       )}
//     </Grid>
//   );
// });

// export default FormAddress;

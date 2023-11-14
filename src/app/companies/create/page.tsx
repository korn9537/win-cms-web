"use client";

import PageLayout from "@/components/PageLayout";
import SwitchStatus from "@/components/SwitchStatus";
import FormContainer from "@/components/forms/FormContainer";
import { SPACING_LAYOUT } from "@/constants/layout.constant";
import { createCompany } from "@/services/graphql/companies.service";
import { CreateCompanyDTO } from "@/services/graphql/dto/create-company.input";
import { useLayoutStore } from "@/stores/layout.store";
import { Stack } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import FormCompany, { FormCompanyValue, defaultFormCompanyValue } from "../components/FormCompany";

export default function CompanyCreatePage() {
  // statics
  const router = useRouter();

  const { showToast, showBackdrop } = useLayoutStore((state) => ({
    showToast: state.showToast,
    showBackdrop: state.showBackdrop
  }));

  // forms
  const methods = useForm<FormCompanyValue>({
    defaultValues: defaultFormCompanyValue
  });

  // mutations
  const createMutation = useMutation({
    mutationFn: (values: CreateCompanyDTO) => {
      return createCompany(values);
    }
  });

  useEffect(() => {
    showBackdrop(createMutation.isPending);
    return () => {
      showBackdrop(false);
    };
  }, [createMutation.isPending]);

  // actions
  const handleOnBack = () => {
    router.push(`/companies`);
  };

  const handleOnSubmit = async (values: FormCompanyValue) => {
    try {
      const body: CreateCompanyDTO = {
        code: values.code.toLowerCase(),
        name_th: values.name_th,
        name_en: values.name_en,
        tax_number: values.tax_number,
        email: values.email.toLowerCase(),
        telephone: values.telephone,
        website: values.website.toLowerCase(),
        logo_image_id: values.logo_image_id,
        corporate_crest_id: values.corporate_crest_id,
        register_vat: values.register_vat,
        is_active: values.is_active,
        interface_code: values.interface_code,
        change_amount: values.change_amount,
        payment_term_code: "", // values.payment_term_code,
        address: {
          country: "TH",
          address_th: values.address.address_th,
          village_th: values.address.village_th,
          moo_th: values.address.moo_th,
          tower_th: values.address.tower_th,
          floor_th: values.address.floor_th,
          soi_th: values.address.soi_th,
          road_th: values.address.road_th,

          address_en: values.address.address_en,
          village_en: values.address.village_en,
          moo_en: values.address.moo_en,
          tower_en: values.address.tower_en,
          floor_en: values.address.floor_en,
          soi_en: values.address.soi_en,
          road_en: values.address.road_en,

          sub_district_id: values.address.sub_district_id,
          district_id: values.address.district_id,
          province_id: values.address.province_id,
          zip_code: +values.address.zip_code,
          latitude: +values.address.latitude,
          longitude: +values.address.longitude,
          address_type: "contact",
          is_default: true,
          // contact_name: values.address.contact_name,
          // contact_mobile: values.address.contact_mobile,
          // contact_type: "contact",
          google_map_url: values.address.google_map_url
        }
      };
      //
      await createMutation.mutateAsync(body);
      //
      showToast("success", "บันทึกข้อมูลสำเร็จ");
      //
      handleOnBack();
    } catch (error: any) {
      showToast("error", error.response?.data?.message);
    }
  };

  return (
    <PageLayout
      type="detail"
      toolbar={{
        title: "เพิ่มบริษัท"
      }}
      onBack={handleOnBack}
    >
      <FormProvider {...methods}>
        <Stack spacing={SPACING_LAYOUT}>
          {/* Switch */}
          <SwitchStatus />
          {/* Form */}
          <FormContainer title="รายละเอียดบริษัท" onSubmit={methods.handleSubmit(handleOnSubmit)}>
            <FormCompany />
          </FormContainer>
        </Stack>
      </FormProvider>
    </PageLayout>
  );
}

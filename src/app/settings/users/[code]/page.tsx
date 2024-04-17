"use client";

import PageLayout from "@/components/PageLayout";
import { FormBase } from "@/components/forms/FormContainer";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import FormCreateUser, { FormCreateUserValue, defaultFormCreateUserValue } from "../components/FormCreateUser";
import { useMutation } from "@tanstack/react-query";
import { CreateUserDTO, UpdateUserDTO } from "@/services/graphql/dto/create-user.input";
import { createUser, getUserByCode, updateUser } from "@/services/graphql/user.service";
import { useLayoutStore } from "@/stores/layout.store";
import { useEffect } from "react";

type SettingUserInfoPageProps = {
  params: {
    code: string;
  };
};

export default function SettingUserInfoPage(props: SettingUserInfoPageProps) {
  // statics
  const router = useRouter();
  const { showBackdrop, showToast } = useLayoutStore((state) => ({
    showBackdrop: state.showBackdrop,
    showToast: state.showToast
  }));

  // forms
  const userForm = useForm<FormCreateUserValue>({
    defaultValues: async () => {
      const user = await getUserByCode(props.params.code as string);

      return {
        id: user.id,
        logo_image_id: user.image_id ?? "",
        logo_image_url: user.thumbnail ?? "",
        code: user.code,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        password: user.password ?? "",
        password_no_expire: false,
        mobile: user.mobile,
        is_active: user.is_active,
        department_id: user.department_id ?? "",
        position_id: user.position_id ?? "",
        role_ids: user.role_ids ?? [],
        type: "user"
      };
    }
  });

  // mutations
  const updateUserMutation = useMutation({
    mutationFn: (body: UpdateUserDTO) => {
      return updateUser(body);
    }
  });

  useEffect(() => {
    showBackdrop(updateUserMutation.isPending);
  }, [updateUserMutation.isPending]);

  // actions
  const handleOnBack = () => {
    router.replace("/settings/users");
  };

  const handleOnSubmit = async (values: FormCreateUserValue) => {
    try {
      const body: UpdateUserDTO = {
        id: values.id ?? "",
        code: values.code,
        first_name: values.first_name,
        last_name: values.last_name,
        email: values.email,
        mobile: values.mobile,
        is_active: values.is_active,
        department_id: values.department_id,
        position_id: values.position_id,
        role_ids: values.role_ids,
        image_id: values.logo_image_id
      };
      await updateUserMutation.mutateAsync(body);

      showToast("success");
      handleOnBack();
    } catch (error: any) {
      showToast("error", error.response?.data?.message);
    }
  };

  return (
    <PageLayout
      type="detail"
      clean
      toolbar={{
        title: "ข้อมูลผู้ใช้งาน",
        backFunction: handleOnBack
      }}
    >
      <FormProvider {...userForm}>
        <FormBase onSubmit={userForm.handleSubmit(handleOnSubmit)} showSubmitButton showCancelButton>
          <FormCreateUser />
        </FormBase>
      </FormProvider>
    </PageLayout>
  );
}

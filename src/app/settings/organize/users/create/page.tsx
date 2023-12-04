"use client";

import PageLayout from "@/components/PageLayout";
import { FormBase } from "@/components/forms/FormContainer";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import FormCreateUser, { FormCreateUserValue, defaultFormCreateUserValue } from "../components/FormCreateUser";
import { useMutation } from "@tanstack/react-query";
import { CreateUserDTO } from "@/services/graphql/dto/create-user.input";
import { createUser } from "@/services/graphql/user.service";
import { useLayoutStore } from "@/stores/layout.store";
import { useEffect } from "react";

export default function SettingCreateUserPage() {
  // statics
  const router = useRouter();
  const { showBackdrop, showToast } = useLayoutStore((state) => ({
    showBackdrop: state.showBackdrop,
    showToast: state.showToast
  }));

  // forms
  const userForm = useForm<FormCreateUserValue>({
    defaultValues: defaultFormCreateUserValue
  });

  // mutations
  const createUserMutation = useMutation({
    mutationFn: (body: CreateUserDTO) => {
      return createUser(body);
    }
  });

  useEffect(() => {
    showBackdrop(createUserMutation.isPending);
  }, [createUserMutation.isPending]);

  // actions
  const handleOnBack = () => {
    router.replace("/settings/organize/users");
  };

  const handleOnSubmit = async (values: FormCreateUserValue) => {
    try {
      const body: CreateUserDTO = {
        code: values.code,
        first_name: values.first_name,
        last_name: values.last_name,
        email: values.email,
        password: values.password,
        // password_no_expire: values.password_no_expire,
        mobile: values.mobile,
        is_active: values.is_active,
        department_id: values.department_id,
        position_id: values.position_id,
        role_ids: values.role_ids
      };
      await createUserMutation.mutateAsync(body);

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
        title: "เพิ่มข้อมูลผู้ใช้งาน",
        backFunction: handleOnBack
      }}
    >
      <FormProvider {...userForm}>
        <FormBase onSubmit={userForm.handleSubmit(handleOnSubmit)} showSubmitButton>
          <FormCreateUser />
        </FormBase>
      </FormProvider>
    </PageLayout>
  );
}

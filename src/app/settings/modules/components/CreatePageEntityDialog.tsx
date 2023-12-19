import { FormBase } from "@/components/forms/FormContainer";
import { SPACING_FORM } from "@/constants/layout.constant";
import { UseDialogProps, useDialog } from "@/hooks/useDialog";
import { CreatePermissionEntityDTO } from "@/services/graphql/dto/create-permission-entity.input";
import { PermissionEntityModel } from "@/services/graphql/models/permission.model";
import { createPageEntity, updatePageEntity } from "@/services/graphql/permission.service";
import { Grid, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";

type FormCreatePageEntityValues = {
  code: string;
  name_th: string;
  name_en: string;
};

type DataType = {
  action: "add" | "edit";
  node: PermissionEntityModel | null;
  page_id: string | null;
};

type ResponseType = {
  pageId: string;
  nodeId: string;
};

export const useDialogCreatePageEntity = useDialog<DataType, ResponseType>;

export type CreatePageEntityDialogProps = UseDialogProps<DataType, ResponseType>;

export default function CreatePageEntityDialog(props: CreatePageEntityDialogProps) {
  // statics
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormCreatePageEntityValues>({
    defaultValues: {
      code: "",
      name_th: "",
      name_en: ""
    }
  });

  // refs
  const refTbxNameTh = useRef<HTMLInputElement>(null);

  // states
  const { open, onCancel, onConfirm, title, content, data } = props;

  useEffect(() => {
    if (data == null) {
      return;
    }

    if (data.action == "add") {
      reset({
        code: "",
        name_th: "",
        name_en: ""
      });
    }

    if (data.action == "edit") {
      reset({
        code: data.node?.code,
        name_th: data.node?.name_th,
        name_en: data.node?.name_en
      });
    }

    if (open) {
      setTimeout(() => {
        refTbxNameTh.current?.focus();
      }, 100);
    }

    return () => {};
  }, [open]);

  // mutations
  const mutationCreate = useMutation({
    mutationFn: (data: CreatePermissionEntityDTO) => {
      return createPageEntity(data);
    }
  });

  const mutationUpdate = useMutation({
    mutationFn: (data: CreatePermissionEntityDTO) => {
      if (!props.data) {
        throw new Error("data is null");
      }
      return updatePageEntity(props.data?.node?.id || "", data);
    }
  });

  //

  // actions
  const handleOnClose = () => {
    onCancel();
  };

  const handleOnSubmit = async (values: FormCreatePageEntityValues) => {
    if (props.data?.action == "add") {
      const nodeId = await mutationCreate.mutateAsync({
        code: values.code,
        name_th: values.name_th,
        name_en: values.name_en,
        page_id: props.data.page_id
      });

      onConfirm({
        pageId: props.data?.page_id || "",
        nodeId
      });
    } else {
      const nodeId = await mutationUpdate.mutateAsync({
        code: values.code,
        name_th: values.name_th,
        name_en: values.name_en,
        page_id: props.data?.page_id || ""
      });

      onConfirm({
        pageId: props.data?.page_id || "",
        nodeId
      });
    }
  };

  return (
    <Dialog open={open} onClose={handleOnClose} fullWidth={true}>
      <FormBase onSubmit={handleSubmit(handleOnSubmit)}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <Grid container spacing={SPACING_FORM}>
            <Grid item xs={12}>
              <TextField
                label="รหัส"
                {...register("code")}
                error={!!errors.code}
                // required
                helperText={errors.code?.message}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="ชื่อ (ภาษาไทย)"
                {...register("name_th", {
                  required: "โปรดระบุ"
                })}
                required
                error={!!errors.name_th}
                helperText={errors.name_th?.message}
                autoFocus
                inputRef={refTbxNameTh}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="ชื่อ (ภาษาอังกฤษ)"
                {...register("name_en")}
                error={!!errors.name_en}
                helperText={errors.name_en?.message}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button type="submit" variant="contained" color="primary">
            บันทึก
          </Button>
          <Button onClick={handleOnClose}>ยกเลิก</Button>
        </DialogActions>
      </FormBase>
    </Dialog>
  );
}

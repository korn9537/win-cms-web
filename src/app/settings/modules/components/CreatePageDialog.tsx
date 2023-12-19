import { FormBase } from "@/components/forms/FormContainer";
import { SPACING_FORM } from "@/constants/layout.constant";
import { UseDialogProps } from "@/hooks/useDialog";
import { CreatePermissionPageDTO } from "@/services/graphql/dto/create-permission-page.input";
import { createPage, updatePage } from "@/services/graphql/permission.service";
import { Grid, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";

type FormCreatePageValues = {
  code: string;
  name_th: string;
  name_en: string;
};

export default function CreatePageDialog(props: UseDialogProps) {
  // statics
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormCreatePageValues>({
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
        code: data.node.code,
        name_th: data.node.name_th,
        name_en: data.node.name_en
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
    mutationFn: (data: CreatePermissionPageDTO) => {
      return createPage(data);
    }
  });

  const mutationUpdate = useMutation({
    mutationFn: (data: CreatePermissionPageDTO) => {
      return updatePage(props.data.node.id, data);
    }
  });

  //

  // actions
  const handleOnClose = () => {
    onCancel();
  };

  const handleOnSubmit = async (values: FormCreatePageValues) => {
    if (props.data.action == "add") {
      const nodeId = await mutationCreate.mutateAsync({
        code: values.code,
        name_th: values.name_th,
        name_en: values.name_en,
        parent_id: props.data.parent.id == "root" ? null : props.data.parent.id
      });

      onConfirm({
        parentId: props.data.parent.id,
        nodeId
      });
    } else {
      const nodeId = await mutationUpdate.mutateAsync({
        code: values.code,
        name_th: values.name_th,
        name_en: values.name_en,
        parent_id: props.data.node.parent_id
      });

      onConfirm({
        parentId: props.data.node.parent_id,
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

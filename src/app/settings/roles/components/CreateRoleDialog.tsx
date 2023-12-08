import { FormBase } from "@/components/forms/FormContainer";
import { SPACING_FORM } from "@/constants/layout.constant";
import { UseDialogProps } from "@/hooks/useDialog";
import { CreateRoleDTO, UpdateRoleDTO } from "@/services/graphql/dto/create-role.input";
import { createMasterRole, updateMasterRole } from "@/services/graphql/masters/master-role.service";
import { useLayoutStore } from "@/stores/layout.store";
import { Grid, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

type FormCreateRoleValues = {
  code: string;
  name_th: string;
  name_en: string;
};

export default function CreateRoleDialog(props: UseDialogProps) {
  // statics
  const { open, onCancel, onConfirm, title, content, data } = props;

  const { showToast } = useLayoutStore((state) => ({
    showToast: state.showToast
  }));

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormCreateRoleValues>({
    defaultValues: {
      code: "",
      name_th: "",
      name_en: ""
    }
  });

  // states

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
  }, [open]);

  // mutations
  const mutationCreate = useMutation({
    mutationFn: (data: CreateRoleDTO) => {
      return createMasterRole(data);
    }
  });

  const mutationUpdate = useMutation({
    mutationFn: (data: UpdateRoleDTO) => {
      return updateMasterRole(props.data.node.id, data);
    }
  });

  //

  // actions
  const handleOnClose = () => {
    onCancel();
  };

  const handleOnSubmit = async (values: FormCreateRoleValues) => {
    try {
      if (props.data.action == "add") {
        const nodeId = await mutationCreate.mutateAsync({
          code: values.code,
          name_th: values.name_th,
          name_en: values.name_en
        });

        onConfirm(nodeId);
      } else {
        const nodeId = await mutationUpdate.mutateAsync({
          code: values.code,
          name_th: values.name_th,
          name_en: values.name_en
        });

        onConfirm(nodeId);
      }

      showToast("success");
    } catch (error: any) {
      showToast("error", error.response?.data?.message);
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

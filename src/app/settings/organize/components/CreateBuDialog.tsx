import { FormBase } from "@/components/forms/FormContainer";
import { SPACING_FORM } from "@/constants/layout.constant";
import { UseDialogProps } from "@/hooks/useDialog";
import { CreateOrganizeDTO } from "@/services/graphql/dto/create-organize.input";
import { createOrganize, updateOrganize } from "@/services/graphql/organize.service";
import { Grid, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

type FormCreateBUValues = {
  code: string;
  name_th: string;
  name_en: string;
};

export default function CreateBuDialog(props: UseDialogProps) {
  // statics
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormCreateBUValues>({
    defaultValues: {
      code: "",
      name_th: "",
      name_en: ""
    }
  });

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
  }, [open]);

  // mutations
  const mutationCreateBu = useMutation({
    mutationFn: (data: CreateOrganizeDTO) => {
      return createOrganize(data);
    }
  });

  const mutationUpdateBu = useMutation({
    mutationFn: (data: CreateOrganizeDTO) => {
      return updateOrganize(props.data.node.id, data);
    }
  });

  //

  // actions
  const handleOnClose = () => {
    onCancel();
  };

  const handleOnSubmit = async (values: FormCreateBUValues) => {
    console.log(values, props.data);

    if (props.data.action == "add") {
      const nodeId = await mutationCreateBu.mutateAsync({
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
      const nodeId = await mutationUpdateBu.mutateAsync({
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
                label="รหัส BU"
                {...register("code")}
                error={!!errors.code}
                // required
                helperText={errors.code?.message}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="ชื่อ BU ภาษาไทย"
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
                label="ชื่อ BU ภาษาอังกฤษ"
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

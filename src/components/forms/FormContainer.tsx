import { Box, BoxProps, Button, ButtonProps, Stack } from "@mui/material";
import React from "react";
import FormTitle, { FormTitleProps } from "../FormTitle";
import ButtonSave from "../ButtonSave";
import { SPACING_LAYOUT } from "@/constants/layout.constant";

export type FormContainerProps = {
  title?: string;
  titleProps?: Omit<FormTitleProps, "title">;
  action?: React.ReactNode;
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
  buttonState?: "create" | "update";
  shadow?: boolean;
} & BoxProps;

export default function FormContainer({
  title,
  titleProps,
  action,
  onSubmit,
  buttonState = "create",
  shadow = true,
  ...props
}: FormContainerProps) {
  const content = (
    <Box
      sx={{
        bgcolor: "#fff",
        p: 3,
        boxShadow: shadow ? "0px 1px 8px 0px rgba(0, 0, 0, 0.10)" : "none",
        borderRadius: "12px",
        ...props.sx
      }}
      {...props}
    >
      <FormTitle title={title || ""} {...titleProps} action={action} />
      {props.children}
    </Box>
  );

  if (onSubmit) {
    return (
      <Box component="form" autoComplete="off" noValidate onSubmit={onSubmit}>
        <Stack spacing={SPACING_LAYOUT}>
          {content}
          <Box>
            <ButtonSave state={buttonState} />
          </Box>
        </Stack>
      </Box>
    );
  }

  return <Stack spacing={SPACING_LAYOUT}>{content}</Stack>;
}

export type FormBaseProps = {
  children: React.ReactNode;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  onCancel?: React.MouseEventHandler<HTMLButtonElement>;
  showSubmitButton?: boolean;
  submitButtonState?: "create" | "update";
  submitButtonProps?: ButtonProps;
  showCancelButton?: boolean;
  cancelButtonProps?: ButtonProps;
  cancelButtonText?: string;
};

export function FormBase({
  onSubmit,
  children,
  showSubmitButton = false,
  submitButtonState = "create",
  showCancelButton = false,
  cancelButtonText = "ยกเลิก",
  ...props
}: FormBaseProps) {
  return (
    <Box component="form" autoComplete="off" noValidate onSubmit={onSubmit}>
      {children}
      {showSubmitButton && (
        <Box mt={SPACING_LAYOUT}>
          <Stack direction="row" spacing={2.5}>
            {showCancelButton && (
              <Button onClick={props.onCancel} variant="text" color="black80" {...props.cancelButtonProps}>
                {cancelButtonText}
              </Button>
            )}
            <ButtonSave state={submitButtonState} {...props.submitButtonProps} />
          </Stack>
        </Box>
      )}
    </Box>
  );
}

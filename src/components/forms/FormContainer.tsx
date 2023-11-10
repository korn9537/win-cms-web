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
  showSaveButton?: boolean;
  buttonState?: "create" | "update";
  buttonProps?: ButtonProps;
};

export function FormBase({
  onSubmit,
  children,
  showSaveButton = false,
  buttonState = "create",
  ...props
}: FormBaseProps) {
  return (
    <Box component="form" autoComplete="off" noValidate onSubmit={onSubmit}>
      {children}
      {showSaveButton && (
        <Box mt={SPACING_LAYOUT}>
          <ButtonSave state={buttonState} {...props.buttonProps} />
        </Box>
      )}
    </Box>
  );
}

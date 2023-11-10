"use client";

import { Box, Button, ButtonProps, Stack } from "@mui/material";
import { IconArrowLeft, IconArrowRight, IconSave } from "../Icons";

type ButtonStepWizardProps = ButtonProps & {
  text?: string;
  stepIcon: "back" | "next" | "submit";
};

export function ButtonStepWizard({ stepIcon, text, variant, color, ...props }: ButtonStepWizardProps) {
  if (stepIcon == "back") {
    return (
      <Button variant={variant || "outlined"} color={color || "black80"} {...props}>
        <IconArrowLeft style={{ marginRight: "8px" }} />
        {text || "ย้อนกลับ"}
      </Button>
    );
  }

  if (stepIcon == "next") {
    return (
      <Button type="submit" variant={variant || "contained"} {...props}>
        {text || "ถัดไป"}
        <IconArrowRight style={{ marginLeft: "8px" }} />
      </Button>
    );
  }

  return (
    <Button type="submit" variant={variant || "contained"} {...props}>
      <IconSave style={{ marginRight: "8px" }} />
      {text || "บันทึกข้อมูล"}
    </Button>
  );
}

export type FormWizardActionProps = {
  current: number;
  total: number;
  disabledNext?: boolean;
  onClickBack?: () => void;
  onClickNext?: () => void;
};

export default function FormWizardAction(props: FormWizardActionProps) {
  return (
    <Box>
      <Stack spacing={2.5} direction="row">
        {props.current > 0 && <ButtonStepWizard stepIcon="back" onClick={props.onClickBack} />}
        {props.current < props.total - 1 && (
          <ButtonStepWizard
            stepIcon="next"
            disabled={props.disabledNext}
            onClick={() => props.onClickNext && props.onClickNext()}
          />
        )}
        {props.current == props.total - 1 && (
          <ButtonStepWizard
            stepIcon="submit"
            disabled={props.disabledNext}
            onClick={() => props.onClickNext && props.onClickNext()}
          />
        )}
      </Stack>
    </Box>
  );
}

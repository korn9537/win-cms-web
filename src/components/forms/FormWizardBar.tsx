import { NavigateNext } from "@mui/icons-material";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import React, { useId } from "react";

export type FormWizardBarProps = {
  steps: string[];
  current: number;
  total: number;
  onClick?: (step: number) => void;
  showNumber?: boolean;
};

export default function FormWizardBar(props: FormWizardBarProps) {
  const theme = useTheme();
  const formId = useId();

  return (
    <Box
      sx={{
        py: 1.5,
        px: 3,
        bgcolor: theme.palette.softBlue[20],
        borderRadius: "8px"
      }}
    >
      <Stack direction="row" alignItems="center" spacing={1.25}>
        {props.steps.map((step, index) => {
          const isActive = index === props.current;
          const isDone = index < props.current;
          const isLast = index === props.total - 1;

          if (isLast) {
            return (
              <FormWizardStepItem
                key={`${formId}-${index}`}
                text={step}
                isActive={isActive}
                number={props.showNumber ? index + 1 : undefined}
              />
            );
          }

          return (
            <React.Fragment key={`${formId}-${index}`}>
              <FormWizardStepItem
                text={step}
                isActive={isActive || isDone}
                isDone={isDone}
                number={props.showNumber ? index + 1 : undefined}
              />
              <NavigateNext
                sx={{
                  color: theme.palette.deepBlue[40],
                  width: 20,
                  height: 20,
                  mt: 0.25
                }}
              />
            </React.Fragment>
          );
        })}
      </Stack>
    </Box>
  );
}

type FormWizardStepItemProps = {
  text: string;
  isActive?: boolean;
  isDone?: boolean;
  number?: number;
};

function FormWizardStepItem(props: FormWizardStepItemProps) {
  const theme = useTheme();

  return (
    <Typography
      variant="body_L_B"
      sx={{
        color: props.isDone
          ? theme.palette.deepBlue[80]
          : props.isActive
          ? theme.palette.primary.main
          : theme.palette.deepBlue[40]
      }}
    >
      {props.number ? `${props.number}. ${props.text}` : props.text}
    </Typography>
  );
}

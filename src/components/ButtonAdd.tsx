"use client";

import { Box, Button, ButtonBase, ButtonProps, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { IconAdd } from "./Icons";

export type ButtonAddProps = ButtonProps & {
  text?: string;
  iconSize?: string;
};

export default function ButtonAdd({ variant = "contained", text = "เพิ่มข้อมูล", href, ...props }: ButtonAddProps) {
  const router = useRouter();

  if (href) {
    props.onClick = () => {
      router.push(href || "#");
    };
  }

  return (
    <Button variant={variant} {...props}>
      <Box
        component="span"
        sx={{
          display: "inline-flex",
          alignItems: "center",
          mr: 0.5,
          svg: {
            width: props.iconSize || "20px",
            height: props.iconSize || "20px"
          }
        }}
      >
        <IconAdd />
      </Box>
      {text}
    </Button>
  );
}

export function ButtonAddBase({ text = "เพิ่มข้อมูล", href, ...props }: ButtonAddProps) {
  const router = useRouter();

  if (href) {
    props.onClick = () => {
      router.push(href || "#");
    };
  }

  return (
    <ButtonBase
      onClick={props.onClick}
      sx={{
        color: (theme) => theme.palette.primary[100]
      }}
    >
      <Box
        component="span"
        sx={{
          display: "inline-flex",
          alignItems: "center",
          mr: 0.5,
          svg: {
            width: props.iconSize || "20px",
            height: props.iconSize || "20px"
          }
        }}
      >
        <IconAdd />
      </Box>
      <Typography variant="body_M" component="span">
        {text}
      </Typography>
    </ButtonBase>
  );
}

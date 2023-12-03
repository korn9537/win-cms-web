import { Box, BoxProps, Stack, Typography } from "@mui/material";
import ButtonAdd, { ButtonAddProps } from "./ButtonAdd";

type EmptyDataPanelProps = {
  title?: string;
  description?: string;
  buttonProps?: ButtonAddProps;
  onClick?: () => void;
  height?: number | string;
} & BoxProps;

export default function EmptyDataPanel({
  title = "ยังไม่มีรายการข้อมูล",
  description,
  buttonProps,
  height = 500,
  onClick,
  ...props
}: EmptyDataPanelProps) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      // padding={SPACING_LAYOUT}
      height={height}
      {...props}
    >
      <Stack
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <Stack spacing={2} alignItems="center">
          <Box component={"img"} src="/images/no-data.png" width={160} height={160} />
          <Box>
            <Typography variant="title_M" color="neutralGray.main">
              {title}
            </Typography>
            {description && (
              <Typography variant="body_M" color="neutralGray.main" mt={1.5}>
                {description}
              </Typography>
            )}
          </Box>
          {onClick && (
            <Box>
              <ButtonAdd onClick={onClick} {...(buttonProps == null ? {} : buttonProps)} />
            </Box>
          )}
        </Stack>
      </Stack>
    </Box>
  );
}

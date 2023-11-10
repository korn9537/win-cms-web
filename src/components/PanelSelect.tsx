import { Box, BoxProps, useTheme } from '@mui/material';

type PanelSelectProps = {
  error?: boolean;
} & BoxProps;

export default function PanelSelect({ error, ...props }: PanelSelectProps) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        p: 2.5,
        alignItems: 'flex-start',
        flexDirection: 'row',
        borderRadius: '12px',
        backgroundColor: theme.palette.neutralGray[10],
        '& .MuiRadio-root span, & .MuiSvgIcon-root': {
          color: error ? theme.palette.error.main : 'inherit',
        },
        ...props.sx,
      }}
    >
      {props.children}
    </Box>
  );
}

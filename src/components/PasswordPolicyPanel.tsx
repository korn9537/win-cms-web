import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { Box, Typography } from '@mui/material';
import { green, grey } from '@mui/material/colors';
import { Stack } from '@mui/system';

type PasswordPolicyPanelProps = {
  errors?: {
    has_length?: boolean;
    has_lowercase?: boolean;
    has_uppercase?: boolean;
    has_number?: boolean;
    has_character?: boolean;
  };
  size?: 'small' | 'large';
};

export default function PasswordPolicyPanel({ errors = {}, size = 'small' }: PasswordPolicyPanelProps) {
  if (size == 'small') {
    return (
      <Box>
        <Stack direction="row" flexWrap="wrap">
          <ValidateItem size={size} error={errors.has_length}>
            มากกว่า 8 ตัวอักษร
          </ValidateItem>
          <ValidateItem size={size} error={errors.has_lowercase}>
            อักษรตัวเล็ก {`(a-z)`}
          </ValidateItem>
          <ValidateItem size={size} error={errors.has_uppercase}>
            อักษรตัวใหญ่ {`(A-Z)`}
          </ValidateItem>
          <ValidateItem size={size} error={errors.has_number}>
            ตัวเลข {`(0-9)`}
          </ValidateItem>
          {/* <ValidateItem size="small" error={errors.has_character}>
            อักขระพิเศษ {`(@$%#)`}
          </ValidateItem> */}
        </Stack>
      </Box>
    );
  }

  return (
    <Box>
      {/* <Typography mb={1}>รหัสผ่านจะต้องประกอบไปด้วย</Typography> */}
      <Stack>
        <ValidateItem size={size} error={errors.has_length}>
          ความยาวอย่างน้อย 8 ตัวอักษร
        </ValidateItem>
        <ValidateItem size={size} error={errors.has_lowercase}>
          มีตัวอักษรตัวเล็กอย่างน้อย 1 ตัว {`(a-z)`}
        </ValidateItem>
        <ValidateItem size={size} error={errors.has_uppercase}>
          มีตัวอักษรตัวใหญ่อย่างน้อย 1 ตัว {`(A-Z)`}
        </ValidateItem>
        <ValidateItem size={size} error={errors.has_number}>
          มีตัวเลขอย่างน้อย 1 ตัว {`(0-9)`}
        </ValidateItem>
        {/* <ValidateItem error={errors.has_character}>มีอักขระพิเศษอย่างน้อย 1 ตัว {`(@ #)`}</ValidateItem> */}
      </Stack>
    </Box>
  );
}

type ValidateItemProps = {
  error?: boolean;
  children: React.ReactNode;
  size?: 'small' | 'large';
};

function ValidateItem({ error = true, children, size = 'small' }: ValidateItemProps) {
  if (size == 'small') {
    return (
      <Box sx={{ p: 0.25 }}>
        <Box
          sx={{
            bgcolor: (theme) => (error ? grey[50] : green[50]),
            color: (theme) => (error ? grey[600] : theme.palette.success.main),
            px: 1,
          }}
        >
          <Typography variant="caption">{children}</Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        // color: (theme) => (error ? theme.palette.error.main : theme.palette.success.main),
      }}
    >
      {error ? (
        <CloseOutlinedIcon fontSize="inherit" color="error" />
      ) : (
        <CheckOutlinedIcon fontSize="inherit" color="success" />
      )}
      <Typography sx={{ ml: 1 }}>{children}</Typography>
    </Box>
  );
}

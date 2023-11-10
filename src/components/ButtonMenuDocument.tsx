import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Button, Stack, Typography, useTheme } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import * as React from 'react';

type ButtonMenuProps = {
  menuItems: ButtonMenuItem[];
  sx?: any;
};

type ButtonMenuItem = {
  text: string;
  icon?: React.ReactNode;
  onClick: () => void;
};

export default function ButtonMenuDocument({
  sx = { border: '1px solid rgba(51, 51, 51, 0.5)', borderRadius: '4px' },
  ...props
}: ButtonMenuProps) {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickItem = (clickFunction: () => void) => {
    clickFunction();
    handleClose();
  };

  return (
    <div>
      <Button
        variant="outlined"
        color="black80"
        sx={sx}
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography color="black80" variant="body_M">
            แก้ไขลำดับเอกสาร
          </Typography>

          <KeyboardArrowDownIcon />
        </Stack>
      </Button>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
          style: { padding: 0 },
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <Stack
          style={{ marginTop: '12px', marginBottom: '12px' }}
          sx={{
            marginTop: '12px',
            marginBottom: '12px',
            '& li': {
              padding: '4px 12px',
            },
          }}
        >
          {props.menuItems.map((option: ButtonMenuItem) => (
            <MenuItem key={crypto.randomUUID()} onClick={() => handleClickItem(option.onClick)}>
              {option.icon}
              <Typography ml={1.5}>{option.text}</Typography>
            </MenuItem>
          ))}
        </Stack>
      </Menu>
    </div>
  );
}

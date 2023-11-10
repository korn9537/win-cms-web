'use client';

import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import { ButtonBase, ButtonBaseProps, Tooltip, useTheme } from '@mui/material';
import { ColoredIcon, IconDelete, IconEdit } from './Icons';

type TableButtonType = 'delete' | 'view' | 'edit';

type TableButtonProps = {
  icon: TableButtonType;
} & ButtonBaseProps;

export default function TableButton(props: TableButtonProps) {
  const theme = useTheme();

  let iconButton = null;
  let tooltipText = '';
  const iconButtonStyle = { width: 18 };

  switch (props.icon) {
    case 'delete':
      tooltipText = 'ลบ';
      iconButton = (
        <ColoredIcon color={theme.palette.primary[100]}>
          <IconDelete />
        </ColoredIcon>
      );
      break;
    case 'view':
      tooltipText = 'ดูรายละเอียด';
      iconButton = <RemoveRedEyeOutlinedIcon sx={iconButtonStyle} color="primary" />;
      break;
    case 'edit':
      tooltipText = 'แก้ไข';
      iconButton = (
        <ColoredIcon color={theme.palette.primary[100]}>
          <IconEdit />
        </ColoredIcon>
      );
      break;
    default:
      iconButton = null;
      break;
  }

  if (iconButton === null) {
    return null;
  }

  return (
    <Tooltip title={tooltipText} placement="top" arrow>
      <ButtonBase {...props}>{iconButton}</ButtonBase>
    </Tooltip>
  );
}

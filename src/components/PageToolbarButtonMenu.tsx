import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, BoxProps, Button, Stack, Typography } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import * as React from 'react';
import { IconDelete, IconDownload, IconDownloadWithData, IconHistory, IconUpload } from './Icons';

export type PageToolbarActionMenuButtonProps = {
  onDelete?: () => void;
  onHistory?: () => void;
  onExportTemplate?: () => void;
  onExportTemplateWithExample?: () => void;
  onExportData?: () => void;
  onUpload?: () => void;
} & BoxProps;

type ButtonMenu = {
  key: string;
  text: string;
  icon?: React.ReactNode;
  onClick?: () => void;
};

// border: '1px solid #D2D2D2', borderRadius: '4px'

const menus: ButtonMenu[] = [
  {
    key: 'delete',
    text: 'ลบข้อมูล',
    icon: <IconDelete />,
  },
  { key: 'download-template', text: 'ดาวน์โหลดเทมเพลต', icon: <IconDownload /> },
  { key: 'download-template-example', text: 'ดาวน์โหลดเทมเพลตพร้อมตัวอย่าง', icon: <IconDownloadWithData /> },
  { key: 'download-data', text: 'นำออกข้อมูล', icon: <IconUpload /> },
  { key: 'upload', text: 'อัปโหลด', icon: <IconUpload /> },
  { key: 'history', text: 'ประวัติ', icon: <IconHistory /> },
];

export default function PageToolbarActionMenuButton(props: PageToolbarActionMenuButtonProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickItem = (key: string) => {
    switch (key) {
      case 'delete':
        props.onDelete && props.onDelete();
        break;
      case 'history':
        props.onHistory && props.onHistory();
        break;
      case 'download-template':
        props.onExportTemplate && props.onExportTemplate();
        break;
      case 'download-template-example':
        props.onExportTemplateWithExample && props.onExportTemplateWithExample();
        break;
      case 'download-data':
        props.onExportData && props.onExportData();
        break;
      case 'upload':
        props.onUpload && props.onUpload();
        break;
      default:
        break;
    }
    //
    handleClose();
  };

  return (
    <div>
      <Button
        aria-label="more"
        id="page-button"
        aria-controls={open ? 'page-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        sx={{
          minWidth: 'unset',
          p: 1,
        }}
        color="black80"
      >
        <MoreVertIcon />
      </Button>
      <Menu
        id="page-menu"
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          disablePadding: true,
        }}
      >
        {menus.map((option: ButtonMenu) => {
          if (option.key === 'delete' && !props.onDelete) {
            return null;
          }
          if (option.key === 'history' && !props.onHistory) {
            return null;
          }
          if (option.key === 'download-template' && !props.onExportTemplate) {
            return null;
          }
          if (option.key === 'download-template-example' && !props.onExportTemplateWithExample) {
            return null;
          }
          if (option.key === 'download-data' && !props.onExportData) {
            return null;
          }
          if (option.key === 'upload' && !props.onUpload) {
            return null;
          }

          return (
            <MenuItem key={`page-menu-${option.key}`} onClick={() => handleClickItem(option.key)}>
              <Box
                sx={{
                  width: 24,
                  height: 24,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  '& svg': {
                    width: 18,
                    height: 18,
                  },
                }}
              >
                {option.icon}
              </Box>
              <Typography ml={1.5}>{option.text}</Typography>
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
}

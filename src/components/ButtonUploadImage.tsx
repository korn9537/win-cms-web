import { Button, ButtonProps } from '@mui/material';
import { IconUpload } from './Icons';

export default function ButtonUploadImage(props: ButtonProps) {
  const iconSize: string = (props.size == 'small' ? 18 : 22).toString();

  return (
    <Button variant="text" startIcon={<IconUpload width={iconSize} height={iconSize} />} {...props}>
      อัพโหลดรูป
    </Button>
  );
}

'use client';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Button, ButtonProps } from '@mui/material';
import { useRouter } from 'next/navigation';

// type ButtonAddProps = ButtonProps & {
//   href?: string;
// };

export default function ButtonAlt({ variant = 'outlined', ...props }: ButtonProps) {
  const router = useRouter();

  if (props.href) {
    props.onClick = () => {
      router.push(props.href || '#');
    };
  }

  return (
    <Button variant={variant} sx={{ p: 1, minWidth: 0, borderColor: '#D2D2D2' }} {...props}>
      <MoreVertIcon
        sx={{
          width: 24,
          color: '#153F7E',
        }}
      />
    </Button>
  );
}

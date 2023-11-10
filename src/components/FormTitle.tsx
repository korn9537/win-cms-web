import { Stack, Typography } from '@mui/material';
import React from 'react';
import ButtonEdit from './ButtonEdit';
import { SPACING_FORM } from '@/constants/layout.constant';

export type FormTitleProps = {
  onEdit?: () => void;
  onCancel?: () => void;
  mode?: 'edit' | 'view' | string;
  hideButton?: boolean;
  title: string;
  action?: React.ReactNode;
};

export default function FormTitle({ hideButton = false, mode = '', ...props }: FormTitleProps) {
  if (props.action) {
    return <FormTitleBase title={props.title} action={props.action} />;
  }

  let action = null;

  if (!hideButton && mode == 'view') {
    action = <ButtonEdit editMode={false} onClickEditMode={props.onEdit} />;
  }

  if (!hideButton && mode == 'edit') {
    action = <ButtonEdit editMode={true} onClickCancelEditMode={props.onCancel} />;
  }

  return <FormTitleBase title={props.title} action={action} />;
}

export type FormTitleBaseProps = {
  title: string;
  action?: React.ReactNode;
};

export function FormTitleBase(props: FormTitleBaseProps) {
  return (
    <Stack justifyContent={'space-between'} alignItems={'center'} direction={'row'} mb={SPACING_FORM}>
      <Typography variant="title_S">{props.title}</Typography>
      {props.action}
    </Stack>
  );
}

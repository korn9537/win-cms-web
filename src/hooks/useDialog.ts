import { ButtonProps, DialogProps } from "@mui/material";
import React, { useState } from "react";

export type DialogButtonProps = {
  text: string;
} & ButtonProps;

export type UseDialogProps = {
  title: string | null | React.ReactNode;
  content: string | React.ReactNode | null;
  open: boolean;
  loading: boolean;
  error: string | null;
  data: any;
  buttonConfirmProps?: DialogButtonProps;
  buttonCancelProps?: DialogButtonProps;
  buttonPosition?: "left" | "right" | "center";
  onConfirm: (res: any) => void;
  onCancel: () => void;
  DialogProps?: DialogProps;
};

type UseDialogReturn = {
  open: (title?: string | React.ReactNode | null, content?: string | React.ReactNode, data?: any) => void;
  close: () => void;
  showLoading: (loading: boolean) => void;
  showError: (errorMsg: string) => void;
  dialogProps: UseDialogProps;
};

type onConfirm = {
  (data: any, dialog: UseDialogReturn, res: any): void;
};

type onCancel = {
  (data: any, dialog: UseDialogReturn): void;
};

export const useDialog = ({ onConfirm, onCancel }: { onConfirm?: onConfirm; onCancel?: onCancel }): UseDialogReturn => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState<string | null | React.ReactNode>(null);
  const [content, setContent] = useState<string | React.ReactNode | null>(null);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const show = (title?: string | React.ReactNode, content?: string | React.ReactNode, data?: any) => {
    setTitle(title || null);
    setContent(content);
    setData(data);
    setIsOpen(true);
  };

  const hide = () => {
    setIsOpen(false);
    setLoading(false);
    setError(null);
  };

  const showLoading = (loading: boolean) => {
    setLoading(loading);
  };

  const showError = (errorMsg: string) => {
    setError(errorMsg);
  };

  const handleOnConfirm = (res: any) => onConfirm && onConfirm(data, dialog, res);

  const handleOnCancel = () => {
    onCancel && onCancel(data, dialog);
    hide();
  };

  const dialog: UseDialogReturn = {
    open: show,
    close: hide,
    showLoading,
    showError,
    dialogProps: {
      title,
      content,
      open: isOpen,
      loading,
      error,
      data,
      onConfirm: handleOnConfirm,
      onCancel: handleOnCancel
    }
  };

  return dialog;
};

import { UseDialogProps } from '@/hooks/useDialog';
import { useLayoutStore } from '@/stores/layout.store';
import { Box, Grid, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { filesize } from 'filesize';
import _ from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

interface FileItem extends File {
  id: string | undefined;
}

export default function UploadImageDialog({ open, onCancel, onConfirm, loading, ...props }: UseDialogProps) {
  // statics
  const theme = useTheme();

  const showBackdrop = useLayoutStore((state) => state.showBackdrop);

  const is_small_device = useMediaQuery(theme.breakpoints.down('md'), {
    noSsr: true,
  });

  // ref
  const fileUploadRef = useRef<HTMLInputElement>(null);

  // states
  const [fileList, setFileList] = useState<FileItem[]>([]);

  // form
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      document_type: '',
    },
  });

  useEffect(() => {
    if (open) {
      reset();
      setFileList([]);
    }
  }, [open]);

  // query

  // mutations
  const mutation = useMutation({
    mutationFn: async () => {
      const formData = new FormData();
      fileList.forEach((file) => {
        formData.append('file', file);
      });
      const { data } = await axios.post('/images/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          // console.log(
          //   'progress: ',
          //   progressEvent.loaded,
          //   progressEvent.total,
          //   progressEvent.loaded / progressEvent.total,
          // );
        },
      });
      onConfirm({
        id: data.id,
        url: data.url,
      });
    },
    onSuccess: () => {
      setFileList([]);
    },
  });

  useEffect(() => {
    showBackdrop(mutation.isLoading);

    return () => {
      showBackdrop(false);
    };
  }, [mutation.isLoading]);

  // actions
  const handleUploadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files || [];

    if (files?.length === 0) return;

    const list: FileItem[] = [];

    for (let index = 0; index < files.length; index++) {
      const file = files[index] as FileItem;
      file.id = _.uniqueId('upload-');
      list.push(file);
    }

    setFileList([...fileList, ...list]);
  };

  const handleRemoveFile = (id: string | undefined) => {
    const newFileList = fileList.filter((w) => w.id !== id);
    setFileList(newFileList);

    (fileUploadRef.current as HTMLInputElement).value = '';
  };

  const onSubmit = (values: { document_type: string }) => {
    mutation.mutate();
  };

  return (
    <Dialog open={open} onClose={onCancel} fullWidth={true} maxWidth="xs">
      <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)} position={'relative'}>
        <DialogTitle>
          <Typography>อัพโหลดรูป</Typography>
        </DialogTitle>
        <DialogContent sx={{ minHeight: 300 }}>
          <Box>
            <Box mt={2} hidden={fileList.length > 0}>
              <Button variant="outlined" component="label" fullWidth={is_small_device}>
                เลือกไฟล์...
                <input hidden accept="image/*" multiple type="file" onChange={handleUploadChange} ref={fileUploadRef} />
              </Button>
            </Box>
            <Box mt={3}>
              <Stack spacing={1}>
                {fileList.map((file) => (
                  <UploadItem key={file.id} data={file} onClickRemove={() => handleRemoveFile(file.id)} />
                ))}
              </Stack>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          {fileList.length > 0 && (
            <Button variant="contained" fullWidth={is_small_device} type="submit">
              ส่งรูป
            </Button>
          )}
          <Button onClick={onCancel}>ยกเลิก</Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}

function UploadItem({ data, onClickRemove }: { data: FileItem; onClickRemove: () => void }) {
  const { id, name, size } = data;
  data.stream;
  return (
    <Box sx={{ bgcolor: (theme) => theme.palette.grey[50] }}>
      <Grid container alignItems="center">
        <Grid item xs={9} p={1}>
          <Typography noWrap variant="body2">
            {name}
          </Typography>
          <Typography variant="caption" noWrap>
            {filesize(size).toString()}
          </Typography>
        </Grid>
        <Grid item xs={3} textAlign="right" p={1}>
          <Button onClick={onClickRemove}>ลบ</Button>
        </Grid>
      </Grid>
    </Box>
  );
}

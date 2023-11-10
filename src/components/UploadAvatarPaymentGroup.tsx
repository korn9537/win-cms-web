import { Box, Button, ButtonBase, CircularProgress, Stack, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import React, { useRef, useState } from 'react';
import ButtonUploadImage from './ButtonUploadImage';
import { IconBin, IconUpload } from './Icons';

export default function UploadAvatarPaymentGroup({
  src,
  onUpload,
  onDelete,
  icon = null,
  buttonText = '',
  type = 'image',
  folderName = 'images',
  sx,
  editMode = true,
  displayType = 'sale-system',
  ...props
}: {
  src: string;
  onUpload: (data: any) => void;
  onDelete: () => void;
  icon?: React.ReactElement | null;
  buttonText?: string;
  type?: string;
  folderName?: string;
  sx?: any;
  editMode?: boolean;
  displayType?: 'default' | 'sale-system';
}) {
  // state
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const refUpload = useRef<HTMLInputElement>(null);
  // mutate
  const mutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('file', file);

      const { data } = await axios.post('/images/upload', formData, {
        params: {
          folder: folderName,
          type,
        },
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          // console.log(
          //   "progress: ",
          //   progressEvent.loaded,
          //   progressEvent.total,
          //   progressEvent.loaded / progressEvent.total
          // );
        },
      });

      return data;
    },
    onSuccess: (data) => {
      onUpload(data);
    },
  });

  // actions
  const handleUploadChange = (e: any) => {
    const files = e.target.files || [];

    if (files.length > 0) {
      // upload
      const file = files[0] as File;
      mutation.mutate(file);
    }
  };

  const handleRemoveFile = () => {
    onDelete();
  };

  const handleOnDrop = (ev: any) => {
    setIsDragOver(false);

    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();

    let result = null;

    if (ev.dataTransfer.items) {
      // Use DataTransferItemList interface to access the file(s)
      [...ev.dataTransfer.items].forEach((item, i) => {
        // If dropped items aren't files, reject them
        if (item.kind === 'file') {
          const file = item.getAsFile();
          result = file;
          return false;
          //   console.log(`… file[${i}].name = ${file.name}`);
        }
      });
    } else {
      // Use DataTransfer interface to access the file(s)
      [...ev.dataTransfer.files].forEach((file, i) => {
        result = file;
        return false;
        // console.log(`… file[${i}].name = ${file.name}`);
      });
    }

    handleUploadChange({ target: { files: [result] } });
  };

  const handleOnDragOver = (ev: any) => {
    ev.preventDefault();

    setIsDragOver(true);
  };

  const handleOnDragLeave = () => {
    setIsDragOver(false);
  };

  if (displayType == 'sale-system') {
    sx = {
      width: 40,
      height: 40,
      padding: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 1,
      alignSelf: 'stretch',
      borderRadius: '12px',
      border: '1px solid #E8E8E8 !important',
      backgroundColor: '#F8F8F8',

      color: '#A5A5A5',
      textAlign: 'center',
      /* Body/XS/Regular */
      fontFamily: 'Roboto',
      fontSize: '13px',
      fontStyle: 'normal',
      fontWeight: '400',
      lineHeight: '18px' /* 138.462% */,
    };
  }

  if (src && src !== '') {
    return (
      <Stack direction={'row'} spacing={2.5}>
        <Box
          sx={{
            border: '1px solid',
            borderColor: 'grey.400',
            borderRadius: 1,
            // display: "flex",
            // alignItems: "center",
            // justifyContent: "center",
            // flexDirection: "column",
            backgroundImage: `url(${src})`,
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            position: 'relative',
            ...(sx || {}),
          }}
        >
          {/* {editMode && (
            <Tooltip title="เปลี่ยนรูป">
              <ButtonBase
                onClick={handleRemoveFile}
                component="label"
                // sx={{ width: "100%", height: "100%", display: "flex", flexDirection: "column" }}
                sx={{
                  position: 'absolute',
                  top: 4,
                  right: 4,
                  p: 1,
                  minWidth: 0,
                  bgcolor: 'rgba(0,0,0,0.8)',
                  '&:hover': {
                    bgcolor: 'rgba(0,0,0,0.5)',
                  },
                  color: 'white',
                }}
              >
                <RestartAlt
                  style={{ color: 'white' }}
                  //color="white"
                />
              </ButtonBase>
            </Tooltip>
          )} */}
        </Box>
        <input hidden accept="image/*" type="file" ref={refUpload} onChange={handleUploadChange} disabled={!editMode} />
        {editMode && (
          <Button
            variant="text"
            startIcon={<IconUpload width="18" height="18" />}
            onClick={() => (refUpload.current as HTMLInputElement).click()}
            {...props}
            sx={{ textWrap: 'nowrap' }}
            disabled={mutation.isLoading}
            size="small"
          >
            แก้ไขรูป
          </Button>
        )}
        {editMode && (
          <Button
            variant="text"
            startIcon={<IconBin width="18" height="18" />}
            onClick={handleRemoveFile}
            {...props}
            sx={{ textWrap: 'nowrap' }}
            disabled={mutation.isLoading}
            size="small"
          >
            ลบ
          </Button>
        )}

        {mutation.isLoading && (
          <Stack justifyContent={'center'}>
            <CircularProgress color="inherit" size={'18px'} />
          </Stack>
        )}
      </Stack>
    );
  }

  return (
    <Stack flexDirection={'row'} spacing={2.5} alignItems={'center'}>
      <Box
        onDrop={handleOnDrop}
        onDragOver={handleOnDragOver}
        onDragLeave={handleOnDragLeave}
        {...props}
        sx={{
          border: '1px dashed',
          borderColor: isDragOver ? 'primary.main' : 'grey.400',
          borderRadius: 1,
          // padding: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          // ...(src && { backgroundImage: `url(${src})`, backgroundSize: "cover", backgroundPosition: "center" }),
          ...(sx || {}),
        }}
      >
        {/* <Typography gutterBottom>
        Drag one or more files to this <i>drop zone</i>.
      </Typography> */}
        <ButtonBase component="label" sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
          {icon}
          {icon && buttonText && <Box sx={{ mb: 1 }}></Box>}
          {buttonText && (
            <Typography component="span" variant="body_XS">
              {buttonText}
            </Typography>
          )}
          <input
            hidden
            accept="image/*"
            type="file"
            ref={refUpload}
            onChange={handleUploadChange}
            disabled={!editMode}
          />
        </ButtonBase>
      </Box>
      {editMode && (
        <Box>
          <ButtonUploadImage
            onClick={() => (refUpload.current as HTMLInputElement).click()}
            sx={{ textWrap: 'nowrap' }}
            disabled={mutation.isLoading}
            size="small"
          />
        </Box>
      )}
      {mutation.isLoading && (
        <Box
          sx={{ width: '200px', display: 'flex', flexDirection: 'column', alignContent: 'center', flexBasis: '20px' }}
        >
          <CircularProgress color="inherit" size={'18px'} />
        </Box>
      )}
    </Stack>
  );
}

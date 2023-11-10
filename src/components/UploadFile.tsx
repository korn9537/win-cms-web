import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import { Box, Button, ButtonBase, Stack, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React, { useRef, useState } from "react";
import { IconFile } from "./Icons";

export default function UploadFile({
  src = null,
  onUpload,
  onDelete,
  icon = null,
  label = "อัพโหลด..",
  buttonText = "เลือกรูป...",
  type = "image",
  folderName = "images",
  sx,
  editMode = true,
  displayType = "sale-system",
  onDownloadClick = undefined,
  ...props
}: {
  src: null | { file_url: string; file_name: string };
  onUpload: (data: any) => void;
  onDelete: () => void;
  icon?: React.ReactElement | null;
  buttonText?: string;
  label?: string;
  type?: string;
  folderName?: string;
  sx?: any;
  editMode?: boolean;
  displayType?: "default" | "sale-system";
  onDownloadClick?: () => void | undefined;
}) {
  // state
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const refUpload = useRef<HTMLInputElement>(null);
  // mutate
  const mutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);

      const { data } = await axios.post("/files/upload", formData, {
        params: {
          folder: folderName,
          type
        },
        headers: {
          "Content-Type": "multipart/form-data"
        },
        onUploadProgress: (progressEvent) => {
          // console.log(
          //   "progress: ",
          //   progressEvent.loaded,
          //   progressEvent.total,
          //   progressEvent.loaded / progressEvent.total
          // );
        }
      });

      return data;
    },
    onSuccess: (data) => {
      onUpload(data);
    }
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
        if (item.kind === "file") {
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

  if (displayType == "sale-system") {
    sx = {
      mt: "8px",
      width: 1,
      height: 200,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      gap: 1,
      alignSelf: "stretch",
      borderRadius: "12px",
      border: "1px solid #E8E8E8 !important",
      backgroundColor: "#F8F8F8",

      color: "#A5A5A5",
      textAlign: "center",
      /* Body/M/Regular */
      fontFamily: "Roboto",
      fontSize: "15px",
      fontStyle: "normal",
      fontWeight: "400",
      lineHeight: "24px" /* 160% */
    };
  }

  if (src != null) {
    //if (true) {
    return (
      <>
        <Box
          sx={{
            mt: "24px",
            width: 1,
            height: 40,
            gap: "20px"
            // border: '1px solid',
            // borderColor: 'grey.400',
            // borderRadius: 1,
            // // display: "flex",
            // // alignItems: "center",
            // // justifyContent: "center",
            // // flexDirection: "column",
            // backgroundImage: `url(${src})`,
            // backgroundSize: 'contain',
            // backgroundPosition: 'center',
            // backgroundRepeat: 'no-repeat',
            // position: 'relative',
            // ...(sx || {}),
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
          <Stack flexDirection={"row"} spacing={"20px"} alignItems={"center"}>
            <Box
              sx={{
                width: "100%",
                height: 40,
                borderRadius: "12px",
                border: "1px solid ##E3EFFF !important",
                backgroundColor: "#E3EFFF",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "strat",
                padding: "8px 12px",
                alignSelf: "stretch",
                gap: 1
              }}
            >
              <Stack flexDirection={"row"} spacing={"12px"} alignItems={"center"}>
                <IconFile />
                <Typography component="span" variant="body_M">
                  {src.file_name}
                </Typography>
              </Stack>
            </Box>
            <Box
              sx={{
                width: "5%",
                height: 40,
                borderRadius: "12px",
                border: "1px solid ##E3EFFF !important",
                backgroundColor: "#E3EFFF",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: "8px 12px",
                alignSelf: "stretch",
                gap: 1
              }}
            >
              {/* {editMode && ( */}
              <Button
                variant="text"
                onClick={() => {
                  // (refUpload.current as HTMLInputElement).click()

                  if (onDownloadClick) {
                    onDownloadClick();
                  }
                }}
                {...props}
              >
                <RemoveRedEyeOutlinedIcon />
              </Button>
              {/* )} */}
            </Box>
            {editMode && (
              <Box
                sx={{
                  width: "5%",
                  height: 40,
                  borderRadius: "12px",
                  border: "1px solid ##E3EFFF !important",
                  backgroundColor: "#E3EFFF",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "8px 12px",
                  alignSelf: "stretch",
                  gap: 1
                }}
              >
                <Button variant="text" onClick={handleRemoveFile} {...props}>
                  <Box component={"img"} src="/icons/Delete.png" width={"24px"} height={"24px"} />
                </Button>
              </Box>
            )}
          </Stack>
        </Box>
        <input hidden accept="*" type="file" ref={refUpload} onChange={handleUploadChange} disabled={!editMode} />
        {/* <Box>
          {editMode && (
            <Button
              variant="text"
              startIcon={<Box component={'img'} src="/icons/Upload.png" width={'30px'} height={'30px'} />}
              onClick={() => (refUpload.current as HTMLInputElement).click()}
              {...props}
            >
              แก้ไขรูป
            </Button>
          )}
        </Box> */}
        {/* <Box>
          {editMode && (
            <Button
              variant="text"
              startIcon={<Box component={'img'} src="/icons/Delete.png" width={'24px'} height={'24px'} />}
              onClick={handleRemoveFile}
              {...props}
            >
              ลบ
            </Button>
          )}
        </Box> */}
      </>
    );
  }

  return (
    <Stack flexDirection={"row"} spacing={2.5} alignItems={"center"}>
      <Box
        onDrop={handleOnDrop}
        onDragOver={handleOnDragOver}
        onDragLeave={handleOnDragLeave}
        {...props}
        sx={{
          border: "1px dashed",
          borderColor: isDragOver ? "primary.main" : "grey.400",
          borderRadius: 1,
          // padding: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          // ...(src && { backgroundImage: `url(${src})`, backgroundSize: "cover", backgroundPosition: "center" }),
          ...(sx || {})
        }}
      >
        {/* <Typography gutterBottom>
        Drag one or more files to this <i>drop zone</i>.
      </Typography> */}
        <ButtonBase component="label" sx={{ width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
          {icon}
          {icon && label && buttonText && <Box sx={{ mb: "12px" }}></Box>}
          {label && (
            <Typography component="span" variant="body_L" sx={{ color: "#333333" }}>
              {label}
            </Typography>
          )}
          {buttonText && (
            <Typography component="span" variant="body_M">
              {buttonText}
            </Typography>
          )}
          <input hidden accept="*" type="file" ref={refUpload} onChange={handleUploadChange} disabled={!editMode} />
        </ButtonBase>
      </Box>
      {/* <Box>{editMode && <ButtonUploadImage onClick={() => (refUpload.current as HTMLInputElement).click()} />}</Box> */}
    </Stack>
  );
}

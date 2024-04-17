"use client";

import {
  Box,
  Button,
  ButtonBase,
  ButtonProps,
  CircularProgress,
  Dialog,
  DialogProps,
  Stack,
  SxProps,
  Theme,
  Typography,
  styled,
  useTheme
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React, { useRef, useState } from "react";
import { IconBin, IconImage, IconUpload, IconView } from "./Icons";
import Image from "next/image";
import ButtonCloseDialog from "./dialogs/ButtonCloseDialog";
import _ from "lodash";

type UploadImageProps = {
  src: string;
  onUpload: (data: any) => void;
  onDelete: () => void;
  uploadText?: string;
  editText?: string;
  deleteText?: string;
  placeholderIcon?: React.ReactElement | string;
  placeholderText?: string;
  type?: string;
  folderName?: string;
  disabled?: boolean;
  buttonProps?: ButtonProps;
  size?: "small" | "medium";
};

const SIZE_SM = 40;
const SIZE_MD = 120;
const BORDER_RADIUS_SM = 2;
const BORDER_RADIUS_MD = 12;

export default function UploadImage({
  src,
  onUpload,
  onDelete,
  uploadText = "อัพโหลดรูป",
  editText = "แก้ไขรูป",
  deleteText = "ลบ",
  placeholderIcon = <IconImage />,
  placeholderText = "ยังไม่มีรูปภาพ",
  type = "image",
  folderName = "images",
  disabled = false,
  size = "medium"
}: UploadImageProps) {
  // statics
  const theme = useTheme();

  let imageSx: SxProps<Theme> = {
    width: size == "medium" ? SIZE_MD : SIZE_SM,
    height: size == "medium" ? SIZE_MD : SIZE_SM,
    borderRadius: size == "medium" ? BORDER_RADIUS_MD + "px" : BORDER_RADIUS_SM + "px"
  };

  // state
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const refUpload = useRef<HTMLInputElement>(null);
  const [openLightBox, setOpenLightBox] = useState<boolean>(false);
  const [lightBoxImages, setLightBoxImages] = useState<any[]>([]);

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
        }
      });
    } else {
      // Use DataTransfer interface to access the file(s)
      [...ev.dataTransfer.files].forEach((file, i) => {
        result = file;
        return false;
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

  const renderActions = () => {
    if (disabled) {
      return null;
    }

    if (mutation.isPending) {
      return <CircularProgress color="primary" size={18} />;
    }

    if (src && src !== "") {
      // มีรูปแล้ว
      return (
        <>
          <Box display="flex" alignItems="center" gap={2.5}>
            <StyledButton
              variant="text"
              startIcon={<IconUpload width="18" height="18" />}
              onClick={() => (refUpload.current as HTMLInputElement).click()}
              sx={{ fontWeight: 400 }}
            >
              {editText}
            </StyledButton>
            <StyledButton
              variant="text"
              startIcon={<IconBin width="18" height="18" />}
              onClick={handleRemoveFile}
              sx={{ fontWeight: 400 }}
            >
              {deleteText}
            </StyledButton>
          </Box>
          <LightBoxDialog open={openLightBox} onClose={() => setOpenLightBox(false)} images={lightBoxImages} />
        </>
      );
    }

    // ยังไม่เคยมี
    return (
      <StyledButton
        variant="text"
        startIcon={<IconUpload width="18" height="18" />}
        onClick={() => (refUpload.current as HTMLInputElement).click()}
        sx={{ fontWeight: 400 }}
      >
        {uploadText}
      </StyledButton>
    );
  };

  if (src && src !== "") {
    return (
      <>
        <Box display="flex" gap={2.5} alignItems={"center"}>
          <ImageBox
            sx={{
              backgroundImage: `url(${src})`,
              ":hover > div": {
                opacity: 1,
                visibility: "visible"
              },
              ...(imageSx || {})
            }}
            onClick={() => {
              setLightBoxImages([
                {
                  id: _.uniqueId("image-"),
                  src: src
                }
              ]);
              setOpenLightBox(true);
            }}
          >
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                bgcolor: "rgba(0,0,0,0.67)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                transition: "all 0.2s ease",
                opacity: 0,
                visibility: "hidden"
              }}
            >
              <Stack
                sx={{
                  color: "white"
                }}
                direction="row"
                alignItems="center"
                spacing={1}
              >
                <IconView />
                {size == "medium" && <Typography>ดูรูปภาพ</Typography>}
              </Stack>
            </Box>
          </ImageBox>
          {renderActions()}
        </Box>
        <input
          style={{
            display: "none"
          }}
          hidden
          accept="image/*"
          type="file"
          ref={refUpload}
          onChange={handleUploadChange}
          disabled={disabled}
        />
      </>
    );
  }

  return (
    <>
      <Stack flexDirection={"row"} spacing={2.5} alignItems={"center"}>
        <ImageBox
          onDrop={handleOnDrop}
          onDragOver={handleOnDragOver}
          onDragLeave={handleOnDragLeave}
          sx={{
            borderColor: isDragOver ? "primary.main" : theme.palette.neutralGray[20],
            ":hover": {
              borderColor: "primary.20"
            },
            ...(imageSx || {})
          }}
        >
          <ButtonBase
            component="label"
            sx={{ width: "100%", height: "100%", display: "flex", flexDirection: "column" }}
            onClick={() => (refUpload.current as HTMLInputElement).click()}
            disabled={disabled || mutation.isPending}
          >
            {placeholderIcon}
            {size == "medium" && placeholderText && (
              <Typography component="span" variant="body_XS" mt={placeholderIcon ? 1 : 0}>
                {placeholderText}
              </Typography>
            )}
          </ButtonBase>
        </ImageBox>
        {renderActions()}
      </Stack>
      <input hidden accept="image/*" type="file" ref={refUpload} onChange={handleUploadChange} disabled={disabled} />
    </>
  );
}

const ImageBox = styled(Box)(({ theme }) => ({
  backgroundSize: "contain",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  position: "relative",
  //
  // width: 120,
  // height: 120,
  overflow: "hidden",
  //
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  alignSelf: "stretch",
  //
  border: `1px solid ${theme.palette.neutralGray[20]}`,
  // borderRadius: "12px",
  backgroundColor: theme.palette.neutralGray[10],
  color: theme.palette.neutralGray[80],
  //
  textAlign: "center",
  ...theme.typography.body_XS
}));

const StyledButton = styled(Button)(({ theme }) => ({
  minWidth: "auto",
  padding: "0px",
  backgroundColor: "transparent !important"
}));

type LightBoxDialogProps = {
  images?: { id: string; src: string }[];
} & DialogProps;

function LightBoxDialog(props: LightBoxDialogProps) {
  return (
    <Dialog fullWidth maxWidth="lg" scroll="body" PaperComponent={Box} {...props}>
      <Stack
        sx={{
          width: "100%"
        }}
        spacing={2}
        direction="column"
        alignItems="center"
      >
        {props.images?.map((item, index) => {
          return (
            <img
              key={`gallary-${item.id}`}
              alt=""
              src={item.src}
              style={{
                maxWidth: "100%",
                height: "auto"
              }}
            />
          );
        })}
      </Stack>
    </Dialog>
  );
}

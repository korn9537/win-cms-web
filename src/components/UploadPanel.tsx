import { AddOutlined, DeleteOutline, RemoveRedEyeOutlined } from "@mui/icons-material";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { filesize } from "filesize";
import { useRef, useState } from "react";
import { IconCloud, IconFile } from "./Icons";

// const initialState = {};

// const reducer = (state = initialState, action: { payload: any }) => {};

type UploadPanelProps = {
  multiple?: boolean;
  maxFiles?: number;
  accept?: string;
  type?: string; // image
  folderName?: string; // images
  disabled?: boolean;
  files?: UploadFileData[];
  // onUpload?: (data: UploadFileData, files: UploadFileData[]) => void;
  // onDelete?: (id: string, files: UploadFileData[]) => void;
  onChange?: (files: UploadFileData[]) => void;
  // onDownload?: () => void;
};

export type UploadFileData = {
  id: string;
  file_name: string;
  file_size: number;
  file_type: string;
  url: string;
};

export default function UploadPanel({ type = "image", folderName = "images", ...props }: UploadPanelProps) {
  // state
  const [isDragOver, setIsDragOver] = useState<boolean>(false);

  // refs
  const refUpload = useRef<HTMLInputElement>(null);

  //
  const [fileList, setFileList] = useState<UploadFileData[]>([]);

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
    onSuccess(data: UploadFileData, variables, context) {
      setFileList((prev) => [...prev, data]);
      //
      // props.onUpload?.(data, [...fileList, data]);
      props.onChange?.([...fileList, data]);
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

  const handleRemoveFile = (id: string) => {
    const filtered = fileList.filter((file) => file.id !== id);
    //
    setFileList(filtered);
    //
    // props.onDelete?.(id, filtered);
    props.onChange?.(filtered);
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

  const handleClickView = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <Box>
      {fileList.length == 0 && (
        <Box
          onDrop={handleOnDrop}
          onDragOver={handleOnDragOver}
          onDragLeave={handleOnDragLeave}
          onClick={() => refUpload.current?.click()}
          sx={{
            border: "1px dashed",
            borderColor: isDragOver ? "primary.main" : "black.80",
            borderRadius: "12px",
            bgcolor: "neutralGray.10",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            minHeight: 200,
            cursor: "pointer",
            "&:hover": {
              borderColor: "black.80"
            }
          }}
        >
          <Box
            sx={{
              textAlign: "center"
            }}
          >
            <IconCloud />
            <Typography variant="body_L_B" display="block" mt={1.5} mb={0.5}>
              อัพโหลดไฟล์
            </Typography>
            <Typography variant="body_M" display="block" color="neutralGray.main">
              ขนาดไฟล์ไม่เกิน 30 MB
            </Typography>
          </Box>
        </Box>
      )}
      {fileList.length > 0 && (
        <Box>
          <Stack spacing={1.5}>
            {fileList.map((file: UploadFileData, index) => {
              return (
                <Stack key={file.id} direction="row" alignItems="center" spacing={1.5}>
                  <Box
                    flex={1}
                    sx={{
                      bgcolor: (theme) => theme.palette.softBlue[20],
                      px: 1.5,
                      py: 1,
                      borderRadius: "8px"
                    }}
                  >
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      <Stack alignItems="center" direction="row" spacing={1.5}>
                        <IconFile />
                        <Typography>{file.file_name}</Typography>
                      </Stack>
                      <Typography>{filesize(file.file_size)}</Typography>
                    </Stack>
                  </Box>
                  <Box>
                    <IconButton onClick={() => handleClickView(file.url)}>
                      <RemoveRedEyeOutlined />
                    </IconButton>
                  </Box>
                  <Box>
                    <IconButton onClick={() => handleRemoveFile(file.id)}>
                      <DeleteOutline />
                    </IconButton>
                  </Box>
                  <Box>
                    <IconButton
                      color="primary"
                      onClick={() => refUpload.current?.click()}
                      sx={{
                        visibility: index == fileList.length - 1 ? "visible" : "hidden"
                      }}
                    >
                      <AddOutlined />
                    </IconButton>
                  </Box>
                </Stack>
              );
            })}
          </Stack>
        </Box>
      )}
      <input
        hidden
        accept={props.accept || "*"}
        type="file"
        ref={refUpload}
        onChange={handleUploadChange}
        multiple={props.multiple || false}
      />
    </Box>
  );
}

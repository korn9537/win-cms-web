import { AddOutlined, DeleteOutline, RemoveRedEyeOutlined } from "@mui/icons-material";
import { Box, CircularProgress, IconButton, Stack, Typography } from "@mui/material";
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
  onChange?: (files: UploadFileData[]) => void;
  onUpload?: (file: UploadFileData) => void;
  onDelete?: (file: UploadFileData) => void;
  onDownload?: (file: UploadFileData) => void;
  maxFileSize?: number; // MB - ขนาดไฟล์ไม่เกิน 10 MB
  // maxTotalSize?: number; // MB - ขนาดไฟล์รวมไม่เกิน 30 MB
  onError?: (errors: string[]) => void;
};

export type UploadFileData = {
  id: string;
  file_name: string;
  file_size: number;
  file_type: string;
  url: string;
};

export default function UploadPanel({
  type = "image",
  folderName = "images",
  maxFileSize = 10,
  ...props
}: UploadPanelProps) {
  // statics

  // state
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

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
          if (progressEvent && progressEvent.loaded && progressEvent.total) {
            setUploadProgress((progressEvent.loaded / progressEvent.total) * 100);
          }
        }
      });

      return data;
    }
    // onSuccess(data: UploadFileData, variables, context) {
    //   setFileList((prev) => [...prev, data]);
    //   //
    //   // props.onUpload?.(data, [...fileList, data]);
    //   props.onChange?.([...fileList, data]);
    // }
  });

  // actions
  const processFiles = async (files: File[]) => {
    setIsUploading(true);

    let dataList: UploadFileData[] = [];
    let errors: string[] = [];

    // upload
    for (let index = 0; index < files.length; index++) {
      const file = files[index] as File;

      if (file.size > maxFileSize * 1000 * 1000) {
        errors.push(`${file.name}: ขนาดไฟล์เกิน ${filesize(maxFileSize * 1000 * 1000)}`);
        continue;
      }

      // const file = files[0] as File;
      const data: UploadFileData = await mutation.mutateAsync(file);
      dataList.push(data);
    }

    // errors
    if (errors.length > 0) {
      props.onError?.(errors);
    }

    //
    const list = [...fileList, ...dataList];
    // set state
    setFileList(list);
    setIsUploading(false);
    // callbacks
    props.onChange?.(list);
  };

  const handleUploadChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let files: File[] = [];

    const fileList = e.target.files;

    if (fileList) {
      for (let index = 0; index < fileList.length; index++) {
        files.push(fileList[index] as File);
      }
    }

    processFiles(files);

    // reset
    e.target.value = "";
  };

  const handleRemoveFile = (id: string) => {
    const select = fileList.find((file) => file.id === id);
    const filtered = fileList.filter((file) => file.id !== id);
    //
    setFileList(filtered);
    //
    select && props.onDelete?.(select);
    props.onChange?.(filtered);
  };

  const handleOnDrop = (ev: React.DragEvent) => {
    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();

    setIsDragOver(false);

    let files: File[] = [];
    if (ev.dataTransfer.items) {
      for (let index = 0; index < ev.dataTransfer.items.length; index++) {
        const dataTransferItem = ev.dataTransfer.items[index];
        if (dataTransferItem.kind === "file") {
          files.push(dataTransferItem.getAsFile() as File);
        }
      }
    } else {
      // // Use DataTransfer interface to access the file(s)
      // [...ev.dataTransfer.files].forEach((file, i) => {
      //   result = file;
      //   return false;
      //   // console.log(`… file[${i}].name = ${file.name}`);
      // });
    }

    processFiles(files);
  };

  const handleOnDragOver = (ev: React.DragEvent) => {
    ev.preventDefault();
    setIsDragOver(true);
  };

  const handleOnDragLeave = (ev: React.DragEvent) => {
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
            {isUploading ? (
              <>
                <CircularProgress />
                <Typography variant="body_L_B" display="block" mt={1.5} mb={0.5}>
                  กำลังอัปโหลด...
                </Typography>
              </>
            ) : (
              <>
                <IconCloud />
                <Typography variant="body_L_B" display="block" mt={1.5} mb={0.5}>
                  อัพโหลดไฟล์
                </Typography>
                {maxFileSize && (
                  <Typography variant="body_M" display="block" color="neutralGray.main">
                    ขนาดไฟล์ไม่เกิน {filesize(maxFileSize * 1000 * 1000)}
                  </Typography>
                )}
              </>
            )}
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
                    {/* {isUploading && uploadProgress > 0 && (
                      <Typography variant="body_M" color="black.60">
                        {uploadProgress.toFixed(0)}%
                      </Typography>
                    )} */}
                    {isUploading && index == fileList.length - 1 ? (
                      <CircularProgress size="20px" />
                    ) : (
                      <IconButton
                        color="primary"
                        onClick={() => refUpload.current?.click()}
                        sx={{
                          visibility: index == fileList.length - 1 ? "visible" : "hidden"
                        }}
                      >
                        <AddOutlined />
                      </IconButton>
                    )}
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

import { Box, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRef, useState } from "react";
import { IconCloud } from "./Icons";

const initialState = {};

const reducer = (state = initialState, action: { payload: any }) => {};

type UploadPanelProps = {
  multiple?: boolean;
  maxFiles?: number;
  accept?: string;
  type?: string; // image
  folderName?: string; // images
  disabled?: boolean;
  files?: any[];
  onUpload?: (data: any, files: any[]) => void;
  onDelete?: (data: any, files: any[]) => void;
  onDownload?: () => void;
};

export default function UploadPanel({ type = "image", folderName = "images", ...props }: UploadPanelProps) {
  // state
  const [isDragOver, setIsDragOver] = useState<boolean>(false);

  // refs
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
      // onUpload(data);
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
    // onDelete();
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

  return (
    <Box>
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

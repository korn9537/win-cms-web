import ButtonAdd from "@/components/ButtonAdd";
import TableButton from "@/components/TableButton";
import { TABLE_COLUMN_SIZE } from "@/constants/content.constant";
import { deletePageEntity, getPageEntities } from "@/services/graphql/permission.service";
import {
  Box,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useCallback, useEffect } from "react";
import CreatePageEntityDialog, { useDialogCreatePageEntity } from "./CreatePageEntityDialog";
import { PermissionEntityModel } from "@/services/graphql/models/permission.model";
import { useDialog } from "@/hooks/useDialog";
import DeleteDialog from "@/components/dialogs/DeleteDialog";

type PermissionPanelProps = {
  pageId: string;
};

export default function PermissionPanel(props: PermissionPanelProps) {
  // statics

  const dialogCreate = useDialogCreatePageEntity({
    onConfirm(data, dialog, res) {
      refetch();
      dialog.close();
    },
    onCancel(data, dialog) {}
  });

  const dialogDelete = useDialog<any, any>({
    onConfirm(data, dialog) {
      mutateDelete.mutate(data.node.id);
      //
      dialog.close();
    },
    onCancel(data, dialog) {}
  });

  // queries
  const { refetch, data, isLoading } = useQuery({
    queryKey: ["permission-entity", props.pageId],
    queryFn: () => {
      return getPageEntities(props.pageId);
    },
    enabled: false
  });

  useEffect(() => {
    if (props.pageId) {
      refetch();
    }
  }, [props.pageId]);

  // mutations
  const mutateDelete = useMutation({
    mutationFn: (id: string) => {
      return deletePageEntity(id);
    },
    onSuccess() {
      refetch();
    }
  });

  // actions
  const handleClickAdd = useCallback(() => {
    dialogCreate.open("เพิ่มข้อมูล", null, {
      action: "add",
      page_id: props.pageId || "",
      node: null
    });
  }, [props.pageId]);

  const handleClickEdit = useCallback(
    (data: PermissionEntityModel) => {
      dialogCreate.open("แก้ไขข้อมูล", null, {
        action: "edit",
        page_id: props.pageId || "",
        node: data
      });
    },
    [props.pageId]
  );

  const handleClickDelete = useCallback(
    (data: PermissionEntityModel) => {
      dialogDelete.open("ลบข้อมูล", null, {
        action: "delete",
        page_id: props.pageId || "",
        node: data
      });
    },
    [props.pageId]
  );

  if (!props.pageId) {
    return <Box>ไม่มีข้อมูล</Box>;
  }

  return (
    <Box>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="body_L_B" display="block">
          สิทธิ์การใช้งานในหน้า
        </Typography>
        <ButtonAdd variant="text" onClick={handleClickAdd} />
      </Stack>
      {isLoading && <Box>Loading...</Box>}
      {!isLoading && data && data.length == 0 && <Box>ไม่มีข้อมูล</Box>}
      {!isLoading && data && data.length > 0 && (
        <TableContainer>
          <Table
            sx={{
              "& .actions": {
                visibility: "hidden"
              },
              "&:hover": {
                "& .actions": {
                  visibility: "visible"
                }
              }
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell>สิทธิ์</TableCell>
                <TableCell width={TABLE_COLUMN_SIZE.ACTION_2}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name_th}</TableCell>
                  <TableCell>
                    {item.page_id && (
                      <Stack direction="row" justifyContent="end" spacing={2} className="actions">
                        <TableButton icon="edit" onClick={() => handleClickEdit(item)} />
                        <TableButton icon="delete" onClick={() => handleClickDelete(item)} />
                      </Stack>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {/*  */}
      <CreatePageEntityDialog {...dialogCreate.dialogProps} />
      <DeleteDialog {...dialogDelete.dialogProps} />
    </Box>
  );
}

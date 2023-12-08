import ButtonAdd from "@/components/ButtonAdd";
import EmptyDataPanel from "@/components/EmptyDataPanel";
import TableButton from "@/components/TableButton";
import DeleteDialog from "@/components/dialogs/DeleteDialog";
import { TABLE_COLUMN_SIZE } from "@/constants/content.constant";
import { SPACING_FORM } from "@/constants/layout.constant";
import { useDialog } from "@/hooks/useDialog";
import { deleteMasterRole, getMasterRoles } from "@/services/graphql/masters/master-role.service";
import { RoleModel } from "@/services/graphql/models/role.model";
import { useLayoutStore } from "@/stores/layout.store";
import {
  Box,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import CreateRoleDialog from "./CreateRoleDialog";
import { MouseEventHandler, ReactEventHandler, useState } from "react";

type PanelRoleListProps = {
  onSelect: (id: string) => void;
};

export function PanelRoleList(props: PanelRoleListProps) {
  // statics
  const theme = useTheme();

  const { showToast } = useLayoutStore((state) => ({
    showToast: state.showToast
  }));

  const dialogCreateRole = useDialog({
    onConfirm: async (data, dialog, res) => {
      dialog.close();
      //
      refetch();
    },
    onCancel(data, dialog) {
      dialog.close();
    }
  });

  const dialogDeleteRole = useDialog({
    onConfirm: async (data, dialog, res) => {
      //
      dialog.showLoading(true);
      await mutateDelete.mutateAsync(data.node.id);
      //
      dialog.close();
      //
      showToast("success", 'ลบกลุ่มตำแหน่ง "' + data.node.name_th + '" สำเร็จ');
      //
      refetch();
      //
      if (data.node.id == selectedRoleId) {
        props.onSelect("");
      }
    },
    onCancel(data, dialog) {
      dialog.close();
    }
  });

  // states
  const [selectedRoleId, setSelectedRoleId] = useState<string>("");

  // query
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["master-roles"],
    queryFn: async () => {
      return getMasterRoles();
    },
    initialData: []
  });

  // mutations
  const mutateDelete = useMutation({
    mutationFn: async (id: string) => {
      return deleteMasterRole(id);
    }
  });

  // actions
  const handleClickAdd = () => {
    dialogCreateRole.open("เพิ่มกลุ่มตำแหน่ง", null, {
      action: "add"
    });
  };

  const handleClickEdit = (item: RoleModel) => (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    dialogCreateRole.open("แก้ไขกลุ่มตำแหน่ง", null, {
      action: "edit",
      node: item
    });
  };

  const handleClickDelete = (item: RoleModel) => (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    dialogDeleteRole.open("ลบกลุ่มตำแหน่ง", null, {
      action: "delete",
      node: item
    });
  };

  const handleRowClick = (item: RoleModel) => () => {
    setSelectedRoleId(item.id);
    props.onSelect(item.id);
  };

  return (
    // <Box minHeight="calc(100vh - 260px)">
    <Box minHeight={640}>
      <Box mb={2}>
        <Stack direction="row" spacing={1} justifyContent="space-between" alignItems="center">
          <Typography variant="title_S">กลุ่มตำแหน่ง</Typography>
          <ButtonAdd variant="text" text="เพิ่มกลุ่มตำแหน่ง" onClick={handleClickAdd} />
        </Stack>
      </Box>
      <Box>
        {data && data.length == 0 && <EmptyDataPanel />}
        {data && data.length > 0 && (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell width={150}>รหัส</TableCell>
                  <TableCell>ชื่อกลุ่มตำแหน่ง</TableCell>
                  <TableCell width={TABLE_COLUMN_SIZE.ACTION_2}></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((item) => (
                  <TableRow
                    key={item.id}
                    onClick={handleRowClick(item)}
                    sx={{
                      cursor: "pointer",
                      "&:hover": {
                        bgcolor: theme.palette.softBlue[10]
                      },
                      ...(selectedRoleId == item.id && {
                        bgcolor: theme.palette.softBlue[20]
                      })
                    }}
                  >
                    <TableCell>{item.code}</TableCell>
                    <TableCell>{item.name_th}</TableCell>
                    <TableCell align="right">
                      <TableButton icon="edit" onClick={handleClickEdit(item)} />
                      <TableButton
                        icon="delete"
                        onClick={handleClickDelete(item)}
                        sx={{
                          ml: SPACING_FORM
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
      {/*  */}
      <CreateRoleDialog {...dialogCreateRole.dialogProps} />
      <DeleteDialog {...dialogDeleteRole.dialogProps} />
    </Box>
  );
}

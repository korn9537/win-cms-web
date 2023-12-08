import ButtonAdd from "@/components/ButtonAdd";
import EmptyDataPanel from "@/components/EmptyDataPanel";
import TableButton from "@/components/TableButton";
import { useDialog } from "@/hooks/useDialog";
import { addUsersToRole, getUsersInRole, removeUserFromRole } from "@/services/graphql/masters/master-role.service";
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
  Typography
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import SelectUserDialog from "../../components/SelectUserDialog";

type PanelRoleUsersProps = {
  roleId?: string;
};

export function PanelRoleUsers(props: PanelRoleUsersProps) {
  // statics
  const { showToast } = useLayoutStore((state) => ({
    showToast: state.showToast
  }));

  const dialogSelectUser = useDialog({
    onConfirm: async (data, dialog, res) => {
      try {
        await mutateSaveUser.mutateAsync(res);
        //
        dialog.close();
        //
        refetch();
      } catch (error: any) {
        showToast("error", error.response?.data?.message);
      }
    },
    onCancel(data, dialog) {
      dialog.close();
    }
  });

  // query
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["role-users", props.roleId],
    queryFn: async () => {
      return getUsersInRole(props.roleId || "");
    },
    enabled: props.roleId != null && props.roleId != ""
  });

  // mutations
  const mutateSaveUser = useMutation({
    mutationFn: async (users: string[]) => {
      return addUsersToRole(props.roleId || "", users);
    }
  });

  const mutateDeleteUser = useMutation({
    mutationFn: async (userId: string) => {
      return removeUserFromRole(props.roleId || "", userId);
    }
  });

  // actions
  const handleClickAdd = () => {
    dialogSelectUser.open();
  };

  const handleClickDelete = async (userId: string) => {
    try {
      await mutateDeleteUser.mutateAsync(userId);
      //
      refetch();
    } catch (error: any) {
      showToast("error", error.response?.data?.message);
    }
  };

  if (props.roleId == null || props.roleId == "") {
    return null;
  }

  return (
    <Box>
      <Box mb={2}>
        <Stack direction="row" spacing={1} justifyContent="space-between" alignItems="center">
          <Typography variant="title_S">ผู้ใช้งาน{(data?.length ?? 0) > 0 && ` (${data?.length})`}</Typography>
          <ButtonAdd variant="text" onClick={handleClickAdd} text="เพิ่มผู้ใช้งาน" />
        </Stack>
      </Box>

      {data && data.length == 0 && <EmptyDataPanel />}

      {data && data.length > 0 && (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell width={150}>รหัส</TableCell>
                <TableCell>ชื่อ-สกุล</TableCell>
                <TableCell width={50}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((item) => (
                <TableRow key={`selected-${item.id}`}>
                  <TableCell>{item.code}</TableCell>
                  <TableCell>{item.fullname}</TableCell>
                  <TableCell>
                    <TableButton icon="delete" onClick={() => handleClickDelete(item.id)} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {/* Dialogs */}
      <SelectUserDialog {...dialogSelectUser.dialogProps} />
    </Box>
  );
}

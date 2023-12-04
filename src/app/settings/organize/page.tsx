"use client";

import ButtonAdd from "@/components/ButtonAdd";
import EmptyDataPanel from "@/components/EmptyDataPanel";
import PageLayout from "@/components/PageLayout";
import PagePaper from "@/components/PagePaper";
import { SPACING_LAYOUT } from "@/constants/layout.constant";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import StarsRoundedIcon from "@mui/icons-material/StarsRounded";
import {
  Box,
  Grid,
  Select,
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
import { useState } from "react";
import OrganizeTree from "./components/OrganizeTree";
import SelectUserDialog from "./components/SelectUserDialog";
import { useDialog } from "@/hooks/useDialog";
import { addOrganizeUsers, getOrganizeUsers, removeOrganizeUsers } from "@/services/graphql/organize.service";
import { useLayoutStore } from "@/stores/layout.store";
import TableButton from "@/components/TableButton";

export default function SettingOrganizePage() {
  // statics

  // states
  const [selectedOrganizeId, setSelectedOrganizeId] = useState<string>("");

  // query

  // actions

  return (
    <PageLayout
      type="detail"
      toolbar={{
        title: "Organizational Unit"
      }}
    >
      <Grid container spacing={SPACING_LAYOUT}>
        <Grid item xs={6}>
          <PagePaper sx={{ height: "100%" }}>
            <OrganizeTree onSelected={(node) => setSelectedOrganizeId(node?.id || "")} />
          </PagePaper>
        </Grid>
        <Grid item xs={6}>
          <PagePaper sx={{ height: "100%" }}>
            <PanelOrganizeUsers organizeId={selectedOrganizeId} />
          </PagePaper>
        </Grid>
      </Grid>
    </PageLayout>
  );
}

type PanelOrganizeUsersProps = {
  organizeId?: string;
};

function PanelOrganizeUsers(props: PanelOrganizeUsersProps) {
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
    queryKey: ["organize-users", props.organizeId],
    queryFn: async () => {
      return getOrganizeUsers(props.organizeId || "");
    },
    enabled: props.organizeId != null && props.organizeId != ""
  });

  // mutations
  const mutateSaveUser = useMutation({
    mutationFn: async (users: string[]) => {
      return addOrganizeUsers(props.organizeId || "", users);
    }
  });

  const mutateDeleteUser = useMutation({
    mutationFn: async (userId: string) => {
      return removeOrganizeUsers(userId);
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

  if (props.organizeId == null || props.organizeId == "") {
    return null;
  }

  return (
    <Box>
      <Box mb={2}>
        <Stack direction="row" spacing={1} justifyContent="space-between" alignItems="center">
          <Typography variant="title_S">ผู้ใช้งาน</Typography>
          <ButtonAdd onClick={handleClickAdd} text="เพิ่มผู้ใช้งาน" />
        </Stack>
      </Box>

      {data && data.length == 0 && <EmptyDataPanel />}

      {/* {data &&
        data.length > 0 &&
        data.map((item) => (
          <Box key={item.id}>
            <Stack direction="row" spacing={1}>
              <Typography>{item.fullname}</Typography>
            </Stack>
          </Box>
        ))} */}

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

      <SelectUserDialog {...dialogSelectUser.dialogProps} />
    </Box>
  );
}

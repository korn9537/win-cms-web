"use client";

import PageFilter from "@/components/PageFilter";
import { SPACING_LAYOUT } from "@/constants/layout.constant";
import { getMasterRoles } from "@/services/graphql/masters/master-role.service";
import { RoleModel } from "@/services/graphql/models/role.model";
import { Search } from "@mui/icons-material";
import {
  ButtonBase,
  Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import _ from "lodash";
import { useMemo, useState } from "react";

type PanelRoleProps = {
  onChange?: (user: RoleModel) => void;
};

export default function PanelRole(props: PanelRoleProps) {
  // statics

  // states
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<string>("");

  // query
  const query = useQuery({
    queryKey: ["roles"],
    queryFn: () => {
      return getMasterRoles(true);
    }
  });

  const users = useMemo(() => {
    const regex = new RegExp(search, "i");
    return query.data?.filter((item) => {
      return regex.test(item.name_th || "") || regex.test(item.code);
    });
  }, [query.data, search]);

  // actions
  const handleSearchChange = _.debounce((value: string) => {
    setSearch(value);
  }, 500);

  const handleClickRow = (item: RoleModel) => {
    setSelectedId(item.id);
    props.onChange?.(item);
  };

  return (
    <Stack spacing={SPACING_LAYOUT}>
      <PageFilter showSearchButton={false}>
        <Grid container spacing={2.5}>
          <Grid item xs={12}>
            <TextField
              label="ค้นหา"
              InputProps={{
                endAdornment: (
                  <ButtonBase>
                    <Search />
                  </ButtonBase>
                )
              }}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
          </Grid>
        </Grid>
      </PageFilter>
      {/*  */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell width={140}>รหัสกลุ่มตำแหน่ง</TableCell>
              <TableCell>ชื่อกลุ่มตำแหน่ง</TableCell>
              <TableCell>จำนวนผู้ใช้งาน</TableCell>
            </TableRow>
          </TableHead>
          <TableBody
            sx={{
              "& .MuiTableRow-root": {
                ":hover, &.selected": {
                  cursor: "pointer",
                  bgcolor: "#f5f5f5"
                }
              }
            }}
          >
            {users?.map((item) => {
              return (
                <TableRow
                  key={item.id}
                  className={item.id == selectedId ? "selected" : ""}
                  onClick={() => {
                    handleClickRow(item);
                  }}
                >
                  <TableCell>{item.code}</TableCell>
                  <TableCell>{item.name_th}</TableCell>
                  <TableCell>{item.user_count}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
}

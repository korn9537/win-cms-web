"use client";

import PageFilter from "@/components/PageFilter";
import { SPACING_LAYOUT } from "@/constants/layout.constant";
import { UserModel } from "@/services/graphql/models/user.model";
import { getUsers } from "@/services/graphql/user.service";
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

type PanelUserProps = {
  onChange?: (user: UserModel) => void;
};

export default function PanelUser(props: PanelUserProps) {
  // statics

  // states
  const [search, setSearch] = useState("");

  // query
  const query = useQuery({
    queryKey: ["users"],
    queryFn: () => {
      return getUsers();
    }
  });

  const users = useMemo(() => {
    const regex = new RegExp(search, "i");
    return query.data?.filter((item) => {
      return regex.test(item.fullname || "") || regex.test(item.code);
    });
  }, [query.data, search]);

  // actions
  const handleSearchChange = _.debounce((value: string) => {
    setSearch(value);
  }, 500);

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
          {/* <Grid item xs={6}>
            <TextField label="กลุ่มตำแหน่ง" select>
              <MenuItem value="">แสดงทั้งหมด</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField label="ฝ่าย" select>
              <MenuItem value="">แสดงทั้งหมด</MenuItem>
            </TextField>
          </Grid> */}
        </Grid>
      </PageFilter>
      {/*  */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell width={140}>รหัสพนักงาน</TableCell>
              <TableCell>ชื่อ - สกุล</TableCell>
              <TableCell width={130}>กลุ่มตำแหน่ง</TableCell>
              <TableCell width={130}>ฝ่าย</TableCell>
              {/* <TableCell width={30}></TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {users?.map((item) => {
              return (
                <TableRow key={item.id}>
                  <TableCell>{item.code}</TableCell>
                  <TableCell>{item.fullname}</TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  {/* <TableCell></TableCell> */}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
}

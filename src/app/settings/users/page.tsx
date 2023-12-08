"use client";

import ButtonAdd from "@/components/ButtonAdd";
import ChipStatus from "@/components/ChipStatus";
import EmptyDataPanel from "@/components/EmptyDataPanel";
import PageLayout from "@/components/PageLayout";
import PagePaper from "@/components/PagePaper";
import TableButton from "@/components/TableButton";
import { TABLE_COLUMN_SIZE } from "@/constants/content.constant";
import { SPACING_LAYOUT } from "@/constants/layout.constant";
import { getUsers } from "@/services/graphql/user.service";
import {
  Grid,
  MenuItem,
  Paper,
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
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SettingUserPage() {
  // statics
  const router = useRouter();

  // states
  const [search, setSearch] = useState("");
  const [position, setPosition] = useState("");
  const [department, setDepartment] = useState("");
  const [division, setDivision] = useState("");
  const [status, setStatus] = useState("");

  // queries
  const query = useQuery({
    queryKey: ["users", search, status],
    queryFn: async () => {
      return getUsers(search, status);
    }
    // initialData: []
  });

  // actions
  const handleClickAdd = () => {
    router.push(`/settings/users/create`);
  };

  const handleClickView = (code: string) => {
    router.push(`/settings/users/${code}`);
  };

  const handleSearchChange = _.debounce((e: React.ChangeEvent) => {
    setSearch((e.target as HTMLInputElement).value);
  }, 500);

  return (
    <PageLayout
      type="list"
      appMenuSize="large"
      toolbar={{
        title: "ผู้ใช้งาน",
        actions: <ButtonAdd onClick={handleClickAdd}>เพิ่มข้อมูล</ButtonAdd>
      }}
      filter={{
        children: (
          <Grid container spacing={SPACING_LAYOUT}>
            <Grid item xs={4}>
              <TextField label="ค้นหา" placeholder="ค้นหา" fullWidth onChange={handleSearchChange} />
            </Grid>
            <Grid item xs={4}>
              <TextField label="ตำแหน่ง" fullWidth select>
                <MenuItem value="">แสดงทั้งหมด</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={4}>
              <TextField label="ฝ่าย" fullWidth select>
                <MenuItem value="">แสดงทั้งหมด</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        ),
        filterOther: (
          <Grid container spacing={SPACING_LAYOUT}>
            <Grid item xs={4}>
              <TextField label="แผนก" fullWidth select>
                <MenuItem value="">แสดงทั้งหมด</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={4}>
              <TextField label="สถานะ" fullWidth select value={status} onChange={(e) => setStatus(e.target.value)}>
                <MenuItem value="">แสดงทั้งหมด</MenuItem>
                <MenuItem value="active">เปิดใช้งาน</MenuItem>
                <MenuItem value="inactive">ปิดใช้งาน</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        )
      }}
    >
      {query.isPending && <div>Loading...</div>}
      {query.isPending == false && query.data?.length == 0 && (
        <PagePaper>
          <EmptyDataPanel onClick={handleClickAdd} />
        </PagePaper>
      )}
      {query.data && query.data?.length > 0 && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell width={80}>รูปถ่าย</TableCell>
                <TableCell width={130}>รหัสพนักงาน</TableCell>
                <TableCell>ชื่อ - สกุล</TableCell>
                <TableCell>ตำแหน่ง</TableCell>
                <TableCell>ฝ่าย</TableCell>
                <TableCell width={TABLE_COLUMN_SIZE.STATUS}>สถานะ</TableCell>
                <TableCell width={TABLE_COLUMN_SIZE.ACTION_1}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {query.data?.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <img src="/icons/User.png" alt="" />
                  </TableCell>
                  <TableCell>{user.code}</TableCell>
                  <TableCell>{user.fullname}</TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell>
                    <ChipStatus state={user.is_active ? "active" : "inactive"} />
                  </TableCell>
                  <TableCell>
                    <TableButton icon="view" onClick={() => handleClickView(user.code)} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </PageLayout>
  );
}

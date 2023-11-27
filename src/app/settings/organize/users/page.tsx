"use client";

import ButtonAdd from "@/components/ButtonAdd";
import ChipStatus from "@/components/ChipStatus";
import PageLayout from "@/components/PageLayout";
import TableButton from "@/components/TableButton";
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
import { useRouter } from "next/navigation";

export default function SettingUserPage() {
  // statics
  const router = useRouter();

  // queries
  const query = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      return getUsers();
    }
  });

  // actions
  const handleClickAdd = () => {
    router.push(`/settings/organize/users/create`);
  };

  const handleClickView = (code: string) => {
    router.push(`/settings/organize/users/${code}`);
  };

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
              <TextField label="ค้นหา" placeholder="ค้นหา" fullWidth />
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
              <TextField label="สถานะ" fullWidth select>
                <MenuItem value="">แสดงทั้งหมด</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        )
      }}
    >
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>รูปถ่าย</TableCell>
              <TableCell>รหัสพนักงาน</TableCell>
              <TableCell>ชื่อ - สกุล</TableCell>
              <TableCell>ตำแหน่ง</TableCell>
              <TableCell>ฝ่าย</TableCell>
              <TableCell>สถานะ</TableCell>
              <TableCell></TableCell>
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
    </PageLayout>
  );
}

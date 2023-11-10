"use client";

import ButtonAdd from "@/components/ButtonAdd";
import ChipStatus from "@/components/ChipStatus";
import PageLayout from "@/components/PageLayout";
import { SPACING_LAYOUT } from "@/constants/layout.constant";
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
import { useRouter } from "next/navigation";

type ProjectBoqPageProps = {
  params: {
    company_code: string;
    project_code: string;
  };
};

export default function ProjectBoqPage(props: ProjectBoqPageProps) {
  // statics
  const router = useRouter();
  const { company_code, project_code } = props.params;

  // actions
  const handleClickAdd = () => {
    router.push(`/company/${company_code}/boq/projects/${project_code}/create`);
  };

  return (
    <PageLayout
      type="list"
      toolbar={{
        title: "WIN | วิน บางกอก1",
        backFunction: () => router.push(`/company/${company_code}/boq`),
        actions: <ButtonAdd onClick={handleClickAdd} />
      }}
      filter={{
        children: (
          <Grid container spacing={SPACING_LAYOUT}>
            <Grid item xs={4}>
              <TextField label="ค้นหา" placeholder="ค้นหา" fullWidth />
            </Grid>
            <Grid item xs={4}>
              <TextField label="ประเภทโมเดล" fullWidth select>
                <MenuItem value="">แสดงทั้งหมด</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={4}>
              <TextField label="โมเดล" fullWidth select>
                <MenuItem value="">แสดงทั้งหมด</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        ),
        filterOther: (
          <Grid container spacing={SPACING_LAYOUT}>
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
              <TableCell>รหัส BOQ</TableCell>
              <TableCell>ชื่อ BOQ</TableCell>
              <TableCell>ประเภทโมเดล</TableCell>
              <TableCell>โมเดล</TableCell>
              <TableCell>วันที่เอกสาร</TableCell>
              <TableCell>พื้นที่ใช้สอยรวม/ตร.ม.</TableCell>
              <TableCell>จำนวนเงิน</TableCell>
              <TableCell>ราคาเฉลี่ย/ตร.ม.</TableCell>
              <TableCell>สถานะ</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>DH001 - 06</TableCell>
              <TableCell>บ้านพักอาศัย</TableCell>
              <TableCell>บ้านเดี่ยว</TableCell>
              <TableCell>3 ห้องนอน 3 ห้องน้ำ</TableCell>
              <TableCell>11/02/2023</TableCell>
              <TableCell>146.11</TableCell>
              <TableCell>1,115,000,000.00</TableCell>
              <TableCell>10,000.00</TableCell>
              <TableCell>
                <ChipStatus state="active" text="ผ่านการอนุมัติ" />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </PageLayout>
  );
}

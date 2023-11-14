"use client";

import ChipStatus from "@/components/ChipStatus";
import PageLayout from "@/components/PageLayout";
import TableButton from "@/components/TableButton";
import { TABLE_COLUMN_SIZE } from "@/constants/content.constant";
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

type BoqIndexPageProps = {
  params: {
    company_code: string;
  };
};

export default function BoqIndexPage(props: BoqIndexPageProps) {
  // statics
  const router = useRouter();
  const { company_code } = props.params;

  // actions
  const handleClickView = (projectCode: string) => () => {
    router.push(`/company/${company_code}/boq/projects/${projectCode}`);
  };

  return (
    <PageLayout
      type="list"
      appMenuSize="large"
      toolbar={{
        title: "เลือกโครงการ"
      }}
      filter={
        <Grid container spacing={SPACING_LAYOUT}>
          <Grid item xs={4}>
            <TextField label="ค้นหา" placeholder="ค้นหา" fullWidth />
          </Grid>
          <Grid item xs={4}>
            <TextField label="ประเภทโครงการ" fullWidth select>
              <MenuItem value="">แสดงทั้งหมด</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={4}>
            <TextField label="สถานะ" fullWidth select>
              <MenuItem value="">แสดงทั้งหมด</MenuItem>
            </TextField>
          </Grid>
        </Grid>
      }
      pagination={{
        count: 100,
        page: 1,
        rowsPerPage: 10,
        onPageChange: () => {},
        onRowsPerPageChange: () => {}
      }}
    >
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>รหัสโครงการ</TableCell>
              <TableCell>ชื่อโครงการ</TableCell>
              <TableCell>ชื่อย่อ</TableCell>
              <TableCell>ประเภทโครงการ</TableCell>
              <TableCell width={TABLE_COLUMN_SIZE.STATUS}>สถานะ</TableCell>
              <TableCell width={TABLE_COLUMN_SIZE.ACTION_1}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.from(Array(10).keys()).map((item, index) => (
              <TableRow key={`tr-${index}`}>
                <TableCell>0001</TableCell>
                <TableCell>High House</TableCell>
                <TableCell>HIGH HOUSE</TableCell>
                <TableCell>แนวราบ</TableCell>
                <TableCell>
                  <ChipStatus state="active" />
                </TableCell>
                <TableCell>
                  <TableButton icon="view" onClick={handleClickView("1-1")} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </PageLayout>
  );
}

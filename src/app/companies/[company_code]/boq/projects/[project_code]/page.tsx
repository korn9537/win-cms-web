"use client";

import ButtonAdd from "@/components/ButtonAdd";
import ChipStatus from "@/components/ChipStatus";
import PageLayout from "@/components/PageLayout";
import { SPACING_LAYOUT } from "@/constants/layout.constant";
import { ProjectBoqHeaderModel, getProjectBoqHeaders } from "@/services/graphql/project-boq.service";
import { getProjectForLayoutData } from "@/services/graphql/project.service";
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
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import numeral from "numeral";

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

  //
  const { data: project } = useQuery({
    queryKey: ["project", project_code],
    queryFn: () => {
      return getProjectForLayoutData(project_code);
    }
  });

  const query = useQuery({
    queryKey: ["projects", project_code, "boq"],
    queryFn: () => {
      return getProjectBoqHeaders();
    }
  });

  // actions
  const handleClickAdd = () => {
    router.push(`/companies/${company_code}/boq/projects/${project_code}/boq/create`);
  };

  const handleClickView = (code: string) => {
    router.push(`/companies/${company_code}/boq/projects/${project_code}/boq/${code}`);
  };

  return (
    <PageLayout
      type="list"
      toolbar={{
        title: project ? `${project?.code} | ${project?.name_th}` : "loading...",
        backFunction: () => router.push(`/companies/${company_code}/boq`),
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
            {query.data?.map((row: ProjectBoqHeaderModel) => (
              <TableRow key={row.id} onClick={() => handleClickView(row.code)}>
                <TableCell>{row.code}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.model_type.name_th}</TableCell>
                <TableCell>{row.model.name_th}</TableCell>
                <TableCell>{dayjs(row.document_date).format("DD/MM/YYYY")}</TableCell>
                <TableCell>{numeral(row.total_area).format("0,0.00")}</TableCell>
                <TableCell>{numeral(row.total_cost).format("0,0.00")}</TableCell>
                <TableCell>{numeral(row.average_price).format("0,0.00")}</TableCell>
                <TableCell>
                  <ChipStatus state="active" text={row.state} />
                  {/* <ChipStatus state="active" text="ผ่านการอนุมัติ" /> */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </PageLayout>
  );
}

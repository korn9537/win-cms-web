"use client";

import ChipStatus from "@/components/ChipStatus";
import PageLayout from "@/components/PageLayout";
import TableButton from "@/components/TableButton";
import { TABLE_COLUMN_SIZE } from "@/constants/content.constant";
import { SPACING_LAYOUT } from "@/constants/layout.constant";
import { usePaging } from "@/hooks/usePagination";
import { CompanyModel } from "@/services/graphql/models/company.model";
import { getProjects } from "@/services/graphql/project.service";
import { useModuleLayoutStore } from "@/stores/module-layout.store";
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

type BoqIndexPageProps = {
  params: {
    company_code: string;
  };
};

export default function BoqIndexPage(props: BoqIndexPageProps) {
  // statics
  const router = useRouter();
  const { company_code } = props.params;
  const company = useModuleLayoutStore((state) => state.data as CompanyModel);

  const paging = usePaging();

  // queries
  const { data, isLoading } = useQuery({
    queryKey: ["company", company_code, "projects", paging.page, paging.pageSize, paging.search],
    queryFn: () => {
      return getProjects(company.id, paging.search, "", "", paging.page, paging.pageSize);
    }
  });

  // actions
  const handleClickView = (projectCode: string) => () => {
    router.push(`/companies/${company_code}/boq/projects/${projectCode}`);
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
            <TextField
              label="ค้นหา"
              placeholder="ค้นหา"
              fullWidth
              onChange={(e) => paging.handleSearchChange(e.target.value)}
            />
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
        loading: isLoading,
        count: data?.totalCount ?? 0,
        page: paging.page,
        rowsPerPage: paging.pageSize,
        onPageChange: (e, page) => paging.setPage(page),
        onRowsPerPageChange: (e) => paging.setPageSize(+e.target.value)
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
            {data?.items.map((item) => (
              <TableRow key={`tr-p-${item.id}`}>
                <TableCell>{item.code}</TableCell>
                <TableCell>{item.name_th}</TableCell>
                <TableCell>{item.acronym}</TableCell>
                <TableCell>{item.type == "house" ? "แนวราบ" : "แนวสูง"}</TableCell>
                <TableCell>
                  {item.is_active ? <ChipStatus state="active" /> : <ChipStatus state="inactive" />}
                </TableCell>
                <TableCell>
                  <TableButton icon="view" onClick={handleClickView(item.code)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </PageLayout>
  );
}

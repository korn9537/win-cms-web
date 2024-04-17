import PageFilter from "@/components/PageFilter";
import { IOSSwitch } from "@/components/SwitchStatus";
import { SPACING_FORM } from "@/constants/layout.constant";
import { ProjectModel } from "@/services/graphql/models/project.model";
import { userPermissionSettingStore } from "@/stores/permission-setting.store";
import {
  Alert,
  MenuItem,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography
} from "@mui/material";
import { useEffect, useMemo, useRef, useState } from "react";

type PanelProjectProps = {
  refType: "role" | "user";
  refId: string;
};

export default function PanelProject(props: PanelProjectProps) {
  // statics
  const {
    projects: items,
    loadProjects,
    loadingProjects,
    companies,
    loadCompanies,
    loadingCompanies
  } = userPermissionSettingStore((state) => ({
    projects: state.projects,
    loadProjects: state.loadProjects,
    loadingProjects: state.loadingProjects,
    companies: state.companies,
    loadCompanies: state.loadCompanies,
    loadingCompanies: state.loadingCompanies
  }));

  const loadingRef = useRef(false);

  // useEffect(() => {
  //   const load = async () => {
  //     loadingRef.current = true;
  //     loadProjects("");
  //     loadCompanies();
  //     loadingRef.current = false;
  //   };

  //   if (loadingRef.current == false && items.length == 0) {
  //     load();
  //   }
  // }, []);

  // states
  const [companyId, setCompanyId] = useState<string>("");

  const projects = useMemo(() => {
    if (companyId == "") {
      return items;
    }

    return items.filter((item) => {
      return item.company_id == companyId;
    });
  }, [items, companyId]);

  // mutations

  // actions
  const handleClickRow = (e: React.MouseEvent<HTMLElement>, item: ProjectModel) => {
    if (e.target instanceof HTMLInputElement) {
      return;
    }
  };

  const handleChangeSwitch = (e: React.ChangeEvent<HTMLInputElement>, item: ProjectModel) => {
    e.stopPropagation();

    // if (e.target.checked) {
    //   setPermission({
    //     page_id: item.id,
    //     ref_id: props.refId,
    //     ref_type: props.refType,
    //     entity_codes: ["view"]
    //   });
    // } else {
    //   removePermission({
    //     page_id: item.id,
    //     ref_id: props.refId,
    //     ref_type: props.refType,
    //     entity_codes: ["view"]
    //   });
    // }

    // if (e.target.checked && hasChild) {
    //   showDialogPermission(item);
    // }
  };

  // render
  if (props.refId == "") {
    return <Alert severity="info">กรุณาเลือกกลุ่มตำแหน่ง / ผู้ใช้งาน</Alert>;
  }

  return (
    <Stack spacing={SPACING_FORM}>
      {/* Filter */}
      <PageFilter showSearchButton={false}>
        <TextField
          label="บริษัท"
          select
          onChange={(e) => {
            setCompanyId(e.target.value);
          }}
        >
          <MenuItem value="">ทั้งหมด</MenuItem>
          {companies?.map((item) => {
            return (
              <MenuItem key={"select-comp-" + item.id} value={item.id}>
                {item.name_th}
              </MenuItem>
            );
          })}
        </TextField>
      </PageFilter>
      {/* Table */}
      {loadingProjects ? (
        <Typography>loading...</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ชื่อบริษัท</TableCell>
                <TableCell width={200} align="right">
                  อนุญาตทั้งหมด
                  <IOSSwitch
                    checked={false}
                    onChange={(e) => {}}
                    sx={{
                      ml: 2
                    }}
                  />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody
              sx={{
                "& .MuiTableRow-root": {
                  "&:hover": {
                    backgroundColor: (theme) => theme.palette.neutralGray[20]
                  },
                  cursor: "pointer"
                }
              }}
            >
              {projects?.map((item) => {
                const checked = false;

                return (
                  <TableRow key={item.id} onClick={(e) => handleClickRow(e, item)}>
                    <TableCell>{item.name_th}</TableCell>
                    <TableCell align="right">
                      <IOSSwitch checked={checked} onChange={(e) => handleChangeSwitch(e, item)} />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Stack>
  );
}

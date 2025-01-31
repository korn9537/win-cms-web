import { IOSSwitch } from "@/components/SwitchStatus";
import { getCompanies } from "@/services/graphql/company.service";
import { CompanyModel } from "@/services/graphql/models/company.model";
import { userPermissionSettingStore } from "@/stores/permission-setting.store";
import {
  Alert,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";

type PanelCompanyProps = {
  refType: "role" | "user";
  refId: string;
};

export default function PanelCompany(props: PanelCompanyProps) {
  // statics
  const { companies, loadCompanies, loadingCompanies } = userPermissionSettingStore((state) => ({
    companies: state.companies,
    loadCompanies: state.loadCompanies,
    loadingCompanies: state.loadingCompanies
  }));

  const loadingRef = useRef(false);

  // useEffect(() => {
  //   const load = async () => {
  //     loadingRef.current = true;
  //     await loadCompanies();
  //     loadingRef.current = false;
  //   };

  //   if (loadingRef.current == false && companies.length == 0) {
  //     load();
  //   }
  // }, []);

  // states

  // queries

  // mutations

  // actions
  const handleClickRow = (e: React.MouseEvent<HTMLElement>, item: CompanyModel) => {
    if (e.target instanceof HTMLInputElement) {
      return;
    }
  };

  const handleChangeSwitch = (e: React.ChangeEvent<HTMLInputElement>, item: CompanyModel) => {
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

  if (props.refId == "") {
    return <Alert severity="info">กรุณาเลือกกลุ่มตำแหน่ง</Alert>;
  }

  return (
    <Box>
      {loadingCompanies ? (
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
                    backgroundColor: "#f5f5f5"
                  },
                  cursor: "pointer"
                }
              }}
            >
              {companies?.map((item) => {
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
    </Box>
  );
}

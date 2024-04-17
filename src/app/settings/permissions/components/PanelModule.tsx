import { IOSSwitch } from "@/components/SwitchStatus";
import { PermissionPageModel } from "@/services/graphql/models/permission.model";
import { userPermissionSettingStore } from "@/stores/permission-setting.store";
import { ChevronRight } from "@mui/icons-material";
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
import _ from "lodash";
import { useEffect, useRef } from "react";
import DialogPermission, { useDialogPermission } from "./DialogPermission";

type PanelModuleProps = {
  refType: "role" | "user";
  refId: string;
};

export default function PanelModule(props: PanelModuleProps) {
  // statics
  const { modules, pages, loadingPages, loadPages, setPermission, removePermission, permissions } =
    userPermissionSettingStore((state) => {
      const modules = state.pages.filter((item) => item.level == 1);
      const permissions = _.pick(
        state.permissions,
        modules.map((item) => item.id)
      );

      return {
        modules: modules,
        pages: state.pages,
        loadingPages: state.loadingPages,
        loadPages: state.loadPages,
        setPermission: state.setPermission,
        removePermission: state.removePermission,
        permissions: permissions
      };
    });

  const dialogPermission = useDialogPermission({
    onConfirm(data, dialog, res) {},
    onCancel(data, dialog) {}
  });

  const loadingRef = useRef(false);

  useEffect(() => {
    if (loadingRef.current == false) {
      loadingRef.current = true;
      loadPages();
    }
  }, []);

  // states

  // queries

  // mutations

  // actions
  const handleClickRow = (e: React.MouseEvent<HTMLElement>, item: PermissionPageModel) => {
    if (e.target instanceof HTMLInputElement) {
      return;
    }

    showDialogPermission(item);
  };

  const handleChangeSwitch = (e: React.ChangeEvent<HTMLInputElement>, item: PermissionPageModel, hasChild: boolean) => {
    e.stopPropagation();

    if (e.target.checked) {
      setPermission({
        page_id: item.id,
        ref_id: props.refId,
        ref_type: props.refType,
        entity_codes: ["view"]
      });
    } else {
      setPermission({
        page_id: item.id,
        ref_id: props.refId,
        ref_type: props.refType,
        entity_codes: []
      });
      // removePermission({
      //   page_id: item.id,
      //   ref_id: props.refId,
      //   ref_type: props.refType,
      //   entity_codes: ["view"]
      // });
    }

    // if (e.target.checked && hasChild) {
    //   showDialogPermission(item);
    // }
  };

  const showDialogPermission = (item: PermissionPageModel) => {
    dialogPermission.open(item.name_th, null, {
      page_id: item.id,
      ref_id: props.refId,
      ref_type: props.refType
    });
  };

  if (props.refId == "") {
    return <Alert severity="info">กรุณาเลือกกลุ่มตำแหน่ง</Alert>;
  }

  return (
    <Box>
      {loadingPages ? (
        <Typography>loading...</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ระบบ / ฟังก์ชั่น</TableCell>
                <TableCell width={100}>สิทธิ์</TableCell>
                <TableCell width={30}></TableCell>
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
              {modules.map((item) => {
                const hasChild = pages.filter((p) => p.parent_id == item.id).length > 0;
                const checked = permissions[item.id]?.includes("view") ?? false;

                return (
                  <TableRow
                    key={item.id}
                    onClick={(e) => {
                      if (!hasChild) {
                        return;
                      }
                      handleClickRow(e, item);
                    }}
                  >
                    <TableCell>{item.name_th}</TableCell>
                    <TableCell>
                      <IOSSwitch checked={checked} onChange={(e) => handleChangeSwitch(e, item, hasChild)} />
                    </TableCell>
                    <TableCell>{hasChild && <ChevronRight />}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Dialogs */}
      <DialogPermission {...dialogPermission.dialogProps} />
    </Box>
  );
}

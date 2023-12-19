import { IOSSwitch } from "@/components/SwitchStatus";
import { userPermissionSetttingStore } from "@/stores/permission-setting.store";
import { ChevronRight } from "@mui/icons-material";
import {
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
import { useEffect, useState } from "react";
import DialogPermission, { useDialogPermission } from "./DialogPermission";
import { PermissionPageModel } from "@/services/graphql/models/permission.model";
import _ from "lodash";

type PanelModuleProps = {
  refType: "role" | "user";
  refId: string;
};

export default function PanelModule(props: PanelModuleProps) {
  // statics
  const {
    modules,
    pages,
    loadingPages,
    loadPages,
    setPermission,
    removePermission,
    loadPermissions,
    loadingPermissions,
    permissions
  } = userPermissionSetttingStore((state) => {
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
      permissions: permissions,
      loadingPermissions: state.loadingPermissions,
      loadPermissions: state.loadPermissions
    };
  });

  const dialogPermission = useDialogPermission({
    onConfirm(data, dialog, res) {
      console.log(res);
    },
    onCancel(data, dialog) {}
  });

  useEffect(() => {
    loadPages();
  }, []);

  // states
  const [checkedViews, setCheckedViews] = useState<string[]>();

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
      removePermission({
        page_id: item.id,
        ref_id: props.refId,
        ref_type: props.refType,
        entity_codes: ["view"]
      });
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

  // console.log("permissions", permissions);

  if (props.refId == "") {
    return <Typography>กรุณาเลือกกลุ่มตำแหน่ง</Typography>;
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

// <TableContainer component={Paper}>
//   <Table>
//     <TableHead>
//       <TableRow>
//         <TableCell>ระบบ / ฟังก์ชั่น</TableCell>
//         <TableCell width={140}>สิทธิ์กลุ่มตำแหน่ง</TableCell>
//         <TableCell width={100}>สิทธิ์ส่วนตัว</TableCell>
//         <TableCell width={30}></TableCell>
//       </TableRow>
//     </TableHead>
//     <TableBody>
//       {pages.map((item) => {
//         return (
//           <TableRow key={item.id}>
//             <TableCell>{item.name_th}</TableCell>
//             <TableCell>
//               <IOSSwitch onChange={(e) => {}} />
//             </TableCell>
//             <TableCell>
//               <IOSSwitch onChange={(e) => {}} />
//             </TableCell>
//             <TableCell>
//               <ChevronRight />
//             </TableCell>
//           </TableRow>
//         );
//       })}
//     </TableBody>
//   </Table>
// </TableContainer>;

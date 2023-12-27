import { IOSSwitch } from "@/components/SwitchStatus";
import ButtonCloseDialog from "@/components/dialogs/ButtonCloseDialog";
import { SPACING_FORM } from "@/constants/layout.constant";
import { UseDialogProps, useDialog } from "@/hooks/useDialog";
import { PermissionEntityModel, PermissionPageModel } from "@/services/graphql/models/permission.model";
import { userPermissionSetttingStore } from "@/stores/permission-setting.store";
import {
  Box,
  DialogContent,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import _ from "lodash";
import React, { memo, useEffect, useMemo, useState } from "react";

type DataType = {
  page_id: string;
  ref_id: string;
  ref_type: string;
};

type ResponseType = {
  entities: string[];
} | null;

export const useDialogPermission = useDialog<DataType, ResponseType>;

type DialogPermissionProps = {} & UseDialogProps<DataType, ResponseType>;

export default function DialogPermission(props: DialogPermissionProps) {
  // statics
  const theme = useTheme();
  const { open, onCancel, onConfirm, title, data } = props;

  // states
  const { pages, entities, loadEntities, loadingEntities, setPermission, removePermission, permissions } =
    userPermissionSetttingStore((state) => {
      const pages = state.pages.filter((p) => p.parent_id == data?.page_id);
      // const permissions = _.pick(
      //   state.permissions,
      //   pages.map((item) => item.id)
      // );

      const permissions = state.permissions;

      return {
        pages: pages,
        entities: state.entities,
        loadingEntities: state.loadingEntities,
        loadEntities: state.loadEntities,
        setPermission: state.setPermission,
        removePermission: state.removePermission,
        permissions: permissions
      };
    });

  const [selectedPageId, setSelectedPageId] = useState<string>("");

  useEffect(() => {
    if (open) {
      if (selectedPageId != "") {
        loadEntities(selectedPageId);
      }
    }
  }, [open, selectedPageId]);

  // memo
  const checkAllEntity = useMemo(() => {
    const all = (entities?.map((d) => d.code) || []).filter((d) => d != "view");
    const checked = (permissions[selectedPageId] || []).filter((d) => d != "view");

    return _.isEqual(all.sort(), checked.sort());
  }, [entities, permissions, selectedPageId]);

  // actions
  const handleOnSelectPage = (item: PermissionPageModel) => {
    setSelectedPageId(item.id);
  };

  const handleOnChangePageSwitch = (checked: boolean, data: PermissionPageModel) => {
    if (checked) {
      saveChangeEntity(checked, data.id, ["view"]);
    } else {
      saveChangeEntity(checked, data.id, []);
    }
  };

  const handleOnClose = () => {
    onCancel();
  };

  // const handleOnSubmit = async () => {
  //   onConfirm(null);
  // };

  const handleOnEntityChange = (checked: boolean, codes: string[]) => {
    const current = permissions[selectedPageId] || [];

    console.log("current", current);

    if (checked) {
      if (codes.length == 0) {
        codes = entities?.map((d) => d.code) || [];
        codes.push("view");
      } else {
        codes = _.uniq([...current, "view", ...codes]);
      }
    } else {
      if (codes.length == 0) {
        // codes = [];
        codes = current.includes("view") ? ["view"] : [];
      } else {
        codes = current.filter((d) => !codes.includes(d));
      }
    }

    saveChangeEntity(checked, selectedPageId, _.uniq(codes));
  };

  const saveChangeEntity = (checked: boolean, page_id: string, codes: string[]) => {
    setPermission({
      page_id: page_id,
      ref_id: props.data?.ref_id || "",
      ref_type: props.data?.ref_type || "",
      entity_codes: _.uniq(codes)
    });

    // if (checked) {
    //   setPermission({
    //     page_id: page_id,
    //     ref_id: props.data?.ref_id || "",
    //     ref_type: props.data?.ref_type || "",
    //     entity_codes: codes
    //   });
    // } else {
    //   removePermission({
    //     page_id: page_id,
    //     ref_id: props.data?.ref_id || "",
    //     ref_type: props.data?.ref_type || "",
    //     entity_codes: codes
    //   });
    // }
  };

  // console.log("selected codes", permissions[selectedPageId]);

  return (
    <Dialog
      open={open}
      onClose={handleOnClose}
      fullWidth={true}
      maxWidth="lg"
      sx={{
        "& .MuiDialog-paper": {
          height: "100%"
        }
      }}
    >
      <DialogTitle>{title || "จัดการสิทธิ์"}</DialogTitle>
      <ButtonCloseDialog onClick={handleOnClose} />
      <DialogContent>
        <Grid container spacing={SPACING_FORM}>
          <Grid item xs={6}>
            <TableContainer
              sx={{
                maxHeight: "calc(100vh - 200px)",
                border: (theme) => `1px solid ${theme.palette.neutralGray[20]}`
              }}
            >
              <Table
                sx={{
                  "& .MuiTableRow-root": {
                    "&:hover": {
                      bgcolor: theme.palette.neutralGray[10]
                    },
                    cursor: "pointer",
                    "&.selected": {
                      bgcolor: theme.palette.neutralGray[10]
                    }
                  }
                }}
                stickyHeader
              >
                <TableHead>
                  <TableRow>
                    <TableCell>ระบบ / ฟังก์ชั่น</TableCell>
                    <TableCell width={140}>สิทธิ์กลุ่มตำแหน่ง</TableCell>
                    <TableCell width={120}>สิทธิ์ส่วนตัว</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {pages.map((item) => {
                    return (
                      <PageRowCollapse
                        key={item.id}
                        data={item}
                        onClick={handleOnSelectPage}
                        onChange={handleOnChangePageSwitch}
                        selectedId={selectedPageId}
                      />
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item xs={6}>
            {selectedPageId == "" && <Typography>กรุณาเลือก ระบบ / ฟังก์ชั่น</Typography>}
            {loadingEntities == true && <Typography>Loading...</Typography>}
            {loadingEntities == false && entities?.length == 0 && selectedPageId != "" && (
              <Typography>ไม่มีสิทธิ์เพิ่มเติม</Typography>
            )}
            {loadingEntities == false && entities?.length > 0 && (
              <TableContainer
                sx={{
                  maxHeight: "calc(100vh - 200px)",
                  // height: "100%"
                  border: (theme) => `1px solid ${theme.palette.neutralGray[20]}`
                }}
              >
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell>สิทธิ์</TableCell>
                      <TableCell width={100}>
                        <IOSSwitch
                          checked={checkAllEntity}
                          onChange={(e) =>
                            handleOnEntityChange(
                              e.target.checked,
                              []
                              // entities.map((d) => d.code)
                            )
                          }
                        />
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {entities?.map((item) => {
                      const checked = permissions[selectedPageId]?.includes(item.code) || false;
                      return (
                        <TableRow key={item.id}>
                          <TableCell>{item.name_th}</TableCell>
                          <TableCell>
                            <IOSSwitch
                              checked={checked}
                              onChange={(e) => handleOnEntityChange(e.target.checked, [item.code])}
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Grid>
        </Grid>
      </DialogContent>
      {/* <DialogActions>
            <Button variant="contained" color="primary" onClick={handleOnSubmit}>
              บันทึก
            </Button>
            <Button onClick={handleOnClose}>ยกเลิก</Button>
          </DialogActions> */}
    </Dialog>
  );
}

type PageRowCollapseProps = {
  data: PermissionPageModel;
  indent?: number;
  selectedId?: string;
  onClick?: (data: PermissionPageModel) => void;
  onChange?: (checked: boolean, data: PermissionPageModel) => void;
};

function PageRowCollapse(props: PageRowCollapseProps) {
  // statics
  const { data } = props;
  const { pages, checked } = userPermissionSetttingStore((state) => {
    const checked = state.permissions[data.id]?.includes("view") || false;

    return {
      pages: state.pages.filter((p) => p.parent_id == data.id),
      checked: checked
    };
  });

  // actions
  const handleChangeSwitch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();

    props.onChange?.(e.target.checked, data);
  };

  const handleClickRow = (e: React.MouseEvent<HTMLElement>) => {
    if (e.target instanceof HTMLInputElement) {
      return;
    }

    props.onClick?.(data);
  };

  return (
    <>
      <TableRow onClick={handleClickRow} className={props.selectedId == data.id ? "selected" : ""}>
        <TableCell>
          <Typography
            sx={{
              paddingLeft: `${(props.indent || 0) * 20}px`
            }}
          >
            {data.name_th}
          </Typography>
        </TableCell>
        <TableCell>มีสิทธิ์ใช้งาน</TableCell>
        <TableCell>
          <IOSSwitch checked={checked} onChange={handleChangeSwitch} />
        </TableCell>
      </TableRow>
      {pages.map((item) => {
        return (
          <PageRowCollapse
            key={item.id}
            data={item}
            indent={(props.indent || 0) + 1}
            onClick={props.onClick}
            onChange={props.onChange}
            selectedId={props.selectedId}
          />
        );
      })}
    </>
  );
}

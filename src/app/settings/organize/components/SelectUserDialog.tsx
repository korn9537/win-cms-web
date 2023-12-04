import { UseDialogProps } from "@/hooks/useDialog";
import { UserModel } from "@/services/graphql/models/user.model";
import { getUsers } from "@/services/graphql/user.service";
import {
  Box,
  Checkbox,
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
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useQuery } from "@tanstack/react-query";
import _ from "lodash";
import { useEffect, useMemo, useState } from "react";

type SelectUserDialogProps = {} & UseDialogProps;

export default function SelectUserDialog(props: SelectUserDialogProps) {
  // statics
  const { open, onCancel, onConfirm, title = "เลือกผู้ใช้งาน", content, data } = props;

  // states
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [search, setSearch] = useState<string>("");

  // query
  const { data: users, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: () => {
      return getUsers();
    }
  });

  useEffect(() => {
    if (open) {
      setSelectedUsers([]);
    }
  }, [open]);

  const list = useMemo(() => {
    if (!users) return [];

    const regex = new RegExp(search, "i");

    const filtered = users.filter((user: UserModel) => {
      return regex.test(user.fullname || "") || regex.test(user.code);
    });

    return filtered;
  }, [users, search]);

  // actions
  const handleOnSearch = _.debounce((value: string) => {
    setSearch(value);
  }, 500);

  const handleOnClose = () => {
    onCancel();
  };

  const handleOnSubmit = async () => {
    onConfirm(selectedUsers);
  };

  return (
    <Dialog open={open} onClose={handleOnClose} fullWidth={true}>
      <DialogTitle>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography>{title}</Typography>
          <Box width="50%">
            <TextField fullWidth placeholder="ค้นหา" onChange={(e) => handleOnSearch(e.target.value)} />
          </Box>
        </Stack>
      </DialogTitle>
      <DialogContent>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell width={50}>
                  <Checkbox
                    indeterminate={selectedUsers.length > 0 && selectedUsers.length < list.length}
                    checked={list.length > 0 && selectedUsers.length === list.length}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedUsers(list.map((user: UserModel) => user.id));
                      } else {
                        setSelectedUsers([]);
                      }
                    }}
                  />
                </TableCell>
                <TableCell width={150}>รหัส</TableCell>
                <TableCell>ชื่อ - นามสกุล</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {list.map((user: UserModel) => {
                return (
                  <TableRow key={user.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedUsers.includes(user.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedUsers([...selectedUsers, user.id]);
                          } else {
                            setSelectedUsers(selectedUsers.filter((id) => id !== user.id));
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>{user.code}</TableCell>
                    <TableCell>{user.fullname}</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="primary" onClick={handleOnSubmit}>
          บันทึก
        </Button>
        <Button onClick={handleOnClose}>ยกเลิก</Button>
      </DialogActions>
    </Dialog>
  );
}

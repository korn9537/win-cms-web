import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import {
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import { UseDialogProps } from '@/hooks/useDialog';
export interface ICustomer {
  id: string;
  name_prefix: {
    name_th: string;
    name_en: string;
  };
  first_name_th: string;
  last_name_th: string;
  status?: string;
}
export default function CustomerDialog(props: UseDialogProps) {
  const { open, onCancel, onConfirm, title, content } = props;
  const [customers, setCustomer] = useState<ICustomer[]>([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const query = useQuery({
    queryKey: ['customer', search, page, rowsPerPage],
    queryFn: async () => {
      const res = await axios.get(`/customers`, {
        params: {
          page: page,
          row_per_page: rowsPerPage,
          search: search,
        },
      });
      return res.data;
    },
  });

  const handleClose = () => {
    setCustomer([]);
    onCancel();
  };
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(1);
  };

  if (query.isLoading) return <Typography>กำลังโหลด...</Typography>;
  return (
    <Box>
      <Dialog open={open} onClose={handleClose} fullWidth={true}>
        <DialogTitle>จัดการโครงการ</DialogTitle>
        <DialogContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>คำนำหน้า</TableCell>
                  <TableCell>ชื่อลูกค้า</TableCell>
                  <TableCell>นามสกุลลูกค้า</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {query.data.data.map(
                  (item: {
                    id: string;
                    name_prefix: { name_th: string; name_en: string };
                    first_name_th: string;
                    last_name_th: string;
                  }) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <Checkbox
                          checked={customers.find((customer) => customer.id === item.id) !== undefined}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setCustomer([
                                ...customers,
                                {
                                  ...item,
                                },
                              ]);
                            } else {
                              const customerSelected = customers.filter((p) => p.id !== item.id);
                              setCustomer(customerSelected);
                            }
                          }}
                        />
                      </TableCell>
                      <TableCell>{item.name_prefix.name_th}</TableCell>
                      <TableCell>{item.first_name_th}</TableCell>
                      <TableCell>{item.last_name_th}</TableCell>
                    </TableRow>
                  ),
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            labelDisplayedRows={({ from, to, count }) => `${from}–${to} จาก ${count !== -1 ? count : `มากกว่า ${to}`}`}
            labelRowsPerPage={'แถวต่อหน้า:'}
            rowsPerPageOptions={[5, 10, 15]}
            component="div"
            count={query.data ? query.data.meta.paging.total_item : 0}
            rowsPerPage={rowsPerPage}
            page={page ? page - 1 : 0}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={(e) => onConfirm(customers)} variant="contained" color="primary">
            เพิ่ม
          </Button>
          <Button onClick={handleClose}>ปิด</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

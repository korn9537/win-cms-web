import { UseDialogProps } from '@/hooks/useDialog';
import { IPaginationResult } from '@/interfaces/pagination-result.interface';
import { IProject } from '@/interfaces/project-interface';
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
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function ProjectDialog(props: UseDialogProps) {
  const { open, onCancel, onConfirm, title, content } = props;
  const [projects, setProjects] = useState<IProject[]>([]);

  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const query = useQuery({
    queryKey: ['projects', search, page, rowsPerPage],
    queryFn: async () => {
      const res = (await axios.get(`/projects`, {
        params: {
          page: page,
          row_per_page: rowsPerPage,
          search: search,
        },
      })) as IPaginationResult;
      return res.data;
    },
  });

  useEffect(() => {
    return () => {
      setProjects([]);
    };
  }, [open]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(1);
  };

  const handleClose = () => {
    setProjects([]);
    onCancel();
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
                  <TableCell>รหัสโครงการ</TableCell>
                  <TableCell>ชื่อโครงการ</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {query.data.data.map((item: { id: string; code: string; name_th: string; name_en: string }) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Checkbox
                        checked={projects.find((project) => project.id === item.id) !== undefined}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setProjects([
                              ...projects,
                              {
                                ...item,
                              },
                            ]);
                          } else {
                            const projectSelected = projects.filter((p) => p.id !== item.id);
                            setProjects(projectSelected);
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>{item.code}</TableCell>
                    <TableCell>{item.name_th}</TableCell>
                  </TableRow>
                ))}
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
          <Button onClick={(e) => onConfirm(projects)} variant="contained" color="primary">
            เพิ่ม
          </Button>
          <Button onClick={handleClose}>ปิด</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

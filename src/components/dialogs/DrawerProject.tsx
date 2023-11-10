import { UseDialogProps } from '@/hooks/useDialog';
import { IProject } from '@/interfaces/project-interface';
import {
  Box,
  Checkbox,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import Drawer from '@mui/material/Drawer';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import AppPagination from '../layouts/AppPagination';
import ButtonSave from '../ButtonSave';
import PageNoData from '../PageNoData';
import PageToolbar from '../PageToolbar';

type DrawerDialogProps = {
  width?: string;
  //children?: React.ReactNode;
  keyId: string;
  queryKey: string;
} & UseDialogProps;

export default function DrawerProject(props: DrawerDialogProps) {
  const { open, onCancel, onConfirm, title, content, keyId, queryKey } = props;

  const [search, setSearch] = useState('');
  const [projects, setProjects] = useState<IProject[]>([]);

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const query = useQuery({
    queryKey: [queryKey, search, page, rowsPerPage],
    queryFn: async () => {
      const res = await axios.get(`/projects/list?type=${queryKey}&id=${keyId}`, {
        params: {
          page: page,
          row_per_page: rowsPerPage,
          search: search,
        },
      });
      return res.data;
    },
  });

  useEffect(() => {
    if (open) {
      setProjects([]);
      query.refetch();
    }

    return () => {};
  }, [open]);

  const handleSearchChange = _.debounce((e: React.ChangeEvent) => {
    setSearch((e.target as HTMLInputElement).value);
    setPage(1);
  }, 500);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(1);
  };

  const handleSubmit = () => {
    onConfirm(projects);
  };

  return (
    <Box>
      <Drawer
        className="drawer-bg-gray"
        PaperProps={{
          sx: { width: '70%', padding: 4 },
        }}
        anchor={'right'}
        open={open}
        onClose={onCancel}
        transitionDuration={0}
      >
        <Stack spacing={4}>
          {/* Toolbar */}
          <PageToolbar title="โครงการ" actions={null} />

          {/* Filter */}
          {/* <PageFilter>
        <TextField
          label="ค้นหา"
          placeholder="ชื่อ, นามสกุล, เลขที่บัตรประชาชน, เบอร์มือถือ"
          onChange={(e) => handleSearchChange(e)}
          fullWidth
          sx={{ maxWidth: '300px' }}
        />
        </PageFilter> */}

          {/* Table */}
          {/* Pagination */}
          <Box mt={4}>
            {!query.isLoading && query.data?.meta.paging.total_item == 0 ? (
              <PageNoData />
            ) : (
              <>
                <AppPagination
                  rowsPerPageOptions={[5, 10, 15]}
                  count={query.data ? query.data.meta.paging.total_item : 0}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                >
                  <TableContainer component={Paper}>
                    <Table className="data-align-top">
                      <TableHead>
                        <TableRow>
                          <TableCell></TableCell>
                          <TableCell>รหัสโครงการ</TableCell>
                          <TableCell>ชื่อโครงการ</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {query.data &&
                          query.data.data.map(
                            (item: { id: string; code: string; name_th: string; name_en: string }) => (
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
                                <TableCell>
                                  {item.name_th}
                                  <br />
                                  {item.name_en}
                                </TableCell>
                              </TableRow>
                            ),
                          )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </AppPagination>
                <Stack spacing={2} mt={2} direction="row">
                  <ButtonSave type="button" state="create" onClick={() => handleSubmit()} />
                </Stack>
              </>
            )}
          </Box>
        </Stack>
      </Drawer>
    </Box>
  );
}

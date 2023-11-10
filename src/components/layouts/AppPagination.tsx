import {
  ArrowBack,
  ArrowBackOutlined,
  ArrowForwardOutlined,
  ChevronLeftOutlined,
  ChevronRightOutlined,
} from '@mui/icons-material';
import { Box, Button, ButtonBase, MenuItem, Stack, TablePaginationProps, TextField, Typography } from '@mui/material';
import _ from 'lodash';

// type AppPaginationProps = {
//   size?: 'small' | 'medium';
//   count: number;
//   page: number;
//   rowsPerPage: number;
//   onPageChange?: (e: React.MouseEvent, page: number) => void;
//   onRowsPerPageChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
// };

export type AppPaginationProps = {
  children?: React.ReactNode;
  loading?: boolean;
  disabledBottomPaging?: boolean;
  title?: string;
} & TablePaginationProps;

const DEFAULT_SIZE = 'small';
const DEFAULT_PAGE = 1;
const DEFAULT_ROW_PER_PAGE = 10;
const DEFAULT_ROW_PER_PAGE_OPTIONS = [10, 20, 50, 100];
const DEFAULT_COUNT = 0;
const DEFAULT_LOADING = false;

export default function AppPagination({ disabledBottomPaging = false, ...props }: AppPaginationProps) {
  const {
    // size = DEFAULT_SIZE,
    page = DEFAULT_PAGE,
    rowsPerPage = DEFAULT_ROW_PER_PAGE,
    // rowsPerPageOptions = DEFAULT_ROW_PER_PAGE_OPTIONS,
    count = DEFAULT_COUNT,
    loading = DEFAULT_LOADING,
  } = props;

  let maxPage = Math.ceil(count / rowsPerPage);

  const handleClickNext = () => {
    if (page < maxPage) {
      props.onPageChange && props.onPageChange(null, page + 1);
    }
  };

  const handleClickPrev = () => {
    if (page > 1) {
      props.onPageChange && props.onPageChange(null, page - 1);
    }
  };

  return (
    <Stack direction="column" spacing={3}>
      {loading && (
        <Box>
          <Typography>กำลังโหลด...</Typography>
        </Box>
      )}
      {/* {loading == false && count == 0 && <Box>ไม่มีข้อมูล</Box>} */}
      {loading == false && count > 0 && (
        <Stack direction="row" justifyContent="space-between">
          {props.title ? (
            <Typography variant="body_S">{props.title}</Typography>
          ) : (
            <Typography variant="body_S">{count} รายการ</Typography>
          )}

          {maxPage > 1 && (
            <Stack direction="row" alignItems="center" spacing={1}>
              <ButtonBase onClick={handleClickPrev}>
                <ArrowBackOutlined />
              </ButtonBase>
              <Typography variant="body_S">
                {page > maxPage ? maxPage : page}/{maxPage}
              </Typography>
              <ButtonBase onClick={handleClickNext}>
                <ArrowForwardOutlined />
              </ButtonBase>
            </Stack>
          )}
        </Stack>
      )}
      {props.children && <Box>{props.children}</Box>}
      {/*  */}
      {disabledBottomPaging == false && <PaginationBase {...props} />}
    </Stack>
  );
}

export function PaginationBase(props: TablePaginationProps) {
  const btnStyled = {
    '&': {
      minWidth: 0,
      padding: 1,
    },
  };

  const {
    size = DEFAULT_SIZE,
    page = DEFAULT_PAGE,
    rowsPerPage = DEFAULT_ROW_PER_PAGE,
    rowsPerPageOptions = DEFAULT_ROW_PER_PAGE_OPTIONS,
    count = DEFAULT_COUNT,
    // loading = DEFAULT_LOADING,
  } = props;

  let maxPage = Math.ceil(count / rowsPerPage);

  const handleClickNext = () => {
    if (page < maxPage) {
      props.onPageChange && props.onPageChange(null, page + 1);
    }
  };

  const handleClickPrev = () => {
    if (page > 1) {
      props.onPageChange && props.onPageChange(null, page - 1);
    }
  };

  let start = 1;
  let end = rowsPerPage;

  if (page > 1) {
    start = (page - 1) * rowsPerPage + 1;
    end = start + rowsPerPage - 1;
  }

  if (end > count) {
    end = count;
  }

  // if (end < start) {
  //   end = start;
  // }

  if (count == 0) {
    return null;
  }

  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Stack spacing={2} direction="row" alignItems="center">
        <TextField
          select
          value={rowsPerPage}
          sx={{
            width: 90,
            bgcolor: '#fff',
          }}
          size={size}
          onChange={(e) => {
            props.onRowsPerPageChange && props.onRowsPerPageChange(e);
          }}
        >
          {rowsPerPageOptions?.map((item) => {
            if (typeof item == 'number') {
              return (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              );
            }
            return (
              <MenuItem key={_.uniqueId('opt-')} value={item.value}>
                {item.label}
              </MenuItem>
            );
          })}
        </TextField>
        <Typography variant="body_S">
          แสดง {start}-{end} จาก {count}
        </Typography>
      </Stack>
      {maxPage > 1 && (
        <Stack direction="row" alignItems="center" spacing={2}>
          <TextField
            sx={{ width: 60, bgcolor: '#fff' }}
            inputProps={{
              sx: {
                textAlign: 'center',
              },
            }}
            value={page}
            onChange={(e) => {
              let result = Number(e.target.value);

              if (result < 1) {
                result = 1;
              } else if (result > maxPage) {
                result = maxPage;
              }

              props.onPageChange && props.onPageChange(null, result);
            }}
            size={size}
          />
          <Typography variant="body_S">จาก {maxPage}</Typography>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Button sx={btnStyled} color="inherit" size={size} onClick={handleClickPrev}>
              <ChevronLeftOutlined />
            </Button>
            <Button sx={btnStyled} color="inherit" size={size} onClick={handleClickNext}>
              <ChevronRightOutlined />
            </Button>
          </Stack>
        </Stack>
      )}
    </Stack>
  );
}

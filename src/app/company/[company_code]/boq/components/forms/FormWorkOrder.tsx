import EmptyDataPanel from "@/components/EmptyDataPanel";
import FormContainer, { FormContainerProps } from "@/components/forms/FormContainer";
import { SPACING_FORM } from "@/constants/layout.constant";
import { Typography, Box, Stack, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { CollapseCard } from "../CollapseCard";
import { CollapseGroup } from "../CollapseGroup";

export const defaultFormWorkOrderValues: FormWorkOrderValues = {};

export type FormWorkOrderValues = {};

type FormWorkOrderProps = {
  disabled?: boolean;
} & FormContainerProps;

export default function FormWorkOrder({
  title = "วัสดุและค่าแรงงานตัดจ่าย",
  disabled = false,
  ...props
}: FormWorkOrderProps) {
  return (
    <FormContainer title={title} {...props}>
      <CollapseGroup spacing={SPACING_FORM}>
        <CollapseCard
          title="1 หมวดงานโครงสร้าง"
          action={<Typography variant="body_M_B">57,500.75</Typography>}
          open
          titleProps={{
            sx: {
              bgcolor: "#F5F6F8",
              borderBottom: "1px solid",
              borderColor: "neutralGray.20"
            }
          }}
          bodyProps={{
            sx: {
              bgcolor: "neutralGray.10"
            }
          }}
        >
          <CollapseGroup>
            <CollapseCard
              title="1.1 งานโครงสร้างคอนกรีตเสริมเหล็ก"
              action={<Typography variant="body_M_B">57,500.75</Typography>}
              titleProps={{
                sx: {
                  bgcolor: "neutralGray.20",
                  borderBottom: "1px solid",
                  borderColor: "neutralGray.10"
                }
              }}
              bodyProps={{
                sx: {
                  bgcolor: "#fff"
                }
              }}
              open
              disabledPadding
            >
              <TableExample />
            </CollapseCard>
            <CollapseCard
              title="1.2 งานโครงสร้างคอนกรีตเสริมเหล็ก"
              action={<Typography variant="body_M_B">57,500.75</Typography>}
              titleProps={{
                sx: {
                  bgcolor: "neutralGray.20",
                  borderBottom: "1px solid",
                  borderColor: "neutralGray.10"
                }
              }}
              bodyProps={{
                sx: {
                  bgcolor: "#fff"
                }
              }}
              // open
              disabledPadding
            >
              <TableExample />
            </CollapseCard>
            <CollapseCard
              title="1.3 งานโครงสร้างคอนกรีตเสริมเหล็ก"
              action={<Typography variant="body_M_B">57,500.75</Typography>}
              titleProps={{
                sx: {
                  bgcolor: "neutralGray.20",
                  borderBottom: "1px solid",
                  borderColor: "neutralGray.10"
                }
              }}
              bodyProps={{
                sx: {
                  bgcolor: "#fff"
                }
              }}
              // open
              disabledPadding
            >
              <TableExample />
            </CollapseCard>
          </CollapseGroup>
        </CollapseCard>
      </CollapseGroup>
      <Box mt={SPACING_FORM}>
        <Stack alignItems="center" justifyContent="space-between" direction="row">
          <Typography variant="body_M_B">รวมรายการวัสดุที่บริษัทจัดซื้อทั้งสิ้น</Typography>
          <Typography variant="body_M_B">2,190.00 บาท</Typography>
        </Stack>
      </Box>
    </FormContainer>
  );
}
function TableExample() {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>ชื่อหัวข้อ</TableCell>
          <TableCell align="right">จำนวน</TableCell>
          <TableCell>หน่วย</TableCell>
          <TableCell align="right">{`ราคาวัสดุ/หน่วย (บาท)`}</TableCell>
          <TableCell align="right">รวมราคาวัสดุ</TableCell>
          <TableCell align="right">{`ค่าแรง/หน่วย (บาท)`}</TableCell>
          <TableCell align="right">รวมค่าแรง</TableCell>
          <TableCell align="right">{`รวมทั้งสิ้น (บาท)`}</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>ตัดหัวเสาเข็ม I-0.22x0.22 m.</TableCell>
          <TableCell align="right">16.00</TableCell>
          <TableCell>ต้น</TableCell>
          <TableCell align="right">40.00</TableCell>
          <TableCell align="right">640.00</TableCell>
          <TableCell align="right">150.00</TableCell>
          <TableCell align="right">2,400.00</TableCell>
          <TableCell align="right">3,040.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>งานวางผังบ้าน</TableCell>
          <TableCell align="right">1.00</TableCell>
          <TableCell>เหมา</TableCell>
          <TableCell align="right"></TableCell>
          <TableCell align="right"></TableCell>
          <TableCell align="right">2,500.00</TableCell>
          <TableCell align="right">2,500.00</TableCell>
          <TableCell align="right">2,500.00</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

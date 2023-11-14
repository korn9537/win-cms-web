import EmptyDataPanel from "@/components/EmptyDataPanel";
import FormContainer, { FormContainerProps } from "@/components/forms/FormContainer";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

export const defaultFormSummaryValues: FormSummaryValues = {};

export type FormSummaryValues = {};

type FormSummaryProps = {
  disabled?: boolean;
} & FormContainerProps;

export default function FormSummary({ title = "สรุปต้นทุน", disabled = false, ...props }: FormSummaryProps) {
  return (
    <FormContainer title={title} {...props}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>รายละเอียด</TableCell>
              <TableCell width={200} align="right">
                จำนวนเงิน
              </TableCell>
              <TableCell width={120}>หน่วย</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>รายการประมาณค่าวัสดุและค่าแรงงาน</TableCell>
              <TableCell align="right">1,159,199.16</TableCell>
              <TableCell>บาท</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>รายการวัสดุที่บริษัทจัดซื้อ</TableCell>
              <TableCell align="right">35,8729.77</TableCell>
              <TableCell>บาท</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>รายการวัสดุและค่าแรงงานตัดจ่าย</TableCell>
              <TableCell align="right">90,886.77</TableCell>
              <TableCell>บาท</TableCell>
            </TableRow>
            <TableRow
              sx={{
                "& td": { borderBottom: "none", paddingBottom: 1 }
              }}
            >
              <TableCell
                sx={{
                  fontWeight: "bold"
                }}
              >
                รวมราคาต้นทุน
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  fontWeight: "bold"
                }}
              >
                1,608,815.70
              </TableCell>
              <TableCell>บาท</TableCell>
            </TableRow>
            <TableRow
              sx={{
                "& td": { borderBottom: "none", paddingTop: 1 }
              }}
            >
              <TableCell
                sx={{
                  fontWeight: "bold"
                }}
              >
                ราคาเฉลี่ย/ตร.ม.
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  fontWeight: "bold"
                }}
              >
                11,010.98
              </TableCell>
              <TableCell>บาท/ตร.ม.</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </FormContainer>
  );
}

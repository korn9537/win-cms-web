import FormContainer, { FormContainerProps } from "@/components/forms/FormContainer";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import numeral from "numeral";
import { BoqItem, BoqItemGroup, useBoqCreateStore } from "../../stores/boq-create.store";

export const defaultFormSummaryValues: FormSummaryValues = {};

export type FormSummaryValues = {};

type FormSummaryProps = {
  disabled?: boolean;
} & FormContainerProps;

export default function FormSummary({ title = "สรุปต้นทุน", disabled = false, ...props }: FormSummaryProps) {
  //
  const { total, total_owner_unit, total_owner_work, grand_total, average_price } = useBoqCreateStore((state) => {
    let total = 0;
    let total_owner_unit = 0;
    let total_owner_work = 0;
    let grand_total = 0;
    let average_price = 0;

    state.itemKeys.forEach((key) => {
      const item = state.itemByKey[key] as BoqItem;

      if (item.type == "material") {
        // owner
        if (item.work_rate_by_owner) {
          total_owner_work =
            numeral(total_owner_work)
              .add(item.unit_rate_total || 0)
              .add(item.work_rate_total || 0)
              .value() || 0;
        } else {
          if (item.unit_rate_by_owner) {
            total_owner_unit =
              numeral(total_owner_unit)
                .add(item.unit_rate_total || 0)
                .value() || 0;
          } else {
            total =
              numeral(total)
                .add(item.total || 0)
                .value() || 0;
          }
        }
      }
    });

    //
    grand_total = numeral(total_owner_unit).add(total_owner_work).add(total).value() || 0;
    average_price = numeral(grand_total).divide(state.info.total_area).value() || 0;

    return {
      total,
      total_owner_unit,
      total_owner_work,
      grand_total,
      average_price
    };
  });

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
              <TableCell width={120} align="right">
                หน่วย
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>รายการประมาณค่าวัสดุและค่าแรงงาน</TableCell>
              <TableCell align="right">{numeral(total).format("0,0.00")}</TableCell>
              <TableCell align="right">บาท</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>รายการวัสดุที่บริษัทจัดซื้อ</TableCell>
              <TableCell align="right">{numeral(total_owner_unit).format("0,0.00")}</TableCell>
              <TableCell align="right">บาท</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>รายการวัสดุและค่าแรงงานตัดจ่าย</TableCell>
              <TableCell align="right">{numeral(total_owner_work).format("0,0.00")}</TableCell>
              <TableCell align="right">บาท</TableCell>
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
                {numeral(grand_total).format("0,0.00")}
              </TableCell>
              <TableCell align="right">บาท</TableCell>
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
                {numeral(average_price).format("0,0.00")}
              </TableCell>
              <TableCell align="right">บาท/ตร.ม.</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </FormContainer>
  );
}

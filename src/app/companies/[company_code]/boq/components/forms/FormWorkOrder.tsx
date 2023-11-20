import FormContainer, { FormContainerProps } from "@/components/forms/FormContainer";
import themeConfig from "@/configs/theme.config";
import { SPACING_FORM } from "@/constants/layout.constant";
import { Box, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography, useTheme } from "@mui/material";
import numeral from "numeral";
import { BoqItemGroup, BoqItemMaterial, useBoqCreateStore } from "../../stores/boq-create.store";
import { BoxActionType, BoxActions } from "./BoxActions";
import { useState } from "react";

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
  //
  const { rootKeys, summary } = useBoqCreateStore((state) => {
    let summary: number = 0;
    let rootKeys: string[] = [];

    state.rootKeys.forEach((key: string) => {
      const item = state.itemByKey[key] as BoqItemGroup;

      if ((item.owner_work_total || 0) > 0) {
        summary =
          numeral(summary)
            .add(item.total || 0)
            .value() || 0;

        rootKeys.push(key);
      }
    });

    return {
      rootKeys: rootKeys || [],
      itemByKey: state.itemByKey,
      summary: summary || 0
    };
  });

  return (
    <FormContainer title={title} {...props}>
      <Box
        className="boq-table"
        sx={{
          ...themeConfig.typography.body_M,
          borderRadius: "12px",
          overflow: "hidden",
          border: "1px solid",
          borderColor: (theme) => theme.palette.neutralGray[20]
        }}
      >
        {/* Header Sticky */}
        <Box
          className="boq-row boq-header"
          sx={{
            bgcolor: (theme) => theme.palette.neutralGray[40],
            borderBottom: "1px solid",
            borderColor: (theme) => theme.palette.common.white
          }}
        >
          <Box>ชื่อหัวข้อ</Box>
          <Box>จำนวน</Box>
          <Box>หน่วย</Box>
          <Box>ราคาวัสดุ/หน่วย (บาท)</Box>
          <Box>รวมราคาวัสดุ (บาท)</Box>
          <Box>ค่าแรง/หน่วย (บาท)</Box>
          <Box>รวมค่าแรง (บาท)</Box>
          <Box>รวมทั้งสิ้น (บาท)</Box>
          <Box></Box>
        </Box>
        {/*  */}
        {rootKeys.map((rootId: string) => {
          return <BoqGroup key={rootId} itemId={rootId} />;
        })}
      </Box>
      <Box mt={SPACING_FORM}>
        <Stack alignItems="center" justifyContent="space-between" direction="row">
          <Typography variant="body_M_B">รวมรายการวัสดุที่บริษัทจัดซื้อทั้งสิ้น</Typography>
          <Typography variant="body_M_B">{numeral(summary).format("0,0.00")} บาท</Typography>
        </Stack>
      </Box>
    </FormContainer>
  );
}

function BoqGroup({
  itemId,
  onClick,
  onEdit,
  open = true
}: {
  itemId: string;
  onClick?: (addType: string, parentId: string | null, itemType?: "group" | "material" | null) => void;
  onEdit?: (itemId: string) => void;
  open?: boolean;
}) {
  // statics
  const theme = useTheme();

  // states
  const [openChild, setOpenChild] = useState(open);

  const { itemByKey, removeItem } = useBoqCreateStore((state) => ({
    itemByKey: state.itemByKey,
    removeItem: state.removeItem
  }));
  const item = itemByKey[itemId] as BoqItemGroup;

  let bgColor = theme.palette.neutralGray[40];

  switch (item.level) {
    case 1:
      bgColor = theme.palette.neutralGray[40];
      break;
    case 2:
      bgColor = theme.palette.neutralGray[20];
      break;
    case 2:
      bgColor = "#F4F4F4";
      break;
    default:
      bgColor = "#F5F6F8";
      break;
  }

  const handleOnClickAction = (action: BoxActionType) => {
    switch (action) {
      case "collapse":
        setOpenChild(!openChild);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Box
        className="boq-row boq-group"
        sx={{
          bgcolor: bgColor,
          borderBottom: "1px solid",
          borderColor: (theme) => theme.palette.common.white
        }}
      >
        <Box>
          {item.number} {item.name}
        </Box>
        <Box></Box>
        <Box></Box>
        <Box></Box>
        <Box>{numeral(item.unit_rate_total).format("0,0.00")}</Box>
        <Box></Box>
        <Box>{numeral(item.work_rate_total).format("0,0.00")}</Box>
        <Box>{numeral(item.total).format("0,0.00")}</Box>
        <Box>
          <BoxActions onClick={handleOnClickAction} isOpen={openChild} />
        </Box>
      </Box>

      <Box
        sx={{
          display: openChild ? "block" : "none"
        }}
      >
        {item.material_childs?.map((childId: string) => {
          return <BoqMaterial key={childId} itemId={childId} onClick={onClick} onEdit={onEdit} />;
        })}

        {item.group_childs?.map((childId: string) => {
          return <BoqGroup key={childId} itemId={childId} onClick={onClick} onEdit={onEdit} />;
        })}
      </Box>
    </>
  );
}

function BoqMaterial({
  itemId,
  onClick,
  onEdit
}: {
  itemId: string;
  onClick?: (addType: string, parentId: string | null, itemType?: "group" | "material" | null) => void;
  onEdit?: (itemId: string) => void;
}) {
  const { item, removeItem } = useBoqCreateStore((state) => ({
    item: state.itemByKey[itemId] as BoqItemMaterial,
    removeItem: state.removeItem
  }));

  const handleOnClickAction = (action: BoxActionType) => {};

  return (
    <Box className="boq-row boq-material">
      <Box>
        <Typography
          noWrap
          sx={{ width: "100%", position: "absolute", inset: 0 }}
        >{`${item.item_code}: ${item.item_name} ${item.name}`}</Typography>
      </Box>
      <Box>{item.quantity}</Box>
      <Box>{item.unit_name}</Box>
      <Box>{numeral(item.unit_rate).format("0,0.00")}</Box>
      <Box>{numeral(item.unit_rate_total).format("0,0.00")}</Box>
      <Box>{numeral(item.work_rate).format("0,0.00")}</Box>
      <Box>{numeral(item.work_rate_total).format("0,0.00")}</Box>
      <Box>{numeral(item.unit_rate_total).add(item.work_rate_total).format("0,0.00")}</Box>
      <Box>
        <BoxActions onClick={handleOnClickAction} hideAction hideCollaspe />
      </Box>
    </Box>
  );
}

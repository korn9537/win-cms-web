import EmptyDataPanel from "@/components/EmptyDataPanel";
import FormContainer, { FormContainerProps } from "@/components/forms/FormContainer";
import themeConfig from "@/configs/theme.config";
import { useDialog } from "@/hooks/useDialog";
import { Box, Chip, Stack, Typography, useTheme } from "@mui/material";
import numeral from "numeral";
import { useState } from "react";
import { BoqItemGroup, BoqItemMaterial, useBoqCreateStore } from "../../stores/boq-create.store";
import BoqItemDialog from "../dialogs/BoqItemDialog";
import { BoxActionType, BoxActions } from "./BoxActions";
import { SPACING_FORM } from "@/constants/layout.constant";

export const defaultFormEstimateCostValues: FormEstimateCostValues = {};

export type FormEstimateCostValues = {};

type FormEstimateCostProps = {
  disabled?: boolean;
} & FormContainerProps;

export default function FormEstimateCost({
  title = "รายการประมาณค่าวัสดุและค่าแรงงาน",
  disabled = false,
  ...props
}: FormEstimateCostProps) {
  // statics
  const { rootKeys, itemByKey, summary } = useBoqCreateStore((state) => ({
    rootKeys: state.rootKeys,
    itemByKey: state.itemByKey,
    summary: state.rootKeys.reduce((sum: number, key: string) => {
      const item = state.itemByKey[key] as BoqItemGroup;
      return (
        numeral(sum)
          .add(item.total || 0)
          .value() || 0
      );
    }, 0)
  }));

  const info = useBoqCreateStore((state) => state.info);

  const dialogAdd = useDialog({
    onConfirm(data, dialog, res) {
      // console.log(data);
      dialog.close();
    },
    onCancel(data, dialog) {}
  });

  // actions
  const handleClickAdd = (
    levelType: "child" | "same" | string,
    parentId: string | null,
    itemType?: "group" | "material" | null
  ) => {
    dialogAdd.open(null, null, {
      levelType,
      parentId,
      itemType
    });
  };

  const handleClickEdit = (itemId: string) => {
    const item = itemByKey[itemId];

    dialogAdd.open(null, null, {
      parentId: item.parent_id,
      editData: item
    });
  };

  // render

  let content = null;

  if (rootKeys.length == 0) {
    content = <EmptyDataPanel onClick={() => handleClickAdd("child", null, "group")} />;
  } else {
    content = (
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
          return <BoqGroup key={rootId} itemId={rootId} onClick={handleClickAdd} onEdit={handleClickEdit} />;
        })}
      </Box>
    );
  }

  return (
    <>
      <FormContainer title={title} {...props}>
        {content}
        <Box mt={SPACING_FORM}>
          <Stack alignItems="center" justifyContent="space-between" direction="row">
            <Typography variant="body_M_B">รวมรายการวัสดุที่บริษัทจัดซื้อทั้งสิ้น</Typography>
            <Typography variant="body_M_B">{numeral(summary).format("0,0.00")} บาท</Typography>
          </Stack>
        </Box>
      </FormContainer>
      {/* Dialogs */}
      <BoqItemDialog {...dialogAdd.dialogProps} title="เพิ่มข้อมูลรายการประมาณค่าวัสดุและแรงงาน" />
    </>
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
      case "add_same":
        onClick?.("same", item.parent_id);
        break;
      case "add_child":
        onClick?.("child", item.id);
        break;
      case "edit":
        onEdit?.(item.id);
        break;
      case "delete":
        removeItem(item.id);
        break;
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
        className="boq-row boq-group boq-group-hover"
        sx={{
          bgcolor: bgColor,
          borderBottom: "1px solid",
          borderColor: (theme) => theme.palette.common.white
        }}
        onClick={() => handleOnClickAction("collapse")}
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

  // const { item, parent } = useBoqCreateStore((state) => {
  //   const item = state.itemByKey[itemId] as BoqItemMaterial;
  //   const parent = state.itemByKey[item.parent_id];
  //   return {
  //     item,
  //     parent
  //   };
  // });

  const unit_rate = numeral(item.unit_rate).format("0,0.00");
  const work_rate = numeral(item.work_rate).format("0,0.00");

  const handleOnClickAction = (action: BoxActionType) => {
    switch (action) {
      case "add_same":
        onClick?.("same", item.parent_id, "material");
        break;
      case "edit":
        onEdit?.(itemId);
        break;
      case "delete":
        removeItem(itemId);
        break;
      default:
        break;
    }
  };

  return (
    <Box className="boq-row boq-material boq-material-hover">
      <Box>
        <Typography
          noWrap
          sx={{ width: "100%", position: "absolute", inset: 0 }}
        >{`${item.item_code}: ${item.item_name} ${item.name}`}</Typography>
      </Box>
      <Box>{item.quantity}</Box>
      <Box>{item.unit_name}</Box>
      <Box>
        {item.unit_rate_by_owner ? (
          <Chip label={unit_rate} size="small" sx={{ bgcolor: (theme) => theme.palette.green[10] }} />
        ) : (
          unit_rate
        )}
      </Box>
      <Box>{numeral(item.unit_rate_total).format("0,0.00")}</Box>
      <Box>
        {item.work_rate_by_owner ? (
          <Chip label={work_rate} size="small" sx={{ bgcolor: (theme) => theme.palette.red[10] }} />
        ) : (
          work_rate
        )}
      </Box>
      <Box>{numeral(item.work_rate_total).format("0,0.00")}</Box>
      <Box>{numeral(item.unit_rate_total).add(item.work_rate_total).format("0,0.00")}</Box>
      <Box>
        <BoxActions onClick={handleOnClickAction} hideAddChild hideCollaspe />
      </Box>
    </Box>
  );
}

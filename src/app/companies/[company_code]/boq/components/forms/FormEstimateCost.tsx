import EmptyDataPanel from "@/components/EmptyDataPanel";
import { IconAdd } from "@/components/Icons";
import FormContainer, { FormContainerProps } from "@/components/forms/FormContainer";
import themeConfig from "@/configs/theme.config";
import { useDialog } from "@/hooks/useDialog";
import { Box, IconButton } from "@mui/material";
import numeral from "numeral";
import { BoqItemGroup, BoqItemMaterial, useBoqCreateStore } from "../../stores/boq-create.store";
import BoqItemDialog from "../dialogs/BoqItemDialog";
// import { getCostCodes } from "@/services/graphql/masters/costcode.service";

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
  const { rootKeys, itemByKey } = useBoqCreateStore((state) => ({
    rootKeys: state.rootKeys,
    itemByKey: state.itemByKey
  }));

  const dialogAdd = useDialog({
    onConfirm(data, dialog, res) {
      // console.log(data);
      dialog.close();
    },
    onCancel(data, dialog) {}
  });

  // console.log(rootKeys, itemByKey);

  // actions
  const handleClickAdd = (
    levelType: "child" | "same" | string,
    parentId: string | null,
    itemType?: "group" | "material"
  ) => {
    console.log("handleClickAdd", levelType, parentId, itemType);

    dialogAdd.open(null, null, {
      levelType,
      parentId,
      itemType
    });
  };

  // render

  let content = null;

  if (rootKeys.length == 0) {
    content = <EmptyDataPanel onClick={() => handleClickAdd("child", null)} />;
  } else {
    content = (
      <Box
        className="boq-table"
        sx={{
          ...themeConfig.typography.body_M
        }}
      >
        {/* Header Sticky */}
        <Box
          className="boq-row boq-header"
          sx={{
            bgcolor: (theme) => theme.palette.neutralGray[40]
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
          return (
            <BoqGroup key={rootId} itemId={rootId} onClick={(addType, parentId) => handleClickAdd(addType, parentId)} />
          );
        })}
      </Box>
    );
  }

  return (
    <>
      <FormContainer title={title} {...props}>
        {content}
      </FormContainer>
      {/* Dialogs */}
      <BoqItemDialog {...dialogAdd.dialogProps} title="เพิ่มข้อมูลรายการประมาณค่าวัสดุและแรงงาน" />
    </>
  );
}

function BoqGroup({
  itemId,
  onClick
}: {
  itemId: string;
  onClick?: (addType: string, parentId: string | null) => void;
}) {
  const itemByKey = useBoqCreateStore((state) => state.itemByKey);
  const item = itemByKey[itemId] as BoqItemGroup;

  return (
    <>
      <Box
        className="boq-row boq-group"
        sx={{
          bgcolor: (theme) => theme.palette.neutralGray[40]
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
          <IconButton
            size="small"
            sx={{
              svg: {
                width: 16,
                height: 16
              }
            }}
            onClick={() => onClick?.("same", item.parent_id)}
          >
            <IconAdd />
          </IconButton>

          <IconButton
            size="small"
            sx={{
              svg: {
                width: 16,
                height: 16
              },
              ml: 1
            }}
            onClick={() => onClick?.("child", item.id)}
          >
            <IconAdd />
          </IconButton>
        </Box>
      </Box>
      {item.material_childs?.map((childId: string) => {
        return <BoqMaterial key={childId} itemId={childId} onClick={onClick} />;
      })}

      {item.group_childs?.map((childId: string) => {
        return <BoqGroup key={childId} itemId={childId} onClick={onClick} />;
      })}

      {/* {item.childs.map((childId: string) => {
        const child = itemByKey[childId];
        if (child.type == "group") {
          return <BoqGroup key={childId} itemId={childId} onClick={onClick} />;
        }
        return <BoqMaterial key={childId} itemId={childId} onClick={onClick} />;
      })} */}
    </>
  );
}

function BoqMaterial({
  itemId,
  onClick
}: {
  itemId: string;
  onClick?: (addType: string, parentId: string | null) => void;
}) {
  const item = useBoqCreateStore((state) => state.itemByKey[itemId]) as BoqItemMaterial;

  return (
    <Box className="boq-row boq-material">
      <Box>{`${item.item_code} ${item.item_name} ${item.name}`}</Box>
      <Box>{item.quantity}</Box>
      <Box>{item.unit_name}</Box>
      <Box>{numeral(item.unit_rate).format("0,0.00")}</Box>
      <Box>{numeral(item.unit_rate_total).format("0,0.00")}</Box>
      <Box>{numeral(item.work_rate).format("0,0.00")}</Box>
      <Box>{numeral(item.work_rate_total).format("0,0.00")}</Box>
      <Box>{numeral(item.unit_rate_total).add(item.work_rate_total).format("0,0.00")}</Box>
      <Box>
        <IconButton
          size="small"
          sx={{
            svg: {
              width: 16,
              height: 16
            }
          }}
          onClick={() => onClick?.("same", item.parent_id)}
        >
          <IconAdd />
        </IconButton>

        <IconButton
          size="small"
          sx={{
            svg: {
              width: 16,
              height: 16
            },
            ml: 1
          }}
          onClick={() => onClick?.("child", item.id)}
        >
          <IconAdd />
        </IconButton>
      </Box>
    </Box>
  );
}

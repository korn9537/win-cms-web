"use client";

import ButtonAdd from "@/components/ButtonAdd";
import EmptyDataPanel from "@/components/EmptyDataPanel";
import PageLayout from "@/components/PageLayout";
import PagePaper from "@/components/PagePaper";
import { SPACING_LAYOUT } from "@/constants/layout.constant";
import { useDialog } from "@/hooks/useDialog";
import { OrganizeModel } from "@/services/graphql/models/organize.model";
import { TreeViewModel, convertOrganizeListToTree, getOrganizeList } from "@/services/graphql/organize.service";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import StarsRoundedIcon from "@mui/icons-material/StarsRounded";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { TreeView } from "@mui/x-tree-view";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import CreateBuDialog from "./components/CreateBuDialog";
import { StyledTreeItem } from "./components/StyleTreeItem";

export default function SettingOrganizePage() {
  // statics
  const dialogBu = useDialog({
    onConfirm(data, dialog, res) {
      console.log({
        data,
        dialog,
        res
      });

      dialog.close();
      //
      refetch();
    },
    onCancel(data, dialog) {
      dialog.close();
    }
  });

  // states
  const [expanded, setExpanded] = useState<string[]>([]);
  const [selected, setSelected] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("");

  // query
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["organize", "list"],
    queryFn: async () => {
      const items = await getOrganizeList(null);
      const tree = convertOrganizeListToTree("MBS BIZ", items);
      return {
        items,
        tree
      } as {
        items: OrganizeModel[];
        tree: TreeViewModel;
      };
    }
  });

  // actions
  const handleToggle = (event: React.SyntheticEvent, nodeIds: string[]) => {
    setExpanded(nodeIds);
  };

  const handleSelect = (event: React.SyntheticEvent, nodeId: string) => {
    setSelected(nodeId);
    //
    const item = data?.items.find((item) => item.id == nodeId);
    setSelectedType(item?.type || "");
  };

  const handleOnActionClick = (action: string, node: TreeViewModel) => {
    // console.log({
    //   action,
    //   node
    // });
    //
    if (action == "add") {
      dialogBu.open("สร้าง BU", null, {
        action: action,
        parent: node,
        node: null
      });
    }

    if (action == "edit") {
      dialogBu.open("แก้ไข BU", null, {
        action: action,
        parent: null,
        node: node
      });
    }

    if (action == "expand") {
      setExpanded([...expanded, node.id]);
    }

    if (action == "collapse") {
      setExpanded(expanded.filter((id) => id != node.id));
    }

    // if (action == "delete") {
    //   dialogBu.open("ลบ BU", null, {
    //     action: action,
    //     parent: null,
    //     node: node
    //   });
    // }
  };

  // console.log({
  //   data,
  //   isLoading
  // });

  const renderTree = (nodes: TreeViewModel) => (
    <StyledTreeItem
      key={nodes.id}
      nodeId={nodes.id}
      labelText={nodes.name}
      onActionClick={(action) => handleOnActionClick(action, nodes)}
    >
      {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}
    </StyledTreeItem>
  );

  return (
    <PageLayout
      type="detail"
      toolbar={{
        title: "Organizational Unit"
      }}
    >
      <Grid container spacing={SPACING_LAYOUT}>
        <Grid item xs={6}>
          <PagePaper sx={{ height: "100%" }}>
            <TreeView
              aria-label="Organize Tree"
              defaultCollapseIcon={<ExpandMoreIcon />}
              defaultExpandIcon={<ChevronRightIcon />}
              // sx={{ height: 240, flexGrow: 1, overflowY: "auto" }}
              sx={{ flexGrow: 1, overflowY: "auto", minHeight: 600 }}
              selected={selected}
              expanded={expanded}
              onNodeSelect={handleSelect}
              // onNodeToggle={handleToggle}
            >
              {data && renderTree(data.tree)}
            </TreeView>
          </PagePaper>
        </Grid>
        <Grid item xs={6}>
          <PagePaper sx={{ height: "100%" }}>
            <PanelInfo
              parentType={selectedType}
              list={
                data?.items
                  .filter((item) => item.parent_id === (selected == "root" ? null : selected))
                  .sort((a, b) => {
                    if (a.type == "position" && b.type != "position") {
                      return -1;
                    }
                    if (a.type == b.type) {
                      return 1;
                    }
                    return 0;
                  }) || []
              }
              onClickAdd={() => {
                dialogBu.open();
              }}
            />
            {/* {data?.items
              .filter((item) => item.parent_id === (selected == "root" ? null : selected))
              .sort((a, b) => {
                if (a.type == "position" && b.type != "position") {
                  return -1;
                }
                if (a.type == b.type) {
                  return 1;
                }
                return 0;
              })
              .map((item) => (
                <Box key={item.id}>{item.name_th}</Box>
              ))} */}
          </PagePaper>
        </Grid>
      </Grid>
      {/*  */}
      <CreateBuDialog {...dialogBu.dialogProps} />
    </PageLayout>
  );
}

type PanelInfoProps = {
  parentType: string;
  list: OrganizeModel[];
  onClickAdd?: () => void;
};

function PanelInfo(props: PanelInfoProps) {
  // console.log("parentType", props.parentType);

  return (
    <Box>
      {/* action */}
      {props.parentType != "" && (
        <Stack direction="row" spacing={1}>
          {/* <ButtonAdd onClick={props.onClickAdd} text="เพิ่มแผนก" />
        <ButtonAdd onClick={props.onClickAdd} text="เพิ่มฝ่าย" />
        <ButtonAdd onClick={props.onClickAdd} text="เพิ่มตำแหน่ง" /> */}
          <ButtonAdd onClick={props.onClickAdd} text="เพิ่มผู้ใช้งาน" />
        </Stack>
      )}

      {props.list.length == 0 && <EmptyDataPanel onClick={props.parentType == "" ? undefined : props.onClickAdd} />}

      {/* data */}
      {props.list.length > 0 &&
        props.list.map((item) => (
          <Box key={item.id}>
            <Stack direction="row" spacing={1}>
              {item.type == "position" && <StarsRoundedIcon />}
              {item.type == "department" && <GroupsRoundedIcon />}
              {item.type == "division" && <GroupsRoundedIcon />}
              <Typography>{item.name_th}</Typography>
            </Stack>
          </Box>
        ))}
    </Box>
  );
}

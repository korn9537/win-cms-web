"use client";

import { useDialog } from "@/hooks/useDialog";
import { OrganizeModel } from "@/services/graphql/models/organize.model";
import { TreeViewModel, convertOrganizeListToTree, getOrganizeList } from "@/services/graphql/organize.service";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { TreeView } from "@mui/x-tree-view";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import CreateBuDialog from "./CreateBuDialog";
import { StyledTreeItem } from "./StyleTreeItem";

export default function OrganizeTree() {
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
    <>
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
      {/*  */}
      <CreateBuDialog {...dialogBu.dialogProps} />
    </>
  );
}

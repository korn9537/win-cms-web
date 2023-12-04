"use client";

import DeleteDialog from "@/components/dialogs/DeleteDialog";
import { useDialog } from "@/hooks/useDialog";
import { OrganizeModel } from "@/services/graphql/models/organize.model";
import {
  TreeViewModel,
  convertOrganizeListToTree,
  deleteOrganize,
  getOrganizeList
} from "@/services/graphql/organize.service";
import { useLayoutStore } from "@/stores/layout.store";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { TreeView } from "@mui/x-tree-view";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import CreateBuDialog from "./CreateBuDialog";
import MoveBuDialog from "./MoveBuDialog";
import { StyledTreeItem } from "./StyleTreeItem";

export type OrganizeTreeProps = {
  onSelected?: (node?: OrganizeModel) => void;
};

export default function OrganizeTree(props: OrganizeTreeProps) {
  // statics
  const { showToast } = useLayoutStore((state) => ({
    showToast: state.showToast
  }));

  const dialogBu = useDialog({
    onConfirm(data, dialog, res) {
      dialog.close();
      //
      refetch();
    },
    onCancel(data, dialog) {
      dialog.close();
    }
  });

  const dialogDelete = useDialog({
    onConfirm: async (data, dialog, res) => {
      try {
        dialog.showLoading(true);
        //
        await deleteOrganize(data.node.id);
        //
        dialog.showLoading(false);
        //
        dialog.close();
        //
        refetch();
      } catch (error: any) {
        showToast("error", error.response?.data?.message);
        dialog.showLoading(false);
      }
    },
    onCancel(data, dialog) {
      dialog.close();
    }
  });

  const dialogMove = useDialog({
    onConfirm: async (data, dialog, res) => {
      try {
        // dialog.showLoading(true);
        // //
        // await deleteOrganize(data.node.id);
        // //
        // dialog.showLoading(false);
        // //
        // dialog.close();
        // //
        // refetch();
      } catch (error: any) {
        showToast("error", error.response?.data?.message);
        dialog.showLoading(false);
      }
    },
    onCancel(data, dialog) {
      dialog.close();
    }
  });

  // states
  const [expanded, setExpanded] = useState<string[]>(["root"]);
  const [selected, setSelected] = useState<string>("");

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
    if (props.onSelected) {
      const item = data?.items.find((item) => item.id == nodeId);
      //
      props.onSelected(item);
    }
  };

  const handleOnActionClick = (action: string, node: TreeViewModel) => {
    if (action == "add") {
      dialogBu.open("สร้าง BU", null, {
        action: action,
        parent: node.data,
        node: null
      });
      return;
    }

    if (action == "edit") {
      dialogBu.open("แก้ไข BU", null, {
        action: action,
        parent: null,
        node: node.data
      });
      return;
    }

    if (action == "expand") {
      setExpanded([...expanded, node.id]);
      return;
    }

    if (action == "collapse") {
      setExpanded(expanded.filter((id) => id != node.id));
      return;
    }

    if (action == "delete") {
      dialogDelete.open(null, null, {
        node: node.data
      });
      return;
    }

    if (action == "move") {
      dialogMove.open(null, null, {
        node: node.data
      });
      return;
    }
  };

  const renderTree = (nodes: TreeViewModel) => (
    <StyledTreeItem
      key={nodes.id}
      nodeId={nodes.id}
      labelText={nodes.name}
      onActionClick={(action) => handleOnActionClick(action, nodes)}
      //   disableAdd={nodes.id == "root"}
      disableMove={nodes.id == "root"}
      disableMore={nodes.id == "root"}
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
      <DeleteDialog {...dialogDelete.dialogProps} />
      <MoveBuDialog {...dialogMove.dialogProps} />
    </>
  );
}

"use client";

import DeleteDialog from "@/components/dialogs/DeleteDialog";
import { useDialog } from "@/hooks/useDialog";
import { PermissionPageModel } from "@/services/graphql/models/permission.model";
import { TreeViewModel } from "@/services/graphql/models/treeview.model";
import { convertPageListToTree, deletePage, getPageList } from "@/services/graphql/permission.service";
import { useLayoutStore } from "@/stores/layout.store";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { TreeView } from "@mui/x-tree-view";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import CreatePageDialog from "./CreatePageDialog";
import MoveBuDialog from "./MoveBuDialog";
import { StyledTreeItem } from "./StyleTreeItem";

export type ModuleTreeProps = {
  onSelected?: (node?: PermissionPageModel) => void;
};

export default function ModuleTree(props: ModuleTreeProps) {
  // statics
  const { showToast } = useLayoutStore((state) => ({
    showToast: state.showToast
  }));

  const dialogCreate = useDialog<any, any>({
    onConfirm(data, dialog, res) {
      dialog.close();
      //
      refetch();
    },
    onCancel(data, dialog) {
      dialog.close();
    }
  });

  const dialogDelete = useDialog<any, any>({
    onConfirm: async (data, dialog, res) => {
      try {
        dialog.showLoading(true);
        //
        await deletePage(data.node.id);
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
    queryKey: ["page", "list"],
    queryFn: async () => {
      const items = await getPageList(null);
      const tree = convertPageListToTree("ROOT", items);
      return {
        items,
        tree
      } as {
        items: PermissionPageModel[];
        tree: TreeViewModel<PermissionPageModel>;
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

  const handleOnActionClick = (action: string, node: TreeViewModel<PermissionPageModel>) => {
    if (action == "add") {
      dialogCreate.open("สร้าง", null, {
        action: action,
        parent: node.data,
        node: null
      });
      return;
    }

    if (action == "edit") {
      dialogCreate.open("แก้ไข", null, {
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

  const renderTree = (nodes: TreeViewModel<PermissionPageModel>) => (
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
      <CreatePageDialog {...dialogCreate.dialogProps} />
      <DeleteDialog {...dialogDelete.dialogProps} />
      <MoveBuDialog {...dialogMove.dialogProps} />
    </>
  );
}

"use client";

import PageLayout from "@/components/PageLayout";
import PagePaper from "@/components/PagePaper";
import { SPACING_LAYOUT } from "@/constants/layout.constant";
import { PermissionPageModel } from "@/services/graphql/models/permission.model";
import { Grid, Typography } from "@mui/material";
import { useState } from "react";
import ModuleTree from "./components/ModuleTree";
import PermissionPanel from "./components/PermissionPanel";

export default function SettingModulesPage() {
  // statics

  // states
  const [selectedNode, setSelectedNode] = useState<PermissionPageModel>();

  // query

  // actions

  return (
    <PageLayout
      type="detail"
      toolbar={{
        title: "ตั้งค่าโมดูลในระบบ"
      }}
      appMenuSize="large"
    >
      <Grid container spacing={SPACING_LAYOUT}>
        <Grid item xs={6}>
          <PagePaper sx={{ height: "100%" }}>
            <Typography variant="body_L_B" mb={1} display="block">
              โมดูล/หน้าทั้งหมด
            </Typography>
            <ModuleTree onSelected={(node) => setSelectedNode(node)} />
          </PagePaper>
        </Grid>
        <Grid item xs={6}>
          <PagePaper sx={{ height: "100%" }}>
            <PermissionPanel pageId={selectedNode?.id || ""} />
          </PagePaper>
        </Grid>
      </Grid>
    </PageLayout>
  );
}

"use client";

import PageLayout from "@/components/PageLayout";
import PagePaper from "@/components/PagePaper";
import { SPACING_LAYOUT } from "@/constants/layout.constant";
import { Grid } from "@mui/material";
import { useState } from "react";
import { PanelRoleList } from "./components/PanelRoleList";
import { PanelRoleUsers } from "./components/PanelRoleUsers";

export default function SettingRolePage() {
  // statics

  // states
  const [selectedRoleId, setSelectedRoleId] = useState<string>("");

  // query

  // actions

  return (
    <PageLayout
      type="detail"
      toolbar={{
        title: "กลุ่มตำแหน่ง"
      }}
    >
      <Grid container spacing={SPACING_LAYOUT}>
        <Grid item xs={6}>
          <PagePaper sx={{ height: "100%" }}>
            <PanelRoleList onSelect={setSelectedRoleId} />
          </PagePaper>
        </Grid>
        <Grid item xs={6}>
          <PagePaper sx={{ height: "100%" }}>
            <PanelRoleUsers roleId={selectedRoleId} />
          </PagePaper>
        </Grid>
      </Grid>
    </PageLayout>
  );
}

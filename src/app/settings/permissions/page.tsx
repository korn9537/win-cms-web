"use client";

import PageLayout from "@/components/PageLayout";
import { SPACING_LAYOUT } from "@/constants/layout.constant";
import { RoleModel } from "@/services/graphql/models/role.model";
import { UserModel } from "@/services/graphql/models/user.model";
import { userPermissionSetttingStore } from "@/stores/permission-setting.store";
import { Box, Grid, Tab, Tabs } from "@mui/material";
import React, { useEffect, useState } from "react";
import PanelRole from "./components/PanelRole";
import PanelUser from "./components/PanelUser";
import TabPermission from "./components/TabPermission";

type TabType = "role" | "user";

export default function SettingPermissionPage() {
  // statics
  const loadPermissions = userPermissionSetttingStore((state) => state.loadPermissions);

  // states
  const [selectedTab, setSelectedTab] = useState<TabType>("role"); // user | role
  const [selectedId, setSelectedId] = useState<string>("");

  useEffect(() => {
    if (selectedId != "") {
      loadPermissions(selectedId, selectedTab, null);
    }
  }, [selectedId, selectedTab]);

  // actions
  const handleChangeTab = (event: React.SyntheticEvent, newValue: TabType) => {
    setSelectedId("");
    setSelectedTab(newValue);
  };

  const handleSelectRole = (item: RoleModel) => {
    setSelectedId(item.id);
  };

  const handleSelectUser = (item: UserModel) => {
    setSelectedId(item.id);
  };

  return (
    <PageLayout
      type="detail"
      toolbar={{
        title: "สิทธิ์การใช้งาน"
      }}
    >
      <Box
        sx={{
          borderBottom: (theme) => `2px solid ${theme.palette.neutralGray[20]}`
        }}
      >
        <Tabs value={selectedTab} onChange={handleChangeTab} aria-label="basic tabs example">
          <Tab label="กลุ่มตำแหน่ง" value="role" />
          <Tab label="ผู้ใช้งาน" value="user" />
        </Tabs>
      </Box>
      {/*  */}
      <Grid container spacing={SPACING_LAYOUT}>
        <Grid item xs={6}>
          {selectedTab === "user" ? (
            <PanelUser onChange={handleSelectUser} />
          ) : (
            <PanelRole onChange={handleSelectRole} />
          )}
        </Grid>
        <Grid item xs={6}>
          <TabPermission refId={selectedId} refType={selectedTab} />
        </Grid>
      </Grid>
    </PageLayout>
  );
}

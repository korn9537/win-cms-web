"use client";

import { Alert, Box, Tab, Tabs } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import PanelModule from "./PanelModule";
import PanelCompany from "./PanelCompany";
import PanelProject from "./PanelProject";
import { userPermissionSettingStore } from "@/stores/permission-setting.store";

type TabPermissionProps = {
  refType: "role" | "user";
  refId: string;
};

export default function TabPermission(props: TabPermissionProps) {
  // statics
  const { loadProjects, loadCompanies } = userPermissionSettingStore((state) => ({
    loadProjects: state.loadProjects,
    loadCompanies: state.loadCompanies
  }));

  const loadingRef = useRef(false);

  useEffect(() => {
    const load = async () => {
      loadingRef.current = true;
      await loadProjects("");
      await loadCompanies();
      loadingRef.current = false;
    };

    if (loadingRef.current == false) {
      load();
    }
  }, []);

  // states
  const [selectedTab, setSelectedTab] = useState("module");

  // queries

  // mutations

  // actions
  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setSelectedTab(newValue);
  };

  return (
    <Box>
      <Box
        sx={{
          borderBottom: (theme) => `2px solid ${theme.palette.neutralGray[20]}`,
          mb: 3
        }}
      >
        <Tabs variant="fullWidth" value={selectedTab} onChange={handleChangeTab}>
          <Tab label="ระบบ / ฟังก์ชั่น" value="module" />
          <Tab label="บริษัท" value="company" />
          <Tab label="โครงการ" value="project" />
          {/* <Tab label="ฝ่าย" value="deparment" /> */}
        </Tabs>
      </Box>

      {/*  */}
      <TabContent visible={selectedTab === "module"}>
        <PanelModule {...props} />
      </TabContent>
      <TabContent visible={selectedTab === "company"}>
        <PanelCompany {...props} />
      </TabContent>
      <TabContent visible={selectedTab === "project"}>
        <PanelProject {...props} />
      </TabContent>
      {/* {selectedTab === "deparment" && (
        <Box>
          <h1>deparment</h1>
        </Box>
      )} */}
    </Box>
  );
}

function TabContent(props: { visible: boolean; children: React.ReactNode }) {
  return (
    <Box
      sx={{
        display: props.visible ? "block" : "none"
      }}
    >
      {props.children}
    </Box>
  );
}

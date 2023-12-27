"use client";

import { Alert, Box, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import PanelModule from "./PanelModule";
import PanelCompany from "./PanelCompany";

type TabPermissionProps = {
  refType: "role" | "user";
  refId: string;
};

export default function TabPermission(props: TabPermissionProps) {
  // statics

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
        <Tabs
          variant="fullWidth"
          value={selectedTab}
          onChange={handleChangeTab}
          // sx={{
          //   "&": {
          //     minHeight: "34px"
          //   },
          //   "& .MuiTab-root": {
          //     py: 1,
          //     minHeight: "34px"
          //   }
          // }}
        >
          <Tab label="ระบบ / ฟังก์ชั่น" value="module" />
          <Tab label="บริษัท" value="company" />
          <Tab label="โครงการ" value="project" />
          {/* <Tab label="ฝ่าย" value="deparment" /> */}
        </Tabs>
      </Box>

      {/*  */}
      {selectedTab === "module" && <PanelModule {...props} />}
      {selectedTab === "company" && <PanelCompany {...props} />}
      {selectedTab === "project" && (
        <Box>
          <Alert severity="warning">project</Alert>
        </Box>
      )}
      {/* {selectedTab === "deparment" && (
        <Box>
          <h1>deparment</h1>
        </Box>
      )} */}
    </Box>
  );
}

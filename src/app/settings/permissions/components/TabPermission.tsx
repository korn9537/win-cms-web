"use client";

import { Box, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import PanelModule from "./PanelModule";

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
      {selectedTab === "company" && (
        <Box>
          <h1>company</h1>
        </Box>
      )}
      {selectedTab === "project" && (
        <Box>
          <h1>project</h1>
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

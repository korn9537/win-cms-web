"use client";

import PageFilter from "@/components/PageFilter";
import PageLayout from "@/components/PageLayout";
import { IOSSwitch } from "@/components/SwitchStatus";
import { SPACING_LAYOUT } from "@/constants/layout.constant";
import { UserModel } from "@/services/graphql/models/user.model";
import { getUsers } from "@/services/graphql/user.service";
import { ChevronRight, Search } from "@mui/icons-material";
import {
  Box,
  ButtonBase,
  Grid,
  MenuItem,
  Paper,
  Stack,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  TextField
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import _ from "lodash";
import React, { useMemo, useState } from "react";

export default function SettingPermissionPage() {
  const [selectedTab, setSelectedTab] = useState("user"); // user | role

  // actions
  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setSelectedTab(newValue);
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
          <Tab label="ผู้ใช้งาน" value="user" />
          <Tab label="กลุ่มตำแหน่ง" value="role" />
        </Tabs>
      </Box>
      {/*  */}
      <Grid container spacing={SPACING_LAYOUT}>
        <Grid item xs={6}>
          {selectedTab === "user" ? <PanelUser /> : <h1>role</h1>}
        </Grid>
        <Grid item xs={6}>
          <TabPermission />
        </Grid>
      </Grid>
    </PageLayout>
  );
}

function TabPermission() {
  const [selectedTab, setSelectedTab] = useState("module");

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
          <Tab label="ฝ่าย" value="deparment" />
        </Tabs>
      </Box>

      {/*  */}
      {selectedTab === "module" && (
        <Box>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ระบบ / ฟังก์ชั่น</TableCell>
                  <TableCell width={140}>สิทธิ์กลุ่มตำแหน่ง</TableCell>
                  <TableCell width={100}>สิทธิ์ส่วนตัว</TableCell>
                  <TableCell width={30}></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>ระบบข้อมูลกลาง</TableCell>
                  <TableCell>มีสิทธิ์ใช้งาน</TableCell>
                  <TableCell>
                    <IOSSwitch />
                  </TableCell>
                  <TableCell>
                    <ChevronRight />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
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
      {selectedTab === "deparment" && (
        <Box>
          <h1>deparment</h1>
        </Box>
      )}
    </Box>
  );
}

type PanelUserProps = {
  onChange?: (user: UserModel) => void;
};

function PanelUser(props: PanelUserProps) {
  // statics

  // states
  const [search, setSearch] = useState("");

  // query
  const query = useQuery({
    queryKey: ["users"],
    queryFn: () => {
      return getUsers();
    }
  });

  const users = useMemo(() => {
    const regex = new RegExp(search, "i");
    return query.data?.filter((item) => {
      return regex.test(item.fullname || "") || regex.test(item.code);
    });
  }, [query.data, search]);

  // actions
  const handleSearchChange = _.debounce((value: string) => {
    setSearch(value);
  }, 500);

  return (
    <Stack spacing={SPACING_LAYOUT}>
      <PageFilter showSearchButton={false}>
        <Grid container spacing={2.5}>
          <Grid item xs={12}>
            <TextField
              label="ค้นหา"
              InputProps={{
                endAdornment: (
                  <ButtonBase>
                    <Search />
                  </ButtonBase>
                )
              }}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
          </Grid>
          {/* <Grid item xs={6}>
            <TextField label="กลุ่มตำแหน่ง" select>
              <MenuItem value="">แสดงทั้งหมด</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField label="ฝ่าย" select>
              <MenuItem value="">แสดงทั้งหมด</MenuItem>
            </TextField>
          </Grid> */}
        </Grid>
      </PageFilter>
      {/*  */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell width={140}>รหัสพนักงาน</TableCell>
              <TableCell>ชื่อ - สกุล</TableCell>
              <TableCell width={130}>กลุ่มตำแหน่ง</TableCell>
              <TableCell width={130}>ฝ่าย</TableCell>
              {/* <TableCell width={30}></TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {users?.map((item) => {
              return (
                <TableRow key={item.id}>
                  <TableCell>{item.code}</TableCell>
                  <TableCell>{item.fullname}</TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  {/* <TableCell></TableCell> */}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
}

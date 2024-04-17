import { Search } from "@mui/icons-material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Box, Button, ButtonBase, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { IconFilter } from "./Icons";
import PagePaper from "./PagePaper";

export type PageFilterProps = {
  onSearchClick?: () => void;
  children?: React.ReactNode;
  filterOther?: React.ReactNode;
  showSearchButton?: boolean;
  beforeComponent?: React.ReactNode;
  afterCompoent?: React.ReactNode;
  showFillter?: boolean;
  sxPaper?: any;
};

export default function PageFilter({
  showSearchButton = true,
  showFillter = true,
  sxPaper = {},
  ...props
}: PageFilterProps) {
  const [show, setShow] = useState(false);
  const onClickButton = () => {
    // if (show == true) {
    //   setShow(false);
    // } else {
    //   setShow(true);
    // }
    setShow(!show);
  };

  const paperStyle = {
    display: showFillter ? "block" : "none",
    ...sxPaper
  };

  return (
    <>
      {props.beforeComponent}
      {/*  */}
      <PagePaper sx={{ ...paperStyle }}>
        <Stack direction="row" justifyContent="space-between" alignItems="end" spacing={3}>
          {props.children}
          {showSearchButton && (
            <Box>
              <Button
                startIcon={<Search />}
                onClick={() => {
                  props.onSearchClick && props.onSearchClick();
                }}
                color="black80"
              >
                ค้นหา
              </Button>
            </Box>
          )}
        </Stack>
        {props.filterOther && (
          <>
            {" "}
            <Box sx={{ mt: "20px" }}>
              <Stack flexDirection={"row"} spacing={"8px"} alignItems={"center"}>
                {/* <Button variant="text" sx={{padding:0}} startIcon={ <IconFilter />} onClick={onClickButton} endIcon={<Box sx={{ display:'flex', alignItems:'center', transform: show ? 'rotate(180deg)' : 'rotate(0)' }}><IconChevronDown/></Box> }>
              คัดกรองเพิ่มเติม
              </Button> */}
                <ButtonBase sx={{ display: "flex", gap: 1, alignItems: "center" }} onClick={onClickButton}>
                  <IconFilter />
                  <Typography color={"deepBlue.80"}>คัดกรองเพิ่มเติม</Typography>
                  <KeyboardArrowDownIcon
                    sx={{
                      transform: show ? "rotate(180deg)" : "rotate(0)",
                      width: "20px",
                      height: "20px",
                      transition: "0.3s all"
                    }}
                  />
                </ButtonBase>
              </Stack>
            </Box>
            {show && (
              <Box
                sx={{
                  mt: 1.5,
                  p: 2.5,
                  width: 1,
                  height: 112,
                  border: "1px solid #F8F8F8 !important",
                  backgroundColor: "#F8F8F8",
                  borderRadius: "12px"
                }}
              >
                {props.filterOther}
              </Box>
            )}
          </>
        )}
      </PagePaper>
      {/*  */}
      {props.afterCompoent}
    </>
  );
}

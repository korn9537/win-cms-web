import AddRoundedIcon from "@mui/icons-material/AddRounded";
import DriveFileMoveRoundedIcon from "@mui/icons-material/DriveFileMoveRounded";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import { ButtonBase, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import { SvgIconProps } from "@mui/material/SvgIcon";
import Typography from "@mui/material/Typography";
import { styled, useTheme } from "@mui/material/styles";
import { TreeItem, TreeItemProps, treeItemClasses } from "@mui/x-tree-view/TreeItem";
import * as React from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

declare module "react" {
  interface CSSProperties {
    "--tree-view-color"?: string;
    "--tree-view-bg-color"?: string;
  }
}

type StyledTreeItemProps = TreeItemProps & {
  bgColor?: string;
  bgColorForDarkMode?: string;
  color?: string;
  colorForDarkMode?: string;
  labelIcon?: React.ElementType<SvgIconProps>;
  labelInfo?: string;
  labelText: string;
  onActionClick?: (action: string) => void;
};

const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
  color: theme.palette.text.secondary,
  [`& .${treeItemClasses.content}`]: {
    // paddingLeft: "0 !important",
    color: theme.palette.text.secondary,
    // borderTopRightRadius: theme.spacing(2),
    // borderBottomRightRadius: theme.spacing(2),
    // paddingRight: theme.spacing(1),
    // fontWeight: theme.typography.fontWeightMedium,
    // "& .MuiTreeItem-iconContainer": {
    //   display: "none"
    // },
    "& .actions": {
      display: "none"
    },
    // "&.Mui-expanded": {
    //   fontWeight: theme.typography.fontWeightRegular
    // },
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
      "& .actions": {
        display: "block"
      }
    },
    "&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused": {
      backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action.selected})`,
      color: "var(--tree-view-color)",
      "& .actions": {
        display: "block"
      }
    },
    [`& .${treeItemClasses.label}`]: {
      fontWeight: "inherit",
      color: "inherit"
    }
  }
  // [`& .${treeItemClasses.group}`]: {
  //   marginLeft: 0,
  //   [`& .${treeItemClasses.content}`]: {
  //     paddingLeft: theme.spacing(2)
  //   }
  // }
})) as unknown as typeof TreeItem;

export const StyledTreeItem = React.forwardRef(function StyledTreeItem(
  props: StyledTreeItemProps,
  ref: React.Ref<HTMLLIElement>
) {
  const theme = useTheme();
  const {
    bgColor,
    color,
    labelIcon: LabelIcon,
    labelInfo,
    labelText,
    colorForDarkMode,
    bgColorForDarkMode,
    onActionClick,
    ...other
  } = props;

  const styleProps = {
    "--tree-view-color": theme.palette.mode !== "dark" ? color : colorForDarkMode,
    "--tree-view-bg-color": theme.palette.mode !== "dark" ? bgColor : bgColorForDarkMode
  };

  const handleOnClick = (action: string) => (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();
    onActionClick?.(action);
  };

  return (
    <StyledTreeItemRoot
      collapseIcon={
        <ButtonBase onClick={handleOnClick("collapse")}>
          <ExpandMoreIcon />
        </ButtonBase>
      }
      expandIcon={
        <ButtonBase onClick={handleOnClick("expand")}>
          <ChevronRightIcon />
        </ButtonBase>
      }
      label={
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            p: 0.5,
            pr: 0
          }}
        >
          {LabelIcon && <Box component={LabelIcon} color="inherit" sx={{ mr: 1 }} />}
          <Typography variant="body_M" sx={{ fontWeight: "inherit", flexGrow: 1 }}>
            {labelText}
          </Typography>
          <Typography variant="body_XS" color="inherit">
            {labelInfo}
          </Typography>
          <Box className="actions">
            <Stack direction="row" spacing={2}>
              <ButtonBase onClick={handleOnClick("add")}>
                <AddRoundedIcon />
              </ButtonBase>
              <ButtonBase onClick={handleOnClick("move")}>
                <DriveFileMoveRoundedIcon />
              </ButtonBase>
              <ButtonBase onClick={handleOnClick("more")}>
                <MoreVertRoundedIcon />
              </ButtonBase>
            </Stack>
          </Box>
        </Box>
      }
      style={styleProps}
      {...other}
      ref={ref}
    />
  );
});

// export default function GmailTreeView() {
//   return (
//     <TreeView
//       aria-label="gmail"
//       defaultExpanded={["3"]}
//       defaultCollapseIcon={<ArrowDropDownIcon />}
//       defaultExpandIcon={<ArrowRightIcon />}
//       defaultEndIcon={<div style={{ width: 24 }} />}
//       sx={{ height: 264, flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
//     >
//       <StyledTreeItem nodeId="1" labelText="All Mail" labelIcon={MailIcon} />
//       <StyledTreeItem nodeId="2" labelText="Trash" labelIcon={DeleteIcon} />
//       <StyledTreeItem nodeId="3" labelText="Categories" labelIcon={Label}>
//         <StyledTreeItem
//           nodeId="5"
//           labelText="Social"
//           labelIcon={SupervisorAccountIcon}
//           labelInfo="90"
//           color="#1a73e8"
//           bgColor="#e8f0fe"
//           colorForDarkMode="#B8E7FB"
//           bgColorForDarkMode="#071318"
//         />
//         <StyledTreeItem
//           nodeId="6"
//           labelText="Updates"
//           labelIcon={InfoIcon}
//           labelInfo="2,294"
//           color="#e3742f"
//           bgColor="#fcefe3"
//           colorForDarkMode="#FFE2B7"
//           bgColorForDarkMode="#191207"
//         />
//         <StyledTreeItem
//           nodeId="7"
//           labelText="Forums"
//           labelIcon={ForumIcon}
//           labelInfo="3,566"
//           color="#a250f5"
//           bgColor="#f3e8fd"
//           colorForDarkMode="#D9B8FB"
//           bgColorForDarkMode="#100719"
//         />
//         <StyledTreeItem
//           nodeId="8"
//           labelText="Promotions"
//           labelIcon={LocalOfferIcon}
//           labelInfo="733"
//           color="#3c8039"
//           bgColor="#e6f4ea"
//           colorForDarkMode="#CCE8CD"
//           bgColorForDarkMode="#0C130D"
//         />
//       </StyledTreeItem>
//       <StyledTreeItem nodeId="4" labelText="History" labelIcon={Label} />
//     </TreeView>
//   );
// }

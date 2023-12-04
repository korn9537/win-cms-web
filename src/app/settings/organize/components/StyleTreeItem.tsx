import AddRoundedIcon from "@mui/icons-material/AddRounded";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DriveFileMoveRoundedIcon from "@mui/icons-material/DriveFileMoveRounded";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import { ButtonBase, Menu, MenuItem, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import { SvgIconProps } from "@mui/material/SvgIcon";
import Typography from "@mui/material/Typography";
import { styled, useTheme } from "@mui/material/styles";
import { TreeItem, TreeItemProps, treeItemClasses } from "@mui/x-tree-view/TreeItem";
import * as React from "react";

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
  disableAdd?: boolean;
  disableMove?: boolean;
  disableMore?: boolean;
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
    "& button.Mui-disabled": {
      opacity: 0.3
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
  // statics
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
    disableAdd = false,
    disableMove = false,
    disableMore = false,
    ...other
  } = props;

  const styleProps = {
    "--tree-view-color": theme.palette.mode !== "dark" ? color : colorForDarkMode,
    "--tree-view-bg-color": theme.palette.mode !== "dark" ? bgColor : bgColorForDarkMode
  };

  // states
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (action: string) => () => {
    setAnchorEl(null);

    if (action == "close") {
      return;
    }

    onActionClick?.(action);
  };

  // actions
  const handleOnClick = (action: string) => (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();
    onActionClick?.(action);
  };

  return (
    <>
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
                <ButtonBase onClick={handleOnClick("add")} disabled={disableAdd}>
                  <AddRoundedIcon />
                </ButtonBase>
                <ButtonBase onClick={handleOnClick("move")} disabled={disableMove}>
                  <DriveFileMoveRoundedIcon />
                </ButtonBase>
                <ButtonBase onClick={handleClick} disabled={disableMore}>
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
      {/*  */}
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose("close")}
        MenuListProps={{
          "aria-labelledby": "basic-button"
        }}
      >
        <MenuItem onClick={handleClose("edit")}>Edit</MenuItem>
        <MenuItem onClick={handleClose("delete")}>Delete</MenuItem>
      </Menu>
    </>
  );
});

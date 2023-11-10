import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box, Button, ButtonProps, Typography } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import * as React from "react";

type ButtonMenuProps = {
  menus: ButtonMenuItem[];
} & ButtonProps;

type ButtonMenuItem = {
  text: string;
  icon?: React.ReactNode;
  onClick: () => void;
};

export default function ButtonMenu({ menus = [], onClick, color = "black80", ...props }: ButtonMenuProps) {
  // statics
  const buttonId = React.useId();
  const menuId = React.useId();

  // states
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  // actions
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickItem = (clickFunction: () => void) => {
    clickFunction();
    handleClose();
  };

  return (
    <>
      {/* {buttonType === "more" ? (
        <Button
          aria-label="more"
          id={buttonId}
          aria-controls={open ? "long-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleClick}
          color={color}
          {...props}
          sx={{
            p: 1,
            minWidth: 0,
            ...(props.sx || {})
          }}
        >
          <MoreVertIcon />
        </Button>
      ) : (
        <Button color={color} {...props}>
          {props.children}
        </Button>
      )} */}
      <Button
        aria-label="more"
        id={buttonId}
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        color={color}
        {...props}
        sx={{
          ...(props.children ? {} : { p: 1, minWidth: 0 }),
          ...(props.sx || {})
        }}
      >
        {props.children || <MoreVertIcon />}
      </Button>
      <Menu
        id={menuId}
        MenuListProps={{
          "aria-labelledby": buttonId
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
      >
        {menus.map((option: ButtonMenuItem) => (
          <MenuItem key={React.useId()} onClick={() => handleClickItem(option.onClick)}>
            <Box
              sx={{
                width: 24,
                height: 24,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                "& svg": {
                  width: 18,
                  height: "auto"
                  // height: 18,
                }
              }}
            >
              {option.icon}
            </Box>
            <Typography ml={1.5}>{option.text}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

import ExpandMore from "@mui/icons-material/ExpandMore";
import { Box, ButtonBase, Menu, MenuItem, Stack, Tooltip, Typography, styled, useTheme } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import List, { ListProps } from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as React from "react";

type MyMenuType = "main" | "sub";

export type MyMenu = {
  key?: string;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  image?: string;
  href?: string;
  subMenus?: MySubMenu[];
};

export type MySubMenu = {
  icon?: React.ReactNode;
  title: string;
  href: string;
  key?: string;
  subMenus?: MySubMenu[];
};

export type AppMenuProps = {
  disabledText: boolean;
  menus?: MyMenu[];
  type?: MyMenuType;
  value?: string | null;
};

export default function AppMenu({ disabledText = false, menus = [], type = "main", value }: AppMenuProps) {
  const componentId = React.useId();

  if (disabledText) {
    return (
      <Stack spacing={1.5} alignItems="center">
        {menus.map((menu) => (
          <AppMenuSmallButton
            key={`${componentId}-sm-${menu.key}`}
            icon={menu.icon}
            href={menu.href}
            menus={menu.subMenus || []}
            title={menu.title}
            value={value}
            menuKey={menu.key}
          />
        ))}
      </Stack>
    );
  }

  if (type == "sub") {
    return (
      <ListSubMenu disablePadding dense>
        {menus.map((menu) => {
          const menuId = menu.key || React.useId();

          return (
            <AppMenuLargeButton
              key={`${componentId}-sub-${menuId}`}
              icon={menu.icon}
              title={menu.title}
              menus={menu.subMenus || []}
              href={menu.href}
              value={value}
              menuKey={menu.key}
              disabledBackgroundColor
            />
          );
        })}
      </ListSubMenu>
    );
  }

  return (
    <ListMainMenu disablePadding dense>
      {menus.map((menu) => (
        <AppMenuLargeButton
          key={`${componentId}-large-${menu.key}`}
          icon={menu.icon}
          title={menu.title}
          menus={menu.subMenus || []}
          href={menu.href}
          value={value}
          menuKey={menu.key}
        />
      ))}
    </ListMainMenu>
  );
}

function AppMenuSmallButton({
  icon,
  href,
  menus,
  title,
  value,
  menuKey
}: {
  icon: React.ReactNode;
  href?: string;
  menus: MySubMenu[];
  title?: string;
  selected?: boolean;
  value?: string | null;
  menuKey?: string;
}) {
  const router = useRouter();
  const theme = useTheme();
  const componentId = React.useId();

  value = value || "info";

  let hasSelectedMenu = menus.length > 0 ? (menus.find((item) => item.key == value) ? true : false) : false;

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);

    if (href) {
      router.push(href);
    }
  };
  const handleCloseUserMenu = (href: string | null) => () => {
    setAnchorElUser(null);

    if (href) {
      router.push(href);
    }
  };

  return (
    <Box>
      <Tooltip title={title || ""} placement="right">
        <ButtonBase
          sx={{
            "& svg": {
              fontSize: 24,
              color: theme.palette.black[80]
            },
            "&": {
              p: 1,
              transition: "0.3s",
              borderRadius: 1,
              bgcolor: "transparent",
              ":hover": {
                bgcolor: theme.palette.softBlue[10]
              },
              width: "40px",
              height: "40px"
            },
            "&.active": {
              bgcolor: theme.palette.softBlue[10],
              "& svg": {
                color: theme.palette.primary.main
              }
            }
          }}
          onClick={handleOpenUserMenu}
          className={hasSelectedMenu || menuKey == value ? "active" : ""}
        >
          {icon}
        </ButtonBase>
      </Tooltip>
      {menus.length > 0 && (
        <Menu
          sx={{
            ml: "45px",
            "& .MuiPaper-root": {
              borderRadius: "12px",
              py: 1.5,
              px: 0,
              bgcolor: theme.palette.darkBlue.main,
              color: "#FFF",
              width: "100%",
              maxWidth: 216
            },
            "& .MuiList-root": { display: "flex", flexDirection: "column", gap: 1.5, p: 0 },
            "& .MuiMenuItem-root": {
              px: 1.5,
              pl: 2.5,
              py: 1,
              borderRadius: "5px"
            },
            "& .MuiTypography-root": {
              ...theme.typography.body_M
            }
          }}
          id={componentId}
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left"
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "left"
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu(null)}
        >
          {menus.map((menu) => (
            <MenuItem disableGutters={true} key={`${componentId}-${menu.key}`} onClick={handleCloseUserMenu(menu.href)}>
              <Typography component="span">{menu.title}</Typography>
            </MenuItem>
          ))}
        </Menu>
      )}
    </Box>
  );
}

const ListSubMenu = styled(List)<ListProps>(({ theme }) => ({
  "&": {
    padding: 20
  },
  "& .MuiListItemButton-root:hover": {
    backgroundColor: "transparent",
    color: theme.palette.primary.main,
    svg: {
      color: theme.palette.primary.main
    }
  },
  "& > .MuiListItemButton-root:not(:first-of-type)": {
    padding: 0,
    marginTop: 20
  },
  "& .MuiListItemIcon-root": {
    minWidth: 0,
    marginRight: "8px"
  },
  "& .MuiListItemText-root": {
    margin: 0
  },
  "& .MuiTypography-root": {
    ...theme.typography.body_M
  },
  svg: {
    color: theme.palette.black[80]
  },
  "& .MuiCollapse-wrapper": {
    ".MuiList-root": {
      paddingTop: 8,
      paddingBottom: 8
    },
    ".MuiListItemButton-root": {
      padding: 8,
      paddingLeft: "28px"
    }
  }
}));

const ListMainMenu = styled(List)<ListProps>(({ theme }) => ({
  "& .MuiListItemButton-root": {
    "&:hover": {
      backgroundColor: theme.palette.softBlue[10],
      color: theme.palette.primary.main,
      svg: {
        color: theme.palette.primary.main
      }
    }
  },
  "& > .MuiListItemButton-root": {
    padding: "8px 12px",
    borderRadius: "5px",

    "&:not(:first-of-type)": {
      marginTop: "12px"
    },

    ".MuiListItemIcon-root": {
      minWidth: 24,
      marginRight: "12px"
    },
    ".MuiTypography-root": {
      ...theme.typography.body_M_B
    }
  },
  svg: {
    fontSize: 24,
    color: theme.palette.black[80]
  },
  "& .MuiCollapse-root": {
    ".MuiList-root": {
      paddingTop: 8,
      paddingBottom: 8
    },
    ".MuiTypography-root": {
      ...theme.typography.body_M
    },
    ".MuiListItemButton-root": {
      paddingLeft: "48px"
    }
  }
}));

function AppMenuLargeButton({
  icon,
  title,
  href,
  menus,
  value,
  menuKey,
  disabledBackgroundColor = false
}: {
  icon: React.ReactNode;
  title: string;
  href?: string;
  menus: MySubMenu[];
  value?: string | null;
  menuKey?: string;
  disabledBackgroundColor?: boolean;
}) {
  const router = useRouter();
  const componentId = React.useId();

  let hasSelectedMenu = menus.length > 0 ? (menus.find((item) => item.key == value) ? true : false) : false;

  const [open, setOpen] = React.useState(hasSelectedMenu);

  const handleClickButton = () => {
    if (menus.length > 0) {
      setOpen(!open);
    } else {
      if (href) {
        router.push(href);
      }
    }
  };

  return (
    <>
      <ListItemButton
        disableGutters
        onClick={handleClickButton}
        selected={hasSelectedMenu || menuKey == value}
        sx={{
          "&.Mui-selected": {
            color: (theme) => theme.palette.primary.main,
            bgcolor: disabledBackgroundColor ? "transparent" : (theme) => theme.palette.softBlue[10],
            "& svg": {
              color: (theme) => theme.palette.primary.main
            },
            ":hover": {
              bgcolor: disabledBackgroundColor ? "transparent" : (theme) => theme.palette.softBlue[10]
            }
          }
        }}
      >
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={title} />
        {menus.length > 0 && (
          <ExpandMore
            sx={{
              fontSize: "20px",
              transform: open ? "rotate(-180deg)" : "rotate(0)",
              transition: "0.3s"
            }}
          />
        )}
      </ListItemButton>
      {menus.length > 0 && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div">
            {menus.map((menu) => (
              <Link key={`${componentId}-collapse-${menu.key}`} href={menu.href}>
                <ListItemButton
                  sx={{
                    pl: 4,
                    "&.Mui-selected": {
                      bgcolor: "transparent",
                      color: (theme) => theme.palette.primary.main
                    }
                  }}
                  selected={menu.key == value}
                >
                  <ListItemText primary={menu.title} />
                </ListItemButton>
              </Link>
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
}

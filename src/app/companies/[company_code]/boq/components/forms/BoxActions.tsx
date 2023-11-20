import { IconAdd, IconDelete, IconEdit } from "@/components/Icons";
import { KeyboardArrowDown } from "@mui/icons-material";
import { Box, Button, IconButton, Stack } from "@mui/material";

export type BoxActionType = "add_same" | "add_child" | "edit" | "delete" | "collapse";

export type BoxActionsProps = {
  onClick: (action: BoxActionType) => void;
  isOpen?: boolean;
  hideCollaspe?: boolean;
  hideAddChild?: boolean;
  hideAction?: boolean;
};

const ACTION_MIN_WIDTH = 40;

export function BoxActions(props: BoxActionsProps) {
  return (
    <Box
      sx={{
        minWidth: ACTION_MIN_WIDTH
      }}
      className="box-action"
    >
      <Stack
        direction="row"
        spacing={2}
        justifyContent="flex-end"
        alignItems="center"
        sx={{
          minHeight: "32px"
        }}
      >
        {props.hideAction ? null : (
          <Box className="actions">
            <Stack direction="row" spacing={2} alignItems="center">
              <Button
                size="small"
                sx={{
                  svg: {
                    width: 16,
                    height: 16
                  },
                  whiteSpace: "nowrap",
                  bgcolor: "white !important"
                }}
                onClick={() => props.onClick("add_same")}
                startIcon={<IconAdd />}
              >
                บรรทัดใหม่
              </Button>
              {props.hideAddChild ? null : (
                <Button
                  size="small"
                  sx={{
                    svg: {
                      width: 16,
                      height: 16
                    },
                    whiteSpace: "nowrap",
                    ml: 1,
                    bgcolor: "white !important"
                  }}
                  onClick={() => props.onClick("add_child")}
                  startIcon={<IconAdd />}
                >
                  บรรทัดย่อย
                </Button>
              )}
              <IconButton
                size="small"
                sx={{
                  svg: {
                    width: 16,
                    height: 16
                  }
                }}
                onClick={() => props.onClick("edit")}
              >
                <IconEdit />
              </IconButton>
              <IconButton
                size="small"
                sx={{
                  svg: {
                    width: 16,
                    height: 16
                  }
                }}
                onClick={() => props.onClick("delete")}
              >
                <IconDelete />
              </IconButton>
            </Stack>
          </Box>
        )}
        {props.hideCollaspe ? (
          <Box
            sx={{
              display: "block",
              width: "26px"
            }}
          ></Box>
        ) : (
          <IconButton
            size="small"
            sx={{
              svg: {
                width: 16,
                height: 16
              }
            }}
            onClick={() => props.onClick("collapse")}
          >
            <KeyboardArrowDown
              fontSize="small"
              sx={{
                transition: "transform 0.3s ease-in-out",
                transform: props.isOpen ? "rotate(180deg)" : "rotate(0deg)"
              }}
            />
          </IconButton>
        )}
      </Stack>
    </Box>
  );
}

import { Components, Theme } from "@mui/material";
import { palette } from "./palette.theme";
import { typography } from "./typography.theme";

export const componentConfig: Components<Omit<Theme, "components">> = {
  MuiStack: {
    defaultProps: {
      useFlexGap: true
    }
  },
  // FORM INPUTS
  MuiFormControl: {
    styleOverrides: {
      root: ({ theme }) =>
        theme.unstable_sx({
          ".MuiFormLabel-root": {
            color: "inherit !important",
            ...theme.typography.body_M,
            // mb: 1.5
            mb: 1
          },
          ".MuiFormLabel-root, .MuiFormLabel-root.Mui-disabled": {
            color: palette.black[80]
          },
          ".MuiFormLabel-asterisk": {
            color: palette.red.main
          },
          ".MuiFormHelperText-root": {
            m: 0,
            mt: 1,
            ...theme.typography.body_XS
          }
        })
    }
  },
  MuiFormControlLabel: {
    styleOverrides: {
      root: ({ theme }) =>
        theme.unstable_sx({
          "& .MuiTypography-root.Mui-disabled": {
            color: palette.black[80]
          }
        })
    }
  },
  MuiTextField: {
    defaultProps: {
      size: "small",
      InputLabelProps: {
        shrink: true
      },
      inputProps: {
        autoComplete: "off"
      },
      SelectProps: {
        displayEmpty: true,
        defaultValue: ""
      },
      fullWidth: true
    },
    styleOverrides: {
      root: ({ theme, ownerState }) =>
        theme.unstable_sx({
          "& .MuiInputLabel-root": {
            transform: "none",
            position: "relative",
            color: "inherit !important",
            marginBottom: 1,
            ...theme.typography.body_M
          },
          "& .MuiOutlinedInput-root": {
            borderColor: theme.palette.neutralGray[60],
            borderRadius: "4px",
            borderWidth: "1px",
            borderStyle: "solid",
            backgroundColor: theme.palette.common.white,

            "&.Mui-error": {
              borderColor: theme.palette.error.main
            },

            "&.Mui-disabled": {
              borderColor: theme.palette.neutralGray[20],
              backgroundColor: theme.palette.neutralGray[10],

              "input, .MuiSelect-select": {
                color: theme.palette.black[80],
                textFillColor: theme.palette.black[80]
              }
            }
          },
          "& fieldset": {
            display: "none"
          },
          "& .MuiInputBase-multiline": {
            p: 0
          },
          "& .MuiInputBase-inputSizeSmall": {
            p: 1
          }

          // '& .MuiFormLabel-root': {
          //   color: theme.palette.black[80],
          //   '&.Mui-disabled': { color: palette.black[80] },
          // },
          // '& .MuiInputBase-formControl': {
          //   borderColor: palette.neutralGray[60],
          //   '&.Mui-disabled': {
          //     borderColor: palette.neutralGray[20],
          //     backgroundColor: palette.neutralGray[10],
          //     'input, .MuiSelect-select': {
          //       color: palette.black[80],
          //       textFillColor: palette.black[80],
          //     },
          //   },
          // },
          // '& .MuiInputBase-inputAdornedEnd': {
          //   paddingRight: '8px',
          // },
          // '& .MuiFormHelperText-root': {
          //   margin: 0,
          //   marginTop: '8px',
          //   ...typography.body_XS,
          // },
          // '& .Mui-error': {
          //   borderColor: palette.red.main + ' !important',
          // },
          // '& .MuiFormLabel-asterisk, .MuiInputLabel-asterisk': {
          //   color: palette.red.main,
          // },
          // '& .MuiInputBase-adornedEnd': {
          //   paddingRight: '8px',
          // },
        })
    }
  },
  MuiAutocomplete: {
    defaultProps: {
      size: "small"
    }
  },
  MuiCheckbox: {
    defaultProps: {
      disableRipple: true,
      size: "small"
    }
  },
  MuiRadio: {
    defaultProps: {
      disableRipple: true,
      size: "small"
    }
  },
  // Buttons
  MuiButtonBase: {
    defaultProps: {
      disableRipple: true
    }
  },
  MuiButton: {
    defaultProps: {
      variant: "outlined"
    },
    styleOverrides: {
      sizeMedium: {
        padding: "8px 20px",
        ...typography.body_M_B
      },
      sizeLarge: {
        padding: "12px 24px",
        ...typography.body_M_B
      },
      contained: {
        border: "1px solid transparent"
      }
    }
  },
  MuiTable: {
    styleOverrides: {
      root: {
        "&.data-align-top tbody tr": {
          verticalAlign: "top"
        },
        "& .MuiTableHead-root > .MuiTableRow-head > .MuiTableCell-head": {
          ...typography.body_M_B
        }
      }
    }
  },
  MuiTableRow: {
    styleOverrides: {
      root: {
        "& .MuiTableCell-sizeMedium": {
          "&:first-of-type": {
            paddingLeft: "20px"
          },
          "&:last-of-type": {
            paddingRight: "20px"
          }
        }
      }
    }
  },
  MuiTableCell: {
    styleOverrides: {
      sizeMedium: {
        padding: "16px 10px"
      },
      sizeSmall: {
        padding: "12px 10px"
      }
    }
  },
  MuiDrawer: {
    styleOverrides: {
      root: {
        "&.drawer-bg-gray > div.MuiPaper-root": {
          backgroundColor: "#F8F8F8"
        }
      }
    }
  },
  MuiDialog: {
    styleOverrides: {
      root: ({ theme }) =>
        theme.unstable_sx({
          "& .MuiDialogTitle-root": {
            p: 2.5
          },
          "& .MuiDialogActions-root": {
            p: 2.5
          },
          "& .MuiDialogActions-root>:not(:first-of-type)": {
            ml: 2.5
          }
        })
    }
  },
  MuiBackdrop: {
    styleOverrides: {
      root: {
        "&.MuiBackdrop-root": {
          marginTop: 0
        }
      }
    }
  },
  MuiMenu: {
    styleOverrides: {
      root: ({ theme }) => ({}),
      paper: ({ theme }) => ({
        "&": {
          borderRadius: "12px",
          padding: theme.spacing(1.5),
          minWidth: "200px",
          marginTop: theme.spacing(1),
          boxShadow: "0px 1px 8px 0px rgba(0, 0, 0, 0.10)"
        }
      }),
      list: ({ theme }) => ({
        "&": { display: "flex", flexDirection: "column", gap: "8px", padding: 0 },
        "& .MuiMenuItem-root": {
          // px: 1.5,
          // py: 1,
          padding: theme.spacing(1, 1.5),
          borderRadius: "5px",
          "&:hover": {
            bgcolor: theme.palette.neutralGray[10]
          }
        }
      })
      // '& .MuiPaper-root': { borderRadius: '12px', padding: 1.5 },
      // '& .MuiList-root': { display: 'flex', flexDirection: 'column', gap: 1.5, p: 0 },
      // '& .MuiMenuItem-root': {
      //   px: 1.5,
      //   py: 1,
      //   borderRadius: '5px',
      //   '&:hover': {
      //     bgcolor: (theme) => theme.palette.neutralGray[10],
      //   },
      // },
    }
  },
  MuiChip: {
    styleOverrides: {
      colorSuccess: {
        backgroundColor: palette.green[10],
        color: palette.black80.main
      }
    }
  }
};

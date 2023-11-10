import { Tooltip, TooltipProps, styled, tooltipClasses } from '@mui/material';

export const DarkTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip
    // disableFocusListener
    // disableHoverListener
    // disableTouchListener
    // open
    {...props}
    classes={{ popper: className }}
  />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.darkBlue.main,
    color: theme.palette.common.white,
    fontSize: theme.typography.body_XS,
    border: '1px solid #dadde9',
    width: 240,
  },
}));

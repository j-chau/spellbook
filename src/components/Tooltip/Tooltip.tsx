import React from 'react';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material';

type PropsType = {
  children: React.ReactElement;
  content?: React.ReactNode | string;
};

const StyledTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#252627',
    color: '#E3E5E8',
    fontSize: theme.typography.pxToRem(14),
    border: 'none',
    padding: '0.8rem',
  },
}));

const CustomTooltip = ({ children, content }: PropsType) => {
  return <StyledTooltip title={content ?? null}>{children}</StyledTooltip>;
};

export default CustomTooltip;

import React, { FC } from 'react';
import Badge, { BadgeProps } from '@mui/material/Badge';
import { styled } from '@mui/material';

export interface OnlineBadgeProps {}

export const OnlineBadge = styled((props: BadgeProps) => (
   <Badge overlap='circular' anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} variant='dot' {...props} />
))(({ theme }) => ({
   '& .MuiBadge-badge': {
      backgroundColor: '#44b705',
      color: '#44b705',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
         position: 'absolute',
         top: 0,
         left: 0,
         width: '100%',
         height: '100%',
         borderRadius: '50%',
         animation: 'ripple 1.7s infinite ease-in-out',
         border: '1px solid currentColor',
         content: '""',
      },
   },
   '@keyframes ripple': {
      '0%': {
         transform: 'scale(0.8)',
      },
      '15%': {
         opacity: 1,
      },
      '100%': {
         transform: 'scale(2.5)',
         opacity: 0,
      },
   },
}));

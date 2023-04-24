import React, { FC } from 'react';
import { styled } from '@mui/material';
import Menu, { MenuProps } from '@mui/material/Menu';

export interface StyledMenuProps {}

export const StyledMenu = styled((props: MenuProps) => <Menu elevation={0} {...props} />)(({ theme }) => ({
   '& .MuiMenu-paper': {
      border: '1px solid',
      borderColor: theme.palette.divider,
      borderRadius: 10,
   },
}));

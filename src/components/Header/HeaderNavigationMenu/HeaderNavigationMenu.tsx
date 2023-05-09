import React, { FC, useState } from 'react';
import { useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import { NavigationMenuItems } from 'src/components/NavigationMenuItems';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { StyledMenu } from 'src/components/UI/StyledMenu';
import { ProfileMenuItems } from 'src/components/ProfileMenuItems';
import { useAnchorEl } from 'src/hooks/useAnchorEl';

export interface HeaderNavigationMenuProps {}

export const HeaderNavigationMenu: FC<HeaderNavigationMenuProps> = ({}) => {
   const { anchorEl, open, handleShow, handleClose } = useAnchorEl();

   return (
      <Box
         sx={{
            display: {
               md: 'none',
               xs: 'block',
            },
         }}
      >
         <IconButton onClick={handleShow}>
            <MenuIcon color='primary' />
         </IconButton>
         <StyledMenu anchorEl={anchorEl} open={open} onClose={handleClose}>
            <NavigationMenuItems handleClose={handleClose} />
            <Box
               sx={{
                  display: {
                     sm: 'none',
                     xs: 'block',
                  },
               }}
            >
               <ProfileMenuItems handleClose={handleClose} />
            </Box>
         </StyledMenu>
      </Box>
   );
};

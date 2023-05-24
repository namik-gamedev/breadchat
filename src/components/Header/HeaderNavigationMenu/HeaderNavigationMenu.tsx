import React, { FC, useState } from 'react';
import { useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import { NavigationMenuItems } from 'src/components/NavigationMenuItems';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { StyledMenu } from 'src/components/UI/StyledMenu';
import { ProfileMenuItems } from 'src/components/ProfileMenuItems';
import { useAnchorEl } from 'src/hooks/useAnchorEl';
import { useAppSelector } from 'src/hooks/useAppSelector';

export interface HeaderNavigationMenuProps {}

export const HeaderNavigationMenu: FC<HeaderNavigationMenuProps> = ({}) => {
   const { anchorEl, open, handleShow, handleClose } = useAnchorEl();

   const unreadedMessagesCount = useAppSelector((state) => state.chats.data).reduce((total, chat) => total + chat.unreadedMessagesCount, 0);

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
            <Badge badgeContent={unreadedMessagesCount} variant='dot' color='info'>
               <MenuIcon color='primary' />
            </Badge>
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

import React, { FC, useState } from 'react';
import { useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import { NavigationMenuItems } from 'src/components/NavigationMenuItems';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { StyledMenu } from 'src/components/UI/StyledMenu';
import { ProfileMenuItems } from 'src/components/ProfileMenuItems';

export interface HeaderNavigationMenuProps {}

export const HeaderNavigationMenu: FC<HeaderNavigationMenuProps> = ({}) => {
   const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
   const open = !!anchorEl;

   const handleClick = (e: React.MouseEvent) => {
      setAnchorEl(e.target as HTMLElement);
   };

   const handleClose = () => {
      setAnchorEl(null);
   };

   return (
      <Box
         sx={{
            display: {
               md: 'none',
               xs: 'block',
            },
         }}
      >
         <IconButton onClick={handleClick}>
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

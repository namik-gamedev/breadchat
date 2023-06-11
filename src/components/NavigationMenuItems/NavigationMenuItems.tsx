import React, { FC } from 'react';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import GroupIcon from '@mui/icons-material/Group';
import ForumIcon from '@mui/icons-material/Forum';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import { UnstyledLink } from '../UI/UnstyledLink';
import { Trans } from 'react-i18next';
import { useAppSelector } from 'src/hooks/useAppSelector';
import { UnreadedMessagesCountDisplay } from '../UI/UnreadedMessagesCountDisplay';

export interface NavigationMenuItemsProps {
   handleClose?: () => void;
}

export const NavigationMenuItems: FC<NavigationMenuItemsProps> = ({ handleClose }) => {
   const unreadedMessagesCount = useAppSelector((state) => state.chats.data).reduce((total, chat) => total + chat.unreadedMessagesCount, 0);

   return (
      <>
         <MenuItem component={UnstyledLink} to='/users' onClick={handleClose}>
            <ListItemIcon>
               <GroupIcon color='primary' />
            </ListItemIcon>
            <Trans>users</Trans>
         </MenuItem>

         <MenuItem component={UnstyledLink} to='/chats' onClick={handleClose}>
            <ListItemIcon>
               <Badge badgeContent={unreadedMessagesCount} variant='dot' color='info'>
                  <ForumIcon color='primary' />
               </Badge>
            </ListItemIcon>
            <Trans>chats</Trans>
         </MenuItem>
      </>
   );
};

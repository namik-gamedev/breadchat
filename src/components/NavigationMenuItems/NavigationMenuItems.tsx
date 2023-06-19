import ForumIcon from '@mui/icons-material/Forum';
import GroupIcon from '@mui/icons-material/Group';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Badge from '@mui/material/Badge';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuItem from '@mui/material/MenuItem';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'src/hooks/useAppSelector';
import { UnstyledLink } from '../UI/UnstyledLink';

interface Props {
   handleClose?: () => void;
}

export const NavigationMenuItems: FC<Props> = ({ handleClose }) => {
   const unreadedMessagesCount = useAppSelector((state) => state.chats.data).reduce((total, chat) => total + chat.unreadedMessagesCount, 0);
   const { t } = useTranslation();

   return (
      <>
         <MenuItem component={UnstyledLink} to='/users' onClick={handleClose}>
            <ListItemIcon>
               <GroupIcon color='primary' />
            </ListItemIcon>
            {t('users')}
         </MenuItem>

         <MenuItem component={UnstyledLink} to='/chats' onClick={handleClose}>
            <ListItemIcon>
               <Badge badgeContent={unreadedMessagesCount} variant='dot' color='info'>
                  <ForumIcon color='primary' />
               </Badge>
            </ListItemIcon>
            {t('chats')}
         </MenuItem>

         <MenuItem component={UnstyledLink} to='/about' onClick={handleClose}>
            <ListItemIcon>
               <InfoOutlinedIcon color='primary' />
            </ListItemIcon>
            {t('about')}
         </MenuItem>
      </>
   );
};

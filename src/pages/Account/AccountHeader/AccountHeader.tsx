import React, { FC, createContext, useContext, useRef } from 'react';
import { UserThumbnail } from 'src/pages/Users/UserThumbnail';
import { useAppSelector } from 'src/hooks/useAppSelector';
import { IUser } from 'src/types/types';
import Backdrop from '@mui/material/Backdrop';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import Input from '@mui/material/Input';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import ChatIcon from '@mui/icons-material/Chat';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { UnstyledLink } from 'src/components/UI/UnstyledLink';
import UserService from 'src/services/user.service';
import { UserAvatar } from 'src/components/UI/UserAvatar';
import moment from 'moment';
import { Trans } from 'react-i18next';
import { useOpen } from 'src/hooks/useOpen';
import { BlockUserDialog } from './BlockUserDialog';
import ChatService from 'src/services/chat.service';
import { UserOnlineStatus } from 'src/components/UI/UserOnlineStatus';
import { useIsUserBlocked } from 'src/hooks/useIsUserBlocked';
import { AccountMoreMenu } from './AccountMoreMenu';
import { GoToChatButton } from './GoToChatButton';
import { UserAvatarBackdrop } from 'src/components/UI/UserAvatarBackdrop';
import { useAccountContext } from 'src/hooks/useAccountContext';

export interface AccountHeaderProps {}

export const AccountHeader: FC<AccountHeaderProps> = () => {
   const { isCurrentUser, isSelfBlockedByUser, isUserBlocked } = useAccountContext();
   const user = useAccountContext().user!;

   const inputRef = useRef<HTMLInputElement | null>(null);

   const { open: avatarOpen, handleClose: handleAvatarClose, handleShow: handleAvatarShow } = useOpen();

   const { open: dialogOpen, handleClose: handleDialogClose, handleShow: handleDialogShow } = useOpen();

   return (
      <Stack direction='row' sx={{ justifyContent: 'space-between' }}>
         <Stack direction='row' spacing={2} alignItems='center'>
            <Box onClick={isSelfBlockedByUser ? undefined : handleAvatarShow}>
               <UserAvatar sx={{ width: 50, height: 50, fontSize: '1.5em' }} user={user} />
            </Box>

            <Box>
               <Typography variant='h6' sx={{ fontWeight: 'normal' }} component='h2'>
                  {user.displayName}
               </Typography>
               <Typography variant='body1' sx={{ color: 'text.secondary' }}>
                  <UserOnlineStatus user={user} />
               </Typography>
            </Box>
         </Stack>

         <Stack direction='row' sx={{ alignItems: 'center' }} spacing={1}>
            {!isCurrentUser && <GoToChatButton />}
            <AccountMoreMenu handleBlockDialogShow={handleDialogShow} />
         </Stack>

         <BlockUserDialog open={dialogOpen} handleClose={handleDialogClose} user={user} blocked={isUserBlocked} />

         <UserAvatarBackdrop open={avatarOpen} handleClose={handleAvatarClose} photoURL={user.photoURL} />
      </Stack>
   );
};

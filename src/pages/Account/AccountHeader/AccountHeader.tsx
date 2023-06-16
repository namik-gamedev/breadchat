import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { FC } from 'react';
import { UserAvatar } from 'src/components/UI/UserAvatar';
import { UserAvatarBackdrop } from 'src/components/UI/UserAvatarBackdrop';
import { UserOnlineStatus } from 'src/components/UI/UserOnlineStatus';
import { useAccountContext } from 'src/hooks/useAccountContext';
import { useOpen } from 'src/hooks/useOpen';
import { AccountMoreMenu } from './AccountMoreMenu';
import { BlockUserDialog } from './BlockUserDialog';
import { GoToChatButton } from './GoToChatButton';

export interface AccountHeaderProps {}

export const AccountHeader: FC<AccountHeaderProps> = () => {
   const { isCurrentUser, isSelfBlockedByUser, isUserBlocked } = useAccountContext();
   const user = useAccountContext().user!;

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

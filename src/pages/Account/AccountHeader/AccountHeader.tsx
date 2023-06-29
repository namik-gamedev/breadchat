import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { FC } from 'react';
import { UserAvatar } from 'src/components/UI/UserAvatar';
import { UserAvatarBackdrop } from 'src/components/UI/UserAvatarBackdrop';
import { UserOnlineStatus } from 'src/components/UI/UserOnlineStatus';
import { useAccount } from 'src/hooks/useAccount';
import { useOpen } from 'src/hooks/useOpen';
import { AccountMoreMenu } from './AccountMoreMenu';
import { EditNameForm } from './EditNameForm';
import { GoToChatButton } from './GoToChatButton';

export const AccountHeader: FC = () => {
   const { isCurrentUser, isSelfBlockedByUser } = useAccount();
   const user = useAccount().user!;

   const { open: avatarOpen, handleClose: handleAvatarClose, handleShow: handleAvatarShow } = useOpen();
   const { open: formOpen, handleClose: handleFormClose, handleShow: handleFormShow } = useOpen();

   return (
      <Stack direction='row' sx={{ justifyContent: 'space-between' }}>
         <Stack direction='row' spacing={2} alignItems='center'>
            <Box onClick={isSelfBlockedByUser ? undefined : handleAvatarShow}>
               <UserAvatar sx={{ width: 50, height: 50, fontSize: '1.5em' }} user={user} />
            </Box>

            {formOpen ? (
               <EditNameForm handleClose={handleFormClose} />
            ) : (
               <Box>
                  <Typography variant='h6' sx={{ fontWeight: 'normal' }} component='h2'>
                     {user.displayName}
                  </Typography>
                  <Typography variant='body1' sx={{ color: 'text.secondary' }}>
                     <UserOnlineStatus user={user} />
                  </Typography>
               </Box>
            )}
         </Stack>

         <Stack direction='row' sx={{ alignItems: 'center' }} spacing={1}>
            {!isCurrentUser && <GoToChatButton />}
            <AccountMoreMenu handleFormShow={handleFormShow} />
         </Stack>

         <UserAvatarBackdrop open={avatarOpen} handleClose={handleAvatarClose} photoURL={user.photoURL} />
      </Stack>
   );
};

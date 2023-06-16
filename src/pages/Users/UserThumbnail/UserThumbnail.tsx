import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAvatar } from 'src/components/UI/UserAvatar';
import { IUser } from 'src/types/types';
import { UserOnlineStatus } from '../../../components/UI/UserOnlineStatus';

export interface UserThumbnailProps {
   user: IUser;
}

export const UserThumbnail: FC<UserThumbnailProps> = ({ user }) => {
   const navigate = useNavigate();

   const handleAccountNavigate = () => {
      navigate(`/account/${user.uid}`);
   };

   return (
      <Stack onClick={handleAccountNavigate} sx={{ cursor: 'pointer' }} direction='row' spacing={2} alignItems='center'>
         <UserAvatar sx={{ width: 50, height: 50, fontSize: '1.5em' }} user={user} />
         <Box sx={{ minWidth: 0, width: 1 }}>
            <Typography noWrap variant='h6' sx={{ fontWeight: 'normal' }} component='h2'>
               {user.displayName}
            </Typography>
            <Typography variant='body1' sx={{ color: 'text.secondary' }}>
               <UserOnlineStatus user={user} />
            </Typography>
         </Box>
      </Stack>
   );
};

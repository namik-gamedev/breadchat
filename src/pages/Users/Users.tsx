import { Grid } from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ForumIcon from '@mui/icons-material/Forum';
import { FC, useEffect } from 'react';
import { StyledBox } from 'src/components/UI/StyledBox';
import { useAppDispatch } from 'src/hooks/useAppDispatch';
import { useAppSelector } from 'src/hooks/useAppSelector';
import { UserThumbnail } from '../../components/UI/UserThumbnail';
import IconButton from '@mui/material/IconButton';

export interface UsersProps {}

// TODO: replace user list with dynamic database search

export const Users: FC<UsersProps> = ({}) => {
   const users = useAppSelector((state) => state.users.data);
   const { uid } = useAppSelector((state) => state.user.data!);

   useEffect(() => {
      document.title = 'Users';

      return () => {
         document.title = 'Bread';
      };
   }, []);

   return (
      <Stack component={StyledBox} spacing={1} sx={{ p: 2, height: 1, overflow: 'auto' }}>
         <Typography sx={{ textAlign: 'center' }} variant='h4'>
            Users
         </Typography>
         {users.length > 0 ? (
            <Stack spacing={2}>{users.map((user) => user.uid !== uid && <UserThumbnail goToChatOnClick user={user} />)}</Stack>
         ) : (
            <Stack sx={{ justifyContent: 'center', alignItems: 'center', height: 1 }}>
               <Typography variant='body1'>No users ;(</Typography>
            </Stack>
         )}
      </Stack>
   );
};

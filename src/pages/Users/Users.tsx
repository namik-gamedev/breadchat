import { Grid } from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import { FC, useEffect } from 'react';
import { StyledBox } from 'src/components/UI/StyledBox';
import { useAppDispatch } from 'src/hooks/useAppDispatch';
import { useAppSelector } from 'src/hooks/useAppSelector';
import { UserThumbnail } from '../../components/UI/UserThumbnail';
import IconButton from '@mui/material/IconButton';
import { Trans, useTranslation } from 'react-i18next';
import { ChatsSkeleton } from 'src/components/UI/skeletons/ChatsSkeleton';
import { useUsersLoad } from 'src/hooks/useUsersLoad';
import { UsersSkeleton } from 'src/components/UI/skeletons/UsersSkeleton';

export interface UsersProps {}

// TODO: replace user list with dynamic database search

export const Users: FC<UsersProps> = ({}) => {
   const users = useAppSelector((state) => state.users.data);
   const usersLoaded = useAppSelector((state) => state.global.dataLoad.users);
   const { uid } = useAppSelector((state) => state.user.data!);

   const { t } = useTranslation();

   useEffect(() => {
      document.title = t('users');

      return () => {
         document.title = 'Bread';
      };
   }, []);

   return (
      <Stack component={StyledBox} spacing={1} sx={{ pt: 2, height: 1, overflow: 'auto' }}>
         <Typography sx={{ textAlign: 'center' }} variant='h4'>
            <Trans>users</Trans>
         </Typography>
         {usersLoaded ? (
            users.length > 0 ? (
               <MenuList>
                  <Stack>
                     {users.map(
                        (user) =>
                           user.uid !== uid && (
                              <MenuItem divider>
                                 <Box sx={{ width: 1 }}>
                                    <UserThumbnail goToChatOnClick user={user} />
                                 </Box>
                              </MenuItem>
                           )
                     )}
                  </Stack>
               </MenuList>
            ) : (
               <Stack sx={{ justifyContent: 'center', alignItems: 'center', height: 1 }}>
                  <Typography variant='body1'>
                     <Trans>no users</Trans>
                  </Typography>
               </Stack>
            )
         ) : (
            <UsersSkeleton />
         )}
      </Stack>
   );
};

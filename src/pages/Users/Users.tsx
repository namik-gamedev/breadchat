import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { FC, useEffect, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { StyledBox } from 'src/components/UI/StyledBox';
import { UsersSkeleton } from 'src/components/UI/skeletons/UsersSkeleton';
import { useAppSelector } from 'src/hooks/useAppSelector';
import { UsersProvider } from 'src/providers/UsersProvider';
import { IUser } from 'src/types/types';
import { IUsersShowType } from '../../types/types';
import { UserSearchForm } from './UserSearchForm';
import { UsersList } from './UsersList';

export const Users: FC = () => {
   const usersLoaded = useAppSelector((state) => state.global.dataLoad.users);

   const [filteredUsers, setFilteredUsers] = useState<IUser[]>([]);
   const [searchQuery, setSearchQuery] = useState('');
   const [usersShowType, setUsersShowType] = useState(IUsersShowType.ONLINE);

   const { t } = useTranslation();

   useEffect(() => {
      document.title = t('users');

      return () => {
         document.title = 'Bread';
      };
   }, []);

   return (
      <UsersProvider
         value={{
            searchQuery,
            setSearchQuery,
            filteredUsers,
            setFilteredUsers,
            usersShowType,
            setUsersShowType,
         }}
      >
         <Stack component={StyledBox} spacing={1} sx={{ pt: 1, height: 1 }}>
            {usersLoaded ? (
               <>
                  <Stack sx={{ alignItems: 'center' }}>
                     <Typography variant='h5'>
                        <Trans>users</Trans>
                     </Typography>
                  </Stack>

                  <UserSearchForm />

                  <Box sx={{ height: 1, overflow: 'auto' }}>
                     <UsersList />
                  </Box>
               </>
            ) : (
               <UsersSkeleton />
            )}
         </Stack>
      </UsersProvider>
   );
};

import Grid from '@mui/material/Grid';
import FormControlLabel from '@mui/material/FormControlLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import { Dispatch, FC, SetStateAction, createContext, useEffect, useState } from 'react';
import { StyledBox } from 'src/components/UI/StyledBox';
import { useAppDispatch } from 'src/hooks/useAppDispatch';
import { useAppSelector } from 'src/hooks/useAppSelector';
import { UserThumbnail } from './UserThumbnail';
import IconButton from '@mui/material/IconButton';
import { Trans, useTranslation } from 'react-i18next';
import { ChatsSkeleton } from 'src/components/UI/skeletons/ChatsSkeleton';
import { useUsersLoad } from 'src/hooks/useUsersLoad';
import { UsersSkeleton } from 'src/components/UI/skeletons/UsersSkeleton';
import { UsersList } from './UsersList';
import { NoUsersMessage } from './NoUsersMessage';
import { UserSearchForm } from './UserSearchForm';
import { IUser, IUsersContext } from 'src/types/types';
import { UsersShowType } from '../../types/types';
import { UsersProvider } from 'src/providers/UsersProvider';

export interface UsersProps {}

export const Users: FC<UsersProps> = ({}) => {
   const usersLoaded = useAppSelector((state) => state.global.dataLoad.users);

   const [filteredUsers, setFilteredUsers] = useState<IUser[]>([]);
   const [searchQuery, setSearchQuery] = useState('');
   const [usersShowType, setUsersShowType] = useState(UsersShowType.ONLINE);

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

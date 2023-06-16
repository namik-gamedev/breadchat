import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { FC, useState } from 'react';
import { useUsersContext } from 'src/hooks/useUsersContext';
import { UserThumbnail } from 'src/pages/Users/UserThumbnail';
import { NoUsersMessage } from '../NoUsersMessage';

export interface UsersListProps {}

const USERS_IN_PAGE = 20;

export const UsersList: FC<UsersListProps> = ({}) => {
   const { filteredUsers: users } = useUsersContext();

   const [page, setPage] = useState(1);

   const handleChange = (_e: any, p: number) => {
      setPage(p);
   };

   return users.length > 0 ? (
      <Box>
         <MenuList>
            {users.slice((page - 1) * USERS_IN_PAGE, (page - 1) * USERS_IN_PAGE + USERS_IN_PAGE).map((user) => (
               <MenuItem key={user.uid} divider>
                  <Box sx={{ width: 1 }}>
                     <UserThumbnail user={user} />
                  </Box>
               </MenuItem>
            ))}
         </MenuList>

         {users.length > USERS_IN_PAGE && (
            <Stack sx={{ alignItems: 'center' }}>
               <Pagination onChange={handleChange} count={Math.ceil(users.length / USERS_IN_PAGE)} />
            </Stack>
         )}
      </Box>
   ) : (
      <NoUsersMessage />
   );
};

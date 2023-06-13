import React, { FC, useEffect, useState } from 'react';
import MenuList from '@mui/material/MenuList';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';
import MenuItem from '@mui/material/MenuItem';
import { UserThumbnail } from 'src/pages/Users/UserThumbnail';
import { IUser } from 'src/types/types';
import { useAppSelector } from 'src/hooks/useAppSelector';
import { NoUsersMessage } from '../NoUsersMessage';

export interface UsersListProps {
   users: IUser[];
   searchQuery: string;
}

const USERS_IN_PAGE = 20;

export const UsersList: FC<UsersListProps> = ({ users, searchQuery }) => {
   const [newUsers, setNewUsers] = useState(users);

   const [page, setPage] = useState(1);

   const handleChange = (e: React.ChangeEvent<unknown>, p: number) => {
      setPage(p);
   };

   useEffect(() => {
      if (searchQuery === '') {
         setNewUsers(users.filter((u) => u.online));
      } else {
         setNewUsers(users);
      }
   }, [users, searchQuery]);

   return newUsers.length > 0 ? (
      <Box>
         <MenuList>
            {newUsers.slice((page - 1) * USERS_IN_PAGE, (page - 1) * USERS_IN_PAGE + USERS_IN_PAGE).map((u) => {
               return (
                  <MenuItem divider>
                     <Box sx={{ width: 1 }}>
                        <UserThumbnail user={u} />
                     </Box>
                  </MenuItem>
               );
            })}
         </MenuList>

         {users.length - 1 > USERS_IN_PAGE && (
            <Stack sx={{ alignItems: 'center' }}>
               <Pagination onChange={handleChange} count={Math.ceil((users.length - 1) / USERS_IN_PAGE)} />
            </Stack>
         )}
      </Box>
   ) : (
      <NoUsersMessage isSearchQueryEmpty={searchQuery === ''} />
   );
};

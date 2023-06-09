import React, { FC } from 'react';
import MenuList from '@mui/material/MenuList';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import { UserThumbnail } from 'src/pages/Users/UserThumbnail';
import { IUser } from 'src/types/types';
import { useAppSelector } from 'src/hooks/useAppSelector';
import { NoUsersMessage } from '../NoUsersMessage';

export interface UsersListProps {
   users: IUser[];
}

export const UsersList: FC<UsersListProps> = ({ users }) => {
   const user = useAppSelector((state) => state.user.data)!;

   return users.length > 0 ? (
      <MenuList>
         <Box>
            {users.map(
               (u) =>
                  user.uid !== u.uid && (
                     <MenuItem divider>
                        <Box sx={{ width: 1 }}>
                           <UserThumbnail user={u} />
                        </Box>
                     </MenuItem>
                  )
            )}
         </Box>
      </MenuList>
   ) : (
      <NoUsersMessage />
   );
};

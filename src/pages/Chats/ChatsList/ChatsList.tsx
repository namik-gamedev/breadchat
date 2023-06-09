import React, { FC, useState } from 'react';
import MenuList from '@mui/material/MenuList';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import { UserThumbnail } from 'src/pages/Users/UserThumbnail';
import { IChat, IUser } from 'src/types/types';
import { useAppSelector } from 'src/hooks/useAppSelector';
import { ChatThumbnail } from '../ChatThumbnail';
import Pagination from '@mui/material/Pagination';
import { NoChatsMessage } from '../NoChatsMessage';

export interface ChatsListProps {
   chats: IChat[];
}

const CHATS_IN_PAGE = 20;

export const ChatsList: FC<ChatsListProps> = ({ chats }) => {
   const [page, setPage] = useState(1);

   const handleChange = (e: React.ChangeEvent<unknown>, p: number) => {
      setPage(p);
   };

   return chats.length > 0 ? (
      <Box>
         <MenuList>
            {chats.slice((page - 1) * CHATS_IN_PAGE, (page - 1) * CHATS_IN_PAGE + CHATS_IN_PAGE).map((chat) => (
               <MenuItem divider>
                  <Box sx={{ width: 1 }}>
                     <ChatThumbnail chat={chat} />
                  </Box>
               </MenuItem>
            ))}
         </MenuList>

         {chats.length > CHATS_IN_PAGE && (
            <Stack sx={{ alignItems: 'center' }}>
               <Pagination onChange={handleChange} count={Math.ceil(chats.length / CHATS_IN_PAGE)} />
            </Stack>
         )}
      </Box>
   ) : (
      <NoChatsMessage />
   );
};

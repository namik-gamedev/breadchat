import React, { FC } from 'react';
import MenuList from '@mui/material/MenuList';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import { UserThumbnail } from 'src/pages/Users/UserThumbnail';
import { IChat, IUser } from 'src/types/types';
import { useAppSelector } from 'src/hooks/useAppSelector';
import { ChatThumbnail } from '../ChatThumbnail';
import { NoChatsMessage } from '../NoChatsMessage';

export interface ChatsListProps {
   chats: IChat[];
}

export const ChatsList: FC<ChatsListProps> = ({ chats }) => {
   return chats.length > 0 ? (
      <MenuList>
         <Stack>
            {chats.map((chat) => (
               <MenuItem divider>
                  <Box sx={{ width: 1 }}>
                     <ChatThumbnail chat={chat} />
                  </Box>
               </MenuItem>
            ))}
         </Stack>
      </MenuList>
   ) : (
      <NoChatsMessage />
   );
};

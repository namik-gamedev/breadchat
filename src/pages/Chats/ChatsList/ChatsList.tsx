import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { FC, useState } from 'react';
import { IChat } from 'src/types/types';
import { ChatThumbnail } from '../ChatThumbnail';
import { NoChatsMessage } from '../NoChatsMessage';

interface Props {
   chats: IChat[];
}

const CHATS_IN_PAGE = 20;

export const ChatsList: FC<Props> = ({ chats }) => {
   const [page, setPage] = useState(1);

   const handleChange = (_e: any, p: number) => {
      setPage(p);
   };

   return chats.length > 0 ? (
      <Box>
         <MenuList>
            {chats.slice((page - 1) * CHATS_IN_PAGE, (page - 1) * CHATS_IN_PAGE + CHATS_IN_PAGE).map((chat, index) => (
               <MenuItem key={index} divider>
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

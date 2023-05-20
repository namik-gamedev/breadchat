import React, { FC, useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import { db } from 'src/firebase/firebase';
import { StyledBox } from 'src/components/UI/StyledBox';
import { useAppDispatch } from 'src/hooks/useAppDispatch';
import { useAppSelector } from 'src/hooks/useAppSelector';
import { IChat } from 'src/types/types';
import { onValue, ref } from 'firebase/database';
import { UserThumbnail } from 'src/components/UI/UserThumbnail';
import { ChatThumbnail } from './ChatThumbnail';
import { Trans, useTranslation } from 'react-i18next';
import { ChatsSkeleton } from 'src/components/UI/skeletons/ChatsSkeleton';
import { useChatsLoad } from 'src/hooks/useChatsLoad';

export interface ChatsProps {}

export const Chats: FC<ChatsProps> = ({}) => {
   const dispatch = useAppDispatch();
   const chatsLoaded = useAppSelector((state) => state.global.dataLoad.chats);
   const chats = useAppSelector((state) => state.chats.data);

   const { t } = useTranslation();

   useEffect(() => {
      document.title = t('chats');

      return () => {
         document.title = 'Bread';
      };
   }, []);

   console.log(chats);

   return (
      <Stack component={StyledBox} spacing={1} sx={{ pt: 2, height: 1, overflow: 'auto' }}>
         <Typography sx={{ textAlign: 'center' }} variant='h4'>
            <Trans>chats</Trans>
         </Typography>

         {chatsLoaded ? (
            chats.length > 0 ? (
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
               <Stack sx={{ justifyContent: 'center', alignItems: 'center', height: 1 }}>
                  <Typography variant='body1'>
                     <Trans>no chats</Trans>
                  </Typography>
               </Stack>
            )
         ) : (
            <ChatsSkeleton />
         )}
      </Stack>
   );
};

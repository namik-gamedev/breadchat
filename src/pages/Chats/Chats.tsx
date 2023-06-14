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
import { UserThumbnail } from 'src/pages/Users/UserThumbnail';
import { ChatThumbnail } from './ChatThumbnail';
import { Trans, useTranslation } from 'react-i18next';
import { ChatsSkeleton } from 'src/components/UI/skeletons/ChatsSkeleton';
import { useChatsLoad } from 'src/hooks/useChatsLoad';
import { ChatsList } from './ChatsList';
import { NoChatsMessage } from './NoChatsMessage';

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

   return (
      <Stack component={StyledBox} spacing={1} sx={{ pt: 1, height: 1 }}>
         {chatsLoaded ? (
            <>
               <Stack sx={{ alignItems: 'center' }}>
                  <Typography variant='h5'>
                     <Trans>chats</Trans>
                  </Typography>
               </Stack>

               <Box sx={{ height: 1, overflow: 'auto' }}>
                  <ChatsList chats={chats} />
               </Box>
            </>
         ) : (
            <ChatsSkeleton />
         )}
      </Stack>
   );
};

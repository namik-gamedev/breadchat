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

export interface ChatsProps {}

export const Chats: FC<ChatsProps> = ({}) => {
   const dispatch = useAppDispatch();
   const users = useAppSelector((state) => state.users.data);
   const chats = useAppSelector((state) => state.chats.data);

   const { t } = useTranslation();

   useEffect(() => {
      document.title = t('chats');

      return () => {
         document.title = 'Bread';
      };
   }, []);

   return (
      <Stack component={StyledBox} spacing={1} sx={{ pt: 2, height: 1, overflow: 'auto' }}>
         <Typography sx={{ textAlign: 'center' }} variant='h4'>
            <Trans>chats</Trans>
         </Typography>

         {chats.length > 0 ? (
            <MenuList>
               <Stack>
                  <Divider />
                  {chats.map((chat) => (
                     <>
                        <MenuItem>
                           <Box sx={{ width: 1 }}>
                              <ChatThumbnail chat={chat} />
                           </Box>
                        </MenuItem>
                        <Divider />
                     </>
                  ))}
               </Stack>
            </MenuList>
         ) : (
            <Stack sx={{ justifyContent: 'center', alignItems: 'center', height: 1 }}>
               <Typography variant='body1'>
                  <Trans>no chats</Trans>
               </Typography>
            </Stack>
         )}
      </Stack>
   );
};

import React, { FC, useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { db } from 'src/firebase/firebase';
import { StyledBox } from 'src/components/UI/StyledBox';
import { useAppDispatch } from 'src/hooks/useAppDispatch';
import { useAppSelector } from 'src/hooks/useAppSelector';
import { IChat } from 'src/types/types';
import { onValue, ref } from 'firebase/database';
import { UserThumbnail } from 'src/components/UI/UserThumbnail';

export interface ChatsProps {}

export const Chats: FC<ChatsProps> = ({}) => {
   const dispatch = useAppDispatch();
   const users = useAppSelector((state) => state.users.data);
   const chats = useAppSelector((state) => state.chats.data);

   useEffect(() => {
      document.title = 'Chats';

      return () => {
         document.title = 'Bread';
      };
   }, []);

   return (
      <Stack component={StyledBox} spacing={1} sx={{ p: 2, height: 1, overflow: 'auto' }}>
         <Typography sx={{ textAlign: 'center' }} variant='h4'>
            Chats
         </Typography>
         {chats.length > 0 ? (
            <Stack spacing={2}>
               {chats.map((chat) => {
                  const user = users.find((user) => chat.interlocutor.uid === user.uid)!;

                  return <UserThumbnail goToChatOnClick user={user} />;
               })}
            </Stack>
         ) : (
            <Stack sx={{ justifyContent: 'center', alignItems: 'center', height: 1 }}>
               <Typography variant='body1'>No chats ;(</Typography>
            </Stack>
         )}
      </Stack>
   );
};

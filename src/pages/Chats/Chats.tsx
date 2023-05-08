import React, { FC, useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { db } from 'src/firebase/firebase';
import { StyledBox } from 'src/components/UI/StyledBox';
import { useAppDispatch } from 'src/hooks/useAppDispatch';
import { useAppSelector } from 'src/hooks/useAppSelector';
import { IChat } from 'src/types/types';
import { onValue, ref } from 'firebase/database';
import { UserThumbnailWithChatBtn } from '../../components/UI/UserThumbnailWithChatBtn';

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
      <Stack spacing={2}>
         <StyledBox sx={{ p: 2.5 }}>
            <Typography sx={{ textAlign: 'center' }} variant='h4'>
               Chats
            </Typography>
         </StyledBox>

         <StyledBox sx={{ p: 2 }}>
            {chats.length > 0 ? (
               <Stack spacing={3}>
                  {users
                     .filter((user) => chats.find(({ interlocutor }) => interlocutor.uid === user.uid))
                     .map((user) => (
                        <UserThumbnailWithChatBtn user={user} />
                     ))}
               </Stack>
            ) : (
               <Typography textAlign='center' variant='body1'>
                  No chats ;(
               </Typography>
            )}
         </StyledBox>
      </Stack>
   );
};

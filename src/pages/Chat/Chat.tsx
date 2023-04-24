import React, { FC, useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { StyledBox } from 'src/components/UI/StyledBox';
import { useAppSelector } from 'src/hooks/useAppSelector';
import { UserAvatar } from 'src/components/UI/UserAvatar';
import { useParams } from 'react-router-dom';
import { IChat, IMessage, IMessageSender, IUser } from 'src/types/types';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { ChatMessage } from 'src/pages/Chat/ChatMessage';
import { NotFound } from '../NotFound';
import { onValue, ref } from 'firebase/database';
import { db } from 'src/firebase/firebase';
import { StyledForm } from 'src/components/UI/StyledForm';
import TextField from '@mui/material/TextField';
import { ChatMessages } from './ChatMessages';
import { MessageForm } from './MessageForm';

export interface ChatProps {}

export const Chat: FC<ChatProps> = ({}) => {
   const { userUid } = useParams();
   const user = useAppSelector((state) => state.user.data);
   const interlocutor = useAppSelector((state) => state.users.data).find((user) => user.uid === userUid);

   const messages = useAppSelector((state) => state.chats.data)![userUid!]?.messages;

   useEffect(() => {
      document.title = 'Chat with...';

      return () => {
         document.title = 'Bread';
      };
   }, []);

   return interlocutor ? (
      <StyledBox>
         <CardHeader
            avatar={<UserAvatar sx={{ width: 50, height: 50, fontSize: '1.5em' }} user={interlocutor} />}
            action={<IconButton aria-label=''></IconButton>}
            title={<Typography variant='h5'>{interlocutor?.displayName}</Typography>}
            subheader={
               <Typography variant='body1' sx={{ color: 'grey' }}>
                  Online
               </Typography>
            }
         />
         <Stack spacing={2} p={2}>
            {messages && messages.length > 0 ? (
               <ChatMessages messages={messages} />
            ) : (
               <Typography textAlign='center' variant='body1'>
                  No messages in chat ;(
               </Typography>
            )}
            <MessageForm interlocutor={interlocutor} />
         </Stack>
      </StyledBox>
   ) : (
      <NotFound />
   );
};

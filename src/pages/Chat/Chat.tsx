import React, { FC, useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { StyledBox } from 'src/components/UI/StyledBox';
import { useAppSelector } from 'src/hooks/useAppSelector';
import { UserAvatar } from 'src/components/UI/UserAvatar';
import { useParams } from 'react-router-dom';
import CardHeader from '@mui/material/CardHeader';
import CircularProgress from '@mui/material/CircularProgress';
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
import { ChatForm } from './ChatForm';
import moment from 'moment';
import { ChatHeader } from './ChatHeader';
import { ConfirmDialog } from 'src/components/UI/ConfirmDialog';
import { IUser } from 'src/types/types';
import ChatService from 'src/services/chat.service';
import { useScroll } from 'src/hooks/useScroll';

export interface ChatProps {}

export const Chat: FC<ChatProps> = ({}) => {
   const { interlocutorUid } = useParams();

   const user = useAppSelector((state) => state.user.data!);
   const interlocutor = useAppSelector((state) => state.users.data).find((user) => user.uid === interlocutorUid);

   const chat = useAppSelector((state) => state.chats.data).find((chat) => chat.interlocutor?.uid === interlocutor?.uid);

   useEffect(() => {
      document.title = interlocutor?.displayName || 'No user with this id';

      return () => {
         document.title = 'Bread';
      };
   }, []);

   useEffect(() => {
      if (chat) {
         ChatService.unsetUnreadedMessagesCount(user.uid, interlocutor!.uid);
      }
   }, [chat?.messages]);

   return interlocutor ? (
      <StyledBox sx={{ p: 2, height: 1 }}>
         <Stack spacing={1} direction='column' sx={{ height: 1 }}>
            <ChatHeader interlocutor={interlocutor} />
            <ChatMessages chat={chat} />
            <ChatForm chat={chat} interlocutor={interlocutor} />
         </Stack>
      </StyledBox>
   ) : (
      <NotFound />
   );
};

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
   const { userUid } = useParams();

   const user = useAppSelector((state) => state.user.data!);
   const interlocutor = useAppSelector((state) => state.users.data).find((user) => user.uid === userUid);

   const chat = useAppSelector((state) => state.chats.data)?.find((chat) => chat.interlocutor.uid === userUid);

   useEffect(() => {
      document.title = interlocutor?.displayName || 'No user with this id';

      if (!chat && interlocutor) {
         ChatService.create(user, interlocutor);
      }

      return () => {
         document.title = 'Bread';
      };
   }, []);

   return interlocutor ? (
      <Stack spacing={2} direction='column' sx={{ height: 1 }}>
         <ChatHeader interlocutor={interlocutor} />
         {chat ? (
            <ChatMessages interlocutor={interlocutor} />
         ) : (
            <Stack direction='row' justifyContent='center'>
               <CircularProgress size={70} />
            </Stack>
         )}
         <ChatForm interlocutor={interlocutor} />
      </Stack>
   ) : (
      <NotFound />
   );
};

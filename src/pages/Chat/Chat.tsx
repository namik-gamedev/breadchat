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
import { IMessage, IUser } from 'src/types/types';
import ChatService from 'src/services/chat.service';
import { useScroll } from 'src/hooks/useScroll';
import { ChatSkeleton } from 'src/components/UI/skeletons/ChatSkeleton';
import { useTranslation } from 'react-i18next';
import { UnblockButton } from './UnblockButton';
import { UserBlockedYouMessage } from './UserBlockedYouMessage';
import { useIsUserBlocked } from 'src/hooks/useIsUserBlocked';

export interface ChatProps {}

export const Chat: FC<ChatProps> = ({}) => {
   const { interlocutorUid } = useParams();

   const chatsLoaded = useAppSelector((state) => state.global.dataLoad.chats);

   const user = useAppSelector((state) => state.user.data);
   const interlocutor = useAppSelector((state) => state.users.data).find((user) => user.uid === interlocutorUid);

   const isSelfBlockedByInterlocutor = useIsUserBlocked(user?.uid, interlocutor?.uid);
   const isInterlocutorBlocked = useIsUserBlocked(interlocutor?.uid, user?.uid);

   const chat = useAppSelector((state) => state.chats.data).find((chat) => chat.interlocutor.uid === interlocutorUid);

   const [editingMessage, setEditingMessage] = useState<IMessage | null>(null);

   const { t } = useTranslation();

   useEffect(() => {
      document.title = interlocutor?.displayName || t('no user with this id');

      return () => {
         document.title = 'Bread';
      };
   }, [interlocutor]);

   useEffect(() => {
      if (interlocutor) {
         if (chat) {
            ChatService.unsetUnreadedMessagesCount(user!.uid, interlocutor!.uid);
         } else {
            ChatService.create(user!, interlocutor);
         }
      }
   }, [chat?.messages]);

   if (chatsLoaded) {
      return interlocutor ? (
         <StyledBox sx={{ p: 1, height: 1 }}>
            <Stack spacing={1} direction='column' sx={{ height: 1 }}>
               <ChatHeader chat={chat} interlocutor={interlocutor} />
               <ChatMessages editingMessage={editingMessage} setEditingMessage={setEditingMessage} chat={chat} />
               {isInterlocutorBlocked && <UnblockButton user={interlocutor} />}
               {!isSelfBlockedByInterlocutor && !isInterlocutorBlocked && (
                  <ChatForm editingMessage={editingMessage} setEditingMessage={setEditingMessage} chat={chat} interlocutor={interlocutor} />
               )}
            </Stack>
         </StyledBox>
      ) : (
         <NotFound />
      );
   } else {
      return <ChatSkeleton />;
   }
};

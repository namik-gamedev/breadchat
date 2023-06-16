import Stack from '@mui/material/Stack';
import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { StyledBox } from 'src/components/UI/StyledBox';
import { ChatSkeleton } from 'src/components/UI/skeletons/ChatSkeleton';
import { useAppSelector } from 'src/hooks/useAppSelector';
import { useIsUserBlocked } from 'src/hooks/useIsUserBlocked';
import { ChatProvider } from 'src/providers/ChatProvider';
import ChatService from 'src/services/chat.service';
import { IMessage } from 'src/types/types';
import { NotFound } from '../NotFound';
import { ChatForm } from './ChatForm';
import { ChatHeader } from './ChatHeader';
import { ChatMessages } from './ChatMessages';
import { UnblockButton } from './UnblockButton';

export interface ChatProps {}

export const Chat: FC<ChatProps> = ({}) => {
   const { interlocutorUid } = useParams();

   const chatsLoaded = useAppSelector((state) => state.global.dataLoad.chats);

   const user = useAppSelector((state) => state.user.data);
   const interlocutor = useAppSelector((state) => state.users.data).find((user) => user.uid === interlocutorUid);

   const isSelfBlockedByInterlocutor = useIsUserBlocked(user?.uid, interlocutor?.uid);
   const isInterlocutorBlocked = useIsUserBlocked(interlocutor?.uid, user?.uid);

   const chat = useAppSelector((state) => state.chats.data).find((c) => c.interlocutor.uid === interlocutorUid);

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
         <ChatProvider
            value={{
               chat,
               interlocutor,
               editingMessage,
               setEditingMessage,
               isInterlocutorBlocked,
               isSelfBlockedByInterlocutor,
            }}
         >
            <StyledBox sx={{ p: 1, height: 1 }}>
               <Stack spacing={1} direction='column' sx={{ height: 1 }}>
                  <ChatHeader />
                  <ChatMessages />
                  {isInterlocutorBlocked && <UnblockButton user={interlocutor} />}
                  {!isSelfBlockedByInterlocutor && !isInterlocutorBlocked && <ChatForm />}
               </Stack>
            </StyledBox>
         </ChatProvider>
      ) : (
         <NotFound />
      );
   } else {
      return <ChatSkeleton />;
   }
};

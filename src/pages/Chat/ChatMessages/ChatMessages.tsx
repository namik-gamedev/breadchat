import React, { Dispatch, FC, SetStateAction, createRef, useEffect, useRef, useState } from 'react';
import Stack from '@mui/material/Stack';
import Box, { BoxProps } from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { IChat, IMessage, IUser } from 'src/types/types';
import { ChatMessage } from '../ChatMessage/ChatMessage';
import { useAppSelector } from 'src/hooks/useAppSelector';
import { useScroll } from 'src/hooks/useScroll';
import { StyledBox } from 'src/components/UI/StyledBox';
import { Trans } from 'react-i18next';

export interface ChatMessagesProps {
   chat: IChat | undefined;
   editingMessage: IMessage | null;
   setEditingMessage: Dispatch<SetStateAction<IMessage | null>>;
}

export const ChatMessages: FC<ChatMessagesProps> = ({ chat, editingMessage, setEditingMessage }) => {
   const { ref, scroll } = useScroll<HTMLDivElement>();

   useEffect(() => {
      scroll();
   }, [chat?.messages]);

   return (
      <Box ref={ref} sx={{ height: 1, overflow: 'auto' }}>
         {chat && chat.messages.length > 0 ? (
            <Stack
               spacing={0.2}
               sx={{
                  p: 1,
               }}
            >
               {chat?.messages.map((message) => {
                  return (
                     <ChatMessage
                        editingMessage={editingMessage}
                        setEditingMessage={setEditingMessage}
                        interlocutor={chat?.interlocutor}
                        message={message}
                        key={message.createdAt}
                     />
                  );
               })}
            </Stack>
         ) : (
            <Stack sx={{ justifyContent: 'center', alignItems: 'center', height: 1 }}>
               <Typography variant='body1'>
                  <Trans>no messages</Trans>
               </Typography>
            </Stack>
         )}
      </Box>
   );
};

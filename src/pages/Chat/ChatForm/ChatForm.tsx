import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import React, { FC, useEffect, useState } from 'react';
import { BrowserView } from 'react-device-detect';
import { Trans } from 'react-i18next';
import { useAppSelector } from 'src/hooks/useAppSelector';
import { useChat } from 'src/hooks/useChat';
import { useDebounce } from 'src/hooks/useDebounce';
import ChatService from 'src/services/chat.service';
import { ChatEmojiPicker } from './ChatEmojiPicker';

export const ChatForm: FC = () => {
   const user = useAppSelector((state) => state.user.data)!;
   const [messageText, setMessageText] = useState('');
   const [isInputError, setIsInputError] = useState(false);

   const interlocutor = useChat().interlocutor!;
   const { editingMessage, setEditingMessage } = useChat();

   const setUserTypingToFalse = useDebounce(() => {
      ChatService.setTyping(user.uid, interlocutor.uid, false);
   }, 1000);

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setMessageText(e.target.value);
      ChatService.setTyping(user.uid, interlocutor.uid, true);
      setUserTypingToFalse();

      setIsInputError(false);
   };

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      if (messageText.trimStart() === '') {
         setIsInputError(true);
         return;
      }

      if (editingMessage) {
         ChatService.editMessage(user.uid, interlocutor.uid, editingMessage.createdAt, messageText);
         setEditingMessage(null);
         return;
      }

      setMessageText('');
      await ChatService.message(user.uid, interlocutor.uid, messageText);
   };

   const handleClick = () => {
      setEditingMessage(null);
   };

   useEffect(() => {
      setMessageText(editingMessage?.text || '');
   }, [editingMessage]);

   return (
      <Stack onSubmit={handleSubmit} component='form' sx={{ position: 'relative' }}>
         <TextField
            error={isInputError}
            value={messageText}
            onChange={handleChange}
            label={<Trans>{editingMessage ? 'edit' : 'message'}</Trans>}
            fullWidth
            multiline
            maxRows={7}
            InputProps={{
               endAdornment: (
                  <Stack>
                     <InputAdornment position='end'>
                        {editingMessage && (
                           <IconButton onClick={handleClick}>
                              <CloseIcon />
                           </IconButton>
                        )}
                        <BrowserView>
                           <ChatEmojiPicker setMessageText={setMessageText} />
                        </BrowserView>
                        <IconButton type='submit'>
                           <SendIcon color='primary' />
                        </IconButton>
                     </InputAdornment>
                  </Stack>
               ),
            }}
         />
      </Stack>
   );
};

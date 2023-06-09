import React, { Dispatch, FC, SetStateAction, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { StyledForm } from 'src/components/UI/StyledForm';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Popover, { PopoverActions } from '@mui/material/Popover';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import { child, get, onValue, push, ref, set } from 'firebase/database';
import { useAppSelector } from 'src/hooks/useAppSelector';
import CloseIcon from '@mui/icons-material/Close';
import { db } from 'src/firebase/firebase';
import { IChat, IMessage, IUser } from 'src/types/types';
import Picker from '@emoji-mart/react';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { BrowserView, MobileView, useDeviceData } from 'react-device-detect';
import { isAndroid } from 'react-device-detect';
import UserService from 'src/services/user.service';
import ChatService from 'src/services/chat.service';
import { ChatEmojiPicker } from './ChatEmojiPicker';
import { debounce } from 'src/utils/debounce.util';
import { useDebounce } from 'src/hooks/useDebounce';
import { Trans, useTranslation } from 'react-i18next';
import { ChatContext } from '../Chat';

export interface ChatFormProps {}

export const ChatForm: FC<ChatFormProps> = () => {
   const user = useAppSelector((state) => state.user.data)!;
   const [messageText, setMessageText] = useState('');
   const [isInputError, setIsInputError] = useState(false);

   const interlocutor = useContext(ChatContext).interlocutor!;
   const { editingMessage, setEditingMessage } = useContext(ChatContext);

   const { t } = useTranslation();

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
      console.log(1);

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

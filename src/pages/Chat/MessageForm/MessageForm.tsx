import React, { FC, useState } from 'react';
import { StyledForm } from 'src/components/UI/StyledForm';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import { child, get, onValue, push, ref, set } from 'firebase/database';
import { useAppSelector } from 'src/hooks/useAppSelector';
import { db } from 'src/firebase/firebase';
import { IUser } from 'src/types/types';

export interface MessageFormProps {
   interlocutor: IUser;
}

export const MessageForm: FC<MessageFormProps> = ({ interlocutor }) => {
   const user = useAppSelector((state) => state.user.data);

   const [messageText, setMessageText] = useState('');
   const [isInputError, setIsInputError] = useState(false);

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      setMessageText('');

      if (messageText.trimStart() === '') {
         setIsInputError(true);
         return;
      }

      // todo: вынести работу с дб куда нибудь
      const chatRef = ref(db, 'chats/' + user!.uid + '/' + interlocutor.uid);
      const snapshot = await get(chatRef);

      const chat = snapshot.val();

      await push(child(chatRef, 'messages'), { sender: 0, text: messageText });

      const chatRef2 = ref(db, 'chats/' + interlocutor.uid + '/' + user!.uid);
      const snapshot2 = await get(chatRef2);

      const chat2 = snapshot2.val();

      await push(child(chatRef2, 'messages'), { sender: 1, text: messageText });

      return () => {
         unsubChats();
      };
   };

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setMessageText(e.target.value);
      setIsInputError(false);
   };

   return (
      <Stack onSubmit={handleSubmit} component='form'>
         <TextField
            error={isInputError}
            helperText={isInputError && "Don't send an empty message"}
            value={messageText}
            onChange={handleChange}
            label='Message'
            fullWidth
            InputProps={{
               endAdornment: (
                  <InputAdornment position='end'>
                     <IconButton type='submit'>
                        <SendIcon color='primary' />
                     </IconButton>
                  </InputAdornment>
               ),
            }}
         />
      </Stack>
   );
};

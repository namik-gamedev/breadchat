import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import React, { FC, useEffect, useRef, useState } from 'react';
import { Trans } from 'react-i18next';
import { useAppSelector } from 'src/hooks/useAppSelector';
import { useChat } from 'src/hooks/useChat';
import { useDebounce } from 'src/hooks/useDebounce';
import ChatService from 'src/services/chat.service';
import Typography from '@mui/material/Typography';
import { UnreadedMessagesCountDisplay } from 'src/components/UI/UnreadedMessagesCountDisplay';
import { ChatFormEndAdornment } from 'src/components/ChatFormEndAdornment';

export const ChatForm: FC = () => {
   const user = useAppSelector((state) => state.user.data)!;
   const [messageText, setMessageText] = useState('');
   const [isInputError, setIsInputError] = useState(false);
   const [images, setImages] = useState<FileList | undefined>();

   const inputRef = useRef<HTMLInputElement | null>(null);

   const interlocutor = useChat().interlocutor!;
   const { editingMessage, setEditingMessage } = useChat();

   const setUserTypingToFalse = useDebounce(() => {
      ChatService.setTyping(user.uid, interlocutor.uid, false);
   }, 1000);

   const unsetImages = () => setImages(undefined);

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setMessageText(e.target.value);
      ChatService.setTyping(user.uid, interlocutor.uid, true);
      setUserTypingToFalse();

      setIsInputError(false);
   };

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      const trimmedMessage = messageText.trimStart().trimEnd();

      if (messageText === '' && !images) {
         setIsInputError(true);
         return;
      }

      if (editingMessage) {
         ChatService.editMessage(user.uid, interlocutor.uid, editingMessage.createdAt, messageText);
         setEditingMessage(null);
         return;
      }

      ChatService.message(user.uid, interlocutor.uid, trimmedMessage, images);
      setMessageText('');
      unsetImages();
   };

   const handleEditClose = () => {
      setEditingMessage(null);
   };

   const handlePhotoAdd = () => {
      inputRef.current?.click();
   };

   const handlePhotoSet = (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;

      if (files && files.length > 0) {
         setImages(files);
      }
   };

   useEffect(() => {
      setMessageText(editingMessage?.text || '');
   }, [editingMessage]);

   return (
      <Stack onSubmit={handleSubmit} spacing={1} component='form' sx={{ position: 'relative' }}>
         <input style={{ display: 'none' }} ref={inputRef} type='file' accept='image/*' onChange={handlePhotoSet} multiple />

         {images && (
            <Stack direction='row' alignItems='center'>
               <Typography>
                  <Trans>images</Trans> ({images.length})
               </Typography>
               <IconButton size='small'>
                  <CloseIcon onClick={unsetImages} fontSize='small' />
               </IconButton>
            </Stack>
         )}

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
                  <ChatFormEndAdornment setMessageText={setMessageText} handleEditClose={handleEditClose} handlePhotoAdd={handlePhotoAdd} />
               ),
            }}
         />
      </Stack>
   );
};

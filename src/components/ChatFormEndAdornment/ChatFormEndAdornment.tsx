import InputAdornment from '@mui/material/InputAdornment';
import { BrowserView } from 'react-device-detect';
import CloseIcon from '@mui/icons-material/Close';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import React, { Dispatch, FC, SetStateAction } from 'react';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { ChatEmojiPicker } from 'src/pages/Chat/ChatForm/ChatEmojiPicker';
import { useChat } from 'src/hooks/useChat';

interface Props {
   setMessageText: Dispatch<SetStateAction<string>>;
   handleEditClose: () => void;
   handlePhotoAdd: () => void;
}

export const ChatFormEndAdornment: FC<Props> = ({ setMessageText, handleEditClose, handlePhotoAdd }) => {
   const { editingMessage } = useChat();

   return (
      <Stack>
         <InputAdornment position='end'>
            {editingMessage && (
               <IconButton onClick={handleEditClose}>
                  <CloseIcon />
               </IconButton>
            )}
            <IconButton onClick={handlePhotoAdd}>
               <AddPhotoAlternateIcon />
            </IconButton>
            <BrowserView>
               <ChatEmojiPicker setMessageText={setMessageText} />
            </BrowserView>
            <IconButton type='submit'>
               <SendIcon color='primary' />
            </IconButton>
         </InputAdornment>
      </Stack>
   );
};

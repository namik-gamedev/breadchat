import React, { FC, SetStateAction, useState } from 'react';
import Box from '@mui/material/Box';
import { BrowserView } from 'react-device-detect';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Popover from '@mui/material/Popover';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import Picker from '@emoji-mart/react';
import emojiMartData from '@emoji-mart/data/sets/14/apple.json';
import { useTheme } from '@mui/material';

export interface ChatEmojiPickerProps {
   setMessageText: React.Dispatch<SetStateAction<string>>;
}

export const ChatEmojiPicker: FC<ChatEmojiPickerProps> = ({ setMessageText }) => {
   const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
   const open = !!anchorEl;

   const theme = useTheme();

   const handleEmojiSelect = (emoji: any) => {
      setMessageText((prev) => prev + emoji.native);
   };

   const handleShow = (e: React.MouseEvent) => {
      setAnchorEl(e.target as HTMLElement);
   };

   const handleClose = () => {
      setAnchorEl(null);
   };

   return (
      <Box>
         <IconButton onClick={handleShow}>
            <AddReactionIcon />
         </IconButton>
         <Popover
            open={open}
            anchorEl={anchorEl}
            transformOrigin={{
               horizontal: 'right',
               vertical: 'bottom',
            }}
            anchorOrigin={{
               horizontal: 'left',
               vertical: 'bottom',
            }}
            keepMounted
            onClose={handleClose}
            elevation={3}
         >
            <Picker set='apple' data={emojiMartData} theme={theme.palette.mode} emojiSize={20} perLine={10} onEmojiSelect={handleEmojiSelect} />
         </Popover>
      </Box>
   );
};

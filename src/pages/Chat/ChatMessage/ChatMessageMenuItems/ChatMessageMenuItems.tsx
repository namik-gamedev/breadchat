import React, { FC } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import ListItemIcon from '@mui/material/ListItemIcon';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import copy from 'copy-to-clipboard';

export interface ChatMessageMenuItemsProps {
   handleClose: () => void;
   handleDeleteClick: () => void;
   messageText: string;
}

export const ChatMessageMenuItems: FC<ChatMessageMenuItemsProps> = ({ handleClose, handleDeleteClick, messageText }) => {
   const handleMessageCopyClick = () => {
      handleClose();
      copy(messageText);
   };

   return (
      <>
         <MenuItem onClick={handleMessageCopyClick}>
            <ListItemIcon sx={{ color: 'primary.main' }}>
               <ContentCopyIcon />
            </ListItemIcon>
            <Typography>Copy</Typography>
         </MenuItem>
         <MenuItem onClick={handleDeleteClick}>
            <ListItemIcon sx={{ color: 'primary.main' }}>
               <DeleteOutlinedIcon />
            </ListItemIcon>
            <Typography>Delete</Typography>
         </MenuItem>
      </>
   );
};

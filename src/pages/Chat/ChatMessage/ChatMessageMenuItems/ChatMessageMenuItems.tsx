import React, { Dispatch, FC, SetStateAction } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import CreateIcon from '@mui/icons-material/Create';
import ListItemIcon from '@mui/material/ListItemIcon';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import copy from 'copy-to-clipboard';
import { Trans } from 'react-i18next';
import { IMessage } from 'src/types/types';
import { useChatContext } from 'src/hooks/useChatContext';

export interface ChatMessageMenuItemsProps {
   sender: number;
   handleMenuClose: () => void;
   message: IMessage;
   handleDialogShow: () => void;
}

export const ChatMessageMenuItems: FC<ChatMessageMenuItemsProps> = ({ sender, message, handleMenuClose, handleDialogShow }) => {
   const { setEditingMessage } = useChatContext();

   const handleMessageCopy = () => {
      handleMenuClose();
      copy(message.text);
   };

   const handleMessageDelete = () => {
      handleMenuClose();
      handleDialogShow();
   };

   const handleMessageEdit = () => {
      handleMenuClose();
      setEditingMessage(message);
   };

   return (
      <>
         <MenuItem onClick={handleMessageCopy}>
            <ListItemIcon sx={{ color: 'primary.main' }}>
               <ContentCopyIcon />
            </ListItemIcon>
            <Trans>copy</Trans>
         </MenuItem>
         <MenuItem onClick={handleMessageDelete}>
            <ListItemIcon sx={{ color: 'primary.main' }}>
               <DeleteOutlinedIcon />
            </ListItemIcon>
            <Trans>delete</Trans>
         </MenuItem>
         {sender === 0 && (
            <MenuItem onClick={handleMessageEdit}>
               <ListItemIcon sx={{ color: 'primary.main' }}>
                  <CreateIcon />
               </ListItemIcon>
               <Trans>edit</Trans>
            </MenuItem>
         )}
      </>
   );
};

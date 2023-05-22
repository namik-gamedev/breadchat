import React, { FC } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import CreateIcon from '@mui/icons-material/Create';
import ListItemIcon from '@mui/material/ListItemIcon';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import copy from 'copy-to-clipboard';
import { Trans } from 'react-i18next';

export interface ChatMessageMenuItemsProps {
   sender: number;
   handleClose: () => void;
   handleDeleteClick: () => void;
   handleEditClick: () => void;
   messageText: string;
}

export const ChatMessageMenuItems: FC<ChatMessageMenuItemsProps> = ({ sender, handleClose, handleDeleteClick, handleEditClick, messageText }) => {
   const handleCopyClick = () => {
      handleClose();
      copy(messageText);
   };

   return (
      <>
         <MenuItem onClick={handleCopyClick}>
            <ListItemIcon sx={{ color: 'primary.main' }}>
               <ContentCopyIcon />
            </ListItemIcon>
            <Typography>
               <Trans>copy</Trans>
            </Typography>
         </MenuItem>
         <MenuItem onClick={handleDeleteClick}>
            <ListItemIcon sx={{ color: 'primary.main' }}>
               <DeleteOutlinedIcon />
            </ListItemIcon>
            <Typography>
               <Trans>delete</Trans>
            </Typography>
         </MenuItem>
         {sender === 0 && (
            <MenuItem onClick={handleEditClick}>
               <ListItemIcon sx={{ color: 'primary.main' }}>
                  <CreateIcon />
               </ListItemIcon>
               <Typography>
                  <Trans>edit</Trans>
               </Typography>
            </MenuItem>
         )}
      </>
   );
};

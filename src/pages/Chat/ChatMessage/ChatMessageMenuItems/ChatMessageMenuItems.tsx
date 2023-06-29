import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CreateIcon from '@mui/icons-material/Create';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuItem from '@mui/material/MenuItem';
import copy from 'copy-to-clipboard';
import { FC } from 'react';
import { Trans } from 'react-i18next';
import { useChat } from 'src/hooks/useChat';
import { IMessage } from 'src/types/types';

interface Props {
   sender: number;
   handleMenuClose: () => void;
   message: IMessage;
   handleDialogShow: () => void;
}

export const ChatMessageMenuItems: FC<Props> = ({ sender, message, handleMenuClose, handleDialogShow }) => {
   const { setEditingMessage } = useChat();

   const handleMessageCopy = () => {
      handleMenuClose();
      copy(message.text || '');
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

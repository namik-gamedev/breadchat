import React, { FC, useState } from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { UserAvatar } from 'src/components/UI/UserAvatar';
import { IUser } from 'src/types/types';
import moment from 'moment';
import { useAppSelector } from 'src/hooks/useAppSelector';
import { StyledBox } from 'src/components/UI/StyledBox';
import { ConfirmDialog } from 'src/components/UI/ConfirmDialog';
import ChatService from 'src/services/chat.service';
import { UserThumbnail } from 'src/components/UI/UserThumbnail';

export interface ChatHeaderProps {
   interlocutor: IUser;
}

export const ChatHeader: FC<ChatHeaderProps> = ({ interlocutor }) => {
   const user = useAppSelector((state) => state.user.data!);

   const [dialogOpen, setDialogOpen] = useState(false);

   const handleChatDeleteClick = () => {
      setDialogOpen(true);
   };

   const handleDelete = (alsoForInterlocutor: boolean) => ChatService.delete(user.uid, interlocutor.uid, alsoForInterlocutor);

   return (
      <StyledBox p={2}>
         <Stack direction='row' justifyContent='space-between' alignItems='center'>
            <UserThumbnail user={interlocutor} />
            <Box>
               <IconButton onClick={handleChatDeleteClick}>
                  <DeleteIcon />
               </IconButton>
            </Box>
            <ConfirmDialog
               open={dialogOpen}
               setOpen={setDialogOpen}
               title='Delete chat'
               contentText='Are you sure you want to delete this chat?'
               checkbox
               checkboxLabel={
                  <Typography>
                     Also delete for{' '}
                     <Typography component='span' color='primary'>
                        {interlocutor.displayName}
                     </Typography>
                  </Typography>
               }
               handleAction={handleDelete}
            />
         </Stack>
      </StyledBox>
   );
};

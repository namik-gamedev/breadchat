import React, { FC, useState } from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { UserAvatar } from 'src/components/UI/UserAvatar';
import { IChat, IUser } from 'src/types/types';
import moment from 'moment';
import { useAppSelector } from 'src/hooks/useAppSelector';
import { StyledBox } from 'src/components/UI/StyledBox';
import { ConfirmDialog } from 'src/components/UI/ConfirmDialog';
import ChatService from 'src/services/chat.service';
import { UserThumbnail } from 'src/components/UI/UserThumbnail';
import { UnstyledLink } from 'src/components/UI/UnstyledLink';
import { useOpen } from 'src/hooks/useOpen';
import { ChatHeaderDialog } from './ChatHeaderDialog';
import { useTranslation } from 'react-i18next';

export interface ChatHeaderProps {
   chat: IChat | undefined;
   interlocutor: IUser;
}

export const ChatHeader: FC<ChatHeaderProps> = ({ chat, interlocutor }) => {
   const user = useAppSelector((state) => state.user.data!);

   const { open, handleClose, handleShow } = useOpen();

   const { t } = useTranslation();

   const handleClear = (alsoForInterlocutor: boolean) => {
      ChatService.clear(user.uid, interlocutor.uid, alsoForInterlocutor);
   };

   return (
      <Box>
         <Stack direction='row' justifyContent='space-between' alignItems='center'>
            <Stack direction='row' spacing={2} alignItems='center'>
               <UserAvatar sx={{ width: 50, height: 50, fontSize: '1.5em' }} user={interlocutor} />
               <Box>
                  <Typography variant='h6' sx={{ fontWeight: 'normal' }} component='h2'>
                     {interlocutor.displayName}
                  </Typography>
                  <Typography variant='body1' sx={{ color: 'text.secondary' }}>
                     {chat?.interlocutorTyping
                        ? t('typing')
                        : interlocutor.online
                        ? t('online')
                        : `${t('last seen')}  ${moment(interlocutor.lastSeen).calendar()}`}
                  </Typography>
               </Box>
            </Stack>

            <Box>
               <IconButton onClick={handleShow}>
                  <DeleteIcon />
               </IconButton>
            </Box>

            <ChatHeaderDialog open={open} handleClose={handleClose} interlocutorDisplayName={interlocutor.displayName} handleAction={handleClear} />
         </Stack>
      </Box>
   );
};

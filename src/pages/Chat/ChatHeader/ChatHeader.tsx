import React, { FC, useContext, useState } from 'react';
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
import { UserThumbnail } from 'src/pages/Users/UserThumbnail';
import { UnstyledLink } from 'src/components/UI/UnstyledLink';
import { useOpen } from 'src/hooks/useOpen';
import { ClearChatDialog } from './ClearChatDialog';
import { useTranslation, Trans } from 'react-i18next';
import { ChatHeaderOnlineStatus } from './ChatHeaderOnlineStatus';
import { UserOnlineStatus } from 'src/components/UI/UserOnlineStatus';
import { ChatContext } from '../Chat';

export interface ChatHeaderProps {}

export const ChatHeader: FC<ChatHeaderProps> = ({}) => {
   const chat = useContext(ChatContext).chat!;
   const interlocutor = useContext(ChatContext).interlocutor!;

   const { open, handleClose, handleShow } = useOpen();
   const { t } = useTranslation();

   return (
      <Stack direction='row' justifyContent='space-between' alignItems='center'>
         <Stack direction='row' spacing={2} alignItems='center'>
            <UnstyledLink to={`/account/${interlocutor.uid}`}>
               <UserAvatar sx={{ width: 50, height: 50, fontSize: '1.5em' }} user={interlocutor} />
            </UnstyledLink>
            <Box>
               <Typography variant='h6' sx={{ fontWeight: 'normal' }} component='h2'>
                  {interlocutor.displayName}
               </Typography>
               <Typography variant='body1' sx={{ color: 'text.secondary' }}>
                  {chat ? <ChatHeaderOnlineStatus chat={chat} /> : <UserOnlineStatus user={interlocutor} />}
               </Typography>
            </Box>
         </Stack>

         <IconButton onClick={handleShow}>
            <DeleteIcon />
         </IconButton>

         <ClearChatDialog open={open} handleClose={handleClose} interlocutor={interlocutor} />
      </Stack>
   );
};

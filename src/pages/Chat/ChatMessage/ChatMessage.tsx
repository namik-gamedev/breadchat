import React, { Dispatch, SetStateAction, useContext, useState } from 'react';
import Stack, { StackProps } from '@mui/material/Stack';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Alert from '@mui/material/Alert';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { styled, Typography } from '@mui/material';
import { IChat, IMessage, IUser } from 'src/types/types';
import { blue, orange } from '@mui/material/colors';
import { CSSProperties } from '@mui/styled-engine-sc';
import { useAppSelector } from 'src/hooks/useAppSelector';
import moment from 'moment';
import { StyledMenu } from 'src/components/UI/StyledMenu';
import { UserAvatar } from 'src/components/UI/UserAvatar';
import { ConfirmDialog } from 'src/components/UI/ConfirmDialog';
import ChatService from 'src/services/chat.service';
import { useAnchorEl } from 'src/hooks/useAnchorEl';
import CheckIcon from '@mui/icons-material/Check';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { isMessageUnreaded } from 'src/utils/isMessageUnreaded.util';
import copy from 'copy-to-clipboard';
import { Close } from '@mui/icons-material';
import { useOpen } from 'src/hooks/useOpen';
import { DeleteMessageDialog } from './DeleteMessageDialog';
import { ChatMessageMenuItems } from './ChatMessageMenuItems';
import { Trans } from 'react-i18next';
import { useChatContext } from 'src/hooks/useChatContext';

export interface ChatMessageProps extends StackProps {
   message: IMessage;
}

const BORDER_RADIUS_PX = 16;

export const ChatMessage = styled(({ message, ...props }: ChatMessageProps) => {
   const chat = useChatContext().chat!;
   const { editingMessage } = useChatContext();

   const isUnreaded = isMessageUnreaded(chat, message);

   const { anchorEl: menuAnchorEl, open: menuOpen, handleShow: handleMenuShow, handleClose: handleMenuClose } = useAnchorEl();

   const { open: dialogOpen, handleShow: handleDialogShow, handleClose: handleDialogClose } = useOpen();

   return (
      <Stack {...props}>
         <Stack spacing={0.2} onClick={handleMenuShow} className='chatMessageWrapper'>
            <Typography variant='body2' className='chatMessageDate'>
               {moment(message.createdAt).format('HH:MM')}{' '}
               {message.sender === 0 && (isUnreaded ? <CheckIcon fontSize='small' /> : <DoneAllIcon fontSize='small' />)}
               <Trans>{message.edited ? 'edited' : editingMessage?.createdAt === message.createdAt && 'editing'}</Trans>
            </Typography>
            <Stack direction='row' spacing={1} alignItems='end'>
               <Typography variant='body1' className='chatMessageText'>
                  {message.text}
               </Typography>
            </Stack>
         </Stack>

         <StyledMenu anchorEl={menuAnchorEl} open={menuOpen} onClose={handleMenuClose}>
            <ChatMessageMenuItems sender={message.sender} handleMenuClose={handleMenuClose} handleDialogShow={handleDialogShow} message={message} />
         </StyledMenu>

         <DeleteMessageDialog
            open={dialogOpen}
            interlocutorDisplayName={chat.interlocutor.displayName}
            handleClose={handleDialogClose}
            interlocutor={chat.interlocutor}
            isUnreaded={isUnreaded}
            message={message}
         />
      </Stack>
   );
})(({ message: { sender }, theme: { palette, spacing, breakpoints } }) => ({
   flexDirection: 'column',
   alignItems: sender === 0 ? 'end' : 'start',
   '&::after': {
      content: '""',
      borderStyle: 'solid',
      width: 0,
      height: 0,
      borderWidth: '0 10px 8px 0',
      transform: sender === 0 ? undefined : 'rotateY(180deg)',
      borderColor: `transparent ${sender === 0 ? palette.primary.main : palette.secondary.main} transparent transparent`,
   },
   '> .chatMessageWrapper': {
      maxWidth: 520,
      [breakpoints.down('md')]: {
         maxWidth: 450,
      },
      [breakpoints.down('sm')]: {
         maxWidth: 350,
      },
      [breakpoints.only('xs')]: {
         maxWidth: 250,
      },
      paddingBlock: spacing(1),
      paddingInline: spacing(1.5),

      borderRadius: BORDER_RADIUS_PX,

      borderBottomRightRadius: sender === 0 ? 0 : BORDER_RADIUS_PX,
      borderBottomLeftRadius: sender === 1 ? 0 : BORDER_RADIUS_PX,

      backgroundColor: sender === 0 ? palette.primary.main : palette.secondary.main,
      opacity: 1,

      '.chatMessageText': {
         color: 'white',
         wordBreak: 'break-word',
      },
      '.chatMessageDate': {
         display: 'flex',
         gap: spacing(0.5),
         wordBreak: 'keep-all',
         whiteSpace: 'nowrap',
         color: 'rgba(255, 255, 255, 0.6)',
      },
   },
}));

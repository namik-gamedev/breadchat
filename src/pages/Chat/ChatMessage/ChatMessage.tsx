import React, { useState } from 'react';
import Stack, { StackProps } from '@mui/material/Stack';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled, Typography } from '@mui/material';
import { IMessage, IUser } from 'src/types/types';
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

export interface ChatMessageProps extends StackProps {
   interlocutor: IUser;
   message: IMessage;
}

const BORDER_RADIUS_PX = 16;

export const ChatMessage = styled(({ interlocutor, message, ...props }: ChatMessageProps) => {
   const user = useAppSelector((state) => state.user.data!);
   const chat = useAppSelector((state) => state.chats.data).find((chat) => chat.interlocutor.uid === interlocutor.uid)!;

   const messageIndex = chat.messages.findIndex((msg) => msg.createdAt === message.createdAt);
   const isUnreaded = chat.messages.length - messageIndex <= chat.selfUnreadedMessagesCount;

   const { anchorEl, open, handleShow, handleClose } = useAnchorEl();

   const [dialogOpen, setDialogOpen] = useState(false);

   const handleMessageDeleteClick = () => {
      handleClose();
      setDialogOpen(true);
   };

   const handleDelete = (alsoForInterlocutor: boolean) => {
      ChatService.deleteMessage(user.uid, interlocutor.uid, message.createdAt, alsoForInterlocutor, alsoForInterlocutor ? isUnreaded : false);
   };

   return (
      <Stack {...props}>
         <Box onClick={handleShow} className='chatMessageWrapper'>
            <Stack direction='row' spacing={1} alignItems='end'>
               <Typography variant='body1' className='chatMessageText'>
                  {message.text}
               </Typography>
               <Typography variant='body2' className='chatMessageDate'>
                  {moment(message.createdAt).calendar()}
                  {isUnreaded ? <CheckIcon fontSize='small' /> : <DoneAllIcon fontSize='small' />}
               </Typography>
            </Stack>
         </Box>
         <StyledMenu anchorEl={anchorEl} open={open} onClose={handleClose}>
            <MenuItem onClick={handleMessageDeleteClick}>
               <ListItemIcon sx={{ color: 'primary.main' }}>
                  <DeleteIcon />
               </ListItemIcon>
               <Typography>Delete</Typography>
            </MenuItem>
         </StyledMenu>
         <ConfirmDialog
            open={dialogOpen}
            setOpen={setDialogOpen}
            title='Delete message'
            contentText='Are you sure you want to delete this message?'
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
   );
})(({ message: { sender }, theme: { palette, spacing, breakpoints } }) => ({
   flexDirection: 'row',
   justifyContent: sender === 0 ? 'end' : 'start',
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
         color: 'rgba(255, 255, 255, 0.7)',
      },
   },
}));

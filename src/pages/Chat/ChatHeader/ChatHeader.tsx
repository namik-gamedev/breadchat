import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { FC } from 'react';
import { UnstyledLink } from 'src/components/UI/UnstyledLink';
import { UserAvatar } from 'src/components/UI/UserAvatar';
import { UserOnlineStatus } from 'src/components/UI/UserOnlineStatus';
import { useChatContext } from 'src/hooks/useChatContext';
import { useOpen } from 'src/hooks/useOpen';
import { ChatHeaderOnlineStatus } from './ChatHeaderOnlineStatus';
import { ClearChatDialog } from './ClearChatDialog';

export interface ChatHeaderProps {}

export const ChatHeader: FC<ChatHeaderProps> = ({}) => {
   const chat = useChatContext().chat!;
   const interlocutor = useChatContext().interlocutor!;

   const { open: dialogOpen, handleClose: handleDialogClose, handleShow: handleDialogShow } = useOpen();

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

         <IconButton onClick={handleDialogShow}>
            <DeleteIcon />
         </IconButton>

         <ClearChatDialog open={dialogOpen} handleClose={handleDialogClose} interlocutor={interlocutor} />
      </Stack>
   );
};

import CheckIcon from '@mui/icons-material/Check';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import moment from 'moment';
import { FC } from 'react';
import { Trans } from 'react-i18next';
import { UnreadedMessagesCountDisplay } from 'src/components/UI/UnreadedMessagesCountDisplay';
import { UnstyledLink } from 'src/components/UI/UnstyledLink';
import { UserAvatar } from 'src/components/UI/UserAvatar';
import { useAppSelector } from 'src/hooks/useAppSelector';
import { IChat } from 'src/types/types';
import { isMessageUnreaded } from 'src/utils/isMessageUnreaded.util';

interface Props {
   chat: IChat;
}

export const ChatThumbnail: FC<Props> = ({ chat }) => {
   const interlocutor = useAppSelector((state) => state.users.data).find((user) => user.uid === chat.interlocutorUid)!;

   const lastMessage = chat.messages[chat.messages.length - 1];
   const isLastMessageUnreaded = isMessageUnreaded(chat, lastMessage);

   return (
      <Stack component={UnstyledLink} to={`/chat/${interlocutor.uid}`} sx={{ alignItems: 'center' }} direction='row' spacing={2}>
         <UserAvatar sx={{ width: 50, height: 50, fontSize: '1.5em' }} user={interlocutor} />
         <Box sx={{ minWidth: 0, width: 1 }}>
            <Stack direction='row' spacing={1} sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
               <Typography noWrap variant='h6' sx={{ fontWeight: chat.unreadedMessagesCount > 0 ? 500 : 'normal' }} component='h2'>
                  {interlocutor.displayName}
               </Typography>
               <Typography variant='body1' sx={{ color: 'text.secondary' }}>
                  {moment(lastMessage.createdAt).fromNow(true)}
               </Typography>
            </Stack>

            <Stack direction='row' spacing={1} sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
               <Typography
                  variant='body1'
                  noWrap
                  sx={{
                     color: chat.unreadedMessagesCount > 0 || chat.interlocutorTyping ? 'text' : 'text.secondary',
                     fontWeight: chat.unreadedMessagesCount > 0 || chat.interlocutorTyping ? 500 : 'normal',
                  }}
               >
                  <Trans>{chat.interlocutorTyping ? 'typing' : lastMessage.text}</Trans>
               </Typography>
               <Stack direction='row'>
                  <UnreadedMessagesCountDisplay count={chat.unreadedMessagesCount} />
                  {lastMessage.sender === 0 &&
                     (isLastMessageUnreaded ? (
                        <CheckIcon sx={{ color: 'text.secondary' }} fontSize='small' />
                     ) : (
                        <DoneAllIcon sx={{ color: 'text.secondary' }} fontSize='small' />
                     ))}
               </Stack>
            </Stack>
         </Box>
      </Stack>
   );
};

import CheckIcon from '@mui/icons-material/Check';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { Typography, styled } from '@mui/material';
import Stack, { StackProps } from '@mui/material/Stack';
import moment from 'moment';
import { Trans } from 'react-i18next';
import { StyledMenu } from 'src/components/UI/StyledMenu';
import { useAnchorEl } from 'src/hooks/useAnchorEl';
import { useChat } from 'src/hooks/useChat';
import { useOpen } from 'src/hooks/useOpen';
import { IMessage } from 'src/types/types';
import { isMessageUnreaded } from 'src/utils/isMessageUnreaded.util';
import { ChatMessageMenuItems } from './ChatMessageMenuItems';
import { DeleteMessageDialog } from './DeleteMessageDialog';

interface Props extends StackProps {
   message: IMessage;
}

const BORDER_RADIUS_PX = 16;

export const ChatMessage = styled(({ message, ...props }: Props) => {
   const chat = useChat().chat!;
   const interlocutor = useChat().interlocutor!;
   const { editingMessage } = useChat();

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
            handleClose={handleDialogClose}
            interlocutor={interlocutor}
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

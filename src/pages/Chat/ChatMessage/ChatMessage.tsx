import Stack, { StackProps } from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { styled, Typography } from '@mui/material';
import { IMessage, IUser } from 'src/types/types';
import { blue, orange } from '@mui/material/colors';
import { CSSProperties } from '@mui/styled-engine-sc';
import { useAppSelector } from 'src/hooks/useAppSelector';

const MESSAGE_RADIUS_PX = 12;

export interface ChatMessageProps extends StackProps {
   message: IMessage;
   prevSender: number;
   nextSender: number;
}

const getBorderRadiuses = (current: number, prev: number, next: number) => {
   const radiuses: CSSProperties = {};

   if (prev !== current) {
      if (current === 0) {
         radiuses.borderTopRightRadius = MESSAGE_RADIUS_PX;
      } else {
         radiuses.borderTopLeftRadius = MESSAGE_RADIUS_PX;
      }
   }
   if (next !== current) {
      if (current === 0) {
         radiuses.borderBottomRightRadius = MESSAGE_RADIUS_PX;
      } else {
         radiuses.borderBottomLeftRadius = MESSAGE_RADIUS_PX;
      }
   }

   if (current === 0) {
      radiuses.borderTopLeftRadius = MESSAGE_RADIUS_PX;
      radiuses.borderBottomLeftRadius = MESSAGE_RADIUS_PX;
   } else {
      radiuses.borderTopRightRadius = MESSAGE_RADIUS_PX;
      radiuses.borderBottomRightRadius = MESSAGE_RADIUS_PX;
   }

   return radiuses;
};

export const ChatMessage = styled(({ message, ...props }: ChatMessageProps) => {
   const user = useAppSelector((state) => state.user.data);

   return (
      <Stack {...props}>
         <Box className='chatMessageWrapper'>
            <Typography variant='body1' color='white'>
               {message.text}
            </Typography>
         </Box>
      </Stack>
   );
})(({ message: { sender }, prevSender, nextSender, theme: { palette, spacing, breakpoints } }) => ({
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
      ...getBorderRadiuses(sender, prevSender, nextSender),
      backgroundColor: sender === 0 ? palette.primary.main : palette.secondary.main,
   },
}));

import React, { FC } from 'react';
import Stack, { StackProps } from '@mui/material/Stack';
import { styled, Typography } from '@mui/material';

export interface UnreadedMessagesCountDisplayProps extends StackProps {
   count: number;
}

export const UnreadedMessagesCountDisplay = styled(({ count, ...props }: UnreadedMessagesCountDisplayProps) => {
   console.log(count);

   return (
      <Stack {...props}>
         <Typography sx={{ fontSize: 'inherit' }} variant='subtitle2'>
            {count < 100 ? count : '99+'}
         </Typography>
      </Stack>
   );
})(({ count, theme: { palette, spacing } }) => ({
   transition: '200ms ease',
   transform: count === 0 ? 'scale(0)' : 'scale(1)',
   fontSize: '0.75em',
   paddingInline: 7,
   paddingBlock: 1,
   justifyContent: 'center',
   alignItems: 'center',
   backgroundColor: palette.info.main,
   color: palette.info.contrastText,
   borderRadius: 50,
}));

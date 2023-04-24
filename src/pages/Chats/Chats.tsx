import React, { FC, useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { db } from 'src/firebase/firebase';
import { StyledBox } from 'src/components/UI/StyledBox';
import { useAppDispatch } from 'src/hooks/useAppDispatch';
import { useAppSelector } from 'src/hooks/useAppSelector';
import { IChat } from 'src/types/types';
import { onValue, ref } from 'firebase/database';

export interface ChatsProps {}

export const Chats: FC<ChatsProps> = ({}) => {
   const dispatch = useAppDispatch();
   const [chats, setChats] = useState<IChat[]>();

   useEffect(() => {
      document.title = 'Chats';

      return () => {
         document.title = 'Bread';
      };
   }, []);

   return (
      <Stack spacing={2}>
         <StyledBox sx={{ p: 2.5 }}>
            <Typography sx={{ textAlign: 'center' }} variant='h4'>
               Chats
            </Typography>
         </StyledBox>
      </Stack>
   );
};

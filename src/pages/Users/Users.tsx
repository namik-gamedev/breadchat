import React, { FC, useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { StyledBox } from 'src/components/UI/StyledBox';
import { db } from 'src/firebase/firebase';
import { useAppSelector } from 'src/hooks/useAppSelector';
import { onValue, ref } from 'firebase/database';
import { UserAvatar } from 'src/components/UI/UserAvatar';
import { useAppDispatch } from 'src/hooks/useAppDispatch';
import { setChat } from 'src/store/reducers/ChatSlice';
import { IUser } from 'src/types/types';
import { ListItem, Grid } from '@mui/material';
import { UserThumbnail } from './UserThumbnail';

export interface UsersProps {}

export const Users: FC<UsersProps> = ({}) => {
   const dispatch = useAppDispatch();
   const users = useAppSelector((state) => state.users.data);
   const { uid } = useAppSelector((state) => state.user.data!);

   // TODO: ВЫНЕСТИ РАБОТУ С ДБ КУДА-НИБУДЬ
   useEffect(() => {
      document.title = 'Users';

      return () => {
         document.title = 'Bread';
      };
   }, []);

   const handleClick = (user: IUser) => {
      // todo: GET CHAT FROM DB
      dispatch(
         setChat({
            messages: [
               {
                  sender: 0,
                  text: 'hi, debil',
               },
            ],
         })
      );
   };

   return (
      <Stack spacing={2}>
         <StyledBox sx={{ p: 2.5 }}>
            <Typography sx={{ textAlign: 'center' }} variant='h4'>
               Users
            </Typography>
         </StyledBox>

         <StyledBox sx={{ p: 2 }}>
            {users.length > 0 ? (
               <Grid container spacing={3}>
                  {users!.map((user) => (
                     <Grid key={user.uid} item xs={12} sm={6} md={4}>
                        <UserThumbnail user={user} />
                     </Grid>
                  ))}
               </Grid>
            ) : (
               <Typography textAlign='center' variant='body1'>
                  No users ;(
               </Typography>
            )}
         </StyledBox>
      </Stack>
   );
};

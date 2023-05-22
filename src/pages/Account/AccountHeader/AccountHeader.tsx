import React, { FC, useRef } from 'react';
import { UserThumbnail } from 'src/components/UI/UserThumbnail';
import { useAppSelector } from 'src/hooks/useAppSelector';
import { IUser } from 'src/types/types';
import Backdrop from '@mui/material/Backdrop';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Input from '@mui/material/Input';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ChatIcon from '@mui/icons-material/Chat';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { UnstyledLink } from 'src/components/UI/UnstyledLink';
import UserService from 'src/services/user.service';
import { UserAvatar } from 'src/components/UI/UserAvatar';
import moment from 'moment';
import { Trans } from 'react-i18next';
import { useOpen } from 'src/hooks/useOpen';

export interface AccountHeaderProps {
   user: IUser;
   isCurrentUser: boolean;
}

export const AccountHeader: FC<AccountHeaderProps> = ({ user, isCurrentUser }) => {
   const inputRef = useRef<HTMLInputElement | null>(null);

   const { open, handleClose, handleShow } = useOpen();

   const handleClick = () => {
      inputRef.current?.click();
   };

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      console.log(files);

      if (files && files.length > 0) {
         const file = files[0];
         console.log(file);

         UserService.setPhotoURL(user.uid, file);
      }
   };

   return (
      <Stack direction='row' sx={{ justifyContent: 'space-between' }}>
         <Stack direction='row' spacing={2} alignItems='center'>
            <Box onClick={handleShow}>
               <UserAvatar sx={{ width: 50, height: 50, fontSize: '1.5em' }} user={user} />
            </Box>

            <Box>
               <Typography variant='h6' sx={{ fontWeight: 'normal' }} component='h2'>
                  {user.displayName}
               </Typography>
               <Typography variant='body1' sx={{ color: 'text.secondary' }}>
                  <Trans values={{ time: moment(user.lastSeen).calendar() }}>{user.online ? 'online' : 'last seen {{time}}'}</Trans>
               </Typography>
            </Box>
         </Stack>

         <Box>
            {isCurrentUser ? (
               <>
                  <IconButton onClick={handleClick}>
                     <AddAPhotoIcon color='primary' />
                  </IconButton>
                  <input style={{ display: 'none' }} ref={inputRef} type='file' accept='image/*' onChange={handleChange} />
               </>
            ) : (
               <IconButton component={UnstyledLink} to={`/chat/${user.uid}`}>
                  <ChatIcon color='primary' />
               </IconButton>
            )}
         </Box>

         <Backdrop sx={{ zIndex: 1100 }} open={open} onClick={handleClose}>
            <Box component='img' src={user.photoURL || ''} sx={{ maxHeight: 1, maxWidth: 1 }} />
         </Backdrop>
      </Stack>
   );
};

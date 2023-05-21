import React, { FC, useRef } from 'react';
import { UserThumbnail } from 'src/components/UI/UserThumbnail';
import { useAppSelector } from 'src/hooks/useAppSelector';
import { IUser } from 'src/types/types';
import Stack from '@mui/material/Stack';
import Input from '@mui/material/Input';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ChatIcon from '@mui/icons-material/Chat';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { UnstyledLink } from 'src/components/UI/UnstyledLink';
import UserService from 'src/services/user.service';

export interface AccountHeaderProps {
   user: IUser;
   isCurrentUser: boolean;
}

export const AccountHeader: FC<AccountHeaderProps> = ({ user, isCurrentUser }) => {
   const inputRef = useRef<HTMLInputElement | null>(null);

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
         <UserThumbnail user={user} />
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
      </Stack>
   );
};

import React, { FC } from 'react';
import { UserThumbnail } from 'src/components/UI/UserThumbnail';
import { useAppSelector } from 'src/hooks/useAppSelector';
import { IUser } from 'src/types/types';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ChatIcon from '@mui/icons-material/Chat';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { UnstyledLink } from 'src/components/UI/UnstyledLink';

export interface AccountHeaderProps {
   user: IUser;
   isCurrentUser: boolean;
}

export const AccountHeader: FC<AccountHeaderProps> = ({ user, isCurrentUser }) => {
   const currentUser = useAppSelector((state) => state.user.data)!;

   return (
      <Stack direction='row' sx={{ justifyContent: 'space-between' }}>
         <UserThumbnail user={user} />
         <Box>
            {isCurrentUser ? (
               <IconButton>
                  <AddAPhotoIcon color='primary' />
               </IconButton>
            ) : (
               <IconButton component={UnstyledLink} to={`/chat/${user.uid}`}>
                  <ChatIcon color='primary' />
               </IconButton>
            )}
         </Box>
      </Stack>
   );
};

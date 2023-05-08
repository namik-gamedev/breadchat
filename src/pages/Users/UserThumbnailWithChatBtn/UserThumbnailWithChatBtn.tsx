import React, { FC } from 'react';
import Stack from '@mui/material/Stack';
import ForumIcon from '@mui/icons-material/Forum';
import IconButton from '@mui/material/IconButton';
import { UserThumbnail, UserThumbnailProps } from 'src/components/UI/UserThumbnail';
import { UnstyledLink } from 'src/components/UI/UnstyledLink';

export interface UserThumbnailWithChatBtnProps extends UserThumbnailProps {}

export const UserThumbnailWithChatBtn: FC<UserThumbnailWithChatBtnProps> = (props) => {
   return (
      <Stack direction='row' spacing={1} sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
         <UserThumbnail {...props} />
         <IconButton component={UnstyledLink} to={`/chat/${props.user.uid}`}>
            <ForumIcon color='primary' />
         </IconButton>
      </Stack>
   );
};

import React, { FC } from 'react';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import { UserThumbnailSkeleton } from '../UserThumbnailSkeleton';
import { ChatThumbnailSkeleton } from '../ChatThumbnailSkeleton';
import Typography from '@mui/material/Typography';
import { Trans } from 'react-i18next';

export interface ChatsSkeletonProps {}

export const ChatsSkeleton: FC<ChatsSkeletonProps> = ({}) => {
   return (
      <>
         <Typography sx={{ textAlign: 'center' }} variant='h4'>
            <Trans>chats</Trans>
         </Typography>
         <MenuList>
            <MenuItem divider>
               <ChatThumbnailSkeleton />
            </MenuItem>
            <MenuItem divider>
               <ChatThumbnailSkeleton />
            </MenuItem>
            <MenuItem divider>
               <ChatThumbnailSkeleton />
            </MenuItem>
         </MenuList>
      </>
   );
};

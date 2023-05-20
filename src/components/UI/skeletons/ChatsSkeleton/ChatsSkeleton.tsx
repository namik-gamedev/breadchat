import React, { FC } from 'react';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import { UserThumbnailSkeleton } from '../UserThumbnailSkeleton';
import { ChatThumbnailSkeleton } from '../ChatThumbnailSkeleton';

export interface ChatsSkeletonProps {}

export const ChatsSkeleton: FC<ChatsSkeletonProps> = ({}) => {
   return (
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
   );
};

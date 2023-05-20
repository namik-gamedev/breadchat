import React, { FC } from 'react';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import { UserThumbnailSkeleton } from '../UserThumbnailSkeleton';

export interface UsersSkeletonProps {}

export const UsersSkeleton: FC<UsersSkeletonProps> = ({}) => {
   return (
      <MenuList>
         <MenuItem divider>
            <UserThumbnailSkeleton />
         </MenuItem>
         <MenuItem divider>
            <UserThumbnailSkeleton />
         </MenuItem>
         <MenuItem divider>
            <UserThumbnailSkeleton />
         </MenuItem>
      </MenuList>
   );
};

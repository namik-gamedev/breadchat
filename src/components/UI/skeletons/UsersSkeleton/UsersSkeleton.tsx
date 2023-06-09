import React, { FC } from 'react';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import { UserThumbnailSkeleton } from '../UserThumbnailSkeleton';
import Typography from '@mui/material/Typography';
import { Trans } from 'react-i18next';

export interface UsersSkeletonProps {}

export const UsersSkeleton: FC<UsersSkeletonProps> = ({}) => {
   return (
      <>
         <Typography sx={{ textAlign: 'center' }} variant='h4'>
            <Trans>users</Trans>
         </Typography>
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
      </>
   );
};

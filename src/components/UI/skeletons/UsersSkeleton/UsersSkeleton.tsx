import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Typography from '@mui/material/Typography';
import { FC } from 'react';
import { Trans } from 'react-i18next';
import { UserThumbnailSkeleton } from '../UserThumbnailSkeleton';

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

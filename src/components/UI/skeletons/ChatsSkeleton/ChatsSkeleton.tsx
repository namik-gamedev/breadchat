import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Typography from '@mui/material/Typography';
import { FC } from 'react';
import { Trans } from 'react-i18next';
import { ChatThumbnailSkeleton } from '../ChatThumbnailSkeleton';

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

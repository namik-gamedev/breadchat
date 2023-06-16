import { SxProps, useTheme } from '@mui/material';
import Avatar, { AvatarProps } from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import { FC } from 'react';
import { OnlineBadge } from 'src/components/UI/OnlineBadge';
import { useAppSelector } from 'src/hooks/useAppSelector';
import { useIsUserBlocked } from 'src/hooks/useIsUserBlocked';
import { IUser } from 'src/types/types';

export interface UserAvatarProps extends AvatarProps {
   user: IUser;
   sx?: SxProps;
   withoutBadge?: boolean;
}

export const UserAvatar: FC<UserAvatarProps> = ({ user, withoutBadge = false, sx, ...props }) => {
   const theme = useTheme();

   const currentUser = useAppSelector((state) => state.user.data)!;
   const isSelfBlockedByUser = useIsUserBlocked(currentUser.uid, user.uid);

   return (
      <OnlineBadge online={user.online} invisible={withoutBadge || isSelfBlockedByUser}>
         <Tooltip title={user.displayName} arrow>
            <Avatar sx={{ ...sx, bgcolor: theme.palette.primary.main }} src={isSelfBlockedByUser ? '' : user.photoURL || ''} {...props} />
         </Tooltip>
      </OnlineBadge>
   );
};

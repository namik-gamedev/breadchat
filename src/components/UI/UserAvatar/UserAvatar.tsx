import React, { FC } from 'react';
import Avatar, { AvatarProps } from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import { BadgeProps } from '@mui/material/Badge';
import { useAppSelector } from 'src/hooks/useAppSelector';
import { OnlineBadge } from 'src/components/UI/OnlineBadge';
import { getRandomAvatarColor } from 'src/utils/getRandomAvatarColor.util';
import { UnstyledLink } from 'src/components/UI/UnstyledLink';
import { SxProps, getContrastRatio } from '@mui/material';
import { IUser } from 'src/types/types';

export interface UserAvatarProps extends AvatarProps {
   user: IUser;
   sx?: SxProps;
   withoutBadge?: boolean;
}

const avatarColor = getRandomAvatarColor();

export const UserAvatar: FC<UserAvatarProps> = ({ user: { displayName, photoURL }, withoutBadge = false, sx, ...props }) => {
   if (withoutBadge) {
      return (
         <Tooltip title={displayName} arrow>
            <Avatar sx={{ ...sx, bgcolor: avatarColor }} src={photoURL || ' '} alt={displayName?.toUpperCase()} {...props} />
         </Tooltip>
      );
   }

   return (
      <OnlineBadge>
         <Tooltip title={displayName} arrow>
            <Avatar sx={{ ...sx, bgcolor: avatarColor, color: '#eae0e0' }} src={photoURL || ' '} alt={displayName?.toUpperCase()} {...props} />
         </Tooltip>
      </OnlineBadge>
   );
};

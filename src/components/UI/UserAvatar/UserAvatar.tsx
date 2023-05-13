import React, { FC } from 'react';
import Avatar, { AvatarProps } from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import { BadgeProps } from '@mui/material/Badge';
import { useAppSelector } from 'src/hooks/useAppSelector';
import { OnlineBadge } from 'src/components/UI/OnlineBadge';
import { UnstyledLink } from 'src/components/UI/UnstyledLink';
import { SxProps, getContrastRatio } from '@mui/material';
import { IUser } from 'src/types/types';
import { useTheme } from '@mui/material';

export interface UserAvatarProps extends AvatarProps {
   user: IUser;
   sx?: SxProps;
   withoutBadge?: boolean;
}

export const UserAvatar: FC<UserAvatarProps> = ({ user: { displayName, photoURL, online }, withoutBadge = false, sx, ...props }) => {
   const theme = useTheme();

   return (
      <OnlineBadge online={online} invisible={withoutBadge}>
         <Tooltip title={displayName} arrow>
            <Avatar sx={{ ...sx, bgcolor: theme.palette.primary.main }} src={photoURL as string | undefined} {...props} />
         </Tooltip>
      </OnlineBadge>
   );
};

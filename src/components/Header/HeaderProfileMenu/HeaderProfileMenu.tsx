import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import { FC } from 'react';
import { ProfileMenuItems } from 'src/components/ProfileMenuItems';
import { StyledMenu } from 'src/components/UI/StyledMenu';
import { UserAvatar } from 'src/components/UI/UserAvatar';
import { useAnchorEl } from 'src/hooks/useAnchorEl';
import { useAppSelector } from 'src/hooks/useAppSelector';

export interface HeaderProfileMenuProps {}

export const HeaderProfileMenu: FC<HeaderProfileMenuProps> = ({}) => {
   const user = useAppSelector((state) => state.user.data);
   const userLoaded = useAppSelector((state) => state.global.dataLoad.user);
   const { anchorEl, open, handleShow, handleClose } = useAnchorEl();

   if (user) {
      return (
         <Box
            sx={{
               display: {
                  sm: 'block',
                  xs: 'none',
               },
            }}
         >
            {userLoaded ? (
               <UserAvatar user={user} onClick={handleShow} withoutBadge />
            ) : (
               <Skeleton variant='circular'>
                  <Avatar />
               </Skeleton>
            )}
            <StyledMenu anchorEl={anchorEl} open={open} onClose={handleClose}>
               <ProfileMenuItems handleClose={handleClose} />
            </StyledMenu>
         </Box>
      );
   } else {
      return null;
   }
};

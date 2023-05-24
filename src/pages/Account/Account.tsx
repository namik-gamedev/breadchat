import React, { FC, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import ChatIcon from '@mui/icons-material/Chat';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { Trans, useTranslation } from 'react-i18next';
import { StyledBox } from 'src/components/UI/StyledBox';
import { useAppSelector } from 'src/hooks/useAppSelector';
import { IUser } from 'src/types/types';
import { useParams } from 'react-router-dom';
import { OnlineBadge } from 'src/components/UI/OnlineBadge';
import { UserAvatar } from 'src/components/UI/UserAvatar';
import { UserThumbnail } from 'src/components/UI/UserThumbnail';
import moment from 'moment';
import { UnstyledLink } from 'src/components/UI/UnstyledLink';
import { NotFound } from '../NotFound';
import { useOpen } from 'src/hooks/useOpen';
import { EditAboutUserForm } from './EditAboutUserForm';
import { AccountHeader } from './AccountHeader';
import { AboutUser } from './AboutUser';
import { AccountSkeleton } from 'src/components/UI/skeletons/AccountSkeleton';

export interface AccountProps {}

// todo: make skeleton for this page
export const Account: FC<AccountProps> = ({}) => {
   const { userUid } = useParams();
   const usersLoaded = useAppSelector((state) => state.global.dataLoad.users);
   const user = useAppSelector((state) => state.users.data).find((u) => u.uid === userUid);
   const currentUser = useAppSelector((state) => state.user.data);
   const isCurrentUser = user?.uid === currentUser?.uid;

   const { t } = useTranslation();

   const { open, handleClose, handleShow } = useOpen();

   useEffect(() => {
      document.title = user?.displayName || t('no user with this id');
   }, [user]);

   if (usersLoaded) {
      if (user) {
         return (
            <Stack component={StyledBox} spacing={2} sx={{ p: 1, height: 1, overflow: 'auto' }}>
               <AccountHeader isCurrentUser={isCurrentUser} user={user} />

               {!open && <AboutUser isCurrentUser={isCurrentUser} user={user} handleFormShow={handleShow} />}

               {open && <EditAboutUserForm user={user} initialDescription={user?.about} onSubmit={handleClose} />}
            </Stack>
         );
      } else {
         return <NotFound />;
      }
   } else {
      // todo: skeleton
      return <AccountSkeleton />;
   }
};

import Stack from '@mui/material/Stack';
import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { StyledBox } from 'src/components/UI/StyledBox';
import { AccountSkeleton } from 'src/components/UI/skeletons/AccountSkeleton';
import { useAppSelector } from 'src/hooks/useAppSelector';
import { useIsUserBlocked } from 'src/hooks/useIsUserBlocked';
import { useOpen } from 'src/hooks/useOpen';
import { AccountProvider } from 'src/providers/AccountProvider';
import { NotFound } from '../NotFound';
import { AboutUser } from './AboutUser';
import { AccountHeader } from './AccountHeader';
import { EditAboutUserForm } from './EditAboutUserForm';

export const Account: FC = () => {
   const { userUid } = useParams();
   const usersLoaded = useAppSelector((state) => state.global.dataLoad.users);

   const currentUser = useAppSelector((state) => state.user.data);
   const user = useAppSelector((state) => state.users.data).find((u) => u.uid === userUid);
   const isUserBlocked = useIsUserBlocked(user?.uid, currentUser?.uid);
   const isSelfBlockedByUser = useIsUserBlocked(currentUser?.uid, user?.uid);
   const isCurrentUser = currentUser?.uid === user?.uid;

   const { t } = useTranslation();

   useEffect(() => {
      document.title = user?.displayName || t('no user with this id');
   }, [user]);

   if (usersLoaded) {
      if (user) {
         return (
            <AccountProvider value={{ user, isUserBlocked, isCurrentUser, isSelfBlockedByUser }}>
               <Stack component={StyledBox} spacing={2} sx={{ p: 1, height: 1, overflow: 'auto' }}>
                  <AccountHeader />

                  <AboutUser />
               </Stack>
            </AccountProvider>
         );
      } else {
         return <NotFound />;
      }
   } else {
      return <AccountSkeleton />;
   }
};

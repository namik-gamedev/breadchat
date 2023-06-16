import moment from 'moment';
import { FC, useEffect, useState } from 'react';
import { Trans } from 'react-i18next';
import { useAppSelector } from 'src/hooks/useAppSelector';
import { useIsUserBlocked } from 'src/hooks/useIsUserBlocked';
import { IUser } from 'src/types/types';

interface Props {
   user: IUser;
}

export const UserOnlineStatus: FC<Props> = ({ user }) => {
   const currentUser = useAppSelector((state) => state.user.data)!;

   const isSelfBlockedByUser = useIsUserBlocked(currentUser.uid, user.uid);

   const [status, setStatus] = useState('');

   useEffect(() => {
      if (isSelfBlockedByUser) {
         setStatus('you are blocked');
      } else if (user.online) {
         setStatus('online');
      } else {
         setStatus('last seen {{time}}');
      }
   }, [user.online, isSelfBlockedByUser]);

   return <Trans values={{ time: moment(user.lastSeen).calendar() }}>{status}</Trans>;
};

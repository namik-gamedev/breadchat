import moment from 'moment';
import React, { FC, useEffect, useState } from 'react';
import { Trans } from 'react-i18next';
import { useAppSelector } from 'src/hooks/useAppSelector';
import { useIsUserBlocked } from 'src/hooks/useIsUserBlocked';
import { IChat } from 'src/types/types';

export interface ChatHeaderOnlineStatusProps {
   chat: IChat;
}

export const ChatHeaderOnlineStatus: FC<ChatHeaderOnlineStatusProps> = ({ chat }) => {
   const user = useAppSelector((state) => state.users.data).find((u) => u.uid === chat.interlocutor.uid)!;
   const currentUser = useAppSelector((state) => state.user.data)!;

   const isSelfBlockedByUser = useIsUserBlocked(currentUser.uid, user.uid);

   const [status, setStatus] = useState('');

   useEffect(() => {
      console.log(1);
      if (isSelfBlockedByUser) {
         setStatus('you are blocked');
      } else if (user.online) {
         setStatus('online');
      } else if (chat.interlocutorTyping) {
         setStatus('typing');
      } else {
         setStatus('last seen {{time}}');
      }
   }, [chat, user, isSelfBlockedByUser]);

   return <Trans values={{ time: moment(user.lastSeen).calendar() }}>{status}</Trans>;
};
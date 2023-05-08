import React from 'react';
import { Chat } from 'src/pages/Chat';
import { Auth } from 'src/pages/Auth';
import { Chats } from 'src/pages/Chats';
import { NotFound } from 'src/pages/NotFound';
import { Users } from 'src/pages/Users';

export interface IRoute {
   path: string;
   component: React.FC;
   authRequired: boolean;
}

export const routes: IRoute[] = [
   {
      path: '/auth',
      component: Auth,
      authRequired: false,
   },
   {
      path: '/users',
      component: Users,
      authRequired: true,
   },
   {
      path: '/chats',
      component: Chats,
      authRequired: true,
   },
   {
      path: '/chat/:interlocutorUid',
      component: Chat,
      authRequired: true,
   },
];

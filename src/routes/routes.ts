import React from 'react';
import { About } from 'src/pages/About';
import { Account } from 'src/pages/Account';
import { Auth } from 'src/pages/Auth';
import { Chat } from 'src/pages/Chat';
import { Chats } from 'src/pages/Chats';
import { Users } from 'src/pages/Users';

export interface IRoute {
   path: string;
   component: React.FC<any>;
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
      path: '/about',
      component: About,
      authRequired: true,
   },
   {
      path: '/chat/:interlocutorUid',
      component: Chat,
      authRequired: true,
   },
   {
      path: '/account/:userUid',
      component: Account,
      authRequired: true,
   },
];

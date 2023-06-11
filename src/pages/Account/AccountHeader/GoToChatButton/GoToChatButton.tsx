import React, { FC, useContext } from 'react';
import Button from '@mui/material/Button';
import ChatIcon from '@mui/icons-material/Chat';
import { Trans } from 'react-i18next';
import { UnstyledLink } from 'src/components/UI/UnstyledLink';
import { AccountContext } from '../../Account';

export interface GoToChatButtonProps {}

export const GoToChatButton: FC<GoToChatButtonProps> = ({}) => {
   const user = useContext(AccountContext).user!;

   return (
      <Button variant='contained' startIcon={<ChatIcon />} component={UnstyledLink} to={`/chat/${user.uid}`}>
         <Trans>go to chat</Trans>
      </Button>
   );
};

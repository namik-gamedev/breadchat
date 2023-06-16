import ChatIcon from '@mui/icons-material/Chat';
import Button from '@mui/material/Button';
import { FC } from 'react';
import { Trans } from 'react-i18next';
import { UnstyledLink } from 'src/components/UI/UnstyledLink';
import { useAccountContext } from 'src/hooks/useAccountContext';

export interface GoToChatButtonProps {}

export const GoToChatButton: FC<GoToChatButtonProps> = ({}) => {
   const user = useAccountContext().user!;

   return (
      <Button variant='contained' startIcon={<ChatIcon />} component={UnstyledLink} to={`/chat/${user.uid}`}>
         <Trans>go to chat</Trans>
      </Button>
   );
};

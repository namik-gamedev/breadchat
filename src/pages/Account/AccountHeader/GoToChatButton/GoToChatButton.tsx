import ChatIcon from '@mui/icons-material/Chat';
import Button from '@mui/material/Button';
import { FC } from 'react';
import { Trans } from 'react-i18next';
import { UnstyledLink } from 'src/components/UI/UnstyledLink';
import { useAccount } from 'src/hooks/useAccount';

export const GoToChatButton: FC = () => {
   const user = useAccount().user!;

   return (
      <Button variant='contained' startIcon={<ChatIcon />} component={UnstyledLink} to={`/chat/${user.uid}`}>
         <Trans>go to chat</Trans>
      </Button>
   );
};

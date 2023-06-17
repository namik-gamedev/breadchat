import Button from '@mui/material/Button';
import { FC } from 'react';
import { Trans } from 'react-i18next';

interface Props {
   disabled: boolean;
}

export const SignInButton: FC<Props> = ({ disabled }) => {
   return (
      <Button disabled={disabled} type='submit' variant='contained'>
         <Trans>sign in</Trans>
      </Button>
   );
};

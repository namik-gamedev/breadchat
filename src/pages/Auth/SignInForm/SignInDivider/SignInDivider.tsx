import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { FC } from 'react';
import { Trans } from 'react-i18next';

export const SignInDivider: FC = () => {
   return (
      <Divider>
         <Typography sx={{ color: 'text.secondary' }}>
            <Trans>or sign in with</Trans>
         </Typography>
      </Divider>
   );
};

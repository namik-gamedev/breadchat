import TabContext from '@mui/lab/TabContext';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { FC, useEffect, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { IAuthTab } from 'src/types/types';
import { AuthTabList } from './AuthTabList';
import { AuthTabPanels } from './AuthTabPanels';

export const Auth: FC = () => {
   const { t } = useTranslation();

   const [tab, setTab] = useState<IAuthTab>('signIn');

   useEffect(() => {
      if (tab === 'signIn') {
         document.title = t('sign in');
      } else {
         document.title = t('sign up');
      }

      return () => {
         document.title = 'Bread';
      };
   }, [tab]);

   return (
      <Stack spacing={1} justifyContent='center' alignItems='center'>
         <Typography sx={{ fontWeight: 300, textAlign: 'center' }} variant='h4'>
            <Trans>you want to</Trans>
         </Typography>
         <TabContext value={tab}>
            <AuthTabList setTab={setTab} />
            <AuthTabPanels />
         </TabContext>
      </Stack>
   );
};

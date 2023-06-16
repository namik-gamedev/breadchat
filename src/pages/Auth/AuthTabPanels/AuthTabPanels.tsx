import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';
import { FC } from 'react';
import { SignInForm } from '../SignInForm';
import { SignUpForm } from '../SignUpForm';

export const AuthTabPanels: FC = () => {
   return (
      <Box
         sx={{
            width: {
               md: '60%',
               sm: '70%',
               xs: 1,
            },
         }}
      >
         <TabPanel value='signIn'>
            <SignInForm />
         </TabPanel>
         <TabPanel value='signUp'>
            <SignUpForm />
         </TabPanel>
      </Box>
   );
};

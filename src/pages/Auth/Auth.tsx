import React, { FC, useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TabList from '@mui/lab/TabList';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';
import { SignInForm } from 'src/components/SignInForm';
import { SignUpForm } from 'src/components/SignUpForm';

export interface AuthProps {}

type AuthTab = 'signIn' | 'signUp';

const tabSx = { fontSize: '1.2em', fontWeight: 500 };
const orTabSx = { ...tabSx, fontWeight: 400 };

export const Auth: FC<AuthProps> = ({}) => {
   const [tab, setTab] = useState<AuthTab>('signIn');

   const handleTabChange = (e: any, newValue: AuthTab) => {
      setTab(newValue);
   };

   useEffect(() => {
      if (tab === 'signIn') {
         document.title = 'Sign in';
      } else {
         document.title = 'Sign up';
      }

      return () => {
         document.title = 'Bread';
      };
   }, [tab]);

   return (
      <Stack spacing={2} justifyContent='center' alignItems='center'>
         <Typography sx={{ fontWeight: 300, textAlign: 'center' }} variant='h4'>
            You want to...
         </Typography>
         <TabContext value={tab}>
            <TabList selectionFollowsFocus onChange={handleTabChange}>
               <Tab label={<Typography sx={tabSx}>sign in</Typography>} value='signIn' />
               <Tab disabled label={<Typography sx={orTabSx}>or</Typography>} value='signUp' />
               <Tab label={<Typography sx={tabSx}>sign up</Typography>} value='signUp' />
            </TabList>
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
         </TabContext>
      </Stack>
   );
};

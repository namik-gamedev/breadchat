import { User, signInWithPopup } from '@firebase/auth';
import GoogleIcon from '@mui/icons-material/Google';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { FC } from 'react';
import { useNavigate } from 'react-router';
import { appAuth, authProvider } from 'src/firebase/firebase';

export const GoogleButton: FC = () => {
   const navigate = useNavigate();

   const handleGoogleSignIn = async () => {
      const { user }: { user: User } = await signInWithPopup(appAuth, authProvider);
      if (!user) {
         return;
      }
      navigate('/');
   };

   return (
      <Button variant='outlined' onClick={handleGoogleSignIn}>
         <Stack direction='row' alignItems='center' spacing={1}>
            <GoogleIcon fontSize='small' />
            <Typography variant='button'>google</Typography>
         </Stack>
      </Button>
   );
};

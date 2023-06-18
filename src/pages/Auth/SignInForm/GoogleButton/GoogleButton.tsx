import { User, signInWithPopup } from '@firebase/auth';
import GoogleIcon from '@mui/icons-material/Google';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { FC } from 'react';
import { useNavigate } from 'react-router';
import { appAuth, authProvider } from 'src/firebase/firebase';
import { useAppSelector } from 'src/hooks/useAppSelector';
import UserService from 'src/services/user.service';

export const GoogleButton: FC = () => {
   const navigate = useNavigate();
   const users = useAppSelector((state) => state.users.data);

   const handleGoogleSignIn = async () => {
      try {
         const { user }: { user: User } = await signInWithPopup(appAuth, authProvider);

         if (!users.some((u) => u.uid === user.uid)) {
            UserService.setup({
               displayName: user.displayName!,
               uid: user.uid,
               photoURL: user.displayName,
               online: true,
               lastSeen: Date.now(),
               blockedUsers: [],
            });
         }
         navigate('/');
      } catch (e: any) {
         console.log('something went wrong: ', e);
      }
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

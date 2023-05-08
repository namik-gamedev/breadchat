import React, { FC, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import FormHelperText from '@mui/material/FormHelperText';
import GoogleIcon from '@mui/icons-material/Google';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import * as Yup from 'yup';
import { FormikHelpers, useFormik } from 'formik';
import {
   EMAIL_FORM_REGEXP,
   INVALID_EMAIL_FORM_ERR,
   INVALID_PASSWORD_FORM_ERR,
   PASSWORD_FORM_REGEXP,
   REQUIRED_FORM_ERR,
} from 'src/constants/AuthForm.consts';
import { WRONG_PASSWORD_ERR, USER_NOT_FOUND_ERR, TOO_MANY_REQUESTS_ERR } from 'src/constants/Auth.consts';
import { PasswordField } from 'src/components/UI/PasswordField';
import { User, signInWithEmailAndPassword, signInWithPopup, signInWithRedirect } from 'firebase/auth';
import { appAuth, authProvider } from 'src/firebase/firebase';
import { useAppDispatch } from 'src/hooks/useAppDispatch';
import { setUser } from 'src/store/reducers/user.reducer';
import { StyledForm } from 'src/components/UI/StyledForm';
import { useNavigate } from 'react-router-dom';
import { getSignInError } from 'src/utils/getSignInError.util';
import { IUser } from 'src/types/types';
import UserService from 'src/services/user.service';
import { isAndroid } from 'react-device-detect';

export interface SignInFormProps {}

export interface SignInValues {
   email: string;
   password: string;
}

const initialValues: SignInValues = {
   email: '',
   password: '',
};

const validationSchema = Yup.object({
   email: Yup.string().required(REQUIRED_FORM_ERR).matches(EMAIL_FORM_REGEXP, INVALID_EMAIL_FORM_ERR),
   password: Yup.string()
      .required(REQUIRED_FORM_ERR)
      .min(8, INVALID_PASSWORD_FORM_ERR)
      .max(16, INVALID_PASSWORD_FORM_ERR)
      .matches(PASSWORD_FORM_REGEXP, INVALID_PASSWORD_FORM_ERR),
});

export const SignInForm: FC<SignInFormProps> = ({}) => {
   const dispatch = useAppDispatch();
   const navigate = useNavigate();

   const onSubmit = async ({ email, password }: SignInValues, { setSubmitting, setFieldError, setStatus }: FormikHelpers<SignInValues>) => {
      const auth = appAuth;

      try {
         const { user } = await signInWithEmailAndPassword(auth, email, password);

         dispatch(setUser({ displayName: user.displayName!, uid: user.uid })); // TODO: add here photoURL
         setSubmitting(false);
         navigate('/');
      } catch (e: any) {
         const error = getSignInError(e.code);
         if (error) {
            const { field, message } = error;
            if (field === 'status') {
               setStatus(message);
            } else {
               setFieldError(field, message);
            }
         }
      }
   };

   const { handleChange, handleBlur, handleSubmit, errors, isSubmitting, status } = useFormik<SignInValues>({
      initialValues,
      onSubmit,
      validationSchema,
   });

   const handleGoogleClick = async () => {
      const { user }: { user: User } = await signInWithPopup(appAuth, authProvider);
      if (!user) {
         return;
      }

      const newUser: IUser = {
         displayName: user.displayName!,
         uid: user.uid,
         photoURL: user.photoURL,
         online: true,
         lastSeen: Date.now(),
         typing: false,
      };
      await UserService.setup(newUser);
      dispatch(setUser(newUser)); // TODO: add here photoURL
      navigate('/');
   };

   return (
      <Stack spacing={2}>
         <StyledForm onSubmit={handleSubmit}>
            <TextField
               error={!!errors.email}
               helperText={errors.email}
               onBlur={handleBlur}
               onChange={handleChange}
               type='email'
               name='email'
               label='Email'
               required
            />
            <PasswordField
               error={!!errors.password}
               helperText={errors.password}
               onBlur={handleBlur}
               onChange={handleChange}
               name='password'
               label='Password'
               required
            />
            <Button disabled={isSubmitting} type='submit' variant='contained'>
               Sign in
            </Button>
            {status && <FormHelperText sx={{ color: 'error.main' }}>{status}</FormHelperText>}
         </StyledForm>
         <Divider>
            <Typography sx={{ color: 'grey' }}>or sign in with</Typography>
            {/* google and other icons */}
         </Divider>
         <Stack justifyContent='center' spacing={2} direction='row'>
            <Button variant='outlined' onClick={handleGoogleClick}>
               <Stack direction='row' alignItems='center' spacing={1}>
                  <GoogleIcon fontSize='small' />
                  <Typography variant='button'>google</Typography>
               </Stack>
            </Button>
         </Stack>
      </Stack>
   );
};

import React, { FC, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import {
   EMAIL_FORM_REGEXP,
   INVALID_EMAIL_FORM_ERR,
   INVALID_PASSWORD_FORM_ERR,
   PASSWORD_FORM_REGEXP,
   REQUIRED_FORM_ERR,
} from 'src/constants/AuthForm.consts';
import { WRONG_PASSWORD_ERR, USER_NOT_FOUND_ERR, TOO_MANY_REQUESTS_ERR } from 'src/constants/Auth.consts';
import { PasswordField } from 'src/components/UI/PasswordField';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { appAuth } from 'src/firebase/firebase';
import { useAppDispatch } from 'src/hooks/useAppDispatch';
import { setUser } from 'src/store/reducers/UserSlice';
import { StyledForm } from 'src/components/UI/StyledForm';
import { Divider, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getSignInError } from 'src/utils/getSignInError.util';

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

   const { handleChange, handleBlur, handleSubmit, errors, isSubmitting, status } = useFormik<SignInValues>({
      initialValues,
      onSubmit: async ({ email, password }, { setSubmitting, setFieldError, setStatus }) => {
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
      },
      validationSchema,
   });

   return (
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
         <Divider>
            <Typography sx={{ color: 'grey' }}>or sign in with</Typography>
            {/* google and other icons */}
         </Divider>
      </StyledForm>
   );
};

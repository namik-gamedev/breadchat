import React, { FC, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';
import * as Yup from 'yup';
import { FormikHelpers, useFormik } from 'formik';
import {
   CONFIRM_PASSWORD_FORM_ERR,
   EMAIL_FORM_REGEXP,
   INVALID_EMAIL_FORM_ERR,
   INVALID_NAME_FORM_ERR,
   INVALID_PASSWORD_FORM_ERR,
   NAME_FORM_REGEXP,
   PASSWORD_FORM_REGEXP,
   REQUIRED_FORM_ERR,
} from 'src/constants/AuthForm.consts';
import { PasswordField } from 'src/components/UI/PasswordField';
import { appAuth, db } from 'src/firebase/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { EMAIL_ALREADY_IN_USE_ERR } from 'src/constants/Auth.consts';
import { StyledForm } from 'src/components/UI/StyledForm';
import { setUser } from 'src/store/reducers/user.reducer';
import { useAppDispatch } from 'src/hooks/useAppDispatch';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import UserService from 'src/services/user.service';
import { getSignUpError } from 'src/utils/Auth.utils';
import { Trans, useTranslation } from 'react-i18next';

export interface SignUpFormProps {}

// todo: вынести тип
export interface SignUpValues {
   name: string;
   email: string;
   password: string;
   confirmPassword: string;
}

const initialValues: SignUpValues = {
   name: '',
   email: '',
   password: '',
   confirmPassword: '',
};

const validationSchema = Yup.object({
   name: Yup.string().required(REQUIRED_FORM_ERR).matches(NAME_FORM_REGEXP, INVALID_NAME_FORM_ERR),
   email: Yup.string().required(REQUIRED_FORM_ERR).matches(EMAIL_FORM_REGEXP, INVALID_EMAIL_FORM_ERR),
   password: Yup.string().required(REQUIRED_FORM_ERR).min(8, INVALID_PASSWORD_FORM_ERR).matches(PASSWORD_FORM_REGEXP, INVALID_PASSWORD_FORM_ERR),
   confirmPassword: Yup.string()
      .required(REQUIRED_FORM_ERR)
      .equals([Yup.ref('password')], CONFIRM_PASSWORD_FORM_ERR),
});

export const SignUpForm: FC<SignUpFormProps> = ({}) => {
   const dispatch = useAppDispatch();
   const navigate = useNavigate();

   const { t } = useTranslation();

   const onSubmit = async ({ email, password, name }: SignUpValues, { setSubmitting, setFieldError, setStatus }: FormikHelpers<SignUpValues>) => {
      try {
         const {
            user: { uid, displayName, photoURL },
         } = await createUserWithEmailAndPassword(appAuth, email, password);
         await updateProfile(appAuth.currentUser!, { displayName, photoURL });
         await UserService.setup({ displayName: name, uid, photoURL, online: true, lastSeen: Date.now(), blockedUsers: [] });

         await signInWithEmailAndPassword(appAuth, email, password);

         navigate('/');
      } catch (e: any) {
         const error = getSignUpError(e.code);
         if (error) {
            const { field, message } = error;
            setFieldError(field, message);
         }
      }
      setSubmitting(false);
   };

   const { handleChange, handleBlur, handleSubmit, errors, isSubmitting } = useFormik<SignUpValues>({
      initialValues,
      onSubmit,
      validationSchema,
   });

   return (
      <StyledForm onSubmit={handleSubmit}>
         <TextField
            error={!!errors.name}
            helperText={errors.name && t(errors.name)}
            onBlur={handleBlur}
            onChange={handleChange}
            type='text'
            name='name'
            label={t('name')}
            required
         />
         <TextField
            error={!!errors.email}
            helperText={errors.email && t(errors.email)}
            onBlur={handleBlur}
            onChange={handleChange}
            type='email'
            name='email'
            label={t('email')}
            required
         />
         <PasswordField
            error={!!errors.password}
            helperText={errors.password && t(errors.password)}
            onBlur={handleBlur}
            onChange={handleChange}
            name='password'
            label={t('password')}
            required
         />
         <PasswordField
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword && t(errors.confirmPassword)}
            onBlur={handleBlur}
            onChange={handleChange}
            name='confirmPassword'
            label={t('confirm password')}
            required
         />
         <Button disabled={isSubmitting} type='submit' variant='contained'>
            <Trans>sign up</Trans>
         </Button>
      </StyledForm>
   );
};

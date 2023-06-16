import TextField from '@mui/material/TextField';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { FormikHelpers, useFormik } from 'formik';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { PasswordField } from 'src/components/UI/PasswordField';
import { StyledForm } from 'src/components/UI/StyledForm';
import { signUpInitialValues, signUpValidationSchema } from 'src/constants/AuthForm.consts';
import { appAuth } from 'src/firebase/firebase';
import UserService from 'src/services/user.service';
import { ISignUpValues } from 'src/types/types';
import { getSignUpError } from 'src/utils/Auth.utils';
import { SignUpButton } from './SignUpButton';

export const SignUpForm: FC = () => {
   const navigate = useNavigate();

   const { t } = useTranslation();

   const onSubmit = async ({ email, password, name }: ISignUpValues, { setSubmitting, setFieldError }: FormikHelpers<ISignUpValues>) => {
      try {
         const {
            user: { uid, displayName, photoURL },
         } = await createUserWithEmailAndPassword(appAuth, email, password);
         await Promise.all([
            updateProfile(appAuth.currentUser!, { displayName, photoURL }),
            UserService.setup({ displayName: name, uid, photoURL, online: true, lastSeen: Date.now(), blockedUsers: [] }),
            signInWithEmailAndPassword(appAuth, email, password),
         ]);

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

   const { handleChange, handleBlur, handleSubmit, errors, isSubmitting } = useFormik<ISignUpValues>({
      initialValues: signUpInitialValues,
      onSubmit,
      validationSchema: signUpValidationSchema,
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

         <SignUpButton disabled={isSubmitting} />
      </StyledForm>
   );
};

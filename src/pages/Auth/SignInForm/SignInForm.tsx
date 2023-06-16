import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { FormikHelpers, useFormik } from 'formik';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { PasswordField } from 'src/components/UI/PasswordField';
import { StyledForm } from 'src/components/UI/StyledForm';
import { signInInitialValues, signInValidationSchema } from 'src/constants/AuthForm.consts';
import { appAuth } from 'src/firebase/firebase';
import { ISignInValues } from 'src/types/types';
import { getSignInError } from 'src/utils/Auth.utils';
import { GoogleButton } from './GoogleButton';
import { SignInButton } from './SignInButton';
import { SignInDivider } from './SignInDivider';

export const SignInForm: FC = () => {
   const navigate = useNavigate();

   const { t } = useTranslation();

   const onSubmit = async ({ email, password }: ISignInValues, { setSubmitting, setFieldError }: FormikHelpers<ISignInValues>) => {
      try {
         await signInWithEmailAndPassword(appAuth, email, password);

         setSubmitting(false);
         navigate('/');
      } catch (e: any) {
         const error = getSignInError(e.code);
         if (error) {
            const { field, message } = error;
            setFieldError(field, message);
         }
      }
   };

   const { handleChange, handleBlur, handleSubmit, errors, isSubmitting } = useFormik<ISignInValues>({
      initialValues: signInInitialValues,
      onSubmit,
      validationSchema: signInValidationSchema,
   });

   return (
      <Stack spacing={2}>
         <StyledForm onSubmit={handleSubmit}>
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

            <SignInButton disabled={isSubmitting} />
         </StyledForm>

         <SignInDivider />

         <GoogleButton />
      </Stack>
   );
};

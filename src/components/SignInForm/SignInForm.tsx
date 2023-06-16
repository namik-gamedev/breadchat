import GoogleIcon from '@mui/icons-material/Google';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FormHelperText from '@mui/material/FormHelperText';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { User, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { FormikHelpers, useFormik } from 'formik';
import { FC } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { PasswordField } from 'src/components/UI/PasswordField';
import { StyledForm } from 'src/components/UI/StyledForm';
import {
   EMAIL_FORM_REGEXP,
   INVALID_EMAIL_FORM_ERR,
   INVALID_PASSWORD_FORM_ERR,
   PASSWORD_FORM_REGEXP,
   REQUIRED_FORM_ERR,
} from 'src/constants/AuthForm.consts';
import { appAuth, authProvider } from 'src/firebase/firebase';
import { SignInValues } from 'src/types/types';
import { getSignInError } from 'src/utils/Auth.utils';
import * as Yup from 'yup';

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

export const SignInForm: FC = () => {
   const navigate = useNavigate();

   const { t } = useTranslation();

   const onSubmit = async ({ email, password }: SignInValues, { setSubmitting, setFieldError }: FormikHelpers<SignInValues>) => {
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
      navigate('/');
   };

   // todo: decomposition
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
            <Button disabled={isSubmitting} type='submit' variant='contained'>
               <Trans>sign in</Trans>
            </Button>
            {status && <FormHelperText sx={{ color: 'error.main' }}>{status}</FormHelperText>}
         </StyledForm>
         <Divider>
            <Typography sx={{ color: 'text.secondary' }}>
               <Trans>or sign in with</Trans>
            </Typography>
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

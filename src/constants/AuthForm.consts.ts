import { ISignInValues, ISignUpValues } from 'src/types/types';
import * as Yup from 'yup';

export const REQUIRED_FORM_ERR: string = 'field is required';
export const INVALID_NAME_FORM_ERR: string = 'invalid name';
export const INVALID_EMAIL_FORM_ERR: string = 'invalid email';
export const INVALID_PASSWORD_FORM_ERR: string = 'invalid password';
// 'Password must contain 8 and more characters: at least 1 lowercase, 1 uppercase letters and 1 digit!';
export const CONFIRM_PASSWORD_FORM_ERR: string = 'passwords must match';

export const NAME_FORM_REGEXP = /^[a-zA-Zа-яА-я ,.-]*$/;
export const EMAIL_FORM_REGEXP =
   /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const PASSWORD_FORM_REGEXP = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[0-9a-zA-Z]{8,}$/;

export const signInValidationSchema = Yup.object({
   email: Yup.string().required(REQUIRED_FORM_ERR).matches(EMAIL_FORM_REGEXP, INVALID_EMAIL_FORM_ERR),
   password: Yup.string().required(REQUIRED_FORM_ERR).min(8, INVALID_PASSWORD_FORM_ERR).matches(PASSWORD_FORM_REGEXP, INVALID_PASSWORD_FORM_ERR),
});

export const signInInitialValues: ISignInValues = {
   email: '',
   password: '',
};

export const signUpValidationSchema = Yup.object({
   name: Yup.string().required(REQUIRED_FORM_ERR).matches(NAME_FORM_REGEXP, INVALID_NAME_FORM_ERR),
   email: Yup.string().required(REQUIRED_FORM_ERR).matches(EMAIL_FORM_REGEXP, INVALID_EMAIL_FORM_ERR),
   password: Yup.string().required(REQUIRED_FORM_ERR).min(8, INVALID_PASSWORD_FORM_ERR).matches(PASSWORD_FORM_REGEXP, INVALID_PASSWORD_FORM_ERR),
   confirmPassword: Yup.string()
      .required(REQUIRED_FORM_ERR)
      .equals([Yup.ref('password')], CONFIRM_PASSWORD_FORM_ERR),
});

export const signUpInitialValues: ISignUpValues = {
   name: '',
   email: '',
   password: '',
   confirmPassword: '',
};

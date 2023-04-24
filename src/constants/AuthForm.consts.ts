export const REQUIRED_FORM_ERR: string = 'This field is required!';
export const INVALID_NAME_FORM_ERR: string = 'Invalid name!';
export const INVALID_EMAIL_FORM_ERR: string = 'Invalid email address!';
export const INVALID_PASSWORD_FORM_ERR: string =
   'Password must contain 8 and more characters: at least 1 lowercase, 1 uppercase letters and 1 digit!';
export const CONFIRM_PASSWORD_FORM_ERR: string = 'Passwords must match!';

export const NAME_FORM_REGEXP = /^[a-z A-Z]*$/;
export const EMAIL_FORM_REGEXP =
   /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const PASSWORD_FORM_REGEXP = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{0,}$/;

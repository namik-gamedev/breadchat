export const REQUIRED_FORM_ERR: string = 'field is required';
export const INVALID_NAME_FORM_ERR: string = 'invalid name';
export const INVALID_EMAIL_FORM_ERR: string = 'invalid email';
export const INVALID_PASSWORD_FORM_ERR: string = 'invalid passowrd';
// 'Password must contain 8 and more characters: at least 1 lowercase, 1 uppercase letters and 1 digit!';
export const CONFIRM_PASSWORD_FORM_ERR: string = 'passwords must match';

export const NAME_FORM_REGEXP = /^[a-z A-Z]*$/;
export const EMAIL_FORM_REGEXP =
   /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const PASSWORD_FORM_REGEXP = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{0,}$/;

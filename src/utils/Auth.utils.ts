import { EMAIL_ALREADY_IN_USE_ERR, TOO_MANY_REQUESTS_ERR, USER_NOT_FOUND_ERR, WRONG_PASSWORD_ERR } from 'src/constants/Auth.consts';

export type SignInErrorField = 'status' | 'email' | 'password';
export interface SignInError {
   field: SignInErrorField;
   message: string;
}

export const getSignInError = (code: string): SignInError | undefined => {
   // todo: дополнить ошибки
   switch (code) {
      case 'auth/user-not-found':
         return {
            field: 'email',
            message: USER_NOT_FOUND_ERR,
         };
      case 'auth/wrong-password':
         return {
            field: 'password',
            message: WRONG_PASSWORD_ERR,
         };
      case 'auth/too-many-requests':
         return {
            field: 'status',
            message: TOO_MANY_REQUESTS_ERR,
         };
      default: {
         return;
      }
   }
};

export const getSignUpError = (code: string): SignInError | undefined => {
   // todo: дополнить ошибки
   switch (code) {
      case 'auth/email-already-in-use':
         return {
            field: 'email',
            message: EMAIL_ALREADY_IN_USE_ERR,
         };
      default: {
         return;
      }
   }
};

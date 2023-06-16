import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { FC, useState } from 'react';

export const PasswordField: FC<TextFieldProps> = (props) => {
   const [show, setShow] = useState(false);

   const handlePasswordShow = () => {
      setShow((prev) => !prev);
   };

   return (
      <TextField
         {...props}
         type={show ? 'text' : 'password'}
         required
         InputProps={{
            endAdornment: (
               <InputAdornment position='end'>
                  <IconButton onClick={handlePasswordShow}>
                     {show ? <Visibility sx={{ color: 'text.secondary' }} /> : <VisibilityOff sx={{ color: 'text.secondary' }} />}
                  </IconButton>
               </InputAdornment>
            ),
         }}
      />
   );
};

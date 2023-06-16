import React, { FC, useState } from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { styled } from '@mui/material';

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

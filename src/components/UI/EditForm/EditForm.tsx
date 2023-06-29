import CloseIcon from '@mui/icons-material/Close';
import CreateIcon from '@mui/icons-material/Create';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField, { OutlinedTextFieldProps } from '@mui/material/TextField';
import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAccount } from 'src/hooks/useAccount';
import UserService from 'src/services/user.service';

interface Props extends Omit<OutlinedTextFieldProps, 'variant'> {
   handleClose: () => void;
   handleAction: (newValue: string) => void;
   initialValue: string | undefined;
   label: string;
}

export const EditForm: FC<Props> = ({ handleClose, label, handleAction, initialValue, ...props }) => {
   const [value, setValue] = useState(initialValue || '');
   const [isInputError, setIsInputError] = useState(false);

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
   };

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();

      const trimmedValue = value.trimStart().trimEnd();
      if (trimmedValue === '') {
         setIsInputError(true);
         return;
      }

      handleAction(trimmedValue);
      handleClose();
   };

   return (
      <Box component='form' onSubmit={handleSubmit}>
         <TextField
            {...props}
            focused
            value={value}
            onChange={handleChange}
            label={label}
            fullWidth
            error={isInputError}
            InputProps={{
               endAdornment: (
                  <InputAdornment position='end'>
                     <IconButton onClick={handleClose}>
                        <CloseIcon />
                     </IconButton>
                     <IconButton type='submit'>
                        <CreateIcon color='primary' />
                     </IconButton>
                  </InputAdornment>
               ),
            }}
         />
      </Box>
   );
};

import CloseIcon from '@mui/icons-material/Close';
import CreateIcon from '@mui/icons-material/Create';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAccount } from 'src/hooks/useAccount';
import UserService from 'src/services/user.service';

interface Props {
   handleClose: () => void;
   handleAction: () => void;
   initialValue: string | undefined;
   label: string;
}

export const EditForm: FC<Props> = ({ handleClose, label, handleAction, initialValue }) => {
   const [value, setValue] = useState(initialValue || '');
   const [isInputError, setIsInputError] = useState(false);

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
   };

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();

      if (value.trimStart() === '') {
         setIsInputError(true);
         return;
      }

      handleAction();
      handleClose();
   };

   return (
      <Box component='form' onSubmit={handleSubmit}>
         <TextField
            focused
            value={value}
            onChange={handleChange}
            label={label}
            fullWidth
            multiline
            error={isInputError}
            maxRows={3}
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
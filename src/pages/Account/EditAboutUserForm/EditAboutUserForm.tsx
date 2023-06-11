import React, { FC, FormEvent, useContext, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import CreateIcon from '@mui/icons-material/Create';
import { useTranslation } from 'react-i18next';
import UserService from 'src/services/user.service';
import CloseIcon from '@mui/icons-material/Close';
import { IUser } from 'src/types/types';
import { AccountContext } from '../Account';

export interface EditAboutUserFormProps {
   handleClose: () => void;
}

export const EditAboutUserForm: FC<EditAboutUserFormProps> = ({ handleClose }) => {
   const user = useContext(AccountContext).user!;

   const [about, setAbout] = useState(user.about || '');
   const [isInputError, setIsInputError] = useState(false);

   const { t } = useTranslation();

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setAbout(e.target.value);
   };

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();

      if (about.trimStart() === '') {
         setIsInputError(true);
         return;
      }

      UserService.setAbout(user.uid, about.trimStart().trimEnd());
      handleClose();
   };

   return (
      <Box component='form' onSubmit={handleSubmit}>
         <TextField
            focused
            value={about}
            onChange={handleChange}
            label={t('about user')}
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

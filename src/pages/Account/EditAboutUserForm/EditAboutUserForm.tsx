import React, { FC, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import CreateIcon from '@mui/icons-material/Create';
import { useTranslation } from 'react-i18next';
import UserService from 'src/services/user.service';
import { IUser } from 'src/types/types';

export interface EditAboutUserFormProps {
   user: IUser;
   initialDescription?: string;
   onSubmit: () => void;
}

export const EditAboutUserForm: FC<EditAboutUserFormProps> = ({ user, initialDescription, onSubmit }) => {
   const [about, setAbout] = useState(initialDescription || '');

   const { t } = useTranslation();

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setAbout(e.target.value);
   };

   const handleSubmit = () => {
      UserService.setAbout(user.uid, about);
      onSubmit();
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
            maxRows={3}
            InputProps={{
               endAdornment: (
                  <InputAdornment position='end'>
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

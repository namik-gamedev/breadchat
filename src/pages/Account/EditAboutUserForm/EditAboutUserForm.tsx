import CloseIcon from '@mui/icons-material/Close';
import CreateIcon from '@mui/icons-material/Create';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EditForm } from 'src/components/UI/EditForm';
import { useAccount } from 'src/hooks/useAccount';
import UserService from 'src/services/user.service';

interface Props {
   handleClose: () => void;
}

export const EditAboutUserForm: FC<Props> = ({ handleClose }) => {
   const user = useAccount().user!;

   const { t } = useTranslation();

   const handleAboutSet = (about: string) => {
      UserService.setAbout(user.uid, about);
   };

   return <EditForm label={t('about user')} initialValue={user.about} handleAction={handleAboutSet} handleClose={handleClose} />;
};

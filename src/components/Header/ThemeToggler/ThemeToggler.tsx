import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'src/hooks/useAppDispatch';
import { useAppSelector } from 'src/hooks/useAppSelector';
import { setDarkTheme } from 'src/store/reducers/global.reducer';

export const ThemeToggler: FC = () => {
   const dark = useAppSelector((state) => state.global.darkTheme);
   const dispatch = useAppDispatch();

   const { t } = useTranslation();

   const handleDarkToggle = () => {
      dispatch(setDarkTheme(!dark));
   };

   return (
      <Tooltip title={t(dark ? 'toggle light' : 'toggle dark')} arrow>
         <IconButton onClick={handleDarkToggle}>
            {dark ? <LightModeOutlinedIcon color='primary' /> : <DarkModeOutlinedIcon color='primary' />}
         </IconButton>
      </Tooltip>
   );
};

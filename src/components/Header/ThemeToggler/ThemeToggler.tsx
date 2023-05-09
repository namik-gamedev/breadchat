import React, { FC, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import { useAppDispatch } from 'src/hooks/useAppDispatch';
import { setDarkTheme } from 'src/store/reducers/global.reducer';
import Tooltip from '@mui/material/Tooltip';

export interface ThemeTogglerProps {}

export const ThemeToggler: FC<ThemeTogglerProps> = ({}) => {
   const dispatch = useAppDispatch();

   const [dark, setDark] = useState(false);

   const handleClick = () => {
      setDark((prev) => !prev);
   };

   useEffect(() => {
      dispatch(setDarkTheme(dark));
   }, [dark]);

   return (
      <Tooltip title={`Enable ${dark ? 'light' : 'dark'}`} arrow>
         <IconButton onClick={handleClick}>{dark ? <LightModeOutlinedIcon color='primary' /> : <DarkModeOutlinedIcon color='primary' />}</IconButton>
      </Tooltip>
   );
};
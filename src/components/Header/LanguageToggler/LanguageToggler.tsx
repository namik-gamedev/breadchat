import React, { FC, useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { setLanguage } from 'src/store/reducers/global.reducer';
import { useAppDispatch } from 'src/hooks/useAppDispatch';
import moment from 'moment';
import { enLocaleSpec } from 'src/locales/en.localeSpec';
import { ruLocaleSpec } from 'src/locales/ru.localeSpec';
import i18n from 'src/i18n/i18n';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'src/hooks/useAppSelector';
import { ILanguage } from 'src/types/types';

export interface LanguageTogglerProps {}

export const LanguageToggler: FC<LanguageTogglerProps> = ({}) => {
   const dispatch = useAppDispatch();

   const lang = useAppSelector((state) => state.global.language);

   const { t } = useTranslation();

   const handleClick = () => {
      dispatch(setLanguage(lang === ILanguage.EN ? ILanguage.RU : ILanguage.EN));
   };

   return (
      <Tooltip title={t(lang === ILanguage.EN ? 'toggle russian' : 'toggle english')} arrow>
         <IconButton onClick={handleClick}>
            {lang === ILanguage.RU ? (
               <Typography fontWeight='bold' color='primary'>
                  EN
               </Typography>
            ) : (
               <Typography fontWeight='bold' color='primary'>
                  RU
               </Typography>
            )}
         </IconButton>
      </Tooltip>
   );
};

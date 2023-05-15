import React, { FC, useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { Language, setLanguage } from 'src/store/reducers/global.reducer';
import { useAppDispatch } from 'src/hooks/useAppDispatch';
import moment from 'moment';
import { enLocaleSpec } from 'src/locales/en.localeSpec';
import { ruLocaleSpec } from 'src/locales/ru.localeSpec';
import i18n from 'src/i18n/i18n';

export interface LanguageTogglerProps {}

export const LanguageToggler: FC<LanguageTogglerProps> = ({}) => {
   const dispatch = useAppDispatch();

   const [lang, setLang] = useState<Language>(Language.EN);

   const handleClick = () => {
      setLang(lang === Language.EN ? Language.RU : Language.EN);
   };

   useEffect(() => {
      dispatch(setLanguage(lang));
      moment.updateLocale(lang, lang === Language.EN ? enLocaleSpec : ruLocaleSpec);
      i18n.changeLanguage(lang);
   }, [lang]);

   return (
      <Tooltip title={`Toggle ${lang === Language.EN ? 'russian' : 'english'}`} arrow>
         <IconButton onClick={handleClick}>
            {lang === Language.RU ? (
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

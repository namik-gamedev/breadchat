import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'src/hooks/useAppDispatch';
import { useAppSelector } from 'src/hooks/useAppSelector';
import { setLanguage } from 'src/store/reducers/global.reducer';
import { ILanguage } from 'src/types/types';

export const LanguageToggler: FC = () => {
   const dispatch = useAppDispatch();

   const lang = useAppSelector((state) => state.global.language);

   const { t } = useTranslation();

   const handleLanguageChange = () => {
      dispatch(setLanguage(lang === ILanguage.EN ? ILanguage.RU : ILanguage.EN));
   };

   return (
      <Tooltip title={t(lang === ILanguage.EN ? 'toggle russian' : 'toggle english')} arrow>
         <IconButton onClick={handleLanguageChange}>
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

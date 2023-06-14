import React, { FC, useContext } from 'react';
import { Trans } from 'react-i18next';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { UsersShowType } from 'src/types/types';
import { useUsersContext } from 'src/hooks/useUsersContext';

export interface NoUsersMessageProps {}

const getMessageText = (searchQueryIsEmpty: boolean, usersShowType: UsersShowType): string => {
   if (searchQueryIsEmpty) {
      if (usersShowType === UsersShowType.ONLINE) {
         return 'no users online';
      }
      return 'no users';
   } else {
      return 'no users found';
   }
};

export const NoUsersMessage: FC<NoUsersMessageProps> = ({}) => {
   const { searchQuery, usersShowType } = useUsersContext();

   return (
      <Stack sx={{ alignItems: 'center', pt: 2 }}>
         <Typography variant='body1'>
            <Trans>{getMessageText(searchQuery === '', usersShowType)}</Trans>
         </Typography>
      </Stack>
   );
};

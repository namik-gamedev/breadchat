import React, { FC, useContext } from 'react';
import { Trans } from 'react-i18next';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { UsersContext } from '../Users';
import { UsersShowType } from 'src/types/types';

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
   const { searchQuery, usersShowType } = useContext(UsersContext);

   return (
      <Stack sx={{ alignItems: 'center', pt: 2 }}>
         <Typography variant='body1'>
            <Trans>{getMessageText(searchQuery === '', usersShowType)}</Trans>
         </Typography>
      </Stack>
   );
};

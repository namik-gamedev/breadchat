import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { FC } from 'react';
import { Trans } from 'react-i18next';
import { useUsersContext } from 'src/hooks/useUsersContext';
import { UsersShowType } from 'src/types/types';

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

export const NoUsersMessage: FC = () => {
   const { searchQuery, usersShowType } = useUsersContext();

   return (
      <Stack sx={{ alignItems: 'center', pt: 2 }}>
         <Typography variant='body1'>
            <Trans>{getMessageText(searchQuery === '', usersShowType)}</Trans>
         </Typography>
      </Stack>
   );
};

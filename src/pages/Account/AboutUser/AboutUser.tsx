import CreateIcon from '@mui/icons-material/Create';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { FC } from 'react';
import { Trans } from 'react-i18next';
import { useAccount } from 'src/hooks/useAccount';
import { useOpen } from 'src/hooks/useOpen';
import { EditAboutUserForm } from '../EditAboutUserForm';

export const AboutUser: FC = () => {
   const { isCurrentUser, isSelfBlockedByUser } = useAccount();
   const user = useAccount().user!;

   const { open: formOpen, handleClose: handleFormClose, handleShow: handleFormShow } = useOpen();

   return formOpen ? (
      <EditAboutUserForm handleClose={handleFormClose} />
   ) : (
      <Stack direction='row' sx={{ justifyContent: 'space-between' }}>
         <Box>
            <Typography variant='body1' color='text.secondary'>
               <Trans>about user</Trans>
            </Typography>
            <Typography variant='h6' sx={{ fontWeight: 'normal' }}>
               <Trans>{(!isSelfBlockedByUser && user.about) || 'about user'}</Trans>
            </Typography>
         </Box>
         {isCurrentUser && (
            <Box>
               <IconButton onClick={handleFormShow}>
                  <CreateIcon />
               </IconButton>
            </Box>
         )}
      </Stack>
   );
};

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { FC } from 'react';
import { Trans } from 'react-i18next';
import { useOpen } from 'src/hooks/useOpen';
import { BlockUserDialog } from 'src/pages/Account/AccountHeader/BlockUserDialog';
import { IUser } from 'src/types/types';

export interface UnblockButtonProps {
   user: IUser;
}

export const UnblockButton: FC<UnblockButtonProps> = ({ user }) => {
   const { open, handleClose, handleShow } = useOpen();

   return (
      <Stack>
         <Button variant='contained' onClick={handleShow}>
            <Trans>unblock user</Trans>
         </Button>
         <BlockUserDialog blocked={true} open={open} handleClose={handleClose} user={user} />
      </Stack>
   );
};

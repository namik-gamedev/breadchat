import React, { FC } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { BlockUserDialog } from 'src/pages/Account/AccountHeader/BlockUserDialog';
import { useOpen } from 'src/hooks/useOpen';
import UserService from 'src/services/user.service';
import { useAppSelector } from 'src/hooks/useAppSelector';
import { IUser } from 'src/types/types';
import { Trans } from 'react-i18next';

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

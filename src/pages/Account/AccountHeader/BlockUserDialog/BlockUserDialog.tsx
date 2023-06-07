import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { ConfirmDialog } from 'src/components/UI/ConfirmDialog';
import { useAppSelector } from 'src/hooks/useAppSelector';
import UserService from 'src/services/user.service';
import { IUser } from 'src/types/types';

export interface BlockUserDialogProps {
   open: boolean;
   blocked: boolean;
   handleClose: () => void;
   user: IUser;
}

export const BlockUserDialog: FC<BlockUserDialogProps> = ({ open, blocked, handleClose, user }) => {
   const { t } = useTranslation();

   const currentUser = useAppSelector((state) => state.user.data)!;

   const handleAction = () => {
      UserService.setUserBlocked(currentUser.uid, user, !blocked);
   };

   return (
      <ConfirmDialog
         open={open}
         handleClose={handleClose}
         title={blocked ? t('unblock user') : t('block user')}
         contentText={blocked ? t('are you sure you want to unblock user') : t('are you sure you want to block user')}
         handleAction={handleAction}
      ></ConfirmDialog>
   );
};

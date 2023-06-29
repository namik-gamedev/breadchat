import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { EditForm } from 'src/components/UI/EditForm';
import { useAccount } from 'src/hooks/useAccount';
import UserService from 'src/services/user.service';

interface Props {
   handleClose: () => void;
}

export const EditNameForm: FC<Props> = ({ handleClose }) => {
   const user = useAccount().user!;

   const { t } = useTranslation();

   const handleAboutSet = (name: string) => {
      UserService.setDisplayName(user.uid, name);
   };

   return <EditForm label={t('user name')} initialValue={user.displayName} handleAction={handleAboutSet} handleClose={handleClose} />;
};

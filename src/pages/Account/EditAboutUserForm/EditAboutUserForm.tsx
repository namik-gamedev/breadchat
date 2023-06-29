import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { EditForm } from 'src/components/UI/EditForm';
import { useAccount } from 'src/hooks/useAccount';
import UserService from 'src/services/user.service';

interface Props {
   handleClose: () => void;
}

export const EditAboutUserForm: FC<Props> = ({ handleClose }) => {
   const user = useAccount().user!;

   const { t } = useTranslation();

   const handleAboutSet = (about: string) => {
      UserService.setAbout(user.uid, about);
   };

   return <EditForm label={t('about user')} initialValue={user.about} handleAction={handleAboutSet} handleClose={handleClose} />;
};

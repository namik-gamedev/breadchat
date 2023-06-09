import Typography from '@mui/material/Typography';
import { FC } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { ConfirmDialog } from 'src/components/UI/ConfirmDialog';
import { useAppSelector } from 'src/hooks/useAppSelector';
import ChatService from 'src/services/chat.service';
import { IUser } from 'src/types/types';

interface Props {
   open: boolean;
   handleClose: () => void;
   interlocutor: IUser;
}

export const ClearChatDialog: FC<Props> = ({ open, handleClose, interlocutor }) => {
   const user = useAppSelector((state) => state.user.data)!;
   const { t } = useTranslation();

   const handleAction = (alsoForInterlocutor: boolean) => {
      ChatService.clear(user.uid, interlocutor.uid, alsoForInterlocutor);
   };

   return (
      <ConfirmDialog
         open={open}
         handleClose={handleClose}
         title={t('clear chat')}
         contentText={t('are you sure you want to clear chat')}
         checkboxLabel={
            <Typography>
               <Trans>also clear for</Trans>
               <Typography component='span' color='primary'>
                  {interlocutor.displayName}
               </Typography>
            </Typography>
         }
         handleAction={handleAction}
      />
   );
};

import Typography from '@mui/material/Typography';
import { FC } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { ConfirmDialog } from 'src/components/UI/ConfirmDialog';
import { useAppSelector } from 'src/hooks/useAppSelector';
import ChatService from 'src/services/chat.service';
import { IMessage, IUser } from 'src/types/types';

export interface DeleteMessageDialogProps {
   open: boolean;
   handleClose: () => void;
   interlocutorDisplayName: string;
   interlocutor: IUser;
   message: IMessage;
   isUnreaded: boolean;
}

export const DeleteMessageDialog: FC<DeleteMessageDialogProps> = ({
   open,
   handleClose,
   interlocutorDisplayName,
   interlocutor,
   message,
   isUnreaded,
}) => {
   const user = useAppSelector((state) => state.user.data)!;
   const { t } = useTranslation();

   const handleAction = (alsoForInterlocutor: boolean) => {
      ChatService.deleteMessage(user.uid, interlocutor.uid, message.createdAt, alsoForInterlocutor, alsoForInterlocutor ? isUnreaded : false);
   };

   return (
      <ConfirmDialog
         open={open}
         handleClose={handleClose}
         title={t('delete message')}
         contentText={t('are you sure you want to delete message')}
         checkboxLabel={
            <Typography>
               <Trans>also delete for</Trans>
               <Typography component='span' color='primary'>
                  {interlocutorDisplayName}
               </Typography>
            </Typography>
         }
         handleAction={handleAction}
      />
   );
};

import React, { FC } from 'react';
import Typography from '@mui/material/Typography';
import { ConfirmDialog } from 'src/components/UI/ConfirmDialog';
import { useTranslation, Trans } from 'react-i18next';

export interface ChatMessageDialogProps {
   open: boolean;
   handleClose: () => void;
   interlocutorDisplayName: string;
   handleAction: (b: boolean) => void;
}

export const ChatMessageDialog: FC<ChatMessageDialogProps> = ({ open, handleClose, interlocutorDisplayName, handleAction }) => {
   const { t } = useTranslation();

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

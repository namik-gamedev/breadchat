import React, { FC } from 'react';
import Typography from '@mui/material/Typography';
import { ConfirmDialog } from 'src/components/UI/ConfirmDialog';
import { Trans, useTranslation } from 'react-i18next';

export interface ChatHeaderDialogProps {
   open: boolean;
   handleClose: () => void;
   interlocutorDisplayName: string;
   handleAction: (b: boolean) => void;
}

export const ChatHeaderDialog: FC<ChatHeaderDialogProps> = ({ open, handleClose, interlocutorDisplayName, handleAction }) => {
   const { t } = useTranslation();

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
                  {interlocutorDisplayName}
               </Typography>
            </Typography>
         }
         handleAction={handleAction}
      />
   );
};

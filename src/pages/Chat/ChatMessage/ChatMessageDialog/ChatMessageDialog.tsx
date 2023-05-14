import React, { FC } from 'react';
import Typography from '@mui/material/Typography';
import { ConfirmDialog } from 'src/components/UI/ConfirmDialog';

export interface ChatMessageDialogProps {
   open: boolean;
   handleClose: () => void;
   interlocutorDisplayName: string;
   handleAction: (b: boolean) => void;
}

export const ChatMessageDialog: FC<ChatMessageDialogProps> = ({ open, handleClose, interlocutorDisplayName, handleAction }) => {
   return (
      <ConfirmDialog
         open={open}
         handleClose={handleClose}
         title='Delete message'
         contentText='Are you sure you want to delete this message?'
         checkboxLabel={
            <Typography>
               Also delete for{' '}
               <Typography component='span' color='primary'>
                  {interlocutorDisplayName}
               </Typography>
            </Typography>
         }
         handleAction={handleAction}
      />
   );
};

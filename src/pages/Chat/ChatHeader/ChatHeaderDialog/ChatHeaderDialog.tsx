import React, { FC } from 'react';
import Typography from '@mui/material/Typography';
import { ConfirmDialog } from 'src/components/UI/ConfirmDialog';

export interface ChatHeaderDialogProps {
   open: boolean;
   handleClose: () => void;
   interlocutorDisplayName: string;
   handleAction: (b: boolean) => void;
}

export const ChatHeaderDialog: FC<ChatHeaderDialogProps> = ({ open, handleClose, interlocutorDisplayName, handleAction }) => {
   return (
      <ConfirmDialog
         open={open}
         handleClose={handleClose}
         title='Clear chat'
         contentText='Are you sure you want to clear this chat?'
         checkboxLabel={
            <Typography>
               Also clear for{' '}
               <Typography component='span' color='primary'>
                  {interlocutorDisplayName}
               </Typography>
            </Typography>
         }
         handleAction={handleAction}
      />
   );
};

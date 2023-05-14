import React, { FC, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import { IUser } from 'src/types/types';
import Stack from '@mui/material/Stack';

export interface ConfirmDialogProps {
   open: boolean;
   handleClose: () => void;
   title: string;
   contentText: string;
   checkboxLabel?: React.ReactNode;
   handleAction: (checked: boolean) => any;
}

export const ConfirmDialog: FC<ConfirmDialogProps> = ({ open, handleClose, title, contentText, checkboxLabel, handleAction }) => {
   const [checked, setChecked] = useState(false);

   const handleChange = () => {
      setChecked((prev) => !prev);
   };

   const handleConfirm = () => {
      handleClose();

      handleAction(checked);
   };

   return (
      <Dialog open={open} onClose={handleClose}>
         <DialogTitle>{title}</DialogTitle>
         <DialogContent>
            <DialogContentText>{contentText}</DialogContentText>
            {checkboxLabel && <FormControlLabel control={<Checkbox onChange={handleChange} checked={checked} />} label={checkboxLabel} />}
         </DialogContent>
         <DialogActions>
            <Button color='info' onClick={handleClose}>
               Cancel
            </Button>
            <Button color='error' onClick={handleConfirm}>
               Confirm
            </Button>
         </DialogActions>
      </Dialog>
   );
};

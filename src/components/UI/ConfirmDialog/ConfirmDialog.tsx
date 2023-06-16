import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControlLabel from '@mui/material/FormControlLabel';
import React, { FC, useState } from 'react';
import { Trans } from 'react-i18next';

interface Props {
   open: boolean;
   handleClose: () => void;
   title: string;
   contentText: string;
   checkboxLabel?: React.ReactNode;
   handleAction: (checked: boolean) => any;
}

export const ConfirmDialog: FC<Props> = ({ open, handleClose, title, contentText, checkboxLabel, handleAction }) => {
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
               <Trans>cancel</Trans>
            </Button>
            <Button color='error' onClick={handleConfirm}>
               <Trans>confirm</Trans>
            </Button>
         </DialogActions>
      </Dialog>
   );
};

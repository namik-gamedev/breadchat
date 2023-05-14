import { useState } from 'react';

export const useOpen = () => {
   const [open, setOpen] = useState(false);

   const handleShow = () => setOpen(true);
   const handleClose = () => setOpen(false);

   return { open, handleShow, handleClose };
};

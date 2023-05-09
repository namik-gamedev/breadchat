import { useState } from 'react';

export const useAnchorEl = <T extends HTMLElement>() => {
   const [anchorEl, setAnchorEl] = useState<T | null>(null);
   const open = !!anchorEl;

   const handleShow = (e: React.MouseEvent) => {
      setAnchorEl(e.target as T);
   };

   const handleClose = () => {
      setAnchorEl(null);
   };

   return { anchorEl, open, handleShow, handleClose };
};

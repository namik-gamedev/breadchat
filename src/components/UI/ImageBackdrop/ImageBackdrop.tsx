import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import { FC } from 'react';

interface Props {
   open: boolean;
   handleClose: () => void;
   imageURL: string | null | undefined;
}

export const ImageBackdrop: FC<Props> = ({ open, handleClose, imageURL }) => {
   return (
      <Backdrop sx={{ zIndex: 1100 }} open={open} onClick={handleClose}>
         <Box component='img' src={imageURL || ''} sx={{ maxHeight: 1, maxWidth: 1 }} />
      </Backdrop>
   );
};

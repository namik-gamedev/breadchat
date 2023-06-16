import { styled } from '@mui/material';
import Box from '@mui/material/Box';

export const StyledBox = styled(Box)(({ theme }) => ({
   // paddingBlock: theme.spacing(1),
   // paddingInline: theme.spacing(2),
   border: '1px solid',
   borderColor: theme.palette.divider,
   backgroundColor: theme.palette.background.paper,
   borderRadius: 10,
}));

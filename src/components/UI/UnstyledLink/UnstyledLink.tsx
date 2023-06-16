import { styled } from '@mui/material';
import { Link } from 'react-router-dom';

export interface UnstyledRrdLinkProps {}

export const UnstyledLink = styled(Link)(() => ({
   textDecoration: 'none',
   color: 'inherit',
}));

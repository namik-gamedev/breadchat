import { styled } from '@mui/material';
import React, { FC } from 'react';
import { Link, LinkProps } from 'react-router-dom';

export interface UnstyledRrdLinkProps {}

export const UnstyledLink = styled(Link)(() => ({
   textDecoration: 'none',
   color: 'inherit',
}));

import React, { FC } from 'react';
import Container, { ContainerProps } from '@mui/material/Container';
import { styled } from '@mui/material';

export const AppContainer = styled((props: ContainerProps) => <Container maxWidth='lg' {...props} />)();

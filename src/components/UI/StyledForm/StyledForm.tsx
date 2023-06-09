import React, { ElementType, FC } from 'react';
import Stack, { StackProps } from '@mui/material/Stack';
import { styled } from '@mui/material';

export const StyledForm = styled((props: StackProps<ElementType>) => <Stack component='form' autoComplete='off' spacing={2} {...props} />)();

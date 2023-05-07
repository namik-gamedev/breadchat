import React, { ElementType, FC } from 'react';
import Stack, { StackProps } from '@mui/material/Stack';
import { styled } from '@mui/material';

// TODO: AUTO COMPLETE = on IS TEMP, SET IT TO off
export const StyledForm = styled((props: StackProps<ElementType>) => <Stack component='form' autoComplete='on' spacing={2} {...props} />)();

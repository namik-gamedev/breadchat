import { styled } from '@mui/material';
import Stack, { StackProps } from '@mui/material/Stack';
import { ElementType } from 'react';

export const StyledForm = styled((props: StackProps<ElementType>) => <Stack component='form' autoComplete='off' spacing={2} {...props} />)();

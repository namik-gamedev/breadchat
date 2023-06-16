import Skeleton from '@mui/material/Skeleton';
import { FC } from 'react';

export const ChatFormSkeleton: FC = () => {
   return <Skeleton height={50} width={'100%'} variant='rounded' />;
};

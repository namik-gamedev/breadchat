import Skeleton from '@mui/material/Skeleton';
import { FC } from 'react';

export interface ChatFormSkeletonProps {}

export const ChatFormSkeleton: FC<ChatFormSkeletonProps> = ({}) => {
   return <Skeleton height={50} width={'100%'} variant='rounded' />;
};

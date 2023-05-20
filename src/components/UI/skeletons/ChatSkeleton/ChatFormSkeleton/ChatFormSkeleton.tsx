import React, { FC } from 'react';
import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';

export interface ChatFormSkeletonProps {}

export const ChatFormSkeleton: FC<ChatFormSkeletonProps> = ({}) => {
   return <Skeleton height={50} width={'100%'} variant='rounded' />;
};

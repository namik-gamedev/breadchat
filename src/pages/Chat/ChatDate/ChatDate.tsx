import React, { FC } from 'react';
import Typography, { TypographyProps } from '@mui/material/Typography';
import { styled } from '@mui/material';
import moment from 'moment';

export interface ChatDateProps extends TypographyProps {
   date: moment.Moment;
}

export const ChatDate = styled(({ date, ...props }: ChatDateProps) => {
   return <Typography {...props}>{date.format(date.year() === moment().year() ? 'DD MMM' : 'DD MMM YYYY')}</Typography>;
})(({ theme: { palette, spacing } }) => ({
   background: `linear-gradient(90deg, rgba(0,0,0,0) 25%, rgba(${palette.mode === 'dark' ? '255,255,255' : '0,0,0'},0.1) 50%, rgba(0,0,0,0) 75%)`,
   paddingBlock: spacing(0.2),
   textAlign: 'center',
}));
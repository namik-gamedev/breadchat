import { styled } from '@mui/material';
import Typography, { TypographyProps } from '@mui/material/Typography';
import moment from 'moment';

interface Props extends TypographyProps {
   date: moment.Moment;
}

export const ChatDate = styled(({ date, ...props }: Props) => {
   return <Typography {...props}>{date.format(date.year() === moment().year() ? 'DD MMM' : 'DD MMM YYYY')}</Typography>;
})(({ theme: { palette, spacing } }) => ({
   background: `linear-gradient(90deg, rgba(0,0,0,0) 25%, rgba(${palette.mode === 'dark' ? '255,255,255' : '0,0,0'},0.1) 50%, rgba(0,0,0,0) 75%)`,
   paddingBlock: spacing(0.2),
   textAlign: 'center',
}));

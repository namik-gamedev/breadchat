import { amber, blue, brown, deepOrange, red } from '@mui/material/colors';

export const getRandomAvatarColor = () => {
   const colorList = [blue, amber, red, deepOrange, brown];
   const a = colorList[Math.floor(Math.random() * colorList.length)];

   return a[600];
};

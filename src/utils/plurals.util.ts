export const plurals = (numbers: number, one: string, few: string, other: string) => {
   const n = String(numbers);
   if (n.endsWith('1') && n !== '11') {
      return `${n} ${one}`;
   }
   if (['2', '3', '4'].includes(n[n.length - 1]) && !['12', '13', '14'].includes(n)) {
      return `${n} ${few}`;
   }
   return `${n} ${other}`;
};

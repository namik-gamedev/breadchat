export const debounce = <Fn extends (...args: any) => any>(fn: Fn, ms: number) => {
   let timeout: number;

   const debounced = () => {
      const fnCall = (...args: Parameters<Fn>) => fn.apply(this, args);

      if (timeout) {
         clearTimeout(timeout);
      }

      timeout = setTimeout(fnCall, ms);
   };

   return debounced;
};

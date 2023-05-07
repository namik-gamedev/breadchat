import { useRef } from 'react';

export const useScroll = <T extends HTMLElement>(initialValue?: T) => {
   const ref = useRef<T>(initialValue as T);

   const scroll = () => {
      if (ref?.current) {
         const element = ref.current;
         element.scroll({
            top: element.scrollHeight,
            left: 0,
            behavior: 'smooth',
         });
      }
   };

   return { ref, scroll };
};

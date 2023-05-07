import { useAppSelector } from './useAppSelector';

export const useDataLoaded = () => {
   const dataLoad = useAppSelector((store) => store.global.dataLoad);

   return Object.values(dataLoad).every((l) => l);
};

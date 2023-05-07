import { useMemo } from 'react';
import { debounce } from 'src/utils/debounce.util';

export const useDebounce = <Fn extends (...args: any) => any>(fn: Fn, ms: number) => useMemo(() => debounce(fn, ms), []);

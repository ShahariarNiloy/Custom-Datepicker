import { useMemo } from 'react';

export const useSet = <T extends unknown>(iterator: T[]) => useMemo(
  () => new Set(iterator),
  [iterator],
);

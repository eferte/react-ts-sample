import { useState, useCallback } from "react";

/**
 *
 * Force Component redraw
 */
export const useRefresh = (): [() => void, number] => {
  const [count, setCount] = useState(0);
  const refresh = useCallback(() => {
    setCount((count) => {
      return count + 1;
    });
  }, []);

  return [refresh, count];
};

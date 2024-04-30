import { MutableRefObject, useEffect, useRef } from "react";

export const useTimeout = (condition, delay, callback) => {
  const timeoutRef: MutableRefObject<number> = useRef(null);
  const savedCallback: MutableRefObject<() => void> = useRef(callback);
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);
  useEffect(() => {
    const tick = () => savedCallback.current();
    if (typeof delay === "number" && condition) {
      timeoutRef.current = window.setTimeout(tick, delay);
      return () => window.clearTimeout(timeoutRef.current);
    }
  }, [delay, condition]);
  return timeoutRef;
};

import { useEffect, useState } from "react";

export default function useLocalStorage<T>(
  key: string,
  initialValue: T | (() => T)
) {
  const [value, setValue] = useState<T>(() => {
    const jsonVal = localStorage.getItem(key);
    if (jsonVal != null) return JSON.parse(jsonVal);

    if (typeof initialValue === "function") {
      return (initialValue as () => T)();
    } else {
      return initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));

     localStorage.removeItem(key)
  }, [key, value]);

  return [value, setValue] as [typeof value, typeof setValue];
}

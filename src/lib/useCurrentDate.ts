import { useEffect, useState } from "react";

export function useCurrentDate(): Date {
  const [today, setToday] = useState(() => new Date());

  useEffect(() => {
    let timeoutId: number;

    const scheduleNextMidnight = () => {
      const now = new Date();
      const nextMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
      timeoutId = window.setTimeout(() => {
        setToday(new Date());
        scheduleNextMidnight();
      }, Math.max(1, nextMidnight.getTime() - now.getTime()));
    };

    scheduleNextMidnight();
    return () => window.clearTimeout(timeoutId);
  }, []);

  return today;
}

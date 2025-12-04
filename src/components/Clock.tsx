"use client";
import { useEffect, useState } from "react";

export default function Clock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString());
    };

    update(); // primera actualización
    const interval = setInterval(update, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <span className="text-indigo-500 text-xl ">{time}</span>
  );
}

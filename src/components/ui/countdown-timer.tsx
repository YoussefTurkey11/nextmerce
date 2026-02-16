"use client";
import React, { useEffect, useRef, useState } from "react";
import { useAnimate } from "framer-motion";
import { useLocale } from "next-intl";

// Change this date to your target countdown date
const COUNTDOWN_FROM = "2026-10-01T00:00:00";

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

export default function ShiftingCountdown() {
  const locale = useLocale();
  return (
    <section className="flex items-center justify-center py-6 md:py-10">
      <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-4 gap-4 w-full max-w-5xl">
        <CountdownItem unit="Day" label={locale === "en" ? "Days" : "أيام"} />
        <CountdownItem
          unit="Hour"
          label={locale === "en" ? "Hours" : "ساعات"}
        />
        <CountdownItem
          unit="Minute"
          label={locale === "en" ? "Minutes" : "دقائق"}
        />
        <CountdownItem
          unit="Second"
          label={locale === "en" ? "Seconds" : "ثوانٍ"}
        />
      </div>
    </section>
  );
}

function CountdownItem({ unit, label }: { unit: string; label: string }) {
  const { ref, time } = useTimer(unit);
  // For seconds, ensure two digits (00–59)
  const display = unit === "Second" ? String(time).padStart(2, "0") : time;

  return (
    <div className="flex flex-col items-center gap-2 md:gap-3">
      {/* NUMBER BOX */}
      <div
        className="
        w-full
        max-w-[90px]
        sm:max-w-[110px]
        md:max-w-[130px]
        bg-background
        rounded-xl
        py-4 md:py-6
        text-center
        shadow-sm
      "
      >
        <span
          ref={ref}
          className="
            block
            font-bold
            text-2xl
            sm:text-3xl
            md:text-4xl
            lg:text-5xl
          "
        >
          {display}
        </span>
      </div>

      {/* LABEL */}
      <span
        className="
        text-xs
        sm:text-sm
        md:text-base
        text-muted-foreground
      "
      >
        {label}
      </span>
    </div>
  );
}

function useTimer(unit: string) {
  const [ref, animate] = useAnimate();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeRef = useRef(0);
  const [time, setTime] = useState(0);

  useEffect(() => {
    handleCountdown();
    intervalRef.current = setInterval(handleCountdown, 1000);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const handleCountdown = async () => {
    const end = new Date(COUNTDOWN_FROM);
    const now = new Date();
    const distance = end.getTime() - now.getTime();

    let newTime = 0;
    switch (unit) {
      case "Day":
        newTime = Math.max(0, Math.floor(distance / DAY));
        break;
      case "Hour":
        newTime = Math.max(0, Math.floor((distance % DAY) / HOUR));
        break;
      case "Minute":
        newTime = Math.max(0, Math.floor((distance % HOUR) / MINUTE));
        break;
      default:
        newTime = Math.max(0, Math.floor((distance % MINUTE) / SECOND));
    }

    if (newTime !== timeRef.current) {
      await animate(
        ref.current,
        { y: ["0%", "-50%"], opacity: [1, 0] },
        { duration: 0.35 },
      );

      timeRef.current = newTime;
      setTime(newTime);

      await animate(
        ref.current,
        { y: ["50%", "0%"], opacity: [0, 1] },
        { duration: 0.35 },
      );
    }
  };

  return { ref, time };
}

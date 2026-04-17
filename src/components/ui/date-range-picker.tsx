"use client";

import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";

interface DateRangePickerProps {
  startDate: string;
  endDate: string;
  onStartChange: (date: string) => void;
  onEndChange: (date: string) => void;
  hasError?: boolean;
}

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function daysBetween(start: string, end: string): number {
  if (!start || !end) return 0;
  const s = new Date(start + "T00:00:00");
  const e = new Date(end + "T00:00:00");
  return Math.max(0, Math.round((e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24)));
}

function toDateString(year: number, month: number, day: number): string {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export function DateRangePicker({
  startDate,
  endDate,
  onStartChange,
  onEndChange,
  hasError,
}: DateRangePickerProps) {
  const [open, setOpen] = useState(false);
  const [selecting, setSelecting] = useState<"start" | "end">("start");

  const today = new Date();
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [viewYear, setViewYear] = useState(today.getFullYear());

  const days = useMemo(() => {
    const firstDay = new Date(viewYear, viewMonth, 1).getDay();
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const cells: (number | null)[] = [];

    for (let i = 0; i < firstDay; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);

    return cells;
  }, [viewMonth, viewYear]);

  const todayStr = toDateString(today.getFullYear(), today.getMonth(), today.getDate());
  const duration = daysBetween(startDate, endDate);

  const handleDayClick = (day: number) => {
    const dateStr = toDateString(viewYear, viewMonth, day);
    if (dateStr < todayStr) return; // Can't select past dates

    if (selecting === "start") {
      onStartChange(dateStr);
      if (endDate && dateStr > endDate) onEndChange("");
      setSelecting("end");
    } else {
      if (dateStr < startDate) {
        onStartChange(dateStr);
        onEndChange("");
        setSelecting("end");
      } else {
        onEndChange(dateStr);
        setSelecting("start");
        setOpen(false);
      }
    }
  };

  const isInRange = (day: number): boolean => {
    if (!startDate || !endDate) return false;
    const dateStr = toDateString(viewYear, viewMonth, day);
    return dateStr > startDate && dateStr < endDate;
  };

  const isStart = (day: number): boolean => {
    return toDateString(viewYear, viewMonth, day) === startDate;
  };

  const isEnd = (day: number): boolean => {
    return toDateString(viewYear, viewMonth, day) === endDate;
  };

  const isPast = (day: number): boolean => {
    return toDateString(viewYear, viewMonth, day) < todayStr;
  };

  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(viewYear - 1);
    } else {
      setViewMonth(viewMonth - 1);
    }
  };

  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(viewYear + 1);
    } else {
      setViewMonth(viewMonth + 1);
    }
  };

  const monthName = new Date(viewYear, viewMonth).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="relative">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={cn(
          "flex w-full items-center gap-3 rounded-lg border px-4 py-3 text-left transition-colors",
          hasError ? "border-red-300" : "border-neutral-200",
          "hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gov-500"
        )}
      >
        <Calendar className="h-5 w-5 text-neutral-400" />
        <div className="flex-1">
          {startDate && endDate ? (
            <div className="flex items-center gap-2">
              <span className="font-medium text-neutral-900">{formatDate(startDate)}</span>
              <span className="text-neutral-400">→</span>
              <span className="font-medium text-neutral-900">{formatDate(endDate)}</span>
              <span className="ml-auto rounded-full bg-gov-100 px-2 py-0.5 text-xs font-semibold text-gov-700">
                {duration} days
              </span>
            </div>
          ) : startDate ? (
            <div className="flex items-center gap-2">
              <span className="font-medium text-neutral-900">{formatDate(startDate)}</span>
              <span className="text-neutral-400">→</span>
              <span className="text-neutral-400">Select exit date</span>
            </div>
          ) : (
            <span className="text-neutral-400">Select travel dates</span>
          )}
        </div>
      </button>

      {/* Calendar dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 mt-2 w-full rounded-xl border border-neutral-200 bg-white p-4 shadow-xl sm:w-[340px]"
          >
            {/* Month navigation */}
            <div className="mb-3 flex items-center justify-between">
              <button
                type="button"
                onClick={prevMonth}
                className="rounded-lg p-1.5 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="text-sm font-semibold text-neutral-900">{monthName}</span>
              <button
                type="button"
                onClick={nextMonth}
                className="rounded-lg p-1.5 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            {/* Selection hint */}
            <p className="mb-3 text-center text-xs text-neutral-400">
              {selecting === "start" ? "Select entry date" : "Select exit date"}
            </p>

            {/* Day headers */}
            <div className="mb-1 grid grid-cols-7 text-center text-xs font-medium text-neutral-400">
              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
                <div key={d} className="py-1">{d}</div>
              ))}
            </div>

            {/* Days grid */}
            <div className="grid grid-cols-7">
              {days.map((day, i) =>
                day === null ? (
                  <div key={`empty-${i}`} />
                ) : (
                  <button
                    key={day}
                    type="button"
                    disabled={isPast(day)}
                    onClick={() => handleDayClick(day)}
                    className={cn(
                      "h-9 w-full text-sm transition-colors",
                      isPast(day) && "text-neutral-300 cursor-not-allowed",
                      !isPast(day) && !isStart(day) && !isEnd(day) && !isInRange(day) &&
                        "text-neutral-700 hover:bg-neutral-100 rounded-lg",
                      isStart(day) && "bg-gov-500 text-white rounded-l-lg font-semibold",
                      isEnd(day) && "bg-gov-500 text-white rounded-r-lg font-semibold",
                      isInRange(day) && "bg-gov-100 text-gov-700",
                    )}
                  >
                    {day}
                  </button>
                )
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

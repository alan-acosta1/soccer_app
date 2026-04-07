import { useState } from "react";

function DateStrip({ selectedDate, onDateChange }) {
  const today = new Date();

  const dates = Array.from({ length: 11 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - 5 + i);
    return d;
  });

  const fmt = (d) => d.toISOString().split("T")[0];

  const dayLabel = (d) => {
    const diff = Math.round((d - today) / 86400000);
    if (diff === -1) return "Yesterday";
    if (diff === 0) return "Today";
    if (diff === 1) return "Tomorrow";
    return d.toLocaleDateString("en-US", { weekday: "short" });
  };

  return (
    <div className="bg-[#161c2a] border-b border-[#2d3a50]">
      <div className="flex overflow-x-auto scrollbar-hide px-2 gap-1 py-2">
        {dates.map((d) => {
          const iso = fmt(d);
          const isSelected = iso === selectedDate;
          const diff = Math.round((d - today) / 86400000);
          const isToday = diff === 0;

          return (
            <button
              key={iso}
              onClick={() => onDateChange(iso)}
              className={`flex flex-col items-center min-w-[52px] px-2 py-1.5 rounded text-xs font-medium transition-colors ${
                isSelected
                  ? "bg-[#e33831] text-white"
                  : "text-[#8a9bb5] hover:text-white hover:bg-[#1e2535]"
              }`}
            >
              <span className={`text-[10px] uppercase tracking-wide ${isSelected ? "text-white/80" : "text-[#4a5a70]"}`}>
                {dayLabel(d)}
              </span>
              <span className="text-sm font-bold leading-tight">
                {d.getDate()}
              </span>
              <span className={`text-[10px] ${isSelected ? "text-white/70" : "text-[#4a5a70]"}`}>
                {d.toLocaleDateString("en-US", { month: "short" })}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default DateStrip;

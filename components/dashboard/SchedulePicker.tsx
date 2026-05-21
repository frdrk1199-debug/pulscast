"use client";

import { DeliveryDay } from "@/lib/types";

const DAYS: { id: DeliveryDay; label: string; short: string }[] = [
  { id: "mon", label: "Monday", short: "Mon" },
  { id: "tue", label: "Tuesday", short: "Tue" },
  { id: "wed", label: "Wednesday", short: "Wed" },
  { id: "thu", label: "Thursday", short: "Thu" },
  { id: "fri", label: "Friday", short: "Fri" },
  { id: "sat", label: "Saturday", short: "Sat" },
  { id: "sun", label: "Sunday", short: "Sun" },
];

interface SchedulePickerProps {
  days: DeliveryDay[];
  time: string;
  onDaysChange: (days: DeliveryDay[]) => void;
  onTimeChange: (time: string) => void;
}

export default function SchedulePicker({
  days,
  time,
  onDaysChange,
  onTimeChange,
}: SchedulePickerProps) {
  function toggleDay(id: DeliveryDay) {
    if (days.includes(id)) {
      onDaysChange(days.filter((d) => d !== id));
    } else {
      onDaysChange([...days, id]);
    }
  }

  return (
    <div>
      <div className="mb-4">
        <h2 className="font-semibold text-white">Delivery schedule</h2>
        <p className="text-xs text-gray-500 mt-0.5">
          Choose when to receive your briefing
        </p>
      </div>

      <div className="space-y-5">
        {/* Day selector */}
        <div>
          <p className="text-xs text-gray-400 mb-2.5 font-medium uppercase tracking-wider">
            Days
          </p>
          <div className="flex gap-2 flex-wrap">
            {DAYS.map((day) => {
              const active = days.includes(day.id);
              return (
                <button
                  key={day.id}
                  onClick={() => toggleDay(day.id)}
                  title={day.label}
                  className={`
                    px-3.5 py-2 rounded-xl text-sm font-medium border transition-all duration-200
                    ${
                      active
                        ? "bg-purple-600/20 border-purple-500/50 text-purple-200"
                        : "bg-white/3 border-white/8 text-gray-400 hover:border-white/20 hover:text-gray-200"
                    }
                  `}
                >
                  {day.short}
                </button>
              );
            })}
          </div>
        </div>

        {/* Time selector */}
        <div>
          <p className="text-xs text-gray-400 mb-2.5 font-medium uppercase tracking-wider">
            Delivery time
          </p>
          <div className="flex items-center gap-3">
            <input
              type="time"
              value={time}
              onChange={(e) => onTimeChange(e.target.value)}
              className="
                px-4 py-2.5 rounded-xl bg-white/6 border border-white/10 hover:border-white/20
                text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500
                focus:border-transparent transition-all duration-200
                [color-scheme:dark]
              "
            />
            <p className="text-xs text-gray-500">Your local time</p>
          </div>
        </div>
      </div>

      {days.length === 0 && (
        <p className="text-xs text-amber-400/80 mt-3">
          Select at least one delivery day.
        </p>
      )}
    </div>
  );
}

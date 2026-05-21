"use client";

import { Topic } from "@/lib/types";

const TOPICS: { id: Topic; label: string; emoji: string }[] = [
  { id: "tech", label: "Technology", emoji: "💻" },
  { id: "science", label: "Science", emoji: "🔬" },
  { id: "business", label: "Business", emoji: "📈" },
  { id: "politics", label: "Politics", emoji: "🏛️" },
  { id: "sports", label: "Sports", emoji: "⚽" },
  { id: "health", label: "Health", emoji: "🏥" },
  { id: "ai", label: "Artificial Intelligence", emoji: "🤖" },
  { id: "climate", label: "Climate", emoji: "🌍" },
];

interface TopicPickerProps {
  selected: Topic[];
  onChange: (topics: Topic[]) => void;
}

export default function TopicPicker({ selected, onChange }: TopicPickerProps) {
  function toggle(id: Topic) {
    if (selected.includes(id)) {
      onChange(selected.filter((t) => t !== id));
    } else {
      onChange([...selected, id]);
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="font-semibold text-white">Topics</h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Pick what you want to hear about
          </p>
        </div>
        <span className="text-xs text-gray-500">
          {selected.length} / {TOPICS.length} selected
        </span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {TOPICS.map((topic) => {
          const active = selected.includes(topic.id);
          return (
            <button
              key={topic.id}
              onClick={() => toggle(topic.id)}
              className={`
                flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium
                border transition-all duration-200 cursor-pointer text-left
                ${
                  active
                    ? "bg-purple-600/20 border-purple-500/50 text-purple-200"
                    : "bg-white/3 border-white/8 text-gray-400 hover:border-white/20 hover:text-gray-200"
                }
              `}
            >
              <span className="text-base leading-none">{topic.emoji}</span>
              <span className="truncate">{topic.label}</span>
              {active && (
                <svg
                  className="w-3.5 h-3.5 ml-auto shrink-0 text-purple-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </button>
          );
        })}
      </div>
      {selected.length === 0 && (
        <p className="text-xs text-amber-400/80 mt-3">
          Select at least one topic to receive your podcast.
        </p>
      )}
    </div>
  );
}

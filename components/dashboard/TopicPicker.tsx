"use client";

import { useState, useRef } from "react";

const PRESET_TOPICS: { id: string; label: string; emoji: string }[] = [
  { id: "tech", label: "Technology", emoji: "💻" },
  { id: "science", label: "Science", emoji: "🔬" },
  { id: "business", label: "Business", emoji: "📈" },
  { id: "politics", label: "Politics", emoji: "🏛️" },
  { id: "sports", label: "Sports", emoji: "⚽" },
  { id: "health", label: "Health", emoji: "🏥" },
  { id: "ai", label: "Artificial Intelligence", emoji: "🤖" },
  { id: "climate", label: "Climate", emoji: "🌍" },
];

const PRESET_IDS = new Set(PRESET_TOPICS.map((t) => t.id));

interface TopicPickerProps {
  selected: string[];
  onChange: (topics: string[]) => void;
}

export default function TopicPicker({ selected, onChange }: TopicPickerProps) {
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const customTopics = selected.filter((t) => !PRESET_IDS.has(t));
  const totalSelected = selected.length;

  function togglePreset(id: string) {
    if (selected.includes(id)) {
      onChange(selected.filter((t) => t !== id));
    } else {
      onChange([...selected, id]);
    }
  }

  function addCustom() {
    const value = input.trim().toLowerCase();
    if (!value || selected.includes(value)) {
      setInput("");
      return;
    }
    onChange([...selected, value]);
    setInput("");
    inputRef.current?.focus();
  }

  function removeCustom(topic: string) {
    onChange(selected.filter((t) => t !== topic));
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      addCustom();
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
        <span className="text-xs text-gray-500">{totalSelected} selected</span>
      </div>

      {/* Preset topic chips */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {PRESET_TOPICS.map((topic) => {
          const active = selected.includes(topic.id);
          return (
            <button
              key={topic.id}
              onClick={() => togglePreset(topic.id)}
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
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
          );
        })}
      </div>

      {/* Custom topic input */}
      <div className="mt-5 pt-5 border-t border-white/6">
        <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-3">
          Custom topics
        </p>

        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="e.g. space exploration, Formula 1…"
            maxLength={40}
            className="
              flex-1 px-4 py-2.5 rounded-xl text-sm text-white placeholder-gray-500
              bg-white/6 border border-white/10 hover:border-white/20
              focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
              transition-all duration-200
            "
          />
          <button
            onClick={addCustom}
            disabled={!input.trim()}
            aria-label="Add custom topic"
            className="
              w-10 h-10 shrink-0 flex items-center justify-center rounded-xl
              bg-purple-600 hover:bg-purple-500 active:bg-purple-700
              disabled:opacity-30 disabled:cursor-not-allowed
              transition-all duration-200
            "
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="w-4 h-4 text-white"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>

        {/* Custom topic chips */}
        {customTopics.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {customTopics.map((topic) => (
              <span
                key={topic}
                className="
                  inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium
                  bg-purple-600/20 border border-purple-500/50 text-purple-200
                "
              >
                <span className="capitalize">{topic}</span>
                <button
                  onClick={() => removeCustom(topic)}
                  aria-label={`Remove ${topic}`}
                  className="ml-0.5 rounded-full hover:text-white transition-colors"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="w-3.5 h-3.5"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            ))}
          </div>
        )}

        {customTopics.length === 0 && (
          <p className="text-xs text-gray-600 mt-2">
            Add any topic not listed above — we&apos;ll source news for it.
          </p>
        )}
      </div>

      {totalSelected === 0 && (
        <p className="text-xs text-amber-400/80 mt-3">
          Select at least one topic to receive your podcast.
        </p>
      )}
    </div>
  );
}

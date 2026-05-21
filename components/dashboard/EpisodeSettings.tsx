"use client";

import { EpisodeLength, VoiceStyle } from "@/lib/types";

const LENGTHS: { id: EpisodeLength; label: string; duration: string; desc: string }[] = [
  { id: "short", label: "Short", duration: "~5 min", desc: "Top 3–5 headlines" },
  { id: "medium", label: "Medium", duration: "~12 min", desc: "Full briefing" },
  { id: "long", label: "Long", duration: "~25 min", desc: "Deep dive" },
];

const VOICES: { id: VoiceStyle; label: string; desc: string; emoji: string }[] = [
  { id: "formal", label: "Formal", desc: "Professional broadcast tone", emoji: "📰" },
  { id: "casual", label: "Casual", desc: "Like a friend catching you up", emoji: "☕" },
  { id: "storytelling", label: "Storytelling", desc: "Narrative, engaging style", emoji: "🎭" },
];

interface EpisodeSettingsProps {
  length: EpisodeLength;
  voice: VoiceStyle;
  onLengthChange: (l: EpisodeLength) => void;
  onVoiceChange: (v: VoiceStyle) => void;
}

export default function EpisodeSettings({
  length,
  voice,
  onLengthChange,
  onVoiceChange,
}: EpisodeSettingsProps) {
  return (
    <div>
      <div className="mb-4">
        <h2 className="font-semibold text-white">Episode style</h2>
        <p className="text-xs text-gray-500 mt-0.5">
          Customize how your podcast feels
        </p>
      </div>

      <div className="space-y-6">
        {/* Length */}
        <div>
          <p className="text-xs text-gray-400 mb-2.5 font-medium uppercase tracking-wider">
            Episode length
          </p>
          <div className="grid grid-cols-3 gap-2.5">
            {LENGTHS.map((l) => (
              <button
                key={l.id}
                onClick={() => onLengthChange(l.id)}
                className={`
                  flex flex-col items-center gap-1 p-3.5 rounded-xl border text-center
                  transition-all duration-200
                  ${
                    length === l.id
                      ? "bg-purple-600/20 border-purple-500/50 text-purple-200"
                      : "bg-white/3 border-white/8 text-gray-400 hover:border-white/20 hover:text-gray-200"
                  }
                `}
              >
                <span className="text-sm font-semibold">{l.label}</span>
                <span
                  className={`text-xs ${
                    length === l.id ? "text-purple-300" : "text-gray-500"
                  }`}
                >
                  {l.duration}
                </span>
                <span className="text-xs text-gray-600 hidden sm:block">
                  {l.desc}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Voice style */}
        <div>
          <p className="text-xs text-gray-400 mb-2.5 font-medium uppercase tracking-wider">
            Voice style
          </p>
          <div className="flex flex-col gap-2">
            {VOICES.map((v) => (
              <button
                key={v.id}
                onClick={() => onVoiceChange(v.id)}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl border text-left
                  transition-all duration-200
                  ${
                    voice === v.id
                      ? "bg-purple-600/20 border-purple-500/50"
                      : "bg-white/3 border-white/8 hover:border-white/20"
                  }
                `}
              >
                <span className="text-xl">{v.emoji}</span>
                <div>
                  <p
                    className={`text-sm font-medium ${
                      voice === v.id ? "text-purple-200" : "text-gray-300"
                    }`}
                  >
                    {v.label}
                  </p>
                  <p className="text-xs text-gray-500">{v.desc}</p>
                </div>
                {voice === v.id && (
                  <svg
                    className="w-4 h-4 ml-auto text-purple-400 shrink-0"
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
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

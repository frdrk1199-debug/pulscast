"use client";

import { Episode } from "@/lib/types";

function formatDuration(seconds: number | null): string {
  if (!seconds) return "—";
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

const STATUS_COLORS: Record<string, string> = {
  delivered: "bg-green-500/15 text-green-400 border-green-500/20",
  generating: "bg-yellow-500/15 text-yellow-400 border-yellow-500/20",
  pending: "bg-gray-500/15 text-gray-400 border-gray-500/20",
  failed: "bg-red-500/15 text-red-400 border-red-500/20",
};

interface EpisodeListProps {
  episodes: Episode[];
  nextEpisodeAt: string | null;
}

export default function EpisodeList({ episodes, nextEpisodeAt }: EpisodeListProps) {
  return (
    <div>
      {/* Next episode card */}
      <div className="mb-6">
        <h2 className="font-semibold text-white mb-3">Next episode</h2>
        <div className="bg-purple-600/10 border border-purple-500/20 rounded-xl p-4 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-purple-600/30 flex items-center justify-center shrink-0">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="w-5 h-5 text-purple-300"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div>
            <p className="text-sm font-medium text-purple-200">
              {nextEpisodeAt
                ? formatDate(nextEpisodeAt)
                : "Set your schedule to get started"}
            </p>
            <p className="text-xs text-gray-500 mt-0.5">
              {nextEpisodeAt
                ? "Delivered to your WhatsApp"
                : "Pick topics and delivery days above"}
            </p>
          </div>
        </div>
      </div>

      {/* Episode history */}
      <div>
        <h2 className="font-semibold text-white mb-3">Episode history</h2>
        {episodes.length === 0 ? (
          <div className="bg-white/2 border border-white/6 rounded-xl p-8 text-center">
            <p className="text-2xl mb-2">🎙️</p>
            <p className="text-sm text-gray-400">
              Your episodes will appear here once delivered.
            </p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {episodes.map((ep) => (
              <div
                key={ep.id}
                className="bg-white/3 border border-white/6 rounded-xl p-4 flex items-center gap-4 hover:border-white/10 transition-all duration-200"
              >
                <div className="w-9 h-9 rounded-lg bg-white/6 flex items-center justify-center shrink-0 text-base">
                  🎙️
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-200 truncate">
                    {ep.title || "Untitled episode"}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {ep.delivered_at
                      ? formatDate(ep.delivered_at)
                      : formatDate(ep.created_at)}
                    {ep.duration_seconds
                      ? ` · ${formatDuration(ep.duration_seconds)}`
                      : ""}
                  </p>
                </div>
                <span
                  className={`shrink-0 px-2.5 py-0.5 rounded-full text-xs font-medium border capitalize ${
                    STATUS_COLORS[ep.status] || STATUS_COLORS.pending
                  }`}
                >
                  {ep.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

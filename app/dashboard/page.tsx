"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase";
import TopicPicker from "@/components/dashboard/TopicPicker";
import SchedulePicker from "@/components/dashboard/SchedulePicker";
import EpisodeSettings from "@/components/dashboard/EpisodeSettings";
import EpisodeList from "@/components/dashboard/EpisodeList";
import Button from "@/components/ui/Button";
import type { EpisodeLength, VoiceStyle, DeliveryDay, Episode, UserPreferences } from "@/lib/types";

type SaveStatus = "idle" | "saving" | "saved" | "error";

export default function DashboardPage() {
  const router = useRouter();

  const [userId, setUserId] = useState<string | null>(null);
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [episodes, setEpisodes] = useState<Episode[]>([]);

  // Preferences state
  const [topics, setTopics] = useState<string[]>(["tech", "ai"]);
  const [days, setDays] = useState<DeliveryDay[]>(["mon", "wed", "fri"]);
  const [time, setTime] = useState("08:00");
  const [episodeLength, setEpisodeLength] = useState<EpisodeLength>("medium");
  const [voiceStyle, setVoiceStyle] = useState<VoiceStyle>("casual");

  const loadData = useCallback(async () => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      router.replace("/login");
      return;
    }

    setUserId(user.id);
    setEmail(user.email ?? "");

    // Load preferences
    const { data: prefs } = await supabase
      .from("user_preferences")
      .select("*")
      .eq("user_id", user.id)
      .single<UserPreferences>();

    if (prefs) {
      setTopics((prefs.topics as string[]) || []);
      setDays((prefs.delivery_days as DeliveryDay[]) || []);
      setTime(prefs.delivery_time?.slice(0, 5) ?? "08:00");
      setEpisodeLength(prefs.episode_length as EpisodeLength);
      setVoiceStyle(prefs.voice_style as VoiceStyle);
    }

    // Load episodes
    const { data: eps } = await supabase
      .from("episodes")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(20);

    if (eps) setEpisodes(eps as Episode[]);

    setLoading(false);
  }, [router]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  async function handleSave() {
    if (!userId) return;
    setSaveStatus("saving");
    const supabase = createClient();

    const payload = {
      user_id: userId,
      topics,
      delivery_days: days,
      delivery_time: `${time}:00`,
      episode_length: episodeLength,
      voice_style: voiceStyle,
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase
      .from("user_preferences")
      .upsert(payload, { onConflict: "user_id" });

    if (error) {
      setSaveStatus("error");
      setTimeout(() => setSaveStatus("idle"), 3000);
    } else {
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 2500);
    }
  }

  async function handleSignOut() {
    await createClient().auth.signOut();
    router.push("/");
  }

  // Calculate next episode time
  const nextEpisodeAt = (() => {
    if (days.length === 0) return null;
    const dayMap: Record<DeliveryDay, number> = {
      sun: 0, mon: 1, tue: 2, wed: 3, thu: 4, fri: 5, sat: 6,
    };
    const now = new Date();
    const [h, m] = time.split(":").map(Number);
    const sortedDays = [...days].sort((a, b) => dayMap[a] - dayMap[b]);

    for (let offset = 0; offset <= 7; offset++) {
      const candidate = new Date(now);
      candidate.setDate(now.getDate() + offset);
      candidate.setHours(h, m, 0, 0);
      const dayName = Object.keys(dayMap).find(
        (k) => dayMap[k as DeliveryDay] === candidate.getDay()
      ) as DeliveryDay | undefined;
      if (dayName && sortedDays.includes(dayName) && candidate > now) {
        return candidate.toISOString();
      }
    }
    return null;
  })();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 rounded-full border-2 border-purple-500 border-t-transparent animate-spin" />
          <p className="text-sm text-gray-500">Loading your dashboard…</p>
        </div>
      </div>
    );
  }

  const saveLabel =
    saveStatus === "saving"
      ? "Saving…"
      : saveStatus === "saved"
      ? "Saved ✓"
      : saveStatus === "error"
      ? "Error — try again"
      : "Save preferences";

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Sidebar + main layout */}
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="hidden lg:flex flex-col w-64 shrink-0 border-r border-white/5 bg-white/1 p-6">
          <Link href="/" className="flex items-center gap-2 mb-10">
            <div className="w-7 h-7 rounded-lg bg-purple-600 flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="w-4 h-4 text-white"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                />
              </svg>
            </div>
            <span className="font-bold text-sm">Pulscast</span>
          </Link>

          <nav className="space-y-1 flex-1">
            {[
              { label: "Dashboard", icon: "⚡", active: true },
              { label: "Episodes", icon: "🎙️", active: false },
              { label: "Settings", icon: "⚙️", active: false },
            ].map((item) => (
              <button
                key={item.label}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  item.active
                    ? "bg-purple-600/20 text-purple-200"
                    : "text-gray-500 hover:text-gray-300 hover:bg-white/5"
                }`}
              >
                <span>{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>

          {/* User section */}
          <div className="border-t border-white/5 pt-5 mt-auto">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-full bg-purple-600/30 flex items-center justify-center text-xs font-bold text-purple-300">
                {email.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium text-gray-300 truncate">
                  {email}
                </p>
                <p className="text-xs text-gray-600">Free trial</p>
              </div>
            </div>
            <button
              onClick={handleSignOut}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-gray-500 hover:text-gray-300 hover:bg-white/5 transition-all duration-200"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="w-3.5 h-3.5"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              Sign out
            </button>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-auto">
          {/* Mobile header */}
          <div className="lg:hidden flex items-center justify-between px-5 py-4 border-b border-white/5 sticky top-0 bg-[#0a0a0f]/90 backdrop-blur-md z-10">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-purple-600 flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="w-4 h-4 text-white"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                  />
                </svg>
              </div>
              <span className="font-bold text-sm">Pulscast</span>
            </Link>
            <button
              onClick={handleSignOut}
              className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
            >
              Sign out
            </button>
          </div>

          <div className="max-w-3xl mx-auto px-5 sm:px-8 py-8">
            {/* Header */}
            <div className="flex items-start justify-between mb-8 gap-4 flex-wrap">
              <div>
                <h1 className="text-2xl font-bold text-white">My dashboard</h1>
                <p className="text-sm text-gray-400 mt-1">
                  Customize your daily podcast experience
                </p>
              </div>
              <Button
                onClick={handleSave}
                loading={saveStatus === "saving"}
                variant={saveStatus === "saved" ? "secondary" : "primary"}
                disabled={saveStatus === "saving" || topics.length === 0 || days.length === 0}
              >
                {saveLabel}
              </Button>
            </div>

            {/* Sections */}
            <div className="space-y-8">
              {/* Topics */}
              <section className="bg-white/3 border border-white/6 rounded-2xl p-6">
                <TopicPicker selected={topics} onChange={setTopics} />
              </section>

              {/* Schedule */}
              <section className="bg-white/3 border border-white/6 rounded-2xl p-6">
                <SchedulePicker
                  days={days}
                  time={time}
                  onDaysChange={setDays}
                  onTimeChange={setTime}
                />
              </section>

              {/* Episode style */}
              <section className="bg-white/3 border border-white/6 rounded-2xl p-6">
                <EpisodeSettings
                  length={episodeLength}
                  voice={voiceStyle}
                  onLengthChange={setEpisodeLength}
                  onVoiceChange={setVoiceStyle}
                />
              </section>

              {/* Episodes */}
              <section className="bg-white/3 border border-white/6 rounded-2xl p-6">
                <EpisodeList episodes={episodes} nextEpisodeAt={nextEpisodeAt} />
              </section>
            </div>

            {/* Save reminder */}
            {(topics.length > 0 || days.length > 0) && (
              <div className="mt-8 flex justify-end">
                <Button
                  onClick={handleSave}
                  loading={saveStatus === "saving"}
                  variant={saveStatus === "saved" ? "secondary" : "primary"}
                  disabled={saveStatus === "saving" || topics.length === 0 || days.length === 0}
                >
                  {saveLabel}
                </Button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

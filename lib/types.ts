export type Topic =
  | "tech"
  | "science"
  | "business"
  | "politics"
  | "sports"
  | "health"
  | "ai"
  | "climate";

export type EpisodeLength = "short" | "medium" | "long";
export type VoiceStyle = "formal" | "casual" | "storytelling";
export type DeliveryDay =
  | "mon"
  | "tue"
  | "wed"
  | "thu"
  | "fri"
  | "sat"
  | "sun";
export type EpisodeStatus = "pending" | "generating" | "delivered" | "failed";

export interface Profile {
  id: string;
  email: string;
  whatsapp_number: string | null;
  created_at: string;
}

export interface UserPreferences {
  id: string;
  user_id: string;
  topics: Topic[];
  episode_length: EpisodeLength;
  voice_style: VoiceStyle;
  delivery_days: DeliveryDay[];
  delivery_time: string;
  timezone: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Episode {
  id: string;
  user_id: string;
  title: string | null;
  duration_seconds: number | null;
  topics: Topic[];
  audio_url: string | null;
  status: EpisodeStatus;
  scheduled_at: string | null;
  delivered_at: string | null;
  created_at: string;
}

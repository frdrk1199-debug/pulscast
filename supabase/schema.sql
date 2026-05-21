-- ============================================================
-- Pulscast — Supabase Database Schema
-- Run this in the Supabase SQL editor to set up all tables.
-- ============================================================

-- Enable UUID extension (usually already enabled)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================
-- PROFILES
-- Extends auth.users with app-specific fields.
-- ============================================================
CREATE TABLE public.profiles (
  id            UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email         TEXT NOT NULL,
  whatsapp_number TEXT,
  created_at    TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Auto-create a profile row when a new user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- ============================================================
-- USER PREFERENCES
-- Stores topic selection, schedule, episode settings.
-- ============================================================
CREATE TABLE public.user_preferences (
  id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id         UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  topics          TEXT[]   DEFAULT '{}' NOT NULL,
  episode_length  TEXT     DEFAULT 'medium' NOT NULL
                    CHECK (episode_length IN ('short', 'medium', 'long')),
  voice_style     TEXT     DEFAULT 'casual' NOT NULL
                    CHECK (voice_style IN ('formal', 'casual', 'storytelling')),
  delivery_days   TEXT[]   DEFAULT '{"mon","wed","fri"}' NOT NULL,
  delivery_time   TIME     DEFAULT '08:00:00' NOT NULL,
  timezone        TEXT     DEFAULT 'UTC' NOT NULL,
  is_active       BOOLEAN  DEFAULT TRUE NOT NULL,
  created_at      TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at      TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  UNIQUE (user_id)
);

ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own preferences"
  ON public.user_preferences FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own preferences"
  ON public.user_preferences FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own preferences"
  ON public.user_preferences FOR UPDATE
  USING (auth.uid() = user_id);

-- Auto-update updated_at on row change
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_preferences_updated_at
  BEFORE UPDATE ON public.user_preferences
  FOR EACH ROW EXECUTE PROCEDURE public.set_updated_at();

-- ============================================================
-- EPISODES
-- Tracks generated podcast episodes per user.
-- ============================================================
CREATE TABLE public.episodes (
  id               UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id          UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  title            TEXT,
  duration_seconds INTEGER,
  topics           TEXT[] DEFAULT '{}' NOT NULL,
  audio_url        TEXT,
  status           TEXT DEFAULT 'pending' NOT NULL
                     CHECK (status IN ('pending', 'generating', 'delivered', 'failed')),
  scheduled_at     TIMESTAMPTZ,
  delivered_at     TIMESTAMPTZ,
  created_at       TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

ALTER TABLE public.episodes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own episodes"
  ON public.episodes FOR SELECT
  USING (auth.uid() = user_id);

-- Service role can insert/update episodes (done by backend workers)
CREATE POLICY "Service role can manage episodes"
  ON public.episodes FOR ALL
  USING (auth.role() = 'service_role');

-- Index for common query: fetch user's episodes sorted by date
CREATE INDEX idx_episodes_user_created ON public.episodes (user_id, created_at DESC);
CREATE INDEX idx_episodes_status ON public.episodes (status);

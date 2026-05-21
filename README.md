# Pulscast

**AI-powered personalized news podcast delivered via WhatsApp.**

Pick your topics, set your schedule, and get a spoken briefing delivered to your WhatsApp every morning.

---

## Features

- Landing page with hero, features, and pricing ($9/month)
- Sign up / login with Supabase Auth
- Dashboard to configure:
  - Topics (tech, science, business, politics, sports, health, AI, climate)
  - Delivery schedule (days of week + time)
  - Episode length (short / medium / long)
  - Voice style (formal / casual / storytelling)
- Episode history and next-episode preview

---

## Tech stack

- **Next.js 14** (App Router, TypeScript)
- **Tailwind CSS** (dark purple theme)
- **Supabase** (Auth + PostgreSQL database)

---

## Setup

### 1. Clone and install

```bash
git clone <your-repo>
cd pulscast
npm install
```

### 2. Create a Supabase project

1. Go to [supabase.com](https://supabase.com) and create a free project.
2. In **Project Settings → API**, copy:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY`

### 3. Configure environment variables

```bash
cp .env.example .env.local
```

Edit `.env.local` and paste your Supabase credentials.

### 4. Set up the database

In the Supabase dashboard, go to **SQL Editor** and run the contents of:

```
supabase/schema.sql
```

This creates:
- `profiles` table (linked to `auth.users`)
- `user_preferences` table (topics, schedule, episode settings)
- `episodes` table (episode history)
- Row-level security policies for all tables
- Auto-create profile trigger on signup

### 5. Enable Email Auth in Supabase

Go to **Authentication → Providers → Email** and make sure it's enabled.

For local development you can disable "Confirm email" to skip the verification step.

### 6. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Environment variables

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon/public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (server-only) |

---

## Project structure

```
pulscast/
├── app/
│   ├── page.tsx              # Landing page
│   ├── signup/page.tsx       # Sign up
│   ├── login/page.tsx        # Log in
│   └── dashboard/page.tsx    # Main dashboard
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   └── Input.tsx
│   ├── landing/
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── Features.tsx
│   │   ├── Pricing.tsx
│   │   └── Footer.tsx
│   └── dashboard/
│       ├── TopicPicker.tsx
│       ├── SchedulePicker.tsx
│       ├── EpisodeSettings.tsx
│       └── EpisodeList.tsx
├── lib/
│   ├── supabase.ts           # Browser Supabase client
│   ├── supabase-server.ts    # Server Supabase client
│   └── types.ts              # Shared TypeScript types
├── supabase/
│   └── schema.sql            # Database schema
└── .env.example
```

---

## Deployment (Vercel)

1. Push to GitHub.
2. Import the repo at [vercel.com](https://vercel.com).
3. Add all three environment variables in **Settings → Environment Variables**.
4. Deploy.

---

## Extending with AI podcast generation

The backend worker that generates and delivers episodes is out of scope here. To complete the product:

1. Add a `POST /api/generate-episode` route that:
   - Fetches news via NewsAPI or GNews
   - Scripts the episode with Claude or GPT-4
   - Generates audio via ElevenLabs or OpenAI TTS
   - Uploads the audio to Supabase Storage
   - Sends the WhatsApp message via Twilio or WhatsApp Business API
2. Set up a cron job (e.g., Vercel Cron, Trigger.dev) to run it on each user's schedule.

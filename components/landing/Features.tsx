const features = [
  {
    icon: "🧠",
    title: "AI-curated news",
    description:
      "Our model reads hundreds of sources daily and picks only what's relevant to your chosen topics — no noise, no clickbait.",
  },
  {
    icon: "🎙️",
    title: "Spoken in your voice",
    description:
      "Choose between formal, casual, or storytelling delivery. Your briefing sounds like a real show, not a robot reading headlines.",
  },
  {
    icon: "📱",
    title: "Straight to WhatsApp",
    description:
      "No app to install, no email to open. Your episode lands in WhatsApp at exactly the time you pick, every day.",
  },
  {
    icon: "⏱️",
    title: "Your schedule, your length",
    description:
      "5-minute highlight reel or 20-minute deep dive — pick the days and duration that fit your morning routine.",
  },
  {
    icon: "🌍",
    title: "Global topics",
    description:
      "Tech, science, business, politics, sports, health, AI, and climate — mix and match up to 8 topic categories.",
  },
  {
    icon: "🔒",
    title: "Private and secure",
    description:
      "Your preferences and phone number are encrypted and never sold. You can delete your account and data any time.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            News that works for{" "}
            <span className="bg-gradient-to-r from-purple-400 to-purple-200 bg-clip-text text-transparent">
              your life
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Built for people who want to stay informed without spending time
            hunting for news.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="group p-6 rounded-2xl bg-white/3 border border-white/6 hover:border-purple-500/30 hover:bg-white/5 transition-all duration-300"
            >
              <div className="text-3xl mb-4">{f.icon}</div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {f.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

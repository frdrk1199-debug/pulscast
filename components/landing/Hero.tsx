import Link from "next/link";
import Button from "@/components/ui/Button";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background glow effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-purple-700/15 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[300px] bg-purple-900/10 rounded-full blur-[100px]" />
      </div>

      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-sm font-medium mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
          AI-powered · Delivered to WhatsApp
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6">
          Your daily news,{" "}
          <span className="bg-gradient-to-r from-purple-400 to-purple-200 bg-clip-text text-transparent">
            as a podcast.
          </span>
          <br />
          Delivered to WhatsApp.
        </h1>

        <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Pulscast reads the news for you. Pick your topics, set your schedule,
          and get a personalized audio briefing sent straight to your WhatsApp
          every morning.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/signup">
            <Button size="lg" className="w-full sm:w-auto">
              Start your free trial →
            </Button>
          </Link>
          <p className="text-sm text-gray-500">
            14-day free trial · No credit card required
          </p>
        </div>

        {/* Mockup */}
        <div className="mt-20 relative">
          <div className="absolute -inset-4 bg-purple-500/5 rounded-3xl blur-xl" />
          <div className="relative bg-white/4 border border-white/8 rounded-2xl p-1 mx-auto max-w-2xl">
            <div className="bg-[#111118] rounded-xl p-6 sm:p-8">
              <div className="flex items-start gap-3 mb-5">
                <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center shrink-0 text-lg">
                  🎙
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500 mb-1">
                    Pulscast · Today 8:02 AM
                  </p>
                  <div className="bg-white/6 rounded-2xl rounded-tl-sm p-4">
                    <p className="text-sm text-gray-200 leading-relaxed">
                      🌍{" "}
                      <span className="font-semibold text-white">
                        Good morning!
                      </span>{" "}
                      Here&apos;s your personalized briefing for Tuesday.
                    </p>
                    <p className="text-sm text-gray-400 mt-2 leading-relaxed">
                      Today&apos;s topics: AI · Tech · Climate
                    </p>
                    <div className="mt-3 flex items-center gap-3">
                      <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full w-2/5 bg-purple-500 rounded-full" />
                      </div>
                      <span className="text-xs text-gray-500">7:42</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-end gap-2 opacity-50">
                <span className="text-xs text-gray-500">Delivered via WhatsApp</span>
                <svg viewBox="0 0 24 24" className="w-4 h-4 text-green-400" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import Button from "@/components/ui/Button";

const included = [
  "Daily personalized podcast briefing",
  "Up to 8 topic categories",
  "Short, medium, or long episodes",
  "3 voice styles",
  "Custom delivery schedule",
  "WhatsApp delivery",
  "Episode history",
  "Cancel any time",
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Simple, honest pricing
          </h2>
          <p className="text-gray-400 text-lg">
            One plan. Everything included. Cancel any time.
          </p>
        </div>

        <div className="max-w-md mx-auto">
          <div className="relative p-px rounded-2xl bg-gradient-to-b from-purple-500/40 to-purple-900/10">
            <div className="bg-[#111118] rounded-2xl p-8">
              <div className="flex items-end gap-1 mb-1">
                <span className="text-5xl font-extrabold text-white">$9</span>
                <span className="text-gray-400 mb-2">/month</span>
              </div>
              <p className="text-gray-400 text-sm mb-8">
                Start with a free 14-day trial. No credit card required.
              </p>

              <ul className="space-y-3 mb-8">
                {included.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm">
                    <svg
                      className="w-5 h-5 text-purple-400 shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>

              <Link href="/signup" className="block">
                <Button size="lg" className="w-full">
                  Start free trial →
                </Button>
              </Link>
              <p className="text-center text-xs text-gray-600 mt-4">
                No credit card · Cancel any time
              </p>
            </div>
          </div>
        </div>

        {/* Social proof */}
        <div className="mt-16 text-center">
          <p className="text-gray-500 text-sm mb-6">
            Join thousands of listeners who start their day with Pulscast
          </p>
          <div className="flex items-center justify-center gap-8 flex-wrap">
            {["4.9 / 5 rating", "12,000+ listeners", "3M+ episodes delivered"].map(
              (stat) => (
                <div key={stat} className="text-sm font-semibold text-gray-300">
                  {stat}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

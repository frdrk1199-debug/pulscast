"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

const COUNTRY_CODES = [
  { code: "+1", label: "US/CA (+1)" },
  { code: "+44", label: "UK (+44)" },
  { code: "+61", label: "AU (+61)" },
  { code: "+49", label: "DE (+49)" },
  { code: "+33", label: "FR (+33)" },
  { code: "+34", label: "ES (+34)" },
  { code: "+39", label: "IT (+39)" },
  { code: "+55", label: "BR (+55)" },
  { code: "+52", label: "MX (+52)" },
  { code: "+91", label: "IN (+91)" },
  { code: "+86", label: "CN (+86)" },
  { code: "+81", label: "JP (+81)" },
  { code: "+82", label: "KR (+82)" },
  { code: "+971", label: "UAE (+971)" },
  { code: "+27", label: "ZA (+27)" },
  { code: "+234", label: "NG (+234)" },
];

export default function SignupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    email: "",
    password: "",
    whatsappCountryCode: "+1",
    whatsappNumber: "",
  });

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();
    const whatsapp = `${form.whatsappCountryCode}${form.whatsappNumber.replace(/\D/g, "")}`;

    let signUpData;
    try {
      const result = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: {
          data: { whatsapp_number: whatsapp },
        },
      });
      if (result.error) {
        setError(result.error.message);
        setLoading(false);
        return;
      }
      signUpData = result.data;
    } catch {
      setError("Network error — please check your connection and try again.");
      setLoading(false);
      return;
    }

    // If email confirmation is required, Supabase returns a user with no session.
    // Show a message instead of redirecting.
    if (signUpData.session === null && signUpData.user?.identities?.length === 0) {
      setError("An account with this email already exists.");
      setLoading(false);
      return;
    }

    if (signUpData.session === null) {
      // Email confirmation is enabled — user needs to verify before logging in.
      router.push("/login?confirm=1");
      return;
    }

    // Session exists → email confirmation is disabled, user is signed in.
    // Update the profile with their WhatsApp number (trigger creates the row).
    if (signUpData.user) {
      await supabase
        .from("profiles")
        .update({ whatsapp_number: whatsapp })
        .eq("id", signUpData.user.id);
    }

    router.push("/dashboard");
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex flex-col items-center justify-center px-6 py-16">
      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[400px] bg-purple-700/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 mb-8 justify-center">
          <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center">
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
          <span className="font-bold text-lg">Pulscast</span>
        </Link>

        <div className="bg-white/3 border border-white/8 rounded-2xl p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-1">Create your account</h1>
            <p className="text-gray-400 text-sm">
              Start your 14-day free trial. No credit card required.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={set("email")}
              required
              autoComplete="email"
            />

            <Input
              label="Password"
              type="password"
              placeholder="At least 8 characters"
              value={form.password}
              onChange={set("password")}
              required
              minLength={8}
              autoComplete="new-password"
              hint="Minimum 8 characters"
            />

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-300">
                WhatsApp number
              </label>
              <div className="flex gap-2">
                <select
                  value={form.whatsappCountryCode}
                  onChange={set("whatsappCountryCode")}
                  className="px-3 py-3 rounded-xl bg-white/6 border border-white/10 hover:border-white/20 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 shrink-0"
                >
                  {COUNTRY_CODES.map((c) => (
                    <option key={c.code} value={c.code} className="bg-[#111118]">
                      {c.label}
                    </option>
                  ))}
                </select>
                <Input
                  type="tel"
                  placeholder="555 000 0000"
                  value={form.whatsappNumber}
                  onChange={set("whatsappNumber")}
                  required
                  autoComplete="tel"
                  className="flex-1"
                />
              </div>
              <p className="text-xs text-gray-500">
                We&apos;ll deliver your podcast episodes here
              </p>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-sm text-red-400">
                {error}
              </div>
            )}

            <Button
              type="submit"
              loading={loading}
              className="w-full mt-2"
              size="lg"
            >
              Create account
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
            >
              Log in
            </Link>
          </p>
        </div>

        <p className="mt-6 text-center text-xs text-gray-600">
          By signing up you agree to our{" "}
          <Link href="#" className="underline hover:text-gray-400">
            Terms
          </Link>{" "}
          and{" "}
          <Link href="#" className="underline hover:text-gray-400">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
}

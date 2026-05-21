import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2.5">
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
        </div>

        <div className="flex items-center gap-6 text-sm text-gray-500">
          <Link href="#" className="hover:text-gray-300 transition-colors">
            Privacy
          </Link>
          <Link href="#" className="hover:text-gray-300 transition-colors">
            Terms
          </Link>
          <Link href="#" className="hover:text-gray-300 transition-colors">
            Support
          </Link>
        </div>

        <p className="text-xs text-gray-600">
          © {new Date().getFullYear()} Pulscast. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

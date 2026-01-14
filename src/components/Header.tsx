"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const isDoggosActive = pathname === "/" || pathname === "/register";
  const isMyDoggosActive = pathname === "/my-dogs";

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100/50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-2xl font-bold tracking-tight text-gray-900 group-hover:text-[#9C8CF0] transition-colors">
              PET-SOCIETY
            </span>
          </Link>

          {/* Navigation Tabs */}
          <nav className="flex items-center gap-2">
            <Link
              href="/"
              className={`tab-button ${
                isDoggosActive ? "tab-button-active" : "tab-button-inactive"
              }`}
            >
              doggos
            </Link>
            <Link
              href="/my-dogs"
              className={`tab-button ${
                isMyDoggosActive ? "tab-button-active" : "tab-button-inactive"
              }`}
            >
              MyDoggos
            </Link>
          </nav>

          {/* Spacer for balance */}
          <div className="w-32" />
        </div>
      </div>
    </header>
  );
}

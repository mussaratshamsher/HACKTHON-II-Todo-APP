"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Todos", path: "/todos" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link
              href="/"
              className="text-xl font-bold text-primary hover:text-primary/80 transition-colors"
              aria-label="TodoMaster Home"
            >
              TodoMaster
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === link.path
                    ? "bg-secondary text-primary-foreground"
                    : "text-foreground/60 hover:text-foreground"
                }`}
                aria-current={pathname === link.path ? "page" : undefined}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-foreground/60 hover:text-foreground hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Main menu"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  pathname === link.path
                    ? "bg-secondary text-primary-foreground"
                    : "text-foreground/60 hover:text-foreground"
                }`}
                aria-current={pathname === link.path ? "page" : undefined}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
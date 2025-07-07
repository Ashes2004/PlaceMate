"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, Code, Trophy, User } from "lucide-react";

const navLinks = [
  { label: "Home", icon: Home, href: "/" },
  { label: "Explore", icon: Search, href: "/explore" },
  { label: "Practice", icon: Code, href: "/practice" },
  { label: "Compete", icon: Trophy, href: "/compete" },
  { label: "Profile", icon: User, href: "/profile" },
];

export default function Footer() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 w-full bg-white border-t border-gray-400 z-50 md:hidden rounded-t-md">
      <div className="flex justify-around items-center py-3 px-2">
        {navLinks.map(({ label, icon: Icon, href }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={label}
              href={href}
              className="flex flex-col items-center text-xs font-medium text-center"
            >
              <Icon
                size={22}
                className={isActive ? "text-black" : "text-gray-500"}
              />
              <span
                className={`mt-1 ${
                  isActive ? "text-black" : "text-gray-500"
                }`}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

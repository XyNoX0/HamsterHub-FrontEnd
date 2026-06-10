"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, User } from "lucide-react";
import { motion } from "framer-motion";
import "./Sidebar.css";

const NAV_ITEMS = [
  { id: "home", href: "/go", icon: Home, label: "Home" },
  { id: "pro", href: "/profile", icon: User, label: "Profile" },
] as const;

const LOGO_TEXT_VARIANTS = {
  initial: { width: 0, opacity: 0, x: -20 },
  hover: { width: 160, opacity: 1, x: 0 },
} as const;

const LOGO_TEXT_TRANSITION = { type: "spring" as const, stiffness: 200, damping: 25 };

function isActive(pathname: string, href: string): boolean {
  if (href === "/go") return pathname === "/go";
  return pathname === href || pathname.startsWith(href + "/");
}

export function Sidebar() {
  const pathname = usePathname() || "/go";

  return (
    <aside className="sidebar-aside">
      <div className="sidebar-content">
        <motion.div
          whileHover="hover"
          initial="initial"
          className="sidebar-logoContainer"
        >
          <Link href="/go" className="sidebar-logoBox" aria-label="Go Dang home">
            <img src="/godang/brand-logo.png" alt="Logo" className="sidebar-logoImage" />
          </Link>
          <motion.div
            variants={LOGO_TEXT_VARIANTS}
            transition={LOGO_TEXT_TRANSITION}
            className="sidebar-logoTextSlide"
          >
            <span className="sidebar-logoTextInner">
              Go <span className="sidebar-logoHighlight">Dang</span>
            </span>
          </motion.div>
        </motion.div>

        <nav className="sidebar-navMenu" aria-label="Primary">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`sidebar-navIconBtn ${active ? "sidebar-navIconBtnActive" : "sidebar-navIconBtnInactive"}`}
                aria-label={item.label}
                aria-current={active ? "page" : undefined}
              >
                <Icon className="sidebar-navIconSvg" strokeWidth={2.5} aria-hidden />
                {active && <div className="sidebar-activeIndicator" />}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Home, Menu, X, User } from "lucide-react";
import "./TopAppBar.css";

const NAV_ITEMS = [
  { id: "home", label: "Home", icon: Home, href: "/go" },
  { id: "pro", label: "Profile", icon: User, href: "/profile" },
] as const;

function isActive(pathname: string, href: string): boolean {
  if (href === "/go") return pathname === "/go";
  return pathname === href || pathname.startsWith(href + "/");
}

export function TopAppBar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname() || "/go";

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header className="topbar-header">
        <div className="topbar-container">
          <button
            type="button"
            className="topbar-menuBtn"
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="topbar-drawer"
            onClick={() => setOpen(true)}
          >
            <Menu className="topbar-menuIcon" strokeWidth={2.5} aria-hidden />
          </button>

          <h1 className="topbar-logoTitle">
            Go <span className="topbar-logoHighlight">Dang</span>
          </h1>

          <div className="topbar-logoImageWrapper">
            <img src="/godang/brand-logo.png" alt="Logo" className="topbar-logoImage" />
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <div className="topbar-drawerRoot" id="topbar-drawer" role="dialog" aria-modal="true" aria-label="Navigation menu">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="topbar-drawerBackdrop"
              onClick={() => setOpen(false)}
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="topbar-drawerPanel"
            >
              <div className="topbar-drawerHeader">
                <div className="topbar-drawerBrand">
                  <div className="topbar-drawerLogoBox">
                    <img src="/godang/brand-logo.png" alt="" className="topbar-drawerLogoImg" />
                  </div>
                  <span className="topbar-drawerBrandText">
                    Go <span className="topbar-logoHighlight">Dang</span>
                  </span>
                </div>
                <button
                  type="button"
                  className="topbar-drawerCloseBtn"
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                >
                  <X className="topbar-drawerCloseIcon" strokeWidth={2.5} aria-hidden />
                </button>
              </div>

              <nav className="topbar-drawerNav" aria-label="Primary">
                <ul className="topbar-drawerList">
                  {NAV_ITEMS.map(item => {
                    const Icon = item.icon;
                    const active = isActive(pathname, item.href);
                    return (
                      <li key={item.id}>
                        <Link
                          href={item.href}
                          className={`topbar-drawerItem ${active ? "topbar-drawerItemActive" : ""}`}
                          aria-current={active ? "page" : undefined}
                          onClick={() => setOpen(false)}
                        >
                          <Icon className="topbar-drawerItemIcon" strokeWidth={2.2} aria-hidden />
                          <span className="topbar-drawerItemLabel">{item.label}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              <div className="topbar-drawerFooter">
                <span className="topbar-drawerFooterText">More coming soon</span>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

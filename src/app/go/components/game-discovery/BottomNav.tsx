"use client";

import { Home, Compass, Calendar, User } from "lucide-react";
import { useState } from "react";
import "./BottomNav.css";

const NAV = [
  { id: "home", label: "Home", icon: Home },
  { id: "discover", label: "Discover", icon: Compass },
  { id: "event", label: "Activities", icon: Calendar },
  { id: "profile", label: "Profile", icon: User },
] as const;

export function BottomNav() {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <nav
      className="bottomnav-nav"
      aria-label="Primary"
    >
      {NAV.map((item) => {
        const active = item.id === activeTab;
        const Icon = item.icon;
        return (
          <button
            key={item.id}
            type="button"
            className="bottomnav-navBtn"
            onClick={() => setActiveTab(item.id)}
          >
            <div
              className={`bottomnav-iconWrapper ${
                active ? "bottomnav-iconWrapperActive" : "bottomnav-iconWrapperInactive"
              }`}
            >
              <div className={`bottomnav-iconInner ${active ? "bottomnav-iconInnerActive" : "bottomnav-iconInnerInactive"}`}>
                <Icon
                  className={`bottomnav-icon ${active ? "bottomnav-iconActive" : "bottomnav-iconInactive"}`}
                  strokeWidth={2.5}
                  aria-hidden
                />
              </div>
            </div>
            <span
              className={`bottomnav-label ${
                active ? "bottomnav-labelActive" : "bottomnav-labelInactive"
              }`}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}

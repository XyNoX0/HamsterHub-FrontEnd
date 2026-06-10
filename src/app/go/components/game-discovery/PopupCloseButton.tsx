"use client";

import { forwardRef } from "react";
import { X } from "lucide-react";
import "./PopupCloseButton.css";

type Tone = "onDark" | "onLight";

interface PopupCloseButtonProps {
  onClose: () => void;
  tone?: Tone;
  className?: string;
}

export const PopupCloseButton = forwardRef<HTMLButtonElement, PopupCloseButtonProps>(
  function PopupCloseButton({ onClose, tone = "onDark", className }, ref) {
    return (
      <button
        ref={ref}
        type="button"
        onClick={onClose}
        aria-label="Close"
        className={`popupClose popupClose--${tone}${className ? ` ${className}` : ""}`}
      >
        <X className="popupClose-icon" strokeWidth={2.6} />
      </button>
    );
  }
);

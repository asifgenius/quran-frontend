"use client";

import { useState } from "react";

import { SettingsSidebar } from "@/components/settings/sidebar";
import styles from "./drawer.module.css";

export function SettingsDrawer() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Open settings drawer"
        className="rounded-full border border-stone-200 px-4 py-2 text-sm font-semibold text-stone-700 transition hover:border-cyan-400 hover:text-cyan-700"
      >
        Settings
      </button>

      <div
        aria-hidden={!isOpen}
        className={`fixed inset-0 z-50 flex ${isOpen ? "" : "pointer-events-none hidden"}`}
      >
        <button
          type="button"
          aria-label="Close settings drawer"
          onClick={() => setIsOpen(false)}
          className="flex-1 bg-black/30"
        />
        <div
          className={`${styles.drawerShell} h-full w-full max-w-[360px] overflow-y-auto border-r border-stone-200 bg-white p-4 shadow-[16px_0_40px_rgba(15,23,42,0.12)] ${
            isOpen ? styles.open : styles.closed
          }`}
        >
          <div className="mb-4 flex items-center justify-between px-2">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-700">
              Reader Panel
            </p>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-full border border-stone-200 px-3 py-1 text-sm text-stone-600"
            >
              Close
            </button>
          </div>
          <SettingsSidebar />
        </div>
      </div>
    </>
  );
}

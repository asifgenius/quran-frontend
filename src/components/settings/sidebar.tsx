"use client";

import { useReaderSettings } from "@/components/settings/provider";
import styles from "./sidebar.module.css";

export function SettingsSidebar() {
  const {
    arabicFont,
    arabicFontSize,
    translationFontSize,
    setArabicFont,
    setArabicFontSize,
    setTranslationFontSize,
  } = useReaderSettings();

  return (
    <aside className={`${styles.panel} flex flex-col gap-6 p-6`}>
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-700">
          Reader Settings
        </p>
        <h2 className="text-2xl font-semibold text-stone-900">Customize</h2>
        <p className="text-sm leading-6 text-stone-600">
          Change Arabic type, scale, and translation sizing. Your preferences
          stay saved in this browser.
        </p>
      </div>

      <label className="flex flex-col gap-2">
        <span className="text-sm font-medium text-stone-800">Arabic font</span>
        <select
          value={arabicFont}
          onChange={(event) =>
            setArabicFont(event.target.value === "sans" ? "sans" : "serif")
          }
          className="rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-cyan-500"
        >
          <option value="serif">Classic Serif</option>
          <option value="sans">Modern Sans</option>
        </select>
      </label>

      <label className="flex flex-col gap-2">
        <span className="flex items-center justify-between text-sm font-medium text-stone-800">
          Arabic font size
          <span className="text-stone-500">{arabicFontSize.toFixed(2)}rem</span>
        </span>
        <input
          type="range"
          min="1.5"
          max="3.5"
          step="0.05"
          value={arabicFontSize}
          onChange={(event) => setArabicFontSize(Number(event.target.value))}
        />
      </label>

      <label className="flex flex-col gap-2">
        <span className="flex items-center justify-between text-sm font-medium text-stone-800">
          Translation size
          <span className="text-stone-500">
            {translationFontSize.toFixed(2)}rem
          </span>
        </span>
        <input
          type="range"
          min="0.9"
          max="1.5"
          step="0.05"
          value={translationFontSize}
          onChange={(event) =>
            setTranslationFontSize(Number(event.target.value))
          }
        />
      </label>
    </aside>
  );
}

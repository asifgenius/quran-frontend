"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type ArabicFont = "serif" | "sans";

type Settings = {
  arabicFont: ArabicFont;
  arabicFontSize: number;
  translationFontSize: number;
};

type SettingsContextValue = Settings & {
  setArabicFont: (value: ArabicFont) => void;
  setArabicFontSize: (value: number) => void;
  setTranslationFontSize: (value: number) => void;
};

const STORAGE_KEY = "quran-reader-settings";

const defaultSettings: Settings = {
  arabicFont: "serif",
  arabicFontSize: 2.15,
  translationFontSize: 1.05,
};

const SettingsContext = createContext<SettingsContextValue | null>(null);

function applySettingsToDocument(settings: Settings) {
  document.documentElement.style.setProperty(
    "--arabic-font-size",
    `${settings.arabicFontSize}rem`,
  );
  document.documentElement.style.setProperty(
    "--translation-font-size",
    `${settings.translationFontSize}rem`,
  );
  document.documentElement.dataset.arabicFont = settings.arabicFont;
}

function getInitialSettings(): Settings {
  return defaultSettings;
}

function getStoredSettings(): Settings {
  const storedValue = window.localStorage.getItem(STORAGE_KEY);

  if (!storedValue) {
    return defaultSettings;
  }

  try {
    const parsed = JSON.parse(storedValue) as Partial<Settings>;

    return {
      arabicFont: parsed.arabicFont === "sans" ? parsed.arabicFont : "serif",
      arabicFontSize:
        typeof parsed.arabicFontSize === "number"
          ? parsed.arabicFontSize
          : defaultSettings.arabicFontSize,
      translationFontSize:
        typeof parsed.translationFontSize === "number"
          ? parsed.translationFontSize
          : defaultSettings.translationFontSize,
    };
  } catch {
    return defaultSettings;
  }
}

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>(getInitialSettings);

  useEffect(() => {
    setSettings(getStoredSettings());
  }, []);

  useEffect(() => {
    applySettingsToDocument(settings);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  const value = useMemo<SettingsContextValue>(
    () => ({
      ...settings,
      setArabicFont: (arabicFont) =>
        setSettings((current) => ({ ...current, arabicFont })),
      setArabicFontSize: (arabicFontSize) =>
        setSettings((current) => ({ ...current, arabicFontSize })),
      setTranslationFontSize: (translationFontSize) =>
        setSettings((current) => ({ ...current, translationFontSize })),
    }),
    [settings],
  );

  return (
    <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>
  );
}

export function useReaderSettings() {
  const context = useContext(SettingsContext);

  if (!context) {
    throw new Error("useReaderSettings must be used within SettingsProvider");
  }

  return context;
}

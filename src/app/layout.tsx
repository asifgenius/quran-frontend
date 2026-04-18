import type { Metadata } from "next";
import { Noto_Naskh_Arabic, Noto_Sans_Arabic } from "next/font/google";
import Link from "next/link";

import { Footer } from "@/components/footer";
import { SettingsDrawer } from "@/components/settings/drawer";
import { SettingsProvider } from "@/components/settings/provider";

import "./globals.css";

const notoNaskhArabic = Noto_Naskh_Arabic({
  subsets: ["arabic"],
  variable: "--font-arabic-serif",
  weight: ["400", "500", "700"],
});

const notoSansArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-arabic-sans",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Quran.com Clone",
  description:
    "A responsive Quran web app with surah browsing, ayah reading, translation search, and persistent reader settings.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body
        className={`${notoNaskhArabic.variable} ${notoSansArabic.variable} min-h-full bg-white text-stone-900`}
        suppressHydrationWarning
      >
        <SettingsProvider>
          <div className="bg-[linear-gradient(90deg,#11474a_0%,#1d7f86_100%)] px-4 py-3 text-center text-sm font-medium text-white">
            Donate your zakat!{" "}
            <span className="rounded-full bg-white px-3 py-1 text-[#1d7f86]">
              Learn more
            </span>
          </div>

          <header className="border-b border-stone-100 bg-white">
            <div className="page-shell flex items-center justify-between py-4">
              <Link
                href="/"
                className="font-serif text-[2rem] font-bold tracking-tight text-stone-900"
              >
                Quran
              </Link>
              <div className="flex items-center text-sm text-stone-700">
                <SettingsDrawer />
              </div>
            </div>
          </header>

          <div className="page-shell py-6">
            <main className="min-w-0">{children}</main>
          </div>
          <Footer />
        </SettingsProvider>
      </body>
    </html>
  );
}

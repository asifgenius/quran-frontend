import Link from "next/link";

import type { Surah, SurahSummary, Verse } from "@/lib/quran";
import styles from "./sections.module.css";

export function SurahHeader({ surah }: { surah: Surah }) {
  return (
    <section className="border-b border-stone-200 pb-8 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-600">
        Surah {surah.id}
      </p>
      <div className="mt-4 flex flex-col items-center justify-center gap-4 sm:gap-5 md:flex-row md:gap-6">
        <p className="arabic-text text-[clamp(2.6rem,8vw,4.2rem)] leading-none text-stone-900">
          {surah.name}
        </p>
        <div className="text-center md:text-left">
          <h1 className="text-xl font-semibold text-stone-900 sm:text-2xl">
            {surah.transliteration}
          </h1>
          <p className="text-base text-stone-500">{surah.translation}</p>
        </div>
      </div>
    </section>
  );
}

export function VerseRow({
  surahId,
  verse,
}: {
  surahId: number;
  verse: Verse;
}) {
  return (
    <article id={`ayah-${verse.id}`} className={styles.readerVerseRow}>
      <div className={styles.readerVerseLeft}>
        <div className="mb-5 text-[11px] text-stone-400">
          <span className="text-base text-stone-500">
            {surahId}:{verse.id}
          </span>
        </div>
        <p className="translation-text max-w-[31rem] leading-8 text-stone-600">
          {verse.translation}
        </p>
      </div>

      <div className={styles.readerVerseRight}>
        <div className="mb-5 flex justify-end gap-4 text-[11px] text-stone-400">
          <span>↗</span>
          <span>⤴</span>
          <span>⋯</span>
        </div>
        <p className="arabic-text text-right leading-[2.15] text-stone-900">
          {verse.text}
        </p>
      </div>
    </article>
  );
}

export function SurahBottomSection({
  relatedSurahs,
}: {
  relatedSurahs: SurahSummary[];
}) {
  return (
    <section className="mt-10 grid gap-4 border-t border-stone-200 pt-8 lg:grid-cols-[1fr_1fr_1.2fr] 2xl:grid-cols-[1fr_1fr_1.05fr]">
      <div className={`${styles.softCard} p-5`}>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-400">
          Read More
        </p>
        <div className="mt-4 space-y-4">
          {relatedSurahs.map((item) => (
            <Link key={item.id} href={`/surah/${item.id}`} className="block">
              <p className="text-base font-semibold text-stone-900">
                {item.id}. {item.transliteration}
              </p>
              <p className="text-sm text-stone-500">{item.translation}</p>
            </Link>
          ))}
        </div>
      </div>

      <div className={`${styles.softCard} p-5`}>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-400">
          Explore
        </p>
        <div className="mt-4 grid gap-3 text-sm text-stone-600">
          <span>About</span>
          <span>Themes</span>
          <span>Reflections</span>
          <span>Lessons</span>
          <span>Resources</span>
        </div>
      </div>

      <div className="space-y-4">
        <GoalCard />
        <GoalCard />
      </div>
    </section>
  );
}

function GoalCard() {
  return (
    <div className={`${styles.softCard} p-5`}>
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-600">
        My Quran
      </p>
      <p className="mt-3 text-lg font-semibold text-stone-900">
        Achieve Your Quran Goals
      </p>
      <p className="mt-2 text-sm text-stone-500">
        Track streaks, create custom goals, stay consistent.
      </p>
      <button className="mt-4 rounded-full bg-[#2d8b57] px-4 py-2 text-sm font-semibold text-white">
        Set a Custom Goal
      </button>
    </div>
  );
}

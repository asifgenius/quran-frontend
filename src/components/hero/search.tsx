"use client";

import Link from "next/link";
import { useDeferredValue, useEffect, useState } from "react";

import { searchVersesByTranslation, type SearchResult } from "@/lib/quran";
import styles from "./search.module.css";

export function HeroSearch() {
  const debounceMs = 300;
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const deferredQuery = useDeferredValue(query);

  useEffect(() => {
    const normalizedQuery = deferredQuery.trim();

    if (!normalizedQuery) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    let isCancelled = false;
    const timeoutId = window.setTimeout(() => {
      setIsLoading(true);

      searchVersesByTranslation(normalizedQuery, 8)
        .then((nextResults) => {
          if (!isCancelled) {
            setResults(nextResults);
          }
        })
        .catch(() => {
          if (!isCancelled) {
            setResults([]);
          }
        })
        .finally(() => {
          if (!isCancelled) {
            setIsLoading(false);
          }
        });
    }, debounceMs);

    return () => {
      isCancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, [deferredQuery, debounceMs]);

  return (
    <div className="mt-7 w-full max-w-[730px]">
      <div className="flex items-center rounded-full border border-stone-200 bg-white px-5 py-2.5 shadow-sm">
        <span className={styles.icon}>⌕</span>
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search the Quran..."
          className="w-full bg-transparent text-base text-stone-700 outline-none placeholder:text-stone-500"
        />
      </div>

      {deferredQuery.trim() ? (
        <div className="mt-4 overflow-hidden rounded-[1.25rem] border border-stone-200 bg-white text-left shadow-[0_12px_30px_rgba(15,23,42,0.08)]">
          {isLoading ? (
            <div className="px-5 py-6 text-sm text-stone-500">
              Searching ayahs...
            </div>
          ) : results.length > 0 ? (
            <div className="divide-y divide-stone-100">
              {results.map((result) => (
                <Link
                  key={`${result.surahId}-${result.verseId}`}
                  href={`/surah/${result.surahId}#ayah-${result.verseId}`}
                  className="block px-5 py-4 transition hover:bg-stone-50"
                >
                  <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700">
                    <span>Surah {result.surahId}</span>
                    <span>{result.surahTransliteration}</span>
                    <span>Ayah {result.verseId}</span>
                  </div>
                  <p className="mt-3 line-clamp-2 text-base leading-7 text-stone-600">
                    {result.translationText}
                  </p>
                  <p className="mt-2 text-right text-2xl text-stone-800">
                    {result.arabicText}
                  </p>
                </Link>
              ))}
            </div>
          ) : (
            <div className="px-5 py-6 text-sm text-stone-500">
              No ayah matched your search. Try a broader word like
              {" "}
              mercy, guidance, patience, or prayer.
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}

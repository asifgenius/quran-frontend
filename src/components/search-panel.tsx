"use client";

import Link from "next/link";
import { useDeferredValue, useEffect, useState } from "react";

import { searchVersesByTranslation, type SearchResult } from "@/lib/quran";

export function SearchPanel() {
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

      searchVersesByTranslation(normalizedQuery, 24)
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
    <section className="reader-panel space-y-5">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-900/70">
          Ayah Search
        </p>
        <h2 className="text-2xl font-semibold text-stone-900">
          Search by translation text
        </h2>
        <p className="max-w-2xl text-sm leading-6 text-stone-600">
          Search across all ayahs using English translation text, then jump
          straight to the matching surah and verse.
        </p>
      </div>

      <input
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Try mercy, guidance, patience, light..."
        className="w-full rounded-[1.5rem] border border-stone-200 bg-white px-5 py-4 text-base text-stone-900 outline-none transition focus:border-amber-500"
      />

      {!deferredQuery.trim() ? (
        <div className="rounded-[1.5rem] border border-dashed border-stone-300 px-5 py-6 text-sm leading-6 text-stone-500">
          Start typing to search the translation text of the Quran.
        </div>
      ) : null}

      {deferredQuery.trim() && isLoading ? (
        <div className="rounded-[1.5rem] border border-dashed border-stone-300 px-5 py-6 text-sm leading-6 text-stone-500">
          Searching ayahs...
        </div>
      ) : null}

      {deferredQuery.trim() && !isLoading && results.length === 0 ? (
        <div className="rounded-[1.5rem] border border-dashed border-stone-300 px-5 py-6 text-sm leading-6 text-stone-500">
          No ayah matched your search. Try a broader English word or phrase.
        </div>
      ) : null}

      {!isLoading && results.length > 0 ? (
        <div className="grid gap-4">
          {results.map((result) => (
            <Link
              key={`${result.surahId}-${result.verseId}`}
              href={`/surah/${result.surahId}#ayah-${result.verseId}`}
              className="rounded-[1.5rem] border border-stone-200 bg-white/90 p-5 transition hover:-translate-y-0.5 hover:border-amber-400 hover:shadow-[0_16px_40px_rgba(120,53,15,0.08)]"
            >
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-amber-800/70">
                <span>Surah {result.surahId}</span>
                <span>{result.surahTransliteration}</span>
                <span>Ayah {result.verseId}</span>
              </div>
              <p className="arabic-text mt-4 text-right leading-[1.9] text-stone-900">
                {result.arabicText}
              </p>
              <p className="translation-text mt-3 leading-8 text-stone-700">
                {result.translationText}
              </p>
            </Link>
          ))}
        </div>
      ) : null}
    </section>
  );
}

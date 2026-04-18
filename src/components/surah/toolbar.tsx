import Link from "next/link";

import type { Surah } from "@/lib/quran";

export function SurahToolbar({ surah }: { surah: Surah }) {
  return (
    <div className="border-b border-stone-200">
      <div className="page-shell flex flex-col gap-2 py-3 text-sm text-stone-500 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
        <div className="min-w-0 flex items-center gap-3">
          <Link href="/" className="font-medium text-stone-700">
            {surah.id}. {surah.transliteration}
          </Link>
        </div>
        <div className="flex items-center gap-4 self-start sm:self-auto">
          <span>Reading View</span>
          <span>⚙</span>
        </div>
      </div>
    </div>
  );
}

import { notFound } from "next/navigation";

import {
  SurahBottomSection,
  SurahHeader,
  VerseRow,
} from "@/components/surah/sections";
import { SurahToolbar } from "@/components/surah/toolbar";
import { getAllSurahs, getSurahById, getSurahIds } from "@/lib/quran";

type SurahPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateStaticParams() {
  const ids = await getSurahIds();

  return ids.map((id) => ({
    id: String(id),
  }));
}

export default async function SurahPage({ params }: SurahPageProps) {
  const resolvedParams = await params;
  const surahId = Number(resolvedParams.id);
  const [surah, surahIds, surahSummaries] = await Promise.all([
    getSurahById(surahId),
    getSurahIds(),
    getAllSurahs(),
  ]);
  const relatedSurahs = surahIds
    .filter((id) => id !== surahId)
    .slice(1, 3)
    .map((id) => surahSummaries.find((item) => item.id === id) ?? null)
    .filter((value): value is NonNullable<typeof value> => Boolean(value));

  if (!surah) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <SurahToolbar surah={surah} />

      <main className="page-shell py-8">
        <div className="mx-auto w-full max-w-[1120px] 2xl:max-w-[1240px]">
          <SurahHeader surah={surah} />

          <section>
            {surah.verses.map((verse) => (
              <VerseRow key={verse.id} surahId={surah.id} verse={verse} />
            ))}
          </section>

          <SurahBottomSection relatedSurahs={relatedSurahs} />
        </div>
      </main>
    </div>
  );
}

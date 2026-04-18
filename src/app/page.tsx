import { HeroSearch } from "@/components/hero/search";
import {
  CommunitySection,
  LearningSection,
  StartReadingSection,
  SurahDirectorySection,
  VerseHighlightSection,
} from "@/components/home/sections";
import { homeLearningCards } from "@/lib/content";
import { getAllSurahs } from "@/lib/quran";

export default async function Home() {
  const surahs = await getAllSurahs();
  const featuredSurahs = surahs.slice(0, 114);

  return (
    <div className="min-h-screen bg-white">
      <section className="border-b border-stone-100 bg-[#f3f6fa]">
        <div className="page-shell flex flex-col items-center py-12 text-center">
          <h1 className="font-serif text-[clamp(3rem,8vw,5.5rem)] font-bold tracking-tight text-stone-900">
            Quran
          </h1>
          <HeroSearch />
        </div>
      </section>

      <main className="py-10">
        <StartReadingSection surah={surahs[0]} />
        <VerseHighlightSection />
        <LearningSection cards={homeLearningCards} />
        <CommunitySection />
        <SurahDirectorySection surahs={featuredSurahs} />
      </main>
    </div>
  );
}

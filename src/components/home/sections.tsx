"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import {
  getPaginatedDirectory,
  type JuzSummary,
  type SurahSummary,
} from "@/lib/quran";
import { revelationOrder } from "@/lib/quran-organization";
import styles from "./sections.module.css";

export function SectionHeader({
  title,
  action,
  description,
}: {
  title: string;
  action?: string;
  description?: string;
}) {
  return (
    <div className="mb-5 flex items-center justify-between">
      <div className="min-w-0">
        <h2 className={styles.sectionTitle}>{title}</h2>
        {description ? (
          <p className="mt-2 text-lg text-stone-500">{description}</p>
        ) : null}
      </div>
      {action ? (
        <span className="shrink-0 text-sm font-semibold text-cyan-700">
          {action}
        </span>
      ) : null}
    </div>
  );
}

export function StartReadingSection({ surah }: { surah: SurahSummary }) {
  return (
    <section className={styles.sectionBlock}>
      <SectionHeader title="Start Reading" action="My Quran" />
      <div className={`${styles.softCard} ${styles.startReadingCard}`}>
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-100">
          Welcome
        </p>
        <h3 className={styles.startReadingTitle}>
          Start your reading journey with Surah {surah.id}
        </h3>
        <p className={styles.startReadingCopy}>
          Begin with {surah.transliteration} ({surah.translation}) and continue
          reading the Quran with a clean, focused experience.
        </p>
        <div className={styles.startReadingMeta}>
          <p className="arabic-text text-right text-[clamp(2.4rem,7vw,3.75rem)] leading-none text-white">
            {surah.name}
          </p>
          <Link
            href={`/surah/${surah.id}`}
            className={styles.startReadingButton}
          >
            Start Reading
          </Link>
        </div>
      </div>
    </section>
  );
}

export function TopicsSection({ topics }: { topics: string[] }) {
  return (
    <section className={styles.sectionBlock}>
      <SectionHeader title="Explore Topics" />
      <div className="mt-5 flex flex-wrap gap-3">
        {topics.map((topic) => (
          <span
            key={topic}
            className="rounded-full bg-stone-100 px-5 py-3 text-[1.05rem] font-medium text-stone-700"
          >
            {topic} ›
          </span>
        ))}
      </div>
    </section>
  );
}

export function LearningSection({
  cards,
}: {
  cards: Array<{
    title: string;
    subtitle: string;
    tone: string;
    accent: string;
  }>;
}) {
  return (
    <section className={styles.sectionBlock}>
      <SectionHeader title="Start Learning" action="See More" />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <article
            key={card.title}
            className={`h-[258px] overflow-hidden rounded-[20px] bg-gradient-to-br ${card.tone} p-6 shadow-sm`}
          >
            <div className="flex h-full flex-col justify-end">
              <h3
                className={`max-w-[14rem] text-4xl font-semibold leading-none ${card.accent}`}
              >
                {card.title}
              </h3>
              <p
                className={`mt-3 text-base ${
                  card.accent === "text-white"
                    ? "text-white/85"
                    : "text-stone-600"
                }`}
              >
                {card.subtitle}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function VerseHighlightSection() {
  return (
    <section className={styles.sectionBlock}>
      <SectionHeader title="Quran quote" action="Calendar" />
      <div className={`${styles.softCard} px-6 py-10 text-center`}>
        <p className="text-lg font-medium text-stone-700">
          A verse from this week&apos;s reading
        </p>
        <p className="arabic-text mt-5 text-center leading-[2] text-stone-900">
          رَبَّنَا لَا تُزِغۡ قُلُوبَنَا بَعۡدَ إِذۡ هَدَيۡتَنَا وَهَبۡ لَنَا
          مِن لَّدُنكَ رَحۡمَةًۚ إِنَّكَ أَنتَ ٱلۡوَهَّابُ
        </p>
        <p className="mx-auto mt-4 max-w-4xl text-xl leading-9 text-stone-600">
          &quot;They say, ‘Our Lord! Do not let our hearts deviate after You
          have guided us. Grant us Your mercy. You are indeed the Giver of all
          bounties.&apos;&quot;
          <span className="text-cyan-600"> Ali &apos;Imran 3:8</span>
        </p>
      </div>
    </section>
  );
}

export function CommunitySection() {
  return (
    <section className={styles.sectionBlock}>
      <SectionHeader title="Community" />
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <div className="rounded-[20px] bg-[#fff5d8] p-6 shadow-sm">
          <p className="text-2xl font-semibold text-[#b36a0c]">
            Continue Your Quran Journey
          </p>
          <p className="mt-3 text-lg text-stone-700">
            Reading plans, reflections, and tools to stay connected all year.
          </p>
        </div>
        <div className={`${styles.softCard} p-6`}>
          <p className="text-2xl font-semibold text-stone-900">QuranReflect</p>
          <p className="mt-3 text-lg text-stone-600">
            Read today&apos;s featured verses and reflections
          </p>
        </div>
      </div>
    </section>
  );
}

export function AppsSection({
  appCards,
}: {
  appCards: Array<[string, string]>;
}) {
  return (
    <section className={styles.sectionBlock}>
      <div className="mb-2">
        <h2 className={styles.sectionTitle}>Quran Apps</h2>
        <p className="mt-2 text-lg text-stone-500">
          Connected apps to further your growth with the Quran.
        </p>
      </div>
      <div className={`${styles.softCard} mt-5 p-6`}>
        <div className="mb-6 flex items-center justify-between">
          <p className="text-xl font-semibold text-stone-900">Featured Apps</p>
          <span className="text-lg font-semibold text-stone-500 underline-offset-2">
            See more
          </span>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {appCards.map(([name, copy]) => (
            <div key={name} className="text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-stone-100 text-xl">
                ✦
              </div>
              <p className="text-lg font-semibold text-stone-900">{name}</p>
              <p className="mt-2 text-sm text-stone-500">{copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SurahDirectorySection({ surahs }: { surahs: SurahSummary[] }) {
  const itemsPerPage = 20;
  const [activeView, setActiveView] = useState<
    "surah" | "juz" | "revelation_order"
  >("surah");
  const [sortOrder, setSortOrder] = useState<"ascending" | "descending">(
    "ascending",
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [remoteSurahs, setRemoteSurahs] = useState<SurahSummary[]>(
    surahs.slice(0, itemsPerPage),
  );
  const [remoteJuz, setRemoteJuz] = useState<JuzSummary[]>([]);
  const [remoteTotalPages, setRemoteTotalPages] = useState(
    Math.max(1, Math.ceil(surahs.length / itemsPerPage)),
  );
  const [remoteTotalItems, setRemoteTotalItems] = useState(surahs.length);
  const [isPageLoading, setIsPageLoading] = useState(false);
  const totalItems = remoteTotalItems;
  const totalPages = remoteTotalPages;
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * itemsPerPage;
  const paginatedSurahs = remoteSurahs;
  const visiblePageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1,
  ).filter(
    (pageNumber) =>
      pageNumber === 1 ||
      pageNumber === totalPages ||
      Math.abs(pageNumber - safeCurrentPage) <= 1,
  );

  const sortLabel =
    activeView === "revelation_order"
      ? `Sort by: ${sortOrder === "ascending" ? "Earliest" : "Latest"}`
      : `Sort by: ${sortOrder === "ascending" ? "Ascending" : "Descending"}`;

  useEffect(() => {
    let isCancelled = false;

    setIsPageLoading(true);

    getPaginatedDirectory<SurahSummary | JuzSummary>({
      page: currentPage,
      limit: itemsPerPage,
      sortOrder,
      view: activeView,
    })
      .then((response) => {
        if (!isCancelled) {
          const nextItems = Array.isArray(response.items) ? response.items : [];

          if (activeView === "juz") {
            setRemoteJuz(nextItems as JuzSummary[]);
            setRemoteSurahs([]);
          } else {
            setRemoteSurahs(nextItems as SurahSummary[]);
            setRemoteJuz([]);
          }
          setRemoteTotalItems(response.total);
          setRemoteTotalPages(response.totalPages);
        }
      })
      .catch(() => {
        if (!isCancelled) {
          setRemoteSurahs([]);
          setRemoteJuz([]);
          setRemoteTotalItems(0);
          setRemoteTotalPages(1);
        }
      })
      .finally(() => {
        if (!isCancelled) {
          setIsPageLoading(false);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [activeView, currentPage, itemsPerPage, sortOrder]);

  return (
    <section className={styles.sectionBlock}>
      <div className="mb-5 flex flex-col gap-4 border-b border-stone-200 pb-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-x-5 gap-y-3 text-base text-stone-700 sm:text-lg md:text-xl">
          <button
            type="button"
            onClick={() => {
              setActiveView("surah");
              setCurrentPage(1);
            }}
            className={`pb-2 ${
              activeView === "surah"
                ? "border-b-2 border-stone-900 font-medium text-stone-900"
                : "text-stone-600"
            }`}
          >
            Surah
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveView("juz");
              setCurrentPage(1);
            }}
            className={`pb-2 ${
              activeView === "juz"
                ? "border-b-2 border-stone-900 font-medium text-stone-900"
                : "text-stone-600"
            }`}
          >
            Juz
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveView("revelation_order");
              setCurrentPage(1);
            }}
            className={`pb-2 ${
              activeView === "revelation_order"
                ? "border-b-2 border-stone-900 font-medium text-stone-900"
                : "text-stone-600"
            }`}
          >
            Revelation Order
          </button>
        </div>
        <button
          type="button"
          onClick={() =>
            {
              setSortOrder((current) =>
                current === "ascending" ? "descending" : "ascending",
              );
              setCurrentPage(1);
            }
          }
          className="self-start text-xs font-semibold uppercase tracking-[0.16em] text-stone-500 transition hover:text-stone-900 sm:text-sm md:self-auto"
        >
          {sortLabel}
        </button>
      </div>

      {isPageLoading ? (
        <div className={styles.paginationLoading}>Loading {activeView === "juz" ? "juz" : "surahs"}...</div>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
        {activeView === "juz"
          ? remoteJuz.map((juz) => <JuzCard key={juz.id} juz={juz} />)
          : paginatedSurahs.map((surah) => (
              <SurahCard
                key={`${activeView}-${surah.id}`}
                surah={surah}
                revelationRank={
                  activeView === "revelation_order"
                    ? revelationOrder.indexOf(surah.id) + 1
                    : undefined
                }
              />
            ))}
      </div>

      {totalPages > 1 ? (
        <div className={styles.paginationBar}>
          <p className={styles.paginationMeta}>
            Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, totalItems)} of{" "}
            {totalItems}
          </p>
          <div className={styles.paginationControls}>
            <button
              type="button"
              onClick={() =>
                setCurrentPage((page) => Math.max(1, page - 1))
              }
              disabled={safeCurrentPage === 1}
              className={styles.paginationButton}
            >
              Previous
            </button>
            <div className={styles.paginationPages}>
              {visiblePageNumbers.map((pageNumber, index) => {
                const previousPage = visiblePageNumbers[index - 1];
                const showGap =
                  previousPage !== undefined &&
                  pageNumber - previousPage > 1;

                return (
                  <div key={pageNumber} className={styles.paginationPageGroup}>
                    {showGap ? (
                      <span className={styles.paginationEllipsis}>...</span>
                    ) : null}
                    <button
                      type="button"
                      onClick={() => setCurrentPage(pageNumber)}
                      className={`${styles.paginationCircle} ${
                        pageNumber === safeCurrentPage
                          ? styles.paginationCircleActive
                          : ""
                      }`}
                      aria-label={`Go to page ${pageNumber}`}
                      aria-current={
                        pageNumber === safeCurrentPage ? "page" : undefined
                      }
                    >
                      {pageNumber}
                    </button>
                  </div>
                );
              })}
            </div>
            <button
              type="button"
              onClick={() =>
                setCurrentPage((page) => Math.min(totalPages, page + 1))
              }
              disabled={safeCurrentPage === totalPages}
              className={styles.paginationButton}
            >
              Next
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}

export function SurahCard({
  surah,
  revelationRank,
}: {
  surah: SurahSummary;
  revelationRank?: number;
}) {
  return (
    <Link href={`/surah/${surah.id}`} className={styles.surahRowCard}>
      <div className="flex items-center gap-4">
        <div className={styles.diamondBadge}>
          <span>{revelationRank ?? surah.id}</span>
        </div>
        <div>
          <p className="text-[1.75rem] font-semibold leading-none text-stone-900">
            {surah.transliteration}
          </p>
          <p className="mt-2 text-lg text-stone-500">{surah.translation}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-2xl leading-none text-stone-700">{surah.name}</p>
        <p className="mt-3 text-lg font-medium text-stone-500">
          {revelationRank ? `Order ${revelationRank}` : `${surah.total_verses} Ayahs`}
        </p>
      </div>
    </Link>
  );
}

function JuzCard({
  juz,
}: {
  juz: {
    id: number;
    label: string;
    range: string;
  };
}) {
  return (
    <div className={styles.surahRowCard}>
      <div className="flex items-center gap-4">
        <div className={styles.diamondBadge}>
          <span>{juz.id}</span>
        </div>
        <div>
          <p className="text-[1.75rem] font-semibold leading-none text-stone-900">
            Juz {juz.id}
          </p>
          <p className="mt-2 text-lg text-stone-500">{juz.label}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-base leading-6 text-stone-700">{juz.range}</p>
      </div>
    </div>
  );
}

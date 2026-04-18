export type Verse = {
  id: number;
  text: string;
  translation: string;
};

export type Surah = {
  id: number;
  name: string;
  transliteration: string;
  translation: string;
  type: "meccan" | "medinan";
  total_verses: number;
  verses: Verse[];
};

export type SurahSummary = Omit<Surah, "verses"> & {
  link?: string;
};

export type JuzSummary = {
  id: number;
  label: string;
  range: string;
};

export type SearchResult = {
  surahId: number;
  surahName: string;
  surahTransliteration: string;
  surahTranslation: string;
  verseId: number;
  arabicText: string;
  translationText: string;
};

type SurahListResponse = {
  total: number;
  surahs: SurahSummary[];
};

type PaginatedSurahResponse = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  items: SurahSummary[];
};

type PaginatedDirectoryResponse<T> = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  items: T[];
};

type SearchResponse = {
  query: string;
  total: number;
  results: SearchResult[];
};

const DEFAULT_API_URL = "http://localhost:4000";

function getApiBaseUrl() {
  if (typeof window !== "undefined") {
    return process.env.NEXT_PUBLIC_QURAN_API_URL ?? DEFAULT_API_URL;
  }

  return (
    process.env.QURAN_API_URL ??
    process.env.NEXT_PUBLIC_QURAN_API_URL ??
    DEFAULT_API_URL
  );
}

async function fetchFromQuranApi<T>(
  pathname: string,
  options?: RequestInit & {
    next?: NextFetchRequestConfig;
  },
) {
  const response = await fetch(`${getApiBaseUrl()}${pathname}`, {
    ...options,
  });

  if (!response.ok) {
    throw new Error(`Quran API request failed: ${response.status} ${pathname}`);
  }

  return (await response.json()) as T;
}

export async function getAllSurahs() {
  const data = await fetchFromQuranApi<SurahListResponse>("/api/surahs", {
    next: { revalidate: 3600 },
  });
  return data.surahs;
}

export async function getPaginatedSurahs({
  page,
  limit,
  sortOrder,
  view,
}: {
  page: number;
  limit: number;
  sortOrder: "ascending" | "descending";
  view: "surah" | "revelation_order";
}) {
  const searchParams = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    sort: sortOrder,
    view,
  });

  return fetchFromQuranApi<PaginatedSurahResponse>(
    `/api/surahs?${searchParams.toString()}`,
    {
      cache: "no-store",
    },
  );
}

export async function getPaginatedDirectory<T>({
  page,
  limit,
  sortOrder,
  view,
}: {
  page: number;
  limit: number;
  sortOrder: "ascending" | "descending";
  view: "surah" | "juz" | "revelation_order";
}) {
  const searchParams = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    sort: sortOrder,
    view,
  });

  return fetchFromQuranApi<PaginatedDirectoryResponse<T>>(
    `/api/surahs?${searchParams.toString()}`,
    {
      cache: "no-store",
    },
  );
}

export async function getSurahById(id: number) {
  try {
    return await fetchFromQuranApi<Surah>(`/api/surahs/${id}`, {
      next: { revalidate: 3600 },
    });
  } catch {
    return null;
  }
}

export async function getSurahIds() {
  const surahs = await getAllSurahs();
  return surahs.map((surah) => surah.id);
}

export async function searchVersesByTranslation(query: string, limit = 8) {
  const normalizedQuery = query.trim();

  if (!normalizedQuery) {
    return [] as SearchResult[];
  }

  const searchParams = new URLSearchParams({
    q: normalizedQuery,
    limit: String(limit),
  });

  const data = await fetchFromQuranApi<SearchResponse>(
    `/api/search?${searchParams.toString()}`,
    {
      cache: "no-store",
    },
  );

  return data.results;
}

import { ALBUM_TOTAL, type Section } from "./albumFigurinhas";

export const TOTAL_STICKERS = ALBUM_TOTAL;
export type StickerStatus = "missing" | "owned" | "repeated";
export type StickersMap = Record<number, StickerStatus>;

const STORAGE_KEY = "copa-sticker:v1";

export function loadStickers(): StickersMap {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};

    const parsed = JSON.parse(raw) as StickersMap;

    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

export function saveStickers(map: StickersMap) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
  } catch {
    // Storage can be unavailable in private mode or when quota is exceeded.
  }
}

export function nextStatus(s: StickerStatus): StickerStatus {
  if (s === "missing") return "owned";
  if (s === "owned") return "repeated";
  return "missing";
}

export function removeRepeated(): StickerStatus {
  return "owned";
}

export function getStatus(map: StickersMap, n: number): StickerStatus {
  return map[n] ?? "missing";
}

export function computeStats(map: StickersMap) {
  let owned = 0;
  let repeated = 0;

  for (let i = 1; i <= TOTAL_STICKERS; i++) {
    const s = map[i] ?? "missing";

    if (s === "owned") owned++;
    else if (s === "repeated") repeated++;
  }

  const haveOne = owned + repeated;
  const missing = TOTAL_STICKERS - haveOne;
  const percent = (haveOne / TOTAL_STICKERS) * 100;

  return { total: TOTAL_STICKERS, owned: haveOne, missing, repeated, percent };
}

export function computeSectionStats(map: StickersMap, section: Section) {
  let owned = 0;
  let repeated = 0;

  for (let i = section.start; i <= section.end; i++) {
    const s = map[i] ?? "missing";

    if (s === "owned") owned++;
    else if (s === "repeated") repeated++;
  }

  const haveOne = owned + repeated;
  const missing = section.count - haveOne;
  const percent = (haveOne / section.count) * 100;

  return { total: section.count, owned: haveOne, missing, repeated, percent };
}

export function vibrate(ms: number | number[] = 8) {
  if (typeof navigator !== "undefined" && "vibrate" in navigator) {
    try {
      navigator.vibrate(ms);
    } catch {
      // Some browsers expose vibrate but block it depending on permissions.
    }
  }
}

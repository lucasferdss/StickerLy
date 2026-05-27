import type { StickerStatus } from "./figurinhas";

export type Filter = "all" | "owned" | "missing" | "repeated";

export function statusMatchesFilter(status: StickerStatus, filter: Filter): boolean {
  if (filter === "all") return true;
  return status === filter;
}

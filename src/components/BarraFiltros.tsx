import { motion } from "framer-motion";
import { Search, X } from "lucide-react";
import type { StickerStatus } from "@/lib/figurinhas";

export type Filter = "all" | "owned" | "missing" | "repeated";

interface Props {
  query: string;
  onQuery: (v: string) => void;
  filter: Filter;
  onFilter: (f: Filter) => void;
}

const filters: { id: Filter; label: string }[] = [
  { id: "all", label: "Todas" },
  { id: "owned", label: "Tenho" },
  { id: "missing", label: "Faltando" },
  { id: "repeated", label: "Repetidas" },
];

export function FilterBar({ query, onQuery, filter, onFilter }: Props) {
  return (
    <div className="space-y-3">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          inputMode="numeric"
          value={query}
          onChange={(e) => onQuery(e.target.value)}
          placeholder="Buscar por número"
          className="w-full h-12 pl-11 pr-10 rounded-2xl bg-secondary/80 text-foreground placeholder:text-muted-foreground border border-white/5 focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
        />
        {query && (
          <button
            onClick={() => onQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 h-6 w-6 rounded-full bg-muted flex items-center justify-center"
            aria-label="Limpar busca"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-1 px-1">
        {filters.map((f) => {
          const active = filter === f.id;
          return (
            <button
              key={f.id}
              onClick={() => onFilter(f.id)}
              className="relative px-4 h-9 rounded-full text-sm font-medium whitespace-nowrap transition-colors"
            >
              {active && (
                <motion.span
                  layoutId="filter-pill"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  className="absolute inset-0 rounded-full bg-foreground"
                />
              )}
              <span className={active ? "relative text-background" : "relative text-muted-foreground"}>
                {f.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function statusMatchesFilter(status: StickerStatus, filter: Filter): boolean {
  if (filter === "all") return true;
  return status === filter;
}

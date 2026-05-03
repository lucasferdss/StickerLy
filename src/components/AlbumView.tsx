import { motion } from "framer-motion";
import { useMemo } from "react";
import { StickerCard } from "@/components/StickerCard";
import { FilterBar, statusMatchesFilter, type Filter } from "@/components/FilterBar";
import { ProgressBar } from "@/components/ProgressBar";
import { StatCard } from "@/components/StatCard";
import { Layers, CheckCircle2, CircleDashed, Copy } from "lucide-react";
import { TOTAL_STICKERS, type StickersMap, getStatus, computeStats } from "@/lib/stickers";

interface Props {
  stickers: StickersMap;
  onToggle: (n: number) => void;
  query: string;
  setQuery: (v: string) => void;
  filter: Filter;
  setFilter: (f: Filter) => void;
}

export function AlbumView({ stickers, onToggle, query, setQuery, filter, setFilter }: Props) {
  const stats = useMemo(() => computeStats(stickers), [stickers]);

  const visible = useMemo(() => {
    const q = query.trim();
    const list: number[] = [];
    for (let i = 1; i <= TOTAL_STICKERS; i++) {
      const status = getStatus(stickers, i);
      if (!statusMatchesFilter(status, filter)) continue;
      if (q && !String(i).includes(q)) continue;
      list.push(i);
    }
    return list;
  }, [stickers, query, filter]);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-3">
        <StatCard label="Tenho" value={stats.owned} icon={CheckCircle2} tone="success" delay={0.05} />
        <StatCard label="Faltam" value={stats.missing} icon={CircleDashed} tone="danger" delay={0.1} />
        <StatCard label="Repetidas" value={stats.repeated} icon={Copy} tone="gold" delay={0.15} />
        <StatCard label="Total" value={stats.total} icon={Layers} tone="primary" delay={0.2} />
      </div>

      <ProgressBar percent={stats.percent} />

      <FilterBar query={query} onQuery={setQuery} filter={filter} onFilter={setFilter} />

      {visible.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="surface rounded-3xl p-10 text-center"
        >
          <p className="text-sm text-muted-foreground">Nenhuma figurinha encontrada.</p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-4 sm:grid-cols-5 gap-2.5 pb-4">
          {visible.map((n) => (
            <StickerCard
              key={n}
              number={n}
              status={getStatus(stickers, n)}
              onToggle={onToggle}
            />
          ))}
        </div>
      )}
    </div>
  );
}

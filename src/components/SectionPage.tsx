import { motion } from "framer-motion";
import { ChevronLeft, Copy, CircleDashed, CheckCircle2 } from "lucide-react";
import { useMemo, useRef } from "react";
import type { Section } from "@/lib/album";
import { computeSectionStats, getStatus, type StickersMap } from "@/lib/stickers";
import { StickerCard } from "@/components/StickerCard";
import type { Filter } from "@/components/FilterBar";
import { statusMatchesFilter } from "@/components/FilterBar";

interface Props {
  section: Section;
  stickers: StickersMap;
  onToggle: (n: number) => void;
  onBack: () => void;
  filter: Filter;
}

export function SectionPage({ section, stickers, onToggle, onBack, filter }: Props) {
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const isEdgeSwipe = useRef(false);

  const stats = useMemo(() => computeSectionStats(stickers, section), [stickers, section]);

  const visible = useMemo(() => {
    const list: number[] = [];

    for (let i = section.start; i <= section.end; i++) {
      if (!statusMatchesFilter(getStatus(stickers, i), filter)) continue;
      list.push(i);
    }

    return list;
  }, [stickers, section, filter]);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];

    touchStartX.current = touch.clientX;
    touchStartY.current = touch.clientY;
    isEdgeSwipe.current = touch.clientX <= 140;
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isEdgeSwipe.current) return;

    const touch = e.changedTouches[0];
    const diffX = touch.clientX - touchStartX.current;
    const diffY = Math.abs(touch.clientY - touchStartY.current);

    if (diffX > 20 && diffY < 160) {
      onBack();
    }

    isEdgeSwipe.current = false;
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -8 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="space-y-5"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1 text-sm text-muted-foreground active:text-foreground"
      >
        <ChevronLeft className="h-4 w-4" />
        Álbum
      </button>

      <div
        className="relative overflow-hidden rounded-[2rem] p-6 border border-white/10"
        style={{
          backgroundImage: `radial-gradient(120% 120% at 0% 0%, ${section.accent}55, transparent 60%), linear-gradient(180deg, hsl(var(--surface-elevated)), hsl(var(--surface)))`,
        }}
      >
        <div className="min-w-0">
          <div className="text-[10px] font-semibold uppercase tracking-widest text-white/60">
            {section.kind === "team"
              ? `Grupo ${section.group} · ${section.short}`
              : "Página Especial"}
          </div>

          <h2 className="text-2xl font-semibold tracking-tight mt-1 text-balance">
            {section.name}
          </h2>
        </div>

        <div className="flex items-baseline justify-between mt-5">
          <span className="text-3xl font-semibold tabular-nums tracking-tight">
            {stats.owned}
            <span className="text-base text-white/50">/{stats.total}</span>
          </span>

          <span className="text-sm font-medium text-white/70 tabular-nums">
            {stats.percent.toFixed(0)}%
          </span>
        </div>

        <div className="h-2 rounded-full bg-white/10 overflow-hidden mt-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${stats.percent}%` }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="h-full rounded-full"
            style={{ background: section.accent }}
          />
        </div>

        <div className="flex gap-3 mt-4 text-[11px]">
          <span className="inline-flex items-center gap-1 text-[hsl(var(--success))]">
            <CheckCircle2 className="h-3 w-3" /> {stats.owned - stats.repeated} únicas
          </span>

          <span className="inline-flex items-center gap-1 text-[hsl(var(--gold))]">
            <Copy className="h-3 w-3" /> {stats.repeated} rep.
          </span>

          <span className="inline-flex items-center gap-1 text-[hsl(var(--destructive))]">
            <CircleDashed className="h-3 w-3" /> {stats.missing} faltam
          </span>
        </div>
      </div>

      {visible.length === 0 ? (
        <div className="surface rounded-3xl p-10 text-center text-sm text-muted-foreground">
          Nenhuma figurinha neste filtro.
        </div>
      ) : (
        <div className="grid grid-cols-4 sm:grid-cols-5 gap-2.5 pb-4">
          {visible.map((n) => (
            <StickerCard
              key={n}
              number={n}
              status={getStatus(stickers, n)}
              onToggle={onToggle}
              short={section.short}
              accent={section.accent}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}
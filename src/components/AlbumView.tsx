import { motion } from "framer-motion";
import { useMemo } from "react";
import { Search, X } from "lucide-react";
import { ProgressBar } from "@/components/ProgressBar";
import { SectionRow } from "@/components/SectionRow";
import { StatCard } from "@/components/StatCard";
import { CheckCircle2, CircleDashed, Copy, Layers } from "lucide-react";
import { computeStats, type StickersMap } from "@/lib/stickers";
import { SECTIONS } from "@/lib/album";

interface Props {
  stickers: StickersMap;
  query: string;
  setQuery: (v: string) => void;
  onOpenSection: (id: string) => void;
}

type Group = { key: string; label: string; sections: typeof SECTIONS };

export function AlbumView({ stickers, query, setQuery, onOpenSection }: Props) {
  const stats = useMemo(() => computeStats(stickers), [stickers]);

  const groups = useMemo<Group[]>(() => {
    const q = query.trim().toLowerCase();
    const filtered = SECTIONS.filter((s) => {
      if (!q) return true;
      return (
        s.name.toLowerCase().includes(q) ||
        s.short.toLowerCase().includes(q) ||
        (s.group && `grupo ${s.group}`.includes(q))
      );
    });

    const specials = filtered.filter((s) => s.kind === "special");
    const teams = filtered.filter((s) => s.kind === "team");

    const byGroup = new Map<string, typeof SECTIONS>();
    for (const t of teams) {
      const key = t.group ?? "?";
      if (!byGroup.has(key)) byGroup.set(key, [] as unknown as typeof SECTIONS);
      (byGroup.get(key) as typeof SECTIONS).push(t);
    }

    const result: Group[] = [];
    if (specials.length) result.push({ key: "special", label: "Páginas Especiais", sections: specials });
    Array.from(byGroup.keys())
      .sort()
      .forEach((g) => {
        result.push({ key: `g-${g}`, label: `Grupo ${g}`, sections: byGroup.get(g)! });
      });

    return result;
  }, [query]);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-3">
        <StatCard label="Tenho" value={stats.owned} icon={CheckCircle2} tone="success" delay={0.05} />
        <StatCard label="Faltam" value={stats.missing} icon={CircleDashed} tone="danger" delay={0.1} />
        <StatCard label="Repetidas" value={stats.repeated} icon={Copy} tone="gold" delay={0.15} />
        <StatCard label="Total" value={stats.total} icon={Layers} tone="primary" delay={0.2} />
      </div>

      <ProgressBar percent={stats.percent} />

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar seleção ou página"
          className="w-full h-12 pl-11 pr-10 rounded-2xl bg-secondary/80 text-foreground placeholder:text-muted-foreground border border-white/5 focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 h-6 w-6 rounded-full bg-muted flex items-center justify-center"
            aria-label="Limpar busca"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {groups.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="surface rounded-3xl p-10 text-center"
        >
          <p className="text-sm text-muted-foreground">Nenhuma página encontrada.</p>
        </motion.div>
      ) : (
        <div className="space-y-6 pb-4">
          {groups.map((g) => (
            <section key={g.key} className="space-y-2.5">
              <h2 className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground px-1">
                {g.label}
              </h2>
              <div className="space-y-2">
                {g.sections.map((s, i) => (
                  <SectionRow
                    key={s.id}
                    section={s}
                    stickers={stickers}
                    onOpen={onOpenSection}
                    delay={i * 0.02}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}

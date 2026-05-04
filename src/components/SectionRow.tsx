import { motion } from "framer-motion";
import { ChevronRight, Check } from "lucide-react";
import type { Section } from "@/lib/album";
import type { StickersMap } from "@/lib/stickers";
import { computeSectionStats } from "@/lib/stickers";

interface Props {
  section: Section;
  stickers: StickersMap;
  onOpen: (id: string) => void;
  delay?: number;
}

export function SectionRow({ section, stickers, onOpen, delay = 0 }: Props) {
  const stats = computeSectionStats(stickers, section);
  const complete = stats.percent >= 100;
  const accent = section.accent ?? "hsl(var(--foreground))";

  return (
    <motion.button
      id={`section-row-${section.id}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] }}
      whileTap={{ scale: 0.985 }}
      onClick={() => onOpen(section.id)}
      className="surface w-full rounded-3xl p-4 flex items-center gap-4 text-left active:bg-secondary/40 transition-colors"
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
            {section.kind === "team" ? `Grupo ${section.group}` : "Especial"}
          </span>

          {complete && (
            <span className="h-4 w-4 rounded-full bg-[hsl(var(--success))] flex items-center justify-center">
              <Check className="h-2.5 w-2.5 text-success-foreground" strokeWidth={3} />
            </span>
          )}
        </div>

        <h3 className="font-semibold tracking-tight truncate">{section.name}</h3>

        <div className="flex items-center gap-2 mt-1.5">
          <div className="flex-1 h-1.5 rounded-full bg-secondary overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${stats.percent}%` }}
              transition={{ duration: 0.9, delay: delay + 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="h-full rounded-full"
              style={{
                background: complete ? "hsl(var(--success))" : accent,
              }}
            />
          </div>

          <span className="text-[11px] font-medium tabular-nums text-muted-foreground shrink-0">
            {stats.owned}/{stats.total}
          </span>
        </div>
      </div>

      <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
    </motion.button>
  );
}
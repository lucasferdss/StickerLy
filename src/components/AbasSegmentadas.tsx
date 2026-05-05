import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type Tab = "album" | "repeated" | "stats";

interface Props {
  tab: Tab;
  onChange: (t: Tab) => void;
}

const tabs: { id: Tab; label: string }[] = [
  { id: "album", label: "Álbum" },
  { id: "repeated", label: "Repetidas" },
  { id: "stats", label: "Estatísticas" },
];

export function SegmentedTabs({ tab, onChange }: Props) {
  return (
    <div className="relative inline-flex items-center p-1 rounded-full bg-secondary/70 border border-white/5">
      {tabs.map((t) => {
        const active = tab === t.id;

        return (
          <button
            key={t.id}
            onClick={() => onChange(t.id)}
            className="relative px-4 h-9 text-sm font-medium rounded-full transition-colors"
          >
            {active && (
              <motion.span
                layoutId="seg-pill"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
                className="absolute inset-0 rounded-full bg-foreground shadow-soft"
              />
            )}

            <span
              className={cn(
                "relative whitespace-nowrap",
                active ? "text-background" : "text-muted-foreground"
              )}
            >
              {t.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
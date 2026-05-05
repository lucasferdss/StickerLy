import { motion } from "framer-motion";
import { cn } from "@/lib/utilitarios";
import type { LucideIcon } from "lucide-react";

interface Props {
  label: string;
  value: number | string;
  icon: LucideIcon;
  tone?: "default" | "success" | "danger" | "gold" | "primary";
  delay?: number;
}

const tones: Record<NonNullable<Props["tone"]>, string> = {
  default: "text-foreground",
  success: "text-[hsl(var(--success))]",
  danger: "text-[hsl(var(--destructive))]",
  gold: "text-[hsl(var(--gold))]",
  primary: "text-[hsl(var(--primary))]",
};

export function StatCard({ label, value, icon: Icon, tone = "default", delay = 0 }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className="surface rounded-3xl p-4 shadow-soft"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          {label}
        </span>
        <Icon className={cn("h-4 w-4", tones[tone])} strokeWidth={2.25} />
      </div>
      <div className={cn("text-3xl font-semibold tabular-nums tracking-tight", tones[tone])}>
        {value}
      </div>
    </motion.div>
  );
}

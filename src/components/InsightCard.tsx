import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  icon: LucideIcon;
  title: string;
  value: string;
  description: string;
  tone?: "primary" | "success" | "danger" | "gold";
  delay?: number;
}

const toneBg: Record<NonNullable<Props["tone"]>, string> = {
  primary: "bg-[hsl(var(--primary)/0.12)] text-[hsl(var(--primary))]",
  success: "bg-[hsl(var(--success)/0.12)] text-[hsl(var(--success))]",
  danger: "bg-[hsl(var(--destructive)/0.12)] text-[hsl(var(--destructive))]",
  gold: "bg-[hsl(var(--gold)/0.12)] text-[hsl(var(--gold))]",
};

export function InsightCard({ icon: Icon, title, value, description, tone = "primary", delay = 0 }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className="surface rounded-3xl p-5 shadow-soft"
    >
      <div className={cn("h-10 w-10 rounded-2xl flex items-center justify-center mb-4", toneBg[tone])}>
        <Icon className="h-5 w-5" strokeWidth={2.25} />
      </div>
      <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {title}
      </div>
      <div className="text-3xl font-semibold tracking-tight tabular-nums mt-1">
        {value}
      </div>
      <p className="text-sm text-muted-foreground mt-2 leading-snug">{description}</p>
    </motion.div>
  );
}

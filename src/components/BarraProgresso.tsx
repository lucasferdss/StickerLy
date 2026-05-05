import { motion } from "framer-motion";

interface Props {
  percent: number;
}

export function ProgressBar({ percent }: Props) {
  const clamped = Math.min(100, Math.max(0, percent));
  return (
    <div className="surface rounded-3xl p-5 shadow-soft">
      <div className="flex items-baseline justify-between mb-3">
        <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Progresso
        </span>
        <span className="text-2xl font-semibold tabular-nums tracking-tight">
          {clamped.toFixed(1)}<span className="text-base text-muted-foreground">%</span>
        </span>
      </div>
      <div className="h-2.5 rounded-full bg-secondary overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${clamped}%` }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="h-full rounded-full bg-gradient-primary shadow-glow"
        />
      </div>
    </div>
  );
}

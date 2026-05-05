import { motion } from "framer-motion";

interface Props {
  percent: number; // 0-100
  size?: number;
  stroke?: number;
}

export function ProgressCircle({ percent, size = 240, stroke = 16 }: Props) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (percent / 100) * c;
  const display = Math.round(percent * 10) / 10;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <defs>
          <linearGradient id="pc-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(224 76% 48%)" />
            <stop offset="100%" stopColor="hsl(46 65% 52%)" />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="hsl(var(--secondary))"
          strokeWidth={stroke}
          fill="none"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="url(#pc-grad)"
          strokeWidth={stroke}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.div
          key={display}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl font-semibold tracking-tight tabular-nums"
        >
          {display.toFixed(1)}
          <span className="text-2xl text-muted-foreground font-medium">%</span>
        </motion.div>
        <div className="text-xs uppercase tracking-widest text-muted-foreground mt-1">
          Concluído
        </div>
      </div>
    </div>
  );
}

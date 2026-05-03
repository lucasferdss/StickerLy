import { motion } from "framer-motion";
import { Check, Copy } from "lucide-react";
import type { StickerStatus } from "@/lib/stickers";
import { cn } from "@/lib/utils";

interface Props {
  number: number;
  status: StickerStatus;
  onToggle: (n: number) => void;
}

const styles: Record<StickerStatus, string> = {
  missing:
    "bg-surface text-muted-foreground border-white/5",
  owned:
    "bg-gradient-success text-success-foreground border-transparent shadow-soft",
  repeated:
    "bg-gradient-gold text-gold-foreground border-transparent shadow-gold",
};

export function StickerCard({ number, status, onToggle }: Props) {
  return (
    <motion.button
      layout
      onClick={() => onToggle(number)}
      whileTap={{ scale: 0.92 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      className={cn(
        "relative aspect-square rounded-2xl border flex flex-col items-center justify-center select-none transition-colors duration-300 ease-apple",
        styles[status]
      )}
      aria-label={`Figurinha ${number} — ${status}`}
    >
      <span className="text-[10px] font-medium uppercase tracking-wider opacity-60">
        Nº
      </span>
      <span className="text-lg font-semibold tabular-nums leading-none mt-0.5">
        {number}
      </span>

      {status === "owned" && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="absolute top-1.5 right-1.5 h-4 w-4 rounded-full bg-white/25 flex items-center justify-center"
        >
          <Check className="h-2.5 w-2.5" strokeWidth={3} />
        </motion.div>
      )}
      {status === "repeated" && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="absolute top-1.5 right-1.5 h-4 w-4 rounded-full bg-black/25 flex items-center justify-center"
        >
          <Copy className="h-2.5 w-2.5" strokeWidth={3} />
        </motion.div>
      )}
    </motion.button>
  );
}

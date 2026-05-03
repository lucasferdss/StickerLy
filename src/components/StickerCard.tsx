import { motion } from "framer-motion";
import { Check, Copy } from "lucide-react";
import type { StickerStatus } from "@/lib/stickers";
import { stickerLocalIndex } from "@/lib/album";
import { cn } from "@/lib/utils";

interface Props {
  number: number;
  status: StickerStatus;
  onToggle: (n: number) => void;
  short?: string;       // e.g. "BRA"
  accent?: string;      // hex used in gradient when owned
}

const styles: Record<StickerStatus, string> = {
  missing:
    "bg-surface text-muted-foreground border-white/5",
  owned:
    "text-success-foreground border-transparent shadow-soft",
  repeated:
    "bg-gradient-gold text-gold-foreground border-transparent shadow-gold",
};

export function StickerCard({ number, status, onToggle, short, accent }: Props) {
  const local = stickerLocalIndex(number);
  const ownedBg =
    status === "owned" && accent
      ? { backgroundImage: `linear-gradient(135deg, ${accent}, ${accent}cc)` }
      : status === "owned"
      ? { backgroundImage: "var(--gradient-success)" }
      : undefined;

  return (
    <motion.button
      layout
      onClick={() => onToggle(number)}
      whileTap={{ scale: 0.92 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      style={ownedBg}
      className={cn(
        "relative aspect-[3/4] rounded-2xl border flex flex-col items-center justify-center select-none transition-colors duration-300 ease-apple overflow-hidden",
        styles[status]
      )}
      aria-label={`Figurinha ${number}`}
    >
      {short && (
        <span className="text-[9px] font-semibold uppercase tracking-[0.15em] opacity-70">
          {short}
        </span>
      )}
      <span className="text-xl font-semibold tabular-nums leading-none mt-1">
        {local.toString().padStart(2, "0")}
      </span>
      <span className="text-[9px] font-medium tabular-nums opacity-50 mt-1">
        #{number}
      </span>

      {status === "owned" && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="absolute top-1.5 right-1.5 h-4 w-4 rounded-full bg-white/30 flex items-center justify-center"
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

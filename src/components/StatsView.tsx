import { motion } from "framer-motion";
import { useMemo } from "react";
import { ProgressCircle } from "@/components/ProgressCircle";
import { InsightCard } from "@/components/InsightCard";
import { CircleDashed, CheckCircle2, Copy, Trophy } from "lucide-react";
import { computeStats, type StickersMap } from "@/lib/stickers";

interface Props {
  stickers: StickersMap;
}

function smartMessage(percent: number, missing: number) {
  if (percent === 0) return "Hora de começar! Cada figurinha conta.";
  if (percent < 25) return "Bom começo. O álbum está nascendo.";
  if (percent < 50) return "Você já está no caminho. Continue trocando!";
  if (percent < 75) return "Mais da metade! Foco nas que faltam.";
  if (percent < 95) return `Quase lá — só ${missing} figurinhas para completar.`;
  if (percent < 100) return "Reta final. Você está prestes a completar!";
  return "Álbum completo. Campeão do mundo das figurinhas! 🏆";
}

export function StatsView({ stickers }: Props) {
  const stats = useMemo(() => computeStats(stickers), [stickers]);
  const message = smartMessage(stats.percent, stats.missing);

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="surface rounded-[2rem] p-8 flex flex-col items-center shadow-soft"
      >
        <ProgressCircle percent={stats.percent} />
        <p className="text-center text-sm text-muted-foreground mt-6 max-w-xs text-balance leading-relaxed">
          {message}
        </p>
      </motion.div>

      <div className="grid grid-cols-2 gap-3">
        <InsightCard
          icon={CircleDashed}
          title="Faltando"
          value={String(stats.missing)}
          description="Figurinhas para completar o álbum."
          tone="danger"
          delay={0.05}
        />
        <InsightCard
          icon={CheckCircle2}
          title="Coletadas"
          value={String(stats.owned)}
          description="Únicas que já estão no álbum."
          tone="success"
          delay={0.1}
        />
        <InsightCard
          icon={Copy}
          title="Repetidas"
          value={String(stats.repeated)}
          description="Disponíveis para troca com amigos."
          tone="gold"
          delay={0.15}
        />
        <InsightCard
          icon={Trophy}
          title="Concluído"
          value={`${stats.percent.toFixed(1)}%`}
          description="Progresso total do álbum 2026."
          tone="primary"
          delay={0.2}
        />
      </div>
    </div>
  );
}

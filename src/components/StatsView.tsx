import { motion } from "framer-motion";
import { useMemo, useEffect, useState } from "react";
import { Trash2, Plus } from "lucide-react";

import { ProgressCircle } from "@/components/ProgressCircle";
import { InsightCard } from "@/components/InsightCard";
import { CircleDashed, CheckCircle2, Copy, Trophy } from "lucide-react";

import { computeStats, type StickersMap } from "@/lib/stickers";
import {
  subscribeCloudExpenses,
  addCloudExpense,
  deleteCloudExpense,
  type Expense,
} from "@/lib/cloudExpenses";

interface Props {
  stickers: StickersMap;
  userId: string;
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

function formatBRL(value: number) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function StatsView({ stickers, userId }: Props) {
  const stats = useMemo(() => computeStats(stickers), [stickers]);
  const message = smartMessage(stats.percent, stats.missing);

  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [input, setInput] = useState("");

  // 🔥 sync realtime com Firebase
  useEffect(() => {
    if (!userId) return;

    const unsub = subscribeCloudExpenses(userId, setExpenses);
    return () => unsub();
  }, [userId]);

  const totalSpent = useMemo(() => {
    return expenses.reduce((acc, e) => acc + e.value, 0);
  }, [expenses]);

  const handleAdd = async () => {
    const value = Number(input.replace(",", "."));

    if (!value || value <= 0) return;

    await addCloudExpense(userId, value);
    setInput("");
  };

  const handleDelete = async (id: string) => {
    await deleteCloudExpense(userId, id);
  };

  return (
    <div className="space-y-6">
      {/* PROGRESSO */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="surface rounded-[2rem] p-8 flex flex-col items-center shadow-soft"
      >
        <ProgressCircle percent={stats.percent} />

        <p className="text-center text-sm text-muted-foreground mt-6 max-w-xs">
          {message}
        </p>
      </motion.div>

      {/* 💰 GASTOS */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="surface rounded-3xl p-5"
      >
        <p className="text-[11px] uppercase tracking-widest text-muted-foreground">
          Gastos no álbum
        </p>

        <h2 className="text-2xl font-semibold mt-1">
          {formatBRL(totalSpent)}
        </h2>

        <p className="text-sm text-muted-foreground">
          Adicione cada compra e o app soma automaticamente.
        </p>

        {/* INPUT */}
        <div className="flex gap-2 mt-4">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ex: 25,00"
            className="flex-1 h-12 px-4 rounded-xl bg-secondary/80 border border-white/5 focus:outline-none"
          />

          <button
            onClick={handleAdd}
            className="h-12 w-12 rounded-xl bg-primary flex items-center justify-center"
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>

        {/* LISTA */}
        <div className="space-y-2 mt-4">
          {expenses.map((e) => (
            <div
              key={e.id}
              className="flex items-center justify-between p-3 rounded-xl bg-secondary/60"
            >
              <div>
                <p className="font-medium">{formatBRL(e.value)}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(e.createdAt).toLocaleDateString("pt-BR")}
                </p>
              </div>

              <button
                onClick={() => handleDelete(e.id)}
                className="h-9 w-9 rounded-full bg-muted flex items-center justify-center"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </motion.div>

      {/* CARDS */}
      <div className="grid grid-cols-2 gap-3">
        <InsightCard
          icon={CircleDashed}
          title="Faltando"
          value={String(stats.missing)}
          description="Figurinhas para completar."
          tone="danger"
        />

        <InsightCard
          icon={CheckCircle2}
          title="Coletadas"
          value={String(stats.owned)}
          description="Já no álbum."
          tone="success"
        />

        <InsightCard
          icon={Copy}
          title="Repetidas"
          value={String(stats.repeated)}
          description="Para troca."
          tone="gold"
        />

        <InsightCard
          icon={Trophy}
          title="Concluído"
          value={`${stats.percent.toFixed(1)}%`}
          description="Progresso total."
          tone="primary"
        />
      </div>
    </div>
  );
}
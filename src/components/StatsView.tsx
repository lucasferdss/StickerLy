import { motion } from "framer-motion";
import { useMemo, useState, useEffect } from "react";
import { ProgressCircle } from "@/components/ProgressCircle";
import { InsightCard } from "@/components/InsightCard";
import { CircleDashed, CheckCircle2, Copy, Trophy, Plus, Trash2 } from "lucide-react";
import { computeStats, type StickersMap } from "@/lib/stickers";

interface Props {
  stickers: StickersMap;
}

type Expense = {
  id: string;
  value: number;
  createdAt: string;
};

const STORAGE_KEY = "stickerly-expenses";

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

function parseMoney(value: string) {
  const cleaned = value.replace(/\./g, "").replace(",", ".");
  const number = Number(cleaned);
  return Number.isFinite(number) ? number : 0;
}

export function StatsView({ stickers }: Props) {
  const stats = useMemo(() => computeStats(stickers), [stickers]);
  const message = smartMessage(stats.percent, stats.missing);

  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [expenseInput, setExpenseInput] = useState("");

  const totalSpent = useMemo(() => {
    return expenses.reduce((total, item) => total + item.value, 0);
  }, [expenses]);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      try {
        setExpenses(JSON.parse(saved));
      } catch {
        setExpenses([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
  }, [expenses]);

  const handleAddExpense = () => {
    const value = parseMoney(expenseInput);

    if (value <= 0) return;

    setExpenses((prev) => [
      {
        id: crypto.randomUUID(),
        value,
        createdAt: new Date().toISOString(),
      },
      ...prev,
    ]);

    setExpenseInput("");
  };

  const handleRemoveExpense = (id: string) => {
    setExpenses((prev) => prev.filter((item) => item.id !== id));
  };

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

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="surface rounded-3xl p-5"
      >
        <p className="text-[11px] uppercase tracking-widest text-muted-foreground">
          Gastos no álbum
        </p>

        <h2 className="text-3xl font-semibold tracking-tight mt-2">
          {formatBRL(totalSpent)}
        </h2>

        <p className="text-sm text-muted-foreground mt-1">
          Adicione cada compra e o app soma automaticamente.
        </p>

        <div className="flex gap-2 mt-4">
          <input
            type="text"
            inputMode="decimal"
            placeholder="Ex: 25,00"
            value={expenseInput}
            onChange={(e) => setExpenseInput(e.target.value)}
            className="flex-1 h-12 px-4 rounded-xl bg-secondary/80 border border-white/5 text-base font-semibold focus:outline-none focus:ring-2 focus:ring-primary/40"
          />

          <button
            onClick={handleAddExpense}
            className="h-12 w-12 rounded-xl bg-primary text-primary-foreground flex items-center justify-center active:scale-95 transition"
            aria-label="Adicionar gasto"
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>

        {expenses.length > 0 && (
          <div className="mt-4 space-y-2">
            {expenses.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-3 rounded-2xl bg-white/5 border border-white/5 px-4 py-3"
              >
                <div>
                  <p className="text-sm font-semibold">{formatBRL(item.value)}</p>
                  <p className="text-[11px] text-muted-foreground">
                    {new Date(item.createdAt).toLocaleDateString("pt-BR")}
                  </p>
                </div>

                <button
                  onClick={() => handleRemoveExpense(item.id)}
                  className="h-9 w-9 rounded-full bg-white/5 flex items-center justify-center text-muted-foreground active:scale-95 transition"
                  aria-label="Remover gasto"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
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
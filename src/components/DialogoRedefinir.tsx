import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

interface Props {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export function ResetDialog({ open, onCancel, onConfirm }: Props) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onCancel}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            initial={{ y: 60, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 60, opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative glass rounded-3xl p-6 w-full max-w-sm shadow-soft"
          >
            <div className="h-12 w-12 rounded-2xl bg-[hsl(var(--destructive)/0.15)] text-[hsl(var(--destructive))] flex items-center justify-center mb-4">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold tracking-tight">Zerar álbum?</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Todas as figurinhas voltarão para o estado “faltando”. Esta ação não pode ser desfeita.
            </p>
            <div className="flex gap-2 mt-6">
              <button
                onClick={onCancel}
                className="flex-1 h-12 rounded-2xl bg-secondary text-foreground font-medium active:scale-[0.98] transition-transform"
              >
                Cancelar
              </button>
              <button
                onClick={onConfirm}
                className="flex-1 h-12 rounded-2xl bg-gradient-danger text-destructive-foreground font-medium active:scale-[0.98] transition-transform shadow-soft"
              >
                Zerar
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

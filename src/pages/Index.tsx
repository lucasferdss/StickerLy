import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { RotateCcw } from "lucide-react";
import { SegmentedTabs, type Tab } from "@/components/SegmentedTabs";
import { AlbumView } from "@/components/AlbumView";
import { StatsView } from "@/components/StatsView";
import { ResetDialog } from "@/components/ResetDialog";
import type { Filter } from "@/components/FilterBar";
import {
  loadStickers,
  saveStickers,
  nextStatus,
  getStatus,
  vibrate,
  type StickersMap,
} from "@/lib/stickers";

const Index = () => {
  const [stickers, setStickers] = useState<StickersMap>({});
  const [tab, setTab] = useState<Tab>("album");
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [resetOpen, setResetOpen] = useState(false);

  useEffect(() => {
    setStickers(loadStickers());
    document.title = "Copa Sticker — Álbum 2026";
  }, []);

  useEffect(() => {
    saveStickers(stickers);
  }, [stickers]);

  const toggleSticker = (n: number) => {
    vibrate(8);
    setStickers((prev) => {
      const cur = getStatus(prev, n);
      const next = nextStatus(cur);
      const copy = { ...prev };
      if (next === "missing") delete copy[n];
      else copy[n] = next;
      return copy;
    });
  };

  const handleReset = () => {
    vibrate([10, 30, 10]);
    setStickers({});
    setResetOpen(false);
  };

  return (
    <div className="min-h-full pb-16">
      {/* Sticky header */}
      <header className="sticky top-0 z-40 glass-strong safe-top">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-2xl bg-gradient-gold shadow-gold flex items-center justify-center text-gold-foreground font-bold text-sm">
              ⚽
            </div>
            <div className="leading-tight">
              <h1 className="text-base font-semibold tracking-tight">Copa Sticker</h1>
              <p className="text-[11px] text-muted-foreground">Álbum 2026</p>
            </div>
          </div>
          <button
            onClick={() => setResetOpen(true)}
            className="h-9 w-9 rounded-full bg-secondary/80 border border-white/5 flex items-center justify-center text-muted-foreground active:scale-95 transition-transform"
            aria-label="Zerar álbum"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>
        <div className="max-w-2xl mx-auto px-4 pb-4 flex justify-center">
          <SegmentedTabs tab={tab} onChange={setTab} />
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 pt-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {tab === "album" ? (
              <AlbumView
                stickers={stickers}
                onToggle={toggleSticker}
                query={query}
                setQuery={setQuery}
                filter={filter}
                setFilter={setFilter}
              />
            ) : (
              <StatsView stickers={stickers} />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      <ResetDialog
        open={resetOpen}
        onCancel={() => setResetOpen(false)}
        onConfirm={handleReset}
      />
    </div>
  );
};

export default Index;

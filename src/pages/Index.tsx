import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { RotateCcw } from "lucide-react";
import type { User } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";

import { SegmentedTabs, type Tab } from "@/components/SegmentedTabs";
import { AlbumView } from "@/components/AlbumView";
import { SectionPage } from "@/components/SectionPage";
import { StatsView } from "@/components/StatsView";
import { ResetDialog } from "@/components/ResetDialog";
import { AuthModal } from "@/components/AuthModal";

import type { Filter } from "@/components/FilterBar";
import { SECTIONS } from "@/lib/album";
import { auth } from "@/lib/firebase";
import { logoutUser } from "@/lib/auth";
import {
  subscribeCloudStickers,
  saveCloudSticker,
  clearCloudStickers,
} from "@/lib/cloudStickers";

import {
  nextStatus,
  getStatus,
  vibrate,
  type StickersMap,
} from "@/lib/stickers";

const Index = () => {
  const [stickers, setStickers] = useState<StickersMap>({});
  const [tab, setTab] = useState<Tab>("album");
  const [query, setQuery] = useState("");
  const [filter] = useState<Filter>("all");
  const [resetOpen, setResetOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  const restoreSectionIdRef = useRef<string | null>(null);

  useEffect(() => {
    document.title = "StickerLy — FIFA WORLD CUP 2026";

    const unsubAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });

    return () => unsubAuth();
  }, []);

  useEffect(() => {
    if (!user) return;

    const unsubscribe = subscribeCloudStickers(user.uid, (cloudStickers) => {
      setStickers(cloudStickers);
    });

    return () => unsubscribe();
  }, [user]);

  useEffect(() => {
    if (!activeSectionId && restoreSectionIdRef.current) {
      const id = restoreSectionIdRef.current;

      requestAnimationFrame(() => {
        const el = document.getElementById(`section-row-${id}`);

        if (el) {
          el.scrollIntoView({
            behavior: "auto",
            block: "center",
          });
        }

        restoreSectionIdRef.current = null;
      });
    }
  }, [activeSectionId]);

  const activeSection = useMemo(
    () => SECTIONS.find((s) => s.id === activeSectionId) ?? null,
    [activeSectionId]
  );

  const toggleSticker = (n: number) => {
    if (!user) return;

    vibrate(8);

    setStickers((prev) => {
      const cur = getStatus(prev, n);
      const next = nextStatus(cur);
      const copy = { ...prev };

      if (next === "missing") delete copy[n];
      else copy[n] = next;

      saveCloudSticker(user.uid, n, next);

      return copy;
    });
  };

  const handleReset = async () => {
    if (!user) return;

    vibrate([10, 30, 10]);

    setStickers({});
    setResetOpen(false);
    setActiveSectionId(null);
    restoreSectionIdRef.current = null;
    window.scrollTo({ top: 0, behavior: "auto" });

    await clearCloudStickers(user.uid);
  };

  const handleOpenSection = (id: string) => {
    restoreSectionIdRef.current = id;
    setActiveSectionId(id);
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  const handleLogout = async () => {
    await logoutUser();
    setUser(null);
    setStickers({});
    setActiveSectionId(null);
    restoreSectionIdRef.current = null;
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  const avatarLetter =
    user?.displayName?.charAt(0).toUpperCase() ||
    user?.email?.charAt(0).toUpperCase() ||
    "U";

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <p className="text-sm text-muted-foreground">Carregando...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <>
        <div className="min-h-screen flex items-center justify-center px-6 text-center">
          <div className="max-w-sm">
            <h1 className="text-4xl font-semibold tracking-tight">StickerLy</h1>

            <p className="text-sm text-muted-foreground mt-3">
              Crie uma conta ou faça login para gerenciar seu álbum da Copa 2026.
            </p>

            <button
              onClick={() => setAuthOpen(true)}
              className="mt-7 h-12 px-6 rounded-2xl bg-primary text-primary-foreground text-sm font-semibold active:scale-95 transition"
            >
              Entrar ou criar conta
            </button>
          </div>
        </div>

        <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
      </>
    );
  }

  return (
    <div className="min-h-full pb-16">
      <header className="sticky top-0 z-40 glass-strong safe-top">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <div>
            <h1 className="text-base font-semibold tracking-tight">StickerLy</h1>
            <p className="text-[11px] text-muted-foreground">
              FIFA WORLD CUP 2026
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-full bg-secondary/80 border border-white/5 pl-1 pr-3 py-1 active:scale-95 transition"
            >
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="Avatar"
                  className="h-8 w-8 rounded-full object-cover"
                />
              ) : (
                <span className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                  {avatarLetter}
                </span>
              )}

              <span className="text-xs text-muted-foreground">Sair</span>
            </button>

            <button
              onClick={() => setResetOpen(true)}
              className="h-9 w-9 rounded-full bg-secondary/80 border border-white/5 flex items-center justify-center text-muted-foreground active:scale-95 transition-transform"
              aria-label="Zerar álbum"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-4 pb-4 flex justify-center">
          <SegmentedTabs
            tab={tab}
            onChange={(t) => {
              setTab(t);
              setActiveSectionId(null);
              restoreSectionIdRef.current = null;
              window.scrollTo({ top: 0, behavior: "auto" });
            }}
          />
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 pt-5">
        {tab === "stats" ? (
          <motion.div
            key="stats"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <StatsView stickers={stickers} />
          </motion.div>
        ) : activeSection ? (
          <SectionPage
            key={`section-${activeSection.id}`}
            section={activeSection}
            stickers={stickers}
            onToggle={toggleSticker}
            onBack={() => setActiveSectionId(null)}
            filter={filter}
          />
        ) : (
          <motion.div
            key="album-index"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <AlbumView
              stickers={stickers}
              query={query}
              setQuery={setQuery}
              onOpenSection={handleOpenSection}
            />
          </motion.div>
        )}
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
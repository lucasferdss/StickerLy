import { useEffect, useMemo, useRef, useState } from "react";
import { RotateCcw } from "lucide-react";
import type { User } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";

import { SegmentedTabs, type Tab } from "@/components/AbasSegmentadas";
import { AlbumView } from "@/components/VisaoAlbum";
import { SectionPage } from "@/components/PaginaSecao";
import { StatsView } from "@/components/VisaoEstatisticas";
import { ResetDialog } from "@/components/DialogoRedefinir";
import { AuthModal } from "@/components/ModalAutenticacao";
import { StickerCard } from "@/components/CardFigurinha";

import type { Filter } from "@/components/BarraFiltros";
import { SECTIONS, sectionOf } from "@/lib/album";
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

  // 🔥 ESSA LINHA É A CHAVE DO SCROLL
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

  const activeSection = useMemo(
    () => SECTIONS.find((s) => s.id === activeSectionId) ?? null,
    [activeSectionId]
  );

  const repeatedGrouped = useMemo(() => {
    const groups: Record<string, number[]> = {};

    Object.entries(stickers).forEach(([nStr, status]) => {
      if (status !== "repeated") return;

      const n = Number(nStr);
      const section = sectionOf(n);
      if (!section) return;

      if (!groups[section.id]) groups[section.id] = [];
      groups[section.id].push(n);
    });

    Object.values(groups).forEach((list) => list.sort((a, b) => a - b));

    return groups;
  }, [stickers]);

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

  const removeRepeatedSticker = (n: number) => {
    if (!user) return;

    vibrate(8);

    setStickers((prev) => {
      const copy = { ...prev };
      copy[n] = "owned";

      saveCloudSticker(user.uid, n, "owned");
      return copy;
    });
  };

  const handleReset = async () => {
    if (!user) return;

    vibrate([10, 30, 10]);

    setStickers({});
    setResetOpen(false);
    setActiveSectionId(null);

    await clearCloudStickers(user.uid);
  };

  const handleLogout = async () => {
    await logoutUser();
    setUser(null);
    setStickers({});
    setActiveSectionId(null);
  };

  const avatarLetter =
    user?.displayName?.charAt(0).toUpperCase() ||
    user?.email?.charAt(0).toUpperCase() ||
    "U";

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-sm text-muted-foreground">Carregando...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <>
        <div className="min-h-screen flex items-center justify-center text-center">
          <div>
            <h1 className="text-3xl font-semibold">StickerLy</h1>

            <button
              onClick={() => setAuthOpen(true)}
              className="mt-6 h-12 px-6 rounded-2xl bg-primary text-primary-foreground"
            >
              Entrar
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
              className="h-9 rounded-full bg-secondary/80 border border-white/5 pl-1 pr-3 flex items-center gap-2 active:scale-95 transition"
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
              className="h-9 rounded-full bg-secondary/80 border border-white/5 px-3 flex items-center gap-2 text-muted-foreground active:scale-95 transition"
            >
              <RotateCcw className="h-4 w-4" />
              <span className="text-xs">Redefinir</span>
            </button>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-4 pb-4 flex justify-center">
          <SegmentedTabs tab={tab} onChange={setTab} />
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 pt-5">
        {tab === "stats" ? (
          <StatsView stickers={stickers} userId={user.uid} />
        ) : tab === "repeated" ? (
          <div className="space-y-6">
            {Object.entries(repeatedGrouped).map(([sectionId, list]) => {
              const section = SECTIONS.find((s) => s.id === sectionId);
              if (!section) return null;

              return (
                <div key={sectionId} className="space-y-2">
                  <h2 className="text-xs uppercase text-muted-foreground px-1">
                    {section.name}
                  </h2>

                  <div className="grid grid-cols-4 sm:grid-cols-5 gap-2.5">
                    {list.map((n) => (
                      <StickerCard
                        key={n}
                        number={n}
                        status={getStatus(stickers, n)}
                        onToggle={removeRepeatedSticker}
                        short={section.short}
                        accent={section.accent}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : activeSection ? (
          <SectionPage
            section={activeSection}
            stickers={stickers}
            onToggle={toggleSticker}
            onBack={() => {
              setActiveSectionId(null);

              requestAnimationFrame(() => {
                const id = restoreSectionIdRef.current;
                if (!id) return;

                const el = document.getElementById(`section-row-${id}`);

                if (el) {
                  el.scrollIntoView({
                    behavior: "auto",
                    block: "center",
                  });
                }

                restoreSectionIdRef.current = null;
              });
            }}
            filter={filter}
          />
        ) : (
          <AlbumView
            stickers={stickers}
            query={query}
            setQuery={setQuery}
            onOpenSection={(id) => {
              restoreSectionIdRef.current = id;
              setActiveSectionId(id);
              window.scrollTo({ top: 0, behavior: "auto" });
            }}
          />
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
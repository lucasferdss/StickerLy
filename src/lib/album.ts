// Panini-style album structure for FIFA World Cup 2026.
// 48 teams (new format) × 12 stickers each = 576
// + Special sections = 94
// Total = 670 (matches TOTAL_STICKERS)

export type SectionKind = "special" | "team";

export interface Section {
  id: string;
  kind: SectionKind;
  name: string;
  short: string;          // 3-letter code (e.g. BRA) or special prefix
  flag?: string;          // emoji flag for teams
  accent?: string;        // hex color used for header glow
  count: number;          // number of stickers in this section
  start: number;          // first sticker number (inclusive)
  end: number;            // last sticker number (inclusive)
  group?: string;         // FIFA group letter (A-L) for teams
}

interface RawTeam {
  name: string;
  short: string;
  flag: string;
  accent: string;
  group: string;
}

// Plausible 48-team lineup grouped A–L (3 teams × 12 groups → top 2 + best 8 thirds advance).
const TEAMS: RawTeam[] = [
  // Group A
  { name: "México", short: "MEX", flag: "🇲🇽", accent: "#1f7a3a", group: "A" },
  { name: "Equador", short: "ECU", flag: "🇪🇨", accent: "#ffcd00", group: "A" },
  { name: "Marrocos", short: "MAR", flag: "🇲🇦", accent: "#c1272d", group: "A" },
  // Group B
  { name: "Canadá", short: "CAN", flag: "🇨🇦", accent: "#d52b1e", group: "B" },
  { name: "Croácia", short: "CRO", flag: "🇭🇷", accent: "#171796", group: "B" },
  { name: "Japão", short: "JPN", flag: "🇯🇵", accent: "#bc002d", group: "B" },
  // Group C
  { name: "EUA", short: "USA", flag: "🇺🇸", accent: "#3c3b6e", group: "C" },
  { name: "Inglaterra", short: "ENG", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", accent: "#ce1124", group: "C" },
  { name: "Senegal", short: "SEN", flag: "🇸🇳", accent: "#00853f", group: "C" },
  // Group D
  { name: "Brasil", short: "BRA", flag: "🇧🇷", accent: "#ffdf00", group: "D" },
  { name: "Suíça", short: "SUI", flag: "🇨🇭", accent: "#d52b1e", group: "D" },
  { name: "Camarões", short: "CMR", flag: "🇨🇲", accent: "#007a5e", group: "D" },
  // Group E
  { name: "Argentina", short: "ARG", flag: "🇦🇷", accent: "#75aadb", group: "E" },
  { name: "Países Baixos", short: "NED", flag: "🇳🇱", accent: "#ff6c00", group: "E" },
  { name: "Coreia do Sul", short: "KOR", flag: "🇰🇷", accent: "#cd2e3a", group: "E" },
  // Group F
  { name: "França", short: "FRA", flag: "🇫🇷", accent: "#0055a4", group: "F" },
  { name: "Uruguai", short: "URU", flag: "🇺🇾", accent: "#7cb9e8", group: "F" },
  { name: "Austrália", short: "AUS", flag: "🇦🇺", accent: "#00843d", group: "F" },
  // Group G
  { name: "Espanha", short: "ESP", flag: "🇪🇸", accent: "#aa151b", group: "G" },
  { name: "Sérvia", short: "SRB", flag: "🇷🇸", accent: "#c6363c", group: "G" },
  { name: "Costa do Marfim", short: "CIV", flag: "🇨🇮", accent: "#ff7900", group: "G" },
  // Group H
  { name: "Alemanha", short: "GER", flag: "🇩🇪", accent: "#1a1a1a", group: "H" },
  { name: "Dinamarca", short: "DEN", flag: "🇩🇰", accent: "#c8102e", group: "H" },
  { name: "Egito", short: "EGY", flag: "🇪🇬", accent: "#ce1126", group: "H" },
  // Group I
  { name: "Portugal", short: "POR", flag: "🇵🇹", accent: "#046a38", group: "I" },
  { name: "Polônia", short: "POL", flag: "🇵🇱", accent: "#dc143c", group: "I" },
  { name: "Gana", short: "GHA", flag: "🇬🇭", accent: "#fcd116", group: "I" },
  // Group J
  { name: "Bélgica", short: "BEL", flag: "🇧🇪", accent: "#fdda24", group: "J" },
  { name: "Colômbia", short: "COL", flag: "🇨🇴", accent: "#fcd116", group: "J" },
  { name: "Tunísia", short: "TUN", flag: "🇹🇳", accent: "#e70013", group: "J" },
  // Group K
  { name: "Itália", short: "ITA", flag: "🇮🇹", accent: "#0066cc", group: "K" },
  { name: "Chile", short: "CHI", flag: "🇨🇱", accent: "#d52b1e", group: "K" },
  { name: "Nigéria", short: "NGA", flag: "🇳🇬", accent: "#008753", group: "K" },
  // Group L
  { name: "Países de Gales", short: "WAL", flag: "🏴󠁧󠁢󠁷󠁬󠁳󠁿", accent: "#c8102e", group: "L" },
  { name: "Paraguai", short: "PAR", flag: "🇵🇾", accent: "#0038a8", group: "L" },
  { name: "Arábia Saudita", short: "KSA", flag: "🇸🇦", accent: "#006c35", group: "L" },
  // Extras to reach 48
  { name: "Escócia", short: "SCO", flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", accent: "#0065bd", group: "A" },
  { name: "Peru", short: "PER", flag: "🇵🇪", accent: "#d91023", group: "B" },
  { name: "Argélia", short: "ALG", flag: "🇩🇿", accent: "#006233", group: "C" },
  { name: "Turquia", short: "TUR", flag: "🇹🇷", accent: "#e30a17", group: "D" },
  { name: "Áustria", short: "AUT", flag: "🇦🇹", accent: "#ed2939", group: "E" },
  { name: "República Tcheca", short: "CZE", flag: "🇨🇿", accent: "#11457e", group: "F" },
  { name: "Catar", short: "QAT", flag: "🇶🇦", accent: "#8a1538", group: "G" },
  { name: "Suécia", short: "SWE", flag: "🇸🇪", accent: "#006aa7", group: "H" },
  { name: "Noruega", short: "NOR", flag: "🇳🇴", accent: "#ba0c2f", group: "I" },
  { name: "Nova Zelândia", short: "NZL", flag: "🇳🇿", accent: "#00247d", group: "J" },
  { name: "Mali", short: "MLI", flag: "🇲🇱", accent: "#14b53a", group: "K" },
  { name: "Panamá", short: "PAN", flag: "🇵🇦", accent: "#005293", group: "L" },
];

const TEAM_STICKERS = 12;

interface RawSpecial {
  id: string;
  name: string;
  short: string;
  count: number;
  accent: string;
}

const SPECIAL: RawSpecial[] = [
  { id: "intro", name: "Bem-vindo ao Mundial", short: "FWC", count: 6, accent: "#7c5cff" },
  { id: "trophy", name: "O Troféu", short: "TRP", count: 4, accent: "#e6b450" },
  { id: "mascot", name: "Mascotes 2026", short: "MAS", count: 6, accent: "#ff5e7a" },
  { id: "hosts", name: "Países-Sede", short: "HST", count: 12, accent: "#3da5ff" },
  { id: "stadiums", name: "Estádios", short: "STD", count: 16, accent: "#41c7c7" },
  { id: "ball", name: "A Bola Oficial", short: "BAL", count: 4, accent: "#ffffff" },
  { id: "legends", name: "Lendas da Copa", short: "LGD", count: 18, accent: "#ffd66b" },
  { id: "rising", name: "Estrelas em Ascensão", short: "RIS", count: 14, accent: "#a3ff7a" },
  { id: "iconic", name: "Momentos Icônicos", short: "ICO", count: 14, accent: "#ff8a3d" },
];

export const SECTIONS: Section[] = (() => {
  const list: Section[] = [];
  let cursor = 1;

  for (const s of SPECIAL) {
    list.push({
      id: `s-${s.id}`,
      kind: "special",
      name: s.name,
      short: s.short,
      accent: s.accent,
      count: s.count,
      start: cursor,
      end: cursor + s.count - 1,
    });
    cursor += s.count;
  }

  for (const t of TEAMS) {
    list.push({
      id: `t-${t.short}`,
      kind: "team",
      name: t.name,
      short: t.short,
      flag: t.flag,
      accent: t.accent,
      count: TEAM_STICKERS,
      start: cursor,
      end: cursor + TEAM_STICKERS - 1,
      group: t.group,
    });
    cursor += TEAM_STICKERS;
  }

  return list;
})();

// Sanity: should equal 670
export const ALBUM_TOTAL = SECTIONS.reduce((acc, s) => acc + s.count, 0);

// Map sticker number → section
const SECTION_BY_STICKER: Section[] = (() => {
  const arr: Section[] = new Array(ALBUM_TOTAL + 1);
  for (const s of SECTIONS) {
    for (let i = s.start; i <= s.end; i++) arr[i] = s;
  }
  return arr;
})();

export function sectionOf(n: number): Section | undefined {
  return SECTION_BY_STICKER[n];
}

export function stickerCode(n: number): string {
  const s = sectionOf(n);
  if (!s) return String(n);
  const local = n - s.start + 1;
  return `${s.short} ${local.toString().padStart(2, "0")}`;
}

export function stickerLocalIndex(n: number): number {
  const s = sectionOf(n);
  if (!s) return n;
  return n - s.start + 1;
}

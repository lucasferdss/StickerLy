export type SectionKind = "special" | "team";

export interface Section {
  id: string;
  kind: SectionKind;
  name: string;
  short: string;
  flag?: string;
  accent?: string;
  count: number;
  start: number;
  end: number;
  group?: string;
}

interface RawTeam {
  name: string;
  short: string;
  flag: string;
  accent: string;
  group: string;
}

const TEAM_STICKERS = 20;

const TEAMS: RawTeam[] = [
  // GRUPO A
  { name: "México", short: "MEX", flag: "🇲🇽", accent: "#006847", group: "A" },
  { name: "África do Sul", short: "RSA", flag: "🇿🇦", accent: "#007749", group: "A" },
  { name: "Coreia do Sul", short: "KOR", flag: "🇰🇷", accent: "#cd2e3a", group: "A" },
  { name: "República Tcheca", short: "CZE", flag: "🇨🇿", accent: "#11457e", group: "A" },

  // GRUPO B
  { name: "Canadá", short: "CAN", flag: "🇨🇦", accent: "#d52b1e", group: "B" },
  { name: "Bósnia-Herzegovina", short: "BIH", flag: "🇧🇦", accent: "#002f6c", group: "B" },
  { name: "Catar", short: "QAT", flag: "🇶🇦", accent: "#8a1538", group: "B" },
  { name: "Suíça", short: "SUI", flag: "🇨🇭", accent: "#d52b1e", group: "B" },

  // GRUPO C
  { name: "Brasil", short: "BRA", flag: "🇧🇷", accent: "#ffdf00", group: "C" },
  { name: "Marrocos", short: "MAR", flag: "🇲🇦", accent: "#c1272d", group: "C" },
  { name: "Haiti", short: "HAI", flag: "🇭🇹", accent: "#00209f", group: "C" },
  { name: "Escócia", short: "SCO", flag: "🏴", accent: "#0065bd", group: "C" },

  // GRUPO D
  { name: "EUA", short: "USA", flag: "🇺🇸", accent: "#3c3b6e", group: "D" },
  { name: "Paraguai", short: "PAR", flag: "🇵🇾", accent: "#0038a8", group: "D" },
  { name: "Austrália", short: "AUS", flag: "🇦🇺", accent: "#00843d", group: "D" },
  { name: "Turquia", short: "TUR", flag: "🇹🇷", accent: "#e30a17", group: "D" },

  // GRUPO E
  { name: "Alemanha", short: "GER", flag: "🇩🇪", accent: "#1a1a1a", group: "E" },
  { name: "Curaçao", short: "CUW", flag: "🇨🇼", accent: "#002b7f", group: "E" },
  { name: "Costa do Marfim", short: "CIV", flag: "🇨🇮", accent: "#ff7900", group: "E" },
  { name: "Equador", short: "ECU", flag: "🇪🇨", accent: "#ffcd00", group: "E" },

  // GRUPO F
  { name: "Holanda", short: "NED", flag: "🇳🇱", accent: "#ff6c00", group: "F" },
  { name: "Japão", short: "JPN", flag: "🇯🇵", accent: "#bc002d", group: "F" },
  { name: "Suécia", short: "SWE", flag: "🇸🇪", accent: "#006aa7", group: "F" },
  { name: "Tunísia", short: "TUN", flag: "🇹🇳", accent: "#e70013", group: "F" },

  // GRUPO G
  { name: "Bélgica", short: "BEL", flag: "🇧🇪", accent: "#fdda24", group: "G" },
  { name: "Egito", short: "EGY", flag: "🇪🇬", accent: "#ce1126", group: "G" },
  { name: "Irã", short: "IRN", flag: "🇮🇷", accent: "#239f40", group: "G" },
  { name: "Nova Zelândia", short: "NZL", flag: "🇳🇿", accent: "#00247d", group: "G" },

  // GRUPO H
  { name: "Espanha", short: "ESP", flag: "🇪🇸", accent: "#aa151b", group: "H" },
  { name: "Cabo Verde", short: "CPV", flag: "🇨🇻", accent: "#003893", group: "H" },
  { name: "Arábia Saudita", short: "KSA", flag: "🇸🇦", accent: "#006c35", group: "H" },
  { name: "Uruguai", short: "URU", flag: "🇺🇾", accent: "#7cb9e8", group: "H" },

  // GRUPO I
  { name: "França", short: "FRA", flag: "🇫🇷", accent: "#0055a4", group: "I" },
  { name: "Senegal", short: "SEN", flag: "🇸🇳", accent: "#00853f", group: "I" },
  { name: "Iraque", short: "IRQ", flag: "🇮🇶", accent: "#ce1126", group: "I" },
  { name: "Noruega", short: "NOR", flag: "🇳🇴", accent: "#ba0c2f", group: "I" },

  // GRUPO J
  { name: "Argentina", short: "ARG", flag: "🇦🇷", accent: "#75aadb", group: "J" },
  { name: "Argélia", short: "ALG", flag: "🇩🇿", accent: "#006233", group: "J" },
  { name: "Áustria", short: "AUT", flag: "🇦🇹", accent: "#ed2939", group: "J" },
  { name: "Jordânia", short: "JOR", flag: "🇯🇴", accent: "#ce1126", group: "J" },

  // GRUPO K
  { name: "Portugal", short: "POR", flag: "🇵🇹", accent: "#046a38", group: "K" },
  { name: "Congo DR", short: "COD", flag: "🇨🇩", accent: "#00a3e0", group: "K" },
  { name: "Uzbequistão", short: "UZB", flag: "🇺🇿", accent: "#1eb53a", group: "K" },
  { name: "Colômbia", short: "COL", flag: "🇨🇴", accent: "#fcd116", group: "K" },

  // GRUPO L
  { name: "Inglaterra", short: "ENG", flag: "🏴", accent: "#ce1124", group: "L" },
  { name: "Croácia", short: "CRO", flag: "🇭🇷", accent: "#171796", group: "L" },
  { name: "Gana", short: "GHA", flag: "🇬🇭", accent: "#fcd116", group: "L" },
  { name: "Panamá", short: "PAN", flag: "🇵🇦", accent: "#005293", group: "L" },
];

interface RawSpecial {
  id: string;
  name: string;
  short: string;
  count: number;
  accent: string;
}

const SPECIAL: RawSpecial[] = [
  { id: "panini", name: "Panini", short: "Panini", count: 1, accent: "#facc15" },
  { id: "coca-cola", name: "Coca Cola", short: "CC", count: 14, accent: "#F40009" },
  { id: "fwc", name: "FIFA World Cup", short: "FWC", count: 19, accent: "#3f3f46" },
];

export const SECTIONS: Section[] = (() => {
  const list: Section[] = [];
  let cursor = 0;

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

export const ALBUM_TOTAL = SECTIONS.reduce((acc, s) => acc + s.count, 0);

const SECTION_BY_STICKER: Section[] = (() => {
  const arr: Section[] = new Array(ALBUM_TOTAL + 1);

  for (const s of SECTIONS) {
    for (let i = s.start; i <= s.end; i++) {
      arr[i] = s;
    }
  }

  return arr;
})();

export function sectionOf(n: number): Section | undefined {
  return SECTION_BY_STICKER[n];
}

export function stickerCode(n: number): string {
  const s = sectionOf(n);
  if (!s) return String(n);

  if (s.id === "s-panini") {
    return "PANINI 00";
  }

  const local = n - s.start + 1;

  if (s.id === "s-fwc") {
    return `FWC ${local}`;
  }

  if (s.id === "s-coca-cola") {
    return `CC${local}`;
  }

  return `${s.short} ${local.toString().padStart(2, "0")}`;
}

export function stickerLocalIndex(n: number): number {
  const s = sectionOf(n);
  if (!s) return n;

  if (s.id === "s-panini") {
    return 0;
  }

  return n - s.start + 1;
}
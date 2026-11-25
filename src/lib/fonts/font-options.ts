/**
 * Fontes selecionáveis: módulo puro (sem `next/font`), usado na validação das
 * preferências e nos controles de UI. Os loaders ficam em `./registry`.
 */
export const FONT_OPTIONS = [
  { value: "geist", label: "Geist" },
  { value: "inter", label: "Inter" },
  { value: "notoSans", label: "Noto Sans" },
  { value: "nunitoSans", label: "Nunito Sans" },
  { value: "figtree", label: "Figtree" },
  { value: "roboto", label: "Roboto" },
  { value: "raleway", label: "Raleway" },
  { value: "dmSans", label: "DM Sans" },
  { value: "publicSans", label: "Public Sans" },
  { value: "outfit", label: "Outfit" },
  { value: "geistMono", label: "Geist Mono" },
  { value: "geistPixelSquare", label: "Geist Pixel Square" },
  { value: "jetBrainsMono", label: "JetBrains Mono" },
  { value: "geistSerif", label: "Geist Serif" },
  { value: "notoSerif", label: "Noto Serif" },
  { value: "robotoSlab", label: "Roboto Slab" },
  { value: "merriweather", label: "Merriweather" },
  { value: "lora", label: "Lora" },
  { value: "playfairDisplay", label: "Playfair Display" },
] as const;

export type FontKey = (typeof FONT_OPTIONS)[number]["value"];

export const FONT_KEYS = FONT_OPTIONS.map((option) => option.value);

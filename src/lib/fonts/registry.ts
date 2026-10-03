// Self-hosted fonts preserve the template's default typography without external requests.
export const fontRegistry = {
  geist: { label: "Geist", font: {variable:"font-geist-local"}},
  geistMono: { label: "Geist Mono", font: {variable:"font-geist-mono-local"}},
  geistPixelSquare: {label:"Geist Pixel Square", font:{variable:"font-geist-pixel-local"}},
} as const;
export type FontKey = keyof typeof fontRegistry;
export const fontKeys=Object.keys(fontRegistry) as FontKey[];
export const fontVars="font-geist-local font-geist-mono-local font-geist-pixel-local";
export const fontOptions=fontKeys.map(key=>({key,label:fontRegistry[key].label}));

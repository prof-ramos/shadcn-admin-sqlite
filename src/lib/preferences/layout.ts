/**
 * Opções de layout: fonte única para valores aceitos (validação no registry)
 * e rótulos exibidos nos controles de preferência. A ordem é a ordem de exibição.
 */

export const SIDEBAR_VARIANT_OPTIONS = [
  { label: "Interno", value: "inset" },
  { label: "Barra lateral", value: "sidebar" },
  { label: "Flutuante", value: "floating" },
] as const;
export const SIDEBAR_VARIANT_VALUES = SIDEBAR_VARIANT_OPTIONS.map((v) => v.value);
export type SidebarVariant = (typeof SIDEBAR_VARIANT_VALUES)[number];

export const SIDEBAR_COLLAPSIBLE_OPTIONS = [
  { label: "Ícone", value: "icon" },
  { label: "Off-canvas", value: "offcanvas" },
] as const;
export const SIDEBAR_COLLAPSIBLE_VALUES = SIDEBAR_COLLAPSIBLE_OPTIONS.map((v) => v.value);
export type SidebarCollapsible = (typeof SIDEBAR_COLLAPSIBLE_VALUES)[number];

export const CONTENT_LAYOUT_OPTIONS = [
  { label: "Centralizado", value: "centered" },
  { label: "Largura total", value: "full-width" },
] as const;
export const CONTENT_LAYOUT_VALUES = CONTENT_LAYOUT_OPTIONS.map((v) => v.value);
export type ContentLayout = (typeof CONTENT_LAYOUT_VALUES)[number];

export const NAVBAR_STYLE_OPTIONS = [
  { label: "Fixo", value: "sticky" },
  { label: "Rolagem", value: "scroll" },
] as const;
export const NAVBAR_STYLE_VALUES = NAVBAR_STYLE_OPTIONS.map((v) => v.value);
export type NavbarStyle = (typeof NAVBAR_STYLE_VALUES)[number];

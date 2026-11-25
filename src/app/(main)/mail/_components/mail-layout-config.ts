export const MAIL_LAYOUT_COOKIE = "mail_panel_layout";

export const MAIL_LIST_PANEL_ID = "mail-message-list-panel";
export const MAIL_DETAIL_PANEL_ID = "mail-message-detail-panel";

export const DEFAULT_MAIL_LAYOUT = [38, 62] as const;

export type MailLayout = [number, number];

/** Converte o valor bruto do cookie em layout válido; qualquer valor malformado cai no padrão. */
export function parseMailLayout(raw: string | undefined): MailLayout {
  if (raw) {
    try {
      const parsed: unknown = JSON.parse(raw);
      if (
        Array.isArray(parsed) &&
        parsed.length === DEFAULT_MAIL_LAYOUT.length &&
        parsed.every((size) => typeof size === "number" && Number.isFinite(size) && size > 0 && size < 100)
      ) {
        return [parsed[0], parsed[1]];
      }
    } catch {
      // cookie corrompido: usa o padrão
    }
  }

  return [...DEFAULT_MAIL_LAYOUT];
}

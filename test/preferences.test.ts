import { describe, expect, it } from "vitest";

import {
  CONTENT_LAYOUT_OPTIONS,
  NAVBAR_STYLE_OPTIONS,
  SIDEBAR_COLLAPSIBLE_OPTIONS,
  SIDEBAR_VARIANT_OPTIONS,
} from "@/lib/preferences/layout";
import {
  getPreferenceAttributes,
  PREFERENCE_DEFAULTS,
  PREFERENCE_REGISTRY,
  type PreferenceKey,
  parsePreference,
} from "@/lib/preferences/preferences-config";
import { THEME_MODE_OPTIONS } from "@/lib/preferences/theme";

const OPTIONS_BY_KEY = {
  theme_mode: THEME_MODE_OPTIONS,
  content_layout: CONTENT_LAYOUT_OPTIONS,
  navbar_style: NAVBAR_STYLE_OPTIONS,
  sidebar_variant: SIDEBAR_VARIANT_OPTIONS,
  sidebar_collapsible: SIDEBAR_COLLAPSIBLE_OPTIONS,
} satisfies Partial<Record<PreferenceKey, readonly { label: string; value: string }[]>>;

describe("preferências", () => {
  it.each(Object.entries(OPTIONS_BY_KEY))("opções de %s cobrem exatamente os valores do registry", (key, options) => {
    const values = PREFERENCE_REGISTRY[key as PreferenceKey].values;
    expect(options.map((o) => o.value).sort()).toEqual([...values].sort());
  });

  it("getPreferenceAttributes gera um data-attribute por preferência", () => {
    const attributes = getPreferenceAttributes(PREFERENCE_DEFAULTS);
    expect(Object.keys(attributes)).toHaveLength(Object.keys(PREFERENCE_REGISTRY).length);
    expect(attributes["data-sidebar-variant"]).toBe(PREFERENCE_DEFAULTS.sidebar_variant);
    expect(attributes["data-theme-mode"]).toBe(PREFERENCE_DEFAULTS.theme_mode);
  });

  it("parsePreference rejeita valores fora do registry", () => {
    expect(parsePreference("sidebar_variant", "<script>")).toBe(PREFERENCE_DEFAULTS.sidebar_variant);
    expect(parsePreference("sidebar_variant", "floating")).toBe("floating");
  });
});

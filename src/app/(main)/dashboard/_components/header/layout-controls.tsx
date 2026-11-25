"use client";

import { Settings } from "lucide-react";
import { useShallow } from "zustand/react/shallow";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FONT_OPTIONS, type FontKey } from "@/lib/fonts/font-options";
import {
  CONTENT_LAYOUT_OPTIONS,
  NAVBAR_STYLE_OPTIONS,
  SIDEBAR_COLLAPSIBLE_OPTIONS,
  SIDEBAR_VARIANT_OPTIONS,
} from "@/lib/preferences/layout";
import { THEME_MODE_OPTIONS, THEME_PRESET_OPTIONS, type ThemePreset } from "@/lib/preferences/theme";
import { usePreferencesStore } from "@/stores/preferences/preferences-provider";

import { PreferenceToggleGroup } from "./preference-toggle-group";

export function LayoutControls() {
  const { values, resolvedThemeMode, setPreference, resetPreferences } = usePreferencesStore(
    useShallow((state) => ({
      values: state.values,
      resolvedThemeMode: state.resolvedThemeMode,
      setPreference: state.setPreference,
      resetPreferences: state.resetPreferences,
    })),
  );

  const { theme_preset: themePreset, font } = values;

  const onThemePresetChange = (preset: ThemePreset) => {
    setPreference("theme_preset", preset);
  };

  const onFontChange = (value: FontKey | "") => {
    if (!value) return;
    setPreference("font", value);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="icon" aria-label="Preferências de layout">
          <Settings />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end">
        <div className="flex flex-col gap-5">
          <div className="space-y-1.5">
            <h4 className="font-medium text-sm leading-none">Preferências</h4>
            <p className="text-muted-foreground text-xs">Personalize as preferências de layout do seu dashboard.</p>
          </div>
          <div className="space-y-3 **:data-[slot=toggle-group]:w-full **:data-[slot=toggle-group-item]:flex-1 **:data-[slot=toggle-group-item]:text-xs">
            <div className="space-y-1">
              <Label className="font-medium text-xs">Tema predefinido</Label>
              <Select value={themePreset} onValueChange={onThemePresetChange}>
                <SelectTrigger size="sm" className="w-full text-xs">
                  <SelectValue placeholder="Predefinido" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {THEME_PRESET_OPTIONS.map((preset) => (
                      <SelectItem key={preset.value} className="text-xs" value={preset.value}>
                        <span
                          className="size-2.5 rounded-full"
                          style={{
                            backgroundColor: resolvedThemeMode === "dark" ? preset.primary.dark : preset.primary.light,
                          }}
                        />
                        {preset.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label className="font-medium text-xs">Fontes</Label>
              <Select value={font} onValueChange={onFontChange}>
                <SelectTrigger size="sm" className="w-full text-xs">
                  <SelectValue placeholder="Selecione a fonte" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {FONT_OPTIONS.map((option) => (
                      <SelectItem key={option.value} className="text-xs" value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <PreferenceToggleGroup preference="theme_mode" label="Modo de tema" options={THEME_MODE_OPTIONS} />
            <PreferenceToggleGroup
              preference="content_layout"
              label="Layout da página"
              options={CONTENT_LAYOUT_OPTIONS}
            />
            <PreferenceToggleGroup
              preference="navbar_style"
              label="Comportamento da barra"
              options={NAVBAR_STYLE_OPTIONS}
            />
            <PreferenceToggleGroup
              preference="sidebar_variant"
              label="Estilo da barra lateral"
              options={SIDEBAR_VARIANT_OPTIONS}
            />
            <PreferenceToggleGroup
              preference="sidebar_collapsible"
              label="Modo de recolhimento da barra lateral"
              options={SIDEBAR_COLLAPSIBLE_OPTIONS}
            />

            <Button type="button" size="sm" variant="outline" className="w-full text-xs" onClick={resetPreferences}>
              Restaurar padrões
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

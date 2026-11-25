"use client";

import { Label } from "@/components/ui/label";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import type { PreferenceKey, PreferenceValueMap } from "@/lib/preferences/preferences-config";
import { usePreferencesStore } from "@/stores/preferences/preferences-provider";

type PreferenceOption<K extends PreferenceKey> = { readonly label: string; readonly value: PreferenceValueMap[K] };

type PreferenceToggleGroupProps<K extends PreferenceKey> = {
  preference: K;
  label: string;
  options: readonly PreferenceOption<K>[];
};

/** ToggleGroup de escolha única ligado diretamente a uma preferência do store. */
export function PreferenceToggleGroup<K extends PreferenceKey>({
  preference,
  label,
  options,
}: PreferenceToggleGroupProps<K>) {
  const value = usePreferencesStore((state) => state.values[preference]);
  const setPreference = usePreferencesStore((state) => state.setPreference);
  const labelId = `preference-${preference}-label`;

  const onValueChange = (next: string) => {
    const option = options.find((item) => item.value === next);
    if (option) setPreference(preference, option.value);
  };

  return (
    <div className="space-y-1">
      <Label id={labelId} className="font-medium text-xs">
        {label}
      </Label>
      <ToggleGroup
        size="sm"
        spacing={0}
        variant="outline"
        type="single"
        aria-labelledby={labelId}
        value={value}
        onValueChange={onValueChange}
      >
        {options.map((option) => (
          <ToggleGroupItem
            key={option.value}
            value={option.value}
            aria-label={`Alternar ${option.label.toLowerCase()}`}
          >
            {option.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
}

"use server";

import { cookies } from "next/headers";

import {
  getPreferencePersistence,
  PREFERENCE_REGISTRY,
  type PreferenceKey,
  parsePreference,
} from "@/lib/preferences/preferences-config";

const PREFERENCE_COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 dias

function isPreferenceKey(key: unknown): key is PreferenceKey {
  return typeof key === "string" && Object.hasOwn(PREFERENCE_REGISTRY, key);
}

/**
 * Server Action usada pelas preferências com persistência "server-cookie".
 * Toda action é um endpoint público: aceita apenas chaves do registry configuradas
 * como "server-cookie" e valores permitidos pela definição da preferência.
 */
export async function persistPreferenceCookie(key: unknown, value: unknown): Promise<void> {
  if (!isPreferenceKey(key) || getPreferencePersistence(key) !== "server-cookie") return;
  if (typeof value !== "string" || parsePreference(key, value) !== value) return;

  const cookieStore = await cookies();
  cookieStore.set(key, value, { path: "/", maxAge: PREFERENCE_COOKIE_MAX_AGE, sameSite: "lax" });
}

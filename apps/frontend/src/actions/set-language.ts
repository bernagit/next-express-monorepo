"use server";

import { cookies } from "next/headers";

export async function setLanguage(locale: string) {
  const supportedLocales = ["en", "it"];

  const safeLocale = supportedLocales.includes(locale)
    ? locale
    : "en";

  const cookieStore = await cookies();

  cookieStore.set("locale", safeLocale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365, // 1 year
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
}
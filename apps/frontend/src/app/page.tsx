'use client';

import { Container } from "@mantine/core";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("home");
  return (
    <Container>
      <h1>{t("welcome")}</h1>
    </Container>
  );
}

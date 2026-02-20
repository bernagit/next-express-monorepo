"use client";

import {
  ActionIcon,
  Affix,
  AppShell,
  Transition,
} from "@mantine/core";
import { useWindowScroll } from "@mantine/hooks";
import { usePathname } from "next/navigation";
import TopBar from "./TopBar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const path = usePathname();

  const [scroll, scrollTo] = useWindowScroll();

  if (path === "/login") {
    return <>{children}</>;
  }

  return (
    <AppShell header={{ height: 60 }}>
      <AppShell.Header>
        <TopBar />
      </AppShell.Header>

      <AppShell.Main>{children}</AppShell.Main>

      <Affix position={{ bottom: 20, right: 20 }}>
        <Transition transition="slide-up" mounted={scroll.y > 100}>
          {(transitionStyles) => (
            <ActionIcon
              style={transitionStyles}
              onClick={() => scrollTo({ y: 0 })}
              radius="xl"
              variant="filled"
              size="xl"
            >
            </ActionIcon>
          )}
        </Transition>
      </Affix>
    </AppShell>
  );
}
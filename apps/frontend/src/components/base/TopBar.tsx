'use client';

import { setLanguage } from "@/actions/set-language";
import { Avatar, Flex, Group, Menu, Title, useMantineTheme } from "@mantine/core";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useCallback, useTransition } from "react";

export default function TopBar() {
    const router = useRouter();
    const theme = useMantineTheme();
    const [isPending, startTransition] = useTransition();
    const t = useTranslations("topbar");

    const handleLogin = useCallback(() => {
        router.push("/actor/login");
    }, [router]);

    const changeLanguage = (locale: string) => {
        startTransition(async () => {
            await setLanguage(locale);
            router.refresh();
        });
    };
    return (
        <Flex px="md" h="100%" justify="space-between" align="center">
            <Group onClick={() => router.push("/")}>
                <Title order={3} style={{ cursor: "pointer" }}>

                </Title>
            </Group>

            <Group>
                <Menu>
                    <Menu.Target>
                        <Avatar color="blue" radius="xl">
                            {isPending ? "..." : "🌐"}
                        </Avatar>
                    </Menu.Target>

                    <Menu.Dropdown>
                        <Menu.Item
                            disabled={isPending}
                            onClick={() => changeLanguage("en")}
                        >
                            {t("language.english")}
                        </Menu.Item>

                        <Menu.Item
                            disabled={isPending}
                            onClick={() => changeLanguage("it")}
                        >
                            {t("language.italian")}
                        </Menu.Item>
                    </Menu.Dropdown>
                </Menu>

                <Menu>
                    <Menu.Target>
                        <Avatar color={theme.primaryColor} radius="xl" />
                    </Menu.Target>

                    <Menu.Dropdown>
                        <Menu.Item onClick={handleLogin}>
                            {t("login")}
                        </Menu.Item>
                    </Menu.Dropdown>
                </Menu>
            </Group>
        </Flex>
    )
}
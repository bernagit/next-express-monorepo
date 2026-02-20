import "@mantine/core/styles.css";

import {
  ColorSchemeScript,
  MantineProvider,
  createTheme,
  mantineHtmlProps,
} from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { NextIntlClientProvider } from "next-intl";
import AppLayout from "@/components/base/AppLayout";
import { getLocale, getMessages } from "next-intl/server";

export const metadata = {
  title: "Frontend",
  description: "Frontend Application",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = createTheme({
    primaryColor: "teal",
  });

  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} {...mantineHtmlProps} suppressHydrationWarning>
      <head>
        <ColorSchemeScript />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body className="vsc-initialized">
        <MantineProvider theme={theme}>
          <Notifications />
          <NextIntlClientProvider locale={locale} messages={messages}>
            <AppLayout>{children}</AppLayout>
          </NextIntlClientProvider>
        </MantineProvider>
      </body>
    </html>
  );
}

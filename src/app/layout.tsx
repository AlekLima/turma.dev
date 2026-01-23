import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { suseMono } from "@/lib/fonts";
import { headers } from "next/headers";

export const metadata: Metadata = {
  title: "Turma.dev",
  description: "Cada dev tem uma história - conte a sua para a turma",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const theme = headersList.get("x-theme") || "light";

  return (
    <html lang="en" className={theme} style={{ colorScheme: theme }}>
      <body
        className={`bg-background text-foreground ${suseMono.className} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
        >
          {/* <ThemeToggle/> */}
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Kalam } from "next/font/google";

import "./globals.css";
import SessionWraper from "@/providers/SessionWraper";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/providers/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const kalam = Kalam({
  subsets: ["latin"],
  weight: ["300", "400", "700"], // Kalam supports 300, 400, 700
  display: "swap",
});

export const metadata: Metadata = {
  title: "Paper Notes",
  description: "Paper Notes is your digital diary ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${kalam.className} font-sans antialiased`} suppressHydrationWarning>
        <SessionWraper>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            {children}

          </ThemeProvider>
            <Toaster />
        </SessionWraper>
      </body>
    </html>
  );
}

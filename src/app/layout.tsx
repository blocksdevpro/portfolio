import type { Metadata } from "next";
import { Caveat, Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { RESUME_DATA } from "@/constants/resume";
import { SITE_TITLE, SITE_URL } from "@/lib/seo";

const interSans = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
  display: "optional",
});

const handwriting = Caveat({
  variable: "--font-handwriting",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "optional",
});

export const metadata: Metadata = {
  title: {
    default: SITE_TITLE,
    template: `%s | ${RESUME_DATA.name}`,
  },
  metadataBase: new URL(SITE_URL),
  authors: [{ name: RESUME_DATA.name, url: SITE_URL }],
  creator: RESUME_DATA.name,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${interSans.variable} ${jetbrainsMono.variable} ${handwriting.variable} font-sans antialiased min-h-screen`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <TooltipProvider>
            <a href="#main" className="skip-link">
              Skip to content
            </a>
            {children}
          </TooltipProvider>
        </ThemeProvider>
        {process.env.VERCEL === "1" && <Analytics />}
      </body>
    </html>
  );
}

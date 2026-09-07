import type { Metadata } from "next";
import { Caveat, Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { RESUME_DATA } from "@/constants/resume";

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
    default: `${RESUME_DATA.name} · Rust Backend Developer`,
    template: `%s | ${RESUME_DATA.name}`,
  },
  description: RESUME_DATA.summary,
  metadataBase: new URL(RESUME_DATA.website),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: RESUME_DATA.website,
    siteName: RESUME_DATA.name,
    title: `${RESUME_DATA.name} · Rust Backend Developer`,
    description: RESUME_DATA.description,
  },
  twitter: { card: "summary_large_image", creator: "@blocksdev_pro" },
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
          <a href="#main" className="skip-link">
            Skip to content
          </a>
          {children}
        </ThemeProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: RESUME_DATA.name,
              url: RESUME_DATA.website,
              jobTitle: RESUME_DATA.title,
              sameAs: Object.values(RESUME_DATA.socials),
            }).replace(/</g, "\\u003c"),
          }}
        />
        {process.env.VERCEL === "1" && <Analytics />}
      </body>
    </html>
  );
}

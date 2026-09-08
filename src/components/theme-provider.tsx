"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { preloadFeedbackAudio } from "@/lib/feedback-audio";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  React.useEffect(() => {
    void preloadFeedbackAudio().catch(() => {});
  }, []);

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

"use client";

import * as React from "react";
import { Moon, Sun } from "@phosphor-icons/react";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useThemeTransition } from "@/hooks/use-theme-transition";

export function ModeSwitcher() {
  const { toggleTheme } = useThemeTransition();

  const handleThemeToggle = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const bounds = event.currentTarget.getBoundingClientRect();
      void toggleTheme({
        origin: {
          x: bounds.left + bounds.width / 2,
          y: bounds.top + bounds.height / 2,
        },
      });
    },
    [toggleTheme],
  );

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            aria-label="Toggle color theme"
            variant="ghost"
            className="relative h-11 w-11 overflow-hidden px-0 text-muted-foreground"
            onClick={handleThemeToggle}
            type="button"
          />
        }
      >
        <Sun aria-hidden="true" className="theme-icon theme-icon-sun" />
        <Moon aria-hidden="true" className="theme-icon theme-icon-moon" />
      </TooltipTrigger>
      <TooltipContent>Toggle color theme</TooltipContent>
    </Tooltip>
  );
}

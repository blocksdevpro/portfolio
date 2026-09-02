"use client";

import * as React from "react";
import {
  ArrowRight,
  Briefcase,
  Check,
  Code,
  Copy,
  GithubLogo,
  MagnifyingGlass,
  Moon,
  Sun,
  TerminalWindow,
  User,
  X,
} from "@phosphor-icons/react";
import { Dialog as DialogPrimitive } from "radix-ui";

import { Button } from "@/components/ui/button";
import { useThemeTransition } from "@/hooks/use-theme-transition";
import type { ThemeTransitionOrigin } from "@/hooks/use-theme-transition";
import { scrollToSection } from "@/lib/scroll-to-section";
import type { SectionHash } from "@/lib/scroll-to-section";

type CommandItem =
  | Readonly<{
      kind: "navigate";
      id: string;
      label: string;
      description: string;
      href: SectionHash;
      keywords: string;
      icon: React.ReactNode;
    }>
  | Readonly<{
      kind: "external";
      id: string;
      label: string;
      description: string;
      href: string;
      keywords: string;
      icon: React.ReactNode;
    }>
  | Readonly<{
      kind: "copy";
      id: string;
      label: string;
      description: string;
      value: string;
      keywords: string;
      icon: React.ReactNode;
    }>
  | Readonly<{
      kind: "theme";
      id: string;
      label: string;
      description: string;
      keywords: string;
      icon: React.ReactNode;
    }>;

type CopyStatus =
  | Readonly<{ kind: "idle" }>
  | Readonly<{ kind: "copied" }>
  | Readonly<{ kind: "failed" }>;

interface CommandMenuProps {
  email: string;
  githubUrl?: string;
}

function getElementCenter(element: HTMLElement): ThemeTransitionOrigin {
  const bounds = element.getBoundingClientRect();
  return {
    x: bounds.left + bounds.width / 2,
    y: bounds.top + bounds.height / 2,
  };
}

export function CommandMenu({ email, githubUrl }: CommandMenuProps) {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const pendingNavigationRef = React.useRef<SectionHash | null>(null);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const [copyStatus, setCopyStatus] = React.useState<CopyStatus>({
    kind: "idle",
  });
  const { nextTheme, toggleTheme } = useThemeTransition();

  const commands: CommandItem[] = [
    {
      kind: "navigate",
      id: "projects",
      label: "View projects",
      description: "Jump to selected backend work",
      href: "#projects",
      keywords: "work portfolio boris calorine",
      icon: <Code aria-hidden="true" className="size-4" />,
    },
    {
      kind: "navigate",
      id: "experience",
      label: "View experience",
      description: "Jump to employment history",
      href: "#experience",
      keywords: "career job employment",
      icon: <Briefcase aria-hidden="true" className="size-4" />,
    },
    {
      kind: "navigate",
      id: "about",
      label: "About Uttam",
      description: "Jump to the profile summary",
      href: "#about",
      keywords: "bio summary profile",
      icon: <User aria-hidden="true" className="size-4" />,
    },
    {
      kind: "copy",
      id: "copy-email",
      label:
        copyStatus.kind === "copied"
          ? "Email copied"
          : copyStatus.kind === "failed"
            ? "Copy failed"
            : "Copy email",
      description:
        copyStatus.kind === "failed" ? "Clipboard access was blocked" : email,
      value: email,
      keywords: "copy email contact mail hire",
      icon:
        copyStatus.kind === "copied" ? (
          <Check aria-hidden="true" className="size-4 text-emerald-500" />
        ) : (
          <Copy aria-hidden="true" className="size-4" />
      ),
    },
    {
      kind: "theme",
      id: "toggle-theme",
      label: `Switch to ${nextTheme} mode`,
      description: "Change the site color theme",
      keywords: "dark light appearance color",
      icon:
        nextTheme === "dark" ? (
          <Moon aria-hidden="true" className="size-4" />
        ) : (
          <Sun aria-hidden="true" className="size-4" />
      ),
    },
  ];

  if (githubUrl) {
    commands.splice(4, 0, {
      kind: "external",
      id: "github",
      label: "Open GitHub",
      description: "View repositories and activity",
      href: githubUrl,
      keywords: "source code repositories profile",
      icon: <GithubLogo aria-hidden="true" className="size-4" />,
    });
  }

  const normalizedQuery = query.trim().toLowerCase();
  const filteredCommands = commands.filter((command) => {
    if (normalizedQuery.length === 0) {
      return true;
    }

    return `${command.label} ${command.description} ${command.keywords}`
      .toLowerCase()
      .includes(normalizedQuery);
  });

  const updateOpen = React.useCallback((nextOpen: boolean) => {
    setOpen(nextOpen);
    setQuery("");
    setSelectedIndex(0);
    setCopyStatus({ kind: "idle" });
  }, []);

  React.useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      if (
        (event.ctrlKey || event.metaKey) &&
        event.key.toLowerCase() === "k"
      ) {
        event.preventDefault();
        updateOpen(!open);
      }
    };

    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, [open, updateOpen]);

  const executeCommand = React.useCallback(
    async (command: CommandItem, origin: ThemeTransitionOrigin) => {
      switch (command.kind) {
        case "navigate": {
          pendingNavigationRef.current = command.href;
          updateOpen(false);
          window.requestAnimationFrame(() => {
            scrollToSection(command.href);
          });
          return;
        }
        case "external": {
          updateOpen(false);
          window.open(command.href, "_blank", "noopener,noreferrer");
          return;
        }
        case "copy": {
          try {
            await navigator.clipboard.writeText(command.value);
            setCopyStatus({ kind: "copied" });
          } catch {
            setCopyStatus({ kind: "failed" });
          }
          return;
        }
        case "theme": {
          updateOpen(false);
          window.setTimeout(() => {
            void toggleTheme({ origin });
          }, 140);
          return;
        }
        default: {
          const exhaustive: never = command;
          return exhaustive;
        }
      }
    },
    [toggleTheme, updateOpen]
  );

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setSelectedIndex((current) =>
        Math.min(current + 1, filteredCommands.length - 1)
      );
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setSelectedIndex((current) => Math.max(current - 1, 0));
      return;
    }

    if (event.key === "Enter") {
      const selectedCommand = filteredCommands[selectedIndex];
      if (!selectedCommand) {
        return;
      }

      event.preventDefault();
      const content = event.currentTarget.closest<HTMLElement>(
        "[data-slot='command-content']"
      );
      const origin = content
        ? getElementCenter(content)
        : { x: window.innerWidth / 2, y: window.innerHeight / 3 };
      void executeCommand(selectedCommand, origin);
    }
  };

  const statusMessage =
    copyStatus.kind === "copied"
      ? "Email address copied to clipboard."
      : copyStatus.kind === "failed"
        ? "Could not copy the email address."
        : "";

  return (
    <DialogPrimitive.Root
      modal={false}
      open={open}
      onOpenChange={updateOpen}
    >
      <DialogPrimitive.Trigger asChild>
        <Button
          ref={triggerRef}
          aria-label="Open command menu"
          className="h-8 gap-1.5 px-2 text-muted-foreground hover:text-foreground"
          title="Quick actions (Ctrl/Command + K)"
          type="button"
          variant="ghost"
        >
          <TerminalWindow aria-hidden="true" className="size-4" />
          <span className="hidden font-mono text-[10px] sm:inline">Ctrl K</span>
        </Button>
      </DialogPrimitive.Trigger>

      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/45 backdrop-blur-[2px] data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content
          className="fixed left-1/2 top-[14vh] z-50 w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 overflow-hidden rounded-2xl border border-border bg-popover/95 text-popover-foreground shadow-2xl backdrop-blur-xl outline-none data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 sm:top-[18vh]"
          data-slot="command-content"
          onCloseAutoFocus={(event) => {
            const wasNavigation = pendingNavigationRef.current !== null;

            event.preventDefault();
            pendingNavigationRef.current = null;

            if (!wasNavigation) {
              triggerRef.current?.focus({ preventScroll: true });
            }
          }}
        >
          <DialogPrimitive.Title className="sr-only">
            Quick actions
          </DialogPrimitive.Title>
          <DialogPrimitive.Description className="sr-only">
            Search for a section or site action.
          </DialogPrimitive.Description>

          <div className="flex items-center gap-3 border-b border-border px-4">
            <MagnifyingGlass
              aria-hidden="true"
              className="size-4 shrink-0 text-muted-foreground"
            />
            <input
              aria-label="Search quick actions"
              autoFocus
              className="h-14 min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              onChange={(event) => {
                setQuery(event.target.value);
                setSelectedIndex(0);
              }}
              onKeyDown={handleInputKeyDown}
              placeholder="Search actions..."
              value={query}
            />
            <DialogPrimitive.Close asChild>
              <button
                aria-label="Close command menu"
                className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2"
                type="button"
              >
                <X aria-hidden="true" className="size-4" />
              </button>
            </DialogPrimitive.Close>
          </div>

          <div className="max-h-[min(420px,60vh)] overflow-y-auto p-2">
            {filteredCommands.length > 0 ? (
              filteredCommands.map((command, index) => (
                <button
                  key={command.id}
                  className="group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left outline-none transition-colors data-[selected=true]:bg-accent hover:bg-accent focus-visible:bg-accent"
                  data-selected={index === selectedIndex}
                  onClick={(event) => {
                    void executeCommand(
                      command,
                      getElementCenter(event.currentTarget)
                    );
                  }}
                  onMouseEnter={() => setSelectedIndex(index)}
                  type="button"
                >
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition-colors group-hover:text-foreground">
                    {command.icon}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium">
                      {command.label}
                    </span>
                    <span className="block truncate text-xs text-muted-foreground">
                      {command.description}
                    </span>
                  </span>
                  {index === selectedIndex ? (
                    <kbd className="hidden rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground sm:inline">
                      Enter
                    </kbd>
                  ) : (
                    <ArrowRight
                      aria-hidden="true"
                      className="size-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5"
                    />
                  )}
                </button>
              ))
            ) : (
              <div className="px-3 py-10 text-center text-sm text-muted-foreground">
                No matching action.
              </div>
            )}
          </div>

          <div className="flex items-center justify-between border-t border-border px-4 py-2 font-mono text-[10px] text-muted-foreground">
            <span>Arrow keys to move</span>
            <span>Enter to select</span>
          </div>
          <p aria-live="polite" className="sr-only">
            {statusMessage}
          </p>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

"use client";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

import {
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import {
  ArrowUpRight,
  Briefcase,
  Check,
  Code,
  Copy,
  EnvelopeSimple,
  GithubLogo,
  MagnifyingGlass,
  Moon,
  Desktop,
  Sun,
  User,
  X,
} from "@phosphor-icons/react";
import { Dialog } from "radix-ui";
import { useTheme } from "next-themes";
import { useCopyFeedback } from "@/hooks/use-copy-feedback";
import { scrollToSection, type SectionHash } from "@/lib/scroll-to-section";
import { RESUME_DATA } from "@/constants/resume";

type Command = {
  id: string;
  label: string;
  description: string;
  group: "Navigate" | "Projects" | "Actions" | "Elsewhere";
  keywords: string;
  icon: React.ReactNode;
  action:
    | { kind: "navigate"; href: SectionHash }
    | { kind: "external"; href: string }
    | { kind: "copy" }
    | { kind: "theme"; preference: "light" | "dark" | "system" };
};

function subscribePlatform() {
  return () => {};
}

export function CommandMenu({
  email,
  githubUrl,
}: {
  email: string;
  githubUrl?: string;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const { status: copyStatus, copy, reset: resetCopy } = useCopyFeedback();
  const pendingNavigation = useRef<SectionHash | null>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const listId = useId();
  const { theme, setTheme } = useTheme();
  const shortcut = useSyncExternalStore(
    subscribePlatform,
    () => (/Mac|iPhone|iPad/.test(navigator.platform) ? "⌘ K" : "Ctrl K"),
    () => "Ctrl K",
  );

  const commands: Command[] = [
    {
      id: "work",
      group: "Navigate",
      label: "View projects",
      description: "Boris and Calorine",
      keywords: "work portfolio boris calorine",
      icon: <Code />,
      action: { kind: "navigate", href: "#projects" },
    },
    {
      id: "experience",
      group: "Navigate",
      label: "View experience",
      description: "Employment history",
      keywords: "career job",
      icon: <Briefcase />,
      action: { kind: "navigate", href: "#experience" },
    },
    {
      id: "about",
      group: "Navigate",
      label: "About Uttam",
      description: "A little about my work",
      keywords: "bio stack skills",
      icon: <User />,
      action: { kind: "navigate", href: "#about" },
    },
    {
      id: "contact",
      group: "Navigate",
      label: "Get in touch",
      description: "Start a conversation",
      keywords: "contact hire",
      icon: <EnvelopeSimple />,
      action: { kind: "navigate", href: "#contact" },
    },
    {
      id: "copy-email",
      group: "Actions",
      label:
        copyStatus === "copied"
          ? "Email copied"
          : copyStatus === "failed"
            ? "Copy failed"
            : "Copy email",
      description:
        copyStatus === "failed"
          ? "Select the email address below to copy it"
          : email,
      keywords: "copy email mail",
      icon: copyStatus === "copied" ? <Check /> : <Copy />,
      action: { kind: "copy" },
    },
    ...(["light", "dark", "system"] as const).map((preference): Command => ({
      id: `theme-${preference}`,
      group: "Actions",
      label:
        preference === "system"
          ? "Use system theme"
          : `Use ${preference} theme`,
      description:
        theme === preference
          ? "Current preference"
          : preference === "system"
            ? "Follow your device appearance"
            : "Save this appearance",
      keywords: `theme appearance ${preference}`,
      icon:
        preference === "system" ? (
          <Desktop />
        ) : preference === "dark" ? (
          <Moon />
        ) : (
          <Sun />
        ),
      action: { kind: "theme", preference },
    })),
  ];
  if (githubUrl)
    commands.push({
      id: "github",
      group: "Elsewhere",
      label: "Open GitHub",
      description: "Repositories and activity",
      keywords: "source code",
      icon: <GithubLogo />,
      action: { kind: "external", href: githubUrl },
    });
  for (const project of RESUME_DATA.projects) {
    if (project.links?.production)
      commands.push({
        id: project.id,
        group: "Projects",
        label: "Visit " + project.title,
        description: new URL(project.links.production).hostname,
        keywords: project.title,
        icon: <ArrowUpRight />,
        action: { kind: "external", href: project.links.production },
      });
  }
  const filtered = commands.filter((command) =>
    (command.label + " " + command.description + " " + command.keywords)
      .toLowerCase()
      .includes(query.trim().toLowerCase()),
  );
  const selectedCommand = filtered[selected];

  function changeOpen(value: boolean) {
    setOpen(value);
    setQuery("");
    setSelected(0);
    resetCopy();
  }

  useEffect(() => {
    function shortcutHandler(event: KeyboardEvent) {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((current) => !current);
        setQuery("");
        setSelected(0);
        resetCopy();
      }
    }
    window.addEventListener("keydown", shortcutHandler);
    return () => window.removeEventListener("keydown", shortcutHandler);
  }, [resetCopy]);

  useEffect(() => {
    if (open)
      document
        .getElementById(listId + "-" + selected)
        ?.scrollIntoView({ block: "nearest" });
  }, [open, selected, query, listId]);

  async function execute(command: Command) {
    const action = command.action;
    switch (action.kind) {
      case "navigate":
        pendingNavigation.current = action.href;
        changeOpen(false);
        return;
      case "external":
        window.open(action.href, "_blank", "noopener,noreferrer");
        changeOpen(false);
        return;
      case "copy":
        await copy(email);
        return;
      case "theme":
        setTheme(action.preference);
        changeOpen(false);
        return;
      default: {
        const exhaustive: never = action;
        return exhaustive;
      }
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={changeOpen}>
      <Tooltip>
        <Dialog.Trigger asChild>
          <TooltipTrigger render={
            <button ref={trigger} type="button" aria-label="Open command menu" className="header-search" />
          }>
            <MagnifyingGlass size={17} aria-hidden="true" />
            <span className="header-shortcut" aria-hidden="true">
              {shortcut.split(" ").map((key) => <kbd key={key}>{key}</kbd>)}
            </span>
          </TooltipTrigger>
        </Dialog.Trigger>
        <TooltipContent>Quick actions ({shortcut})</TooltipContent>
      </Tooltip>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/20 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0" />
        <Dialog.Content
          className="command-panel fixed left-1/2 top-[10dvh] z-50 w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 overflow-hidden border text-popover-foreground shadow-2xl outline-none sm:top-[18vh]"
          data-slot="command-content"
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            const hash = pendingNavigation.current;
            pendingNavigation.current = null;
            if (hash) requestAnimationFrame(() => scrollToSection(hash));
            else trigger.current?.focus({ preventScroll: true });
          }}
        >
          <Dialog.Title className="sr-only">Quick actions</Dialog.Title>
          <Dialog.Description className="sr-only">
            Search sections, projects, and site actions. Use the arrow keys to
            select an action and Enter to run it.
          </Dialog.Description>
          <div className="flex items-center gap-2 px-4">
            <MagnifyingGlass
              className="text-muted-foreground"
              size={16}
              aria-hidden="true"
            />
            <input
              role="combobox"
              aria-label="Search quick actions"
              aria-expanded={open}
              aria-autocomplete="list"
              aria-controls={listId}
              aria-activedescendant={
                selectedCommand ? listId + "-" + selected : undefined
              }
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setSelected(0);
              }}
              placeholder="Type a command or search..."
              className="h-12 min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              onKeyDown={(event) => {
                if (event.key === "ArrowDown" || event.key === "ArrowUp") {
                  event.preventDefault();
                  setSelected((current) =>
                    Math.max(
                      0,
                      Math.min(
                        filtered.length - 1,
                        current + (event.key === "ArrowDown" ? 1 : -1),
                      ),
                    ),
                  );
                } else if (event.key === "Enter" && selectedCommand) {
                  event.preventDefault();
                  void execute(selectedCommand);
                }
              }}
            />
            <Dialog.Close asChild>
              <button
                type="button"
                aria-label="Close command menu"
                className="flex size-7 items-center justify-center rounded-md text-muted-foreground hover:bg-muted"
              >
                <X size={14} aria-hidden="true" />
              </button>
            </Dialog.Close>
          </div>
          <div
            id={listId}
            role="listbox"
            aria-label="Quick actions"
            className="command-results h-[min(320px,48dvh)] overflow-y-auto p-1"
          >
            {filtered.map((command, index) => (
              <div key={command.id}>
                {(index === 0 ||
                  filtered[index - 1].group !== command.group) && (
                  <div className="command-group" aria-hidden="true">
                    {command.group === "Navigate" ? "Menu" : command.group}
                  </div>
                )}
                <div
                  id={listId + "-" + index}
                  role="option"
                  aria-selected={selected === index}
                  data-selected={selected === index}
                  className="command-option flex min-h-9 cursor-pointer items-center gap-2 rounded-lg px-2 py-2"
                  onMouseDown={(event) => event.preventDefault()}
                  onMouseEnter={() => setSelected(index)}
                  onClick={() => void execute(command)}
                >
                  <span
                    className="flex size-4 items-center justify-center text-muted-foreground [&_svg]:size-4"
                    aria-hidden="true"
                  >
                    {command.icon}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm leading-5">{command.label}</span>
                  </span>
                  {command.action.kind === "external" && (
                    <ArrowUpRight size={14} className="text-muted-foreground" aria-hidden="true" />
                  )}
                  {command.action.kind === "theme" && theme === command.action.preference && (
                    <Check size={14} className="text-muted-foreground" aria-label="Current preference" />
                  )}
                </div>
              </div>
            ))}
            {!filtered.length && (
              <div className="px-4 py-10 text-center text-sm text-muted-foreground">
                No matching action. Try &quot;projects&quot; or
                &quot;email&quot;.
              </div>
            )}
          </div>
          <div className="flex h-10 items-center justify-between gap-2 px-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1" aria-label="Use arrow keys to navigate">
              <kbd className="command-key">↑</kbd>
              <kbd className="command-key">↓</kbd>
            </span>
            <span className="flex items-center gap-2 font-medium text-foreground">
              {selectedCommand
                ? selectedCommand.action.kind === "copy"
                  ? "Copy email"
                  : selectedCommand.action.kind === "theme"
                    ? "Enter to apply"
                    : "Go to page"
                : "Esc to close"}
              <kbd className="command-key" aria-hidden="true">{selectedCommand ? "↵" : "esc"}</kbd>
            </span>
          </div>
          {copyStatus === "failed" && (
            <p className="border-t px-4 py-3 text-sm select-text">{email}</p>
          )}
          <p role="status" className="sr-only">
            {copyStatus === "copied"
              ? "Email address copied."
              : copyStatus === "failed"
                ? "Copy failed. Select the visible email address to copy it."
                : ""}
          </p>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

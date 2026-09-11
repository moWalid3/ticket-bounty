"use client";

import { LucideMoon, LucideSun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "../ui/button";

function getToggledTheme(theme: string, systemTheme?: "dark" | "light") {
  if (theme === "system") return systemTheme === "dark" ? "light" : "dark";

  return theme === "dark" ? "light" : "dark";
}

function ThemeSwitcher() {
  const { setTheme, systemTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme((theme) => getToggledTheme(theme, systemTheme))}
    >
      <LucideSun className="size-4 rotate-0 scale-100 transition-all dark:rotate-90 dark:scale-0" />
      <LucideMoon className="absolute size-4 rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}

export default ThemeSwitcher;

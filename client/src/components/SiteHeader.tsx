/** Fireside Editorial design: calm, paper-like navigation that stays legible over changing surfaces. */
import { BrandMark } from "@/components/BrandMark";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";
import { navItems } from "@/config/site";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useState } from "react";

export function SiteHeader({ onLeaveMemory }: { onLeaveMemory: () => void }) {
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[#d9d0c0]/70 bg-[#fbf8f1]/85 backdrop-blur-xl dark:border-white/10 dark:bg-[#1a1e1a]/85">
      <div className="container flex h-[74px] items-center justify-between gap-4">
        <BrandMark />
        <nav className="hidden items-center gap-5 lg:flex" aria-label="Primary navigation">
          {navItems.map((item) => <a key={item.href} href={item.href} className="text-[0.72rem] font-bold uppercase tracking-[0.13em] text-[#665e53] transition-colors hover:text-[#75836D] dark:text-[#cfc8bc] dark:hover:text-[#b7c7ae]">{item.label}</a>)}
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" aria-label="Toggle dark mode" onClick={toggleTheme} className="rounded-full text-[#514a40] hover:bg-[#e6dfcf] dark:text-[#f5f0e8] dark:hover:bg-white/10">
            {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </Button>
          <Button onClick={onLeaveMemory} className="hidden rounded-full bg-[#75836D] px-5 text-xs font-bold tracking-wide text-white hover:bg-[#5e6d57] sm:inline-flex">Leave a memory</Button>
          <Button variant="ghost" size="icon" className="rounded-full lg:hidden" aria-label="Open navigation" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</Button>
        </div>
      </div>
      {open && <div className="border-t border-[#d9d0c0]/70 bg-[#fbf8f1] px-5 py-5 shadow-xl dark:border-white/10 dark:bg-[#1a1e1a] lg:hidden">
        <nav className="flex flex-col gap-4" aria-label="Mobile navigation">
          {navItems.map((item) => <a key={item.href} href={item.href} onClick={close} className="font-display text-xl text-[#342E27] dark:text-[#f5f0e8]">{item.label}</a>)}
          <Button onClick={() => { close(); onLeaveMemory(); }} className="mt-2 w-full rounded-full bg-[#75836D] text-white">Leave a memory</Button>
        </nav>
      </div>}
    </header>
  );
}

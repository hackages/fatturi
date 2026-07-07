import type { Theme } from "@/lib/posts";

const ACCENT: Record<Theme, string> = {
  navy: "bg-navy/10 text-navy",
  gold: "bg-gold/15 text-[#8a5f14]",
  sage: "bg-sage/12 text-sage",
};

const ACCENT_ON_DARK: Record<Theme, string> = {
  navy: "bg-white/15 text-ivoire",
  gold: "bg-gold/25 text-gold-soft",
  sage: "bg-sage/30 text-ivoire",
};

export function CategoryPill({
  label,
  accent,
  onDark = false,
}: {
  label: string;
  accent: Theme;
  onDark?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.16em] ${
        onDark ? ACCENT_ON_DARK[accent] : ACCENT[accent]
      }`}
    >
      {label}
    </span>
  );
}

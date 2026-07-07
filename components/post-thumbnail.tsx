import Image from "next/image";
import type { Theme } from "@/lib/posts";

const GRADIENTS: Record<Theme, string> = {
  navy: "bg-gradient-to-br from-navy-deep via-navy to-navy-deep",
  gold: "bg-gradient-to-br from-[#a9791b] via-gold to-[#8f6416]",
  sage: "bg-gradient-to-br from-[#245f48] via-sage to-[#1f5540]",
};

// Motif « chaînon manquant » — deux maillons entrelacés, discret.
function ChainMotif({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 120" fill="none" className={className} aria-hidden>
      <rect x="18" y="34" width="96" height="52" rx="26" stroke="currentColor" strokeWidth="7" />
      <rect x="86" y="34" width="96" height="52" rx="26" stroke="currentColor" strokeWidth="7" strokeDasharray="10 12" />
    </svg>
  );
}

export function PostThumbnail({
  theme,
  className = "",
  size = "card",
}: {
  theme: Theme;
  className?: string;
  size?: "card" | "featured";
}) {
  return (
    <div className={`relative overflow-hidden ${GRADIENTS[theme]} ${className}`}>
      <div className="absolute inset-0 dotted opacity-60" />
      <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
      <ChainMotif
        className={`absolute text-white/15 ${
          size === "featured" ? "right-8 top-1/2 w-72 -translate-y-1/2" : "-right-6 bottom-2 w-44"
        }`}
      />
      <div className="absolute bottom-4 left-5 flex items-center gap-2 opacity-90">
        <Image src="/logo-mark-light.png" alt="" width={28} height={26} className="h-5 w-auto" />
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/70">fatturi.com</span>
      </div>
    </div>
  );
}

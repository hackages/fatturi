"use client";

import { useEffect, useState } from "react";
import { SETUP_STEPS, SETUP_STORAGE_KEY } from "@/lib/premiers-pas";

type CheckedMap = Record<string, boolean>;

function loadChecked(): CheckedMap {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(SETUP_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as CheckedMap;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

export function PremiersPasChecklist() {
  const [checked, setChecked] = useState<CheckedMap>({});
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setChecked(loadChecked());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    window.localStorage.setItem(SETUP_STORAGE_KEY, JSON.stringify(checked));
  }, [checked, ready]);

  const doneCount = SETUP_STEPS.filter((s) => checked[s.id]).length;
  const total = SETUP_STEPS.length;
  const percent = Math.round((doneCount / total) * 100);
  const complete = doneCount === total;

  function toggle(id: string) {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function reset() {
    setChecked({});
  }

  return (
    <div className="space-y-10">
      <section
        className="rounded-3xl border border-black/[0.06] bg-white/70 p-6 shadow-[0_18px_40px_-28px_rgba(19,44,70,0.35)] sm:p-8"
        aria-live="polite"
      >
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-gold">
              Progression
            </p>
            <p className="mt-2 font-serif text-3xl font-black text-navy-deep">
              {ready ? `${percent}%` : "—"}
            </p>
            <p className="mt-1 text-sm text-navy/55">
              {complete
                ? "Vous êtes prêt·e — merci."
                : `${doneCount} sur ${total} · continuez, c’est court.`}
            </p>
          </div>
          <div className="h-3 w-full max-w-xs overflow-hidden rounded-full bg-brume sm:w-56">
            <div
              className="h-full rounded-full bg-sage transition-[width] duration-500 ease-out"
              style={{ width: ready ? `${percent}%` : "0%" }}
            />
          </div>
        </div>
      </section>

      <section aria-label="Checklist de démarrage">
        <ol className="space-y-3">
          {SETUP_STEPS.map((step, index) => {
            const isOn = Boolean(checked[step.id]);
            return (
              <li key={step.id}>
                <div
                  className={[
                    "rounded-2xl border px-4 py-4 transition-colors sm:px-5 sm:py-5",
                    isOn
                      ? "border-sage/30 bg-sage/[0.07]"
                      : "border-black/[0.07] bg-white/60 hover:border-navy/15",
                  ].join(" ")}
                >
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => toggle(step.id)}
                      aria-pressed={isOn}
                      aria-label={
                        isOn
                          ? `Décocher : ${step.title}`
                          : `Cocher : ${step.title}`
                      }
                      className={[
                        "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 transition-all",
                        isOn
                          ? "border-sage bg-sage text-ivoire"
                          : "border-navy/25 bg-ivoire text-transparent hover:border-navy/50",
                      ].join(" ")}
                    >
                      <svg
                        viewBox="0 0 16 16"
                        className="h-4 w-4"
                        aria-hidden="true"
                      >
                        <path
                          d="M3.5 8.2 6.4 11l6.1-6.4"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-navy/40">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        {step.optional ? (
                          <span className="rounded-full bg-brume px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-navy/55">
                            Si applicable
                          </span>
                        ) : null}
                        <h2
                          className={[
                            "w-full font-serif text-xl font-bold text-navy-deep sm:text-[1.35rem]",
                            isOn ? "line-through decoration-sage/50" : "",
                          ].join(" ")}
                        >
                          {step.title}
                        </h2>
                      </div>
                      <p className="mt-1.5 text-[1.05rem] leading-relaxed text-navy/65">
                        {step.hint}
                      </p>
                      {step.href ? (
                        <a
                          href={step.href}
                          {...(step.href.startsWith("http")
                            ? { target: "_blank", rel: "noopener noreferrer" }
                            : {})}
                          className="mt-3 inline-flex text-sm font-semibold text-sage underline decoration-sage/30 underline-offset-4 transition-colors hover:text-navy"
                        >
                          {step.linkLabel ?? "Ouvrir"} →
                        </a>
                      ) : null}
                      {step.imageSrc ? (
                        <figure className="fatturi-figure mt-4 mb-0">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={step.imageSrc}
                            alt={step.imageAlt ?? ""}
                            loading="lazy"
                          />
                          {step.imageAlt ? (
                            <figcaption>{step.imageAlt}</figcaption>
                          ) : null}
                        </figure>
                      ) : null}
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>

        {complete ? (
          <div className="mt-6 rounded-2xl border border-sage/25 bg-sage/[0.08] px-5 py-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-sage">
              C’est bon
            </p>
            <p className="mt-2 font-serif text-2xl font-bold text-navy-deep">
              Votre Fatturi est en route.
            </p>
            <p className="mt-2 text-navy/65">
              Entreprise renseignée, Paramètres avancés, abonnement choisi. Un
              grand merci — ça nous aide vraiment.
            </p>
            <button
              type="button"
              onClick={reset}
              className="mt-4 text-sm font-medium text-navy/50 underline underline-offset-4 hover:text-navy"
            >
              Réinitialiser la checklist
            </button>
          </div>
        ) : (
          <p className="mt-5 text-center text-sm text-navy/45">
            Cochez quand c’est fait — la page s’en souvient sur cet appareil.
          </p>
        )}
      </section>
    </div>
  );
}

import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { COLORS, LOGO, NAVY_DEEP } from "../brand";
import { playfair, dmSans } from "../fonts";
import { DottedBackground } from "../components/DottedBackground";
import { DECKS, Slide } from "./data";

export const CAROUSEL_W = 1080;
export const CAROUSEL_H = 1350;

const PageDots: React.FC<{ index: number; count: number; light?: boolean }> = ({ index, count, light }) => (
  <div style={{ display: "flex", gap: 12 }}>
    {Array.from({ length: count }).map((_, i) => (
      <div
        key={i}
        style={{
          width: i === index ? 30 : 12,
          height: 12,
          borderRadius: 999,
          backgroundColor: i === index ? COLORS.gold : light ? "rgba(245,242,236,0.35)" : "rgba(26,58,92,0.25)",
        }}
      />
    ))}
  </div>
);

const Footer: React.FC<{ index: number; count: number; light?: boolean }> = ({ index, count, light }) => (
  <div
    style={{
      position: "absolute",
      left: 72,
      right: 72,
      bottom: 56,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    }}
  >
    <Img src={staticFile(light ? LOGO.fullLight : LOGO.full)} style={{ height: 40, width: "auto", opacity: 0.9 }} />
    <PageDots index={index} count={count} light={light} />
  </div>
);

const Overline: React.FC<{ children: React.ReactNode; color?: string }> = ({ children, color = COLORS.gold }) => (
  <div style={{ fontFamily: dmSans, fontWeight: 700, fontSize: 26, letterSpacing: 4, textTransform: "uppercase", color }}>
    {children}
  </div>
);

const StepBadge: React.FC<{ n: number }> = ({ n }) => (
  <div
    style={{
      width: 92,
      height: 92,
      borderRadius: 999,
      backgroundColor: COLORS.gold,
      color: COLORS.navy,
      fontFamily: playfair,
      fontWeight: 900,
      fontSize: 52,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 14px 30px rgba(200,149,42,0.35)",
    }}
  >
    {n}
  </div>
);

const DarkBg: React.FC = () => (
  <>
    <DottedBackground color={COLORS.navy} opacity={0.07} />
    <AbsoluteFill
      style={{ background: `radial-gradient(900px 700px at 50% 45%, ${NAVY_DEEP}00, ${NAVY_DEEP})`, opacity: 0.5 }}
    />
  </>
);

const renderSlide = (slide: Slide, index: number, count: number): React.ReactNode => {
  switch (slide.kind) {
    case "cover":
      return (
        <AbsoluteFill style={{ fontFamily: dmSans }}>
          <DarkBg />
          <div style={{ position: "absolute", left: 72, right: 72, top: 150 }}>
            <Overline>{slide.kicker}</Overline>
            <div
              style={{
                fontFamily: playfair,
                fontWeight: 900,
                fontSize: 108,
                lineHeight: 1.03,
                color: COLORS.ivoire,
                marginTop: 30,
              }}
            >
              {slide.title}
            </div>
          </div>
          <div style={{ position: "absolute", left: 0, right: 0, bottom: 200, textAlign: "center", color: "rgba(245,242,236,0.75)", fontSize: 34, fontWeight: 500, fontFamily: dmSans }}>
            Faites glisser →
          </div>
          <Footer index={index} count={count} light />
        </AbsoluteFill>
      );

    case "stat":
      return (
        <AbsoluteFill style={{ backgroundColor: COLORS.ivoire, fontFamily: dmSans }}>
          <div style={{ position: "absolute", left: 72, right: 72, top: 150 }}>
            <Overline>{slide.kicker}</Overline>
            <div style={{ display: "flex", alignItems: "baseline", gap: 24, marginTop: 30 }}>
              <span style={{ fontFamily: dmSans, fontWeight: 700, fontSize: 230, lineHeight: 1, letterSpacing: -2, color: COLORS.navy }}>
                {slide.big}
              </span>
              <span style={{ fontFamily: dmSans, fontWeight: 700, fontSize: 54, color: COLORS.gold }}>{slide.unit}</span>
            </div>
            <div style={{ fontSize: 50, lineHeight: 1.3, color: "rgba(13,13,15,0.72)", marginTop: 40, maxWidth: 880 }}>
              {slide.body}
            </div>
          </div>
          <Footer index={index} count={count} />
        </AbsoluteFill>
      );

    case "point":
      return (
        <AbsoluteFill style={{ backgroundColor: COLORS.ivoire, fontFamily: dmSans }}>
          <div style={{ position: "absolute", left: 72, right: 72, top: 140 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 26, marginBottom: 40 }}>
              <StepBadge n={slide.n} />
              <Overline>{slide.kicker}</Overline>
            </div>
            <div style={{ fontFamily: playfair, fontWeight: 900, fontSize: 100, lineHeight: 1.0, color: COLORS.navy }}>
              {slide.title}
            </div>
            <div style={{ fontSize: 48, lineHeight: 1.35, color: "rgba(13,13,15,0.72)", marginTop: 34, maxWidth: 880 }}>
              {slide.body}
            </div>
          </div>
          <Footer index={index} count={count} />
        </AbsoluteFill>
      );

    case "myth":
      return (
        <AbsoluteFill style={{ backgroundColor: COLORS.ivoire, fontFamily: dmSans }}>
          <div style={{ position: "absolute", left: 72, right: 72, top: 160 }}>
            <Overline>Idée reçue</Overline>
            <div style={{ position: "relative", marginTop: 26 }}>
              <div style={{ fontFamily: playfair, fontWeight: 700, fontSize: 72, lineHeight: 1.12, color: "rgba(13,13,15,0.5)" }}>
                {slide.myth}
              </div>
              <div style={{ position: "absolute", top: "48%", left: 0, right: 0, height: 6, backgroundColor: COLORS.gold, borderRadius: 999 }} />
            </div>
            <div style={{ display: "flex", gap: 24, marginTop: 70 }}>
              <div
                style={{
                  flex: "0 0 auto",
                  width: 66,
                  height: 66,
                  borderRadius: 999,
                  backgroundColor: COLORS.sage,
                  color: COLORS.white,
                  fontSize: 40,
                  fontWeight: 800,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                ✓
              </div>
              <div style={{ fontFamily: dmSans, fontWeight: 500, fontSize: 56, lineHeight: 1.25, color: COLORS.navy }}>
                {slide.reality}
              </div>
            </div>
          </div>
          <Footer index={index} count={count} />
        </AbsoluteFill>
      );

    case "cta":
      return (
        <AbsoluteFill style={{ fontFamily: dmSans, alignItems: "center", justifyContent: "center", padding: 90 }}>
          <DarkBg />
          <div style={{ textAlign: "center", zIndex: 1 }}>
            <Img src={staticFile(LOGO.fullLight)} style={{ height: 80, width: "auto" }} />
            <div style={{ fontFamily: playfair, fontWeight: 900, fontSize: 92, lineHeight: 1.04, color: COLORS.ivoire, marginTop: 54 }}>
              {slide.title}
            </div>
            <div style={{ fontSize: 44, color: "rgba(245,242,236,0.82)", marginTop: 30, maxWidth: 820 }}>{slide.body}</div>
            <div style={{ marginTop: 58 }}>
              <span
                style={{
                  display: "inline-block",
                  backgroundColor: COLORS.gold,
                  color: COLORS.navy,
                  fontWeight: 700,
                  fontSize: 40,
                  padding: "24px 52px",
                  borderRadius: 999,
                }}
              >
                Accès prioritaire → fatturi.com
              </span>
            </div>
          </div>
        </AbsoluteFill>
      );
  }
};

export const GenericCarousel: React.FC<{ deck: string; index: number }> = ({ deck, index }) => {
  const slides = DECKS[deck] ?? [];
  const slide = slides[index];
  if (!slide) return <AbsoluteFill style={{ backgroundColor: COLORS.navy }} />;
  return <>{renderSlide(slide, index, slides.length)}</>;
};

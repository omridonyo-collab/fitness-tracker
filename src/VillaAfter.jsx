import { useState, useEffect } from "react";

const SLIDES = [
  {
    id: "salon",
    num: "01",
    tag: "קיר הסלון",
    title: "פתוח לשדה",
    titleEn: "Full Glass Wall — Living Room",
    description: "הקיר כולו נפתח — דלתות הזזה על כל רוחב הסלון. כשהכל פתוח, רצפת הסלון ממשיכה ישירות לטרסה. הגבול בין פנים לחוץ נמחק.",
    points: [
      "6–8 פאנלי זכוכית על כל רוחב הסלון",
      "המשכיות רצפה ללא מפתן — פנים וחוץ רצף אחד",
      "תקרה עם קורות עץ חשופות מעל",
      "נוף לשדות — ללא הפרעה",
    ],
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=85&w=1600",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&q=85&w=1600",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=85&w=1600",
    ],
    accent: "#2D5A1B",
    accentLight: "#4A8A30",
  },
  {
    id: "entry",
    num: "02",
    tag: "כניסה",
    title: "אור מלמטה למעלה",
    titleEn: "Double-Height Entry Window",
    description: "לצד גרם המדרגות — חלון שלם לגובה שתי קומות. האור שוטף פנימה כל שעות היום. כניסה לבית שמרגישה כמו כניסה לדבר גדול.",
    points: [
      "חלון רצף מהרצפה עד תקרת הגג — גובה ~6 מ׳",
      "חלל כניסה פתוח לגובה שתי קומות",
      "אור טבעי מלא על גרם המדרגות",
      "קיר אבן לצד החלון — חומרים חמים",
    ],
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=85&w=1600",
      "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?auto=format&fit=crop&q=85&w=1600",
      "https://images.unsplash.com/photo-1600047508788-786f3865b97c?auto=format&fit=crop&q=85&w=1600",
    ],
    accent: "#7A4F2B",
    accentLight: "#C4834A",
  },
  {
    id: "west",
    num: "03",
    tag: "חזית השדות",
    title: "זכוכית מול הנוף",
    titleEn: "West Facade — Glass to the Fields",
    description: "מבחוץ — הבית נפתח לשדות בשורה שלמה של זכוכית. מרחוק רואים את האור הפנימי. קורות עץ בקו הגג. אבן בפינות.",
    points: [
      "קיר-זכוכית על כל רוחב קומת הקרקע",
      "קורות עץ בולטות בקו הגג — צל וחמימות",
      "אבן מקומית בפינות ובסיס הבית",
      "טרסה רחבה בין הבית לשדות",
    ],
    images: [
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&q=85&w=1600",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=85&w=1600",
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&q=85&w=1600",
    ],
    accent: "#1A4A6B",
    accentLight: "#3A7AAA",
  },
  {
    id: "tuscan",
    num: "04",
    tag: "שפה אדריכלית",
    title: "טוסקנה על כל החזיתות",
    titleEn: "Unified Tuscan Language",
    description: "האבן, הקשתות, קורות העץ — שהיו רק בכניסה — מתפשטים לכל ארבע החזיתות. הבית מספר סיפור אחד מכל כיוון.",
    points: [
      "חיפוי אבן מקומית — פינות, בסיס, רצועות",
      "תריסי עץ אותנטיים על כל החלונות",
      "חלונות קשתות בקומת הקרקע",
      "גפנים וטיפוס — צמחייה שמחברת לאדמה",
    ],
    images: [
      "https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&q=85&w=1600",
      "https://images.unsplash.com/photo-1568495248636-6432b97bd949?auto=format&fit=crop&q=85&w=1600",
      "https://images.unsplash.com/photo-1533154683836-84ea7a0bc310?auto=format&fit=crop&q=85&w=1600",
    ],
    accent: "#8B3A0E",
    accentLight: "#C4834A",
  },
  {
    id: "upper",
    num: "05",
    tag: "קומה עליונה",
    title: "אור, פרטיות ואופי",
    titleEn: "Upper Floor — Wings & Character",
    description: "אגף הורים בקצה אחד, אגף ילדים בקצה השני, המדרגות כחיץ. לכל חדר אופי משלו — מושב חלון, מרפסת קטנה, תקרה משופעת עם קורות עץ. ולמסדרון — סקיילייט.",
    points: [
      "סקיילייט מעל המסדרון — אור טבעי לכל הקומה",
      "אגף הורים: חדר שינה + עין-סוויט + מרפסת לשדות",
      "אגף ילדים: חדרים שווים עם מושב חלון / מרפסת / פינת קריאה",
      "תקרה משופעת עם קורות עץ חשופות מתחת לגמלון",
    ],
    images: [
      "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&q=85&w=1600",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=85&w=1600",
      "https://images.unsplash.com/photo-1560185127-6a6f8dd28d7c?auto=format&fit=crop&q=85&w=1600",
    ],
    accent: "#4A3A7A",
    accentLight: "#7A6AAA",
  },
];

export default function VillaAfter() {
  const [active, setActive] = useState(0);
  const [imgIdx, setImgIdx] = useState(0);
  const [fading, setFading] = useState(false);

  const slide = SLIDES[active];

  // Auto-cycle reference images every 4s
  useEffect(() => {
    setImgIdx(0);
    const t = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setImgIdx(i => (i + 1) % slide.images.length);
        setFading(false);
      }, 500);
    }, 4000);
    return () => clearInterval(t);
  }, [active, slide.images.length]);

  function goTo(i) {
    setActive(i);
    setImgIdx(0);
  }

  function prev() { goTo((active - 1 + SLIDES.length) % SLIDES.length); }
  function next() { goTo((active + 1) % SLIDES.length); }

  return (
    <div
      dir="rtl"
      style={{
        fontFamily: "'Heebo', Arial, sans-serif",
        background: "#080504",
        minHeight: "100vh",
        color: "#F5EDE0",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Full-bleed background image */}
      <div
        key={`${active}-${imgIdx}`}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          transition: "opacity 0.6s ease",
          opacity: fading ? 0 : 1,
        }}
      >
        <img
          src={slide.images[imgIdx]}
          alt=""
          style={{
            width: "100%", height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            display: "block",
          }}
          onError={e => { e.target.style.opacity = 0; }}
        />
        {/* Dark gradient overlay */}
        <div
          style={{
            position: "absolute", inset: 0,
            background: `linear-gradient(
              to left,
              rgba(4,3,2,0.92) 0%,
              rgba(4,3,2,0.75) 35%,
              rgba(4,3,2,0.35) 65%,
              rgba(4,3,2,0.15) 100%
            )`,
          }}
        />
        {/* Bottom fade */}
        <div
          style={{
            position: "absolute", bottom: 0, left: 0, right: 0, height: "30%",
            background: "linear-gradient(to top, rgba(4,3,2,0.95), transparent)",
          }}
        />
      </div>

      {/* Content layer */}
      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", minHeight: "100vh" }}>

        {/* Top bar */}
        <header style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "20px 32px",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          backdropFilter: "blur(12px)",
          background: "rgba(4,3,2,0.4)",
        }}>
          <div>
            <div style={{ color: slide.accentLight, fontSize: 10, fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 3 }}>
              בריף אדריכלי — הבית שלנו בשדות
            </div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", fontWeight: 400 }}>
              הדמיות חזון — מצב אחרי השינויים
            </div>
          </div>
          {/* Image dots */}
          <div style={{ display: "flex", gap: 6 }}>
            {slide.images.map((_, i) => (
              <div
                key={i}
                onClick={() => setImgIdx(i)}
                style={{
                  width: i === imgIdx ? 20 : 6,
                  height: 6,
                  borderRadius: 3,
                  background: i === imgIdx ? slide.accentLight : "rgba(255,255,255,0.25)",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
              />
            ))}
          </div>
        </header>

        {/* Main content */}
        <div style={{ flex: 1, display: "flex", alignItems: "center", padding: "40px 32px" }}>
          <div style={{ maxWidth: 520 }}>

            {/* Number */}
            <div style={{
              fontSize: 72, fontWeight: 900, lineHeight: 1,
              color: "rgba(255,255,255,0.05)",
              position: "absolute",
              top: 80, right: 28,
              fontVariantNumeric: "tabular-nums",
              letterSpacing: "-4px",
              userSelect: "none",
            }}>
              {slide.num}
            </div>

            {/* Tag */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: slide.accent,
              borderRadius: 100,
              padding: "5px 14px",
              marginBottom: 18,
            }}>
              <div style={{ width: 5, height: 5, borderRadius: "50%", background: slide.accentLight }} />
              <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.9)" }}>
                {slide.tag}
              </span>
            </div>

            {/* Title */}
            <h1 style={{
              fontSize: "clamp(36px, 5vw, 62px)",
              fontWeight: 900,
              lineHeight: 1.05,
              margin: "0 0 6px",
              color: "#FFFFFF",
            }}>
              {slide.title}
            </h1>
            <div style={{
              fontSize: 13,
              color: "rgba(255,255,255,0.35)",
              fontWeight: 400,
              marginBottom: 22,
              letterSpacing: "0.05em",
            }}>
              {slide.titleEn}
            </div>

            {/* Description */}
            <p style={{
              fontSize: 16,
              lineHeight: 1.9,
              color: "rgba(255,255,255,0.75)",
              margin: "0 0 28px",
              fontWeight: 300,
              borderRight: `3px solid ${slide.accentLight}`,
              paddingRight: 16,
            }}>
              {slide.description}
            </p>

            {/* Points */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {slide.points.map((p, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                  <div style={{
                    width: 22, height: 22, borderRadius: "50%",
                    border: `1.5px solid ${slide.accentLight}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0, marginTop: 1,
                    fontSize: 10, fontWeight: 800, color: slide.accentLight,
                  }}>
                    {i + 1}
                  </div>
                  <span style={{ fontSize: 14, color: "rgba(255,255,255,0.72)", lineHeight: 1.65, fontWeight: 400 }}>
                    {p}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom navigation */}
        <footer style={{
          padding: "20px 32px",
          backdropFilter: "blur(12px)",
          background: "rgba(4,3,2,0.5)",
          borderTop: "1px solid rgba(255,255,255,0.07)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>

          {/* Slide selector */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {SLIDES.map((s, i) => (
              <button
                key={s.id}
                onClick={() => goTo(i)}
                style={{
                  background: active === i ? s.accent : "rgba(255,255,255,0.06)",
                  border: `1px solid ${active === i ? s.accentLight : "rgba(255,255,255,0.12)"}`,
                  borderRadius: 10,
                  padding: "8px 14px",
                  cursor: "pointer",
                  transition: "all 0.25s ease",
                  display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 2,
                }}
              >
                <span style={{ color: active === i ? slide.accentLight : "rgba(255,255,255,0.3)", fontSize: 9, fontWeight: 700, letterSpacing: "0.1em" }}>
                  {s.num}
                </span>
                <span style={{ color: active === i ? "#fff" : "rgba(255,255,255,0.55)", fontSize: 11, fontWeight: 700, whiteSpace: "nowrap" }}>
                  {s.tag}
                </span>
              </button>
            ))}
          </div>

          {/* Prev / Next */}
          <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
            <button
              onClick={prev}
              style={{
                width: 40, height: 40, borderRadius: "50%",
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "rgba(255,255,255,0.7)",
                fontSize: 18, cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 0.2s",
              }}
            >›</button>
            <button
              onClick={next}
              style={{
                width: 40, height: 40, borderRadius: "50%",
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "rgba(255,255,255,0.7)",
                fontSize: 18, cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                transform: "rotate(180deg)",
                transition: "all 0.2s",
              }}
            >›</button>
          </div>
        </footer>
      </div>
    </div>
  );
}

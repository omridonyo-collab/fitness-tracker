// Villa Visual Brief — annotated renders showing proposed changes
import { useState } from "react";

// ─── Data: each scene has the image + SVG annotations ───────────────────────

const SCENES = [
  {
    id: "wall",
    num: 1,
    title: "קיר הסלון — פתיחה מלאה לשדה",
    subtitle: "חזית מערב (שדות)",
    image: "/renders/facade-field.jpg",
    imgAspect: 1511 / 800, // w/h
    problem: "שתי דלתות הזזה נפרדות — הקיר עדיין סגור",
    goal: "קיר-זכוכית שלם מרצפה לתקרה, דלתות-קיר מתקפלות על כל הרוחב",
    annotations: [
      // Red box over existing two sliding doors zone
      {
        type: "rectStrike",
        x: 30, y: 52, w: 42, h: 30,
        color: "#ef4444",
        label: "2 דלתות נפרדות — קיר עדיין סגור",
        labelSide: "bottom",
      },
      // Green replacement — full-width glass wall
      {
        type: "rectGlow",
        x: 12, y: 50, w: 75, h: 35,
        color: "#22c55e",
        label: "קיר-זכוכית מלא — כל רוחב הסלון",
        labelSide: "top",
      },
      // Arrow showing continuation
      {
        type: "arrowH",
        x1: 88, y1: 67, x2: 95, y2: 67,
        color: "#22c55e",
        label: "המשכיות לטרסה — ללא מפתן",
      },
      // Dimension line at bottom
      {
        type: "dimLine",
        x1: 12, y1: 87, x2: 87, y2: 87,
        color: "#60a5fa",
        label: "רוחב מלא ~8-9 מ׳",
      },
    ],
  },
  {
    id: "entry",
    num: 2,
    title: "כניסה — מדרגות בתוך הנוף",
    subtitle: "חזית כניסה — חלל מדרגות",
    image: "/renders/facade-entry.jpg",
    imgAspect: 1511 / 800,
    problem: "קיר מלא לצד המדרגות — כניסה סגורה וחשוכה",
    goal: "חלון גבוה מלמטה למעלה לצד המדרגות + חלל כניסה פתוח לגובה שתי קומות",
    annotations: [
      // Red solid wall area to replace
      {
        type: "rectStrike",
        x: 68, y: 18, w: 18, h: 60,
        color: "#ef4444",
        label: "קיר מלא — יש להחליף בחלון",
        labelSide: "right",
      },
      // Tall green window replacement
      {
        type: "rectGlow",
        x: 66, y: 16, w: 22, h: 64,
        color: "#22c55e",
        label: "חלון רצף מלמטה למעלה — שתי קומות",
        labelSide: "left",
      },
      // Double-height arrow
      {
        type: "arrowV",
        x1: 60, y1: 18, x2: 60, y2: 78,
        color: "#f59e0b",
        label: "חלל פתוח לגובה שתי קומות",
      },
      // Light rays
      {
        type: "rays",
        cx: 77, cy: 10,
        color: "#fde68a",
        label: "אור טבעי — כל שעות היום",
      },
    ],
  },
  {
    id: "facades",
    num: 3,
    title: "שפה אדריכלית — טוסקנה על כל החזיתות",
    subtitle: "חזית צד (כיום לבן חשוף)",
    image: "/renders/facade-side.jpg",
    imgAspect: 1511 / 800,
    problem: "קירות לבנים חשופים, חלונות מפוזרים — אין שפה אחידה",
    goal: "רצועות אבן, תריסי עץ, פרגולה אופקית, ניסוח חלונות בקבוצות — כמו הכניסה",
    annotations: [
      // Top blank wall — add stone band
      {
        type: "rectGlow",
        x: 5, y: 5, w: 65, h: 18,
        color: "#f59e0b",
        label: "רצועת אבן (כמו הכניסה) + תריסי עץ",
        labelSide: "top",
      },
      // Scattered windows — group them
      {
        type: "rectStrike",
        x: 8, y: 48, w: 20, h: 20,
        color: "#ef4444",
        label: "חלונות מפוזרים",
        labelSide: "bottom",
      },
      {
        type: "rectStrike",
        x: 38, y: 54, w: 14, h: 13,
        color: "#ef4444",
        label: null,
        labelSide: "bottom",
      },
      {
        type: "rectStrike",
        x: 57, y: 54, w: 13, h: 13,
        color: "#ef4444",
        label: null,
        labelSide: "bottom",
      },
      // Horizontal pergola band
      {
        type: "hBand",
        y: 43, h: 4,
        color: "#92400e",
        label: "קורניז עץ אופקי — מקרקע את המסה",
      },
      // Stone corner
      {
        type: "vBand",
        x: 0, w: 8,
        color: "#a16207",
        label: "פינת אבן / עוגן חומרים",
      },
      // Mass break arrow
      {
        type: "arrowDiag",
        x1: 72, y1: 25, x2: 85, y2: 40,
        color: "#c084fc",
        label: "לשבור את המסה בבליטות ושקעים",
      },
    ],
  },
  {
    id: "upper",
    num: 4,
    title: "קומה עליונה — אור, פרטיות ואופי",
    subtitle: "תוכנית קומת קרקע (עיקרון דומה לעליונה)",
    image: "/renders/floorplan.jpg",
    imgAspect: 525 / 850,
    problem: "מסדרון חשוך, חדר הורים וילדים צמודים, חדרים לא מאוזנים",
    goal: "סקיילייט למסדרון, הפרדת אגפים, חלונות ייחודיים/מרפסות לכל חדר",
    annotations: [
      // Corridor skylight
      {
        type: "rectGlow",
        x: 38, y: 25, w: 24, h: 35,
        color: "#f59e0b",
        label: "סקיילייט / חלון גבוה למסדרון",
        labelSide: "right",
      },
      // Parents wing
      {
        type: "bracket",
        x: 2, y: 55, w: 35, h: 40,
        color: "#6366f1",
        label: "אגף הורים — פינה בעצמאות",
        labelSide: "left",
      },
      // Kids wing
      {
        type: "bracket",
        x: 60, y: 2, w: 38, h: 50,
        color: "#22c55e",
        label: "אגף ילדים — עם אופי ייחודי",
        labelSide: "right",
      },
      // Divider (stairs/bathroom)
      {
        type: "divider",
        x: 37, y: 2, w: 26, h: 98,
        color: "#94a3b8",
        label: "חיץ: מדרגות / חדר רחצה",
      },
    ],
  },
  {
    id: "entrance",
    num: 5,
    title: "הכניסה — המודל לכל הבית",
    subtitle: "כניסה (מה שעובד — צריך להרחיב לכל הבית)",
    image: "/renders/entrance.jpg",
    imgAspect: 1100 / 785,
    problem: "השפה הטוסקנית קיימת רק כאן — והיא מדהימה",
    goal: "להרחיב בדיוק את הזהות הזאת לכל ארבע החזיתות: אבן, קשתות, קורות עץ, גוון חם",
    annotations: [
      // Stone wall — highlight as reference
      {
        type: "rectHighlight",
        x: 3, y: 15, w: 55, h: 75,
        color: "#f59e0b",
        label: "✅ אבן — להעתיק לכל הבית",
        labelSide: "bottom",
      },
      // Arch — highlight
      {
        type: "circleHighlight",
        cx: 58, cy: 72, r: 12,
        color: "#22c55e",
        label: "✅ קשת — מוטיב לחזרה",
      },
      // Wood pergola — highlight
      {
        type: "rectHighlight",
        x: 40, y: 3, w: 55, h: 25,
        color: "#92400e",
        label: "✅ קורות עץ — לאורך כל הגגון",
        labelSide: "top",
      },
      // Arrows pointing outward
      {
        type: "spreadArrows",
        cx: 50, cy: 50,
        color: "#e879f9",
        label: "להרחיב לכל ארבע החזיתות",
      },
    ],
  },
];

// ─── Main Component ──────────────────────────────────────────────────────────

export default function VillaVisual() {
  const [active, setActive] = useState(0);
  const [showAnnotations, setShowAnnotations] = useState(true);

  const scene = SCENES[active];

  return (
    <div
      dir="rtl"
      style={{
        fontFamily: "'Heebo', Arial, sans-serif",
        background: "#0f0a06",
        minHeight: "100vh",
        color: "#F5EDE0",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Top bar */}
      <header
        style={{
          background: "linear-gradient(135deg, #1a0f06 0%, #2d1a0a 100%)",
          borderBottom: "1px solid rgba(181,71,42,0.3)",
          padding: "14px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexShrink: 0,
        }}
      >
        <div>
          <div style={{ color: "#C4834A", fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", marginBottom: 2 }}>
            בריף אדריכלי — הדמיות שינויים
          </div>
          <div style={{ color: "#F5EDE0", fontSize: 18, fontWeight: 800 }}>
            הבית שלנו בשדות
          </div>
        </div>
        <button
          onClick={() => setShowAnnotations(!showAnnotations)}
          style={{
            background: showAnnotations ? "rgba(34,197,94,0.2)" : "rgba(239,68,68,0.2)",
            border: `1px solid ${showAnnotations ? "#22c55e" : "#ef4444"}`,
            color: showAnnotations ? "#22c55e" : "#ef4444",
            borderRadius: 100,
            padding: "7px 18px",
            fontSize: 13,
            fontWeight: 700,
            cursor: "pointer",
            transition: "all 0.2s",
          }}
        >
          {showAnnotations ? "הסתר הערות" : "הצג הערות"}
        </button>
      </header>

      {/* Scene tabs */}
      <nav
        style={{
          display: "flex",
          gap: 6,
          padding: "12px 16px",
          background: "#120a04",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          flexShrink: 0,
          overflowX: "auto",
        }}
      >
        {SCENES.map((s, i) => (
          <button
            key={s.id}
            onClick={() => setActive(i)}
            style={{
              background: active === i ? "#B5472A" : "rgba(255,255,255,0.05)",
              border: `1px solid ${active === i ? "#B5472A" : "rgba(255,255,255,0.1)"}`,
              color: active === i ? "white" : "#A08070",
              borderRadius: 10,
              padding: "7px 14px",
              fontSize: 12,
              fontWeight: 700,
              cursor: "pointer",
              whiteSpace: "nowrap",
              transition: "all 0.2s",
              flexShrink: 0,
            }}
          >
            <span style={{ marginLeft: 6, fontSize: 14 }}>{s.num}</span>
            {s.title.split(" — ")[0]}
          </button>
        ))}
      </nav>

      {/* Main content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 0 }}>

        {/* Scene header */}
        <div
          style={{
            padding: "20px 24px 16px",
            background: "linear-gradient(180deg, #1a0f06 0%, transparent 100%)",
          }}
        >
          <div style={{ display: "flex", alignItems: "flex-start", gap: 16, flexWrap: "wrap" }}>
            <div
              style={{
                width: 42, height: 42, borderRadius: "50%",
                background: "#B5472A",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 18, fontWeight: 900, flexShrink: 0,
              }}
            >
              {scene.num}
            </div>
            <div style={{ flex: 1, minWidth: 200 }}>
              <div style={{ color: "#C4834A", fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", marginBottom: 3 }}>
                {scene.subtitle}
              </div>
              <h2 style={{ color: "#F5EDE0", fontSize: "clamp(16px,3vw,22px)", fontWeight: 900, margin: 0 }}>
                {scene.title}
              </h2>
            </div>
          </div>

          {/* Problem / Goal pills */}
          <div style={{ display: "flex", gap: 10, marginTop: 14, flexWrap: "wrap" }}>
            <Tag color="#ef4444" icon="⚠" text={scene.problem} />
            <Tag color="#22c55e" icon="✦" text={scene.goal} />
          </div>
        </div>

        {/* Annotated image */}
        <div
          style={{
            flex: 1,
            padding: "0 16px 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <AnnotatedImage
            image={scene.image}
            aspect={scene.imgAspect}
            annotations={scene.annotations}
            show={showAnnotations}
          />
        </div>

        {/* Legend */}
        <div
          style={{
            background: "rgba(255,255,255,0.03)",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            padding: "10px 24px",
            display: "flex",
            gap: 20,
            flexWrap: "wrap",
            flexShrink: 0,
          }}
        >
          <LegendItem color="#ef4444" label="מה צריך לשנות" />
          <LegendItem color="#22c55e" label="מה מוצע במקום" />
          <LegendItem color="#f59e0b" label="אלמנט / חומר מוצע" />
          <LegendItem color="#6366f1" label="אזור / אגף" />
          <LegendItem color="#60a5fa" label="מידות / רצף" />
        </div>
      </div>
    </div>
  );
}

// ─── Annotated Image ─────────────────────────────────────────────────────────

function AnnotatedImage({ image, aspect, annotations, show }) {
  // We render into a relative container; SVG sits on top at 100%×100%
  // All annotation coordinates are in percent of image dimensions.
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: 900,
        borderRadius: 16,
        overflow: "hidden",
        boxShadow: "0 8px 48px rgba(0,0,0,0.6)",
        border: "1px solid rgba(255,255,255,0.08)",
        aspectRatio: `${aspect} / 1`,
      }}
    >
      {/* Photo */}
      <img
        src={image}
        alt=""
        style={{
          position: "absolute", inset: 0,
          width: "100%", height: "100%",
          objectFit: "cover",
          objectPosition: "center",
          filter: show ? "brightness(0.82)" : "brightness(1)",
          transition: "filter 0.3s",
          display: "block",
        }}
      />

      {/* SVG annotations */}
      {show && (
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            overflow: "visible",
          }}
        >
          {annotations.map((a, i) => (
            <Annotation key={i} a={a} />
          ))}
        </svg>
      )}
    </div>
  );
}

// ─── SVG Annotation types ────────────────────────────────────────────────────

function Annotation({ a }) {
  switch (a.type) {
    case "rectStrike":
      return (
        <g>
          <rect
            x={a.x} y={a.y} width={a.w} height={a.h}
            fill="rgba(239,68,68,0.15)"
            stroke={a.color}
            strokeWidth="0.6"
            strokeDasharray="2 1.2"
          />
          {/* X-strike lines */}
          <line x1={a.x} y1={a.y} x2={a.x+a.w} y2={a.y+a.h} stroke={a.color} strokeWidth="0.4" strokeOpacity="0.5" />
          <line x1={a.x+a.w} y1={a.y} x2={a.x} y2={a.y+a.h} stroke={a.color} strokeWidth="0.4" strokeOpacity="0.5" />
          {a.label && (
            <AnnotLabel
              x={a.x + a.w/2}
              y={a.labelSide === "bottom" ? a.y + a.h + 4 : a.y - 3}
              text={a.label}
              color={a.color}
              anchor="middle"
            />
          )}
        </g>
      );

    case "rectGlow":
      return (
        <g>
          <rect
            x={a.x} y={a.y} width={a.w} height={a.h}
            fill="rgba(34,197,94,0.12)"
            stroke={a.color}
            strokeWidth="0.8"
            strokeDasharray="3 1.5"
          />
          {/* Corner marks */}
          {[[0,0],[1,0],[0,1],[1,1]].map(([cx,cy], i) => (
            <g key={i}>
              <line x1={a.x+cx*a.w - (cx===0?0:2)} y1={a.y+cy*a.h} x2={a.x+cx*a.w + (cx===0?2:0)} y2={a.y+cy*a.h} stroke={a.color} strokeWidth="1" />
              <line x1={a.x+cx*a.w} y1={a.y+cy*a.h - (cy===0?0:2)} x2={a.x+cx*a.w} y2={a.y+cy*a.h + (cy===0?2:0)} stroke={a.color} strokeWidth="1" />
            </g>
          ))}
          {a.label && (
            <AnnotLabel
              x={a.x + a.w/2}
              y={a.labelSide === "top" ? a.y - 3 : a.y + a.h + 4}
              text={a.label}
              color={a.color}
              anchor="middle"
            />
          )}
        </g>
      );

    case "rectHighlight":
      return (
        <g>
          <rect
            x={a.x} y={a.y} width={a.w} height={a.h}
            fill="rgba(245,158,11,0.08)"
            stroke={a.color}
            strokeWidth="0.7"
          />
          {a.label && (
            <AnnotLabel
              x={a.x + a.w/2}
              y={a.labelSide === "top" ? a.y - 3 : a.y + a.h + 4}
              text={a.label}
              color={a.color}
              anchor="middle"
            />
          )}
        </g>
      );

    case "arrowH": {
      const dy = 0;
      return (
        <g>
          <line x1={a.x1} y1={a.y1} x2={a.x2} y2={a.y2} stroke={a.color} strokeWidth="0.7" markerEnd={`url(#ah-${a.color.replace('#','')})`} />
          <defs>
            <marker id={`ah-${a.color.replace('#','')}`} markerWidth="4" markerHeight="4" refX="3" refY="2" orient="auto">
              <path d="M0,0 L4,2 L0,4 Z" fill={a.color} />
            </marker>
          </defs>
          {a.label && <AnnotLabel x={(a.x1+a.x2)/2} y={a.y1-3} text={a.label} color={a.color} anchor="middle" />}
        </g>
      );
    }

    case "arrowV":
      return (
        <g>
          <defs>
            <marker id={`av-${a.color.replace('#','')}`} markerWidth="4" markerHeight="4" refX="2" refY="3" orient="auto">
              <path d="M0,0 L4,0 L2,4 Z" fill={a.color} />
            </marker>
          </defs>
          <line x1={a.x1} y1={a.y1} x2={a.x2} y2={a.y2} stroke={a.color} strokeWidth="0.7"
            markerEnd={`url(#av-${a.color.replace('#','')})`}
            markerStart={`url(#av-start-${a.color.replace('#','')})`}
          />
          <defs>
            <marker id={`av-start-${a.color.replace('#','')}`} markerWidth="4" markerHeight="4" refX="2" refY="1" orient="auto">
              <path d="M0,4 L4,4 L2,0 Z" fill={a.color} />
            </marker>
          </defs>
          {a.label && <AnnotLabel x={a.x1-2} y={(a.y1+a.y2)/2} text={a.label} color={a.color} anchor="end" />}
        </g>
      );

    case "dimLine":
      return (
        <g>
          <line x1={a.x1} y1={a.y1} x2={a.x2} y2={a.y2} stroke={a.color} strokeWidth="0.5" />
          <line x1={a.x1} y1={a.y1-1.5} x2={a.x1} y2={a.y1+1.5} stroke={a.color} strokeWidth="0.5" />
          <line x1={a.x2} y1={a.y1-1.5} x2={a.x2} y2={a.y1+1.5} stroke={a.color} strokeWidth="0.5" />
          {a.label && <AnnotLabel x={(a.x1+a.x2)/2} y={a.y1+5} text={a.label} color={a.color} anchor="middle" />}
        </g>
      );

    case "rays": {
      const angles = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330];
      return (
        <g>
          {angles.map(ang => {
            const rad = ang * Math.PI / 180;
            return (
              <line key={ang}
                x1={a.cx} y1={a.cy}
                x2={a.cx + Math.cos(rad)*10} y2={a.cy + Math.sin(rad)*10}
                stroke={a.color} strokeWidth="0.4" strokeOpacity="0.7"
              />
            );
          })}
          <circle cx={a.cx} cy={a.cy} r="2" fill={a.color} fillOpacity="0.8" />
          {a.label && <AnnotLabel x={a.cx} y={a.cy+14} text={a.label} color={a.color} anchor="middle" />}
        </g>
      );
    }

    case "hBand":
      return (
        <g>
          <rect x="0" y={a.y} width="100" height={a.h} fill={a.color} fillOpacity="0.25" stroke={a.color} strokeWidth="0.4" />
          {/* wood grain lines */}
          {[0,1,2,3,4,5,6,7].map(i => (
            <line key={i} x1={i*14} y1={a.y} x2={i*14+10} y2={a.y+a.h} stroke={a.color} strokeWidth="0.25" strokeOpacity="0.5" />
          ))}
          {a.label && <AnnotLabel x={50} y={a.y - 2} text={a.label} color={a.color} anchor="middle" />}
        </g>
      );

    case "vBand":
      return (
        <g>
          <rect x={a.x} y="0" width={a.w} height="100" fill={a.color} fillOpacity="0.2" stroke={a.color} strokeWidth="0.4" />
          {a.label && <AnnotLabel x={a.x + a.w + 2} y={20} text={a.label} color={a.color} anchor="start" />}
        </g>
      );

    case "arrowDiag":
      return (
        <g>
          <defs>
            <marker id={`ad-${a.color.replace('#','')}`} markerWidth="4" markerHeight="4" refX="3" refY="2" orient="auto">
              <path d="M0,0 L4,2 L0,4 Z" fill={a.color} />
            </marker>
          </defs>
          <line x1={a.x1} y1={a.y1} x2={a.x2} y2={a.y2} stroke={a.color} strokeWidth="0.7"
            strokeDasharray="2 1"
            markerEnd={`url(#ad-${a.color.replace('#','')})`}
          />
          {a.label && <AnnotLabel x={a.x1} y={a.y1-3} text={a.label} color={a.color} anchor="start" />}
        </g>
      );

    case "bracket":
      return (
        <g>
          <rect x={a.x} y={a.y} width={a.w} height={a.h}
            fill={a.color} fillOpacity="0.1"
            stroke={a.color} strokeWidth="0.8"
            strokeDasharray="none"
            rx="1"
          />
          {/* bracket corners */}
          <polyline points={`${a.x+6},${a.y} ${a.x},${a.y} ${a.x},${a.y+8}`} fill="none" stroke={a.color} strokeWidth="1.2" />
          <polyline points={`${a.x+a.w-6},${a.y} ${a.x+a.w},${a.y} ${a.x+a.w},${a.y+8}`} fill="none" stroke={a.color} strokeWidth="1.2" />
          <polyline points={`${a.x+6},${a.y+a.h} ${a.x},${a.y+a.h} ${a.x},${a.y+a.h-8}`} fill="none" stroke={a.color} strokeWidth="1.2" />
          <polyline points={`${a.x+a.w-6},${a.y+a.h} ${a.x+a.w},${a.y+a.h} ${a.x+a.w},${a.y+a.h-8}`} fill="none" stroke={a.color} strokeWidth="1.2" />
          {a.label && (
            <AnnotLabel
              x={a.labelSide === "left" ? a.x - 2 : a.x + a.w + 2}
              y={a.y + a.h/2}
              text={a.label}
              color={a.color}
              anchor={a.labelSide === "left" ? "end" : "start"}
            />
          )}
        </g>
      );

    case "divider":
      return (
        <g>
          <rect x={a.x} y={a.y} width={a.w} height={a.h}
            fill={a.color} fillOpacity="0.08"
            stroke={a.color} strokeWidth="0.4"
            strokeDasharray="3 2"
          />
          {a.label && <AnnotLabel x={a.x + a.w/2} y={a.y + 8} text={a.label} color={a.color} anchor="middle" />}
        </g>
      );

    case "circleHighlight":
      return (
        <g>
          <circle cx={a.cx} cy={a.cy} r={a.r}
            fill={a.color} fillOpacity="0.12"
            stroke={a.color} strokeWidth="0.7"
          />
          {a.label && <AnnotLabel x={a.cx} y={a.cy + a.r + 4} text={a.label} color={a.color} anchor="middle" />}
        </g>
      );

    case "spreadArrows": {
      const dirs = [0, 90, 180, 270];
      return (
        <g>
          <defs>
            <marker id="spread-arrow" markerWidth="4" markerHeight="4" refX="3" refY="2" orient="auto">
              <path d="M0,0 L4,2 L0,4 Z" fill={a.color} />
            </marker>
          </defs>
          {dirs.map(deg => {
            const rad = deg * Math.PI / 180;
            return (
              <line key={deg}
                x1={a.cx + Math.cos(rad)*8} y1={a.cy + Math.sin(rad)*8}
                x2={a.cx + Math.cos(rad)*22} y2={a.cy + Math.sin(rad)*22}
                stroke={a.color} strokeWidth="0.8" strokeDasharray="2 1"
                markerEnd="url(#spread-arrow)"
              />
            );
          })}
          <text x={a.cx} y={a.cy + 35} textAnchor="middle" fill={a.color}
            fontSize="2.8" fontWeight="700"
            style={{ filter: "drop-shadow(0 0 3px #000)" }}
          >
            {a.label}
          </text>
        </g>
      );
    }

    default:
      return null;
  }
}

// ─── Label with background ───────────────────────────────────────────────────

function AnnotLabel({ x, y, text, color, anchor = "middle" }) {
  if (!text) return null;
  // Clamp within viewBox
  const cx = Math.max(2, Math.min(98, x));
  const cy = Math.max(4, Math.min(97, y));
  return (
    <g>
      <text
        x={cx} y={cy}
        textAnchor={anchor}
        fontSize="2.6"
        fontWeight="700"
        fontFamily="'Heebo', Arial, sans-serif"
        fill={color}
        style={{
          filter: "drop-shadow(0 0 3px rgba(0,0,0,0.9)) drop-shadow(0 0 6px rgba(0,0,0,0.7))",
          paintOrder: "stroke",
        }}
        stroke="rgba(0,0,0,0.85)"
        strokeWidth="0.8"
        strokeLinejoin="round"
      >
        {text}
      </text>
    </g>
  );
}

// ─── Helper components ───────────────────────────────────────────────────────

function Tag({ color, icon, text }) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "flex-start",
        gap: 7,
        background: `${color}18`,
        border: `1px solid ${color}40`,
        borderRadius: 10,
        padding: "7px 12px",
        fontSize: 12.5,
        color: "#E8D5BA",
        maxWidth: 460,
        lineHeight: 1.55,
      }}
    >
      <span style={{ color, fontSize: 13, flexShrink: 0, marginTop: 1 }}>{icon}</span>
      <span>{text}</span>
    </div>
  );
}

function LegendItem({ color, label }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <div style={{ width: 12, height: 3, background: color, borderRadius: 2, flexShrink: 0 }} />
      <span style={{ color: "#7A6050", fontSize: 11, fontWeight: 600 }}>{label}</span>
    </div>
  );
}

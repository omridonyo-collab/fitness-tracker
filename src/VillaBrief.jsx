// Architectural Brief — Tuscan Villa Project
// Prepared: June 26, 2026

export default function VillaBrief() {
  const sections = [
    {
      id: 1,
      icon: "🚪",
      title: "כניסה לבית — להכניס את הבחוץ פנימה",
      color: "#B5472A",
      problem: {
        headline: "מה מפריע לי",
        body: "כשנכנסים לבית, אחרי כמה צעדים בלבד — פוגשים מדרגות. אין חלל קבלה, אין נשימה, אין מעבר הדרגתי מהחוץ אל הפנים. הכניסה סוגרת על עצמה.",
      },
      request: {
        headline: "מה אני מבקש",
        items: [
          "לייצר חלון גדול מלמטה למעלה לצד גרם המדרגות — שבכל עלייה תרגיש שאתה עולה בתוך הנוף ולא בתוך קיר.",
          "לשקול לפתוח את חלל הכניסה לגובה שתי קומות — כדי שהנקודה הראשונה בבית תרגיש כמו כניסה לדבר גדול.",
          "להטמיע את המדרגות בתוך ה\"חוץ\": חומרים, אור, ירוק — כך שהמעבר בין פנים לחוץ יהיה חלק.",
        ],
      },
    },
    {
      id: 2,
      icon: "🌾",
      title: "קיר הסלון — השוס של הבית",
      color: "#4A5E3A",
      problem: {
        headline: "מה מפריע לי",
        body: "קיר הסלון הוא הקיר שפונה לשדות — הנכס הכי גדול שיש לנו. כרגע יש שם שתי חלונות גדולות. זה לא מספיק. אני רוצה שכשעומדים בסלון תרגיש שאתה בתוך השדה, לא שאתה מציץ אליו.",
      },
      request: {
        headline: "מה אני מבקש",
        items: [
          "\"לפתוח\" את הקיר כולו — קיר שקוף מלא, או דלתות-קיר מתקפלות/החלקה על פני כל רוחב הסלון.",
          "כשהכל פתוח, לא אמור להיות הפרש מורגש בין רצפת הסלון לטרסה — המשכיות אחת.",
          "החומרים בסלון יתמשכו לחוץ: אותו אבן/עץ, אותם גוונים — כך שהגבול בין פנים לחוץ נמחק.",
        ],
      },
    },
    {
      id: 3,
      icon: "🔮",
      title: "בית שגדל איתנו — גמישות לעתיד",
      color: "#7A4F2B",
      problem: {
        headline: "מה מפריע לי",
        body: "אני לא יודע איך נראה את עצמנו בעוד עשר שנים. אולי ילד ירצה לרדת למטה. אולי נרצה יחידת דיור נפרדת. אולי חדר עבודה יהפוך לחדר שינה. הבית צריך להיות מתוכנן כך שנוכל \"לשחק\" איתו בעתיד — בלי לשבור אותו.",
      },
      request: {
        headline: "מה אני מבקש",
        items: [
          "לסמן על התוכנית את ה\"נקודות גמישות\" — קירות לא-נושאים שניתן להזיז עתידית, ואיזה חדר בקומת קרקע יכול להפוך לחדר שינה עם מקלחת צמודה.",
          "הכנות אינסטלציה מלאות (מים/ביוב/חשמל) למטבחון עתידי — ולערום אזורים רטובים זה מעל זה, כדי שפיצול ליחידת דיור יהיה אפשרי בעלות סבירה.",
          "לחשוב כבר עכשיו על כניסה נפרדת ליחידה עתידית — שגם תיהנה מהנוף לשדות.",
        ],
      },
    },
    {
      id: 4,
      icon: "☀️",
      title: "קומה עליונה — אור, פרטיות ואופי",
      color: "#B5472A",
      problem: {
        headline: "מה מפריע לי",
        body: "שלושה דברים בקומה העליונה: המסדרון מרגיש חשוך, חדר ההורים וחדרי הילדים צמודים מדי בלי פרטיות, ואחד החדרים גדול בצורה לא מאוזנת — ולא קיים שום דבר מיוחד בחדרים.",
      },
      request: {
        headline: "מה אני מבקש",
        items: [
          "אור למסדרון: סקיילייט מעל המסדרון, או חלון גבוה בקצה שלו — אפשר לנצל את הגמלון.",
          "פרטיות: למקם את חדר ההורים כ\"אגף\" בקצה אחד, חדרי הילדים בקצה השני — עם חדר רחצה ו/או המדרגות כחיץ ביניהם.",
          "לאזן את גדלי חדרי הילדים, ולתת לכל חדר משהו ייחודי: מרפסת קטנה, מושב חלון (window seat), פינת קריאה, או תקרה משופעת עם קורות עץ חשופות מתחת לגמלון.",
        ],
      },
    },
    {
      id: 5,
      icon: "🏛️",
      title: "שפה אדריכלית — טוסקנה שלמה, לא רק כניסה",
      color: "#4A5E3A",
      problem: {
        headline: "מה מפריע לי",
        body: "הכניסה מוצאת חן בעיניי מאוד — האבן, הקשת, קורות העץ. אבל חוץ ממנה, הבית מרגיש גבוה וקופסתי, עם קירות חשופים שנראים כמו בניין עיר ולא כמו וילה טוסקנית. כל חזית מספרת סיפור אחר — אני רוצה שכולן ידברו בשפה אחת.",
      },
      request: {
        headline: "מה אני מבקש",
        items: [
          "לשבור את המסה/הגובה: להזיז נפחים (בליטות ושקעים), ולהוסיף אלמנט אופקי שמקרקע את הבית — פרגולה, קורניז, או אגף נמוך שעוטף את הבסיס.",
          "למלא את הקירות החשופים: תריסי עץ, חלונות בפרופורציה נכונה, רצועות אבן, נישות, סורגי ברזל, טיפוס צמחייה — גוון וטקסטורה.",
          "להרחיב את שפת הכניסה (האבן, הקשת, קורות העץ) לשאר החזיתות — כדי שהבית ירגיש מתוכנן כמכלול ולא כ\"גוף לבן עם כניסה יפה\".",
          "לבקש הדמיה מעודכנת של כל ארבע החזיתות יחד — אחרי השינויים.",
        ],
      },
    },
  ];

  return (
    <div
      dir="rtl"
      style={{
        fontFamily: "'Heebo', 'Arial', sans-serif",
        background: "linear-gradient(160deg, #F7F2EA 0%, #EDE5D8 50%, #E8DDD0 100%)",
        minHeight: "100vh",
        color: "#2C1A0E",
      }}
    >
      {/* Hero Header */}
      <header
        style={{
          background: "linear-gradient(135deg, #2C1A0E 0%, #4A2E18 40%, #6B3E24 100%)",
          padding: "48px 24px 40px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative stone texture overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `radial-gradient(circle at 20% 80%, rgba(181,71,42,0.15) 0%, transparent 50%),
                              radial-gradient(circle at 80% 20%, rgba(122,79,43,0.1) 0%, transparent 50%)`,
            pointerEvents: "none",
          }}
        />

        <div style={{ position: "relative", zIndex: 1, maxWidth: 720, margin: "0 auto" }}>
          {/* Ornament */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 20 }}>
            <div style={{ height: 1, width: 60, background: "rgba(181,71,42,0.6)" }} />
            <span style={{ color: "#C4834A", fontSize: 22 }}>⌂</span>
            <div style={{ height: 1, width: 60, background: "rgba(181,71,42,0.6)" }} />
          </div>

          <p style={{ color: "#C4834A", fontSize: 13, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12 }}>
            בריף אדריכלי — ישיבת עבודה
          </p>

          <h1
            style={{
              color: "#F5EDE0",
              fontSize: "clamp(28px, 6vw, 52px)",
              fontWeight: 900,
              lineHeight: 1.1,
              marginBottom: 16,
            }}
          >
            הבית שלנו בשדות
          </h1>

          <p style={{ color: "#C9B99A", fontSize: 15, fontWeight: 400, marginBottom: 24, lineHeight: 1.7 }}>
            חמישה נושאים שאני רוצה לטפל בהם לפני שמתקדמים —
            <br />
            <strong style={{ color: "#E8D5BA" }}>מהפונקציה אל הנשמה.</strong>
          </p>

          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(181,71,42,0.2)",
              border: "1px solid rgba(181,71,42,0.4)",
              borderRadius: 100,
              padding: "8px 20px",
              color: "#E8A87C",
              fontSize: 13,
              fontWeight: 600,
            }}
          >
            <span>📅</span>
            <span>26 ביוני 2026</span>
          </div>
        </div>
      </header>

      {/* Vision Strip */}
      <div
        style={{
          background: "#B5472A",
          padding: "18px 24px",
          textAlign: "center",
        }}
      >
        <p style={{ color: "#FAF0E6", fontSize: 15, fontWeight: 500, maxWidth: 680, margin: "0 auto", lineHeight: 1.7 }}>
          המטרה: לקחת את הסקיצה הזו מ<strong>\"בית פונקציונלי\"</strong> ל
          <strong>\"בית עם נשמה — שנפתח לשדה, מואר, גמיש לעתיד, ועם אופי טוסקני אחיד\"</strong>
        </p>
      </div>

      {/* House Views Overview */}
      <section style={{ maxWidth: 860, margin: "0 auto", padding: "48px 20px 0" }}>
        <SectionLabel text="מה יש לנו עכשיו — ניתוח החזיתות" />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 16,
            marginTop: 20,
          }}
        >
          {[
            { label: "חזית כניסה (דרום-מזרח)", note: "האבן, הקשת, העץ — זה עובד. ✅", icon: "🏠", highlight: true },
            { label: "חזית השדות (מערב)", note: "שתי דלתות הזזה — יכול להיות הרבה יותר. ⚠️", icon: "🌾", highlight: false },
            { label: "חזית צד (צפון)", note: "קיר לבן, חלונות מפוזרים — חסר אופי. ⚠️", icon: "🧱", highlight: false },
            { label: "חזית אחורית (דרום)", note: "קיר גבוה וחשוף — צריך שפה. ⚠️", icon: "📐", highlight: false },
          ].map((f) => (
            <div
              key={f.label}
              style={{
                background: f.highlight ? "linear-gradient(135deg, #B5472A 0%, #8B3520 100%)" : "white",
                borderRadius: 16,
                padding: "20px 18px",
                border: f.highlight ? "none" : "1.5px solid #E2D5C3",
                boxShadow: f.highlight
                  ? "0 8px 24px rgba(181,71,42,0.25)"
                  : "0 2px 12px rgba(44,26,14,0.06)",
              }}
            >
              <div style={{ fontSize: 28, marginBottom: 10 }}>{f.icon}</div>
              <div
                style={{
                  fontWeight: 700,
                  fontSize: 14,
                  marginBottom: 6,
                  color: f.highlight ? "#FAF0E6" : "#2C1A0E",
                }}
              >
                {f.label}
              </div>
              <div
                style={{
                  fontSize: 12.5,
                  color: f.highlight ? "#F5D5C0" : "#7A5E4A",
                  lineHeight: 1.55,
                }}
              >
                {f.note}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Design Issues Sections */}
      <main style={{ maxWidth: 860, margin: "0 auto", padding: "40px 20px 60px" }}>
        <SectionLabel text="הנושאים לדיון — מה אני מבקש לשנות" />

        <div style={{ display: "flex", flexDirection: "column", gap: 28, marginTop: 24 }}>
          {sections.map((sec) => (
            <BriefCard key={sec.id} section={sec} />
          ))}
        </div>

        {/* Closing Section */}
        <div
          style={{
            marginTop: 48,
            background: "linear-gradient(135deg, #2C1A0E 0%, #4A2E18 100%)",
            borderRadius: 24,
            padding: "36px 32px",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 32, marginBottom: 16 }}>🌿</div>
          <h3 style={{ color: "#F5EDE0", fontSize: 22, fontWeight: 800, marginBottom: 14 }}>
            משפט סיכום לפגישה
          </h3>
          <p
            style={{
              color: "#C9B99A",
              fontSize: 15,
              lineHeight: 1.85,
              maxWidth: 620,
              margin: "0 auto",
            }}
          >
            "בקיצור — אני רוצה שניקח את הסקיצה הזו מ<strong style={{ color: "#E8D5BA" }}>'בית פונקציונלי'</strong> ל
            <strong style={{ color: "#E8D5BA" }}>'בית עם נשמה שנפתח לשדה, מואר, גמיש לעתיד, ועם אופי טוסקני אחיד'</strong>.
            בוא נראה איך מגיעים לשם."
          </p>

          {/* Checklist */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 12,
              marginTop: 28,
            }}
          >
            {[
              "חלון גדול למדרגות",
              "קיר סלון פתוח לשדה",
              "נקודות גמישות על התוכנית",
              "אגפים נפרדים בקומה עליונה",
              "שפה אדריכלית אחידה",
              "הדמיה מעודכנת — כל חזיתות",
            ].map((item) => (
              <div
                key={item}
                style={{
                  background: "rgba(181,71,42,0.15)",
                  border: "1px solid rgba(181,71,42,0.3)",
                  borderRadius: 10,
                  padding: "10px 14px",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  textAlign: "right",
                }}
              >
                <span style={{ color: "#C4834A", fontSize: 16, flexShrink: 0 }}>☐</span>
                <span style={{ color: "#E8D5BA", fontSize: 13, fontWeight: 500 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div style={{ textAlign: "center", marginTop: 40, color: "#A08070", fontSize: 12 }}>
          בריף מוכן ל-26.06.2026 — ישיבת עבודה עם האדריכל
        </div>
      </main>
    </div>
  );
}

function SectionLabel({ text }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 4 }}>
      <div style={{ height: 2, flex: 1, background: "linear-gradient(to left, #D4C5A9, transparent)" }} />
      <span
        style={{
          color: "#7A5E4A",
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          whiteSpace: "nowrap",
        }}
      >
        {text}
      </span>
      <div style={{ height: 2, flex: 1, background: "linear-gradient(to right, #D4C5A9, transparent)" }} />
    </div>
  );
}

function BriefCard({ section }) {
  const { id, icon, title, color, problem, request } = section;

  return (
    <div
      style={{
        background: "white",
        borderRadius: 20,
        overflow: "hidden",
        boxShadow: "0 4px 24px rgba(44,26,14,0.08)",
        border: "1.5px solid #EDE0D0",
      }}
    >
      {/* Card Header */}
      <div
        style={{
          background: `linear-gradient(135deg, ${color} 0%, ${adjustColor(color, -25)} 100%)`,
          padding: "22px 28px",
          display: "flex",
          alignItems: "center",
          gap: 16,
        }}
      >
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.18)",
            border: "2px solid rgba(255,255,255,0.35)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 24,
            flexShrink: 0,
          }}
        >
          {icon}
        </div>
        <div style={{ flex: 1 }}>
          <div
            style={{
              color: "rgba(255,255,255,0.75)",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              marginBottom: 4,
            }}
          >
            נושא {id} מתוך 5
          </div>
          <h2
            style={{
              color: "white",
              fontSize: "clamp(16px, 3vw, 20px)",
              fontWeight: 800,
              lineHeight: 1.25,
              margin: 0,
            }}
          >
            {title}
          </h2>
        </div>
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            background: "rgba(255,255,255,0.12)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "rgba(255,255,255,0.5)",
            fontSize: 22,
            fontWeight: 900,
            flexShrink: 0,
          }}
        >
          {id}
        </div>
      </div>

      {/* Card Body */}
      <div style={{ padding: "24px 28px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        {/* Problem */}
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 12,
            }}
          >
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#D97054",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                color: "#B5472A",
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              {problem.headline}
            </span>
          </div>
          <p
            style={{
              color: "#4A3020",
              fontSize: 14,
              lineHeight: 1.8,
              margin: 0,
              background: "#FEF8F2",
              border: "1px solid #F0DDD0",
              borderRadius: 12,
              padding: "14px 16px",
            }}
          >
            {problem.body}
          </p>
        </div>

        {/* Request */}
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 12,
            }}
          >
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#4A5E3A",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                color: "#4A5E3A",
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              {request.headline}
            </span>
          </div>
          <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
            {request.items.map((item, i) => (
              <li
                key={i}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 10,
                  background: "#F4F8F2",
                  border: "1px solid #D8E8D0",
                  borderRadius: 10,
                  padding: "11px 13px",
                }}
              >
                <span
                  style={{
                    color: "#4A5E3A",
                    fontSize: 14,
                    fontWeight: 700,
                    flexShrink: 0,
                    marginTop: 1,
                    lineHeight: 1,
                  }}
                >
                  ✓
                </span>
                <span
                  style={{
                    color: "#344A2A",
                    fontSize: 13,
                    lineHeight: 1.65,
                  }}
                >
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

// Simple color darkening helper — avoids external deps
function adjustColor(hex, amount) {
  const num = parseInt(hex.replace("#", ""), 16);
  const r = Math.max(0, Math.min(255, (num >> 16) + amount));
  const g = Math.max(0, Math.min(255, ((num >> 8) & 0xff) + amount));
  const b = Math.max(0, Math.min(255, (num & 0xff) + amount));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}

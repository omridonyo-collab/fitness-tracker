// Architectural "After" illustrations — 5 visual scenes
import { useState } from "react";

const SCENES = [
  { id: "salon",    num: 1, title: "קיר הסלון — פתוח לשדות",      sub: "נוף פנימי מהסלון" },
  { id: "entry",    num: 2, title: "כניסה — חלון לגובה שתי קומות", sub: "חלל הכניסה והמדרגות" },
  { id: "west",     num: 3, title: "חזית השדות — זכוכית מלאה",     sub: "חזית מערב — מבחוץ" },
  { id: "tuscan",   num: 4, title: "חזית צד — שפה טוסקנית",        sub: "חזית צפון — מבחוץ" },
  { id: "upfloor",  num: 5, title: "קומה עליונה — פרטיות ואופי",   sub: "תוכנית קומה עליונה" },
];

export default function VillaAfter() {
  const [active, setActive] = useState(0);

  return (
    <div dir="rtl" style={{ fontFamily: "'Heebo',Arial,sans-serif", background: "#0c0805", minHeight: "100vh", color: "#F5EDE0", display: "flex", flexDirection: "column" }}>

      {/* Header */}
      <header style={{ background: "linear-gradient(135deg,#1a0f06,#2d1a0a)", borderBottom: "1px solid rgba(181,71,42,.35)", padding: "14px 24px" }}>
        <div style={{ color: "#C4834A", fontSize: 11, fontWeight: 700, letterSpacing: ".2em", marginBottom: 2 }}>הדמיות — מצב אחרי השינויים</div>
        <div style={{ fontSize: 20, fontWeight: 900 }}>הבית שלנו בשדות</div>
      </header>

      {/* Tabs */}
      <nav style={{ display: "flex", gap: 6, padding: "10px 14px", background: "#120804", borderBottom: "1px solid rgba(255,255,255,.05)", overflowX: "auto", flexShrink: 0 }}>
        {SCENES.map((s, i) => (
          <button key={s.id} onClick={() => setActive(i)} style={{
            background: active === i ? "#B5472A" : "rgba(255,255,255,.05)",
            border: `1px solid ${active === i ? "#B5472A" : "rgba(255,255,255,.1)"}`,
            color: active === i ? "#fff" : "#9A7A6A",
            borderRadius: 10, padding: "7px 14px", fontSize: 12, fontWeight: 700,
            cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0,
          }}>
            <span style={{ marginLeft: 5, opacity: .7 }}>{s.num}.</span>{s.title.split(" — ")[0]}
          </button>
        ))}
      </nav>

      {/* Scene */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", padding: "20px 16px 28px" }}>
        <div style={{ marginBottom: 12, textAlign: "center" }}>
          <div style={{ color: "#C4834A", fontSize: 11, fontWeight: 700, letterSpacing: ".15em", marginBottom: 4 }}>{SCENES[active].sub}</div>
          <h2 style={{ fontSize: "clamp(18px,3vw,24px)", fontWeight: 900, margin: 0 }}>{SCENES[active].title}</h2>
        </div>

        <div style={{ width: "100%", maxWidth: 920, borderRadius: 18, overflow: "hidden", boxShadow: "0 12px 60px rgba(0,0,0,.7)", border: "1px solid rgba(255,255,255,.07)" }}>
          {active === 0 && <SalonScene />}
          {active === 1 && <EntryScene />}
          {active === 2 && <WestFacadeScene />}
          {active === 3 && <TuscanFacadeScene />}
          {active === 4 && <UpperFloorScene />}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   SCENE 1 — SALON: interior perspective, full glass wall to fields
══════════════════════════════════════════════════════════════════ */
function SalonScene() {
  return (
    <svg viewBox="0 0 900 540" xmlns="http://www.w3.org/2000/svg" style={{ display: "block", width: "100%", height: "auto" }}>
      <defs>
        <linearGradient id="sky1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5BB8E8" />
          <stop offset="55%" stopColor="#A8DAFA" />
          <stop offset="100%" stopColor="#D4EFA8" />
        </linearGradient>
        <linearGradient id="fields1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7DC96B" />
          <stop offset="100%" stopColor="#4A8C3F" />
        </linearGradient>
        <linearGradient id="floor1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C8955A" />
          <stop offset="100%" stopColor="#A0703A" />
        </linearGradient>
        <linearGradient id="ceil1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7A4F2B" />
          <stop offset="100%" stopColor="#5A3818" />
        </linearGradient>
        <linearGradient id="lwall1" x1="1" y1="0" x2="0" y2="0">
          <stop offset="0%" stopColor="#F0E4D0" />
          <stop offset="100%" stopColor="#D8C9B0" />
        </linearGradient>
        <linearGradient id="rwall1" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#F0E4D0" />
          <stop offset="100%" stopColor="#D0C0A0" />
        </linearGradient>
        <linearGradient id="sunbeam" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFF9C4" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#FFF9C4" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="glow1" cx="50%" cy="40%" r="50%">
          <stop offset="0%" stopColor="#FFFDE0" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#FFFDE0" stopOpacity="0" />
        </radialGradient>
        <clipPath id="backwall">
          <rect x="130" y="38" width="640" height="352" />
        </clipPath>
        <filter id="blur2">
          <feGaussianBlur stdDeviation="2" />
        </filter>
      </defs>

      {/* ── Background through glass: sky + landscape ── */}
      <rect x="130" y="38" width="640" height="352" fill="url(#sky1)" />
      {/* Rolling hills */}
      <path d="M130,290 Q250,240 370,265 Q490,290 600,255 Q700,230 770,250 L770,390 L130,390 Z" fill="#5A9E4E" />
      <path d="M130,310 Q200,280 320,300 Q430,315 530,290 Q640,265 770,280 L770,390 L130,390 Z" fill="url(#fields1)" />
      {/* Trees silhouettes */}
      {[180,240,320,580,650,720].map((x,i) => (
        <g key={i}>
          <line x1={x} y1={290-(i%3)*12} x2={x} y2={310-(i%3)*8} stroke="#2D5A27" strokeWidth="3" />
          <ellipse cx={x} cy={285-(i%3)*12} rx={14+(i%2)*5} ry={18+(i%3)*4} fill="#3A7A32" fillOpacity="0.9" />
        </g>
      ))}
      {/* Distant cypress trees */}
      {[420,445,470,495].map((x,i) => (
        <ellipse key={i} cx={x} cy={260} rx={5} ry={22} fill="#2D5A27" fillOpacity="0.6" />
      ))}
      {/* Sun glow */}
      <circle cx="680" cy="80" r="40" fill="#FFF5A0" fillOpacity="0.5" filter="url(#blur2)" />
      <circle cx="680" cy="80" r="20" fill="#FFED6A" fillOpacity="0.7" />

      {/* ── Room structure ── */}
      {/* Left wall */}
      <polygon points="0,0 130,38 130,390 0,540" fill="url(#lwall1)" />
      {/* Right wall */}
      <polygon points="900,0 770,38 770,390 900,540" fill="url(#rwall1)" />
      {/* Ceiling */}
      <polygon points="0,0 900,0 770,38 130,38" fill="url(#ceil1)" />
      {/* Floor — stone tiles */}
      <polygon points="0,540 900,540 770,390 130,390" fill="url(#floor1)" />

      {/* Floor tiles grid */}
      {[0.2,0.4,0.6,0.8].map((t,i) => (
        <line key={i}
          x1={130+t*640} y1={390} x2={0+t*900} y2={540}
          stroke="#8A5530" strokeWidth="1" strokeOpacity="0.5"
        />
      ))}
      {[0.25,0.5,0.75].map((t,i) => (
        <line key={i}
          x1={130} y1={390+t*150} x2={900} y2={390+t*150}
          stroke="#8A5530" strokeWidth="1" strokeOpacity="0.35"
        />
      ))}

      {/* ── Exposed ceiling beams ── */}
      {[0.15,0.33,0.5,0.67,0.85].map((t,i) => {
        const x1 = 0 + t*900, x2 = 130 + t*640;
        return (
          <g key={i}>
            <polygon points={`${x1-18},0 ${x1+18},0 ${x2+10},38 ${x2-10},38`} fill="#5A3010" fillOpacity="0.8" />
            <polygon points={`${x1-18},0 ${x1+18},0 ${x1+18},8 ${x1-18},8`} fill="#7A4A1A" fillOpacity="0.6" />
          </g>
        );
      })}

      {/* ── Full-width glass wall ── */}
      {/* Main frame top */}
      <rect x="127" y="35" width="646" height="8" fill="#3A2A1A" rx="1" />
      {/* Bottom frame */}
      <rect x="127" y="385" width="646" height="8" fill="#3A2A1A" rx="1" />
      {/* Glass panels — 5 panels */}
      {[0,1,2,3,4].map(i => {
        const pw = 128, x = 130 + i*pw;
        return (
          <g key={i}>
            {/* Frame sides */}
            <rect x={x} y="38" width="5" height="352" fill="#2A1A0A" fillOpacity="0.7" />
            {/* Glass reflection */}
            <rect x={x+5} y="38" width={pw-5} height="352" fill="#E8F8FF" fillOpacity="0.06" />
            <line x1={x+20} y1={38} x2={x+pw-10} y2={390} stroke="white" strokeWidth="1" strokeOpacity="0.12" />
          </g>
        );
      })}
      {/* Last frame */}
      <rect x="765" y="38" width="5" height="352" fill="#2A1A0A" fillOpacity="0.7" />

      {/* Pergola overhang shadow at top */}
      <rect x="130" y="38" width="640" height="30" fill="#1A0A00" fillOpacity="0.25" />

      {/* Light on floor */}
      <polygon points="130,390 770,390 820,540 80,540" fill="url(#sunbeam)" />
      <rect x="0" y="0" width="900" height="540" fill="url(#glow1)" />

      {/* ── Furniture ── */}
      {/* Sofa */}
      <g>
        {/* Sofa body */}
        <path d="M220,440 Q220,415 240,415 L580,415 Q600,415 600,440 L600,480 L220,480 Z" fill="#7A5540" />
        {/* Sofa back */}
        <rect x="220" y="400" width="380" height="20" rx="5" fill="#5A3520" />
        {/* Cushions */}
        {[0,1,2].map(i => (
          <rect key={i} x={230+i*128} y={420} width={118} height={50} rx="6" fill="#8A6550" />
        ))}
        {/* Sofa legs */}
        {[235,575].map((x,i) => <rect key={i} x={x} y={478} width={12} height={12} rx="2" fill="#3A1A0A" />)}
      </g>

      {/* Low coffee table */}
      <rect x="300" y="488" width="230" height="8" rx="3" fill="#5A3010" />
      {[308,522].map((x,i) => <rect key={i} x={x} y={496} width={8} height={20} rx="2" fill="#3A2010" />)}

      {/* Side table + vase */}
      <rect x="610" y="440" width="55" height="45" rx="4" fill="#4A2E10" />
      <ellipse cx="637" cy="440" rx="12" ry="5" fill="#8A6030" />
      <rect x="630" y="410" width="14" height="32" rx="5" fill="#6A8A50" />
      <ellipse cx="637" cy="408" rx="10" ry="6" fill="#4A7A30" />

      {/* Rug */}
      <ellipse cx="400" cy="490" rx="180" ry="22" fill="#8A5030" fillOpacity="0.35" />

      {/* Label */}
      <rect x="14" y="14" width="200" height="22" rx="6" fill="#B5472A" fillOpacity="0.9" />
      <text x="114" y="29" textAnchor="middle" fill="white" fontSize="11" fontWeight="700">קיר-זכוכית מלא — פתוח לשדה</text>
    </svg>
  );
}

/* ══════════════════════════════════════════════════════════════
   SCENE 2 — ENTRY: double-height staircase window
══════════════════════════════════════════════════════════════ */
function EntryScene() {
  return (
    <svg viewBox="0 0 720 560" xmlns="http://www.w3.org/2000/svg" style={{ display: "block", width: "100%", height: "auto" }}>
      <defs>
        <linearGradient id="skyE" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5BAEE8" />
          <stop offset="70%" stopColor="#AADCF5" />
          <stop offset="100%" stopColor="#C8EDB5" />
        </linearGradient>
        <linearGradient id="wallE" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#E8D8C0" />
          <stop offset="100%" stopColor="#F5EDE0" />
        </linearGradient>
        <linearGradient id="sunE" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFF8D0" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#FFF8D0" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="floorE" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C8955A" />
          <stop offset="100%" stopColor="#9A6830" />
        </linearGradient>
        <filter id="glow2"><feGaussianBlur stdDeviation="6" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>

      {/* Background wall */}
      <rect width="720" height="560" fill="url(#wallE)" />

      {/* Tall window — full left side, two stories */}
      {/* Sky visible */}
      <rect x="30" y="20" width="200" height="430" fill="url(#skyE)" rx="4" />
      {/* Trees outside */}
      {[80, 140, 195].map((x,i) => (
        <g key={i}>
          <rect x={x-3} y={340-(i*20)} width={6} height={100+(i*20)} fill="#3A6A2A" />
          <ellipse cx={x} cy={335-(i*20)} rx={22+(i*8)} ry={30+(i*5)} fill="#3D7A30" />
        </g>
      ))}
      {/* Horizon line */}
      <line x1="30" y1="380" x2="230" y2="380" stroke="#5A9E4E" strokeWidth="1" strokeOpacity="0.5" />

      {/* Window frame */}
      <rect x="26" y="16" width="208" height="438" rx="4" fill="none" stroke="#2A1A0A" strokeWidth="6" />
      {/* Horizontal divider at floor1 level */}
      <rect x="26" y="238" width="208" height="5" fill="#2A1A0A" />
      {/* Vertical center divider */}
      <rect x="128" y="16" width="4" height="438" fill="#2A1A0A" />
      {/* Glass reflection highlights */}
      <line x1="50" y1="20" x2="50" y2="450" stroke="white" strokeWidth="2" strokeOpacity="0.15" />
      <line x1="80" y1="20" x2="80" y2="230" stroke="white" strokeWidth="1" strokeOpacity="0.1" />

      {/* Sunlight rays pouring in */}
      <polygon points="230,20 720,120 720,280 230,180" fill="url(#sunE)" />
      <polygon points="230,180 720,280 720,400 230,380" fill="url(#sunE)" />

      {/* Stone wall left of window */}
      <rect x="0" y="0" width="30" height="560" fill="#B0A090" />
      {/* Stone pattern */}
      {[0,1,2,3,4,5,6,7,8].map(row => (
        [0].map(col => (
          <rect key={`${row}-${col}`} x={2} y={row*65 + (row%2)*20} width={24} height={40} rx="2"
            fill={row%3===0 ? "#A09080" : row%3===1 ? "#B0A090" : "#988070"}
            stroke="#7A6050" strokeWidth="0.5"
          />
        ))
      ))}

      {/* Upper stone wall (above window) */}
      <rect x="30" y="0" width="230" height="20" fill="#B8A898" />

      {/* Right side — staircase */}
      {/* Floor 1 */}
      <rect x="230" y="440" width="490" height="120" fill="url(#floorE)" />
      {/* Floor tiles */}
      {[260,320,380,440,500,560,620,680].map(x => (
        <line key={x} x1={x} y1={440} x2={x} y2={560} stroke="#8A5530" strokeWidth="0.8" strokeOpacity="0.4" />
      ))}

      {/* Staircase */}
      {Array.from({length: 12}).map((_,i) => {
        const x = 280 + i*36;
        const y = 440 - i*20;
        return (
          <g key={i}>
            {/* Tread */}
            <rect x={x} y={y} width={36} height={4} fill="#D4A870" />
            {/* Riser */}
            <rect x={x} y={y+4} width={4} height={20} fill="#B08050" />
          </g>
        );
      })}

      {/* Upper landing */}
      <rect x="700" y="200" width="20" height="240" fill="#C8955A" />

      {/* Handrail */}
      <path d="M280,420 L560,180 L720,180" fill="none" stroke="#3A1A0A" strokeWidth="6" strokeLinecap="round" />
      {/* Balusters */}
      {Array.from({length: 10}).map((_,i) => {
        const x = 280 + i*28;
        const y = 420 - i*24;
        return <line key={i} x1={x} y1={y} x2={x} y2={y+45} stroke="#3A1A0A" strokeWidth="2" />;
      })}

      {/* Right wall */}
      <rect x="680" y="0" width="40" height="560" fill="#EDE0CC" />

      {/* Ceiling */}
      <rect x="230" y="0" width="490" height="30" fill="#5A3810" />
      {/* Ceiling beams */}
      {[310, 420, 530, 630].map(x => (
        <rect key={x} x={x} y={0} width={18} height={30} fill="#4A2A08" fillOpacity="0.6" />
      ))}

      {/* Upper floor slab edge */}
      <rect x="230" y="200" width="490" height="16" fill="#D0B890" />

      {/* Light pool on floor from window */}
      <polygon points="230,440 700,440 720,560 240,560" fill="#FFF8D0" fillOpacity="0.2" />

      {/* Labels */}
      <rect x="44" y="455" width="182" height="20" rx="5" fill="#1A0A00" fillOpacity="0.7" />
      <text x="135" y="469" textAnchor="middle" fill="#FFF8D0" fontSize="11" fontWeight="700">חלון גובה שתי קומות</text>

      <rect x="310" y="14" width="180" height="20" rx="5" fill="#B5472A" fillOpacity="0.85" />
      <text x="400" y="28" textAnchor="middle" fill="white" fontSize="11" fontWeight="700">חלל כניסה פתוח — אור טבעי</text>
    </svg>
  );
}

/* ══════════════════════════════════════════════════════════════
   SCENE 3 — WEST FACADE: full glass wall from outside
══════════════════════════════════════════════════════════════ */
function WestFacadeScene() {
  return (
    <svg viewBox="0 0 900 540" xmlns="http://www.w3.org/2000/svg" style={{ display: "block", width: "100%", height: "auto" }}>
      <defs>
        <linearGradient id="skyW" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4A9ED8" />
          <stop offset="60%" stopColor="#8FCDF0" />
          <stop offset="100%" stopColor="#B8E4A8" />
        </linearGradient>
        <linearGradient id="groundW" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5A9E4E" />
          <stop offset="100%" stopColor="#3A6A30" />
        </linearGradient>
        <linearGradient id="glassW" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D0EEFF" stopOpacity="0.55" />
          <stop offset="50%" stopColor="#B0DAFF" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#D0EEFF" stopOpacity="0.3" />
        </linearGradient>
        <linearGradient id="stuccoW" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F0E4D0" />
          <stop offset="100%" stopColor="#E4D4BC" />
        </linearGradient>
      </defs>

      {/* Sky */}
      <rect width="900" height="540" fill="url(#skyW)" />
      {/* Clouds */}
      {[[120,80,90],[300,60,70],[550,90,80],[750,65,60]].map(([x,y,w],i) => (
        <g key={i}>
          <ellipse cx={x} cy={y} rx={w} ry={28} fill="white" fillOpacity="0.65" />
          <ellipse cx={x+30} cy={y-10} rx={w*0.6} ry={22} fill="white" fillOpacity="0.5" />
        </g>
      ))}
      {/* Sun */}
      <circle cx="820" cy="70" r="35" fill="#FFF066" fillOpacity="0.8" />

      {/* Ground */}
      <rect x="0" y="400" width="900" height="140" fill="url(#groundW)" />
      {/* Grass texture */}
      {Array.from({length: 40}).map((_,i) => (
        <line key={i} x1={i*24} y1={400} x2={i*24+6} y2={390} stroke="#4A8A3E" strokeWidth="1.5" strokeOpacity="0.5" />
      ))}

      {/* Terrace / platform */}
      <rect x="100" y="390" width="700" height="14" fill="#C8B090" />
      <rect x="90" y="400" width="720" height="8" fill="#B09870" />

      {/* ── House body ── */}
      {/* Main wall stucco — upper floor */}
      <rect x="150" y="120" width="600" height="270" fill="url(#stuccoW)" />

      {/* ── Full glass ground floor ── */}
      {/* Glass backing (interior warm light) */}
      <rect x="150" y="250" width="600" height="140" fill="#FFF5D8" fillOpacity="0.6" />
      {/* Glass panels — 6 panels across */}
      {Array.from({length: 6}).map((_,i) => {
        const pw = 100, x = 150 + i*pw;
        return (
          <g key={i}>
            <rect x={x} y={250} width={pw} height={140} fill="url(#glassW)" />
            {/* Frame */}
            <rect x={x} y={250} width={3} height={140} fill="#3A2A1A" fillOpacity="0.6" />
            {/* Glass reflection */}
            <line x1={x+12} y1={250} x2={x+8} y2={390} stroke="white" strokeWidth="2" strokeOpacity="0.2" />
            {/* Interior warm glow visible through glass */}
            <rect x={x+3} y={250} width={pw-3} height={140} fill="#FFF8E0" fillOpacity="0.08" />
          </g>
        );
      })}
      {/* Top glass frame beam */}
      <rect x="147" y="246" width="606" height="8" fill="#2A1A0A" rx="2" />
      {/* Bottom glass frame */}
      <rect x="147" y="386" width="606" height="8" fill="#2A1A0A" rx="2" />

      {/* Interior visible through glass — warm living room */}
      <rect x="160" y="330" width="580" height="55" fill="#C08050" fillOpacity="0.15" />
      {/* Furniture silhouette through glass */}
      <rect x="220" y="340" width="200" height="40" rx="5" fill="#6A4020" fillOpacity="0.25" />
      <rect x="440" y="345" width="120" height="35" rx="4" fill="#5A3010" fillOpacity="0.2" />

      {/* ── Floor separation band ── */}
      {/* Wood beam cornice */}
      <rect x="140" y="238" width="620" height="16" fill="#7A4F2B" />
      {/* Beam texture */}
      {[165,220,280,340,400,460,520,580,640,700].map(x => (
        <line key={x} x1={x} y1={238} x2={x-5} y2={254} stroke="#5A3010" strokeWidth="4" strokeOpacity="0.5" />
      ))}

      {/* ── Upper floor windows ── */}
      {/* Left window group (2 windows together) */}
      <rect x="180" y="145" width="85" height="65" rx="3" fill="#B0D8F0" fillOpacity="0.7" />
      <rect x="180" y="145" width="85" height="65" rx="3" fill="none" stroke="#2A1A0A" strokeWidth="3" />
      <line x1="222" y1="145" x2="222" y2="210" stroke="#2A1A0A" strokeWidth="2" />
      {/* Wood shutters left */}
      <rect x="165" y="145" width="14" height="65" rx="2" fill="#7A4F2B" />
      <rect x="266" y="145" width="14" height="65" rx="2" fill="#7A4F2B" />
      {/* Shutter slats */}
      {[0,1,2,3,4].map(i => <line key={i} x1={165} y1={158+i*11} x2={179} y2={158+i*11} stroke="#5A3010" strokeWidth="1" />)}
      {[0,1,2,3,4].map(i => <line key={i} x1={266} y1={158+i*11} x2={280} y2={158+i*11} stroke="#5A3010" strokeWidth="1" />)}

      {/* Center window group (2 + balcony doors) */}
      <rect x="360" y="140" width="80" height="90" rx="3" fill="#B0D8F0" fillOpacity="0.7" />
      <rect x="360" y="140" width="80" height="90" rx="3" fill="none" stroke="#2A1A0A" strokeWidth="3" />
      <line x1="400" y1="140" x2="400" y2="230" stroke="#2A1A0A" strokeWidth="2" />

      <rect x="450" y="140" width="80" height="90" rx="3" fill="#B0D8F0" fillOpacity="0.65" />
      <rect x="450" y="140" width="80" height="90" rx="3" fill="none" stroke="#2A1A0A" strokeWidth="3" />
      <line x1="490" y1="140" x2="490" y2="230" stroke="#2A1A0A" strokeWidth="2" />
      {/* Balcony railing */}
      <rect x="355" y="228" width="180" height="5" fill="#3A2A1A" />
      {[365,385,405,425,445,465,485,505,525].map(x => (
        <rect key={x} x={x} y={228} width={2} height={20} fill="#3A2A1A" />
      ))}
      <rect x="355" y="246" width="180" height="3" fill="#3A2A1A" />

      {/* Right window */}
      <rect x="620" y="145" width="85" height="65" rx="3" fill="#B0D8F0" fillOpacity="0.7" />
      <rect x="620" y="145" width="85" height="65" rx="3" fill="none" stroke="#2A1A0A" strokeWidth="3" />
      <line x1="662" y1="145" x2="662" y2="210" stroke="#2A1A0A" strokeWidth="2" />
      {/* Wood shutters right */}
      <rect x="605" y="145" width="14" height="65" rx="2" fill="#7A4F2B" />
      <rect x="706" y="145" width="14" height="65" rx="2" fill="#7A4F2B" />

      {/* ── Roof + wooden pergola ── */}
      {/* Roof gable */}
      <polygon points="100,120 450,30 800,120" fill="#8B4513" />
      <polygon points="100,120 800,120 800,130 100,130" fill="#6B3010" />
      {/* Gable fill */}
      <polygon points="150,120 450,50 750,120" fill="url(#stuccoW)" />
      {/* Roof tile pattern */}
      {[0,1,2,3,4,5,6].map(i => {
        const y1 = 50 + i*12, span = (720/7)*i;
        return <line key={i} x1={150+span*0.15} y1={120} x2={450-(i-3.5)*35} y2={y1} stroke="#6B3010" strokeWidth="1" strokeOpacity="0.3" />;
      })}
      {/* Wood pergola beams at eave */}
      {[165,225,290,355,420,485,550,615,670,725].map(x => (
        <rect key={x} x={x} y={116} width={14} height={20} rx="3" fill="#7A4F2B" />
      ))}

      {/* ── Stone corner elements ── */}
      <rect x="140" y="120" width="16" height="280" fill="#B0A090" />
      {[0,1,2,3,4,5,6,7].map(i => (
        <rect key={i} x={141} y={125+i*40} width={14} height={28} rx="2" fill={i%2===0?"#A09080":"#B8A898"} stroke="#8A7870" strokeWidth="0.5" />
      ))}
      <rect x="744" y="120" width="16" height="280" fill="#B0A090" />
      {[0,1,2,3,4,5,6,7].map(i => (
        <rect key={i} x={745} y={125+i*40} width={14} height={28} rx="2" fill={i%2===0?"#A09080":"#B8A898"} stroke="#8A7870" strokeWidth="0.5" />
      ))}

      {/* Climbing vine on corner */}
      <path d="M140,390 Q132,360 145,330 Q135,300 148,260 Q138,230 145,200" fill="none" stroke="#4A7A30" strokeWidth="3" strokeOpacity="0.7" />
      {[390,360,330,300,270,240,210].map((y,i) => (
        <ellipse key={i} cx={140+(i%2)*(-8)+4} cy={y} rx={8+(i%3)*3} ry={6+(i%2)*3} fill="#4A8A30" fillOpacity="0.7" />
      ))}

      {/* Label */}
      <rect x="14" y="14" width="260" height="22" rx="6" fill="#B5472A" fillOpacity="0.9" />
      <text x="144" y="29" textAnchor="middle" fill="white" fontSize="11" fontWeight="700">חזית שדות — זכוכית מלאה כל הרוחב</text>
    </svg>
  );
}

/* ══════════════════════════════════════════════════════════════
   SCENE 4 — TUSCAN SIDE FACADE
══════════════════════════════════════════════════════════════ */
function TuscanFacadeScene() {
  return (
    <svg viewBox="0 0 900 540" xmlns="http://www.w3.org/2000/svg" style={{ display: "block", width: "100%", height: "auto" }}>
      <defs>
        <linearGradient id="skyT" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3A88C8" />
          <stop offset="55%" stopColor="#7ABFE8" />
          <stop offset="100%" stopColor="#A8D89A" />
        </linearGradient>
        <linearGradient id="stuccoT" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F2E6D2" />
          <stop offset="100%" stopColor="#E4D4BA" />
        </linearGradient>
        <linearGradient id="groundT" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6AAA58" />
          <stop offset="100%" stopColor="#4A7A38" />
        </linearGradient>
        <pattern id="stone" x="0" y="0" width="40" height="30" patternUnits="userSpaceOnUse">
          <rect width="40" height="30" fill="#B0A088" />
          <rect x="1" y="1" width="36" height="13" rx="1" fill="#BEB09A" stroke="#9A8870" strokeWidth="0.5" />
          <rect x="1" y="16" width="18" height="12" rx="1" fill="#A89878" stroke="#8A7860" strokeWidth="0.5" />
          <rect x="21" y="16" width="18" height="12" rx="1" fill="#C0B09A" stroke="#9A8870" strokeWidth="0.5" />
        </pattern>
      </defs>

      {/* Sky */}
      <rect width="900" height="540" fill="url(#skyT)" />
      {/* Clouds */}
      {[[180,60,80],[480,45,65],[720,70,55]].map(([x,y,w],i) => (
        <g key={i}>
          <ellipse cx={x} cy={y} rx={w} ry={25} fill="white" fillOpacity="0.6" />
          <ellipse cx={x+25} cy={y-8} rx={w*0.55} ry={18} fill="white" fillOpacity="0.45" />
        </g>
      ))}

      {/* Ground */}
      <rect x="0" y="415" width="900" height="125" fill="url(#groundT)" />
      {[20,60,100,150,200,250].map(x => (
        <line key={x} x1={x} y1={415} x2={x+8} y2={405} stroke="#3A7A28" strokeWidth="1.5" strokeOpacity="0.5" />
      ))}

      {/* Path / terrace */}
      <rect x="100" y="408" width="700" height="12" fill="#C0A880" />
      <rect x="90" y="416" width="720" height="6" fill="#A89060" />

      {/* ── Main house body ── */}
      <rect x="120" y="110" width="660" height="300" fill="url(#stuccoT)" />

      {/* ── Stone cladding — base band ── */}
      <rect x="120" y="340" width="660" height="70" fill="url(#stone)" />

      {/* ── Stone cladding — corner pillars ── */}
      <rect x="120" y="110" width="55" height="300" fill="url(#stone)" />
      <rect x="725" y="110" width="55" height="300" fill="url(#stone)" />

      {/* ── Stone arch entry (left corner detail) ── */}
      <path d="M120,330 Q155,280 175,330" fill="none" stroke="#8A7060" strokeWidth="3" />
      <rect x="120" y="330" width="55" height="10" fill="#9A8070" />

      {/* ── Horizontal wood cornice ── */}
      {/* Main separation beam */}
      <rect x="115" y="238" width="670" height="18" fill="#7A4F2B" />
      {/* Beam ends / corbels */}
      {[135,185,240,295,350,405,460,515,570,625,680,720].map(x => (
        <g key={x}>
          <rect x={x} y={220} width={16} height={38} rx="3" fill="#6A3F1B" />
          <rect x={x-2} y={252} width={20} height={6} rx="2" fill="#5A3010" />
        </g>
      ))}

      {/* ── Upper floor windows — LEFT group ── */}
      {/* 2 arched windows together */}
      {[0,1].map(i => {
        const x = 195 + i * 85;
        return (
          <g key={i}>
            {/* Arch frame */}
            <path d={`M${x},215 L${x},155 Q${x+32},125 ${x+64},155 L${x+64},215 Z`}
              fill="#B0CCEE" fillOpacity="0.75" stroke="#2A1A0A" strokeWidth="2.5" />
            {/* Arch keystone */}
            <path d={`M${x+28},127 Q${x+32},122 ${x+36},127`} fill="none" stroke="#2A1A0A" strokeWidth="2" />
            {/* Wood shutter left */}
            <rect x={x-14} y={155} width={12} height={60} rx="2" fill="#7A4F2B" />
            {[0,1,2,3,4].map(j => <line key={j} x1={x-14} y1={162+j*10} x2={x-2} y2={162+j*10} stroke="#5A3010" strokeWidth="1" />)}
            {/* Wood shutter right */}
            <rect x={x+64} y={155} width={12} height={60} rx="2" fill="#7A4F2B" />
            {[0,1,2,3,4].map(j => <line key={j} x1={x+64} y1={162+j*10} x2={x+76} y2={162+j*10} stroke="#5A3010" strokeWidth="1" />)}
          </g>
        );
      })}

      {/* ── Upper floor windows — RIGHT group ── */}
      {/* Balcony + 2 windows */}
      {/* Window seat / wider window */}
      <rect x="500" y="145" width="100" height="90" rx="3" fill="#B0CCEE" fillOpacity="0.75" />
      <rect x="500" y="145" width="100" height="90" rx="3" fill="none" stroke="#2A1A0A" strokeWidth="2.5" />
      <line x1="550" y1="145" x2="550" y2="235" stroke="#2A1A0A" strokeWidth="1.5" />
      {/* Window seat detail */}
      <rect x="500" y="228" width="100" height="8" fill="#D4B480" />

      <rect x="615" y="150" width="75" height="85" rx="3" fill="#B0CCEE" fillOpacity="0.7" />
      <rect x="615" y="150" width="75" height="85" rx="3" fill="none" stroke="#2A1A0A" strokeWidth="2.5" />
      {/* Shutters */}
      <rect x="601" y="150" width="12} " width="12" height="85" rx="2" fill="#7A4F2B" />
      <rect x="691" y="150" width="12" height="85" rx="2" fill="#7A4F2B" />
      {[0,1,2,3,4,5].map(j => <line key={j} x1={601} y1={160+j*12} x2={613} y2={160+j*12} stroke="#5A3010" strokeWidth="1" />)}

      {/* ── Ground floor windows — arched small ── */}
      {[195, 340, 520].map(x => (
        <g key={x}>
          <path d={`M${x},395 L${x},295 Q${x+35},265 ${x+70},295 L${x+70},395 Z`}
            fill="#B0CCEE" fillOpacity="0.65" stroke="#2A1A0A" strokeWidth="2" />
          {/* Cross frame */}
          <line x1={x+35} y1={270} x2={x+35} y2={395} stroke="#2A1A0A" strokeWidth="1.5" />
          <line x1={x} y1={340} x2={x+70} y2={340} stroke="#2A1A0A" strokeWidth="1.5" />
        </g>
      ))}

      {/* ── Roof ── */}
      <polygon points="80,110 450,18 820,110" fill="#8B4513" />
      <polygon points="80,110 820,110 820,122 80,122" fill="#6B3010" />
      {/* Roof gable stucco fill */}
      <polygon points="120,110 450,32 780,110" fill="url(#stuccoT)" fillOpacity="0.9" />
      {/* Roof tiles suggestion */}
      {Array.from({length:12}).map((_,i) => (
        <line key={i} x1={120+i*55} y1={110} x2={450-(i-6)*28} y2={45} stroke="#7A3A10" strokeWidth="1" strokeOpacity="0.25" />
      ))}

      {/* Pergola rafters under eave */}
      {[100,145,195,245,295,345,395,445,495,545,595,645,695,745,790].map(x => (
        <rect key={x} x={x} y={108} width={14} height={22} rx="3" fill="#7A4F2B" />
      ))}

      {/* ── Climbing vine on right corner ── */}
      <path d="M780,415 Q772,380 778,340 Q768,300 775,260 Q765,225 772,185 Q762,155 770,120" fill="none" stroke="#3A6A28" strokeWidth="3.5" strokeOpacity="0.75" />
      {[410,375,340,305,270,235,200,165].map((y,i) => (
        <g key={i}>
          <ellipse cx={772+(i%3-1)*8} cy={y} rx={10+(i%3)*4} ry={7+(i%2)*4} fill="#4A8A30" fillOpacity="0.75" />
          {i%2===0 && <ellipse cx={762-(i%2)*5} cy={y-10} rx={6} ry={5} fill="#3A7A28" fillOpacity="0.6" />}
        </g>
      ))}

      {/* Lavender border at base */}
      {[0,1,2,3,4,5,6,7,8,9,10].map(i => (
        <g key={i}>
          <ellipse cx={130+i*55} cy={415} rx={8} ry={12} fill="#8A70B0" fillOpacity="0.6" />
          <line x1={130+i*55} y1={415} x2={130+i*55} y2={428} stroke="#5A4070" strokeWidth="2" strokeOpacity="0.5" />
        </g>
      ))}

      {/* Label */}
      <rect x="14" y="14" width="260" height="22" rx="6" fill="#B5472A" fillOpacity="0.9" />
      <text x="144" y="29" textAnchor="middle" fill="white" fontSize="11" fontWeight="700">חזית צד — שפה טוסקנית אחידה</text>
    </svg>
  );
}

/* ══════════════════════════════════════════════════════════════
   SCENE 5 — UPPER FLOOR PLAN
══════════════════════════════════════════════════════════════ */
function UpperFloorScene() {
  return (
    <svg viewBox="0 0 720 580" xmlns="http://www.w3.org/2000/svg" style={{ display: "block", width: "100%", height: "auto" }}>
      <defs>
        <pattern id="hatch" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
          <line x1="0" y1="8" x2="8" y2="0" stroke="#5A3010" strokeWidth="0.8" strokeOpacity="0.4" />
        </pattern>
        <linearGradient id="parentsGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#E8D5F0" />
          <stop offset="100%" stopColor="#D8C5E0" />
        </linearGradient>
        <linearGradient id="kidsGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#D5F0E8" />
          <stop offset="100%" stopColor="#C5E0D8" />
        </linearGradient>
        <linearGradient id="hallGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFF8E0" />
          <stop offset="100%" stopColor="#F0ECD0" />
        </linearGradient>
      </defs>

      {/* Background */}
      <rect width="720" height="580" fill="#F5F0E8" />

      {/* Grid lines (blueprint feel) */}
      {Array.from({length: 30}).map((_,i) => (
        <line key={`h${i}`} x1="0" y1={i*20} x2="720" y2={i*20} stroke="#D0C8B8" strokeWidth="0.3" />
      ))}
      {Array.from({length: 40}).map((_,i) => (
        <line key={`v${i}`} x1={i*20} y1="0" x2={i*20} y2="580" stroke="#D0C8B8" strokeWidth="0.3" />
      ))}

      {/* ── OUTER WALLS ── */}
      {/* Outer boundary */}
      <rect x="60" y="50" width="600" height="460" fill="none" stroke="#2C1A0E" strokeWidth="12" />

      {/* ── PARENTS WING — Left ── */}
      {/* Master bedroom */}
      <rect x="66" y="56" width="200" height="200" fill="url(#parentsGrad)" />
      <rect x="66" y="56" width="200" height="200" fill="none" stroke="#6B2080" strokeWidth="2.5" />
      {/* Bed */}
      <rect x="90" y="80" width="120" height="80" rx="6" fill="#9B70C0" fillOpacity="0.4" />
      <rect x="90" y="80" width="120" height="22" rx="4" fill="#7B50A0" fillOpacity="0.5" />
      {/* Bedside tables */}
      <rect x="78" y="90" width="12" height="20" rx="2" fill="#9B70C0" fillOpacity="0.5" />
      <rect x="210" y="90" width="12" height="20" rx="2" fill="#9B70C0" fillOpacity="0.5" />
      {/* Wardrobe */}
      <rect x="90" y="185" width="80" height="16} " width="80" height="16" fill="#7B50A0" fillOpacity="0.35" />
      <rect x="90" y="185" width="80" height="16" fill="#7B50A0" fillOpacity="0.35" />
      {/* Desk */}
      <rect x="182" y="160" width="50" height="30" rx="3" fill="#9B70C0" fillOpacity="0.3" />
      {/* Room label */}
      <text x="166" y="230" textAnchor="middle" fill="#6B2080" fontSize="11" fontWeight="800">חדר הורים</text>
      <text x="166" y="244" textAnchor="middle" fill="#6B2080" fontSize="9">~20 מ״ר</text>

      {/* ── Balcony — parents (field view) ── */}
      <rect x="66" y="254" width="200" height="60" fill="#E0D0F0" fillOpacity="0.5" stroke="#6B2080" strokeWidth="1.5" strokeDasharray="5 3" />
      {/* Railing dots */}
      {[80,100,120,140,160,180,200,220,240].map(x => (
        <circle key={x} cx={x} cy={310} r={2} fill="#6B2080" fillOpacity="0.5" />
      ))}
      <text x="166" y="288" textAnchor="middle" fill="#6B2080" fontSize="10" fontWeight="700">מרפסת הורים</text>
      <text x="166" y="300" textAnchor="middle" fill="#6B2080" fontSize="8">נוף לשדות</text>

      {/* ── En-suite bathroom ── */}
      <rect x="66" y="314" width="200" height="90" fill="#C8E8F8" fillOpacity="0.6" stroke="#1A6080" strokeWidth="1.5" />
      {/* Shower */}
      <rect x="76" y="324" width="55" height="55" rx="2" fill="#A0D0E8" fillOpacity="0.6" />
      <line x1="103" y1="324" x2="103" y2="379" stroke="#1A6080" strokeWidth="1" />
      {/* Bathtub */}
      <rect x="140" y="328" width="80" height="45" rx="8" fill="#B0D8F0" fillOpacity="0.6" stroke="#1A6080" strokeWidth="1" />
      {/* Sink */}
      <ellipse cx="106" cy="385" rx="15" ry="10" fill="#90C8E0" fillOpacity="0.7" stroke="#1A6080" strokeWidth="1" />
      <text x="166" y="396" textAnchor="middle" fill="#1A6080" fontSize="9" fontWeight="700">חדר רחצה הורים</text>

      {/* ── CORRIDOR — MIDDLE with SKYLIGHT ── */}
      <rect x="266" y="56" width="188" height="448" fill="url(#hallGrad)" />
      <rect x="266" y="56" width="188" height="448" fill="none" stroke="#2C1A0E" strokeWidth="2.5" />

      {/* Staircase */}
      <rect x="276" y="250" width="168" height="130" fill="#E8D8A0" fillOpacity="0.8" stroke="#7A5520" strokeWidth="1.5" />
      {Array.from({length:8}).map((_,i) => (
        <rect key={i} x={276} y={250+i*16} width={168} height={4} fill="#C8A850" fillOpacity="0.4" />
      ))}
      <text x="360" y="322" textAnchor="middle" fill="#7A5520" fontSize="10" fontWeight="700">מדרגות</text>
      <text x="360" y="335" textAnchor="middle" fill="#7A5520" fontSize="8">↑ ↓</text>

      {/* Skylight symbol */}
      <rect x="286" y="70" width="148" height="100" rx="6" fill="#FFF8A0" fillOpacity="0.7" stroke="#D4A820" strokeWidth="2" strokeDasharray="6 3" />
      {/* Sun rays from skylight */}
      {[0,45,90,135,180,225,270,315].map(a => {
        const r = a*Math.PI/180;
        return <line key={a} x1={360} y1={120} x2={360+Math.cos(r)*30} y2={120+Math.sin(r)*30} stroke="#D4A820" strokeWidth="1" strokeOpacity="0.5" />;
      })}
      <text x="360" y="115" textAnchor="middle" fill="#8A6010" fontSize="10" fontWeight="800">סקיילייט</text>
      <text x="360" y="128" textAnchor="middle" fill="#8A6010" fontSize="8">אור טבעי</text>

      {/* Hall label */}
      <text x="360" y="220" textAnchor="middle" fill="#4A3010" fontSize="10" fontWeight="700">מסדרון</text>

      {/* Bathroom shared */}
      <rect x="276" y="400" width="168" height="98" fill="#C8E8F8" fillOpacity="0.6" stroke="#1A6080" strokeWidth="1.5" />
      <ellipse cx="320" cy="440" rx="20" ry="14" fill="#90C8E0" fillOpacity="0.7" stroke="#1A6080" strokeWidth="1" />
      <rect x="350" y="418" width="40" height="30" rx="3" fill="#A0D0E8" fillOpacity="0.6" stroke="#1A6080" strokeWidth="1" />
      <rect x="400" y="415" width="38" height="60} " width="38" height="60" rx="8" fill="#B0D8F0" fillOpacity="0.5" stroke="#1A6080" strokeWidth="1" />
      <rect x="400" y="415" width="38" height="60" rx="8" fill="#B0D8F0" fillOpacity="0.5" stroke="#1A6080" strokeWidth="1" />
      <text x="360" y="482" textAnchor="middle" fill="#1A6080" fontSize="9" fontWeight="700">חדר רחצה ילדים</text>

      {/* ── KIDS WING — Right ── */}
      {/* Kid room 1 */}
      <rect x="454" y="56" width="206" height="200" fill="url(#kidsGrad)" />
      <rect x="454" y="56" width="206" height="200" fill="none" stroke="#1A7050" strokeWidth="2.5" />
      {/* Bed */}
      <rect x="470" y="75" width="90" height="65" rx="5" fill="#40A080" fillOpacity="0.4" />
      <rect x="470" y="75" width="90" height="18" rx="4" fill="#30806A" fillOpacity="0.5" />
      {/* Desk */}
      <rect x="570" y="80" width="65" height="40" rx="3" fill="#40A080" fillOpacity="0.3" />
      {/* Window seat */}
      <rect x="460" y="160" width="190" height="22" rx="5" fill="#50B090" fillOpacity="0.4" stroke="#1A7050" strokeWidth="1.5" strokeDasharray="4 2" />
      <text x="546" y="174" textAnchor="middle" fill="#1A7050" fontSize="8">מושב חלון</text>

      <text x="557" y="220" textAnchor="middle" fill="#1A7050" fontSize="11" fontWeight="800">חדר ילד/ה א׳</text>
      <text x="557" y="234" textAnchor="middle" fill="#1A7050" fontSize="9">~18 מ״ר</text>

      {/* Kid room 2 */}
      <rect x="454" y="256" width="206" height="248" fill="#D5EED5" />
      <rect x="454" y="256" width="206" height="248" fill="none" stroke="#1A5030" strokeWidth="2.5" />
      {/* Bed */}
      <rect x="470" y="275" width="90" height="65" rx="5" fill="#50A060" fillOpacity="0.4" />
      <rect x="470" y="275" width="90" height="18" rx="4" fill="#388048" fillOpacity="0.5" />
      {/* Small balcony */}
      <rect x="571" y="270" width="60" height="50" rx="3" fill="#90C8A0" fillOpacity="0.5" stroke="#1A5030" strokeWidth="1.5" strokeDasharray="4 2" />
      <text x="601" y="300" textAnchor="middle" fill="#1A5030" fontSize="8">מרפסת</text>
      <text x="601" y="310" textAnchor="middle" fill="#1A5030" fontSize="7">קטנה</text>
      {/* Bookshelf / reading nook */}
      <rect x="460" y="370" width="50" height="80" rx="3" fill="#60A870" fillOpacity="0.35" stroke="#1A5030" strokeWidth="1" />
      {[0,1,2,3].map(i => <line key={i} x1={460} y1={383+i*16} x2={510} y2={383+i*16} stroke="#1A5030" strokeWidth="0.8" />)}
      <text x="466" y="450" fill="#1A5030" fontSize="7">פינת קריאה</text>
      {/* Sloped ceiling indicator */}
      <path d="M520,460 L640,380" fill="none" stroke="#1A5030" strokeWidth="1.5" strokeDasharray="5 3" />
      <text x="590" y="435" fill="#1A5030" fontSize="8">תקרה משופעת</text>
      <text x="590" y="446" fill="#1A5030" fontSize="7">קורות עץ חשופות</text>
      <text x="557" y="475" textAnchor="middle" fill="#1A5030" fontSize="11" fontWeight="800">חדר ילד/ה ב׳</text>
      <text x="557" y="489" textAnchor="middle" fill="#1A5030" fontSize="9">~18 מ״ר</text>

      {/* ── Wing divider labels ── */}
      {/* Parents wing bracket */}
      <rect x="30" y="56" width="28" height="348" rx="3" fill="none" stroke="#6B2080" strokeWidth="2" />
      <line x1="30" y1="56" x2="22" y2="56" stroke="#6B2080" strokeWidth="2" />
      <line x1="30" y1="404" x2="22" y2="404" stroke="#6B2080" strokeWidth="2" />
      <text x="20" y="235" textAnchor="middle" fill="#6B2080" fontSize="11" fontWeight="800" transform="rotate(-90,20,235)">אגף הורים</text>

      {/* Kids wing bracket */}
      <rect x="662" y="56" width="28" height="448" rx="3" fill="none" stroke="#1A7050" strokeWidth="2" />
      <line x1="690" y1="56" x2="698" y2="56" stroke="#1A7050" strokeWidth="2" />
      <line x1="690" y1="504" x2="698" y2="504" stroke="#1A7050" strokeWidth="2" />
      <text x="700" y="280" textAnchor="middle" fill="#1A7050" fontSize="11" fontWeight="800" transform="rotate(90,700,280)">אגף ילדים</text>

      {/* North arrow */}
      <g transform="translate(660,30)">
        <circle cx="0" cy="0" r="14" fill="#2C1A0E" fillOpacity="0.8" />
        <polygon points="0,-10 -5,6 0,3 5,6" fill="white" />
        <text x="0" y="4" textAnchor="middle" fill="#C4834A" fontSize="8" fontWeight="900">N</text>
      </g>

      {/* Title */}
      <rect x="14" y="14" width="220" height="22" rx="6" fill="#B5472A" fillOpacity="0.9" />
      <text x="124" y="29" textAnchor="middle" fill="white" fontSize="11" fontWeight="700">תוכנית קומה עליונה — מוצעת</text>
    </svg>
  );
}

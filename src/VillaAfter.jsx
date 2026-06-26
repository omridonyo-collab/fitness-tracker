import { useState } from "react";

const SLIDES = [
  {
    id: "salon",    num: "01", tag: "קיר הסלון",
    title: "פתוח לשדה",
    desc: "קיר-זכוכית שלם על כל רוחב הסלון. כשהפאנלים נפתחים — הסלון והטרסה הופכים לחלל אחד. נוף השדות נכנס פנימה.",
    points: ["6 פאנלי הזזה — כל הרוחב","המשכיות רצפה ללא מפתן","קורות עץ חשופות בתקרה","נוף שדות ישיר ללא הפרעה"],
    Scene: SalonScene,
  },
  {
    id: "entry",    num: "02", tag: "כניסה",
    title: "אור לגובה שתי קומות",
    desc: "לצד גרם המדרגות — חלון רצף מהרצפה עד גג הגמלון. האור שוטף פנימה בכל שעות היום. כניסה שמרגישה כמו כניסה לדבר גדול.",
    points: ["חלון ~6 מ׳ גובה לצד המדרגות","חלל כניסה פתוח לגובה שתי קומות","קיר אבן חם לצד — חומרים טוסקניים","אור טבעי על כל גרם המדרגות"],
    Scene: EntryScene,
  },
  {
    id: "west",     num: "03", tag: "חזית השדות",
    title: "זכוכית מול הנוף",
    desc: "מבחוץ — הבית נפתח לשדות בשורה שלמה של זכוכית. קורות עץ בולטות בקו הגג. אבן מקומית בפינות.",
    points: ["זכוכית על כל רוחב קומת הקרקע","קורות עץ חשופות בקו הגג","אבן מקומית בפינות ובסיס","טרסה רחבה — המשך הסלון החוצה"],
    Scene: WestScene,
  },
  {
    id: "tuscan",   num: "04", tag: "שפה אדריכלית",
    title: "טוסקנה אחידה",
    desc: "האבן, הקשתות, קורות העץ — מהכניסה מתפשטים לכל ארבע החזיתות. הבית מספר סיפור אחד.",
    points: ["אבן מקומית בפינות ורצועות","חלונות קשתות בקומת קרקע","תריסי עץ על כל החלונות","גפנים וצמחייה שמחברת לאדמה"],
    Scene: TuscanScene,
  },
  {
    id: "upper",    num: "05", tag: "קומה עליונה",
    title: "אגפים ואופי",
    desc: "הורים בקצה אחד, ילדים בקצה השני. למסדרון — סקיילייט. לכל חדר משהו ייחודי משלו.",
    points: ["סקיילייט מעל המסדרון","אגף הורים: עין-סוויט + מרפסת לשדות","חדרי ילדים שווים: מושב חלון / מרפסת / פינת קריאה","תקרה משופעת עם קורות עץ חשופות"],
    Scene: UpperScene,
  },
];

// ── Shared palette ───────────────────────────────────────────────────────────
const P = {
  sky1: "#7EC8E3", sky2: "#C8E8F5", sky3: "#E8F5FF",
  green1: "#3A7A30", green2: "#5A9E4E", green3: "#8AC87A",
  stone1: "#A09080", stone2: "#B8A898", stone3: "#CEC0B0",
  wood1: "#5A3010", wood2: "#7A4F2B", wood3: "#A07040",
  plaster: "#F5EDE0", plasterDark: "#E0D0BC",
  glass: "#C8E8F8", glassShine: "#EAF6FF",
  floor1: "#C8955A", floor2: "#A06838",
  terracotta: "#B5472A", cream: "#FAF5EE",
  dark: "#1A0E06",
};

function Label({ x, y, text, w = 160, accent = P.terracotta }) {
  return (
    <g>
      <rect x={x - w/2} y={y - 11} width={w} height={18} rx={5} fill={accent} fillOpacity={0.92} />
      <text x={x} y={y + 2} textAnchor="middle" fill="white" fontSize="10.5" fontWeight="700"
        fontFamily="'Heebo',Arial,sans-serif">{text}</text>
    </g>
  );
}

// ── Scene 1: Salon interior ──────────────────────────────────────────────────
function SalonScene() {
  const vx = 450, vy = 220;   // vanishing point
  const W = 900, H = 580;

  // Glass wall back-rect corners
  const glL = 148, glR = 752, glT = 92, glB = 420;

  function toVP(px, py, t) {  // t=0→wall, t=1→vp
    return [px + (vx - px)*t, py + (vy - py)*t];
  }

  // beams — ceiling lines from front corners to VP
  const beamFront = [0, 135, 270, 405, 540, 675, W];
  const beams = beamFront.map(bx => {
    const [bxVP] = toVP(bx, 0, 0.5);
    return { x1: bx, y1: 0, x2: Math.round(bxVP), y2: glT };
  });

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ display:"block", width:"100%", height:"auto" }}>
      <defs>
        <linearGradient id="sky_s" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={P.sky1} /><stop offset="55%" stopColor={P.sky2} /><stop offset="100%" stopColor="#B8D8A0" />
        </linearGradient>
        <linearGradient id="grass_s" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={P.green2} /><stop offset="100%" stopColor={P.green1} />
        </linearGradient>
        <linearGradient id="floor_s" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={P.floor1} /><stop offset="100%" stopColor={P.floor2} />
        </linearGradient>
        <linearGradient id="lwallGrad" x1="1" y1="0" x2="0" y2="0">
          <stop offset="0%" stopColor={P.plaster} /><stop offset="100%" stopColor={P.plasterDark} />
        </linearGradient>
        <linearGradient id="rwallGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={P.plaster} /><stop offset="100%" stopColor={P.plasterDark} />
        </linearGradient>
        <linearGradient id="sunBeam" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFFBE0" stopOpacity="0.45" /><stop offset="100%" stopColor="#FFFBE0" stopOpacity="0" />
        </linearGradient>
        <clipPath id="glassClip"><rect x={glL} y={glT} width={glR-glL} height={glB-glT} /></clipPath>
      </defs>

      {/* ── BACKGROUND through glass ── */}
      <rect x={glL} y={glT} width={glR-glL} height={glB-glT} fill="url(#sky_s)" />
      {/* Hills */}
      <path d={`M${glL},${glB-60} Q${glL+80},${glB-110} ${glL+200},${glB-80} Q${glL+320},${glB-50} ${glL+440},${glB-90} Q${glL+550},${glB-120} ${glR},${glB-70} L${glR},${glB} L${glL},${glB} Z`}
        fill="url(#grass_s)" />
      <path d={`M${glL},${glB-30} Q${glL+150},${glB-70} ${glL+300},${glB-40} Q${glL+480},${glB-10} ${glR},${glB-35} L${glR},${glB} L${glL},${glB} Z`}
        fill={P.green1} />
      {/* Trees */}
      {[185,260,340,540,620,700].map((tx,i) => (
        <g key={i} clipPath="url(#glassClip)">
          <rect x={tx-3} y={glB-130-(i%3)*20} width={6} height={80+(i%3)*20} fill={P.green1} />
          <ellipse cx={tx} cy={glB-135-(i%3)*20} rx={18+(i%2)*8} ry={24+(i%3)*6} fill={P.green2} />
        </g>
      ))}
      {/* Cypress trees */}
      {[410,435,460,485].map((tx,i)=>(
        <ellipse key={i} cx={tx} cy={glB-100} rx={7} ry={28} fill={P.green1} fillOpacity="0.75" clipPath="url(#glassClip)" />
      ))}
      {/* Sun */}
      <circle cx="700" cy="110" r="30" fill="#FFF088" fillOpacity="0.75" clipPath="url(#glassClip)" />

      {/* ── ROOM STRUCTURE ── */}
      {/* Ceiling */}
      <polygon points={`0,0 ${W},0 ${glR},${glT} ${glL},${glT}`} fill={P.wood1} />
      {/* Left wall */}
      <polygon points={`0,0 ${glL},${glT} ${glL},${glB} 0,${H}`} fill="url(#lwallGrad)" />
      {/* Right wall */}
      <polygon points={`${W},0 ${glR},${glT} ${glR},${glB} ${W},${H}`} fill="url(#rwallGrad)" />
      {/* Floor */}
      <polygon points={`${glL},${glB} ${glR},${glB} ${W},${H} 0,${H}`} fill="url(#floor_s)" />

      {/* Floor tile lines — towards VP */}
      {[0.15,0.3,0.45,0.6,0.75,0.9].map((t,i)=>{
        const flX = glL + t*(glR-glL);
        const [fpx] = toVP(t*W, H, 0);
        return <line key={i} x1={flX} y1={glB} x2={t<0.5?0:W} y2={H} stroke={P.floor2} strokeWidth="0.8" strokeOpacity="0.35" />;
      })}
      {[0.25,0.5,0.75].map((t,i)=>(
        <line key={i} x1={glL-(glL*t)} y1={glB+t*(H-glB)} x2={glR+(W-glR)*t} y2={glB+t*(H-glB)} stroke={P.floor2} strokeWidth="0.7" strokeOpacity="0.3" />
      ))}

      {/* Ceiling beams */}
      {[0.12,0.26,0.4,0.54,0.68,0.82].map((t,i)=>{
        const fx = t*W, bx = glL + t*(glR-glL);
        return (
          <g key={i}>
            <polygon points={`${fx-14},0 ${fx+14},0 ${bx+8},${glT} ${bx-8},${glT}`} fill={P.wood2} />
            <polygon points={`${fx-14},0 ${fx+14},0 ${fx+14},9 ${fx-14},9`} fill={P.wood3} fillOpacity="0.6" />
          </g>
        );
      })}

      {/* ── GLASS WALL ── */}
      {/* Top/bottom frames */}
      <rect x={glL-4} y={glT-5} width={glR-glL+8} height={8} rx={2} fill={P.dark} />
      <rect x={glL-4} y={glB-3} width={glR-glL+8} height={8} rx={2} fill={P.dark} />
      {/* 6 panels */}
      {Array.from({length:6}).map((_,i)=>{
        const pw = (glR-glL)/6, px = glL + i*pw;
        return (
          <g key={i}>
            <rect x={px} y={glT} width={4} height={glB-glT} fill={P.dark} />
            <rect x={px+4} y={glT+2} width={pw-8} height={(glB-glT)-4} fill={P.glass} fillOpacity="0.12" />
            <line x1={px+18} y1={glT+4} x2={px+pw-12} y2={glB-4} stroke="white" strokeWidth="1.5" strokeOpacity="0.18" />
          </g>
        );
      })}
      <rect x={glR-4} y={glT} width={4} height={glB-glT} fill={P.dark} />

      {/* Pergola shadow top */}
      <rect x={glL} y={glT} width={glR-glL} height={28} fill={P.dark} fillOpacity="0.22" />

      {/* Sun rays on floor */}
      <polygon points={`${glL},${glB} ${glR},${glB} ${W},${H} 0,${H}`} fill="url(#sunBeam)" />

      {/* ── SOFA ── */}
      <g transform="translate(0,10)">
        <path d={`M230,${H-110} Q230,${H-138} 250,${H-138} L650,${H-138} Q670,${H-138} 670,${H-110} L670,${H-75} L230,${H-75} Z`} fill="#8A6040" />
        <rect x="230" y={H-152} width="440" height="22" rx="6" fill="#6A4020" />
        {[0,1,2].map(i=>(
          <rect key={i} x={240+i*145} y={H-136} width={135} height={55} rx="7" fill="#A07850" />
        ))}
        {[245,658].map((x,i)=><rect key={i} x={x} y={H-76} width={12} height={14} rx="2" fill="#3A1A06" />)}
      </g>

      {/* Coffee table */}
      <rect x="330" y={H-62} width="240" height="10" rx="4" fill={P.wood2} />
      {[340,558].map((x,i)=><rect key={i} x={x} y={H-52} width={9} height={28} rx="2" fill={P.wood1} />)}

      {/* Plant */}
      <rect x="165" y={H-90} width="8" height="50" fill={P.wood1} />
      <ellipse cx="169" cy={H-94} rx="24" ry="30" fill={P.green2} fillOpacity="0.85" />
      <ellipse cx="155" cy={H-78} rx="14" ry="18" fill={P.green1} fillOpacity="0.75" />

      <Label x={450} y={H-18} text="קיר-זכוכית שלם — פתוח לשדות" w={230} />
    </svg>
  );
}

// ── Scene 2: Entry staircase ─────────────────────────────────────────────────
function EntryScene() {
  const W = 720, H = 600;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ display:"block", width:"100%", height:"auto" }}>
      <defs>
        <linearGradient id="sky_e" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={P.sky1} /><stop offset="55%" stopColor={P.sky2} /><stop offset="100%" stopColor="#C8E8B0" />
        </linearGradient>
        <linearGradient id="wall_e" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={P.plasterDark} /><stop offset="100%" stopColor={P.plaster} />
        </linearGradient>
        <linearGradient id="floor_e" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={P.floor1} /><stop offset="100%" stopColor={P.floor2} />
        </linearGradient>
        <linearGradient id="light_e" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFF8D0" stopOpacity="0.55" /><stop offset="100%" stopColor="#FFF8D0" stopOpacity="0" />
        </linearGradient>
        <clipPath id="winClip"><rect x="28" y="18" width="210" height="478" /></clipPath>
      </defs>

      {/* Background wall */}
      <rect width={W} height={H} fill="url(#wall_e)" />

      {/* ── TALL WINDOW — LEFT ── */}
      <rect x="28" y="18" width="210" height="478" fill="url(#sky_e)" />
      {/* Trees outside */}
      {[70,130,200].map((x,i)=>(
        <g key={i} clipPath="url(#winClip)">
          <rect x={x-4} y={380-(i*25)} width={8} height={120+(i*25)} fill={P.green1} />
          <ellipse cx={x} cy={375-(i*25)} rx={26+(i*8)} ry={34+(i*5)} fill={P.green2} />
        </g>
      ))}
      {/* Horizon */}
      <line x1="28" y1="400" x2="238" y2="400" stroke={P.green1} strokeWidth="1" strokeOpacity="0.4" clipPath="url(#winClip)" />
      {/* Sun */}
      <circle cx="195" cy="65" r="26" fill="#FFF066" fillOpacity="0.75" clipPath="url(#winClip)" />

      {/* Window frame */}
      <rect x="22" y="12" width="222" height="490" rx="3" fill="none" stroke={P.dark} strokeWidth="8" />
      <rect x="126" y="12" width="5" height="490" fill={P.dark} />      {/* vertical divider */}
      <rect x="22" y="252" width="222" height="5" fill={P.dark} />     {/* mid horizontal */}
      {/* Glass sheen */}
      <line x1="52" y1="18" x2="52" y2="498" stroke="white" strokeWidth="2.5" strokeOpacity="0.2" clipPath="url(#winClip)" />

      {/* ── STONE WALL — left of window ── */}
      <rect x="0" y="0" width="24" height={H} fill={P.stone2} />
      {[0,1,2,3,4,5,6,7,8,9,10,11].map(row=>(
        <rect key={row} x={1} y={row*55+4} width={22} height={38} rx="2"
          fill={row%3===0?P.stone1:row%3===1?P.stone2:P.stone3}
          stroke={P.wood1} strokeWidth="0.5" />
      ))}

      {/* Stone above window */}
      <rect x="24" y="0" width="220" height="14" fill={P.stone2} />

      {/* ── RIGHT SIDE — staircase ── */}
      {/* Right wall */}
      <rect x="246" y="0" width={W-246} height={H} fill={P.plaster} />
      {/* Upper ceiling */}
      <rect x="246" y="0" width={W-246} height="35" fill={P.wood1} />
      {/* Ceiling beams */}
      {[310,390,470,550,640].map(x=>(
        <rect key={x} x={x-10} y="0" width="20" height="35" fill={P.wood2} fillOpacity="0.7" />
      ))}

      {/* Upper floor slab */}
      <rect x="246" y="228" width={W-246} height="18" fill={P.plasterDark} />

      {/* STAIRS */}
      {Array.from({length:13}).map((_,i)=>{
        const sx = 260+i*35, sy = 462-i*18;
        return (
          <g key={i}>
            <rect x={sx} y={sy} width={35} height={5} fill={P.stone3} />           {/* tread */}
            <rect x={sx} y={sy+5} width={5} height={18} fill={P.stone2} />          {/* riser */}
          </g>
        );
      })}

      {/* Handrail */}
      <path d={`M260,445 L715,218`} fill="none" stroke={P.dark} strokeWidth="7" strokeLinecap="round" />
      {/* Balusters */}
      {Array.from({length:12}).map((_,i)=>{
        const bx=270+i*38, by=440-i*19;
        return <line key={i} x1={bx} y1={by} x2={bx} y2={by+45} stroke={P.dark} strokeWidth="2.5" />;
      })}

      {/* Ground floor */}
      <rect x="246" y="465" width={W-246} height={H-465} fill="url(#floor_e)" />
      {/* Floor tiles */}
      {[300,370,440,510,580,650,710].map(x=>(
        <line key={x} x1={x} y1="465" x2={x} y2={H} stroke={P.floor2} strokeWidth="0.8" strokeOpacity="0.35" />
      ))}

      {/* Light rays from window across room */}
      <polygon points={`238,18 238,200 ${W},280 ${W},120`} fill="url(#light_e)" />
      <polygon points={`238,200 238,400 ${W},450 ${W},280`} fill="url(#light_e)" />

      {/* Light pool on floor */}
      <ellipse cx="420" cy={H-15} rx="160" ry="22" fill="#FFF8D0" fillOpacity="0.25" />

      <Label x={133} y={H-18} text="חלון לגובה שתי קומות" w={180} />
      <Label x={480} y={H-18} text="אור טבעי על המדרגות" w={195} />
    </svg>
  );
}

// ── Scene 3: West facade exterior ───────────────────────────────────────────
function WestScene() {
  const W = 900, H = 560;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ display:"block", width:"100%", height:"auto" }}>
      <defs>
        <linearGradient id="sky_w" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5090C8" /><stop offset="55%" stopColor={P.sky2} /><stop offset="100%" stopColor="#B8E0A8" />
        </linearGradient>
        <linearGradient id="ground_w" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={P.green2} /><stop offset="100%" stopColor={P.green1} />
        </linearGradient>
        <linearGradient id="stucco_w" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={P.plaster} /><stop offset="100%" stopColor={P.plasterDark} />
        </linearGradient>
        <linearGradient id="glass_w" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={P.glassShine} stopOpacity="0.55" /><stop offset="50%" stopColor={P.glass} stopOpacity="0.45" /><stop offset="100%" stopColor={P.glassShine} stopOpacity="0.35" />
        </linearGradient>
        <pattern id="stoneP_w" x="0" y="0" width="44" height="28" patternUnits="userSpaceOnUse">
          <rect width="44" height="28" fill={P.stone2} />
          <rect x="1" y="1" width="40" height="12" rx="1" fill={P.stone3} stroke={P.stone1} strokeWidth="0.6" />
          <rect x="1" y="15" width="20" height="11" rx="1" fill={P.stone1} stroke={P.stone1} strokeWidth="0.6" />
          <rect x="23" y="15" width="20" height="11" rx="1" fill={P.stone2} stroke={P.stone1} strokeWidth="0.6" />
        </pattern>
      </defs>

      {/* Sky */}
      <rect width={W} height={H} fill="url(#sky_w)" />
      {/* Clouds */}
      {[[130,72,85],[340,55,65],[610,80,75],[790,60,58]].map(([cx,cy,rx],i)=>(
        <g key={i}><ellipse cx={cx} cy={cy} rx={rx} ry={26} fill="white" fillOpacity="0.6" /><ellipse cx={cx+28} cy={cy-9} rx={rx*0.6} ry={20} fill="white" fillOpacity="0.45" /></g>
      ))}
      {/* Sun */}
      <circle cx="800" cy="75" r="32" fill="#FFF066" fillOpacity="0.8" />

      {/* Ground + grass */}
      <rect x="0" y="415" width={W} height={H-415} fill="url(#ground_w)" />
      {Array.from({length:55}).map((_,i)=>(
        <line key={i} x1={i*18} y1="415" x2={i*18+7} y2="406" stroke={P.green1} strokeWidth="1.5" strokeOpacity="0.5" />
      ))}

      {/* Terrace slab */}
      <rect x="102" y="406" width="696" height="14" fill={P.stone3} />
      <rect x="94" y="416" width="712" height="7" fill={P.stone2} />

      {/* ── HOUSE ── */}
      {/* Main stucco body */}
      <rect x="118" y="118" width="664" height="290" fill="url(#stucco_w)" />

      {/* Stone corners */}
      <rect x="118" y="118" width="52" height="290" fill="url(#stoneP_w)" />
      <rect x="730" y="118" width="52" height="290" fill="url(#stoneP_w)" />
      {/* Stone base band */}
      <rect x="118" y="350" width="664" height="58" fill="url(#stoneP_w)" />

      {/* ── FULL GLASS GROUND FLOOR ── */}
      {/* Warm interior glow behind glass */}
      <rect x="170" y="252" width="560" height="100" fill="#FFF5D8" fillOpacity="0.55" />
      {/* 7 glass panels */}
      {Array.from({length:7}).map((_,i)=>{
        const pw=80, px=170+i*pw;
        return (
          <g key={i}>
            <rect x={px} y="252" width={pw} height="100" fill="url(#glass_w)" />
            <rect x={px} y="252" width="3.5" height="100" fill={P.dark} fillOpacity="0.55" />
            <line x1={px+14} y1="254" x2={px+9} y2="350" stroke="white" strokeWidth="1.8" strokeOpacity="0.22" />
          </g>
        );
      })}
      <rect x="730" y="252" width="3.5" height="100" fill={P.dark} fillOpacity="0.55" />
      <rect x="166" y="248" width="568" height="8" fill={P.dark} rx="1.5" />
      <rect x="166" y="348" width="568" height="8" fill={P.dark} rx="1.5" />

      {/* ── WOOD CORNICE / FLOOR DIVIDER ── */}
      <rect x="112" y="240" width="676" height="16" fill={P.wood2} />
      {[138,182,228,276,324,372,420,468,516,562,608,654,698,738].map(x=>(
        <rect key={x} x={x} y="224" width="14" height="35" rx="3" fill={P.wood1} />
      ))}

      {/* ── UPPER WINDOWS — grouped ── */}
      {/* Left group: 2 arched */}
      {[0,1].map(i=>{
        const wx=192+i*90;
        return (
          <g key={i}>
            <path d={`M${wx},230 L${wx},155 Q${wx+32},128 ${wx+64},155 L${wx+64},230 Z`}
              fill={P.glass} fillOpacity="0.7" stroke={P.dark} strokeWidth="2.5" />
            <rect x={wx-13} y="155" width="11" height="75" rx="2" fill={P.wood2} />
            <rect x={wx+64} y="155" width="11" height="75" rx="2" fill={P.wood2} />
            {[0,1,2,3,4].map(j=><line key={j} x1={wx-13} y1={163+j*13} x2={wx-2} y2={163+j*13} stroke={P.wood1} strokeWidth="1.2" />)}
          </g>
        );
      })}
      {/* Center: balcony doors */}
      {[0,1].map(i=>{
        const wx=400+i*85;
        return (
          <g key={i}>
            <rect x={wx} y="143" width="80" height="97" rx="2" fill={P.glass} fillOpacity="0.7" stroke={P.dark} strokeWidth="2.5" />
            <line x1={wx+40} y1="143" x2={wx+40} y2="240" stroke={P.dark} strokeWidth="2" />
          </g>
        );
      })}
      {/* Balcony railing */}
      <rect x="394" y="238" width="176" height="5" fill={P.dark} />
      {[400,416,432,448,464,480,496,512,528,544,558].map(x=>(
        <rect key={x} x={x} y="238" width="2.5" height="22" fill={P.dark} />
      ))}
      <rect x="394" y="258" width="176" height="3" fill={P.dark} />
      {/* Right window group */}
      {[0,1].map(i=>{
        const wx=628+i*78;
        return (
          <g key={i}>
            <rect x={wx} y="150" width="70" height="88" rx="2" fill={P.glass} fillOpacity="0.7" stroke={P.dark} strokeWidth="2.5" />
            <line x1={wx+35} y1="150" x2={wx+35} y2="238" stroke={P.dark} strokeWidth="1.8" />
            <rect x={wx-12} y="150" width="10" height="88" rx="2" fill={P.wood2} />
            <rect x={wx+70} y="150" width="10" height="88" rx="2" fill={P.wood2} />
          </g>
        );
      })}

      {/* ── ROOF / GABLE ── */}
      <polygon points={`88,118 450,28 812,118`} fill={P.terracotta} />
      <polygon points={`88,118 812,118 812,130 88,130`} fill="#8B3010" />
      <polygon points={`124,118 450,44 776,118`} fill="url(#stucco_w)" />
      {/* Roof rafter ends */}
      {[104,150,196,244,290,338,386,434,480,528,576,622,668,712,756,790].map(x=>(
        <rect key={x} x={x} y="115" width="13" height="22" rx="3" fill={P.wood2} />
      ))}

      {/* Vine left corner */}
      <path d={`M118,415 Q110,375 118,335 Q108,295 116,255 Q106,215 114,175 Q104,142 112,118`}
        fill="none" stroke={P.green1} strokeWidth="3.5" strokeOpacity="0.72" />
      {[410,375,338,300,260,222,182,146].map((y,i)=>(
        <ellipse key={i} cx={112+(i%3-1)*7} cy={y} rx={9+(i%3)*3} ry={6+(i%2)*3} fill={P.green2} fillOpacity="0.75" />
      ))}

      {/* Lavender base */}
      {Array.from({length:14}).map((_,i)=>(
        <g key={i}><ellipse cx={132+i*50} cy={415} rx={7} ry={11} fill="#9B7AC0" fillOpacity="0.65" />
        <line x1={132+i*50} y1="415" x2={132+i*50} y2="426" stroke="#6B4A90" strokeWidth="2" strokeOpacity="0.5" /></g>
      ))}

      <Label x={450} y={H-18} text="זכוכית על כל הרוחב — קומת קרקע" w={248} />
    </svg>
  );
}

// ── Scene 4: Tuscan side facade ──────────────────────────────────────────────
function TuscanScene() {
  const W = 900, H = 560;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ display:"block", width:"100%", height:"auto" }}>
      <defs>
        <linearGradient id="sky_t" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4080B8" /><stop offset="55%" stopColor={P.sky2} /><stop offset="100%" stopColor="#A8D898" />
        </linearGradient>
        <linearGradient id="stucco_t" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F2E6D2" /><stop offset="100%" stopColor="#E8D8C0" />
        </linearGradient>
        <linearGradient id="ground_t" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={P.green2} /><stop offset="100%" stopColor={P.green1} />
        </linearGradient>
        <pattern id="stone_t" x="0" y="0" width="44" height="28" patternUnits="userSpaceOnUse">
          <rect width="44" height="28" fill={P.stone2} />
          <rect x="1" y="1" width="40" height="12" rx="1" fill={P.stone3} stroke={P.stone1} strokeWidth="0.6" />
          <rect x="1" y="15" width="20" height="11" rx="1" fill={P.stone1} stroke={P.stone1} strokeWidth="0.5" />
          <rect x="23" y="15" width="20" height="11" rx="1" fill={P.stone2} stroke={P.stone1} strokeWidth="0.5" />
        </pattern>
      </defs>

      {/* Sky */}
      <rect width={W} height={H} fill="url(#sky_t)" />
      {[[170,65,80],[420,48,62],[680,72,68]].map(([cx,cy,rx],i)=>(
        <g key={i}><ellipse cx={cx} cy={cy} rx={rx} ry={24} fill="white" fillOpacity="0.58" /><ellipse cx={cx+26} cy={cy-8} rx={rx*0.55} ry={18} fill="white" fillOpacity="0.42" /></g>
      ))}

      {/* Ground */}
      <rect x="0" y="420" width={W} height={H-420} fill="url(#ground_t)" />
      {Array.from({length:55}).map((_,i)=>(
        <line key={i} x1={i*18} y1="420" x2={i*18+7} y2="412" stroke={P.green1} strokeWidth="1.4" strokeOpacity="0.45" />
      ))}
      {/* Path */}
      <rect x="105" y="413" width="690" height="12" fill={P.stone3} />
      <rect x="96" y="421" width="708" height="6" fill={P.stone2} />

      {/* ── HOUSE ── */}
      <rect x="122" y="120" width="656" height="295" fill="url(#stucco_t)" />

      {/* Stone corner pillars */}
      <rect x="122" y="120" width="58" height="295" fill="url(#stone_t)" />
      <rect x="720" y="120" width="58" height="295" fill="url(#stone_t)" />
      {/* Stone base band */}
      <rect x="122" y="355" width="656" height="60" fill="url(#stone_t)" />
      {/* Stone accent band mid */}
      <rect x="122" y="236" width="656" height="14" fill="url(#stone_t)" />

      {/* ── WOOD CORNICE ── */}
      <rect x="114" y="236" width="672" height="16" fill={P.wood2} />
      {[136,180,226,274,322,370,418,466,514,562,608,654,698,730].map(x=>(
        <rect key={x} x={x} y="220" width="13" height="34" rx="3" fill={P.wood1} />
      ))}

      {/* ── UPPER ARCHED WINDOWS ── left group */}
      {[0,1].map(i=>{
        const wx=194+i*98;
        return (
          <g key={i}>
            <path d={`M${wx},232 L${wx},148 Q${wx+34},118 ${wx+68},148 L${wx+68},232 Z`}
              fill={P.glass} fillOpacity="0.72" stroke={P.dark} strokeWidth="2.5" />
            <rect x={wx-14} y="148" width="12" height="84" rx="2" fill={P.wood2} />
            <rect x={wx+68} y="148" width="12" height="84" rx="2" fill={P.wood2} />
            {[0,1,2,3,4].map(j=><line key={j} x1={wx-14} y1={158+j*14} x2={wx-2} y2={158+j*14} stroke={P.wood1} strokeWidth="1.3" />)}
            {[0,1,2,3,4].map(j=><line key={j} x1={wx+68} y1={158+j*14} x2={wx+80} y2={158+j*14} stroke={P.wood1} strokeWidth="1.3" />)}
          </g>
        );
      })}

      {/* Center window + window seat */}
      <rect x="430" y="138" width="105" height="98" rx="3" fill={P.glass} fillOpacity="0.7" stroke={P.dark} strokeWidth="2.5" />
      <line x1="482" y1="138" x2="482" y2="236" stroke={P.dark} strokeWidth="2" />
      <rect x="430" y="228" width="105" height="10" rx="3" fill={P.stone3} />  {/* window seat */}

      {/* Right arched window */}
      {[0].map(i=>{
        const wx=560;
        return (
          <g key={i}>
            <path d={`M${wx},232 L${wx},152 Q${wx+32},124 ${wx+64},152 L${wx+64},232 Z`}
              fill={P.glass} fillOpacity="0.7" stroke={P.dark} strokeWidth="2.5" />
            <rect x={wx-13} y="152" width="11" height="80" rx="2" fill={P.wood2} />
            <rect x={wx+64} y="152" width="11" height="80" rx="2" fill={P.wood2} />
          </g>
        );
      })}

      {/* Far right small window */}
      <rect x="648" y="150" width="65" height="80" rx="3" fill={P.glass} fillOpacity="0.65" stroke={P.dark} strokeWidth="2.5" />
      <line x1="680" y1="150" x2="680" y2="230" stroke={P.dark} strokeWidth="2" />
      <rect x="635" y="150" width="11" height="80" rx="2" fill={P.wood2} />
      <rect x="714" y="150" width="11" height="80" rx="2" fill={P.wood2} />

      {/* ── GROUND FLOOR ARCHED WINDOWS ── */}
      {[192, 365, 570].map((wx,i)=>(
        <g key={i}>
          <path d={`M${wx},415 L${wx},290 Q${wx+40},258 ${wx+80},290 L${wx+80},415 Z`}
            fill={P.glass} fillOpacity="0.65" stroke={P.dark} strokeWidth="2.5" />
          <line x1={wx+40} y1="264" x2={wx+40} y2="415" stroke={P.dark} strokeWidth="2" />
          <line x1={wx} y1="348" x2={wx+80} y2="348" stroke={P.dark} strokeWidth="1.8" />
          {/* Keystone */}
          <polygon points={`${wx+36},261 ${wx+40},254 ${wx+44},261`} fill={P.stone2} stroke={P.stone1} strokeWidth="0.8" />
        </g>
      ))}

      {/* ── ROOF ── */}
      <polygon points={`84,120 450,24 816,120`} fill={P.terracotta} />
      <polygon points={`84,120 816,120 816,132 84,132`} fill="#8B3010" />
      <polygon points={`124,120 450,40 776,120`} fill="url(#stucco_t)" />
      {/* Rafter ends */}
      {[100,148,196,246,296,346,394,444,494,542,590,638,686,734,780,810].map(x=>(
        <rect key={x} x={x} y="117" width="12" height="22" rx="3" fill={P.wood2} />
      ))}

      {/* ── VINES right corner ── */}
      <path d={`M778,420 Q770,382 778,342 Q768,302 776,260 Q766,222 774,182 Q764,148 772,120`}
        fill="none" stroke={P.green1} strokeWidth="3.5" strokeOpacity="0.72" />
      {[416,378,340,302,260,224,184,148].map((y,i)=>(
        <g key={i}>
          <ellipse cx={772+(i%3-1)*7} cy={y} rx={10+(i%3)*3} ry={7+(i%2)*3} fill={P.green2} fillOpacity="0.8" />
          {i%2===0 && <ellipse cx={762-(i%2)*4} cy={y-9} rx={6} ry={5} fill={P.green1} fillOpacity="0.65" />}
        </g>
      ))}

      {/* Lavender */}
      {Array.from({length:14}).map((_,i)=>(
        <g key={i}><ellipse cx={138+i*50} cy={420} rx={7} ry={11} fill="#9B7AC0" fillOpacity="0.65" />
        <line x1={138+i*50} y1="420" x2={138+i*50} y2="430" stroke="#6B4A90" strokeWidth="2" strokeOpacity="0.5" /></g>
      ))}

      <Label x={450} y={H-18} text="שפה טוסקנית — אבן, קשתות, תריסי עץ" w={268} />
    </svg>
  );
}

// ── Scene 5: Upper floor plan ────────────────────────────────────────────────
function UpperScene() {
  const W = 760, H = 620;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ display:"block", width:"100%", height:"auto" }}>
      <defs>
        <pattern id="grid_u" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M20,0 L0,0 L0,20" fill="none" stroke="#D4C8B8" strokeWidth="0.4" />
        </pattern>
        <linearGradient id="parents_u" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#EEE0F5" /><stop offset="100%" stopColor="#E0CCEA" />
        </linearGradient>
        <linearGradient id="kids1_u" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#D8F0E8" /><stop offset="100%" stopColor="#C8E4DC" />
        </linearGradient>
        <linearGradient id="kids2_u" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#D8EAF0" /><stop offset="100%" stopColor="#C8DCE8" />
        </linearGradient>
        <linearGradient id="hall_u" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFF8D8" /><stop offset="100%" stopColor="#F5ECC8" />
        </linearGradient>
        <linearGradient id="bath_u" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#D0E8F5" /><stop offset="100%" stopColor="#C0DAEC" />
        </linearGradient>
      </defs>

      {/* Background */}
      <rect width={W} height={H} fill={P.cream} />
      <rect width={W} height={H} fill="url(#grid_u)" />

      {/* ── OUTER WALLS ── */}
      <rect x="64" y="55" width="632" height="505" fill="none" stroke={P.dark} strokeWidth="12" rx="2" />

      {/* ── PARENTS WING ── left */}
      {/* Master bedroom */}
      <rect x="70" y="61" width="212" height="216" fill="url(#parents_u)" />
      <rect x="70" y="61" width="212" height="216" fill="none" stroke="#7040A0" strokeWidth="2.5" />
      {/* Bed */}
      <rect x="88" y="82" width="130" height="88" rx="7" fill="#A070C0" fillOpacity="0.38" />
      <rect x="88" y="82" width="130" height="24" rx="5" fill="#8050A0" fillOpacity="0.48" />
      {[76,220].map((bx,i)=><rect key={i} x={bx} y="96" width="14" height="22" rx="3" fill="#9060B0" fillOpacity="0.48" />)}
      {/* Wardrobe */}
      <rect x="88" y="196" width="90" height="18" rx="2" fill="#8050A0" fillOpacity="0.32" />
      <line x1="133" y1="196" x2="133" y2="214" stroke="#6030A0" strokeWidth="1" />
      {/* Window seat south */}
      <rect x="88" y="260" width="185" height="14" rx="3" fill="#9860B0" fillOpacity="0.28" stroke="#7040A0" strokeWidth="1.2" strokeDasharray="5 3" />
      {/* Labels */}
      <text x="176" y="246" textAnchor="middle" fill="#6030A0" fontSize="12" fontWeight="800" fontFamily="'Heebo',Arial,sans-serif">חדר הורים</text>
      <text x="176" y="260" textAnchor="middle" fill="#7040A0" fontSize="9.5" fontFamily="'Heebo',Arial,sans-serif">~22 מ״ר</text>

      {/* Ensuite bathroom */}
      <rect x="70" y="277" width="212" height="108" fill="url(#bath_u)" />
      <rect x="70" y="277" width="212" height="108" fill="none" stroke="#2060A0" strokeWidth="2" />
      {/* Shower */}
      <rect x="82" y="288" width="58" height="60" rx="2" fill="#90C0E0" fillOpacity="0.55" />
      <line x1="111" y1="288" x2="111" y2="348" stroke="#2060A0" strokeWidth="1" />
      {/* Bathtub */}
      <rect x="150" y="292" width="88" height="52" rx="9" fill="#A8D0EC" fillOpacity="0.6" stroke="#2060A0" strokeWidth="1.2" />
      {/* Sink */}
      <ellipse cx="110" cy="364" rx="20" ry="12" fill="#88C0E0" fillOpacity="0.65" stroke="#2060A0" strokeWidth="1" />
      <text x="176" y="375" textAnchor="middle" fill="#204080" fontSize="10" fontWeight="700" fontFamily="'Heebo',Arial,sans-serif">חדר רחצה הורים</text>

      {/* Parents balcony */}
      <rect x="70" y="385" width="212" height="72" fill="#E8D0F8" fillOpacity="0.38" stroke="#7040A0" strokeWidth="1.5" strokeDasharray="6 3" />
      {[82,100,118,136,154,172,190,208,224,242,260].map(bx=>(
        <circle key={bx} cx={bx} cy={455} r={2.2} fill="#7040A0" fillOpacity="0.55" />
      ))}
      <text x="176" y="425" textAnchor="middle" fill="#6030A0" fontSize="10.5" fontWeight="700" fontFamily="'Heebo',Arial,sans-serif">מרפסת הורים</text>
      <text x="176" y="440" textAnchor="middle" fill="#7040A0" fontSize="8.5" fontFamily="'Heebo',Arial,sans-serif">נוף לשדות</text>

      {/* ── CORRIDOR / STAIRCASE — CENTER ── */}
      <rect x="282" y="61" width="196" height="499" fill="url(#hall_u)" />
      <rect x="282" y="61" width="196" height="499" fill="none" stroke={P.dark} strokeWidth="2.5" />

      {/* SKYLIGHT */}
      <rect x="296" y="74" width="168" height="120" rx="7" fill="#FFF5A0" fillOpacity="0.78" stroke="#C8A020" strokeWidth="2" strokeDasharray="7 3" />
      {[0,45,90,135,180,225,270,315].map(a=>{
        const r=a*Math.PI/180, cx=380, cy=134;
        return <line key={a} x1={cx+Math.cos(r)*18} y1={cy+Math.sin(r)*18} x2={cx+Math.cos(r)*34} y2={cy+Math.sin(r)*34} stroke="#C8A020" strokeWidth="1.2" strokeOpacity="0.6" />;
      })}
      <circle cx="380" cy="134" r="14" fill="#FFE840" fillOpacity="0.6" />
      <text x="380" y="127" textAnchor="middle" fill="#806000" fontSize="11" fontWeight="800" fontFamily="'Heebo',Arial,sans-serif">סקיילייט</text>
      <text x="380" y="141" textAnchor="middle" fill="#806000" fontSize="9" fontFamily="'Heebo',Arial,sans-serif">אור טבעי</text>

      {/* Staircase */}
      <rect x="290" y="270" width="180" height="150" fill="#E8D8A8" fillOpacity="0.75" stroke={P.wood2} strokeWidth="1.5" />
      {Array.from({length:9}).map((_,i)=>(
        <rect key={i} x={290} y={270+i*16} width={180} height={5} fill={P.stone3} fillOpacity="0.5" />
      ))}
      <text x="380" y="352" textAnchor="middle" fill={P.wood1} fontSize="11" fontWeight="700" fontFamily="'Heebo',Arial,sans-serif">מדרגות</text>
      <text x="380" y="366" textAnchor="middle" fill={P.wood2} fontSize="9" fontFamily="'Heebo',Arial,sans-serif">↑ ↓</text>

      {/* Shared bath */}
      <rect x="290" y="440" width="180" height="112" fill="url(#bath_u)" />
      <rect x="290" y="440" width="180" height="112" fill="none" stroke="#2060A0" strokeWidth="1.8" />
      <ellipse cx="338" cy="478" rx="22" ry="15" fill="#88C0E0" fillOpacity="0.6" stroke="#2060A0" strokeWidth="1" />
      <rect x="370" y="454" width="44" height="35" rx="3" fill="#90C0E0" fillOpacity="0.55" stroke="#2060A0" strokeWidth="1" />
      <rect x="420" y="450" width="42" height="65" rx="9" fill="#A8D0EC" fillOpacity="0.55" stroke="#2060A0" strokeWidth="1" />
      <text x="380" y="536" textAnchor="middle" fill="#204080" fontSize="10" fontWeight="700" fontFamily="'Heebo',Arial,sans-serif">חדר רחצה ילדים</text>

      <text x="380" y="230" textAnchor="middle" fill="#5A4010" fontSize="11" fontWeight="700" fontFamily="'Heebo',Arial,sans-serif">מסדרון</text>

      {/* ── KIDS WING — RIGHT ── */}
      {/* Kid room 1 */}
      <rect x="478" y="61" width="218" height="230" fill="url(#kids1_u)" />
      <rect x="478" y="61" width="218" height="230" fill="none" stroke="#107040" strokeWidth="2.5" />
      {/* Bed */}
      <rect x="494" y="80" width="100" height="72" rx="6" fill="#40A870" fillOpacity="0.38" />
      <rect x="494" y="80" width="100" height="20" rx="5" fill="#208050" fillOpacity="0.48" />
      {/* Desk */}
      <rect x="602" y="84" width="68" height="44" rx="3" fill="#50A878" fillOpacity="0.3" />
      <rect x="646" y="84" width="22" height="44" rx="2" fill="#30886A" fillOpacity="0.35" />  {/* monitor */}
      {/* Window seat */}
      <rect x="484" y="267" width="204" height="18" rx="4" fill="#60B888" fillOpacity="0.38" stroke="#107040" strokeWidth="1.5" strokeDasharray="5 3" />
      <text x="487" y="278" fill="#107040" fontSize="8.5" fontFamily="'Heebo',Arial,sans-serif">מושב חלון</text>
      <text x="587" y="238" textAnchor="middle" fill="#107040" fontSize="12" fontWeight="800" fontFamily="'Heebo',Arial,sans-serif">חדר ילד/ה א׳</text>
      <text x="587" y="254" textAnchor="middle" fill="#207850" fontSize="9.5" fontFamily="'Heebo',Arial,sans-serif">~18 מ״ר</text>

      {/* Kid room 2 */}
      <rect x="478" y="291" width="218" height="269" fill="url(#kids2_u)" />
      <rect x="478" y="291" width="218" height="269" fill="none" stroke="#104870" strokeWidth="2.5" />
      {/* Bed */}
      <rect x="494" y="310" width="100" height="70" rx="6" fill="#4080B0" fillOpacity="0.38" />
      <rect x="494" y="310" width="100" height="20" rx="5" fill="#2060A0" fillOpacity="0.48" />
      {/* Small balcony */}
      <rect x="594" y="305" width="70" height="65" rx="3" fill="#88B8D8" fillOpacity="0.4" stroke="#104870" strokeWidth="1.5" strokeDasharray="5 3" />
      {[600,614,628,642,654].map(bx=><circle key={bx} cx={bx} cy={368} r={2} fill="#104870" fillOpacity="0.5" />)}
      <text x="629" y="340" textAnchor="middle" fill="#104870" fontSize="9" fontWeight="700" fontFamily="'Heebo',Arial,sans-serif">מרפסת</text>
      {/* Reading nook */}
      <rect x="484" y="420" width="58" height="90" rx="3" fill="#5888B0" fillOpacity="0.28" stroke="#104870" strokeWidth="1.2" />
      {[0,1,2,3].map(i=><line key={i} x1={484} y1={434+i*18} x2={542} y2={434+i*18} stroke="#104870" strokeWidth="0.9" />)}
      <text x="487" y="498" fill="#104870" fontSize="8.5" fontFamily="'Heebo',Arial,sans-serif">פינת קריאה</text>
      {/* Sloped ceiling line */}
      <path d={`M554,430 L686,340`} fill="none" stroke="#104870" strokeWidth="1.5" strokeDasharray="5 3" strokeOpacity="0.65" />
      <text x="635" y="400" fill="#104870" fontSize="8.5" fontFamily="'Heebo',Arial,sans-serif" transform="rotate(-30,635,400)">תקרה משופעת + קורות עץ</text>
      <text x="587" y="500" textAnchor="middle" fill="#104870" fontSize="12" fontWeight="800" fontFamily="'Heebo',Arial,sans-serif">חדר ילד/ה ב׳</text>
      <text x="587" y="516" textAnchor="middle" fill="#206080" fontSize="9.5" fontFamily="'Heebo',Arial,sans-serif">~18 מ״ר</text>

      {/* ── WING LABELS ── */}
      {/* Parents bracket */}
      <rect x="30" y="61" width="30" height="396" rx="3" fill="none" stroke="#7040A0" strokeWidth="2.2" />
      <line x1="30" y1="61" x2="20" y2="61" stroke="#7040A0" strokeWidth="2.2" />
      <line x1="30" y1="457" x2="20" y2="457" stroke="#7040A0" strokeWidth="2.2" />
      <text x="20" y="260" textAnchor="middle" fill="#6030A0" fontSize="12" fontWeight="800" fontFamily="'Heebo',Arial,sans-serif" transform="rotate(-90,20,260)">אגף הורים</text>

      {/* Kids bracket */}
      <rect x="700" y="61" width="30" height="499" rx="3" fill="none" stroke="#107040" strokeWidth="2.2" />
      <line x1="730" y1="61" x2="742" y2="61" stroke="#107040" strokeWidth="2.2" />
      <line x1="730" y1="560" x2="742" y2="560" stroke="#107040" strokeWidth="2.2" />
      <text x="746" y="310" textAnchor="middle" fill="#107040" fontSize="12" fontWeight="800" fontFamily="'Heebo',Arial,sans-serif" transform="rotate(90,746,310)">אגף ילדים</text>

      {/* North arrow */}
      <g transform="translate(700,34)">
        <circle cx="0" cy="0" r="16" fill={P.dark} fillOpacity="0.85" />
        <polygon points="0,-11 -5,7 0,4 5,7" fill="white" />
        <text x="0" y="4.5" textAnchor="middle" fill={P.terracotta} fontSize="9" fontWeight="900" fontFamily="Arial,sans-serif">N</text>
      </g>

      <Label x={380} y={H-14} text="תוכנית קומה עליונה — מוצעת" w={228} />
    </svg>
  );
}

// ── App shell ────────────────────────────────────────────────────────────────
export default function VillaAfter() {
  const [active, setActive] = useState(0);
  const slide = SLIDES[active];

  return (
    <div dir="rtl" style={{ fontFamily:"'Heebo',Arial,sans-serif", background:"#0C0806", minHeight:"100vh", color:"#F5EDE0", display:"flex", flexDirection:"column" }}>

      {/* Header */}
      <header style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"16px 28px", borderBottom:"1px solid rgba(255,255,255,0.08)", background:"rgba(18,10,4,0.95)", backdropFilter:"blur(12px)", flexShrink:0 }}>
        <div>
          <div style={{ color:"#C4834A", fontSize:10, fontWeight:700, letterSpacing:".22em", textTransform:"uppercase", marginBottom:3 }}>
            בריף אדריכלי — הבית שלנו בשדות
          </div>
          <div style={{ color:"rgba(255,255,255,0.45)", fontSize:12 }}>הדמיות חזון — מצב אחרי השינויים</div>
        </div>
        <div style={{ color:"rgba(255,255,255,0.25)", fontSize:11 }}>
          {slide.num} / 05 &nbsp;·&nbsp; {slide.tag}
        </div>
      </header>

      {/* Tab bar */}
      <nav style={{ display:"flex", gap:5, padding:"10px 14px", background:"#120804", borderBottom:"1px solid rgba(255,255,255,0.06)", overflowX:"auto", flexShrink:0 }}>
        {SLIDES.map((s,i)=>(
          <button key={s.id} onClick={()=>setActive(i)} style={{
            background: active===i ? "#B5472A" : "rgba(255,255,255,0.05)",
            border:`1px solid ${active===i?"#B5472A":"rgba(255,255,255,0.1)"}`,
            borderRadius:10, padding:"8px 16px",
            cursor:"pointer", flexShrink:0, textAlign:"right",
          }}>
            <div style={{ color:active===i?"rgba(255,255,255,0.6)":"rgba(255,255,255,0.25)", fontSize:9, fontWeight:700, letterSpacing:".1em", marginBottom:2 }}>{s.num}</div>
            <div style={{ color:active===i?"#fff":"rgba(255,255,255,0.5)", fontSize:12, fontWeight:700, whiteSpace:"nowrap" }}>{s.tag}</div>
          </button>
        ))}
      </nav>

      {/* Content */}
      <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden" }}>
        {/* Description strip */}
        <div style={{ padding:"16px 28px 12px", background:"rgba(12,8,6,0.9)", borderBottom:"1px solid rgba(255,255,255,0.06)", flexShrink:0 }}>
          <h2 style={{ fontSize:"clamp(18px,3vw,26px)", fontWeight:900, margin:"0 0 6px", color:"#fff" }}>{slide.title}</h2>
          <p style={{ fontSize:13.5, color:"rgba(255,255,255,0.6)", margin:"0 0 10px", lineHeight:1.75, fontWeight:300 }}>{slide.desc}</p>
          <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
            {slide.points.map((p,i)=>(
              <div key={i} style={{ display:"inline-flex", alignItems:"center", gap:7, background:"rgba(181,71,42,0.18)", border:"1px solid rgba(181,71,42,0.35)", borderRadius:100, padding:"4px 12px" }}>
                <div style={{ width:5,height:5,borderRadius:"50%",background:"#C4834A",flexShrink:0 }} />
                <span style={{ fontSize:11.5, color:"rgba(255,255,255,0.72)", fontWeight:500 }}>{p}</span>
              </div>
            ))}
          </div>
        </div>

        {/* SVG scene */}
        <div style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", padding:"16px", background:"#0C0806", overflow:"hidden" }}>
          <div style={{ width:"100%", maxWidth:920, borderRadius:16, overflow:"hidden", boxShadow:"0 16px 60px rgba(0,0,0,0.6)", border:"1px solid rgba(255,255,255,0.06)" }}>
            <slide.Scene />
          </div>
        </div>

        {/* Prev/Next */}
        <div style={{ display:"flex", justifyContent:"space-between", padding:"12px 28px", borderTop:"1px solid rgba(255,255,255,0.06)", background:"rgba(12,8,6,0.9)", flexShrink:0 }}>
          <button onClick={()=>setActive((active-1+SLIDES.length)%SLIDES.length)}
            style={{ background:"rgba(255,255,255,0.07)", border:"1px solid rgba(255,255,255,0.12)", borderRadius:10, padding:"8px 20px", color:"rgba(255,255,255,0.6)", cursor:"pointer", fontSize:13, fontWeight:600 }}>
            → הקודם
          </button>
          <div style={{ display:"flex", gap:6, alignItems:"center" }}>
            {SLIDES.map((_,i)=>(
              <div key={i} onClick={()=>setActive(i)} style={{ width:active===i?22:6, height:6, borderRadius:3, background:active===i?"#C4834A":"rgba(255,255,255,0.2)", cursor:"pointer", transition:"all .25s" }} />
            ))}
          </div>
          <button onClick={()=>setActive((active+1)%SLIDES.length)}
            style={{ background:"rgba(255,255,255,0.07)", border:"1px solid rgba(255,255,255,0.12)", borderRadius:10, padding:"8px 20px", color:"rgba(255,255,255,0.6)", cursor:"pointer", fontSize:13, fontWeight:600 }}>
            הבא ←
          </button>
        </div>
      </div>
    </div>
  );
}

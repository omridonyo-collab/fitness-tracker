import { useState } from "react";

/* ══════════════════════════════════════════════════════════════════════════
   SHARED FILTER / GRADIENT DEFS — injected into each SVG
══════════════════════════════════════════════════════════════════════════ */
function Defs() {
  return (
    <defs>
      {/* ── Sky ── */}
      <linearGradient id="gSky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%"   stopColor="#1A5C96"/>
        <stop offset="38%"  stopColor="#3A8FC8"/>
        <stop offset="65%"  stopColor="#78BDE0"/>
        <stop offset="82%"  stopColor="#B8DCF0"/>
        <stop offset="93%"  stopColor="#D8EDF5"/>
        <stop offset="100%" stopColor="#E5F0DC"/>
      </linearGradient>
      <radialGradient id="gSun" cx="78%" cy="18%" r="45%">
        <stop offset="0%"   stopColor="#FFFAE0" stopOpacity="0.95"/>
        <stop offset="25%"  stopColor="#FFE090" stopOpacity="0.45"/>
        <stop offset="100%" stopColor="#78BDE0" stopOpacity="0"/>
      </radialGradient>
      {/* ── Stone wall ── */}
      <filter id="fStone" x="-2%" y="-2%" width="104%" height="104%" colorInterpolationFilters="sRGB">
        <feTurbulence type="fractalNoise" baseFrequency="0.038 0.065" numOctaves="5" seed="7" result="nz"/>
        <feDiffuseLighting in="nz" lightingColor="#E8D8B8" surfaceScale="4" result="lit">
          <feDistantLight azimuth="315" elevation="52"/>
        </feDiffuseLighting>
        <feBlend in="SourceGraphic" in2="lit" mode="multiply" result="out"/>
        <feComponentTransfer in="out">
          <feFuncR type="linear" slope="1.05" intercept="-0.02"/>
          <feFuncG type="linear" slope="0.98"/>
          <feFuncB type="linear" slope="0.92"/>
        </feComponentTransfer>
      </filter>
      {/* ── Wood grain ── */}
      <filter id="fWood" x="-2%" y="-2%" width="104%" height="104%" colorInterpolationFilters="sRGB">
        <feTurbulence type="turbulence" baseFrequency="0.006 0.45" numOctaves="3" seed="4" result="nz"/>
        <feDiffuseLighting in="nz" lightingColor="#E0B870" surfaceScale="2.5" result="lit">
          <feDistantLight azimuth="300" elevation="65"/>
        </feDiffuseLighting>
        <feBlend in="SourceGraphic" in2="lit" mode="multiply"/>
      </filter>
      {/* ── Soft ground shadow ── */}
      <filter id="fShadow" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="9" in="SourceAlpha" result="b"/>
        <feFlood floodColor="rgba(30,15,5,0.55)" result="c"/>
        <feComposite in="c" in2="b" operator="in" result="shadow"/>
        <feMerge><feMergeNode in="shadow"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
      {/* ── Depth haze ── */}
      <filter id="fHaze">
        <feColorMatrix type="matrix"
          values="0.72 0 0 0 0.18  0 0.75 0 0 0.22  0 0 0.8 0 0.32  0 0 0 0.7 0"/>
      </filter>
      {/* ── Glass ── */}
      <linearGradient id="gGlass" x1="0.1" y1="0" x2="0.9" y2="1">
        <stop offset="0%"   stopColor="#C0DCF0" stopOpacity="0.92"/>
        <stop offset="25%"  stopColor="#D8EEF8" stopOpacity="0.82"/>
        <stop offset="55%"  stopColor="#EEF8FF" stopOpacity="0.72"/>
        <stop offset="100%" stopColor="#D0E8D0" stopOpacity="0.85"/>
      </linearGradient>
      <linearGradient id="gGlassShine" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%"   stopColor="white" stopOpacity="0.55"/>
        <stop offset="35%"  stopColor="white" stopOpacity="0.08"/>
        <stop offset="100%" stopColor="white" stopOpacity="0.12"/>
      </linearGradient>
      {/* ── Interior warm light ── */}
      <radialGradient id="gWarm" cx="50%" cy="38%" r="65%">
        <stop offset="0%"   stopColor="#FFF6D0"/>
        <stop offset="55%"  stopColor="#EAC870"/>
        <stop offset="100%" stopColor="#8A5828"/>
      </radialGradient>
      {/* ── Terracotta roof ── */}
      <linearGradient id="gRoof" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%"   stopColor="#B84030"/>
        <stop offset="45%"  stopColor="#9A3020"/>
        <stop offset="100%" stopColor="#6A1E10"/>
      </linearGradient>
      <filter id="fRoof" x="-2%" y="-2%" width="104%" height="104%" colorInterpolationFilters="sRGB">
        <feTurbulence type="fractalNoise" baseFrequency="0.06 0.25" numOctaves="3" seed="2" result="nz"/>
        <feDiffuseLighting in="nz" lightingColor="#E89070" surfaceScale="3" result="lit">
          <feDistantLight azimuth="315" elevation="55"/>
        </feDiffuseLighting>
        <feBlend in="SourceGraphic" in2="lit" mode="multiply"/>
      </filter>
      {/* ── Stone floor (interior) ── */}
      <filter id="fFloor" x="-2%" y="-2%" width="104%" height="104%" colorInterpolationFilters="sRGB">
        <feTurbulence type="fractalNoise" baseFrequency="0.05 0.05" numOctaves="4" seed="11" result="nz"/>
        <feDiffuseLighting in="nz" lightingColor="#F0D8A8" surfaceScale="2" result="lit">
          <feDistantLight azimuth="330" elevation="70"/>
        </feDiffuseLighting>
        <feBlend in="SourceGraphic" in2="lit" mode="overlay"/>
      </filter>
      {/* ── Wall lighting overlay ── */}
      <linearGradient id="gWallLit" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%"   stopColor="rgba(20,10,2,0.22)"/>
        <stop offset="25%"  stopColor="rgba(0,0,0,0)"/>
        <stop offset="78%"  stopColor="rgba(255,220,150,0.07)"/>
        <stop offset="100%" stopColor="rgba(255,220,150,0.18)"/>
      </linearGradient>
      <linearGradient id="gWallTop" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%"   stopColor="rgba(255,245,200,0.14)"/>
        <stop offset="35%"  stopColor="rgba(0,0,0,0)"/>
        <stop offset="100%" stopColor="rgba(15,8,2,0.28)"/>
      </linearGradient>
      {/* ── Ground / paving ── */}
      <linearGradient id="gGround" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%"   stopColor="#C8B898"/>
        <stop offset="100%" stopColor="#A89878"/>
      </linearGradient>
      {/* ── Plaster wall ── */}
      <linearGradient id="gPlaster" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%"   stopColor="#F2E8D8"/>
        <stop offset="100%" stopColor="#DDD0BA"/>
      </linearGradient>
      {/* ── Staircase light ── */}
      <radialGradient id="gStairLight" cx="25%" cy="20%" r="55%">
        <stop offset="0%"   stopColor="#FFF8E0" stopOpacity="0.95"/>
        <stop offset="40%"  stopColor="#F0D890" stopOpacity="0.6"/>
        <stop offset="100%" stopColor="#8A6030" stopOpacity="0"/>
      </radialGradient>
      {/* ── Vine leaf pattern ── */}
      <pattern id="pVine" x="0" y="0" width="36" height="52" patternUnits="userSpaceOnUse">
        <ellipse cx="18" cy="13" rx="11" ry="7" fill="#2A7218" transform="rotate(-35,18,13)" opacity="0.82"/>
        <ellipse cx="8"  cy="30" rx="9"  ry="6" fill="#388228" transform="rotate(22,8,30)"  opacity="0.75"/>
        <ellipse cx="26" cy="42" rx="10" ry="6" fill="#3A9A2A" transform="rotate(-12,26,42)" opacity="0.78"/>
        <path d="M18,0 Q16,18 18,52" stroke="#2E5C18" strokeWidth="1.5" fill="none" opacity="0.55"/>
      </pattern>
      {/* ── Cypress tree clip path ── */}
      <clipPath id="clipSky"><rect width="900" height="540"/></clipPath>
    </defs>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   SCENE 1 — SALON: Full glass wall opens to Tuscan fields
══════════════════════════════════════════════════════════════════════════ */
function SalonScene() {
  /* One-point perspective: VP at (450, 268)
     Near opening: x 0..900, y 0..540
     Far glass wall: x 195..705, y 108..428  */
  const vx = 450, vy = 268;
  const fl = 195, fr = 705, ft = 108, fb = 428; // far wall bounds

  // helper: perspective line from near-edge to vanishing point clipped
  const panels = [fl, fl+87, fl+174, fl+261, fl+348, fl+435, fr]; // 6 panels

  return (
    <svg viewBox="0 0 900 540" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%",display:"block"}}>
      <Defs/>

      {/* ── Landscape visible through glass wall ── */}
      <clipPath id="glassClip">
        <rect x={fl} y={ft} width={fr-fl} height={fb-ft}/>
      </clipPath>
      <g clipPath="url(#glassClip)">
        {/* Sky */}
        <rect x={fl} y={ft} width={fr-fl} height={fb-ft} fill="url(#gSky)"/>
        <rect x={fl} y={ft} width={fr-fl} height={fb-ft} fill="url(#gSun)"/>
        {/* Distant hills */}
        <ellipse cx="350" cy="285" rx="200" ry="60" fill="#6AAC52" filter="url(#fHaze)" opacity="0.7"/>
        <ellipse cx="580" cy="292" rx="180" ry="55" fill="#58A040" filter="url(#fHaze)" opacity="0.65"/>
        <ellipse cx="450" cy="310" rx="260" ry="50" fill="#7AC060" filter="url(#fHaze)" opacity="0.5"/>
        {/* Horizon haze band */}
        <rect x={fl} y="278" width={fr-fl} height="28" fill="rgba(190,220,240,0.55)"/>
        {/* Cypress trees silhouette */}
        {[230,280,620,670].map((x,i)=>(
          <ellipse key={i} cx={x} cy={270+(i%2)*12} rx={9+i%2*3} ry={38+i%2*8}
            fill={i%2===0?"#1E5818":"#266220"} filter="url(#fHaze)" opacity={0.8-i*0.05}/>
        ))}
        {/* Fields / ground */}
        <rect x={fl} y="326" width={fr-fl} height={fb-326} fill="#7AB848"/>
        {/* Ground texture */}
        <rect x={fl} y="326" width={fr-fl} height={fb-326} fill="#5A9830" opacity="0.4"/>
        {/* Field rows */}
        {[340,360,382,408,428].map((y,i)=>(
          <line key={i} x1={fl} y1={y} x2={fr} y2={y} stroke="#4A8828" strokeWidth={1+i*0.3} opacity="0.4"/>
        ))}
      </g>

      {/* ── Room floor ── */}
      <polygon points={`0,540 900,540 ${fr},${fb} ${fl},${fb}`}
        fill="#C89860" filter="url(#fFloor)"/>
      {/* Floor tile grid — perspective */}
      {[0.18,0.35,0.52,0.68,0.82,0.93].map((t,i)=>{
        const y = ft + (540-ft)*t + (fb-ft)*(1-t)*0;
        const yy = fb + (540-fb)*t;
        const xL = fl + (0-fl)*t;
        const xR = fr + (900-fr)*t;
        return <line key={i} x1={xL} y1={yy} x2={xR} y2={yy} stroke="rgba(120,80,40,0.35)" strokeWidth="1.2"/>;
      })}
      {/* Vertical tile lines in floor perspective */}
      {[-2,-1,0,1,2,3,4,5,6,7].map((n,i)=>{
        const nx = vx + n*90;
        return <line key={i} x1={nx} y1={fb} x2={vx+(nx-vx)*4} y2={540}
          stroke="rgba(120,80,40,0.25)" strokeWidth="0.8"/>;
      })}
      {/* Floor brightness toward glass wall */}
      <polygon points={`${fl+60},${fb} ${fr-60},${fb} ${fr-30},${fb+30} ${fl+30},${fb+30}`}
        fill="rgba(255,220,150,0.25)"/>

      {/* ── Room ceiling ── */}
      <polygon points={`0,0 900,0 ${fr},${ft} ${fl},${ft}`} fill="#E8DCC8"/>
      {/* Ceiling shadow near walls */}
      <polygon points={`0,0 900,0 ${fr},${ft} ${fl},${ft}`} fill="url(#gWallTop)" opacity="0.5"/>

      {/* ── Exposed wood ceiling beams ── */}
      {[-1,0,1,2,3].map((n,i)=>{
        const bx = vx + n*140;
        const nearL = bx - 22;
        const nearR = bx + 22;
        const farL = vx + (bx-22-vx)*((ft-0)/(ft-0)) ;
        // beam recedes to VP
        const farLx = vx + (nearL-vx)*(ft/0+0.05);
        const farRx = vx + (nearR-vx)*(ft/0+0.05);
        // approximate: at y=ft, beam is narrower
        const scale = (ft)/(0+0.01); // avoid div0
        const bfL = vx + (nearL-vx)*0.15;
        const bfR = vx + (nearR-vx)*0.15;
        return (
          <g key={i}>
            <polygon points={`${nearL},0 ${nearR},0 ${bfR},${ft} ${bfL},${ft}`}
              fill="#5A3010" filter="url(#fWood)" opacity="0.92"/>
            <polygon points={`${nearL},0 ${nearR},0 ${bfR},${ft} ${bfL},${ft}`}
              fill="rgba(255,200,100,0.08)"/>
          </g>
        );
      })}

      {/* ── Left wall ── */}
      <polygon points={`0,0 ${fl},${ft} ${fl},${fb} 0,540`} fill="#EAD8C0"/>
      <polygon points={`0,0 ${fl},${ft} ${fl},${fb} 0,540`} fill="url(#gWallTop)" opacity="0.6"/>
      {/* Stone accent strip on left wall */}
      <polygon points={`0,0 45,0 ${fl},${ft} 0,0`} fill="#B8A080" filter="url(#fStone)" opacity="0.7"/>
      <polygon points={`0,430 55,540 0,540`} fill="#B8A080" filter="url(#fStone)" opacity="0.5"/>

      {/* ── Right wall ── */}
      <polygon points={`900,0 ${fr},${ft} ${fr},${fb} 900,540`} fill="#E0CEB8"/>
      <polygon points={`900,0 ${fr},${ft} ${fr},${fb} 900,540`} fill="url(#gWallTop)" opacity="0.6"/>
      {/* Stone accent strip on right */}
      <polygon points={`900,0 855,0 ${fr},${ft}`} fill="#B8A080" filter="url(#fStone)" opacity="0.7"/>

      {/* ── Glass wall — structural frame ── */}
      {/* Frame background dark reveal */}
      <rect x={fl-8} y={ft-8} width={fr-fl+16} height={fb-ft+16} fill="#2A1A08" rx="2"/>
      {/* Glass panels */}
      {panels.slice(0,-1).map((px,i)=>(
        <rect key={i} x={px+2} y={ft+2} width={panels[i+1]-px-4} height={fb-ft-4}
          fill="url(#gGlass)" rx="1"/>
      ))}
      {/* Glass reflections */}
      {panels.slice(0,-1).map((px,i)=>(
        <rect key={i} x={px+2} y={ft+2} width={(panels[i+1]-px)*0.38} height={fb-ft-4}
          fill="url(#gGlassShine)" rx="1" opacity="0.85"/>
      ))}
      {/* Frame verticals */}
      {panels.map((px,i)=>(
        <rect key={i} x={px-3} y={ft-8} width={6} height={fb-ft+16} fill="#3A2010" rx="1"/>
      ))}
      {/* Frame horizontals */}
      <rect x={fl-8} y={ft-4} width={fr-fl+16} height={7} fill="#3A2010"/>
      <rect x={fl-8} y={fb-3} width={fr-fl+16} height={7} fill="#3A2010"/>
      {/* Mid-rail */}
      <rect x={fl-8} y={vy-3} width={fr-fl+16} height={5} fill="#3A2010" opacity="0.7"/>

      {/* ── Furniture — Sofa ── */}
      {/* Sofa body in perspective (facing glass wall) */}
      <g opacity="0.95">
        {/* Back cushion */}
        <polygon points="310,430 590,430 580,400 320,400" fill="#6A5848" filter="url(#fFloor)"/>
        {/* Seat */}
        <polygon points="300,460 600,460 590,430 310,430" fill="#7A6858"/>
        {/* Left arm */}
        <polygon points="300,460 310,430 310,400 295,430" fill="#5A4838"/>
        {/* Right arm */}
        <polygon points="600,460 590,430 590,400 605,430" fill="#5A4838"/>
        {/* Cushion line */}
        <line x1="450" y1="460" x2="450" y2="430" stroke="rgba(255,255,255,0.12)" strokeWidth="2"/>
        {/* Sofa leg shadows */}
        <ellipse cx="320" cy="466" rx="12" ry="4" fill="rgba(0,0,0,0.35)"/>
        <ellipse cx="580" cy="466" rx="12" ry="4" fill="rgba(0,0,0,0.35)"/>
      </g>
      {/* Coffee table */}
      <polygon points="370,490 530,490 520,478 380,478" fill="#3A2010" opacity="0.9"/>
      <line x1="380" y1="478" x2="530" y2="490" stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>

      {/* ── Ambient room glow (warm interior) ── */}
      <radialGradient id="gRoomGlow" cx="50%" cy="50%" r="70%">
        <stop offset="0%"   stopColor="rgba(255,220,140,0.18)"/>
        <stop offset="100%" stopColor="rgba(0,0,0,0)"/>
      </radialGradient>
      <rect width="900" height="540" fill="url(#gRoomGlow)"/>

      {/* ── Vignette ── */}
      <radialGradient id="gVig" cx="50%" cy="50%" r="75%">
        <stop offset="60%" stopColor="rgba(0,0,0,0)"/>
        <stop offset="100%" stopColor="rgba(10,5,2,0.55)"/>
      </radialGradient>
      <rect width="900" height="540" fill="url(#gVig)"/>
    </svg>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   SCENE 2 — ENTRY: Double-height hall, floor-to-ceiling window
══════════════════════════════════════════════════════════════════════════ */
function EntryScene() {
  return (
    <svg viewBox="0 0 900 540" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%",display:"block"}}>
      <Defs/>

      {/* ── Staircase window — daylight backdrop ── */}
      <rect width="900" height="540" fill="#F5EFDE"/>

      {/* ── Left side: tall window (floor-to-ceiling, 2-storey) ── */}
      {/* Window niche reveals — stone surround */}
      <rect x="60" y="30" width="310" height="490" fill="#A09078" filter="url(#fStone)"/>
      {/* Window glass */}
      <rect x="80" y="45" width="270" height="462" fill="url(#gSky)"/>
      <rect x="80" y="45" width="270" height="462" fill="url(#gSun)"/>
      {/* Landscape in window */}
      <ellipse cx="215" cy="340" rx="200" ry="65" fill="#68AA48" filter="url(#fHaze)" opacity="0.8"/>
      <rect x="80" y="385" width="270" height="122" fill="#7AB848"/>
      {/* Horizon haze */}
      <rect x="80" y="318" width="270" height="30" fill="rgba(195,225,245,0.6)"/>
      {/* Cypress silhouettes */}
      <ellipse cx="135" cy="325" rx="9" ry="45" fill="#1A5215" filter="url(#fHaze)" opacity="0.85"/>
      <ellipse cx="290" cy="318" rx="8" ry="40" fill="#1E5818" filter="url(#fHaze)" opacity="0.8"/>
      {/* Window frame — structural bars */}
      <rect x="80"  y="45"  width="6"  height="462" fill="#3A2A14"/>
      <rect x="344" y="45"  width="6"  height="462" fill="#3A2A14"/>
      <rect x="80"  y="45"  width="270" height="6"  fill="#3A2A14"/>
      <rect x="80"  y="505" width="270" height="6"  fill="#3A2A14"/>
      {/* Horizontal rail at mid-floor */}
      <rect x="80" y="272" width="270" height="5" fill="#4A3820"/>
      {/* Vertical divider */}
      <rect x="213" y="45" width="5" height="462" fill="#4A3820"/>
      {/* Light rays from window */}
      {[0,1,2,3,4].map(i=>(
        <polygon key={i}
          points={`${100+i*54},45 ${130+i*54},45 ${900},${380+i*30} ${900},${350+i*30}`}
          fill={`rgba(255,240,200,${0.04-i*0.005})`}/>
      ))}
      {/* Stone sill */}
      <polygon points="60,507 370,507 380,518 50,518" fill="#C8B898" filter="url(#fStone)"/>

      {/* ── Right side: entry hall interior ── */}
      {/* Back wall — plaster */}
      <rect x="370" y="0" width="530" height="540" fill="#EDE0C8"/>
      <rect x="370" y="0" width="530" height="540" fill="url(#gWallTop)" opacity="0.6"/>
      {/* Stone feature strip: tall vertical pilaster */}
      <rect x="370" y="0" width="42" height="540" fill="#B0987A" filter="url(#fStone)"/>
      <rect x="858" y="0" width="42" height="540" fill="#B0987A" filter="url(#fStone)"/>
      {/* Baseboard */}
      <rect x="370" y="505" width="530" height="22" fill="#C8B090" filter="url(#fStone)"/>

      {/* ── Staircase ── */}
      {/* Staircase in perspective — going up left to right */}
      {Array.from({length:13},(_, i)=>{
        const stepW = 38;
        const stepH = 24;
        const baseX = 430 + i*stepW;
        const baseY = 540 - i*stepH;
        return (
          <g key={i}>
            {/* Tread */}
            <polygon
              points={`${baseX},${baseY} ${baseX+stepW},${baseY} ${baseX+stepW},${baseY-8} ${baseX},${baseY-8}`}
              fill="#C89860" filter="url(#fFloor)"/>
            {/* Riser */}
            <polygon
              points={`${baseX},${baseY-8} ${baseX+stepW},${baseY-8} ${baseX+stepW},${baseY-stepH} ${baseX},${baseY-stepH}`}
              fill="#E0CCA0"/>
            {/* Step shadow edge */}
            <line x1={baseX} y1={baseY-8} x2={baseX+stepW} y2={baseY-8}
              stroke="rgba(80,50,20,0.45)" strokeWidth="1.5"/>
          </g>
        );
      })}

      {/* Handrail */}
      <path d="M430,535 Q560,450 920,215"
        stroke="#5A3010" strokeWidth="8" fill="none" strokeLinecap="round" filter="url(#fWood)"/>
      {/* Balusters */}
      {Array.from({length:12},(_, i)=>{
        const bx = 445 + i*39;
        const by = 532 - i*25;
        const topX = 441 + i*39.8;
        const topY = 525 - i*26.5;
        return <line key={i} x1={bx} y1={by} x2={topX} y2={topY-55}
          stroke="#7A5030" strokeWidth="3" opacity="0.9"/>;
      })}

      {/* ── Floor ── */}
      <rect x="370" y="510" width="530" height="30" fill="#C89860" filter="url(#fFloor)"/>

      {/* ── Overhead — double height arch indication ── */}
      {/* Upper floor void edge */}
      <rect x="370" y="245" width="530" height="10" fill="#C8B090" opacity="0.6"/>
      {/* Upper balustrade */}
      <rect x="650" y="235" width="250" height="12" fill="#D8C8A8"/>
      {Array.from({length:8},(_, i)=>(
        <rect key={i} x={655+i*30} y={247} width={4} height={38} fill="#C0A880" opacity="0.8"/>
      ))}

      {/* ── Light glow from window ── */}
      <rect x="370" y="0" width="530" height="540" fill="url(#gStairLight)"/>

      {/* ── Vignette ── */}
      <radialGradient id="gVig2" cx="30%" cy="45%" r="80%">
        <stop offset="55%" stopColor="rgba(0,0,0,0)"/>
        <stop offset="100%" stopColor="rgba(8,4,1,0.5)"/>
      </radialGradient>
      <rect width="900" height="540" fill="url(#gVig2)"/>
    </svg>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   SCENE 3 — WEST FACADE: Full glass wall exterior view
══════════════════════════════════════════════════════════════════════════ */
function WestScene() {
  return (
    <svg viewBox="0 0 900 540" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%",display:"block"}}>
      <Defs/>

      {/* ── Sky ── */}
      <rect width="900" height="540" fill="url(#gSky)"/>
      <rect width="900" height="540" fill="url(#gSun)"/>

      {/* ── Background landscape ── */}
      <ellipse cx="150" cy="290" rx="220" ry="75" fill="#60A848" filter="url(#fHaze)" opacity="0.7"/>
      <ellipse cx="800" cy="295" rx="200" ry="70" fill="#58A040" filter="url(#fHaze)" opacity="0.65"/>
      <rect y="305" width="900" height="235" fill="#7AB848"/>
      <rect y="305" width="900" height="235" fill="#5A9028" opacity="0.45"/>
      {/* Horizon haze */}
      <rect y="285" width="900" height="35" fill="rgba(192,222,242,0.55)"/>
      {/* Cypress trees at sides */}
      {[80,130,760,820,858].map((x,i)=>(
        <ellipse key={i} cx={x} cy={280+i%2*18} rx={10+i%2*4} ry={55+i%2*20}
          fill={i%2===0?"#1A5215":"#246020"} filter="url(#fHaze)" opacity={0.85-i*0.06}/>
      ))}

      {/* ── Ground plane / terrace ── */}
      <polygon points="0,540 900,540 900,385 0,420" fill="#C8B898" filter="url(#fStone)"/>
      {/* Terrace paving lines */}
      {[400,418,437,458,480,504,530,540].map((y,i)=>(
        <line key={i} x1="0" y1={y} x2="900" y2={y} stroke="rgba(160,130,90,0.3)" strokeWidth="1.2"/>
      ))}
      {/* Building shadow on ground */}
      <polygon points="158,420 750,385 738,540 170,540"
        fill="rgba(40,25,10,0.28)" filter="url(#fShadow)"/>

      {/* ── Building base — stone foundation ── */}
      <rect x="155" y="365" width="590" height="30" fill="#9A8870" filter="url(#fStone)"/>

      {/* ── Stone corner pilasters ── */}
      <rect x="155" y="80" width="52" height="315" fill="#A89070" filter="url(#fStone)"/>
      <rect x="155" y="80" width="52" height="315" fill="url(#gWallLit)" opacity="0.8"/>
      <rect x="693" y="80" width="52" height="315" fill="#A89070" filter="url(#fStone)"/>
      <rect x="693" y="80" width="52" height="315" fill="url(#gWallLit)" opacity="0.8"/>

      {/* ── Glass panel wall (7 panels) ── */}
      {/* Dark reveal behind glass */}
      <rect x="205" y="90" width="490" height="305" fill="#1A1008"/>
      {/* Interior warm light visible through glass */}
      <rect x="207" y="92" width="486" height="301" fill="url(#gWarm)" opacity="0.88"/>
      {/* Interior silhouette - furniture */}
      <polygon points="270,360 430,360 420,348 280,350" fill="rgba(60,38,18,0.65)"/>
      <polygon points="470,365 610,365 600,350 480,352" fill="rgba(55,35,15,0.6)"/>
      {/* Glass panels overlay */}
      {[207,277,347,417,487,557,627].map((x,i)=>(
        <rect key={i} x={x} y="92" width={68} height="301" fill="url(#gGlass)" rx="1" opacity="0.75"/>
      ))}
      {/* Glass shine */}
      {[207,277,347,417,487,557,627].map((x,i)=>(
        <rect key={i} x={x} y="92" width={26} height="301" fill="url(#gGlassShine)" rx="1" opacity="0.7"/>
      ))}
      {/* Panel frames */}
      {[205,273,341,409,477,545,613,693].map((x,i)=>(
        <rect key={i} x={x} y="88" width={6} height="309} " fill="#2A1A08"/>
      ))}
      <rect x="205" y="88"  width="490" height="8"  fill="#2A1A08"/>
      <rect x="205" y="389" width="490" height="8"  fill="#2A1A08"/>
      {/* Mid-rail */}
      <rect x="205" y="238" width="490" height="5" fill="#3A2810" opacity="0.8"/>

      {/* ── Wood cornice with rafter ends ── */}
      <rect x="145" y="64" width="610" height="28" fill="#5A3010" filter="url(#fWood)"/>
      {/* Rafter ends protruding */}
      {Array.from({length:15},(_, i)=>(
        <g key={i}>
          <rect x={162+i*42} y="34" width={18} height="36} " fill="#6A3A18" filter="url(#fWood)"/>
          <rect x={163+i*42} y="33" width={16} height="7}  " fill="#7A4A22"/>
        </g>
      ))}
      {/* Cornice shadow */}
      <rect x="145" y="90" width="610" height="12" fill="rgba(0,0,0,0.28)"/>

      {/* ── Roof ── */}
      <polygon points="130,68 770,68 800,30 100,30" fill="url(#gRoof)" filter="url(#fRoof)"/>
      {/* Roof edge highlight */}
      <line x1="100" y1="30" x2="800" y2="30" stroke="rgba(255,200,150,0.35)" strokeWidth="2"/>

      {/* ── Terrace floor extension ── */}
      <polygon points="155,395 745,395 760,540 140,540" fill="#C0A880" filter="url(#fStone)" opacity="0.6"/>

      {/* ── Vignette ── */}
      <radialGradient id="gVig3" cx="50%" cy="52%" r="78%">
        <stop offset="55%" stopColor="rgba(0,0,0,0)"/>
        <stop offset="100%" stopColor="rgba(5,3,1,0.52)"/>
      </radialGradient>
      <rect width="900" height="540" fill="url(#gVig3)"/>
    </svg>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   SCENE 4 — TUSCAN FACADE: Stone, arches, shutters, vine — all facades
══════════════════════════════════════════════════════════════════════════ */
function TuscanScene() {
  /* Slight 3/4 angle: main wall x 120..760, receding side wall x 760..840 */
  return (
    <svg viewBox="0 0 900 540" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%",display:"block"}}>
      <Defs/>

      {/* ── Sky ── */}
      <rect width="900" height="540" fill="url(#gSky)"/>
      <rect width="900" height="540" fill="url(#gSun)"/>

      {/* ── Background: rolling fields + trees ── */}
      <ellipse cx="250" cy="295" rx="280" ry="80" fill="#62AA4A" filter="url(#fHaze)" opacity="0.72"/>
      <ellipse cx="820" cy="300" rx="200" ry="72" fill="#5AA040" filter="url(#fHaze)" opacity="0.65"/>
      <rect y="310" width="900" height="230" fill="#78B845"/>
      <rect y="310" width="900" height="230" fill="#5A9030" opacity="0.5"/>
      {/* Horizon haze */}
      <rect y="292" width="900" height="32" fill="rgba(192,222,242,0.58)"/>
      {/* Cypress trees */}
      {[65,115,820,872].map((x,i)=>(
        <ellipse key={i} cx={x} cy={282+i%2*15} rx={10+i*2} ry={55+i%2*18}
          fill={i%2===0?"#18501A":"#225E22"} filter="url(#fHaze)" opacity={0.88-i*0.07}/>
      ))}

      {/* ── Ground / paving ── */}
      <polygon points="0,540 900,540 900,382 0,410" fill="#C0B090" filter="url(#fStone)"/>
      {[398,416,436,458,482,508,536].map((y,i)=>(
        <line key={i} x1="0" y1={y} x2="900" y2={y} stroke="rgba(150,120,80,0.28)" strokeWidth="1.2"/>
      ))}
      {/* Building shadow */}
      <polygon points="120,410 760,382 748,540 132,540"
        fill="rgba(35,22,8,0.3)" filter="url(#fShadow)"/>

      {/* ── Foundation / plinth ── */}
      <rect x="112" y="358" width="656" height="32" fill="#9A8870" filter="url(#fStone)"/>
      <rect x="112" y="358" width="656" height="32" fill="url(#gWallTop)" opacity="0.5"/>

      {/* ── MAIN WALL — stone, full filter ── */}
      <rect x="120" y="68" width="638" height="295" fill="#B8A080" filter="url(#fStone)"/>
      {/* Wall lighting gradient */}
      <rect x="120" y="68" width="638" height="295" fill="url(#gWallLit)"/>
      <rect x="120" y="68" width="638" height="295" fill="url(#gWallTop)" opacity="0.7"/>

      {/* ── SIDE WALL (receding, right) ── */}
      <polygon points="758,68 840,78 840,358 758,363" fill="#9A8870" filter="url(#fStone)"/>
      <polygon points="758,68 840,78 840,358 758,363"
        fill="rgba(10,5,0,0.38)"/>

      {/* ── Ground floor: 3 arched windows ── */}
      {[185, 385, 585].map((wx, i)=>(
        <g key={i}>
          {/* Window niche (stone reveal) */}
          <rect x={wx-42} y={142} width={84} height={185} fill="#9A8462" filter="url(#fStone)"/>
          {/* Arch shape: rect bottom + semicircle top */}
          <rect x={wx-36} y={196} width={72} height={126} fill="url(#gSky)"/>
          {/* Arch — clip to semicircle */}
          <ellipse cx={wx} cy={198} rx={36} ry={36} fill="url(#gSky)"/>
          {/* Landscape in window */}
          <ellipse cx={wx} cy={265} rx={55} ry={35} fill="#6AAC4A" filter="url(#fHaze)" opacity="0.7"/>
          <rect x={wx-36} y={278} width={72} height={44} fill="#7AB848"/>
          {/* Interior warm glow */}
          <radialGradient id={`gWin${i}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFF5C0" stopOpacity="0.65"/>
            <stop offset="100%" stopColor="rgba(0,0,0,0)"/>
          </radialGradient>
          <rect x={wx-36} y={196} width={72} height={126} fill={`url(#gWin${i})`}/>
          <ellipse cx={wx} cy={198} rx={36} ry={36} fill={`url(#gWin${i})`}/>
          {/* Keystone */}
          <polygon points={`${wx-6},157 ${wx+6},157 ${wx+4},172 ${wx-4},172`} fill="#C8B090"/>
          {/* Arch voussoir highlight */}
          <path d={`M ${wx-36},198 A 36,36 0 0 1 ${wx+36},198`}
            fill="none" stroke="rgba(255,230,180,0.4)" strokeWidth="3"/>
          {/* Shutter left */}
          <rect x={wx-72} y={196} width={32} height={122} fill="#5A3010" filter="url(#fWood)" rx="2"/>
          {/* Shutter slats */}
          {[0,1,2,3,4,5,6].map(s=>(
            <line key={s} x1={wx-72} y1={196+16+s*16} x2={wx-40} y2={196+12+s*16}
              stroke="rgba(0,0,0,0.22)" strokeWidth="1.5"/>
          ))}
          {/* Shutter right */}
          <rect x={wx+40} y={196} width={32} height={122} fill="#5A3010" filter="url(#fWood)" rx="2"/>
          {[0,1,2,3,4,5,6].map(s=>(
            <line key={s} x1={wx+40} y1={196+16+s*16} x2={wx+72} y2={196+12+s*16}
              stroke="rgba(0,0,0,0.22)" strokeWidth="1.5"/>
          ))}
          {/* Sill */}
          <rect x={wx-44} y={320} width={88} height={10} fill="#C8B898"/>
        </g>
      ))}

      {/* ── Upper floor: 3 rectangular windows with arched top ── */}
      {[185, 385, 585].map((wx, i)=>(
        <g key={i}>
          {/* Niche */}
          <rect x={wx-30} y={82} width={60} height={105} fill="#9A8462" filter="url(#fStone)"/>
          {/* Glass */}
          <rect x={wx-24} y={90} width={48} height={80} fill="url(#gSky)" opacity="0.85"/>
          <ellipse cx={wx} cy={92} rx={24} ry={18} fill="url(#gSky)" opacity="0.85"/>
          {/* Interior glow */}
          <radialGradient id={`gWin2${i}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFF8D0" stopOpacity="0.5"/>
            <stop offset="100%" stopColor="rgba(0,0,0,0)"/>
          </radialGradient>
          <rect x={wx-24} y={90} width={48} height={80} fill={`url(#gWin2${i})`}/>
          <ellipse cx={wx} cy={92} rx={24} ry={18} fill={`url(#gWin2${i})`}/>
          {/* Keystone */}
          <polygon points={`${wx-4},82 ${wx+4},82 ${wx+3},92 ${wx-3},92`} fill="#C8B090"/>
          {/* Shutters */}
          <rect x={wx-54} y={90} width={26} height={80} fill="#5A3010" filter="url(#fWood)" rx="1"/>
          <rect x={wx+28} y={90} width={26} height={80} fill="#5A3010" filter="url(#fWood)" rx="1"/>
          {[0,1,2,3,4].map(s=>(
            <g key={s}>
              <line x1={wx-54} y1={100+s*14} x2={wx-28} y2={96+s*14} stroke="rgba(0,0,0,0.2)" strokeWidth="1.2"/>
              <line x1={wx+28} y1={100+s*14} x2={wx+54} y2={96+s*14} stroke="rgba(0,0,0,0.2)" strokeWidth="1.2"/>
            </g>
          ))}
        </g>
      ))}

      {/* ── Stone corner quoins ── */}
      {/* Left corner */}
      {[0,1,2,3,4,5,6,7,8].map(i=>(
        <g key={i}>
          <rect x={120} y={78+i*37} width={38} height={32} fill="#C0A880" filter="url(#fStone)"/>
          <rect x={120} y={110+i*37} width={38} height={5} fill="#8A7060"/>
        </g>
      ))}
      {/* Right corner */}
      {[0,1,2,3,4,5,6,7,8].map(i=>(
        <g key={i}>
          <rect x={720} y={78+i*37} width={38} height={32} fill="#C0A880" filter="url(#fStone)"/>
          <rect x={720} y={110+i*37} width={38} height={5} fill="#8A7060"/>
        </g>
      ))}

      {/* ── Cornice ── */}
      <rect x="110" y="52" width="658" height="26" fill="#B8A080" filter="url(#fStone)"/>
      <rect x="110" y="50" width="658" height="8" fill="#C8B090"/>
      {/* Cornice dentil */}
      {Array.from({length:22},(_, i)=>(
        <rect key={i} x={120+i*29} y={50} width={18} height={9} fill="#A89070"/>
      ))}

      {/* ── Roof ── */}
      <polygon points="95,54 805,54 820,22 80,22" fill="url(#gRoof)" filter="url(#fRoof)"/>
      {/* Roof ridge */}
      <line x1="80" y1="22" x2="820" y2="22" stroke="rgba(255,180,140,0.4)" strokeWidth="2"/>
      {/* Chimney */}
      <rect x="600" y="-8" width="42" height="36} " fill="#9A8070" filter="url(#fStone)"/>
      <rect x="596" y="22" width="50" height="8" fill="#C0A880"/>

      {/* ── Climbing vine (right side) ── */}
      <rect x="692" y="68" width="68" height="295" fill="url(#pVine)" opacity="0.88"/>
      {/* Vine stem */}
      <path d="M730,360 Q718,280 726,180 Q734,100 720,68"
        stroke="#2A6015" strokeWidth="3" fill="none" opacity="0.7"/>
      <path d="M748,360 Q755,270 744,175 Q738,108 752,68"
        stroke="#306818" strokeWidth="2" fill="none" opacity="0.6"/>

      {/* ── Lavender at base ── */}
      <rect x="120" y="355" width="640" height="42" fill="url(#pVine)" opacity="0.5"/>
      {/* Lavender spikes */}
      {Array.from({length:32},(_, i)=>{
        const lx = 128 + i*20;
        const lh = 18 + (i%3)*8;
        return (
          <g key={i}>
            <line x1={lx} y1={387} x2={lx} y2={387-lh} stroke="#5A6228" strokeWidth="1.5"/>
            <ellipse cx={lx} cy={387-lh-5} rx={4} ry={8}
              fill={i%3===0?"#8878B8":i%3===1?"#6A60A0":"#9888C8"} opacity="0.82"/>
          </g>
        );
      })}

      {/* ── Vignette ── */}
      <radialGradient id="gVig4" cx="50%" cy="50%" r="78%">
        <stop offset="55%" stopColor="rgba(0,0,0,0)"/>
        <stop offset="100%" stopColor="rgba(5,3,1,0.5)"/>
      </radialGradient>
      <rect width="900" height="540" fill="url(#gVig4)"/>
    </svg>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   SCENE 5 — UPPER FLOOR PLAN: Wing separation + skylight + character
══════════════════════════════════════════════════════════════════════════ */
function UpperScene() {
  const W=900, H=540;
  /* Floor plan rooms */
  const rooms = {
    masterBed:  {x:80,  y:60,  w:220, h:190, fill:"#C8A8E8", label:"חדר הורים",  sublabel:"38 מ״ר"},
    masterBath: {x:80,  y:250, w:130, h:110, fill:"#B898D8", label:"אמבטיה",       sublabel:""},
    masterWIC:  {x:210, y:250, w:90,  h:110, fill:"#C0A0E0", label:"ארון",          sublabel:""},
    masterBal:  {x:80,  y:170, w:220, h:82,  fill:"#A888C8", label:"מרפסת הורים", sublabel:""},
    corridor:   {x:300, y:120, w:300, h:110, fill:"#F5E878", label:"מסדרון + סקיילייט", sublabel:""},
    skylight:   {x:390, y:135, w:120, h:80,  fill:"rgba(135,210,250,0.6)", label:"", sublabel:""},
    kid1:       {x:600, y:60,  w:220, h:170, fill:"#90C890", label:"חדר ילד א׳",  sublabel:"22 מ״ר"},
    kid2:       {x:600, y:230, w:220, h:130, fill:"#80B8E0", label:"חדר ילד ב׳",  sublabel:"20 מ״ר"},
    bath2:      {x:480, y:120, w:120, h:110, fill:"#98D0B0", label:"שירותים",       sublabel:""},
    stair:      {x:300, y:230, w:180, h:130, fill:"#E8D0A8", label:"גרם מדרגות",   sublabel:""},
  };
  return (
    <svg viewBox={`0 0 ${W} ${H}`} xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%",display:"block"}}>
      <defs>
        <pattern id="grid" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(100,100,140,0.12)" strokeWidth="0.5"/>
        </pattern>
      </defs>
      {/* Background */}
      <rect width={W} height={H} fill="#1E1E2E"/>
      <rect width={W} height={H} fill="url(#grid)"/>

      {/* ── Scale bar + compass ── */}
      <g transform="translate(720,460)">
        <line x1="0" y1="0" x2="120" y2="0" stroke="white" strokeWidth="2"/>
        <line x1="0" y1="-5" x2="0" y2="5" stroke="white" strokeWidth="2"/>
        <line x1="60" y1="-3" x2="60" y2="3" stroke="white" strokeWidth="1.5"/>
        <line x1="120" y1="-5" x2="120" y2="5" stroke="white" strokeWidth="2"/>
        <text x="0"   y="16" fill="white" fontSize="10" textAnchor="middle">0</text>
        <text x="60"  y="16" fill="white" fontSize="10" textAnchor="middle">3</text>
        <text x="120" y="16" fill="white" fontSize="10" textAnchor="middle">6מ׳</text>
      </g>
      {/* North arrow */}
      <g transform="translate(55,460)">
        <polygon points="0,-22 7,10 0,4 -7,10" fill="white" opacity="0.9"/>
        <polygon points="0,4 7,10 0,-22" fill="rgba(255,255,255,0.3)"/>
        <text x="0" y="24" fill="white" fontSize="11" textAnchor="middle" fontWeight="bold">N</text>
      </g>

      {/* ── Wing labels ── */}
      <text x="190" y="30" fill="#C0A0E8" fontSize="11" textAnchor="middle" fontWeight="700" letterSpacing="2">
        אגף הורים
      </text>
      <text x="710" y="30" fill="#90C890" fontSize="11" textAnchor="middle" fontWeight="700" letterSpacing="2">
        אגף ילדים
      </text>
      <line x1="80" y1="38" x2="300" y2="38" stroke="#C0A0E8" strokeWidth="1.5" opacity="0.6"/>
      <line x1="600" y1="38" x2="820" y2="38" stroke="#90C890" strokeWidth="1.5" opacity="0.6"/>

      {/* ── Outer walls ── */}
      <rect x="72" y="52" width="756" height="338" fill="none" stroke="#C8C0A8" strokeWidth="8" rx="3"/>
      <rect x="76" y="56" width="748" height="330" fill="none" stroke="rgba(200,192,168,0.2)" strokeWidth="2" rx="2"/>

      {/* ── Room fills ── */}
      {Object.entries(rooms).map(([key, r])=>(
        <rect key={key} x={r.x} y={r.y} width={r.w} height={r.h} fill={r.fill} rx="1" opacity="0.82"/>
      ))}

      {/* ── Skylight special rendering ── */}
      <rect x={390} y={135} width={120} height={80} fill="url(#gSky)" opacity="0.7" rx="2"/>
      <rect x={390} y={135} width={120} height={80} fill="rgba(160,220,255,0.35)" rx="2"/>
      {/* Skylight frame */}
      {[0,1,2].map(i=>(
        <line key={i} x1={390+i*40} y1={135} x2={390+i*40} y2={215}
          stroke="rgba(255,255,255,0.4)" strokeWidth="1.5"/>
      ))}
      <line x1={390} y1={175} x2={510} y2={175} stroke="rgba(255,255,255,0.4)" strokeWidth="1.5"/>
      <text x="450" y="180" fill="rgba(255,255,255,0.9)" fontSize="9" textAnchor="middle" fontWeight="700">
        סקיילייט
      </text>

      {/* ── Interior walls ── */}
      {/* Dividing wall between wings (corridor) */}
      <line x1="300" y1="56" x2="300" y2="390" stroke="#C8C0A8" strokeWidth="6"/>
      <line x1="600" y1="56" x2="600" y2="390" stroke="#C8C0A8" strokeWidth="6"/>
      {/* Horizontal dividers */}
      <line x1="76"  y1="250" x2="300" y2="250" stroke="#C8C0A8" strokeWidth="5"/>
      <line x1="300" y1="230" x2="480" y2="230" stroke="#C8C0A8" strokeWidth="5"/>
      <line x1="480" y1="120" x2="600" y2="120" stroke="#C8C0A8" strokeWidth="5"/>
      <line x1="600" y1="230" x2="828" y2="230" stroke="#C8C0A8" strokeWidth="5"/>
      <line x1="76"  y1="360" x2="300" y2="360" stroke="#C8C0A8" strokeWidth="5"/>
      <line x1="480" y1="120" x2="480" y2="230" stroke="#C8C0A8" strokeWidth="5"/>
      <line x1="210" y1="250" x2="210" y2="360" stroke="#C8C0A8" strokeWidth="4"/>

      {/* ── Doors ── */}
      {[
        {x:160,y:250,w:50,open:"down"},
        {x:300,y:148,w:52,open:"right"},
        {x:548,y:120,w:52,open:"up"},
        {x:600,y:148,w:52,open:"right"},
        {x:660,y:230,w:50,open:"down"},
      ].map((d,i)=>(
        <g key={i}>
          <line x1={d.x} y1={d.y} x2={d.x+d.w} y2={d.y}
            stroke="#A8A090" strokeWidth="3"/>
          <path d={d.open==="down"
            ? `M${d.x},${d.y} A${d.w},${d.w} 0 0,1 ${d.x+d.w},${d.y+d.w}`
            : d.open==="right"
            ? `M${d.x+d.w},${d.y} A${d.w},${d.w} 0 0,0 ${d.x+d.w+d.w},${d.y}`
            : `M${d.x},${d.y} A${d.w},${d.w} 0 0,0 ${d.x+d.w},${d.y-d.w}`}
            fill="none" stroke="#A8A090" strokeWidth="1.2" strokeDasharray="4,2"/>
        </g>
      ))}

      {/* ── Room labels ── */}
      {Object.entries(rooms).filter(([k,r])=>r.label).map(([key, r])=>(
        <g key={key}>
          <text x={r.x+r.w/2} y={r.y+r.h/2-4} fill="rgba(10,5,2,0.85)" fontSize={key==="corridor"?9.5:10}
            textAnchor="middle" fontWeight="700" fontFamily="Heebo,sans-serif">{r.label}</text>
          {r.sublabel && <text x={r.x+r.w/2} y={r.y+r.h/2+11} fill="rgba(10,5,2,0.6)" fontSize="9"
            textAnchor="middle" fontFamily="Heebo,sans-serif">{r.sublabel}</text>}
        </g>
      ))}

      {/* ── Feature callouts ── */}
      {[
        {x:192,y:184,label:"מרפסת הורים",sub:"נוף שדות"},
        {x:192,y:292,label:"אמבטיה + ארון",sub:"en-suite"},
        {x:710,y:145,label:"מושב חלון",sub:""},
        {x:710,y:295,label:"מרפסת קטנה",sub:""},
      ].map((c,i)=>(
        <g key={i}>
          <circle cx={c.x} cy={c.y} r="14" fill="rgba(255,220,120,0.22)" stroke="rgba(255,200,80,0.6)" strokeWidth="1.5"/>
          <text x={c.x} y={c.y+4} fill="rgba(255,230,150,0.9)" fontSize="8"
            textAnchor="middle" fontWeight="700">{c.label}</text>
        </g>
      ))}

      {/* ── Staircase hatching ── */}
      {Array.from({length:8},(_, i)=>(
        <line key={i} x1={308} y1={238+i*14} x2={472} y2={238+i*14}
          stroke="rgba(220,190,140,0.5)" strokeWidth="1"/>
      ))}
      <text x="390" y="300" fill="rgba(220,190,140,0.8)" fontSize="9"
        textAnchor="middle">גרם מדרגות</text>

      {/* ── Title ── */}
      <text x="450" y="420" fill="rgba(255,255,255,0.7)" fontSize="11"
        textAnchor="middle" letterSpacing="3" fontFamily="Heebo,sans-serif">
        תוכנית קומה א׳ — אחרי שינויים
      </text>
    </svg>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   SLIDES DATA
══════════════════════════════════════════════════════════════════════════ */
const SLIDES = [
  { id:"salon",  num:"01", tag:"קיר הסלון",     title:"פתוח לשדה",
    desc:"קיר-זכוכית שלם על כל רוחב הסלון. כשהפאנלים נפתחים — הסלון והטרסה הופכים לחלל אחד.",
    points:["6 פאנלי הזזה — כל הרוחב","המשכיות רצפה ללא מפתן","קורות עץ חשופות בתקרה","נוף שדות ישיר"],
    Scene: SalonScene },
  { id:"entry",  num:"02", tag:"כניסה + מדרגות", title:"אור לגובה שתי קומות",
    desc:"לצד גרם המדרגות — חלון רצף מהרצפה עד גג הגמלון. האור שוטף פנימה בכל שעות היום.",
    points:["חלון ~6מ׳ גובה לצד המדרגות","חלל כניסה פתוח לגובה שתי קומות","קיר אבן חם — חומרים טוסקניים","אור טבעי על כל גרם המדרגות"],
    Scene: EntryScene },
  { id:"west",   num:"03", tag:"חזית השדות",    title:"זכוכית מול הנוף",
    desc:"מבחוץ — הבית נפתח לשדות בשורה שלמה של זכוכית. קורות עץ בולטות בקו הגג.",
    points:["זכוכית על כל רוחב קומת הקרקע","קורות עץ חשופות בקו הגג","אבן מקומית בפינות","טרסה רחבה — המשך הסלון"],
    Scene: WestScene },
  { id:"tuscan", num:"04", tag:"שפה אדריכלית",  title:"טוסקנה על כל החזיתות",
    desc:"האבן, הקשתות, קורות העץ — מהכניסה מתפשטים לכל ארבע החזיתות. הבית מספר סיפור אחד.",
    points:["אבן מקומית + עיטורי פינות","חלונות קשתות בקומת קרקע","תריסי עץ על כל החלונות","גפנים וצמחייה שמחברת לאדמה"],
    Scene: TuscanScene },
  { id:"upper",  num:"05", tag:"קומה עליונה",   title:"אגפים, אור ואופי",
    desc:"הורים בקצה אחד, ילדים בקצה השני. למסדרון — סקיילייט. לכל חדר משהו ייחודי.",
    points:["סקיילייט מעל המסדרון","אגף הורים: en-suite + מרפסת לשדות","חדרי ילדים שווים: מושב חלון / מרפסת / פינת קריאה","תקרה משופעת עם קורות עץ"],
    Scene: UpperScene },
];

/* ══════════════════════════════════════════════════════════════════════════
   APP SHELL
══════════════════════════════════════════════════════════════════════════ */
export default function VillaAfter() {
  const [active, setActive] = useState(0);
  const s = SLIDES[active];
  const Scene = s.Scene;

  return (
    <div style={{
      display:"flex", flexDirection:"column", height:"100dvh",
      background:"#0A0604", color:"white",
      fontFamily:"'Heebo','Inter',sans-serif", direction:"rtl", overflow:"hidden"
    }}>
      {/* Header */}
      <div style={{
        padding:"10px 18px", display:"flex", justifyContent:"space-between", alignItems:"center",
        borderBottom:"1px solid rgba(255,255,255,0.06)", flexShrink:0,
        background:"linear-gradient(to bottom,#120A04,#0A0604)"
      }}>
        <span style={{fontSize:11,letterSpacing:4,color:"rgba(255,255,255,0.3)",textTransform:"uppercase"}}>
          הדמיית אחרי
        </span>
        <span style={{
          fontSize:12,fontWeight:800,letterSpacing:3,
          background:"linear-gradient(90deg,#D4A85A,#F0CC80)",
          WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"
        }}>
          טוסקנה ישראל
        </span>
        <span style={{fontSize:11,letterSpacing:3,color:"rgba(255,255,255,0.25)"}}>וילה</span>
      </div>

      {/* Tab nav */}
      <nav style={{
        display:"flex", gap:4, padding:"8px 12px",
        background:"#0D0804", borderBottom:"1px solid rgba(255,255,255,0.05)",
        overflowX:"auto", flexShrink:0
      }}>
        {SLIDES.map((sl,i)=>(
          <button key={sl.id} onClick={()=>setActive(i)} style={{
            display:"flex", flexDirection:"column", alignItems:"center",
            padding:"6px 14px", borderRadius:6, border:"none", cursor:"pointer",
            background: active===i
              ? "linear-gradient(135deg,rgba(180,130,60,0.28),rgba(220,170,80,0.18))"
              : "transparent",
            borderBottom: active===i ? "2px solid #C8A04A" : "2px solid transparent",
            transition:"all .2s"
          }}>
            <span style={{fontSize:9,color:active===i?"#C8A04A":"rgba(255,255,255,0.3)",
              letterSpacing:2,fontWeight:700}}>{sl.num}</span>
            <span style={{fontSize:10,color:active===i?"#F0D080":"rgba(255,255,255,0.45)",
              fontWeight:600,whiteSpace:"nowrap",marginTop:1}}>{sl.tag}</span>
          </button>
        ))}
      </nav>

      {/* Scene */}
      <div style={{flex:1, position:"relative", overflow:"hidden", minHeight:0}}>
        <Scene/>
      </div>

      {/* Description strip */}
      <div style={{
        padding:"10px 20px 6px", background:"#0D0804",
        borderTop:"1px solid rgba(255,255,255,0.06)", flexShrink:0
      }}>
        <div style={{display:"flex",alignItems:"baseline",gap:10,marginBottom:4}}>
          <span style={{
            fontSize:14,fontWeight:800,letterSpacing:1,
            background:"linear-gradient(90deg,#E0B860,#F8D888)",
            WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"
          }}>{s.title}</span>
          <span style={{fontSize:10,color:"rgba(255,255,255,0.28)",letterSpacing:2}}>{s.tag}</span>
        </div>
        <p style={{fontSize:11,color:"rgba(255,255,255,0.55)",margin:"0 0 6px",lineHeight:1.5}}>{s.desc}</p>
        <div style={{display:"flex",flexWrap:"wrap",gap:"4px 10px"}}>
          {s.points.map((p,i)=>(
            <span key={i} style={{
              fontSize:10,color:"rgba(200,165,80,0.85)",
              display:"flex",alignItems:"center",gap:4
            }}>
              <span style={{color:"#C8A04A",fontSize:8}}>◆</span>{p}
            </span>
          ))}
        </div>
      </div>

      {/* Prev / Next */}
      <div style={{
        display:"flex",justifyContent:"space-between",alignItems:"center",
        padding:"6px 18px 10px", background:"#0A0604", flexShrink:0
      }}>
        <button onClick={()=>setActive((active-1+SLIDES.length)%SLIDES.length)}
          style={{background:"rgba(255,255,255,0.06)",border:"none",color:"rgba(255,255,255,0.5)",
            padding:"5px 16px",borderRadius:5,cursor:"pointer",fontSize:13}}>→</button>
        <div style={{display:"flex",gap:6}}>
          {SLIDES.map((_,i)=>(
            <div key={i} onClick={()=>setActive(i)} style={{
              width:active===i?20:6, height:6, borderRadius:3,
              background:active===i?"#C8A04A":"rgba(255,255,255,0.18)",
              cursor:"pointer",transition:"all .25s"
            }}/>
          ))}
        </div>
        <button onClick={()=>setActive((active+1)%SLIDES.length)}
          style={{background:"rgba(255,255,255,0.06)",border:"none",color:"rgba(255,255,255,0.5)",
            padding:"5px 16px",borderRadius:5,cursor:"pointer",fontSize:13}}>←</button>
      </div>
    </div>
  );
}

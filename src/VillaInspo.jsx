/* ═══════════════════════════════════════════════════════════════════
   Villa Inspiration Board
   SVG panels styled after real architectural photography:
   bokeh blur, golden-hour gradients, film grain, lens flare, vignette
═══════════════════════════════════════════════════════════════════ */

/* ── Photo-realistic filter kit ─────────────────────────────────── */
function PhotoDefs() {
  return (
    <defs>
      {/* Film grain */}
      <filter id="grain" x="0%" y="0%" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="2" seed="9" result="nz"/>
        <feColorMatrix type="saturate" values="0" in="nz" result="g"/>
        <feBlend in="SourceGraphic" in2="g" mode="soft-light" result="out"/>
        <feComponentTransfer in="out">
          <feFuncA type="linear" slope="1"/>
        </feComponentTransfer>
      </filter>
      {/* Stone photo texture */}
      <filter id="stonePhoto" x="-2%" y="-2%" width="104%" height="104%" colorInterpolationFilters="sRGB">
        <feTurbulence type="fractalNoise" baseFrequency="0.036 0.062" numOctaves="6" seed="11" result="nz"/>
        <feDiffuseLighting in="nz" lightingColor="#F0E0C0" surfaceScale="5" result="lit">
          <feDistantLight azimuth="310" elevation="48"/>
        </feDiffuseLighting>
        <feBlend in="SourceGraphic" in2="lit" mode="multiply" result="out"/>
        <feComponentTransfer in="out">
          <feFuncR type="gamma" amplitude="1.08" exponent="0.92"/>
          <feFuncG type="gamma" amplitude="1.02" exponent="0.95"/>
          <feFuncB type="gamma" amplitude="0.95" exponent="1.0"/>
        </feComponentTransfer>
      </filter>
      {/* Wood photo texture */}
      <filter id="woodPhoto" x="-2%" y="-2%" width="104%" height="104%" colorInterpolationFilters="sRGB">
        <feTurbulence type="turbulence" baseFrequency="0.005 0.55" numOctaves="4" seed="3" result="nz"/>
        <feDiffuseLighting in="nz" lightingColor="#D8A060" surfaceScale="3" result="lit">
          <feDistantLight azimuth="300" elevation="62"/>
        </feDiffuseLighting>
        <feBlend in="SourceGraphic" in2="lit" mode="multiply"/>
      </filter>
      {/* Background bokeh blur */}
      <filter id="bokeh" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="3.5"/>
      </filter>
      <filter id="bokehHeavy" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="7"/>
      </filter>
      {/* Haze / atmospheric perspective */}
      <filter id="haze">
        <feColorMatrix type="matrix"
          values="0.7 0 0 0 0.22  0 0.74 0 0 0.24  0 0 0.82 0 0.3  0 0 0 0.72 0"/>
        <feGaussianBlur stdDeviation="1.5"/>
      </filter>
      {/* Golden hour color grade */}
      <filter id="goldenHour">
        <feColorMatrix type="matrix"
          values="1.18 0.06 0 0 0.04  0.04 1.04 0 0 0.02  0 0 0.78 0 0  0 0 0 1 0"/>
      </filter>
      {/* Evening blue grade */}
      <filter id="evening">
        <feColorMatrix type="matrix"
          values="0.82 0.02 0.05 0 0.01  0.02 0.88 0.04 0 0.02  0.05 0.05 1.12 0 0.04  0 0 0 1 0"/>
      </filter>
      {/* Soft glow */}
      <filter id="glow" x="-15%" y="-15%" width="130%" height="130%">
        <feGaussianBlur stdDeviation="8" in="SourceGraphic" result="blur"/>
        <feBlend in="SourceGraphic" in2="blur" mode="screen"/>
      </filter>

      {/* ── Gradients ── */}
      <linearGradient id="skyGold" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%"   stopColor="#2A5A8A"/>
        <stop offset="28%"  stopColor="#4A8BB8"/>
        <stop offset="55%"  stopColor="#8ABCD8"/>
        <stop offset="75%"  stopColor="#C8DDE8"/>
        <stop offset="88%"  stopColor="#E8D8B8"/>
        <stop offset="100%" stopColor="#F8C880"/>
      </linearGradient>
      <linearGradient id="skyEvening" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%"   stopColor="#0A1830"/>
        <stop offset="30%"  stopColor="#182848"/>
        <stop offset="60%"  stopColor="#3A4868"/>
        <stop offset="80%"  stopColor="#886848"/>
        <stop offset="100%" stopColor="#C87830"/>
      </linearGradient>
      <linearGradient id="skyDay" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%"   stopColor="#185898"/>
        <stop offset="40%"  stopColor="#3A8CC8"/>
        <stop offset="70%"  stopColor="#78B8D8"/>
        <stop offset="88%"  stopColor="#B8D8E8"/>
        <stop offset="100%" stopColor="#D8E8D8"/>
      </linearGradient>
      <radialGradient id="sunGold" cx="85%" cy="82%" r="40%">
        <stop offset="0%"   stopColor="#FFE060" stopOpacity="0.98"/>
        <stop offset="18%"  stopColor="#FFB020" stopOpacity="0.65"/>
        <stop offset="45%"  stopColor="#FF8010" stopOpacity="0.22"/>
        <stop offset="100%" stopColor="#4A8BB8" stopOpacity="0"/>
      </radialGradient>
      <radialGradient id="sunEvening" cx="82%" cy="90%" r="45%">
        <stop offset="0%"   stopColor="#FFA030" stopOpacity="1"/>
        <stop offset="20%"  stopColor="#FF6010" stopOpacity="0.6"/>
        <stop offset="55%"  stopColor="#882800" stopOpacity="0.25"/>
        <stop offset="100%" stopColor="transparent"/>
      </radialGradient>
      <radialGradient id="lensFlare" cx="85%" cy="22%" r="12%">
        <stop offset="0%"   stopColor="white" stopOpacity="0.85"/>
        <stop offset="30%"  stopColor="#FFF0A0" stopOpacity="0.35"/>
        <stop offset="100%" stopColor="transparent"/>
      </radialGradient>
      {/* Vignette */}
      <radialGradient id="vig" cx="50%" cy="50%" r="72%">
        <stop offset="50%" stopColor="rgba(0,0,0,0)"/>
        <stop offset="100%" stopColor="rgba(0,0,0,0.62)"/>
      </radialGradient>
      <radialGradient id="vigSoft" cx="50%" cy="50%" r="75%">
        <stop offset="55%" stopColor="rgba(0,0,0,0)"/>
        <stop offset="100%" stopColor="rgba(0,0,0,0.45)"/>
      </radialGradient>
      {/* Grass / field */}
      <linearGradient id="fieldGold" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%"   stopColor="#8AC040"/>
        <stop offset="45%"  stopColor="#68A828"/>
        <stop offset="100%" stopColor="#507820"/>
      </linearGradient>
      <linearGradient id="fieldWarm" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%"   stopColor="#C8B858"/>
        <stop offset="55%"  stopColor="#A89840"/>
        <stop offset="100%" stopColor="#786820"/>
      </linearGradient>
      {/* Stone base */}
      <linearGradient id="stoneWarm" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%"   stopColor="#C8B088"/>
        <stop offset="100%" stopColor="#987850"/>
      </linearGradient>
      {/* Glass interior */}
      <radialGradient id="glassInt" cx="50%" cy="35%" r="60%">
        <stop offset="0%"   stopColor="#FFF8E0" stopOpacity="0.95"/>
        <stop offset="50%"  stopColor="#EAC060" stopOpacity="0.8"/>
        <stop offset="100%" stopColor="#784020" stopOpacity="0.9"/>
      </radialGradient>
      <linearGradient id="glassRefl" x1="0.05" y1="0" x2="0.95" y2="1">
        <stop offset="0%"   stopColor="white" stopOpacity="0.55"/>
        <stop offset="30%"  stopColor="white" stopOpacity="0.08"/>
        <stop offset="70%"  stopColor="#A0C0E0" stopOpacity="0.12"/>
        <stop offset="100%" stopColor="white" stopOpacity="0.18"/>
      </linearGradient>
      {/* Roof terracotta */}
      <linearGradient id="roofTile" x1="0" y1="0" x2="0.15" y2="1">
        <stop offset="0%"   stopColor="#C84830"/>
        <stop offset="40%"  stopColor="#A03820"/>
        <stop offset="100%" stopColor="#682010"/>
      </linearGradient>
      <filter id="roofTex" colorInterpolationFilters="sRGB">
        <feTurbulence type="fractalNoise" baseFrequency="0.08 0.22" numOctaves="3" seed="5" result="nz"/>
        <feDiffuseLighting in="nz" lightingColor="#E07050" surfaceScale="4">
          <feDistantLight azimuth="305" elevation="50"/>
        </feDiffuseLighting>
      </filter>
      {/* Lavender */}
      <linearGradient id="lavender" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%"   stopColor="#9888C8"/>
        <stop offset="100%" stopColor="#6858A0"/>
      </linearGradient>
      {/* Interior floor */}
      <linearGradient id="intFloor" x1="0" y1="0" x2="0.3" y2="1">
        <stop offset="0%"   stopColor="#E0C090"/>
        <stop offset="50%"  stopColor="#C8A070"/>
        <stop offset="100%" stopColor="#A07848"/>
      </linearGradient>
      {/* Ceiling beams */}
      <linearGradient id="beamColor" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%"   stopColor="#7A4020"/>
        <stop offset="100%" stopColor="#401808"/>
      </linearGradient>
    </defs>
  );
}

/* ═══════════════════════════════════════════════════
   PHOTO 1 — Exterior: stone facade, arches, golden hour
═══════════════════════════════════════════════════ */
function Photo1() {
  return (
    <svg viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%",display:"block"}}>
      <PhotoDefs/>
      {/* Sky — golden hour */}
      <rect width="600" height="400" fill="url(#skyGold)"/>
      <rect width="600" height="400" fill="url(#sunGold)"/>
      {/* Distant hills — bokeh */}
      <ellipse cx="120" cy="218" rx="180" ry="65" fill="#6AAA48" filter="url(#haze)"/>
      <ellipse cx="520" cy="222" rx="160" ry="60" fill="#60A040" filter="url(#haze)"/>
      {/* Horizon line */}
      <rect y="218" width="600" height="182" fill="url(#fieldGold)"/>
      <rect y="218" width="600" height="30" fill="rgba(220,210,170,0.45)"/>
      {/* Shadow on ground */}
      <ellipse cx="310" cy="338" rx="265" ry="30" fill="rgba(40,22,5,0.42)" filter="url(#bokeh)"/>
      {/* Foundation */}
      <rect x="80" y="328" width="440" height="24" fill="#A89060" filter="url(#stonePhoto)"/>
      {/* Main wall */}
      <rect x="88" y="88" width="424" height="242} " fill="#B89A70" filter="url(#stonePhoto)"/>
      {/* Wall lighting */}
      <linearGradient id="wl1" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%"   stopColor="rgba(20,10,2,0.25)"/>
        <stop offset="60%"  stopColor="rgba(0,0,0,0)"/>
        <stop offset="100%" stopColor="rgba(255,200,100,0.25)"/>
      </linearGradient>
      <rect x="88" y="88" width="424" height="242" fill="url(#wl1)"/>
      <linearGradient id="wl1v" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%"   stopColor="rgba(255,230,160,0.18)"/>
        <stop offset="50%"  stopColor="rgba(0,0,0,0)"/>
        <stop offset="100%" stopColor="rgba(0,0,0,0.32)"/>
      </linearGradient>
      <rect x="88" y="88" width="424" height="242" fill="url(#wl1v)"/>
      {/* Cornice */}
      <rect x="78" y="78" width="444" height="18" fill="#C0A878" filter="url(#stonePhoto)"/>
      <rect x="78" y="76" width="444" height="6" fill="#D0B888"/>
      {/* Dentils */}
      {Array.from({length:18},(_, i)=>(
        <rect key={i} x={88+i*24} y={76} width={15} height={8} fill="#A89060"/>
      ))}
      {/* Roof */}
      <polygon points="62,80 538,80 558,44 42,44" fill="url(#roofTile)"/>
      <filter id="rtf2" colorInterpolationFilters="sRGB">
        <feTurbulence type="fractalNoise" baseFrequency="0.07 0.25" numOctaves="3" seed="6" result="nz"/>
        <feDiffuseLighting in="nz" lightingColor="#D06040" surfaceScale="3">
          <feDistantLight azimuth="310" elevation="52"/>
        </feDiffuseLighting>
      </filter>
      <polygon points="62,80 538,80 558,44 42,44" filter="url(#rtf2)" opacity="0.55"/>
      {/* Chimney */}
      <rect x="398" y="18" width="34" height="32" fill="#9A8060" filter="url(#stonePhoto)"/>
      <rect x="394" y="44" width="42" height="7" fill="#C0A878"/>
      {/* Corner quoins left */}
      {[0,1,2,3,4,5,6].map(i=>(
        <g key={i}>
          <rect x={88} y={96+i*32} width={30} height={26} fill="#C8AE88" filter="url(#stonePhoto)"/>
          <rect x={88} y={122+i*32} width={30} height={4} fill="#8A7050"/>
        </g>
      ))}
      {/* Corner quoins right */}
      {[0,1,2,3,4,5,6].map(i=>(
        <g key={i}>
          <rect x={482} y={96+i*32} width={30} height={26} fill="#C8AE88" filter="url(#stonePhoto)"/>
          <rect x={482} y={122+i*32} width={30} height={4} fill="#8A7050"/>
        </g>
      ))}
      {/* Ground floor — 3 arched windows */}
      {[155, 300, 445].map((wx,i)=>(
        <g key={i}>
          <rect x={wx-40} y={154} width={80} height={168} fill="#8A7250" filter="url(#stonePhoto)"/>
          <rect x={wx-33} y={204} width={66} height={112} fill="url(#skyGold)" opacity="0.9"/>
          <ellipse cx={wx} cy={205} rx={33} ry={33} fill="url(#skyGold)" opacity="0.9"/>
          {/* Interior glow */}
          <radialGradient id={`wg${i}`} cx="50%" cy="55%" r="55%">
            <stop offset="0%"  stopColor="#FFF5C0" stopOpacity="0.72"/>
            <stop offset="100%" stopColor="rgba(0,0,0,0)"/>
          </radialGradient>
          <rect x={wx-33} y={204} width={66} height={112} fill={`url(#wg${i})`}/>
          <ellipse cx={wx} cy={205} rx={33} ry={33} fill={`url(#wg${i})`}/>
          {/* Keystone */}
          <polygon points={`${wx-5},165 ${wx+5},165 ${wx+4},178 ${wx-4},178`} fill="#D0B888"/>
          {/* Sill */}
          <rect x={wx-42} y={314} width={84} height={9} fill="#C8B090"/>
          {/* Left shutter */}
          <rect x={wx-75} y={204} width={38} height={112} fill="#5A3010" filter="url(#woodPhoto)" rx="2"/>
          {[0,1,2,3,4,5,6].map(s=>(
            <line key={s} x1={wx-75} y1={218+s*15} x2={wx-37} y2={213+s*15}
              stroke="rgba(0,0,0,0.2)" strokeWidth="1.5"/>
          ))}
          {/* Right shutter */}
          <rect x={wx+37} y={204} width={38} height={112} fill="#5A3010" filter="url(#woodPhoto)" rx="2"/>
          {[0,1,2,3,4,5,6].map(s=>(
            <line key={s} x1={wx+37} y1={218+s*15} x2={wx+75} y2={213+s*15}
              stroke="rgba(0,0,0,0.2)" strokeWidth="1.5"/>
          ))}
        </g>
      ))}
      {/* Upper floor — 3 windows */}
      {[155, 300, 445].map((wx,i)=>(
        <g key={i}>
          <rect x={wx-26} y={96} width={52} height={62} fill="#8A7250" filter="url(#stonePhoto)"/>
          <rect x={wx-20} y={102} width={40} height={50} fill="url(#skyDay)" opacity="0.85"/>
          {/* Interior glow */}
          <radialGradient id={`ug${i}`} cx="50%" cy="50%" r="55%">
            <stop offset="0%"  stopColor="#FFF8D0" stopOpacity="0.55"/>
            <stop offset="100%" stopColor="rgba(0,0,0,0)"/>
          </radialGradient>
          <rect x={wx-20} y={102} width={40} height={50} fill={`url(#ug${i})`}/>
          {/* Shutters */}
          <rect x={wx-50} y={102} width={26} height={50} fill="#5A3010" filter="url(#woodPhoto)" rx="1"/>
          <rect x={wx+24} y={102} width={26} height={50} fill="#5A3010" filter="url(#woodPhoto)" rx="1"/>
          {[0,1,2,3].map(s=>(
            <g key={s}>
              <line x1={wx-50} y1={112+s*12} x2={wx-24} y2={108+s*12} stroke="rgba(0,0,0,0.18)" strokeWidth="1.2"/>
              <line x1={wx+24} y1={112+s*12} x2={wx+50} y2={108+s*12} stroke="rgba(0,0,0,0.18)" strokeWidth="1.2"/>
            </g>
          ))}
        </g>
      ))}
      {/* Vine on right side */}
      <rect x="486" y="88" width="52" height="242" fill="none"/>
      {[
        "M512,330 Q505,280 510,220 Q515,165 505,100",
        "M524,330 Q530,270 522,205 Q516,148 528,100",
      ].map((d,i)=>(
        <path key={i} d={d} stroke="#2A6015" strokeWidth={3-i} fill="none" opacity="0.65"/>
      ))}
      {/* Leaves */}
      {[[508,150,"-25"],[518,180,"15"],[504,215,"-18"],[525,250,"20"],[510,290,"-12"],[522,310,"8"]].map(([lx,ly,rot],i)=>(
        <ellipse key={i} cx={lx} cy={ly} rx={12} ry={8}
          fill={i%2===0?"#2A7218":"#389228"} transform={`rotate(${rot},${lx},${ly})`}
          opacity={0.8+i*0.02} filter="url(#stonePhoto)"/>
      ))}
      {/* Lavender at base */}
      {Array.from({length:26},(_, i)=>{
        const lx = 90 + i*18;
        const lh = 22 + (i%3)*9;
        return (
          <g key={i}>
            <line x1={lx} y1={330} x2={lx+(i%2-0.5)*3} y2={330-lh} stroke="#4A6020" strokeWidth="1.8"/>
            <ellipse cx={lx+(i%2-0.5)*2} cy={330-lh-6} rx={4} ry={9}
              fill={i%3===0?"#8878B8":i%3===1?"#7060A8":"#9888C8"} opacity="0.85"/>
          </g>
        );
      })}
      {/* Lens flare */}
      <circle cx="525" cy="52" r="22" fill="white" opacity="0.12" filter="url(#glow)"/>
      <circle cx="525" cy="52" r="8" fill="white" opacity="0.6"/>
      {/* Photo grain + vignette */}
      <rect width="600" height="400" fill="url(#vig)" filter="url(#grain)"/>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════
   PHOTO 2 — Salon interior: glass wall open to landscape
═══════════════════════════════════════════════════ */
function Photo2() {
  const vx=300, ft=95, fb=370;
  const fl=130, fr=470;
  return (
    <svg viewBox="0 0 600 430" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%",display:"block"}}>
      <PhotoDefs/>
      {/* Room base */}
      <rect width="600" height="430" fill="#C89860"/>
      {/* Glass wall view — landscape */}
      <clipPath id="gc2"><rect x={fl} y={ft} width={fr-fl} height={fb-ft}/></clipPath>
      <g clipPath="url(#gc2)">
        <rect x={fl} y={ft} width={fr-fl} height={fb-ft} fill="url(#skyGold)"/>
        <rect x={fl} y={ft} width={fr-fl} height={fb-ft} fill="url(#sunGold)"/>
        <ellipse cx="280" cy="280" rx="200" ry="62" fill="#72B848" filter="url(#haze)"/>
        <ellipse cx="400" cy="286" rx="160" ry="55" fill="#68AA40" filter="url(#haze)"/>
        <rect x={fl} y="300" width={fr-fl} height={fb-300} fill="url(#fieldGold)"/>
        <rect x={fl} y="278" width={fr-fl} height="28" fill="rgba(218,205,165,0.52)"/>
        {[185,220,388,416].map((tx,i)=>(
          <ellipse key={i} cx={tx} cy={272+i%2*18} rx={9+i%2*3} ry={48+i%2*15}
            fill={i%2===0?"#1A5018":"#225820"} filter="url(#haze)" opacity="0.85"/>
        ))}
      </g>
      {/* Floor — stone tiles perspective */}
      <polygon points={`0,430 600,430 ${fr},${fb} ${fl},${fb}`} fill="#D4A868" filter="url(#stonePhoto)"/>
      {/* Tile grid */}
      {[0.1,0.3,0.5,0.68,0.82,0.92].map((t,i)=>{
        const yy = fb + (430-fb)*t;
        const xL = fl + (0-fl)*t;
        const xR = fr + (600-fr)*t;
        return <line key={i} x1={xL} y1={yy} x2={xR} y2={yy} stroke="rgba(110,70,30,0.32)" strokeWidth="1.2"/>;
      })}
      {[-2,-1,0,1,2,3].map((n,i)=>(
        <line key={i} x1={vx+n*100} y1={fb} x2={vx+(n*100)*4} y2={430}
          stroke="rgba(110,70,30,0.2)" strokeWidth="0.9"/>
      ))}
      {/* Floor highlight near glass */}
      <polygon points={`${fl+40},${fb} ${fr-40},${fb} ${fr-20},${fb+20} ${fl+20},${fb+20}`}
        fill="rgba(255,210,130,0.35)"/>
      {/* Ceiling */}
      <polygon points={`0,0 600,0 ${fr},${ft} ${fl},${ft}`} fill="#EAD8BE"/>
      <polygon points={`0,0 600,0 ${fr},${ft} ${fl},${ft}`}
        fill="rgba(255,235,180,0.12)"/>
      {/* Wood beams — 4 */}
      {[-1,0,1,2].map((n,i)=>{
        const bx = vx + n*148;
        const nL=bx-20, nR=bx+20;
        const fL=vx+(nL-vx)*0.13, fR=vx+(nR-vx)*0.13;
        return (
          <g key={i}>
            <polygon points={`${nL},0 ${nR},0 ${fR},${ft} ${fL},${ft}`}
              fill="#5A3010" filter="url(#woodPhoto)"/>
            <polygon points={`${nL},0 ${nR},0 ${fR},${ft} ${fL},${ft}`}
              fill="rgba(255,190,80,0.07)"/>
          </g>
        );
      })}
      {/* Left wall */}
      <polygon points={`0,0 ${fl},${ft} ${fl},${fb} 0,430`} fill="#E8D4B8"/>
      <polygon points={`0,0 ${fl},${ft} ${fl},${fb} 0,430`}
        fill="rgba(0,0,0,0.18)"/>
      {/* Right wall */}
      <polygon points={`600,0 ${fr},${ft} ${fr},${fb} 600,430`} fill="#DCC8A8"/>
      <polygon points={`600,0 ${fr},${ft} ${fr},${fb} 600,430`}
        fill="rgba(0,0,0,0.22)"/>
      {/* Glass wall frame */}
      <rect x={fl-7} y={ft-7} width={fr-fl+14} height={fb-ft+14} fill="#1E1006" rx="2"/>
      {/* 5 glass panels */}
      {[130,198,266,334,402,470].slice(0,-1).map((px,i)=>(
        <g key={i}>
          <rect x={px+2} y={ft+2} width={66} height={fb-ft-4} fill="url(#skyGold)" opacity="0.22"/>
          <rect x={px+2} y={ft+2} width={66} height={fb-ft-4} fill="url(#glassRefl)"/>
        </g>
      ))}
      {[130,198,266,334,402,470].map((px,i)=>(
        <rect key={i} x={px-3} y={ft-7} width={6} height={fb-ft+14} fill="#281408" rx="1"/>
      ))}
      <rect x={fl-7} y={ft-4} width={fr-fl+14} height={7} fill="#281408"/>
      <rect x={fl-7} y={fb-3} width={fr-fl+14} height={7} fill="#281408"/>
      <rect x={fl-7} y={ft+(fb-ft)/2-3} width={fr-fl+14} height={5} fill="#302010" opacity="0.8"/>
      {/* Sofa */}
      <polygon points="222,398 378,398 368,374 232,374" fill="#786050"/>
      <polygon points="218,418 382,418 378,398 222,398" fill="#887060"/>
      <polygon points="218,418 222,398 232,374 218,374" fill="#584838"/>
      <polygon points="382,418 378,398 368,374 384,374" fill="#584838"/>
      <line x1="300" y1="418" x2="300" y2="374" stroke="rgba(255,255,255,0.1)" strokeWidth="2"/>
      <ellipse cx="232" cy="422" rx="11" ry="4" fill="rgba(0,0,0,0.38)"/>
      <ellipse cx="368" cy="422" rx="11" ry="4" fill="rgba(0,0,0,0.38)"/>
      {/* Coffee table */}
      <polygon points="252,428 348,428 342,418 258,418" fill="#2A1008" opacity="0.92"/>
      {/* Room light glow */}
      <radialGradient id="roomGlow2" cx="50%" cy="40%" r="65%">
        <stop offset="0%"  stopColor="rgba(255,225,150,0.22)"/>
        <stop offset="100%" stopColor="rgba(0,0,0,0)"/>
      </radialGradient>
      <rect width="600" height="430" fill="url(#roomGlow2)"/>
      {/* Film grain + vignette */}
      <rect width="600" height="430" fill="url(#vigSoft)" filter="url(#grain)"/>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════
   PHOTO 3 — Entry hall: double-height window, staircase
═══════════════════════════════════════════════════ */
function Photo3() {
  return (
    <svg viewBox="0 0 600 430" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%",display:"block"}}>
      <PhotoDefs/>
      <rect width="600" height="430" fill="#EAD8C0"/>
      {/* ── Tall window left (2-storey) ── */}
      <rect x="35" y="18" width="235" height="398" fill="#9A8260" filter="url(#stonePhoto)"/>
      <rect x="52" y="30" width="202" height="376" fill="url(#skyGold)"/>
      <rect x="52" y="30" width="202" height="376" fill="url(#sunGold)"/>
      {/* Landscape in window */}
      <ellipse cx="153" cy="286" rx="160" ry="60" fill="#72B048" filter="url(#haze)"/>
      <rect x="52" y="325" width="202" height="81" fill="url(#fieldGold)"/>
      <rect x="52" y="268" width="202" height="28" fill="rgba(218,205,165,0.5)"/>
      {[90,215].map((tx,i)=>(
        <ellipse key={i} cx={tx} cy={268+i*12} rx={9} ry={50+i*10}
          fill="#1A5018" filter="url(#haze)" opacity="0.82"/>
      ))}
      {/* Window light rays */}
      {[0,1,2,3].map(i=>(
        <polygon key={i}
          points={`${62+i*50},30 ${92+i*50},30 600,${320+i*22} 600,${296+i*22}`}
          fill={`rgba(255,235,185,${0.038-i*0.007})`}/>
      ))}
      {/* Window frame */}
      <rect x="52"  y="30"  width="6"   height="376" fill="#2A1A08"/>
      <rect x="248" y="30"  width="6"   height="376" fill="#2A1A08"/>
      <rect x="52"  y="30"  width="202" height="7"   fill="#2A1A08"/>
      <rect x="52"  y="399" width="202" height="7"   fill="#2A1A08"/>
      <rect x="52"  y="212" width="202" height="5"   fill="#382410" opacity="0.8"/>
      <rect x="152" y="30"  width="5"   height="376" fill="#382410" opacity="0.8"/>
      {/* Stone sill */}
      <polygon points="35,403 271,403 280,416 26,416" fill="#C0A880" filter="url(#stonePhoto)"/>
      {/* ── Right: hall interior ── */}
      <rect x="270" y="0" width="330" height="430" fill="#EAD8C4"/>
      {/* Stone pilaster right edge */}
      <rect x="560" y="0" width="40" height="430" fill="#B09070" filter="url(#stonePhoto)"/>
      {/* Stone pilaster at window edge */}
      <rect x="270" y="0" width="36" height="430" fill="#B09070" filter="url(#stonePhoto)"/>
      {/* Upper void / gallery */}
      <rect x="270" y="195" width="330" height="8" fill="#C8B090" opacity="0.55"/>
      <rect x="460" y="185" width="170" height="8" fill="#D8C0A0"/>
      {Array.from({length:7},(_, i)=>(
        <rect key={i} x={465+i*24} y={193} width={4} height={32} fill="#C0A080" opacity="0.8"/>
      ))}
      {/* Baseboard */}
      <rect x="306" y="410" width="294" height="20" fill="#C0A870" filter="url(#stonePhoto)"/>
      {/* Staircase */}
      {Array.from({length:12},(_, i)=>{
        const sx = 308 + i*22;
        const sy = 430 - i*20;
        return (
          <g key={i}>
            <polygon points={`${sx},${sy} ${sx+22},${sy} ${sx+22},${sy-7} ${sx},${sy-7}`}
              fill="#C89860" filter="url(#stonePhoto)"/>
            <polygon points={`${sx},${sy-7} ${sx+22},${sy-7} ${sx+22},${sy-20} ${sx},${sy-20}`}
              fill="#E0CCA0"/>
            <line x1={sx} y1={sy-7} x2={sx+22} y2={sy-7}
              stroke="rgba(80,48,16,0.42)" strokeWidth="1.5"/>
          </g>
        );
      })}
      {/* Handrail */}
      <path d="M316,428 Q420,368 576,245"
        stroke="#4A2808" strokeWidth="7" fill="none" strokeLinecap="round" filter="url(#woodPhoto)"/>
      {/* Balusters */}
      {Array.from({length:11},(_, i)=>(
        <line key={i} x1={324+i*24} y1={426-i*18} x2={322+i*24} y2={376-i*20}
          stroke="#6A4020" strokeWidth="2.8" opacity="0.88"/>
      ))}
      {/* Light glow from window */}
      <radialGradient id="winLight3" cx="22%" cy="48%" r="55%">
        <stop offset="0%"  stopColor="rgba(255,240,195,0.88)"/>
        <stop offset="35%" stopColor="rgba(255,220,150,0.45)"/>
        <stop offset="100%" stopColor="rgba(0,0,0,0)"/>
      </radialGradient>
      <rect width="600" height="430" fill="url(#winLight3)"/>
      {/* Film grain + vignette */}
      <rect width="600" height="430" fill="url(#vig)" filter="url(#grain)"/>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════
   PHOTO 4 — Evening exterior: warm interior glow through glass
═══════════════════════════════════════════════════ */
function Photo4() {
  return (
    <svg viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%",display:"block"}}>
      <PhotoDefs/>
      {/* Evening sky */}
      <rect width="600" height="400" fill="url(#skyEvening)"/>
      <rect width="600" height="400" fill="url(#sunEvening)"/>
      {/* Stars */}
      {[[80,30],[150,55],[40,80],[520,25],[470,60],[350,20],[280,42],[560,68]].map(([sx,sy],i)=>(
        <circle key={i} cx={sx} cy={sy} r={i%3===0?1.5:0.9} fill="white" opacity={0.6+i*0.05}/>
      ))}
      {/* Silhouette trees */}
      <ellipse cx="55" cy="200" rx="38" ry="110" fill="#0A1808" opacity="0.95"/>
      <ellipse cx="535" cy="210" rx="32" ry="95" fill="#0A1808" opacity="0.9"/>
      <ellipse cx="572" cy="225" rx="28" ry="80" fill="#0A1808" opacity="0.85"/>
      <ellipse cx="22"  cy="220" rx="25" ry="85" fill="#0A1808" opacity="0.9"/>
      {/* Ground — dark evening */}
      <rect y="290" width="600" height="110" fill="#1A1208"/>
      <rect y="290" width="600" height="40" fill="rgba(180,120,40,0.22)"/>
      {/* Building shadow mass */}
      <rect x="88" y="68" width="424" height="230" fill="#0E0A05" filter="url(#stonePhoto)"/>
      {/* Stone wall — dark filter */}
      <rect x="88" y="68" width="424" height="230" fill="#5A4830" filter="url(#stonePhoto)" opacity="0.6"/>
      {/* Foundation */}
      <rect x="80" y="292" width="440" height="22" fill="#302015" filter="url(#stonePhoto)"/>
      {/* Roof silhouette */}
      <polygon points="65,70 535,70 555,38 45,38" fill="#080604"/>
      {/* Chimney */}
      <rect x="395" y="14" width="32" height="28" fill="#100C08"/>
      {/* Glass panels — warm interior glow */}
      <rect x="100" y="78" width="400" height="205" fill="#0E0A05"/>
      {/* 6 glass panels with warm glow */}
      {[100,167,234,301,368,433,500].slice(0,-1).map((px,i)=>(
        <g key={i}>
          <rect x={px+3} y={80} width={62} height={201} fill="url(#glassInt)" opacity="0.92"/>
          {/* Interior silhouette */}
          <polygon points={`${px+3},280 ${px+65},280 ${px+58},265 ${px+10},267`}
            fill="rgba(30,15,5,0.65)"/>
          {/* Glass reflection */}
          <rect x={px+3} y={80} width={24} height={201} fill="url(#glassRefl)" opacity="0.65"/>
          {/* Interior light glow on ground */}
          <polygon points={`${px+3},280 ${px+65},280 ${px+75},310 ${px-7},310`}
            fill={`rgba(255,175,50,${0.18-i*0.01})`} filter="url(#bokeh)"/>
        </g>
      ))}
      {/* Frame */}
      {[100,167,234,301,368,433,500].map((px,i)=>(
        <rect key={i} x={px-2} y={76} width={5} height={207} fill="#0A0605" rx="1"/>
      ))}
      <rect x="100" y="76" width="400" height="7" fill="#0A0605"/>
      <rect x="100" y="281" width="400" height="6" fill="#0A0605"/>
      <rect x="100" y="178" width="400" height="4" fill="#100A06" opacity="0.9"/>
      {/* Corner quoins (dark) */}
      {[0,1,2,3,4,5].map(i=>(
        <g key={i}>
          <rect x={88}  y={78+i*30} width={12} height={24} fill="#2A1E10" opacity="0.8"/>
          <rect x={500} y={78+i*30} width={12} height={24} fill="#2A1E10" opacity="0.8"/>
        </g>
      ))}
      {/* Cornice */}
      <rect x="78" y="62" width="444" height="14" fill="#160E06"/>
      {/* Pathway light on ground */}
      <radialGradient id="pathLight" cx="50%" cy="78%" r="35%">
        <stop offset="0%"  stopColor="rgba(255,180,60,0.45)"/>
        <stop offset="100%" stopColor="rgba(0,0,0,0)"/>
      </radialGradient>
      <rect width="600" height="400" fill="url(#pathLight)"/>
      {/* Lens flare */}
      <circle cx="158" cy="125" r="3" fill="white" opacity="0.9" filter="url(#glow)"/>
      <circle cx="328" cy="118" r="3" fill="white" opacity="0.85" filter="url(#glow)"/>
      {/* Film grain + vignette */}
      <rect width="600" height="400" fill="url(#vig)" filter="url(#grain)"/>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════
   PHOTO 5 — Stone arch close-up + vine + golden light
═══════════════════════════════════════════════════ */
function Photo5() {
  return (
    <svg viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%",display:"block"}}>
      <PhotoDefs/>
      {/* Wall fill */}
      <rect width="600" height="400" fill="#C0A878" filter="url(#stonePhoto)"/>
      {/* Lighting */}
      <linearGradient id="wl5" x1="1" y1="0" x2="0" y2="1">
        <stop offset="0%"   stopColor="rgba(255,210,130,0.28)"/>
        <stop offset="50%"  stopColor="rgba(0,0,0,0)"/>
        <stop offset="100%" stopColor="rgba(0,0,0,0.38)"/>
      </linearGradient>
      <rect width="600" height="400" fill="url(#wl5)"/>
      {/* ── Large central arch ── */}
      <rect x="168" y="80" width="264" height="295" fill="#9A8060" filter="url(#stonePhoto)"/>
      {/* Arch soffit */}
      <ellipse cx="300" cy="198" rx="114" ry="118" fill="#8A7050" filter="url(#stonePhoto)"/>
      {/* Glass / view inside arch */}
      <rect x="188" y="198" width="224" height="170} " fill="url(#skyGold)" opacity="0.9"/>
      <ellipse cx="300" cy="200" rx="112" ry="112" fill="url(#skyGold)" opacity="0.9"/>
      {/* Cut actual arch shape — clip the square above semicircle */}
      <rect x="186" y="86" width="228" height="118" fill="#9A8060" filter="url(#stonePhoto)"/>
      {/* Arch voussoir stones */}
      {Array.from({length:11},(_, i)=>{
        const angle = Math.PI + i * (Math.PI/10);
        const r=112, rIn=90;
        const x1 = 300 + r*Math.cos(angle), y1 = 200 + r*Math.sin(angle);
        const x2 = 300 + rIn*Math.cos(angle), y2 = 200 + rIn*Math.sin(angle);
        const a2 = angle + Math.PI/10;
        const x3 = 300 + rIn*Math.cos(a2), y3 = 200 + rIn*Math.sin(a2);
        const x4 = 300 + r*Math.cos(a2), y4 = 200 + r*Math.sin(a2);
        const hue = i%2===0?0.03:0;
        return (
          <g key={i}>
            <path d={`M${x1},${y1} A${r},${r} 0 0,1 ${x4},${y4} L${x3},${y3} A${rIn},${rIn} 0 0,0 ${x2},${y2} Z`}
              fill={i%2===0?"#C8AE82":"#B89A6E"} stroke="#8A7250" strokeWidth="1.5"/>
          </g>
        );
      })}
      {/* Keystone */}
      <path d="M288,88 L312,88 L305,112 L295,112 Z" fill="#D8BE90"/>
      <path d="M288,88 L312,88 L305,112 L295,112 Z" fill="rgba(255,230,160,0.3)"/>
      {/* Landscape in arch */}
      <clipPath id="archClip">
        <path d="M188,198 L188,368 L412,368 L412,198 A112,112 0 0,0 188,198 Z"/>
      </clipPath>
      <g clipPath="url(#archClip)">
        <rect x="188" y="198" width="224" height="170" fill="url(#skyGold)"/>
        <rect x="188" y="198" width="224" height="170" fill="url(#sunGold)"/>
        <ellipse cx="300" cy="295" rx="170" ry="55" fill="#72B040" filter="url(#haze)"/>
        <rect x="188" y="315" width="224" height="53" fill="url(#fieldGold)"/>
        <rect x="188" y="290" width="224" height="22" fill="rgba(215,200,155,0.48)"/>
        <ellipse cx="240" cy="285" rx="9" ry="48" fill="#1A5018" filter="url(#haze)"/>
        <ellipse cx="368" cy="289" rx="8" ry="42" fill="#1E5820" filter="url(#haze)"/>
      </g>
      {/* Shutter left */}
      <rect x="188" y="198" width="42" height="170" fill="#5A3010" filter="url(#woodPhoto)" rx="2"/>
      {[0,1,2,3,4,5,6,7,8].map(s=>(
        <line key={s} x1="188" y1={212+s*18} x2="230" y2={207+s*18}
          stroke="rgba(0,0,0,0.2)" strokeWidth="1.5"/>
      ))}
      {/* Shutter right */}
      <rect x="370" y="198" width="42" height="170" fill="#5A3010" filter="url(#woodPhoto)" rx="2"/>
      {[0,1,2,3,4,5,6,7,8].map(s=>(
        <line key={s} x1="370" y1={212+s*18} x2="412" y2={207+s*18}
          stroke="rgba(0,0,0,0.2)" strokeWidth="1.5"/>
      ))}
      {/* Sill */}
      <rect x="168" y="365" width="264" height="12} " fill="#C8B088"/>
      <rect x="164" y="374" width="272" height="7" fill="#B0988A"/>
      {/* Vine on right side */}
      {["M490,400 Q478,330 488,260 Q498,195 485,120 Q475,72 490,10",
        "M510,400 Q520,322 508,248 Q498,180 514,115 Q525,68 508,10"].map((d,i)=>(
        <path key={i} d={d} stroke="#2A6015" strokeWidth={4-i} fill="none" opacity={0.7-i*0.1}/>
      ))}
      {/* Leaves on vine */}
      {[[492,72,"-30"],[504,105,"20"],[488,148,"-18"],[512,182,"25"],[490,220,"-12"],
        [508,255,"18"],[485,295,"-22"],[514,330,"15"],[488,365,"-10"]].map(([lx,ly,rot],i)=>(
        <ellipse key={i} cx={lx} cy={ly} rx={14+i%2*4} ry={9+i%2*2}
          fill={i%3===0?"#2A7218":i%3===1?"#389228":"#4AAA32"}
          transform={`rotate(${rot},${lx},${ly})`} filter="url(#stonePhoto)" opacity={0.82+i*0.02}/>
      ))}
      {/* Sun light cast */}
      <radialGradient id="sCast5" cx="95%" cy="0%" r="60%">
        <stop offset="0%"  stopColor="rgba(255,220,130,0.28)"/>
        <stop offset="100%" stopColor="rgba(0,0,0,0)"/>
      </radialGradient>
      <rect width="600" height="400" fill="url(#sCast5)"/>
      {/* Film grain + vignette */}
      <rect width="600" height="400" fill="url(#vig)" filter="url(#grain)"/>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════
   PHOTO 6 — Wood beam ceiling interior detail
═══════════════════════════════════════════════════ */
function Photo6() {
  return (
    <svg viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%",display:"block"}}>
      <PhotoDefs/>
      {/* Room floor */}
      <rect width="600" height="400" fill="#C8A468" filter="url(#stonePhoto)"/>
      {/* Ceiling */}
      <rect width="600" height="220" fill="#EAD8BE"/>
      {/* Ceiling wash */}
      <linearGradient id="ceilWash" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%"  stopColor="rgba(255,240,200,0.18)"/>
        <stop offset="100%" stopColor="rgba(0,0,0,0.08)"/>
      </linearGradient>
      <rect width="600" height="220" fill="url(#ceilWash)"/>
      {/* Exposed beams — close-up angled */}
      {[-1,0,1,2].map((n,i)=>{
        const bx = 300 + n*148;
        return (
          <g key={i}>
            {/* Beam bottom face */}
            <rect x={bx-30} y={0} width={60} height={220} fill="#5A3010" filter="url(#woodPhoto)"/>
            {/* Beam side face (right) */}
            <polygon points={`${bx+30},0 ${bx+30},220 ${bx+52},210 ${bx+52},0`}
              fill="#3A1E08" filter="url(#woodPhoto)"/>
            {/* Highlight on bottom edge */}
            <rect x={bx-30} y={0} width={60} height={5} fill="rgba(255,200,100,0.25)"/>
            {/* Shadow cast on ceiling */}
            <rect x={bx-35} y={0} width={10} height={220}
              fill="rgba(0,0,0,0.18)" filter="url(#bokeh)"/>
            <rect x={bx+28} y={0} width={12} height={220}
              fill="rgba(0,0,0,0.22)" filter="url(#bokeh)"/>
          </g>
        );
      })}
      {/* Wall intersection — plaster wall at back */}
      <rect width="600" height="18" fill="#DDD0B8"/>
      {/* Floor tile grid */}
      {[0.15,0.3,0.48,0.65,0.8,0.9].map((t,i)=>{
        const y = 220 + (400-220)*t;
        const w = 600*(0.2+t*0.8);
        const x = (600-w)/2;
        return <line key={i} x1={x} y1={y} x2={x+w} y2={y} stroke="rgba(110,70,30,0.3)" strokeWidth="1.2"/>;
      })}
      {[-2,-1,0,1,2,3].map((n,i)=>(
        <line key={i} x1={300+n*100} y1={220} x2={300+n*100*3.5} y2={400}
          stroke="rgba(110,70,30,0.25)" strokeWidth="0.9"/>
      ))}
      {/* Floor highlight near camera */}
      <polygon points="150,400 450,400 420,340 180,340" fill="rgba(255,215,140,0.22)"/>
      {/* Glass wall at the far end (glimpse) */}
      <rect x="168" y="38" width="264" height="182" fill="#181008"/>
      {[168,222,276,330,384,432].map((px,i)=>(
        <rect key={i} x={px+2} y={40} width={52} height={178} fill="url(#skyGold)" opacity="0.18"/>
      ))}
      {[168,222,276,330,384,432,432+54].map((px,i)=>(
        <rect key={i} x={px-2} y={38} width={5} height={184} fill="#100806"/>
      ))}
      <rect x="168" y="38" width="264" height="6" fill="#100806"/>
      <rect x="168" y="218" width="264" height="6" fill="#100806"/>
      {/* Warm light through glass */}
      <radialGradient id="glassGlow6" cx="50%" cy="55%" r="55%">
        <stop offset="0%"  stopColor="rgba(255,240,185,0.8)"/>
        <stop offset="100%" stopColor="rgba(0,0,0,0)"/>
      </radialGradient>
      <rect x="168" y="38" width="264" height="182" fill="url(#glassGlow6)"/>
      {/* Ambient warm room light */}
      <radialGradient id="ambient6" cx="50%" cy="40%" r="72%">
        <stop offset="0%"  stopColor="rgba(255,230,160,0.25)"/>
        <stop offset="100%" stopColor="rgba(0,0,0,0)"/>
      </radialGradient>
      <rect width="600" height="400" fill="url(#ambient6)"/>
      {/* Film grain + vignette */}
      <rect width="600" height="400" fill="url(#vig)" filter="url(#grain)"/>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════
   INSPIRATION GALLERY COMPONENT
═══════════════════════════════════════════════════ */
const PHOTOS = [
  { Photo: Photo1, label: "חזית טוסקנית — אבן, קשתות, תריסים", sub: "חזית ראשית | שעת זהב" },
  { Photo: Photo2, label: "סלון — קיר זכוכית פתוח לשדות",       sub: "פנים | אחרי שינוי" },
  { Photo: Photo3, label: "כניסה — חלון שתי קומות + מדרגות",    sub: "כניסה | אור טבעי" },
  { Photo: Photo4, label: "ערב — אור פנים חם דרך הזכוכית",      sub: "חזית | ערב" },
  { Photo: Photo5, label: "פרט אדריכלי — קשת + גפן + שמש",      sub: "אבן מקומית | עץ" },
  { Photo: Photo6, label: "קורות עץ חשופות — בית מבפנים",       sub: "פנים | תקרה" },
];

export default function VillaInspo() {
  const [selected, setSelected] = useState(null);

  return (
    <div style={{
      minHeight:"100dvh", background:"#0C0804", color:"white",
      fontFamily:"'Heebo','Inter',sans-serif", direction:"rtl"
    }}>
      {/* Header */}
      <div style={{
        padding:"14px 22px 10px", borderBottom:"1px solid rgba(255,255,255,0.06)",
        background:"linear-gradient(to bottom,#160C06,#0C0804)",
        display:"flex", justifyContent:"space-between", alignItems:"center"
      }}>
        <span style={{fontSize:11,letterSpacing:4,color:"rgba(255,255,255,0.28)",textTransform:"uppercase"}}>
          מאגר השראה
        </span>
        <span style={{
          fontSize:14,fontWeight:800,letterSpacing:3,
          background:"linear-gradient(90deg,#D4A85A,#F0CC80)",
          WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"
        }}>
          טוסקנה ישראל — וילה
        </span>
        <span style={{fontSize:11,letterSpacing:3,color:"rgba(255,255,255,0.22)"}}>הדמיות אחרי</span>
      </div>

      {/* Subtitle */}
      <div style={{padding:"10px 22px", borderBottom:"1px solid rgba(255,255,255,0.04)"}}>
        <p style={{margin:0,fontSize:12,color:"rgba(255,255,255,0.38)",letterSpacing:1}}>
          6 הדמיות — אבן מקומית · קשתות · קורות עץ · חלון שתי קומות · קיר זכוכית · נוף שדות
        </p>
      </div>

      {/* Grid */}
      <div style={{
        display:"grid",
        gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",
        gap:"2px", padding:"2px", background:"#0C0804"
      }}>
        {PHOTOS.map(({Photo, label, sub},i)=>(
          <div key={i}
            onClick={()=>setSelected(i)}
            style={{
              position:"relative", cursor:"pointer", overflow:"hidden",
              aspectRatio:"3/2",
              transition:"transform .2s",
            }}
            onMouseEnter={e=>e.currentTarget.style.transform="scale(1.015)"}
            onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}
          >
            <Photo/>
            {/* Caption overlay */}
            <div style={{
              position:"absolute", bottom:0, left:0, right:0,
              background:"linear-gradient(to top,rgba(5,3,1,0.88) 0%,rgba(0,0,0,0) 100%)",
              padding:"28px 14px 10px",
            }}>
              <div style={{fontSize:11,fontWeight:700,color:"rgba(255,255,255,0.92)",letterSpacing:0.5}}>
                {label}
              </div>
              <div style={{fontSize:9,color:"rgba(200,165,80,0.8)",letterSpacing:1,marginTop:2}}>
                {sub}
              </div>
            </div>
            {/* Number badge */}
            <div style={{
              position:"absolute", top:10, right:10,
              background:"rgba(0,0,0,0.55)", backdropFilter:"blur(4px)",
              border:"1px solid rgba(255,255,255,0.12)",
              borderRadius:4, padding:"2px 7px",
              fontSize:9, fontWeight:700, color:"rgba(255,255,255,0.6)", letterSpacing:2
            }}>{String(i+1).padStart(2,"0")}</div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selected !== null && (
        <div
          onClick={()=>setSelected(null)}
          style={{
            position:"fixed", inset:0, background:"rgba(0,0,0,0.92)",
            display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
            zIndex:999, padding:20
          }}
        >
          <div style={{width:"100%",maxWidth:860,position:"relative"}}
            onClick={e=>e.stopPropagation()}>
            <div style={{borderRadius:4,overflow:"hidden",boxShadow:"0 24px 80px rgba(0,0,0,0.8)"}}>
              {React.createElement(PHOTOS[selected].Photo)}
            </div>
            <div style={{
              padding:"14px 4px 4px",
              display:"flex",justifyContent:"space-between",alignItems:"center"
            }}>
              <div>
                <div style={{fontSize:14,fontWeight:700,color:"rgba(255,255,255,0.9)"}}>
                  {PHOTOS[selected].label}
                </div>
                <div style={{fontSize:11,color:"rgba(200,165,80,0.75)",marginTop:3}}>
                  {PHOTOS[selected].sub}
                </div>
              </div>
              <div style={{display:"flex",gap:10}}>
                <button onClick={()=>setSelected(s=>(s-1+PHOTOS.length)%PHOTOS.length)}
                  style={{background:"rgba(255,255,255,0.08)",border:"none",color:"white",
                    padding:"6px 18px",borderRadius:5,cursor:"pointer",fontSize:16}}>→</button>
                <button onClick={()=>setSelected(s=>(s+1)%PHOTOS.length)}
                  style={{background:"rgba(255,255,255,0.08)",border:"none",color:"white",
                    padding:"6px 18px",borderRadius:5,cursor:"pointer",fontSize:16}}>←</button>
                <button onClick={()=>setSelected(null)}
                  style={{background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.12)",
                    color:"rgba(255,255,255,0.5)",padding:"6px 14px",borderRadius:5,cursor:"pointer",fontSize:13}}>
                  סגור
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// make React available for createElement in lightbox
import React from "react";

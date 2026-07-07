// KittyKana cat engine — parametric cartoon cat SVGs, breeds, outfits, moves

// ── Breed definitions ────────────────────────────────────────────────
// unlock: {t:"start"} | {t:"level",n} | {t:"challenge",n} (daily challenges completed)
window.CAT_BREEDS = [
  {id:"mochi",  name:"Mochi",   jp:"もち",     desc:"Your first friend! A squishy white kitty.", body:"#FFFDF7", belly:"#FFF3E6", inner:"#FFC9D4", eye:"#7BB6E8", pattern:"none",   unlock:{t:"start"}},
  {id:"tora",   name:"Tora",    jp:"とら",     desc:"A cheerful orange tabby.",                  body:"#F9A94B", belly:"#FFE3B8", inner:"#FFB8C2", eye:"#5CB270", pattern:"stripes", stripe:"#E07B2A", unlock:{t:"level",n:2}},
  {id:"kuro",   name:"Kuro",    jp:"くろ",     desc:"A sleek midnight black cat.",               body:"#4A4258", belly:"#6B6278", inner:"#FF9DB0", eye:"#F4C842", pattern:"none",   unlock:{t:"level",n:3}},
  {id:"haiiro", name:"Haiiro",  jp:"はいいろ", desc:"A soft gray cloud kitty.",                  body:"#B7B7C9", belly:"#E3E3EF", inner:"#FFB8C2", eye:"#8FD14F", pattern:"none",   unlock:{t:"level",n:4}},
  {id:"mike",   name:"Mike",    jp:"みけ",     desc:"A lucky calico with patches!",              body:"#FFF9EE", belly:"#FFF3E0", inner:"#FFB8C2", eye:"#E8A33D", pattern:"calico", patch1:"#F9A94B", patch2:"#5A5266", unlock:{t:"level",n:5}},
  {id:"azuki",  name:"Azuki",   jp:"あずき",   desc:"An elegant Siamese kitty.",                 body:"#F3E3C9", belly:"#FAF0DE", inner:"#E8B4A0", eye:"#6FA8DC", pattern:"points", point:"#8A6748", unlock:{t:"level",n:6}},
  {id:"pengin", name:"Pengin",  jp:"ぺんぎん", desc:"A fancy tuxedo cat, always dressed up.",    body:"#4A4258", belly:"#FFFDF7", inner:"#FFB8C2", eye:"#F4C842", pattern:"tuxedo", unlock:{t:"level",n:8}},
  {id:"sakura", name:"Sakura",  jp:"さくら",   desc:"A cherry-blossom kitty from Japan.",        body:"#FFF5F7", belly:"#FFE9EE", inner:"#FF9DB0", eye:"#E86FA0", pattern:"calico", patch1:"#F9B8CC", patch2:"#F48FB1", extra:"sakura", unlock:{t:"level",n:10}},
  {id:"aoi",    name:"Aoi",     jp:"あおい",   desc:"A rare Russian Blue.",                      body:"#8C9BC0", belly:"#B9C4DE", inner:"#F0A5B5", eye:"#7FD98F", pattern:"none",   unlock:{t:"level",n:12}},
  {id:"kinako", name:"Kinako",  jp:"きなこ",   desc:"A toasty brown tabby.",                     body:"#B58A5F", belly:"#E6C9A8", inner:"#F0A5B5", eye:"#8FD14F", pattern:"stripes", stripe:"#8A6240", unlock:{t:"level",n:14}},
  {id:"koban",  name:"Koban",   jp:"こばん",   desc:"A shimmering golden cat.",                  body:"#F5C74B", belly:"#FBE7A8", inner:"#F79EB0", eye:"#5CB2C7", pattern:"none",   extra:"sparkle", unlock:{t:"level",n:16}},
  {id:"yukiho", name:"Yukiho",  jp:"ゆきほ",   desc:"A snow-leopard kitty from the mountains.",  body:"#E8E4DA", belly:"#F7F4EC", inner:"#B9C4DE", eye:"#9DB4E8", pattern:"spots",  spot:"#9A9284", unlock:{t:"level",n:18}},
  {id:"torao",  name:"Torao",   jp:"とらお",   desc:"A brave little tiger!",                     body:"#F08A2C", belly:"#FFE3B8", inner:"#FFB8C2", eye:"#F4E042", pattern:"stripes", stripe:"#5A4230", unlock:{t:"level",n:20}},
  // ── Daily-challenge exclusive cats ──
  {id:"ichigo", name:"Ichigo",  jp:"いちご",   desc:"A sweet strawberry kitty. Challenge prize!", body:"#F9829B", belly:"#FFD3DC", inner:"#FFF0F3", eye:"#7BC96F", pattern:"spots", spot:"#F4E042", extra:"leaf", unlock:{t:"challenge",n:3}},
  {id:"shinobi",name:"Shinobi", jp:"しのび",   desc:"A stealthy ninja cat. Nin nin!",             body:"#3D4460", belly:"#565E80", inner:"#F0A5B5", eye:"#FF6B6B", pattern:"none",  extra:"ninja", unlock:{t:"challenge",n:7}},
  {id:"maneki", name:"Maneki",  jp:"まねき",   desc:"A lucky fortune cat!",                       body:"#FFFDF7", belly:"#FFF3E6", inner:"#F55B6E", eye:"#59431E", pattern:"calico", patch1:"#F55B6E", patch2:"#3B3B3B", extra:"maneki", unlock:{t:"challenge",n:14}},
  {id:"hoshiko",name:"Hoshiko", jp:"ほしこ",   desc:"A cosmic kitty from outer space.",           body:"#7C6BC9", belly:"#A99AE8", inner:"#FF9DB0", eye:"#F4E042", pattern:"stars", unlock:{t:"challenge",n:30}},
  {id:"nijiko", name:"Nijiko",  jp:"にじこ",   desc:"A legendary rainbow cat!",                   body:"rainbow", belly:"#FFFDF7", inner:"#FF9DB0", eye:"#7BB6E8", pattern:"none",  unlock:{t:"challenge",n:60}},
  {id:"robota", name:"Robota",  jp:"ろぼた",   desc:"Beep boop! A robot cat from the future.",    body:"#AEB8C4", belly:"#D5DCE4", inner:"#5CE0D8", eye:"#3BE8B0", pattern:"none",  extra:"robot", unlock:{t:"challenge",n:100}},
  {id:"ohime",  name:"Ohime",   jp:"おひめ",   desc:"A royal princess cat.",                      body:"#E8D9F5", belly:"#F6EEFC", inner:"#F79EB0", eye:"#B07BE8", pattern:"none",  extra:"tiara", unlock:{t:"challenge",n:165}},
  {id:"tenshi", name:"Tenshi",  jp:"てんし",   desc:"An angel kitty with real wings!",            body:"#FFFDF7", belly:"#FFF6E6", inner:"#F7C9D4", eye:"#7BB6E8", pattern:"none",  extra:"angel", unlock:{t:"challenge",n:250}},
  {id:"ryuu",   name:"Ryuu",    jp:"りゅう",   desc:"The legendary dragon cat. You did a whole year!", body:"#6FBF8F", belly:"#C9E8B8", inner:"#F4C842", eye:"#F4C842", pattern:"spots", spot:"#4A9968", extra:"dragon", unlock:{t:"challenge",n:365}},
];

// ── Outfits ──────────────────────────────────────────────────────────
// unlock: {t:"start"} | {t:"fish",n} (buy in shop) | {t:"challenge",n} | {t:"streak",n}
window.CAT_OUTFITS = [
  {id:"none",     name:"Just Fur",       e:"🐾", unlock:{t:"start"}},
  {id:"bow",      name:"Red Bow",        e:"🎀", unlock:{t:"fish",n:30}},
  {id:"bandana",  name:"Blue Bandana",   e:"🔵", unlock:{t:"fish",n:40}},
  {id:"bowtie",   name:"Dapper Bowtie",  e:"🤵", unlock:{t:"fish",n:50}},
  {id:"glasses",  name:"Smart Glasses",  e:"👓", unlock:{t:"fish",n:60}},
  {id:"flower",   name:"Ear Flower",     e:"🌸", unlock:{t:"fish",n:70}},
  {id:"scarf",    name:"Cozy Scarf",     e:"🧣", unlock:{t:"fish",n:90}},
  {id:"beret",    name:"Artist Beret",   e:"🎨", unlock:{t:"fish",n:110}},
  {id:"sunglasses",name:"Cool Shades",   e:"😎", unlock:{t:"fish",n:130}},
  {id:"partyhat", name:"Party Hat",      e:"🥳", unlock:{t:"fish",n:160}},
  {id:"headphones",name:"Headphones",    e:"🎧", unlock:{t:"fish",n:200}},
  {id:"wizardhat",name:"Wizard Hat",     e:"🧙", unlock:{t:"fish",n:260}},
  {id:"bell",     name:"Lucky Bell",     e:"🔔", unlock:{t:"challenge",n:5}},
  {id:"flowercrown",name:"Flower Crown", e:"👑", unlock:{t:"challenge",n:21}},
  {id:"crown",    name:"Golden Crown",   e:"👑", unlock:{t:"challenge",n:45}},
  {id:"halo",     name:"Angel Halo",     e:"😇", unlock:{t:"challenge",n:80}},
  {id:"rainbowscarf",name:"Rainbow Scarf",e:"🌈", unlock:{t:"challenge",n:130}},
  {id:"cape",     name:"Royal Cape",     e:"🦸", unlock:{t:"challenge",n:200}},
  {id:"ninjaband",name:"Ninja Headband", e:"🥷", unlock:{t:"streak",n:7}},
  {id:"heartnecklace",name:"Heart Necklace",e:"💖", unlock:{t:"streak",n:30}},
];

// ── Moves (animations) — unlocked by total stars earned ─────────────
window.CAT_MOVES = [
  {id:"idle",    name:"Sitting Pretty", e:"🐱", unlock:{t:"start"}},
  {id:"bounce",  name:"Happy Bounce",   e:"🦘", unlock:{t:"stars",n:10}},
  {id:"wiggle",  name:"Wiggle Dance",   e:"💃", unlock:{t:"stars",n:25}},
  {id:"spin",    name:"Super Spin",     e:"🌀", unlock:{t:"stars",n:45}},
  {id:"jump",    name:"Sky Jump",       e:"⬆️", unlock:{t:"stars",n:70}},
  {id:"zoomies", name:"Zoomies!",       e:"💨", unlock:{t:"stars",n:100}},
  {id:"flip",    name:"Backflip",       e:"🤸", unlock:{t:"stars",n:140}},
  {id:"sparkle", name:"Sparkle Party",  e:"✨", unlock:{t:"stars",n:190}},
];

// ── SVG drawing ──────────────────────────────────────────────────────
(function(){
  let uidCounter = 0;

  function patternShapes(b, uid){
    const p = b.pattern;
    let head = "", body = "";
    if (p === "stripes"){
      const c = b.stripe;
      head = `<path d="M78 36 q4 12 0 20" stroke="${c}" stroke-width="7" fill="none" stroke-linecap="round"/>
              <path d="M100 32 q2 12 0 22" stroke="${c}" stroke-width="7" fill="none" stroke-linecap="round"/>
              <path d="M122 36 q-4 12 0 20" stroke="${c}" stroke-width="7" fill="none" stroke-linecap="round"/>`;
      body = `<path d="M52 128 q10 6 8 18" stroke="${c}" stroke-width="8" fill="none" stroke-linecap="round"/>
              <path d="M148 128 q-10 6 -8 18" stroke="${c}" stroke-width="8" fill="none" stroke-linecap="round"/>`;
    } else if (p === "calico"){
      head = `<ellipse cx="70" cy="52" rx="20" ry="16" fill="${b.patch1}"/>
              <ellipse cx="130" cy="50" rx="17" ry="14" fill="${b.patch2||b.patch1}"/>`;
      body = `<ellipse cx="60" cy="140" rx="18" ry="14" fill="${b.patch1}"/>
              <ellipse cx="142" cy="150" rx="15" ry="12" fill="${b.patch2||b.patch1}"/>`;
    } else if (p === "spots"){
      const c = b.spot;
      head = `<circle cx="74" cy="52" r="6" fill="${c}"/><circle cx="126" cy="50" r="5" fill="${c}"/><circle cx="100" cy="38" r="4.5" fill="${c}"/>`;
      body = `<circle cx="62" cy="138" r="6" fill="${c}"/><circle cx="140" cy="146" r="5" fill="${c}"/><circle cx="122" cy="170" r="4" fill="${c}"/>`;
    } else if (p === "stars"){
      const star = (x,y,s)=>`<text x="${x}" y="${y}" font-size="${s}" text-anchor="middle">⭐</text>`;
      head = star(72,56,13)+star(128,52,11);
      body = star(64,144,13)+star(138,150,11);
    } else if (p === "tuxedo"){
      head = `<path d="M100 66 Q88 82 100 96 Q112 82 100 66 Z" fill="${b.belly}"/>`;
    }
    return {head, body};
  }

  function outfitSVG(outfitId, b){
    switch(outfitId){
      case "bow": return `<g transform="translate(64,22) rotate(-15)"><circle cx="0" cy="0" r="5" fill="#D93B54"/><path d="M0 0 L-14 -9 L-13 8 Z" fill="#F0506A"/><path d="M0 0 L14 -9 L13 8 Z" fill="#F0506A"/></g>`;
      case "bandana": return `<path d="M62 104 Q100 124 138 104 L132 122 Q100 136 68 122 Z" fill="#4A90D9"/><circle cx="84" cy="115" r="2.5" fill="#fff"/><circle cx="100" cy="120" r="2.5" fill="#fff"/><circle cx="116" cy="115" r="2.5" fill="#fff"/>`;
      case "bowtie": return `<g transform="translate(100,112)"><circle cx="0" cy="0" r="5" fill="#C7385A"/><path d="M0 0 L-16 -10 L-16 10 Z" fill="#E8486E"/><path d="M0 0 L16 -10 L16 10 Z" fill="#E8486E"/></g>`;
      case "glasses": return `<g stroke="#5A5266" stroke-width="4" fill="rgba(180,220,255,.35)"><circle cx="80" cy="72" r="15"/><circle cx="120" cy="72" r="15"/><path d="M95 72 L105 72" fill="none"/></g>`;
      case "sunglasses": return `<g><circle cx="80" cy="72" r="15" fill="#2E2A38"/><circle cx="120" cy="72" r="15" fill="#2E2A38"/><path d="M95 72 L105 72 M65 68 L58 62 M135 68 L142 62" stroke="#2E2A38" stroke-width="4" fill="none"/><path d="M72 66 q6 -4 10 0" stroke="#6C6680" stroke-width="3" fill="none"/></g>`;
      case "flower": return `<g transform="translate(136,26)">${[0,72,144,216,288].map(a=>`<ellipse cx="0" cy="-8" rx="5.5" ry="8" fill="#F9B8CC" transform="rotate(${a})"/>`).join("")}<circle r="5" fill="#F4C842"/></g>`;
      case "scarf": return `<path d="M62 104 Q100 126 138 104 L138 118 Q100 138 62 118 Z" fill="#E86F5E"/><rect x="112" y="116" width="14" height="30" rx="7" fill="#E86F5E"/><path d="M112 138 l14 0" stroke="#C9503F" stroke-width="3"/>`;
      case "beret": return `<g transform="translate(100,24)"><ellipse cx="0" cy="0" rx="34" ry="14" fill="#D93B54"/><circle cx="0" cy="-12" r="4" fill="#A82B40"/></g>`;
      case "partyhat": return `<g transform="translate(100,10)"><path d="M0 -14 L-20 34 L20 34 Z" fill="#8F6FE8"/><path d="M-14 20 q14 8 28 0 L20 34 L-20 34 Z" fill="#F4C842"/><circle cy="-14" r="6" fill="#FF6B9C"/></g>`;
      case "headphones": return `<path d="M58 60 Q100 6 142 60" stroke="#5A5266" stroke-width="7" fill="none"/><rect x="48" y="56" width="16" height="26" rx="8" fill="#FF6B9C"/><rect x="136" y="56" width="16" height="26" rx="8" fill="#FF6B9C"/>`;
      case "wizardhat": return `<g transform="translate(100,14)"><ellipse cx="0" cy="22" rx="36" ry="10" fill="#4C3E8F"/><path d="M-20 20 Q-4 -34 6 -38 Q4 -20 18 18 Z" fill="#5C4BAD"/><text x="0" y="4" font-size="13" text-anchor="middle">⭐</text></g>`;
      case "bell": return `<path d="M70 106 Q100 122 130 106" stroke="#D93B54" stroke-width="7" fill="none" stroke-linecap="round"/><circle cx="100" cy="120" r="8" fill="#F4C842" stroke="#D9A62E" stroke-width="2"/><circle cx="100" cy="123" r="2" fill="#8A6D1E"/>`;
      case "flowercrown": return `<g transform="translate(100,26)">${[-26,-13,0,13,26].map((x,i)=>`<g transform="translate(${x},${Math.abs(x)*0.14 - 3})"><circle r="6" fill="${["#F9B8CC","#F4C842","#FF8FA8","#F4C842","#F9B8CC"][i]}"/><circle r="2.6" fill="#fff"/></g>`).join("")}</g>`;
      case "crown": return `<g transform="translate(100,16)"><path d="M-24 10 L-24 -8 L-12 2 L0 -14 L12 2 L24 -8 L24 10 Z" fill="#F4C842" stroke="#D9A62E" stroke-width="2"/><circle cx="0" cy="-16" r="4" fill="#FF6B9C"/></g>`;
      case "halo": return `<ellipse cx="100" cy="8" rx="26" ry="8" fill="none" stroke="#F4D95E" stroke-width="6"/>`;
      case "rainbowscarf": return `<g><path d="M62 102 Q100 124 138 102 L138 110 Q100 132 62 110Z" fill="#F55B6E"/><path d="M62 110 Q100 132 138 110 L138 118 Q100 140 62 118Z" fill="#F4C842"/><path d="M62 118 Q100 140 138 118 L138 126 Q100 148 62 126Z" fill="#5CB270"/><rect x="112" y="124" width="13" height="26" rx="6" fill="#6F9CE8"/></g>`;
      case "cape": return `<path d="M64 106 Q100 120 136 106 L152 178 Q100 196 48 178 Z" fill="#C7385A"/><path d="M64 106 Q100 122 136 106 L134 116 Q100 130 66 116 Z" fill="#F4C842"/>`;
      case "ninjaband": return `<rect x="58" y="42" width="84" height="13" rx="6" fill="#D93B54"/><rect x="130" y="42" width="26" height="9" rx="4" fill="#D93B54" transform="rotate(18 130 46)"/>`;
      case "heartnecklace": return `<path d="M72 106 Q100 120 128 106" stroke="#E8B4C8" stroke-width="4" fill="none"/><text x="100" y="128" font-size="15" text-anchor="middle">💖</text>`;
      default: return "";
    }
  }

  function extraSVG(extra, b, uid){
    switch(extra){
      case "sakura": return `<text x="146" y="34" font-size="16">🌸</text>`;
      case "sparkle": return `<text x="46" y="40" font-size="13">✨</text><text x="148" y="120" font-size="13">✨</text>`;
      case "leaf": return `<g transform="translate(100,14)"><ellipse cx="-8" cy="0" rx="10" ry="5" fill="#5CB270" transform="rotate(-20)"/><ellipse cx="8" cy="0" rx="10" ry="5" fill="#5CB270" transform="rotate(20)"/></g>`;
      case "ninja": return `<rect x="58" y="40" width="84" height="13" rx="6" fill="#8FD3C7"/>`;
      case "maneki": return `<path d="M70 106 Q100 122 130 106" stroke="#D93B54" stroke-width="7" fill="none" stroke-linecap="round"/><circle cx="100" cy="119" r="7" fill="#F4C842"/><g transform="translate(152,120)"><ellipse rx="12" ry="16" fill="#F4C842" stroke="#D9A62E" stroke-width="2"/><text y="5" font-size="12" text-anchor="middle" fill="#8A6D1E">円</text></g>`;
      case "robot": return `<line x1="100" y1="6" x2="100" y2="22" stroke="#7A8694" stroke-width="4"/><circle cx="100" cy="5" r="5" fill="#FF6B6B"/><circle cx="63" cy="90" r="3" fill="#7A8694"/><circle cx="137" cy="90" r="3" fill="#7A8694"/>`;
      case "tiara": return `<g transform="translate(100,20)"><path d="M-16 6 L-16 -4 L-8 2 L0 -8 L8 2 L16 -4 L16 6 Z" fill="#F0D5FF" stroke="#C9A0E8" stroke-width="2"/><circle cx="0" cy="-9" r="3" fill="#B07BE8"/></g>`;
      case "angel": return `<g fill="#FFF8E8" stroke="#F0DCB0" stroke-width="2"><path d="M46 118 Q10 96 22 66 Q40 84 52 96 Q46 108 46 118Z"/><path d="M154 118 Q190 96 178 66 Q160 84 148 96 Q154 108 154 118Z"/></g><ellipse cx="100" cy="6" rx="24" ry="7" fill="none" stroke="#F4D95E" stroke-width="5"/>`;
      case "dragon": return `<path d="M74 24 L68 4 L84 16 Z" fill="#F4C842"/><path d="M126 24 L132 4 L116 16 Z" fill="#F4C842"/>`;
      default: return "";
    }
  }

  // Draws a cute sitting cat. Returns an <svg> string.
  window.catSVG = function(breedId, outfitId, opts){
    opts = opts || {};
    const b = window.CAT_BREEDS.find(c=>c.id===breedId) || window.CAT_BREEDS[0];
    const uid = "cs" + (++uidCounter);
    let bodyFill = b.body, defs = "";
    if (b.body === "rainbow"){
      bodyFill = `url(#grad${uid})`;
      defs = `<linearGradient id="grad${uid}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#FF8A8A"/><stop offset=".25" stop-color="#FFC46B"/>
        <stop offset=".5" stop-color="#A8E06B"/><stop offset=".75" stop-color="#6BC4E8"/>
        <stop offset="1" stop-color="#C99AE8"/></linearGradient>`;
    }
    const pat = patternShapes({...b, body:bodyFill}, uid);
    const pointC = b.pattern==="points" ? b.point : null;
    const earFill = pointC || bodyFill;
    const tailFill = pointC || bodyFill;
    const size = opts.size || 160;
    const cls = opts.cls || "";
    const sleeping = opts.sleeping;

    const eyes = sleeping
      ? `<path d="M72 74 q8 7 16 0 M112 74 q8 7 16 0" stroke="#5A5266" stroke-width="4" fill="none" stroke-linecap="round"/>`
      : `<g><ellipse cx="80" cy="73" rx="10" ry="12" fill="${b.eye}"/><ellipse cx="120" cy="73" rx="10" ry="12" fill="${b.eye}"/>
         <circle cx="80" cy="73" r="5.5" fill="#3A3344"/><circle cx="120" cy="73" r="5.5" fill="#3A3344"/>
         <circle cx="83" cy="69" r="2.6" fill="#fff"/><circle cx="123" cy="69" r="2.6" fill="#fff"/></g>`;

    return `<svg class="catsvg ${cls}" viewBox="0 0 200 200" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${b.name} the cat">
    <defs>${defs}
      <clipPath id="hc${uid}"><circle cx="100" cy="72" r="47"/></clipPath>
      <clipPath id="bc${uid}"><ellipse cx="100" cy="146" rx="54" ry="42"/></clipPath>
    </defs>
    <g class="cat-all">
      <path class="cat-tail" d="M150 160 Q186 150 180 116 Q178 104 168 104 Q160 104 162 116 Q166 138 140 146 Z" fill="${tailFill}" stroke="#00000018" stroke-width="2"/>
      <path d="M62 46 L52 12 L86 28 Z" fill="${earFill}"/><path d="M138 46 L148 12 L114 28 Z" fill="${earFill}"/>
      <path d="M64 40 L59 22 L77 31 Z" fill="${b.inner}"/><path d="M136 40 L141 22 L123 31 Z" fill="${b.inner}"/>
      <ellipse cx="100" cy="146" rx="54" ry="42" fill="${bodyFill}" stroke="#00000014" stroke-width="2"/>
      <g clip-path="url(#bc${uid})">${pat.body}</g>
      <ellipse cx="100" cy="156" rx="30" ry="24" fill="${b.belly}"/>
      <circle cx="100" cy="72" r="47" fill="${bodyFill}" stroke="#00000014" stroke-width="2"/>
      <g clip-path="url(#hc${uid})">${pat.head}</g>
      ${pointC ? `<path d="M100 25 a47 47 0 0 1 40 22 q-40 -14 -80 0 a47 47 0 0 1 40 -22" fill="${pointC}" opacity=".85"/>` : ""}
      ${eyes}
      <circle cx="66" cy="86" r="7" fill="${b.inner}" opacity=".7"/><circle cx="134" cy="86" r="7" fill="${b.inner}" opacity=".7"/>
      <path d="M100 84 L95 90 Q100 94 105 90 Z" fill="#E8798F"/>
      <path d="M100 92 q0 5 -7 7 M100 92 q0 5 7 7" stroke="#5A5266" stroke-width="2.6" fill="none" stroke-linecap="round"/>
      <g stroke="#00000030" stroke-width="2" stroke-linecap="round">
        <path d="M52 80 L30 76"/><path d="M52 88 L31 90"/><path d="M148 80 L170 76"/><path d="M148 88 L169 90"/>
      </g>
      <ellipse cx="76" cy="184" rx="15" ry="9" fill="${pointC||bodyFill}" stroke="#00000014" stroke-width="2"/>
      <ellipse cx="124" cy="184" rx="15" ry="9" fill="${pointC||bodyFill}" stroke="#00000014" stroke-width="2"/>
      <path d="M71 182 l0 5 M78 183 l0 5 M119 182 l0 5 M126 183 l0 5" stroke="#00000022" stroke-width="2" stroke-linecap="round"/>
      ${extraSVG(b.extra, b, uid)}
      ${outfitId && outfitId!=="none" ? outfitSVG(outfitId, b) : ""}
    </g></svg>`;
  };
})();

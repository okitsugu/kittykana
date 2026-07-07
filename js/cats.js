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
// slot: ear | face | hat | neck | body | legs | back — one item worn per slot
// unlock: {t:"fish",n} (buy in shop) | {t:"challenge",n} | {t:"streak",n}
// layer (optional): where it draws — defaults by slot (body/legs/back), else on top
window.CAT_OUTFITS = [
  // ── Hair pins & ear bows (slot: ear) ──
  {id:"bow",          name:"Red Bow",          e:"🎀", slot:"ear", unlock:{t:"fish",n:30}},
  {id:"flower",       name:"Ear Flower",       e:"🌸", slot:"ear", unlock:{t:"fish",n:45}},
  {id:"bobbypin",     name:"Gold Bobby Pins",  e:"📎", slot:"ear", unlock:{t:"fish",n:25}},
  {id:"heartpin",     name:"Heart Pin",        e:"💗", slot:"ear", unlock:{t:"fish",n:35}},
  {id:"starpin",      name:"Star Pin",         e:"⭐", slot:"ear", unlock:{t:"fish",n:35}},
  {id:"sakurapin",    name:"Sakura Pin",       e:"🌸", slot:"ear", unlock:{t:"fish",n:40}},
  {id:"butterflypin", name:"Butterfly Clip",   e:"🦋", slot:"ear", unlock:{t:"fish",n:50}},
  {id:"moonpin",      name:"Moon Clip",        e:"🌙", slot:"ear", unlock:{t:"fish",n:45}},
  {id:"candypin",     name:"Candy Clip",       e:"🍬", slot:"ear", unlock:{t:"fish",n:40}},
  {id:"sunflowerpin", name:"Sunflower Clip",   e:"🌻", slot:"ear", unlock:{t:"fish",n:45}},
  {id:"strawberrypin",name:"Strawberry Pin",   e:"🍓", slot:"ear", unlock:{t:"fish",n:40}},
  {id:"rainbowpin",   name:"Rainbow Pin",      e:"🌈", slot:"ear", unlock:{t:"fish",n:60}},
  // ── Glasses (slot: face) ──
  {id:"glasses",      name:"Smart Glasses",    e:"👓", slot:"face", unlock:{t:"fish",n:60}},
  {id:"sunglasses",   name:"Cool Shades",      e:"😎", slot:"face", unlock:{t:"fish",n:90}},
  {id:"roundglasses", name:"Pink Rounds",      e:"🌷", slot:"face", unlock:{t:"fish",n:55}},
  {id:"nerdglasses",  name:"Study Squares",    e:"📚", slot:"face", unlock:{t:"fish",n:55}},
  {id:"cateyeglasses",name:"Cat-Eye Glasses",  e:"😼", slot:"face", unlock:{t:"fish",n:75}},
  {id:"heartglasses", name:"Heart Glasses",    e:"💕", slot:"face", unlock:{t:"fish",n:85}},
  {id:"starshades",   name:"Star Shades",      e:"🤩", slot:"face", unlock:{t:"fish",n:95}},
  {id:"goggles",      name:"Ski Goggles",      e:"⛷️", slot:"face", unlock:{t:"fish",n:70}},
  {id:"monocle",      name:"Fancy Monocle",    e:"🧐", slot:"face", unlock:{t:"fish",n:80}},
  // ── Hats (slot: hat) ──
  {id:"beret",        name:"Artist Beret",     e:"🎨", slot:"hat", unlock:{t:"fish",n:110}},
  {id:"partyhat",     name:"Party Hat",        e:"🥳", slot:"hat", unlock:{t:"fish",n:160}},
  {id:"headphones",   name:"Headphones",       e:"🎧", slot:"hat", unlock:{t:"fish",n:200}},
  {id:"wizardhat",    name:"Wizard Hat",       e:"🧙", slot:"hat", unlock:{t:"fish",n:260}},
  {id:"cap",          name:"Baseball Cap",     e:"⚾", slot:"hat", unlock:{t:"fish",n:70}},
  {id:"sunhat",       name:"Sunny Sun Hat",    e:"🌞", slot:"hat", unlock:{t:"fish",n:90}},
  {id:"beanie",       name:"Pompom Beanie",    e:"🧶", slot:"hat", unlock:{t:"fish",n:80}},
  {id:"tophat",       name:"Fancy Top Hat",    e:"🎩", slot:"hat", unlock:{t:"fish",n:150}},
  {id:"santahat",     name:"Santa Hat",        e:"🎅", slot:"hat", unlock:{t:"fish",n:120}},
  {id:"froghat",      name:"Froggy Hat",       e:"🐸", slot:"hat", unlock:{t:"fish",n:130}},
  {id:"mushroomhat",  name:"Mushroom Hat",     e:"🍄", slot:"hat", unlock:{t:"fish",n:130}},
  {id:"sailorhat",    name:"Sailor Hat",       e:"⚓", slot:"hat", unlock:{t:"fish",n:100}},
  {id:"chefhat",      name:"Chef Hat",         e:"👩‍🍳", slot:"hat", unlock:{t:"fish",n:110}},
  {id:"cowboyhat",    name:"Cowboy Hat",       e:"🤠", slot:"hat", unlock:{t:"fish",n:140}},
  {id:"pumpkinhat",   name:"Pumpkin Hat",      e:"🎃", slot:"hat", unlock:{t:"fish",n:120}},
  {id:"berryhat",     name:"Strawberry Beanie",e:"🍓", slot:"hat", unlock:{t:"fish",n:150}},
  // ── Neck (slot: neck) ──
  {id:"bandana",      name:"Blue Bandana",     e:"🔵", slot:"neck", unlock:{t:"fish",n:40}},
  {id:"bowtie",       name:"Dapper Bowtie",    e:"🤵", slot:"neck", unlock:{t:"fish",n:50}},
  {id:"scarf",        name:"Cozy Scarf",       e:"🧣", slot:"neck", unlock:{t:"fish",n:90}},
  {id:"pearls",       name:"Pearl Necklace",   e:"⚪", slot:"neck", unlock:{t:"fish",n:120}},
  {id:"starpendant",  name:"Star Pendant",     e:"🌟", slot:"neck", unlock:{t:"fish",n:100}},
  {id:"lei",          name:"Flower Lei",       e:"🌺", slot:"neck", unlock:{t:"fish",n:80}},
  {id:"polkascarf",   name:"Polka Scarf",      e:"🟢", slot:"neck", unlock:{t:"fish",n:60}},
  // ── Jackets & tops (slot: body) ──
  {id:"denimjacket",  name:"Denim Jacket",     e:"🧥", slot:"body", unlock:{t:"fish",n:180}},
  {id:"hoodie",       name:"Red Hoodie",       e:"❤️", slot:"body", unlock:{t:"fish",n:150}},
  {id:"cardigan",     name:"Pink Cardigan",    e:"🌸", slot:"body", unlock:{t:"fish",n:130}},
  {id:"raincoat",     name:"Yellow Raincoat",  e:"🌧️", slot:"body", unlock:{t:"fish",n:120}},
  {id:"sailortop",    name:"Sailor Top",       e:"⛵", slot:"body", unlock:{t:"fish",n:160}},
  {id:"jersey",       name:"Sports Jersey",    e:"🏅", slot:"body", unlock:{t:"fish",n:140}},
  {id:"xmassweater",  name:"Holiday Sweater",  e:"⛄", slot:"body", unlock:{t:"fish",n:170}},
  {id:"tuxjacket",    name:"Tuxedo Jacket",    e:"🎻", slot:"body", unlock:{t:"fish",n:220}},
  {id:"kimono",       name:"Sakura Kimono",    e:"👘", slot:"body", unlock:{t:"fish",n:400}},
  {id:"superhero",    name:"Hero Suit",        e:"⚡", slot:"body", unlock:{t:"fish",n:350}},
  // ── Pants & skirts (slot: legs) ──
  {id:"jeans",        name:"Blue Jeans",       e:"👖", slot:"legs", unlock:{t:"fish",n:100}},
  {id:"pjpants",      name:"Pajama Pants",     e:"😴", slot:"legs", unlock:{t:"fish",n:80}},
  {id:"shorts",       name:"Play Shorts",      e:"🩳", slot:"legs", unlock:{t:"fish",n:60}},
  {id:"skirt",        name:"Twirly Skirt",     e:"💃", slot:"legs", unlock:{t:"fish",n:110}},
  {id:"tutu",         name:"Ballet Tutu",      e:"🩰", slot:"legs", unlock:{t:"fish",n:180}},
  {id:"overalls",     name:"Cute Overalls",    e:"🪛", slot:"legs", unlock:{t:"fish",n:150}},
  {id:"sparklepants", name:"Sparkle Pants",    e:"✨", slot:"legs", unlock:{t:"fish",n:220}},
  // ── Back & extras (slot: back) ──
  {id:"backpack",     name:"Adventure Pack",   e:"🎒", slot:"back", layer:"front", unlock:{t:"fish",n:150}},
  {id:"balloon",      name:"Red Balloon",      e:"🎈", slot:"back", layer:"front", unlock:{t:"fish",n:90}},
  {id:"fairywings",   name:"Fairy Wings",      e:"🧚", slot:"back", unlock:{t:"fish",n:300}},
  // ── Prizes (daily challenges & streaks — not for sale!) ──
  {id:"bell",         name:"Lucky Bell",       e:"🔔", slot:"neck", unlock:{t:"challenge",n:5}},
  {id:"flowercrown",  name:"Flower Crown",     e:"💐", slot:"hat",  unlock:{t:"challenge",n:21}},
  {id:"crown",        name:"Golden Crown",     e:"👑", slot:"hat",  unlock:{t:"challenge",n:45}},
  {id:"halo",         name:"Angel Halo",       e:"😇", slot:"hat",  unlock:{t:"challenge",n:80}},
  {id:"rainbowscarf", name:"Rainbow Scarf",    e:"🌈", slot:"neck", unlock:{t:"challenge",n:130}},
  {id:"cape",         name:"Royal Cape",       e:"🦸", slot:"back", layer:"front", unlock:{t:"challenge",n:200}},
  {id:"ninjaband",    name:"Ninja Headband",   e:"🥷", slot:"hat",  unlock:{t:"streak",n:7}},
  {id:"heartnecklace",name:"Heart Necklace",   e:"💖", slot:"neck", unlock:{t:"streak",n:30}},
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

      // ── hair pins & clips (right ear) ──
      case "bobbypin": return `<g transform="translate(131,31)"><rect x="-10" y="-2" width="20" height="4" rx="2" fill="#D9A62E" transform="rotate(32)"/><rect x="-10" y="-2" width="20" height="4" rx="2" fill="#E8BC4E" transform="rotate(-8)"/></g>`;
      case "heartpin": return `<g transform="translate(132,30)"><rect x="-9" y="4" width="18" height="3.5" rx="2" fill="#D9A62E" transform="rotate(26)"/><path d="M0 3 C-7 -5,-14 3,0 12 C14 3,7 -5,0 3Z" fill="#F55B6E"/><circle cx="-3" cy="1" r="1.6" fill="#fff" opacity=".8"/></g>`;
      case "starpin": return emojiPin("⭐");
      case "sakurapin": return emojiPin("🌸");
      case "butterflypin": return emojiPin("🦋");
      case "moonpin": return emojiPin("🌙");
      case "candypin": return emojiPin("🍬");
      case "sunflowerpin": return emojiPin("🌻");
      case "strawberrypin": return emojiPin("🍓");
      case "rainbowpin": return emojiPin("🌈");

      // ── glasses ──
      case "roundglasses": return `<g stroke="#F286A4" stroke-width="4" fill="rgba(255,182,201,.25)"><circle cx="80" cy="72" r="14"/><circle cx="120" cy="72" r="14"/><path d="M94 72 L106 72 M66 68 L58 63 M134 68 L142 63" fill="none"/></g>`;
      case "nerdglasses": return `<g stroke="#4A7AAD" stroke-width="4" fill="rgba(160,200,255,.28)"><rect x="65" y="60" width="29" height="24" rx="7"/><rect x="106" y="60" width="29" height="24" rx="7"/><path d="M94 70 L106 70 M65 66 L57 62 M135 66 L143 62" fill="none"/></g>`;
      case "cateyeglasses": return `<g stroke="#8F5CAD" stroke-width="4" fill="rgba(220,180,255,.3)"><path d="M64 64 L72 60 Q92 60 93 73 Q91 84 78 84 Q65 82 64 64Z"/><path d="M136 64 L128 60 Q108 60 107 73 Q109 84 122 84 Q135 82 136 64Z"/><path d="M93 70 L107 70" fill="none"/></g>`;
      case "heartglasses": return `<g stroke="#E8486E" stroke-width="4" fill="rgba(255,120,150,.3)"><path d="M80 85 C64 74,66 58,80 66 C94 58,96 74,80 85Z"/><path d="M120 85 C104 74,106 58,120 66 C134 58,136 74,120 85Z"/><path d="M93 70 L107 70" fill="none"/></g>`;
      case "starshades": return `<text x="80" y="82" font-size="29" text-anchor="middle">⭐</text><text x="120" y="82" font-size="29" text-anchor="middle">⭐</text><path d="M92 70 L108 70" stroke="#D9A62E" stroke-width="4"/>`;
      case "goggles": return `<rect x="53" y="62" width="94" height="12" rx="6" fill="#7BB6E8"/><g stroke="#5A5266" stroke-width="4" fill="rgba(140,230,255,.4)"><circle cx="80" cy="72" r="15"/><circle cx="120" cy="72" r="15"/></g>`;
      case "monocle": return `<circle cx="120" cy="72" r="14" stroke="#D9A62E" stroke-width="4" fill="rgba(255,240,200,.3)"/><path d="M120 86 Q118 100 124 110" stroke="#D9A62E" stroke-width="2.5" fill="none"/>`;

      // ── hats ──
      case "cap": return `<path d="M62 44 Q100 -4 138 44 Q100 24 62 44Z" fill="#4A90D9"/><path d="M104 38 Q142 32 154 43 Q128 50 102 46Z" fill="#3A78B8"/><circle cx="100" cy="12" r="4.5" fill="#2E5E92"/>`;
      case "sunhat": return `<ellipse cx="100" cy="41" rx="55" ry="12" fill="#F4D9A0"/><path d="M68 40 Q100 -6 132 40 Q100 28 68 40Z" fill="#F4D9A0"/><path d="M70 36 Q100 22 130 36 L128 42 Q100 30 72 42Z" fill="#F286A4"/>`;
      case "beanie": return `<path d="M62 42 Q100 -8 138 42 Q100 24 62 42Z" fill="#8F6FE8"/><path d="M60 42 Q100 22 140 42 L138 50 Q100 32 62 50Z" fill="#7A5CD1"/><circle cx="100" cy="-4" r="8" fill="#F9B8CC"/>`;
      case "tophat": return `<ellipse cx="100" cy="37" rx="38" ry="9" fill="#2E2A38"/><rect x="76" y="-4" width="48" height="40" rx="5" fill="#3A3344"/><rect x="76" y="24" width="48" height="9" fill="#D93B54"/>`;
      case "santahat": return `<path d="M62 42 Q80 -12 128 2 Q116 8 120 34 Q94 24 62 42Z" fill="#D93B54"/><circle cx="130" cy="2" r="8" fill="#fff"/><path d="M58 44 Q92 30 122 40 L120 50 Q94 40 60 54Z" fill="#fff"/>`;
      case "froghat": return `<path d="M62 44 Q100 -4 138 44 Q100 26 62 44Z" fill="#7BC96F"/><g><circle cx="80" cy="6" r="9" fill="#7BC96F"/><circle cx="80" cy="5" r="4.5" fill="#fff"/><circle cx="80" cy="5" r="2" fill="#3A3344"/><circle cx="120" cy="6" r="9" fill="#7BC96F"/><circle cx="120" cy="5" r="4.5" fill="#fff"/><circle cx="120" cy="5" r="2" fill="#3A3344"/></g>`;
      case "mushroomhat": return `<path d="M58 42 Q100 -14 142 42 Q100 28 58 42Z" fill="#E8574A"/><circle cx="82" cy="16" r="6" fill="#fff"/><circle cx="114" cy="10" r="7.5" fill="#fff"/><circle cx="100" cy="30" r="5" fill="#fff"/>`;
      case "sailorhat": return `<path d="M66 40 Q100 6 134 40 Q100 30 66 40Z" fill="#fff"/><path d="M64 40 Q100 28 136 40 L134 48 Q100 36 66 48Z" fill="#3D4A80"/><circle cx="100" cy="10" r="5" fill="#D93B54"/>`;
      case "chefhat": return `<path d="M72 40 Q58 14 80 12 Q84 -6 100 0 Q116 -6 120 12 Q142 14 128 40Z" fill="#fff" stroke="#E3E3EF" stroke-width="2"/><rect x="72" y="36" width="56" height="10" rx="4" fill="#EDEDF4"/>`;
      case "cowboyhat": return `<path d="M48 44 Q44 52 60 49 Q100 42 140 49 Q156 52 152 44 Q130 36 124 33 L119 12 Q100 2 81 12 L76 33 Q70 36 48 44Z" fill="#B58A5F"/><path d="M78 32 Q100 26 122 32 L121 38 Q100 32 79 38Z" fill="#8A6240"/>`;
      case "pumpkinhat": return `<path d="M62 42 Q100 -8 138 42 Q100 26 62 42Z" fill="#E06818" stroke="#B85210" stroke-width="2"/><path d="M84 34 Q88 8 100 2 M116 34 Q112 8 100 2" stroke="#B85210" stroke-width="3" fill="none"/><rect x="96" y="-10" width="8" height="12" rx="3" fill="#5CB270"/><path d="M92 20 L96 26 L100 20 L104 26 L108 20" stroke="#3A3344" stroke-width="2.5" fill="none"/>`;
      case "berryhat": return `<path d="M62 42 Q100 -8 138 42 Q100 26 62 42Z" fill="#E8574A"/><g fill="#F4E042"><circle cx="82" cy="24" r="2.2"/><circle cx="100" cy="14" r="2.2"/><circle cx="118" cy="24" r="2.2"/><circle cx="92" cy="32" r="2.2"/><circle cx="110" cy="34" r="2.2"/></g><ellipse cx="94" cy="-2" rx="10" ry="4.5" fill="#5CB270" transform="rotate(-18 94 -2)"/><ellipse cx="106" cy="-2" rx="10" ry="4.5" fill="#5CB270" transform="rotate(18 106 -2)"/>`;

      // ── neck ──
      case "pearls": return `<g fill="#FFF8F0" stroke="#E8DCC8" stroke-width="1.5"><circle cx="72" cy="108" r="4.5"/><circle cx="82" cy="114" r="4.5"/><circle cx="93" cy="118" r="4.5"/><circle cx="107" cy="118" r="4.5"/><circle cx="118" cy="114" r="4.5"/><circle cx="128" cy="108" r="4.5"/></g>`;
      case "starpendant": return `<path d="M72 106 Q100 122 128 106" stroke="#D9A62E" stroke-width="3" fill="none"/><text x="100" y="132" font-size="16" text-anchor="middle">🌟</text>`;
      case "lei": return `<text x="74" y="118" font-size="15" text-anchor="middle">🌺</text><text x="92" y="126" font-size="15" text-anchor="middle">🌼</text><text x="110" y="126" font-size="15" text-anchor="middle">🌺</text><text x="127" y="118" font-size="15" text-anchor="middle">🌼</text>`;
      case "polkascarf": return `<path d="M62 104 Q100 126 138 104 L138 118 Q100 138 62 118 Z" fill="#6FBF8F"/><rect x="112" y="116" width="14" height="28" rx="7" fill="#6FBF8F"/><g fill="#fff"><circle cx="84" cy="115" r="3"/><circle cx="102" cy="120" r="3"/><circle cx="120" cy="114" r="3"/><circle cx="119" cy="132" r="3"/></g>`;

      // ── jackets & tops (drawn on body, under the head) ──
      case "denimjacket": return openJacket("#6F9CE8","#4A7AAD")+`<g stroke="#C9DEF5" stroke-width="1.8" stroke-dasharray="4 3" fill="none"><path d="M58 122 Q50 146 57 168"/><path d="M142 122 Q150 146 143 168"/></g><rect x="60" y="138" width="14" height="11" rx="2.5" fill="#5A88C9" stroke="#4A7AAD" stroke-width="2"/><rect x="126" y="138" width="14" height="11" rx="2.5" fill="#5A88C9" stroke="#4A7AAD" stroke-width="2"/>`;
      case "hoodie": return `<path d="M56 118 Q100 90 144 118 Q100 104 56 118Z" fill="#B82E42"/>`+closedTop("#D93B54")+`<path d="M88 116 L86 136 M112 116 L114 136" stroke="#fff" stroke-width="3" stroke-linecap="round"/><path d="M78 160 Q100 152 122 160 L122 174 Q100 168 78 174Z" fill="#C13349"/>`;
      case "cardigan": return openJacket("#F7A8C0","#E88AA8")+`<g fill="#fff"><circle cx="114" cy="136" r="3.2"/><circle cx="115" cy="150" r="3.2"/><circle cx="114" cy="164" r="3.2"/></g>`;
      case "raincoat": return openJacket("#F4C842","#D9A62E")+`<g stroke="#8A6D1E" stroke-width="3" stroke-linecap="round"><path d="M108 136 L122 136 M108 152 L122 152"/></g>`;
      case "sailortop": return closedTop("#FFFDF7")+`<path d="M76 114 L100 142 L124 114 L124 126 L100 154 L76 126Z" fill="#3D4A80"/><path d="M54 158 Q100 176 146 158 L146 166 Q100 184 54 166Z" fill="#3D4A80"/><circle cx="100" cy="146" r="5" fill="#D93B54"/>`;
      case "jersey": return closedTop("#F55B6E")+`<path d="M50 124 Q64 114 76 112 L78 124 Q64 126 52 134Z" fill="#fff" opacity=".85"/><path d="M150 124 Q136 114 124 112 L122 124 Q136 126 148 134Z" fill="#fff" opacity=".85"/><text x="100" y="160" font-size="26" font-weight="800" text-anchor="middle" fill="#fff">1</text>`;
      case "xmassweater": return closedTop("#4A9968")+`<path d="M54 140 L66 132 L78 140 L90 132 L102 140 L114 132 L126 140 L138 132 L147 138" stroke="#fff" stroke-width="3.5" fill="none"/><text x="100" y="166" font-size="17" text-anchor="middle">⛄</text>`;
      case "tuxjacket": return `<path d="M80 118 L100 170 L120 118 Z" fill="#FFFDF7"/>`+openJacket("#3A3344","#2E2A38")+`<path d="M82 120 L94 132 L82 142Z M118 120 L106 132 L118 142Z" fill="#4A4258"/><circle cx="100" cy="156" r="2.6" fill="#3A3344"/><circle cx="100" cy="166" r="2.6" fill="#3A3344"/>`;
      case "kimono": return `<path d="M144 112 Q154 148 142 176 Q120 186 100 186 L100 130 L128 112Z" fill="#F48FB1"/><path d="M56 112 Q46 148 58 176 Q80 186 100 186 L100 136 L68 112Z" fill="#F9B8CC"/><rect x="60" y="146" width="80" height="17" rx="4" fill="#D93B54"/><rect x="88" y="149" width="24" height="11" rx="3" fill="#B82E42"/><text x="70" y="136" font-size="13">🌸</text><text x="126" y="130" font-size="13">🌸</text>`;
      case "superhero": return closedTop("#4A90D9")+`<circle cx="100" cy="142" r="13" fill="#F4C842"/><text x="100" y="149" font-size="17" text-anchor="middle">⚡</text><path d="M52 162 Q100 180 148 162 L148 172 Q100 190 52 172Z" fill="#F4C842"/>`;

      // ── pants & skirts (drawn over the lower body & paws) ──
      case "jeans": return pants("#6F9CE8","#4A7AAD")+`<g stroke="#C9DEF5" stroke-width="1.8" stroke-dasharray="4 3" fill="none"><path d="M62 160 Q76 166 88 168 M138 160 Q124 166 112 168"/></g>`;
      case "pjpants": return pants("#C9A0E8","#AD84D1")+`<g stroke="#fff" stroke-width="3" opacity=".7"><path d="M70 156 L68 184 M100 166 L100 190 M130 156 L132 184"/></g>`;
      case "shorts": return `<path d="M56 150 Q100 168 144 150 L144 168 Q100 184 56 168Z" fill="#5CB270"/><path d="M54 148 Q100 166 146 148 L145 156 Q100 172 55 156Z" fill="#4A8A5C"/>`;
      case "skirt": return `<path d="M52 148 L40 180 Q100 200 160 180 L148 148 Q100 164 52 148Z" fill="#E8574A"/><g stroke="#C13A2E" stroke-width="2.5" fill="none"><path d="M68 154 L60 182 M85 160 L82 190 M100 162 L100 192 M115 160 L118 190 M132 154 L140 182"/></g>`;
      case "tutu": return `<g fill="#F9B8CC"><ellipse cx="100" cy="162" rx="54" ry="13"/><ellipse cx="66" cy="170" rx="21" ry="12"/><ellipse cx="100" cy="176" rx="23" ry="13"/><ellipse cx="134" cy="170" rx="21" ry="12"/></g><path d="M52 150 Q100 166 148 150 L147 158 Q100 172 53 158Z" fill="#F286A4"/><text x="100" y="172" font-size="12" text-anchor="middle">✨</text>`;
      case "overalls": return pants("#6F9CE8","#4A7AAD")+`<rect x="82" y="126" width="36" height="30" rx="6" fill="#6F9CE8" stroke="#4A7AAD" stroke-width="2"/><path d="M86 128 L64 110 M114 128 L136 110" stroke="#4A7AAD" stroke-width="6" stroke-linecap="round"/><circle cx="88" cy="132" r="3" fill="#F4C842"/><circle cx="112" cy="132" r="3" fill="#F4C842"/><path d="M88 142 Q100 148 112 142" stroke="#4A7AAD" stroke-width="2" fill="none"/>`;
      case "sparklepants": return pants("#F5C74B","#D9A62E")+`<text x="76" y="168" font-size="11">✨</text><text x="118" y="172" font-size="11">✨</text><text x="98" y="182" font-size="11">✨</text>`;

      // ── back & extras ──
      case "backpack": return `<rect x="38" y="122" width="18" height="36" rx="8" fill="#E8935A" stroke="#C97840" stroke-width="2"/><rect x="144" y="122" width="18" height="36" rx="8" fill="#E8935A" stroke="#C97840" stroke-width="2"/><path d="M76 112 L70 152 M124 112 L130 152" stroke="#E8935A" stroke-width="8" stroke-linecap="round"/><rect x="40" y="134" width="14" height="8" rx="3" fill="#F4C842"/><rect x="146" y="134" width="14" height="8" rx="3" fill="#F4C842"/>`;
      case "balloon": return `<path d="M124 178 Q140 140 134 100" stroke="#B0A8A0" stroke-width="2" fill="none"/><text x="134" y="100" font-size="34" text-anchor="middle">🎈</text>`;
      case "fairywings": return `<g fill="rgba(190,225,255,.75)" stroke="#9DB4E8" stroke-width="2.5"><ellipse cx="44" cy="110" rx="15" ry="32" transform="rotate(26 44 110)"/><ellipse cx="40" cy="148" rx="11" ry="21" transform="rotate(42 40 148)"/><ellipse cx="156" cy="110" rx="15" ry="32" transform="rotate(-26 156 110)"/><ellipse cx="160" cy="148" rx="11" ry="21" transform="rotate(-42 160 148)"/></g><text x="30" y="92" font-size="12">✨</text><text x="166" y="92" font-size="12">✨</text>`;
      default: return "";
    }
  }

  // small helpers for the outfit art
  function emojiPin(emoji){
    return `<g transform="translate(132,30)"><rect x="-9" y="5" width="18" height="3.5" rx="2" fill="#D9A62E" transform="rotate(26)"/><text x="0" y="8" font-size="17" text-anchor="middle">${emoji}</text></g>`;
  }
  function openJacket(fill, stroke){
    return `<g fill="${fill}" stroke="${stroke}" stroke-width="2.5">
      <path d="M56 114 Q44 146 54 172 Q66 181 84 184 L84 121 Q66 113 56 114Z"/>
      <path d="M144 114 Q156 146 146 172 Q134 181 116 184 L116 121 Q134 113 144 114Z"/>
      <path d="M84 120 L70 111 L94 114Z"/><path d="M116 120 L130 111 L106 114Z"/></g>`;
  }
  function closedTop(fill){
    return `<path d="M50 124 Q100 98 150 124 L150 160 Q100 180 50 160Z" fill="${fill}" stroke="#00000018" stroke-width="2"/><path d="M52 156 Q100 174 148 156 L148 162 Q100 180 52 162Z" fill="#00000014"/>`;
  }
  function pants(fill, dark){
    return `<path d="M54 150 Q100 170 146 150 L146 178 Q100 196 54 178Z" fill="${fill}"/>
      <path d="M54 148 Q100 168 146 148 L145.5 156 Q100 174 54.5 156Z" fill="${dark}"/>
      <rect x="61" y="172" width="29" height="14" rx="7" fill="${fill}" stroke="${dark}" stroke-width="2"/>
      <rect x="110" y="172" width="29" height="14" rx="7" fill="${fill}" stroke="${dark}" stroke-width="2"/>`;
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
  // outfitIds: a single outfit id, or an array of ids (one per slot).
  window.catSVG = function(breedId, outfitIds, opts){
    opts = opts || {};
    const b = window.CAT_BREEDS.find(c=>c.id===breedId) || window.CAT_BREEDS[0];
    const worn = Array.isArray(outfitIds) ? outfitIds
      : (outfitIds && outfitIds !== "none" ? [outfitIds] : []);
    const layers = { back:"", body:"", legs:"", front:"" };
    worn.forEach(id => {
      const def = window.CAT_OUTFITS.find(o=>o.id===id);
      if (!def) return;
      const lay = def.layer || ({body:"body", legs:"legs", back:"back"})[def.slot] || "front";
      layers[lay] += outfitSVG(id, b);
    });
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
      ${layers.back}
      <path class="cat-tail" d="M150 160 Q186 150 180 116 Q178 104 168 104 Q160 104 162 116 Q166 138 140 146 Z" fill="${tailFill}" stroke="#00000018" stroke-width="2"/>
      <path d="M62 46 L52 12 L86 28 Z" fill="${earFill}"/><path d="M138 46 L148 12 L114 28 Z" fill="${earFill}"/>
      <path d="M64 40 L59 22 L77 31 Z" fill="${b.inner}"/><path d="M136 40 L141 22 L123 31 Z" fill="${b.inner}"/>
      <ellipse cx="100" cy="146" rx="54" ry="42" fill="${bodyFill}" stroke="#00000014" stroke-width="2"/>
      <g clip-path="url(#bc${uid})">${pat.body}</g>
      <ellipse cx="100" cy="156" rx="30" ry="24" fill="${b.belly}"/>
      ${layers.body}
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
      ${layers.legs}
      ${extraSVG(b.extra, b, uid)}
      ${layers.front}
    </g></svg>`;
  };
})();

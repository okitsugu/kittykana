/* ═══ KittyKana games — Word Builder, Kana Pop, Memory Match, Cat Race ═══ */
(function(){
"use strict";
const $ = id => document.getElementById(id);
let cleanup = null;   // current game's timer/interval cleanup

const GAMES = [
  {id:"builder", name:"Word Builder", jp:"ことばづくり", e:"🧩", desc:"Spell words from kana tiles!"},
  {id:"pop",     name:"Kana Pop",     jp:"ぷくぷく",     e:"🫧", desc:"Pop the bubble that makes the sound!"},
  {id:"memory",  name:"Memory Match", jp:"しんけいすいじゃく", e:"🎴", desc:"Find the matching pairs!"},
  {id:"race",    name:"Cat Race",     jp:"ねこレース",   e:"🏁", desc:"Answer fast — win the race!"},
];

window.renderGamesHub = function(){
  const KK = window.KK;
  const g = $("gamesGrid");
  g.innerHTML = "";
  GAMES.forEach(game=>{
    const plays = KK.gamePlaysToday(game.id);
    const b = document.createElement("button");
    b.className = "bigcard";
    b.innerHTML = '<div class="bigcard-emoji">'+game.e+'</div><div class="bigcard-txt">'
      + '<div class="bigcard-title">'+game.name+' <span class="jp-mini">'+game.jp+'</span></div>'
      + '<div class="bigcard-sub">'+game.desc+(plays>=3?" · 😺 small treats now":"")+'</div></div>'
      + '<div class="bigcard-arrow">▶</div>';
    b.onclick = ()=>startGame(game.id);
    g.appendChild(b);
  });
  KK.show("games");
};

function startGame(id){
  if (cleanup){ cleanup(); cleanup = null; }
  $("gameArea").innerHTML = "";
  $("gameHud").innerHTML = "";
  window.KK.show("game");
  ({builder: gameBuilder, pop: gamePop, memory: gameMemory, race: gameRace})[id]();
}
$("gameQuit").onclick = ()=>{
  if (cleanup){ cleanup(); cleanup = null; }
  speechSynthesis.cancel();
  window.renderGamesHub();
};

function finishGame(gameId, line, fishBase){
  const KK = window.KK;
  if (cleanup){ cleanup(); cleanup = null; }
  const plays = KK.gamePlaysToday(gameId);
  const fish = plays >= 3 ? Math.max(2, Math.round(fishBase/4)) : fishBase;
  KK.recordGamePlay(gameId);
  KK.addReward(fish, fish);
  KK.sfxReward(); KK.confetti(24);
  const name = GAMES.find(g=>g.id===gameId).name;
  $("gameArea").innerHTML = '<div class="results card"><div class="r-title">'+name+' — done! 🎉</div>'
    + '<div class="r-line">'+line+'</div>'
    + '<div class="r-line">+'+fish+' 🐟 &nbsp; +'+fish+' XP'+(plays>=3?' <span class="jp-mini">(the cats are tired — big treats again tomorrow!)</span>':'')+'</div>'
    + '<div class="r-cat">'+catSVG(KK.state().activeCat, KK.outfitsFor(KK.state().activeCat), {size:140})+'</div>'
    + '<button class="pill-btn primary big" id="gAgain">Play again ▶</button> '
    + '<button class="pill-btn big" id="gBack">Games</button></div>';
  $("gAgain").onclick = ()=>startGame(gameId);
  $("gBack").onclick = ()=>window.renderGamesHub();
  window.KK.checkUnlocks(()=>{});
}

/* ── 1. Word Builder ────────────────────────────────────────────── */
function gameBuilder(){
  const KK = window.KK;
  const pool = KK.shuffle(KK.learnedWords().filter(w=>{
    const chars = [...w[0]];
    return chars.length >= 2 && chars.length <= 6;
  }));
  const rounds = Math.min(8, pool.length);
  let round = 0, score = 0;
  const allChars = [...new Set(pool.flatMap(w=>[...w[0]]))];

  function renderRound(){
    if (round >= rounds){ finishGame("builder", "You built "+score+" of "+rounds+" words!", 4 + score); return; }
    $("gameHud").innerHTML = "Word "+(round+1)+" / "+rounds+" &nbsp; ⭐ "+score;
    const w = pool[round];
    const chars = [...w[0]];
    const distract = KK.shuffle(allChars.filter(c=>!chars.includes(c))).slice(0, Math.min(3, Math.max(1, 7-chars.length)));
    const tiles = KK.shuffle([...chars, ...distract]);
    const area = $("gameArea");
    area.innerHTML = '<div class="quiz-q card"><div class="quiz-prompt">Build this word! 🧩</div>'
      + '<div style="font-size:52px">'+(w[4]||"")+'</div><div class="meaning-lbl">'+w[2]+'</div>'
      + '<button class="sound-btn small" id="bSound">🔊</button>'
      + '<div class="builder-slots" id="bSlots">'+chars.map(()=>'<div class="builder-slot"></div>').join("")+'</div></div>'
      + '<div class="arrange-bank" id="bBank"></div>'
      + '<div class="quiz-feedback" id="bFb"></div>';
    $("bSound").onclick = ()=>KK.speak(w[0], 0.8);
    KK.speak(w[0], 0.8);
    const slots = [...area.querySelectorAll(".builder-slot")];
    const bank = $("bBank");
    let resolved = false;
    const placed = [];
    tiles.forEach(ch=>{
      const b = document.createElement("button");
      b.className = "tile-btn small";
      b.textContent = ch;
      b.onclick = ()=>{
        if (resolved) return;
        if (b.style.visibility === "hidden") return;
        if (placed.length >= chars.length) return;
        KK.speakJa(ch, 0.7);
        placed.push({ch, btn:b});
        b.style.visibility = "hidden";
        redraw();
        if (placed.length === chars.length) resolve();
      };
      bank.appendChild(b);
    });
    function redraw(){
      slots.forEach((s,i)=>{
        s.textContent = placed[i] ? placed[i].ch : "";
        s.classList.toggle("filled", !!placed[i]);
        s.onclick = ()=>{
          if (resolved || !placed[i]) return;
          placed[i].btn.style.visibility = "";
          placed.splice(i,1);
          redraw();
        };
      });
    }
    function resolve(){
      resolved = true;
      const ok = placed.map(p=>p.ch).join("") === w[0];
      if (ok){ score++; KK.sfxGood(); $("bFb").textContent = "せいかい! "+w[0]+" = "+w[2]+" 🎉"; }
      else {
        KK.sfxBad();
        $("bFb").textContent = "Almost! It's "+w[0];
        $("bFb").className = "quiz-feedback bad";
        slots.forEach((s,i)=>{ s.textContent = chars[i]; s.classList.add("filled"); });
      }
      KK.speak(w[0], 0.85);
      setTimeout(()=>{ round++; renderRound(); }, ok ? 1300 : 2400);
    }
  }
  renderRound();
}

/* ── 2. Kana Pop ────────────────────────────────────────────────── */
function gamePop(){
  const KK = window.KK;
  const chars = KK.learnedKana();
  const uniq = [...new Map(chars.map(c=>[c[0], c])).values()];
  let score = 0, time = 45, target = null;
  const area = $("gameArea");
  area.innerHTML = '<div class="pop-target" id="popTarget"></div><div class="pop-arena" id="popArena"></div>';
  const arena = $("popArena");

  function newTarget(){
    target = KK.pick(uniq);
    $("popTarget").innerHTML = 'Pop the sound: <b style="font-size:32px">'+target[1]+'</b> '
      + '<button class="sound-btn small" id="popSound" style="vertical-align:middle">🔊</button>';
    $("popSound").onclick = ()=>KK.speakJa(target[0], 0.7);
    KK.speakJa(target[0], 0.7);
  }
  function hud(){ $("gameHud").innerHTML = "⏰ "+time+"s &nbsp; ⭐ "+score; }
  function spawn(){
    const c = Math.random() < 0.4 ? target : KK.pick(uniq);
    const b = document.createElement("button");
    b.className = "pop-bubble";
    b.textContent = c[0];
    b.style.left = (4 + Math.random()*82) + "%";
    b.style.animationDuration = (5.5 + Math.random()*3) + "s";
    b.onclick = ()=>{
      if (b.classList.contains("pop")) return;
      if (c[0] === target[0]){
        score++; hud(); KK.sfxGood();
        b.classList.add("pop");
        setTimeout(()=>b.remove(), 220);
        newTarget();
      } else {
        KK.sfxBad();
        KK.speakJa(c[0], 0.7);
      }
    };
    arena.appendChild(b);
    setTimeout(()=>b.remove(), 9000);
  }
  newTarget(); hud();
  const spawnI = setInterval(spawn, 900);
  const timerI = setInterval(()=>{
    time--; hud();
    if (time <= 0){
      finishGame("pop", "You popped "+score+" bubbles! 🫧", Math.min(4 + score, 16));
    }
  }, 1000);
  cleanup = ()=>{ clearInterval(spawnI); clearInterval(timerI); };
}

/* ── 3. Memory Match ────────────────────────────────────────────── */
function gameMemory(){
  const KK = window.KK;
  const useWords = Math.random() < 0.5 && KK.learnedWords().length >= 8;
  let pairs;
  if (useWords){
    const ws = KK.shuffle(KK.learnedWords().filter(w=>w[4] && w[4] !== "❔"))
      .filter((w,i,arr)=>arr.findIndex(x=>x[4]===w[4])===i).slice(0,6);
    pairs = ws.map((w,i)=>({id:i, a:{t:w[0], sub:""}, b:{t:w[4], sub:w[2]}, say:w[0]}));
  } else {
    const ks = KK.shuffle([...new Map(KK.learnedKana().map(c=>[c[0],c])).values()]).slice(0,6);
    pairs = ks.map((c,i)=>({id:i, a:{t:c[0], sub:""}, b:{t:c[1], sub:"sound"}, say:c[0]}));
  }
  const cards = KK.shuffle(pairs.flatMap(p=>[{p, face:p.a}, {p, face:p.b}]));
  let first = null, lock = false, moves = 0, matched = 0;
  $("gameHud").innerHTML = "Tries: 0";
  const area = $("gameArea");
  area.innerHTML = '<div class="memory-grid" id="memGrid"></div>';
  cards.forEach(cd=>{
    const el = document.createElement("button");
    el.className = "mem-card";
    el.innerHTML = '<div class="mem-inner"><div class="mem-face mem-back">🐾</div>'
      + '<div class="mem-face mem-front">'+cd.face.t+(cd.face.sub?'<span class="sub">'+cd.face.sub+'</span>':'')+'</div></div>';
    el.onclick = ()=>{
      if (lock || el.classList.contains("flip")) return;
      el.classList.add("flip");
      KK.tone(600, 0, .08, "sine", .08);
      if (!first){ first = {el, cd}; return; }
      moves++; $("gameHud").innerHTML = "Tries: "+moves;
      if (first.cd.p.id === cd.p.id){
        el.classList.add("matched"); first.el.classList.add("matched");
        matched++; KK.sfxGood(); KK.speak(cd.p.say, 0.85);
        first = null;
        if (matched === pairs.length){
          const fishBase = moves <= 9 ? 14 : moves <= 13 ? 10 : 6;
          setTimeout(()=>finishGame("memory", "All pairs found in "+moves+" tries! 🎴", fishBase), 700);
        }
      } else {
        lock = true;
        const fe = first.el; first = null;
        setTimeout(()=>{ el.classList.remove("flip"); fe.classList.remove("flip"); lock = false; }, 950);
      }
    };
    $("memGrid").appendChild(el);
  });
}

/* ── 4. Cat Race ────────────────────────────────────────────────── */
function gameRace(){
  const KK = window.KK;
  const S = KK.state();
  const rivals = KK.shuffle(CAT_BREEDS.filter(c=>c.id!==S.activeCat)).slice(0,2);
  const racers = [
    {id:S.activeCat, outfits:KK.outfitsFor(S.activeCat), steps:0, me:true},
    {id:rivals[0].id, outfits:[], steps:0},
    {id:rivals[1].id, outfits:[], steps:0},
  ];
  const GOAL = 8;
  const kana = KK.learnedKana(), words = KK.learnedWords();
  let qn = 0, correct = 0;
  const area = $("gameArea");
  area.innerHTML = '<div class="race-track" id="raceTrack">'
    + racers.map((r,i)=>'<div class="race-lane"><div class="race-flag">🏁</div><div class="race-cat" id="lane'+i+'">'
      + catSVG(r.id, r.outfits, {size:56}) + '</div></div>').join("")
    + '</div><div class="quiz-q card" id="raceQ" style="min-height:120px"></div>'
    + '<div class="quiz-choices" id="raceChoices"></div><div class="quiz-feedback" id="raceFb"></div>';

  function drawCats(){
    racers.forEach((r,i)=>{
      $("lane"+i).style.left = "calc("+(r.steps/GOAL*88)+"% )";
    });
  }
  function hud(){ $("gameHud").innerHTML = "Q "+Math.min(qn+1,10)+" / 10 &nbsp; ⭐ "+correct; }
  function question(){
    if (qn >= 10 || racers.some(r=>r.steps>=GOAL)){ return end(); }
    hud();
    let prompt, big, say, choices;
    if (Math.random() < 0.5 || words.length < 8){
      const c = KK.pick(kana);
      prompt = "Quick! How do you say this?"; big = c[0]; say = c[0];
      choices = KK.shuffle([c[1], ...KK.shuffle(kana.filter(x=>x[1]!==c[1])).slice(0,3).map(x=>x[1])]).map(l=>({l, ok:l===c[1]}));
    } else {
      const w = KK.pick(words);
      prompt = "Quick! What does it mean?"; big = w[0]; say = w[0];
      choices = KK.shuffle([w[2], ...KK.shuffle(words.filter(x=>x[2]!==w[2])).slice(0,3).map(x=>x[2])]).map(l=>({l, ok:l===w[2]}));
    }
    $("raceQ").innerHTML = '<div class="quiz-prompt">'+prompt+'</div><div class="quiz-big word" style="font-size:44px">'+big+'</div>';
    KK.speakJa(say, 0.75);
    const ch = $("raceChoices");
    ch.innerHTML = "";
    choices.forEach(c=>{
      const b = document.createElement("button");
      b.className = "choice-btn word";
      b.textContent = c.l;
      b.onclick = ()=>{
        [...ch.children].forEach(x=>x.disabled = true);
        if (c.ok){
          correct++; racers[0].steps++;
          b.classList.add("correct"); KK.sfxGood();
        } else {
          b.classList.add("wrong"); KK.sfxBad();
          [...ch.children].find(x=>x.textContent===choices.find(cc=>cc.ok).l)?.classList.add("correct");
        }
        // rivals scamper along
        racers[1].steps += Math.random() < 0.5 ? 1 : 0;
        racers[2].steps += Math.random() < 0.55 ? 1 : 0;
        drawCats();
        qn++;
        setTimeout(question, c.ok ? 900 : 1700);
      };
      ch.appendChild(b);
    });
  }
  function end(){
    const win = racers[0].steps >= Math.max(racers[1].steps, racers[2].steps);
    const line = win ? "Your cat won the race! 🏆 ("+correct+" / 10 right)"
                     : "So close! "+correct+" / 10 right — try again!";
    finishGame("race", line, win ? 6 + correct : 3 + Math.floor(correct/2));
  }
  drawCats();
  question();
}
})();

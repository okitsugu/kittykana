/* ═══ KittyKana — main app ═══ */
(function(){
"use strict";

const VOCAB = window.VOCAB || [];
const KANJI = window.KANJI || [];
const KANA_UNITS = window.KANA_UNITS || [];
const WORDS_PER_PACK = 10;
const WORDS_PER_DAY = 15;

// ── State ────────────────────────────────────────────────────────────
const DEFAULTS = {
  xp:0, fish:0, streak:0, bestStreak:0,
  lastChallengeDay:null, challengesDone:0,
  unitStars:{}, totalStars:0,
  activeCat:"mochi", outfits:[], activeMove:"idle",
  boughtOutfits:[], seenUnlocks:["cat:mochi","move:idle"],
};
// ── Profiles: each player gets their own save slot ──
let REG;
try { REG = JSON.parse(localStorage.getItem("kittykana_profiles")||"null"); } catch(e){ REG = null; }
if (!REG || !Array.isArray(REG.list)){
  REG = { list:[], active:null };
  const legacy = localStorage.getItem("kittykana"); // migrate old single-player save
  if (legacy){
    REG.list.push({id:"p1", name:"Player 1"});
    REG.active = "p1";
    localStorage.setItem("kittykana_p1", legacy);
    localStorage.removeItem("kittykana");
  }
  saveReg();
}
function saveReg(){ localStorage.setItem("kittykana_profiles", JSON.stringify(REG)); }
function profile(){ return REG.list.find(p=>p.id===REG.active) || null; }

let S = JSON.parse(JSON.stringify(DEFAULTS));
function loadState(){
  S = JSON.parse(JSON.stringify(DEFAULTS));
  try { Object.assign(S, JSON.parse(localStorage.getItem("kittykana_"+REG.active)||"{}")); } catch(e){}
  // migrate old single-outfit saves to the outfit-slots system
  if (!Array.isArray(S.outfits)) S.outfits = [];
  if (typeof S.activeOutfit === "string"){
    if (S.activeOutfit !== "none" && !S.outfits.length) S.outfits = [S.activeOutfit];
    delete S.activeOutfit;
  }
}
function save(){ if (REG.active) localStorage.setItem("kittykana_"+REG.active, JSON.stringify(S)); }

const level = () => 1 + Math.floor(S.xp/120);
const todayKey = () => { const d=new Date(); return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0"); };
const $ = id => document.getElementById(id);
const shuffle = a => { a=a.slice(); for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]];} return a; };
const pick = a => a[Math.floor(Math.random()*a.length)];

// ── Audio: Japanese TTS ─────────────────────────────────────────────
let jpVoice = null;
function findVoice(){
  const vs = speechSynthesis.getVoices();
  jpVoice = vs.find(v=>/kyoko/i.test(v.name)) || vs.find(v=>v.lang && v.lang.startsWith("ja")) || null;
}
if ("speechSynthesis" in window){
  findVoice();
  speechSynthesis.onvoiceschanged = findVoice;
}
function speak(text, rate){
  if (!("speechSynthesis" in window)) return;
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  if (!jpVoice) findVoice();
  if (jpVoice) u.voice = jpVoice;
  u.lang = "ja-JP";
  u.rate = rate || 0.8;
  u.pitch = 1.0;
  speechSynthesis.speak(u);
}

// ── Real recorded kana audio (public-domain recordings, Wikimedia Commons) ──
// map each kana character (hiragana + katakana) to its syllable clip name
const KANA_AUDIO = (()=>{
  const hira = "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをんがぎぐげござじずぜぞだぢづでどばびぶべぼぱぴぷぺぽ";
  const kata = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンガギグゲゴザジズゼゾダヂヅデドバビブベボパピプペポ";
  const syll = ("a i u e o ka ki ku ke ko sa shi su se so ta chi tsu te to "
    + "na ni nu ne no ha hi hu he ho ma mi mu me mo ya yu yo "
    + "ra ri ru re ro wa wo n ga gi gu ge go za zi zu ze zo "
    + "da di du de do ba bi bu be bo pa pi pu pe po").split(" ");
  const m = {};
  [...hira].forEach((ch,i)=>{ m[ch] = syll[i]; m[kata[i]] = syll[i]; });
  return m;
})();
const clipCache = {};
// speak Japanese: real recording for single kana, TTS for everything else
function speakJa(text, rate){
  const s = KANA_AUDIO[text];
  if (s){
    try {
      speechSynthesis.cancel();
      let clip = clipCache[s];
      if (!clip){ clip = clipCache[s] = new Audio("audio/kana/"+s+".m4a"); }
      clip.currentTime = 0;
      clip.play().catch(()=>speak(text, rate));
      return;
    } catch(e){ /* fall through to TTS */ }
  }
  speak(text, rate);
}

// ── Sound effects (WebAudio) ────────────────────────────────────────
let actx = null;
function ac(){ if(!actx){ try{ actx = new (window.AudioContext||window.webkitAudioContext)(); }catch(e){} } return actx; }
function tone(freq, t0, dur, type, vol){
  const c = ac(); if(!c) return;
  const o = c.createOscillator(), g = c.createGain();
  o.type = type||"sine"; o.frequency.value = freq;
  g.gain.setValueAtTime(0.0001, c.currentTime+t0);
  g.gain.exponentialRampToValueAtTime(vol||0.18, c.currentTime+t0+0.02);
  g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime+t0+dur);
  o.connect(g); g.connect(c.destination);
  o.start(c.currentTime+t0); o.stop(c.currentTime+t0+dur+0.05);
}
const sfxGood = () => { tone(660,0,.14); tone(880,.12,.2); };
const sfxBad = () => tone(160,0,.3,"square",0.08);
const sfxReward = () => { [523,659,784,1047].forEach((f,i)=>tone(f,i*.11,.22)); };
function sfxMeow(){
  const c = ac(); if(!c) return;
  const o = c.createOscillator(), g = c.createGain();
  o.type="sawtooth";
  o.frequency.setValueAtTime(700, c.currentTime);
  o.frequency.exponentialRampToValueAtTime(950, c.currentTime+0.12);
  o.frequency.exponentialRampToValueAtTime(380, c.currentTime+0.42);
  g.gain.setValueAtTime(0.0001, c.currentTime);
  g.gain.exponentialRampToValueAtTime(0.12, c.currentTime+0.05);
  g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime+0.45);
  o.connect(g); g.connect(c.destination);
  o.start(); o.stop(c.currentTime+0.5);
}

// ── Curriculum ──────────────────────────────────────────────────────
function kanaUnits(script){ return KANA_UNITS.filter(u=>u.script===script); }
function wordPacks(){
  const packs = [];
  for (let i=0; i*WORDS_PER_PACK < VOCAB.length; i++)
    packs.push({ id:"w"+(i+1), type:"words", title:"Word Pack "+(i+1),
      subtitle: VOCAB.slice(i*WORDS_PER_PACK,(i+1)*WORDS_PER_PACK).slice(0,3).map(w=>w[2]).join(" · ")+" …",
      words: VOCAB.slice(i*WORDS_PER_PACK,(i+1)*WORDS_PER_PACK) });
  return packs;
}
function kanjiUnits(){
  const units = [];
  for (let i=0; i*10 < KANJI.length; i++)
    units.push({ id:"j"+(i+1), type:"kanji", title:"Kanji Set "+(i+1),
      subtitle: KANJI.slice(i*10,(i+1)*10).map(k=>k.c).join(" "),
      kanji: KANJI.slice(i*10,(i+1)*10) });
  return units;
}
function sectionUnits(section){
  if (section==="hiragana") return kanaUnits("hiragana");
  if (section==="katakana") return kanaUnits("katakana");
  if (section==="words") return wordPacks();
  return kanjiUnits();
}
function sectionDone(section){
  const us = sectionUnits(section);
  return us.filter(u=>(S.unitStars[u.id]||0)>0).length;
}
function kanjiUnlocked(){
  return sectionDone("hiragana") >= 15 && sectionDone("katakana") >= 8 || level() >= 10;
}

// ── Navigation ──────────────────────────────────────────────────────
function show(id){
  document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
  $("screen-"+id).classList.add("active");
  window.scrollTo(0,0);
}
function renderStats(){
  const p = profile();
  $("statName").textContent = p ? p.name : "…";
  $("statLevel").textContent = level();
  $("statFish").textContent = S.fish;
  $("statStreak").textContent = S.streak;
}

// ── Home ────────────────────────────────────────────────────────────
const GREETINGS = [
  ["こんにちは！","konnichiwa — hello!"],
  ["おはよう！","ohayou — good morning!"],
  ["がんばって！","ganbatte — you can do it!"],
  ["すごいね！","sugoi ne — amazing!"],
  ["いっしょに べんきょうしよう！","let's study together!"],
  ["にゃんにゃん！","nyan nyan — meow meow!"],
  ["きょうも たのしいね！","today is fun too!"],
  ["だいすき！","daisuki — I love you!"],
];
function renderHome(){
  renderStats();
  $("homeCat").innerHTML = catSVG(S.activeCat, S.outfits, {size:170});
  const breed = CAT_BREEDS.find(c=>c.id===S.activeCat);
  $("homeCatName").textContent = breed.name+" · "+breed.jp;
  const g = pick(GREETINGS);
  $("catBubble").innerHTML = g[0]+'<span class="bubble-sub">'+g[1]+'</span>';
  $("catBubble").dataset.jp = g[0];

  const done = S.lastChallengeDay === todayKey();
  $("dailyBtn").classList.toggle("done", done);
  $("dailySub").textContent = done
    ? "Done today! 🎉 Streak: "+S.streak+" — come back tomorrow!"
    : "Day "+(S.challengesDone+1)+" — "+WORDS_PER_DAY+" new words are waiting!";

  $("subHira").textContent = sectionDone("hiragana")+" / "+kanaUnits("hiragana").length+" lessons";
  $("subKata").textContent = sectionDone("katakana")+" / "+kanaUnits("katakana").length+" lessons";
  $("subWords").textContent = sectionDone("words")+" / "+wordPacks().length+" packs";
  const kc = $("kanjiCard");
  if (kanjiUnlocked()){ kc.classList.remove("locked"); $("subKanji").textContent = sectionDone("kanji")+" / "+kanjiUnits().length+" sets"; }
  else { kc.classList.add("locked"); $("subKanji").textContent = "🔒 Finish hiragana & katakana first!"; }
  const unlockedCats = CAT_BREEDS.filter(c=>catUnlocked(c)).length;
  $("subCats").textContent = unlockedCats+" / "+CAT_BREEDS.length+" cats collected";
}

// ── Unit list screen ────────────────────────────────────────────────
let currentSection = "hiragana";
const SECTION_META = {
  hiragana: ["Hiragana あいうえお","Japan's first alphabet! Learn one row at a time."],
  katakana: ["Katakana アイウエオ","The alphabet for fun borrowed words like ice cream & robot!"],
  words:    ["Words ことば","Learn real Japanese words, 10 at a time."],
  kanji:    ["Kanji かんじ","Picture characters from China — each one tells a story!"],
};
function renderUnits(section){
  currentSection = section;
  const [title, blurb] = SECTION_META[section];
  $("unitsTitle").textContent = title;
  $("unitsBlurb").textContent = blurb;
  const list = $("unitsList");
  list.innerHTML = "";
  const units = sectionUnits(section);
  units.forEach((u, i) => {
    const stars = S.unitStars[u.id]||0;
    const locked = i>0 && !(S.unitStars[units[i-1].id]>0);
    const row = document.createElement("button");
    row.className = "unit-row"+(locked?" locked":"");
    const badge = u.chars ? u.chars[0][0] : (u.kanji ? u.kanji[0].c : "🐾");
    row.innerHTML = '<div class="unit-badge">'+badge+'</div>'
      + '<div><div class="unit-title">'+u.title+'</div><div class="unit-sub">'+(u.subtitle||"")+'</div></div>'
      + '<div class="unit-stars">'+(locked?"🔒":"⭐".repeat(stars)+"☆".repeat(3-stars))+'</div>';
    row.onclick = () => {
      if (locked){ toast("Locked! 🔒", "Finish the lesson before it first — you've got this! がんばって！"); return; }
      startLesson(u);
    };
    list.appendChild(row);
  });
  show("units");
}

// ── Lesson (flashcards) ─────────────────────────────────────────────
let L = null; // {unit, cards, idx, mode}
function unitCards(u){
  if (u.chars) return u.chars.map(c=>({type:"kana", ch:c[0], romaji:c[1], exK:c[2], exR:c[3], exE:c[4], emoji:c[5]}));
  if (u.words) return u.words.map(w=>({type:"word", kana:w[0], romaji:w[1], en:w[2], emoji:w[4]}));
  return u.kanji.map(k=>({type:"kanji", ch:k.c, meaning:k.m, romaji:k.r, kana:k.kana, ex:k.ex, emoji:k.e}));
}
function startLesson(u){
  restoreLessonHandlers();
  L = { unit:u, cards:unitCards(u), idx:0 };
  initProgCats();
  show("lesson");
  renderCard();
}
function speakCard(c){
  if (c.type==="kana") speakJa(c.ch, 0.7);
  else if (c.type==="word") speak(c.kana, 0.8);
  else speak(c.kana + "。" + c.ex[0], 0.8);
}
function renderCard(){
  const c = L.cards[L.idx];
  const el = $("lessonCard");
  let html = "";
  if (c.type==="kana"){
    html = '<div class="big-char">'+c.ch+'</div><div class="romaji-lbl">'+c.romaji+'</div>';
    if (c.exK) html += '<div class="example-box"><span class="ex-emoji">'+(c.emoji||"")+'</span> <span class="ex-kana">'+c.exK+'</span><br>'+c.exR+" — "+c.exE+'</div>';
  } else if (c.type==="word"){
    html = '<div style="font-size:58px">'+(c.emoji||"")+'</div><div class="big-char" style="font-size:64px">'+c.kana+'</div>'
      + '<div class="romaji-lbl" style="font-size:26px">'+c.romaji+'</div><div class="meaning-lbl">'+c.en+'</div>';
  } else {
    html = '<div class="big-char kanji-char">'+c.ch+'</div>'
      + '<div class="romaji-lbl" style="font-size:24px">'+c.kana+' · '+c.romaji+'</div>'
      + '<div class="meaning-lbl">'+c.meaning+' '+(c.emoji||"")+'</div>'
      + '<div class="example-box"><span class="ex-kana">'+c.ex[0]+'</span><br>'+c.ex[1]+" — "+c.ex[2]+'</div>';
  }
  html += '<button class="sound-btn" id="cardSound" aria-label="Play sound">🔊</button>';
  el.innerHTML = html;
  $("cardSound").onclick = () => speakCard(c);
  const pct = ((L.idx+1)/L.cards.length)*100;
  $("lessonProg").style.width = pct+"%";
  $("lessonProgCat").style.left = pct+"%";
  $("lessonPrev").style.visibility = L.idx===0 ? "hidden":"visible";
  $("lessonNext").textContent = L.idx === L.cards.length-1 ? "Quiz Time! 🎯" : "Next →";
  speakCard(c);
}
$("lessonPrev").onclick = () => { if(L.idx>0){ L.idx--; renderCard(); } };
$("lessonNext").onclick = () => {
  if (L.idx < L.cards.length-1){ L.idx++; renderCard(); }
  else startQuiz(buildUnitQuiz(L.unit), { kind:"unit", unit:L.unit });
};
$("lessonBack").onclick = () => renderUnits(currentSection);

// ── Quiz engine ─────────────────────────────────────────────────────
// question: {prompt, big, bigCls, say, choices:[{label, correct, cls}], after}
let Q = null; // {questions, idx, correct, ctx}
function distractors(pool, correctLabel, n, labelFn){
  const opts = shuffle(pool.map(labelFn).filter(l=>l && l!==correctLabel));
  return [...new Set(opts)].slice(0,n);
}
function kanaPool(unit){
  // distractor pool: this unit + all units of same script
  const same = KANA_UNITS.filter(u=>u.script===unit.script).flatMap(u=>u.chars);
  return same;
}
function qKana(c, unit){
  const pool = kanaPool(unit);
  const t = pick(["audio2char","char2romaji","romaji2char"]);
  if (t==="audio2char"){
    return { prompt:"Which one makes this sound? 👂", big:"🔊", say:c[0], tapSay:true,
      choices: mkChoices(c[0], distractors(pool, c[0], 3, x=>x[0])) };
  } else if (t==="char2romaji"){
    return { prompt:"How do you say this?", big:c[0], say:c[0],
      choices: mkChoices(c[1], distractors(pool, c[1], 3, x=>x[1]), "word") };
  }
  return { prompt:"Find: "+c[1], big:c[1], bigCls:"word", say:c[0],sayAfter:true,
    choices: mkChoices(c[0], distractors(pool, c[0], 3, x=>x[0])) };
}
function qWord(w, all){
  const t = pick(["kana2en","audio2en","en2kana"]);
  if (t==="kana2en")
    return { prompt:"What does this mean? 🤔", big:w[0], bigCls:"word", say:w[0],
      choices: mkChoices(w[2], distractors(all, w[2], 3, x=>x[2]), "word") };
  if (t==="audio2en")
    return { prompt:"Listen! What does it mean? 👂", big:"🔊", say:w[0], tapSay:true,
      choices: mkChoices(w[2], distractors(all, w[2], 3, x=>x[2]), "word") };
  return { prompt:'Find: "'+w[2]+'" '+(w[4]||""), big:w[4]||"⭐", say:w[0], sayAfter:true,
    choices: mkChoices(w[0], distractors(all, w[0], 3, x=>x[0]), "word") };
}
function qKanji(k, all){
  const t = pick(["k2m","k2r","m2k"]);
  if (t==="k2m")
    return { prompt:"What does this kanji mean?", big:k.c, bigCls:"kanji-char", say:k.kana,
      choices: mkChoices(k.m, distractors(all, k.m, 3, x=>x.m), "word") };
  if (t==="k2r")
    return { prompt:"How do you read this?", big:k.c, bigCls:"kanji-char", say:k.kana, sayAfter:true,
      choices: mkChoices(k.kana+" ("+k.r+")", distractors(all, k.kana+" ("+k.r+")", 3, x=>x.kana+" ("+x.r+")"), "word") };
  return { prompt:'Find the kanji for "'+k.m+'" '+(k.e||""), big:k.e||"⭐", say:k.kana, sayAfter:true,
    choices: mkChoices(k.c, distractors(all, k.c, 3, x=>x.c)) };
}
function mkChoices(correct, wrong, cls){
  return shuffle([{label:correct, correct:true, cls}, ...wrong.map(w=>({label:w, correct:false, cls}))]);
}
function buildUnitQuiz(u){
  if (u.chars){
    const chars = shuffle(u.chars).slice(0, Math.min(u.chars.length, 10));
    return chars.map(c=>qKana(c, u));
  }
  if (u.words) return shuffle(u.words).map(w=>qWord(w, VOCAB));
  return shuffle(u.kanji).map(k=>qKanji(k, KANJI));
}
function startQuiz(questions, ctx){
  Q = { questions, idx:0, correct:0, ctx };
  show("quiz");
  renderQuestion();
}
function renderQuestion(){
  const q = Q.questions[Q.idx];
  const qEl = $("quizQ");
  qEl.innerHTML = '<div class="quiz-prompt">'+q.prompt+'</div>'
    + (q.tapSay
       ? '<button class="sound-btn" id="qSound">🔊</button>'
       : '<div class="quiz-big '+(q.bigCls||"")+'">'+q.big+'</div><button class="sound-btn small" id="qSound">🔊</button>');
  $("qSound").onclick = () => speakJa(q.say, 0.7);
  if (!q.sayAfter) speakJa(q.say, 0.7);

  const ch = $("quizChoices");
  ch.innerHTML = "";
  q.choices.forEach(c => {
    const b = document.createElement("button");
    b.className = "choice-btn "+(c.cls||"");
    b.textContent = c.label;
    b.onclick = () => answer(b, c, q);
    ch.appendChild(b);
  });
  $("quizFeedback").textContent = "";
  $("quizFeedback").className = "quiz-feedback";
  const pct = (Q.idx/Q.questions.length)*100;
  $("quizProg").style.width = pct+"%";
  $("quizProgCat").style.left = pct+"%";
  $("quizScore").textContent = "⭐ "+Q.correct;
}
const PRAISE = ["せいかい! Correct! 🎉","やったね! You did it! ✨","すごい! Amazing! 🌟","パーフェクト! 💮","にゃんderful! 🐱"];
function answer(btn, choice, q){
  document.querySelectorAll(".choice-btn").forEach(b=>b.disabled=true);
  if (choice.correct){
    btn.classList.add("correct");
    Q.correct++;
    sfxGood();
    $("quizFeedback").textContent = pick(PRAISE);
    if (q.sayAfter) speakJa(q.say, 0.8);
  } else {
    btn.classList.add("wrong");
    sfxBad();
    document.querySelectorAll(".choice-btn").forEach(b=>{
      if (q.choices[[...b.parentNode.children].indexOf(b)].correct) b.classList.add("correct");
    });
    $("quizFeedback").textContent = "Almost! The answer is: "+q.choices.find(c=>c.correct).label;
    $("quizFeedback").classList.add("bad");
    speakJa(q.say, 0.7);
  }
  $("quizScore").textContent = "⭐ "+Q.correct;
  setTimeout(()=>{
    Q.idx++;
    if (Q.idx < Q.questions.length) renderQuestion();
    else finishQuiz();
  }, choice.correct ? 1100 : 2100);
}
$("quizQuit").onclick = () => {
  speechSynthesis.cancel();
  if (Q && Q.ctx.kind==="challenge") renderHome(), show("home");
  else renderUnits(currentSection);
};

// ── Quiz results & rewards ──────────────────────────────────────────
function finishQuiz(){
  const pct = Q.correct / Q.questions.length;
  const stars = pct>=0.9?3 : pct>=0.7?2 : pct>=0.5?1 : 0;
  let fishGain=0, xpGain=0, title="", lines=[];

  if (Q.ctx.kind==="unit"){
    const u = Q.ctx.unit;
    const prev = S.unitStars[u.id]||0;
    if (stars>prev){ S.totalStars += (stars-prev); S.unitStars[u.id]=stars; }
    fishGain = 4 + stars*4; xpGain = 15 + stars*10;
    title = stars>0 ? "Lesson Complete!" : "Good Try!";
    lines.push("You got "+Q.correct+" out of "+Q.questions.length+"!");
    if (stars===0) lines.push("Play the lesson again to earn a star! ⭐");
  } else if (Q.ctx.kind==="challenge"){
    fishGain = 25 + stars*5; xpGain = 40 + stars*10;
    S.totalStars += stars;
    const t = todayKey();
    const y = new Date(); y.setDate(y.getDate()-1);
    const yk = y.getFullYear()+"-"+String(y.getMonth()+1).padStart(2,"0")+"-"+String(y.getDate()).padStart(2,"0");
    S.streak = (S.lastChallengeDay===yk) ? S.streak+1 : 1;
    S.bestStreak = Math.max(S.bestStreak, S.streak);
    S.lastChallengeDay = t;
    S.challengesDone++;
    title = "Daily Challenge Done! 🌟";
    lines.push("You got "+Q.correct+" out of "+Q.questions.length+"!");
    lines.push("🔥 Streak: "+S.streak+" day"+(S.streak>1?"s":"")+"!");
  } else { // practice
    fishGain = 2 + stars*2; xpGain = 8 + stars*4;
    title = "Practice Complete!";
    lines.push("You got "+Q.correct+" out of "+Q.questions.length+"!");
  }

  S.fish += fishGain; S.xp += xpGain;
  save(); renderStats();
  sfxReward();
  confetti(stars>=2 ? 34 : 14);

  $("resultsBox").innerHTML =
    '<div class="r-title">'+title+'</div>'
    + '<div class="r-stars">'+("⭐".repeat(stars)+"☆".repeat(Math.max(0,3-stars)))+'</div>'
    + lines.map(l=>'<div class="r-line">'+l+'</div>').join("")
    + '<div class="r-line">+'+fishGain+' 🐟 &nbsp; +'+xpGain+' XP</div>'
    + '<div class="r-cat">'+catSVG(S.activeCat, S.outfits, {size:150})+'</div>'
    + '<button class="pill-btn primary big" id="resultsOk">'+(stars===0?"Try Again 💪":"Yay! つづける ▶")+'</button>';
  show("results");
  speak(stars>=2 ? "すごい！よくできました！" : stars===1 ? "よくできました" : "がんばって！", 0.85);
  $("resultsOk").onclick = () => {
    if (Q.ctx.kind==="unit" && stars===0){ startLesson(Q.ctx.unit); return; }
    checkUnlocks(() => {
      if (Q.ctx.kind==="unit") renderUnits(currentSection);
      else { renderHome(); show("home"); }
    });
  };
}

// ── Daily challenge ─────────────────────────────────────────────────
function challengeWords(){
  if (!VOCAB.length) return [];
  const start = (S.challengesDone * WORDS_PER_DAY) % Math.max(1, VOCAB.length);
  const ws = [];
  for (let i=0;i<WORDS_PER_DAY;i++) ws.push(VOCAB[(start+i)%VOCAB.length]);
  return ws;
}
function startChallenge(){
  const doneToday = S.lastChallengeDay === todayKey();
  const words = challengeWords();
  if (!words.length){ toast("Oops! 🐱","The word list didn't load. Please refresh the app!"); return; }
  if (doneToday){
    // bonus practice: review random learned words, small reward, no streak
    const seen = Math.min(S.challengesDone*WORDS_PER_DAY, VOCAB.length);
    const poolWords = shuffle(VOCAB.slice(0, Math.max(seen, WORDS_PER_DAY))).slice(0,10);
    toastAsk("All done today! 🎉",
      "You finished today's challenge — にゃんderful!<br>Come back tomorrow for "+WORDS_PER_DAY+" new words.<br><br>Want some bonus practice? (small treats only!)",
      "Bonus Practice ▶", () => startQuiz(poolWords.map(w=>qWord(w, VOCAB)), {kind:"practice"}));
    return;
  }
  // lesson-style intro of the 15 new words, then quiz
  const fakeUnit = { id:"daily", type:"words", title:"Daily Challenge", words };
  L = { unit:fakeUnit, cards:unitCards(fakeUnit), idx:0 };
  show("lesson");
  renderCard();
  $("lessonNext").onclick = () => {
    if (L.idx < L.cards.length-1){ L.idx++; renderCard(); }
    else {
      // quiz: each new word once + 3 review words from earlier days
      let qs = shuffle(words).map(w=>qWord(w, VOCAB));
      const seen = Math.min(S.challengesDone*WORDS_PER_DAY, VOCAB.length);
      if (seen > 0){
        shuffle(VOCAB.slice(0,seen)).slice(0,3).forEach(w=>qs.push(qWord(w, VOCAB)));
      }
      startQuiz(qs, {kind:"challenge"});
    }
  };
  $("lessonBack").onclick = () => { restoreLessonHandlers(); renderHome(); show("home"); };
}
function restoreLessonHandlers(){
  $("lessonNext").onclick = () => {
    if (L.idx < L.cards.length-1){ L.idx++; renderCard(); }
    else startQuiz(buildUnitQuiz(L.unit), { kind:"unit", unit:L.unit });
  };
  $("lessonBack").onclick = () => renderUnits(currentSection);
}

// ── Unlocks ─────────────────────────────────────────────────────────
function catUnlocked(c){
  const u = c.unlock;
  if (u.t==="start") return true;
  if (u.t==="level") return level()>=u.n;
  return S.challengesDone>=u.n;
}
// wear/remove an outfit — only one item per slot at a time
function equipOutfit(id){
  const def = CAT_OUTFITS.find(o=>o.id===id);
  if (!def) return;
  if (S.outfits.includes(id)){
    S.outfits = S.outfits.filter(x=>x!==id); // tap again to take it off
  } else {
    S.outfits = S.outfits.filter(x=>{
      const d = CAT_OUTFITS.find(o=>o.id===x);
      return d && d.slot !== def.slot;
    }).concat(id);
  }
  save();
}
function outfitUnlocked(o){
  const u = o.unlock;
  if (u.t==="start") return true;
  if (u.t==="fish") return S.boughtOutfits.includes(o.id);
  if (u.t==="challenge") return S.challengesDone>=u.n;
  return S.bestStreak>=u.n;
}
function moveUnlocked(m){
  return m.unlock.t==="start" || S.totalStars>=m.unlock.n;
}
function unlockHint(u){
  if (u.t==="level") return "Reach level "+u.n;
  if (u.t==="challenge") return u.n+" daily challenge"+(u.n>1?"s":"");
  if (u.t==="streak") return u.n+"-day streak";
  if (u.t==="stars") return "Earn "+u.n+" ⭐";
  if (u.t==="fish") return u.n+" 🐟";
  return "";
}
function checkUnlocks(done){
  const queue = [];
  CAT_BREEDS.forEach(c=>{
    if (catUnlocked(c) && !S.seenUnlocks.includes("cat:"+c.id))
      queue.push({kind:"cat", item:c});
  });
  CAT_OUTFITS.forEach(o=>{
    if (o.unlock.t!=="fish" && outfitUnlocked(o) && !S.seenUnlocks.includes("outfit:"+o.id))
      queue.push({kind:"outfit", item:o});
  });
  CAT_MOVES.forEach(m=>{
    if (moveUnlocked(m) && !S.seenUnlocks.includes("move:"+m.id))
      queue.push({kind:"move", item:m});
  });
  const next = () => {
    const u = queue.shift();
    if (!u){ save(); if(done) done(); return; }
    S.seenUnlocks.push(u.kind+":"+u.item.id);
    sfxReward(); confetti(30);
    let visual, name, sub, extraBtn="";
    if (u.kind==="cat"){
      visual = catSVG(u.item.id, "none", {size:160});
      name = u.item.name+" · "+u.item.jp; sub = u.item.desc;
      extraBtn = '<button class="pill-btn primary" id="puEquip">Make '+u.item.name+' my buddy!</button> ';
      S._pendingCat = u.item.id;
    } else if (u.kind==="outfit"){
      const preview = S.outfits.filter(x=>{
        const d = CAT_OUTFITS.find(o=>o.id===x);
        return d && d.slot !== u.item.slot;
      }).concat(u.item.id);
      visual = catSVG(S.activeCat, preview, {size:160});
      name = u.item.name+" "+u.item.e; sub = "A new outfit for your cat!";
      extraBtn = '<button class="pill-btn primary" id="puEquip">Wear it now!</button> ';
      S._pendingOutfit = u.item.id;
    } else {
      visual = '<div style="font-size:80px">'+u.item.e+'</div>';
      name = u.item.name; sub = "A new cat move! Try it on the My Cats page.";
    }
    $("popupInner").innerHTML =
      '<div class="p-title">✨ New Unlock! ✨</div>'+visual
      + '<div class="p-title" style="font-size:23px">'+name+'</div>'
      + '<div class="p-body">'+sub+'</div>'
      + extraBtn+'<button class="pill-btn" id="puOk">Keep going ▶</button>';
    $("popup").classList.remove("hidden");
    speak("おめでとう！", 0.85);
    const close = () => { $("popup").classList.add("hidden"); next(); };
    $("puOk").onclick = close;
    const eq = $("puEquip");
    if (eq) eq.onclick = () => {
      if (u.kind==="cat"){ S.activeCat = S._pendingCat; save(); }
      else if (!S.outfits.includes(S._pendingOutfit)) equipOutfit(S._pendingOutfit);
      close();
    };
  };
  next();
}

// ── Collection ──────────────────────────────────────────────────────
const SLOT_LABELS = {hat:"Hats 🎩", ear:"Hair Pins & Ear Bows 🎀", face:"Glasses 👓", neck:"Scarves & Necklaces 📿", body:"Jackets & Tops 🧥", legs:"Pants & Skirts 👖", back:"Wings & Extras 🧚"};
const SLOT_ORDER = ["hat","ear","face","neck","body","legs","back"];
function renderCollection(){
  const stage = $("stageCat");
  stage.innerHTML = '<div class="anim-'+S.activeMove+'" style="display:inline-block">'+catSVG(S.activeCat, S.outfits, {size:180})+'</div>';
  const breed = CAT_BREEDS.find(c=>c.id===S.activeCat);
  const wornEmoji = S.outfits.map(id=>(CAT_OUTFITS.find(o=>o.id===id)||{}).e||"").join(" ");
  $("stageName").textContent = breed.name+" · "+breed.jp+(wornEmoji ? "  "+wornEmoji : "");
  stage.onclick = () => { sfxMeow(); setTimeout(()=>speak("にゃー", 0.9), 350); };

  const mv = $("stageMoves");
  mv.innerHTML = "";
  CAT_MOVES.forEach(m=>{
    const ok = moveUnlocked(m);
    const b = document.createElement("button");
    b.className = "move-chip"+(ok?"":" locked")+(S.activeMove===m.id?" active":"");
    b.textContent = m.e+" "+m.name+(ok?"":" · "+unlockHint(m.unlock));
    b.onclick = () => {
      if (!ok){ toast("Locked! 🔒","Earn "+m.unlock.n+" total ⭐ from lessons to unlock "+m.name+"!"); return; }
      S.activeMove = m.id; save(); renderCollection();
    };
    mv.appendChild(b);
  });

  const cg = $("collCats");
  cg.innerHTML = "";
  CAT_BREEDS.forEach(c=>{
    const ok = catUnlocked(c);
    const d = document.createElement("button");
    d.className = "coll-item"+(ok?"":" locked")+(S.activeCat===c.id?" selected":"");
    d.innerHTML = catSVG(c.id, S.activeCat===c.id?S.outfits:[], {size:96})
      + '<div class="coll-name">'+(ok?c.name:"???")+'</div>'
      + '<div class="coll-sub">'+(ok?c.jp:unlockHint(c.unlock))+'</div>'
      + (ok?"":'<div class="lock-tag">🔒</div>');
    d.onclick = () => {
      if (!ok){ toast("A mystery cat! 🔒", unlockHint(c.unlock)+" to meet this kitty!"); return; }
      S.activeCat = c.id; save(); sfxMeow(); renderCollection();
    };
    cg.appendChild(d);
  });

  const og = $("collOutfits");
  og.innerHTML = "";
  if (S.outfits.length){
    const clear = document.createElement("button");
    clear.className = "pill-btn";
    clear.style.marginBottom = "6px";
    clear.textContent = "🐾 Take everything off";
    clear.onclick = () => { S.outfits = []; save(); renderCollection(); };
    og.appendChild(clear);
  }
  SLOT_ORDER.forEach(slot=>{
    const items = CAT_OUTFITS.filter(o=>o.slot===slot);
    if (!items.length) return;
    const h = document.createElement("div");
    h.className = "slot-head";
    h.textContent = SLOT_LABELS[slot];
    og.appendChild(h);
    const grid = document.createElement("div");
    grid.className = "coll-grid small";
    items.forEach(o=>{
      const ok = outfitUnlocked(o);
      const d = document.createElement("button");
      d.className = "coll-item"+(ok?"":" locked")+(S.outfits.includes(o.id)?" selected":"");
      d.innerHTML = catSVG(S.activeCat, [o.id], {size:84})
        + '<div class="coll-name">'+o.name+'</div>'
        + '<div class="coll-sub">'+(ok?(S.outfits.includes(o.id)?"wearing it! ✓":"tap to wear"):unlockHint(o.unlock))+'</div>'
        + (ok?"":'<div class="lock-tag">🔒</div>');
      d.onclick = () => {
        if (!ok){
          if (o.unlock.t==="fish") toast("In the shop! 🛍️","Buy "+o.name+" for "+o.unlock.n+" 🐟 in the Cat Shop!");
          else toast("Locked! 🔒", unlockHint(o.unlock)+" to unlock "+o.name+"!");
          return;
        }
        equipOutfit(o.id); renderCollection();
      };
      grid.appendChild(d);
    });
    og.appendChild(grid);
  });
  show("collection");
}

// ── Shop ────────────────────────────────────────────────────────────
function renderShop(){
  renderStats();
  const g = $("shopGrid");
  g.innerHTML = "";
  SLOT_ORDER.forEach(slot=>{
    const items = CAT_OUTFITS.filter(o=>o.slot===slot && o.unlock.t==="fish");
    if (!items.length) return;
    const h = document.createElement("div");
    h.className = "slot-head";
    h.textContent = SLOT_LABELS[slot];
    g.appendChild(h);
    const grid = document.createElement("div");
    grid.className = "coll-grid small";
    items.forEach(o=>{
      const owned = S.boughtOutfits.includes(o.id);
      const wearing = S.outfits.includes(o.id);
      const d = document.createElement("button");
      d.className = "coll-item"+(wearing?" selected":"");
      d.innerHTML = catSVG(S.activeCat, [o.id], {size:84})
        + '<div class="coll-name">'+o.name+'</div>'
        + (owned ? '<div class="buy-tag">'+(wearing?"Wearing ✓":"Owned — tap to wear")+'</div>'
                 : '<div class="buy-tag">'+o.unlock.n+' 🐟</div>');
      d.onclick = () => {
        const catName = CAT_BREEDS.find(c=>c.id===S.activeCat).name;
        if (owned){ equipOutfit(o.id); renderShop(); return; }
        if (S.fish < o.unlock.n){ toast("Not enough fish! 🐟","You need "+o.unlock.n+" 🐟 but have "+S.fish+".<br>Do lessons and daily challenges to earn more!"); return; }
        S.fish -= o.unlock.n;
        S.boughtOutfits.push(o.id);
        if (!S.outfits.includes(o.id)) equipOutfit(o.id);
        save(); sfxReward(); confetti(20); renderStats(); renderShop();
        toast("Yay! New outfit! "+o.e, catName+" is wearing the "+o.name+" now!");
      };
      grid.appendChild(d);
    });
    g.appendChild(grid);
  });
  show("shop");
}

// ── Popups / toast ──────────────────────────────────────────────────
function toast(title, bodyHtml){
  $("popupInner").innerHTML = '<div class="p-title">'+title+'</div><div class="p-body">'+bodyHtml+'</div>'
    + '<button class="pill-btn primary" id="puOk">OK!</button>';
  $("popup").classList.remove("hidden");
  $("puOk").onclick = () => $("popup").classList.add("hidden");
}
function toastAsk(title, bodyHtml, yesLabel, onYes){
  $("popupInner").innerHTML = '<div class="p-title">'+title+'</div><div class="p-body">'+bodyHtml+'</div>'
    + '<button class="pill-btn primary" id="puYes">'+yesLabel+'</button> <button class="pill-btn" id="puOk">Later</button>';
  $("popup").classList.remove("hidden");
  $("puYes").onclick = () => { $("popup").classList.add("hidden"); onYes(); };
  $("puOk").onclick = () => $("popup").classList.add("hidden");
}

// ── Profile picker ──────────────────────────────────────────────────
function profilePeek(id){
  try {
    const st = JSON.parse(localStorage.getItem("kittykana_"+id)||"{}");
    const outfits = Array.isArray(st.outfits) ? st.outfits
      : (st.activeOutfit && st.activeOutfit!=="none" ? [st.activeOutfit] : []);
    return { cat: st.activeCat||"mochi", outfits,
      level: 1+Math.floor((st.xp||0)/120), streak: st.streak||0 };
  } catch(e){ return {cat:"mochi", outfits:[], level:1, streak:0}; }
}
function showProfilePicker(forced){
  const box = $("profileBox");
  let html = '<h1>🐾 Who\'s playing?</h1><div class="p-sub">だれが あそぶ？ — pick your kitty!</div><div class="profile-grid">';
  REG.list.forEach(p=>{
    const pk = profilePeek(p.id);
    html += '<div class="profile-card" data-pid="'+p.id+'">'
      + catSVG(pk.cat, pk.outfits, {size:100})
      + '<div class="pc-name">'+p.name+'</div>'
      + '<div class="pc-sub">Level '+pk.level+' · 🔥 '+pk.streak+'</div>'
      + '<button class="pc-del" data-del="'+p.id+'" aria-label="Delete profile">✕</button></div>';
  });
  html += '<button class="profile-card new" id="profileNew">😺<br>New Player</button></div>';
  html += '<div class="profile-tools">'
    + (REG.list.length ? '<button class="pill-btn" id="profileBackup">💾 Backup code</button>' : '')
    + '<button class="pill-btn" id="profileRestore">📥 Restore from code</button>'
    + (!forced && profile() ? '<button class="pill-btn" id="profileCancel">Cancel</button>' : '')
    + '</div>';
  box.innerHTML = html;
  $("profileOverlay").classList.remove("hidden");

  box.querySelectorAll(".profile-card[data-pid]").forEach(c=>{
    c.onclick = e => {
      if (e.target.closest(".pc-del")) return;
      REG.active = c.dataset.pid; saveReg(); location.reload();
    };
  });
  box.querySelectorAll(".pc-del").forEach(b=>{
    b.onclick = e => {
      e.stopPropagation();
      const p = REG.list.find(x=>x.id===b.dataset.del);
      toastAsk("Delete "+p.name+"? 😿",
        "This erases <b>all</b> of "+p.name+"'s progress, cats and outfits forever!<br>(Grown-ups: make a 💾 backup code first if unsure.)",
        "Yes, delete", ()=>{
          REG.list = REG.list.filter(x=>x.id!==p.id);
          localStorage.removeItem("kittykana_"+p.id);
          if (REG.active===p.id) REG.active = null;
          saveReg(); showProfilePicker(!profile());
        });
    };
  });
  $("profileNew").onclick = ()=>{
    box.innerHTML = '<h1>😺 New Player</h1><div class="p-sub">What\'s your name?</div>'
      + '<input class="name-input" id="npName" maxlength="14" placeholder="Type your name…">'
      + '<div class="profile-tools"><button class="pill-btn primary big" id="npGo">Let\'s go! ▶</button>'
      + '<button class="pill-btn" id="npBack">← Back</button></div>';
    $("npName").focus();
    $("npGo").onclick = ()=>{
      const name = ($("npName").value||"").trim() || "Kitty";
      const id = "p"+Date.now().toString(36);
      REG.list.push({id, name});
      REG.active = id;
      saveReg(); // new profile starts fresh (no saved state yet = DEFAULTS)
      location.reload();
    };
    $("npBack").onclick = ()=>showProfilePicker(forced);
  };
  const bk = $("profileBackup");
  if (bk) bk.onclick = ()=>{
    let html2 = '<h1>💾 Backup</h1><div class="p-sub">Copy a player\'s code and keep it somewhere safe.<br>Paste it on another iPad with "Restore from code".</div>';
    REG.list.forEach(p=>{
      const code = btoa(unescape(encodeURIComponent(localStorage.getItem("kittykana_"+p.id)||"{}")));
      html2 += '<div class="pc-name">'+p.name+'</div><textarea class="code-input" readonly onclick="this.select()">'+code+'</textarea>';
    });
    html2 += '<div class="profile-tools"><button class="pill-btn" id="bkBack">← Back</button></div>';
    box.innerHTML = html2;
    $("bkBack").onclick = ()=>showProfilePicker(forced);
  };
  $("profileRestore").onclick = ()=>{
    box.innerHTML = '<h1>📥 Restore</h1><div class="p-sub">Paste a backup code and give the player a name.</div>'
      + '<input class="name-input" id="rsName" maxlength="14" placeholder="Player name…">'
      + '<textarea class="code-input" id="rsCode" placeholder="Paste the backup code here…"></textarea>'
      + '<div class="profile-tools"><button class="pill-btn primary" id="rsGo">Restore ▶</button>'
      + '<button class="pill-btn" id="rsBack">← Back</button></div>';
    $("rsGo").onclick = ()=>{
      try {
        const json = decodeURIComponent(escape(atob(($("rsCode").value||"").trim())));
        const st = JSON.parse(json);
        if (typeof st.xp !== "number") throw new Error("bad");
        const id = "p"+Date.now().toString(36);
        REG.list.push({id, name: ($("rsName").value||"").trim() || "Kitty"});
        REG.active = id;
        localStorage.setItem("kittykana_"+id, JSON.stringify(st));
        saveReg(); location.reload();
      } catch(e){
        toast("Hmm, that code didn't work 😿","Check that the whole code was copied and try again!");
      }
    };
    $("rsBack").onclick = ()=>showProfilePicker(forced);
  };
  const cancel = $("profileCancel");
  if (cancel) cancel.onclick = ()=>$("profileOverlay").classList.add("hidden");
}

// ── FX: confetti & ambient walking cats ─────────────────────────────
const CONFETTI = ["🌸","⭐","💮","🐾","✨","💖","🍡"];
function confetti(n){
  const layer = $("fxLayer");
  for (let i=0;i<n;i++){
    const s = document.createElement("div");
    s.className = "confetti";
    s.textContent = pick(CONFETTI);
    s.style.left = Math.random()*100+"vw";
    s.style.animationDuration = (2+Math.random()*2.5)+"s";
    s.style.animationDelay = (Math.random()*0.8)+"s";
    s.style.fontSize = (16+Math.random()*20)+"px";
    layer.appendChild(s);
    setTimeout(()=>s.remove(), 6000);
  }
}
function spawnWalker(){
  const unlocked = CAT_BREEDS.filter(c=>catUnlocked(c));
  const c = pick(unlocked);
  const w = document.createElement("div");
  w.className = "walker";
  const dur = 13 + Math.random()*10;
  w.style.animationDuration = dur+"s";
  w.style.bottom = (2+Math.random()*10)+"px";
  w.innerHTML = catSVG(c.id, "none", {size:76});
  $("catWalkLayer").appendChild(w);
  setTimeout(()=>w.remove(), dur*1000+500);
}
setInterval(()=>{ if(Math.random()<0.6) spawnWalker(); }, 26000);
setTimeout(spawnWalker, 7000);

// mini cats on progress bars
function initProgCats(){
  ["lessonProgCat","quizProgCat"].forEach(id=>{
    $(id).innerHTML = catSVG(S.activeCat, "none", {size:36});
  });
}

// ── Wire up navigation ──────────────────────────────────────────────
document.querySelectorAll("[data-nav]").forEach(b=>{
  b.addEventListener("click", ()=>{
    const nav = b.dataset.nav;
    if (nav==="collection"){ renderCollection(); return; }
    if (nav==="shop"){ renderShop(); return; }
    if (nav==="kanji" && !kanjiUnlocked()){
      toast("Kanji is coming! 🔒","Kanji unlocks after you finish <b>all Hiragana</b> lessons and at least <b>8 Katakana</b> lessons.<br>You're on your way! がんばって！");
      return;
    }
    restoreLessonHandlers();
    renderUnits(nav);
  });
});
$("homeBtn").onclick = () => { renderHome(); show("home"); };
$("dailyBtn").onclick = () => { initProgCats(); startChallenge(); };
$("homeCat").addEventListener("click", ()=>{
  sfxMeow();
  const jp = $("catBubble").dataset.jp;
  setTimeout(()=>speak(jp, 0.8), 400);
});
$("chipStreak").onclick = ()=> toast("Streak 🔥","Do the Daily Challenge every day to grow your streak!<br>Current: <b>"+S.streak+"</b> · Best: <b>"+S.bestStreak+"</b>");
$("chipLevel").onclick = ()=> toast("Level ⭐","You are level <b>"+level()+"</b> with <b>"+S.xp+"</b> XP.<br>Every lesson and challenge gives XP.<br>New cats appear as you level up! Total stars: <b>"+S.totalStars+"</b> ⭐");
$("chipFish").onclick = ()=> toast("Fish Treats 🐟","You have <b>"+S.fish+"</b> fish!<br>Earn fish from lessons and challenges, spend them in the Cat Shop!");

// warm up audio on first touch (iOS requirement)
document.body.addEventListener("touchstart", ()=>{ ac(); }, {once:true});
document.body.addEventListener("click", ()=>{ ac(); }, {once:true});

// streak decay check: if last challenge was more than 1 day ago, streak resets
function checkStreakDecay(){
  if (S.lastChallengeDay && S.lastChallengeDay !== todayKey()){
    const y = new Date(); y.setDate(y.getDate()-1);
    const yk = y.getFullYear()+"-"+String(y.getMonth()+1).padStart(2,"0")+"-"+String(y.getDate()).padStart(2,"0");
    if (S.lastChallengeDay !== yk){ S.streak = 0; save(); }
  }
}

$("chipProfile").onclick = ()=>showProfilePicker(false);

// ── boot ────────────────────────────────────────────────────────────
if (REG.active && profile()){
  loadState();
  checkStreakDecay();
  initProgCats();
  renderHome();
} else {
  showProfilePicker(true);
}

// register service worker for offline use (only works over http/https)
if ("serviceWorker" in navigator && location.protocol.startsWith("http")){
  navigator.serviceWorker.register("sw.js").catch(()=>{});
}
})();

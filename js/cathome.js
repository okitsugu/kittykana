/* ═══ KittyKana Cat Home — all your cats living together ═══ */
(function(){
"use strict";
const $ = id => document.getElementById(id);
let gen = 0;   // generation token: bumping it stops old behavior loops

const CAT_CHATTER = [
  ["にゃー！","nyaa! (meow!)"], ["だいすき！","I love you!"],
  ["あそぼう！","let's play!"], ["ねむいにゃ…","sleepy…"],
  ["おなかすいた！","I'm hungry!"], ["なでて！","pet me!"],
  ["いっしょにべんきょうしよう！","let's study together!"],
];

window.enterCatHome = function(){
  const KK = window.KK;
  gen++;
  const myGen = gen;
  const scene = $("catHomeScene");
  const hour = new Date().getHours();
  const night = hour >= 19 || hour < 6;
  scene.classList.toggle("night", night);
  // twinkly stars in the window at night
  const win = $("chWindow");
  win.querySelectorAll(".ch-star").forEach(s=>s.remove());
  if (night) for (let i=0;i<7;i++){
    const st = document.createElement("div");
    st.className = "ch-star"; st.textContent = "✦";
    st.style.left = (8+Math.random()*80)+"%";
    st.style.top = (8+Math.random()*70)+"%";
    win.appendChild(st);
  }

  const holder = $("chCats");
  holder.innerHTML = "";
  const residents = CAT_BREEDS.filter(c=>KK.catUnlocked(c)).slice(0, 10);
  const active = () => $("screen-cathome").classList.contains("active") && gen === myGen;

  residents.forEach((breed, i)=>{
    const size = 64 + Math.random()*26;
    const el = document.createElement("div");
    el.className = "ch-cat";
    el.style.left = (5 + Math.random()*72) + "%";
    el.style.bottom = (3 + Math.random()*14) + "%";
    el.style.zIndex = Math.round(120 - size);
    const draw = opts => { el.innerHTML = catSVG(breed.id, KK.outfitsFor(breed.id), Object.assign({size}, opts)); };
    draw();
    holder.appendChild(el);

    el.onclick = ()=>{
      KK.sfxMeow();
      const learned = KK.learnedWords();
      const line = (Math.random() < 0.6 && learned.length)
        ? (w => [w[0]+" "+(w[4]||""), w[2]])(KK.pick(learned))
        : KK.pick(CAT_CHATTER);
      bubble(el, line[0], line[1]);
      setTimeout(()=>KK.speak(line[0].replace(/[^぀-ヿ一-鿿ー！？…]/g,""), 0.85), 350);
    };

    // wandering-around behavior loop
    (function act(){
      if (!active()) return;
      const roll = Math.random();
      const sleepy = night ? 0.35 : 0.15;
      if (roll < sleepy){                       // nap
        draw({sleeping:true});
        bubble(el, "💤", null, 3000);
        setTimeout(()=>{ if (active()){ draw(); act(); } }, 4500 + Math.random()*3500);
      } else if (roll < sleepy + 0.45){          // stroll somewhere
        const from = parseFloat(el.style.left);
        const to = 4 + Math.random()*74;
        el.classList.toggle("flipped", to < from);
        el.classList.add("walking");
        el.style.left = to + "%";
        el.style.bottom = (3 + Math.random()*14) + "%";
        setTimeout(()=>{ el.classList.remove("walking"); if (active()) act(); }, 3000);
      } else if (roll < sleepy + 0.58){          // play with the yarn
        el.classList.add("playing");
        setTimeout(()=>{ el.classList.remove("playing"); if (active()) act(); }, 2400);
      } else {                                   // sit and watch
        setTimeout(()=>{ if (active()) act(); }, 1800 + Math.random()*2600);
      }
    })();
  });

  $("chTreatBtn").onclick = ()=>{
    const S = KK.state();
    if (S.fish < 1){ KK.toast("No fish yet! 🐟","Do a lesson or the Daily Challenge to earn fish treats for your cats!"); return; }
    S.fish--; KK.save(); KK.renderStats();
    const bowl = $("chBowl");
    bowl.textContent = "🥣🐟";
    const cats = [...holder.children];
    const lucky = cats[Math.floor(Math.random()*cats.length)];
    if (lucky){
      lucky.classList.add("walking");
      lucky.classList.add("flipped");
      lucky.style.left = "13%";
      lucky.style.bottom = "5%";
      setTimeout(()=>{
        lucky.classList.remove("walking");
        KK.sfxMeow();
        bubble(lucky, "💖 おいしい！", "yummy!");
        bowl.textContent = "🥣";
        KK.tone(880,0,.15); KK.tone(1100,.14,.2);
      }, 3000);
    }
  };

  KK.show("cathome");
};

function bubble(el, text, sub, life){
  el.querySelectorAll(".ch-bubble").forEach(b=>b.remove());
  const b = document.createElement("div");
  b.className = "ch-bubble";
  b.innerHTML = text + (sub ? '<span class="sub">'+sub+'</span>' : '');
  el.appendChild(b);
  setTimeout(()=>b.remove(), life || 2600);
}
})();

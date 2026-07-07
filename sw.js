// KittyKana service worker — cache everything for offline use
const CACHE = "kittykana-v2";
const ASSETS = [
  ".", "index.html", "css/style.css",
  "js/kana.js", "js/vocab.js", "js/kanji.js", "js/cats.js", "js/app.js",
  "manifest.json", "icon.svg", "icon-180.png"
];
self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(()=>self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))
  ).then(()=>self.clients.claim()));
});
// network-first so updates arrive right away; cache is the offline fallback
self.addEventListener("fetch", e => {
  e.respondWith(
    fetch(e.request).then(res => {
      if (res.ok && e.request.method === "GET" && new URL(e.request.url).origin === location.origin){
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, copy));
      }
      return res;
    }).catch(() =>
      caches.match(e.request).then(hit => hit || caches.match("index.html"))
    )
  );
});

# 🐱 KittyKana — ねこの にほんご

A cat-themed Japanese learning app for kids, built to run full-screen on an iPad like a native app.

## What's inside

- **Hiragana** — 15 lessons: all 46 basic characters, dakuten (゛゜) sounds, and combo sounds (きゃ, しゃ…), each with audio, example words, and a quiz.
- **Katakana** — 15 matching lessons using fun loanwords (アイスクリーム, ロボット…).
- **Words** — 954 words in 96 self-paced word packs (10 words each) with pictures and audio.
- **Kanji** — 100 essential kanji (all 80 first-grade kanji + 20 useful second-grade ones). Locks until hiragana is finished and katakana is mostly done, so it comes later in the curriculum.
- **Daily Challenge** — 15 new words every day with a quiz, streaks, and exclusive rewards. The word list + kana + kanji + mastery stars add up to well over a year of daily content; challenge-exclusive unlocks are spaced out to day 365.
- **Audio everywhere** — every kana character plays a **real human recording** of a native speaker (public-domain recordings from Wikimedia Commons, converted to iPad-friendly .m4a and cached for offline). Words, phrases, and combo sounds use the iPad's built-in Japanese voice (Kyoko). Cats meow too.
- **Cat collection** — 22 unlockable cartoon cat breeds (calico, siamese, ninja cat, space cat, rainbow cat, dragon cat…), 70+ outfit pieces, and 8 cat moves/animations. Cats randomly stroll across the screen, and a tiny cat walks along the progress bar during lessons.
- **Cat Shop & outfit slots** — earn 🐟 fish from lessons and spend them across 7 clothing categories (hats, hair pins, glasses, scarves & necklaces, jackets & tops, pants & skirts, wings & extras). One item per category can be worn at the same time, so cats can rock a full look — cap + glasses + denim jacket + jeans. Every shop item is previewed on your own cat.
- **Multiple players** — a "Who's playing?" screen lets each kid have her own profile with separate progress, cats, outfits, streaks and fish. Add/switch players anytime via the name chip in the top bar.
- Progress is saved on the device automatically (localStorage, per profile). Works offline once loaded (service worker).

## Saves, backups & moving between iPads

Progress lives **on the device** (in Safari's storage for the site) — there is no server and no account. Two things to know:

- **Backup codes:** on the "Who's playing?" screen, tap **💾 Backup code** to get a copyable code of a player's entire progress. Paste it into **📥 Restore from code** on any other device (or the same one after a mishap). Good idea to save a code somewhere occasionally.
- Because saves are tied to Safari's website data, avoid "Clear History and Website Data" on the iPad — that would erase progress (backup codes are your safety net).
- True cloud sync would require adding a backend (e.g. Firebase/Supabase) and logins — doable later if ever needed; the profile + backup-code system covers the family-on-one-iPad case without it.

## How to put it on the iPad

The app is plain HTML/CSS/JS — it just needs to be served over HTTP(S). Two easy options:

### Option A: Free hosting (recommended — works anywhere, updates easily)
1. Create a free GitHub account and a new repository (e.g. `kittykana`).
2. Upload the contents of this folder to the repository.
3. In the repo: Settings → Pages → Source: `main` branch → Save.
4. After a minute your app is live at `https://okitsugu.github.io/kittykana/`.
5. On the iPad, open that URL **in Safari**, tap the Share button, and choose **"Add to Home Screen."**

### Option B: Serve from your Mac (same Wi-Fi only)
```bash
cd kittykana
python3 -m http.server 8000
```
Then on the iPad open `http://<your-mac's-ip>:8000` in Safari and "Add to Home Screen."

Once added to the Home Screen, it opens full-screen with its own cat icon — no browser bars — and looks and feels like a real iPad app.

### One-time audio check
The app uses the iPad's built-in Japanese voice. It works out of the box on iPadOS; for the nicest voice you can optionally download an enhanced one: Settings → Accessibility → Spoken Content → Voices → Japanese → Kyoko (Enhanced).

## Audio credits

The kana pronunciation clips in `audio/kana/` are public-domain recordings by Wikimedia Commons contributor **Hakatanoshio117117** (the "Japanese あ…ぽ" pronunciation series), trimmed and converted to .m4a for this app. No attribution is legally required (public domain), but credit where credit is due. Words and phrases use the device's built-in Japanese text-to-speech.

## Tips for the grown-up

- **Daily rhythm:** the Daily Challenge introduces 15 new words/day and keeps a 🔥 streak. Doing it twice offers "bonus practice" instead so kids can't burn through the year of content in one sitting.
- **Stars:** each lesson gives up to ⭐⭐⭐ (90%+ = 3 stars). Replaying lessons to improve stars unlocks cat moves.
- **Resetting progress:** delete the player on the "Who's playing?" screen (✕ on their card) and create a fresh one.

# 🎓 GOTO — Aman Ka Project Guide
### (India History Visual Project — Complete Explanation)

---

## 🧭 Yeh File Kya Hai?
Yeh file **sirf tere liye** banayi gayi hai, Aman. Is file mein tera **poora project explain** kiya gaya hai — bilkul simple language mein. Koi code change nahi hoga, sirf **seekhna** hai.

---

## 🗂️ Project Ka Naam: `history-visual`

**Yeh kya hai?** Yeh ek **Indian History ka interactive website** hai — jisme:
- Timeline pe India ka pura itihas dikhta hai (Paleolithic se Modern India tak)
- Alag alag eras pe click karo toh **photos, videos, audio, articles** milte hain
- Bahut sundar dark golden design hai — jaise koi purana museum

**Technology Stack (Kaunsi cheezein use hui hain):**

| Technology | Kya Hai | Kahan Use Hua |
|---|---|---|
| **Next.js** | React ka advanced framework | Pura project |
| **React** | JavaScript library for UI | Har component |
| **TypeScript** | JavaScript + Types (safer code) | `.tsx` files mein |
| **Framer Motion** | Animation library | Smooth transitions |
| **Tailwind CSS** | CSS classes se styling | Har element |
| **Lucide React** | Icons library | Buttons ke icons |

> **Note:** Is project mein **do (2) versions** hain:
> 1. **Vite Version (`src/` folder):** Yeh abhi chal raha hai (`npm run dev` se). Iski main file `src/App.jsx` hai.
> 2. **Next.js Version (`app/` folder):** Yeh future ke liye hai (ya purana hai). Iski main file `app/page.tsx` hai.
> 
> Dono ka design same hai, lekin code alag alag folders mein hai. Aman, confuse mat hona!

---

## 📁 PROJECT KI FOLDER STRUCTURE — Har Folder Kya Karta Hai

```
history-visual/
│
├── 📁 app/                    ← SABSE IMPORTANT — Website ka dil
│   ├── page.tsx               ← Main page (entry point of website)
│   ├── layout.tsx             ← Website ka outer wrapper (HTML head etc.)
│   ├── globals.css            ← Global styles
│   └── 📁 data/
│       └── timeline.ts        ← SABSE BADA DATA FILE — India ka poora itihas yahan hai
│
├── 📁 components/             ← Reusable UI pieces (jaise building blocks)
│   ├── ExpandableTimelineItem.tsx   ← SABSE BADI FILE — Timeline card + media player
│   ├── LandingPageItem.tsx          ← Era selection cards (Ancient/Medieval/Modern)
│   ├── IndiascopeDashboard.tsx      ← Dashboard (Culture/Art/History grid)
│   ├── CategoryDetails.tsx          ← Category detail pages
│   ├── FogOverlay.tsx               ← Background mist/fog effect
│   └── VerticalZigZagPath.tsx       ← Timeline ka zigzag path (SVG line)
│
├── 📁 public/                 ← Sabhi media files (images, videos, audio)
│   ├── 📁 PHOTOS/             ← ~200+ historical images
│   ├── 📁 VIDEOS/             ← Historical era videos (.mp4)
│   ├── 📁 AUDIO/              ← Audio narrations (.mp3)
│   └── 📁 TOOLS/              ← Tool/weapon images for each era
│
├── 📁 styles/                 ← Extra CSS files
├── 📁 src/                    ← Purana Vite wala code (legacy, use nahi ho raha)
├── 📁 legacy_files/           ← Original HTML/JS files (archive)
├── 📁 node_modules/           ← npm packages (khud install hote hain)
│
├── package.json               ← Project ki ID card + commands
├── next.config.ts             ← Next.js settings
├── tsconfig.json              ← TypeScript settings
├── vite.config.js             ← Vite settings
└── GOTO_aman.md               ← YEH FILE (teri guide!)
```

---

## 🚀 WEBSITE KAISE CHALTA HAI — Flow Samajh

Website open hone par yeh steps hote hain:

```
User opens localhost:3000
        ↓
app/layout.tsx loads (HTML wrapper)
        ↓
app/page.tsx loads (Main page - yahan sab control hota hai)
        ↓
Website 5 views mein kaam karta hai:
  1. "intro"      → Intro screen (IndiascopeIntro component)
  2. "dashboard"  → Category grid (IndiascopeDashboard)
  3. "category"   → Specific category details (CategoryDetails)
  4. "periods"    → Ancient / Medieval / Modern choice (LandingPageItem)
   5. "timeline"   → Actual timeline (ExpandableTimelineItem)

**Note about Intro:** Vite version mein intro `src/components/Home.jsx` mein hai, aur Next.js version mein `app/page.tsx` mein (jisme `IndiascopeIntro` missing hai).
```

---

## 📄 FILE BY FILE EXPLANATION

---

### 1️⃣ `app/page.tsx` — WEBSITE KA BRAIN (197 lines)

**Yeh kya hai?**
Yeh sabse important file hai. Yahan se **poori website control hoti hai**. Kaunsa view dikhana hai, kya selected hai — sab yahan manage hota hai.

**Key Concepts:**

```tsx
// VIEW STATE — Website ka current screen
type ViewState = "intro" | "dashboard" | "category" | "periods" | "timeline";
const [view, setView] = useState<ViewState>("intro");
```
Yeh ek "state" hai — jaise ek register jisme likha hota hai "abhi konsa page show karo". 
- `"intro"` → loading screen
- `"dashboard"` → main menu
- `"periods"` → Ancient/Medieval/Modern choose karo
- `"timeline"` → history timeline

```tsx
// SELECTED PERIOD — Konsa era selected hai
const [selectedPeriod, setSelectedPeriod] = useState<"ancient" | "medieval" | "modern" | null>(null);
```
Jab user "Ancient" press karta hai, toh `selectedPeriod = "ancient"` ho jaata hai.

```tsx
// DATA FILTERING — Sirf selected period ka data lo
const filteredTimelineData = useMemo(() => {
    if (!selectedPeriod) return [];
    return TIMELINE_DATA.filter((item) => item.period === selectedPeriod);
}, [selectedPeriod]);
```
`TIMELINE_DATA` mein 26 events hain. Yeh code sirf us period ke events filter karta hai.

**Background kaise bana?**
```tsx
<Image
  src="https://upload.wikimedia.org/wikipedia/commons/.../India_map_1700_1792.jpg"
  className="opacity-40 grayscale brightness-[0.3]"
/>
```
Wikipedia se India ka purana map liya, dark + grainy filter lagaya. Ekdum museum jaisi feel!

**AnimatePresence kya hai?**
Jab ek view se doosre view pe jaate hain toh smooth fade animation hota hai. Yeh `framer-motion` ka kaam hai.

---

### 2️⃣ `app/data/timeline.ts` — INDIA KA POORA ITIHAS (588 lines)

**Yeh kya hai?**
Yeh file ek bada **data store** hai. Jaise ek kitaab jisme sab facts likhein hain. Koi server nahi, koi database nahi — sab yahan hardcoded hai.

**Data Structure (Ek event kaisa dikhta hai):**

```typescript
// Interface = ek template / blueprint
export interface TimelineItem {
  id: string;           // unique name ("paleolithic")
  title: string;        // "Paleolithic Age (2.5M–10,000 BCE)"
  description: string;  // short description
  image: string;        // "/PHOTOS/PALEOLITHIC 1 .png"
  alignment: "left" | "right"; // card left ya right jagah pe
  yPercentage: number;  // timeline pe position (%)
  period?: "ancient" | "medieval" | "modern"; // kaunse era mein
  subItems?: SubItem[]; // click karne pe ane wali mini-cards
}
```

**SubItem kya hai?**
Har main event ke andar chhote sub-events hote hain. Jaise "Mauryan Empire" ke andar:
- "Foundation" (321 BCE)
- "Expansion" (305 BCE)
- "Ashoka" (273 BCE)
- "Decline" (232 BCE)

**Total Events:**
| Period | Events |
|---|---|
| Ancient | 10 events |
| Medieval | 5 events |
| Modern | 11 events |
| **Total** | **26 events** |

---

### 3️⃣ `components/ExpandableTimelineItem.tsx` — SABSE BADA COMPONENT (775 lines)

**Yeh kya hai?**
Yeh file ek **timeline card** hai jo:
1. Photo + title + description dikhata hai
2. Click karne pe **expand** hota hai
3. Sub-items (mini cards) dikhata hai
4. Har mini card mein **Photos / Video / Audio / Map / Article / Tools** switch kar sakte hain
5. Article full screen mein open ho sakta hai
6. **Text-to-Speech** button bhi hai (article read karta hai)

**Main States (Variables jo website yaad rakhti hai):**

```tsx
const [currentPage, setCurrentPage] = useState(0);
// Sub-items 4-4 ke groups mein aate hain, yeh current page track karta hai

const [subItemModes, setSubItemModes] = useState<Record<string, MediaMode>>({});
// Har sub-item ka apna mode (Photos/Video/Audio/etc.) yaad rakhta hai

const [selectedSubItemTitle, setSelectedSubItemTitle] = useState<string | null>(null);
// Konsi mini card selected (badi) hai

const [expandedArticle, setExpandedArticle] = useState<...>(null);
// Full screen article open hai ya nahi

const [isSpeaking, setIsSpeaking] = useState(false);
// Text-to-speech chal raha hai ya nahi
```

**Media Modes — 6 Types:**

| Mode | Kya Dikhata Hai |
|---|---|
| 📷 Photos | Historical image |
| 📹 Video | MP4 video (autoplay) |
| 🎧 Audio | Spotify-style audio player |
| 🗺️ Map | Geographic map image |
| 📰 Article | Purane newspaper jaisi article |
| 🔧 Tools | Tools/weapons of that era |

**getMediaPaths() Function — Media ka Address:**
```tsx
const getMediaPaths = (eraTitle: string) => {
    // eraTitle ke basis pe sahi video/audio/tool return karta hai
    if (title.includes("gupta")) video = "/VIDEOS/Gupta_empire_...mp4";
    if (title.includes("mesolithic")) audio = "/AUDIO/Mesolithic Age.mp3";
    // etc.
}
```
Har era ka apna specific media file hai — title mein keyword check karke sahi file milti hai.

**getArticleContent() Function — Article ka Text:**
```tsx
const getArticleContent = (eraTitle: string) => {
    if (title.includes("paleolithic")) return "The Paleolithic Age in India...";
    if (title.includes("gupta")) return "The Gupta Empire is known as...";
    // etc.
}
```

**SpotifyAudioPlayer Component (Lines 453-547):**
Yeh ek audio player hai jo Spotify jaisa dikhta hai — play/pause button, progress bar, animated visualizer bars.

**SubItemCard Component (Lines 549-737):**
Har mini card yeh component hai. Jab select hota hai toh bada (480px) hota hai, normal state mein chhota (180px) hota hai — `framer-motion` se smooth animation hoti hai.

**SidebarIcon Component (Lines 746-772):**
Right side pe 6 icons hain (Photos, Video, Audio, Map, Article, Tools). Yeh `SidebarIcon` component hai.

---

### 4️⃣ `components/LandingPageItem.tsx` — ERA SELECTION CARD (96 lines)

**Yeh kya hai?**
Yeh component "Periods" screen pe dikhta hai jahan **Ancient, Medieval, Modern** choose karte hain.

**Zig-Zag Layout:**
```tsx
const isLeft = index % 2 === 0;
// index 0 (Ancient) → left side
// index 1 (Medieval) → right side  
// index 2 (Modern) → left side
// 0,2,4 = left, 1,3,5 = right → ZIG-ZAG!
```

Hover pe:
- Image thodi badi hoti hai (scale: 1.05)
- Golden glow aata hai
- Amber/golden color mein change hota hai

---

### 5️⃣ `components/IndiascopeDashboard.tsx` — MAIN MENU GRID (57 lines)

**Yeh kya hai?**
Website open karne ke baad yeh pehla screen hai. 6 category cards hain:

```
Culture | Art | Food History | Festivals | History | Timeline
```

Har card pe click karne se:
- "Timeline" → Timeline periods page pe jaata hai  
- Baaki (Culture, Art, etc.) → `CategoryDetails` component mein jaata hai

---

### 6️⃣ `components/FogOverlay.tsx` — FOG EFFECT (28 lines)

**Yeh kya hai?**
Background pe ek subtle fog/mist effect. Museum + purane medieval feel ke liye.

---

### 7️⃣ `components/VerticalZigZagPath.tsx` — TIMELINE PATH (SVG line)

**Yeh kya hai?**
Timeline pe jo curved/zig-zag line dikhti hai woh SVG mein bani hai. `count` prop se pata chalta hai kitne events hain aur line kitni lambi hogi.

---

### 8️⃣ `components/CategoryDetails.tsx` — CATEGORY DETAIL PAGE

**Yeh kya hai?**
Jab Dashboard pe Culture/Art/Food History/Festivals pe click karo toh yeh page aata hai. Har category ka apna info page.

---

## 📁 PUBLIC FOLDER — Sabhi Media Files

```
public/
├── PHOTOS/    → ~200+ PNG/JPG images — ek per sub-event
├── VIDEOS/    → ~16 MP4 files — ek per major era
├── AUDIO/     → 5 MP3 files — Paleolithic, Mesolithic, Neolithic, etc.
├── TOOLS/     → ~40 PNG files — ek per era (tools/weapons)
└── fonts/     → Custom fonts
```

> **Naming pattern:** Files ka naam era ke hisaab se rakha gaya hai, jaise:
> - `"/VIDEOS/Gupta_empire_...mp4"` → Gupta era ka video
> - `"/AUDIO/Mesolithic Age.mp3"` → Mesolithic era ki audio

---

## ⚙️ CONFIGURATION FILES

### `package.json` — Project Ki ID Card
```json
{
  "name": "lending-page",
  "scripts": {
    "dev": "vite",          ← npm run dev se chalta hai
    "build": "vite build",  ← production build
  },
  "dependencies": {
    "react": "^19.2.4",
    "framer-motion": "^11.11.17",  ← animations
    "lucide-react": "^0.454.0",    ← icons
    "react-router-dom": "^7.13.0"  ← page routing
  }
}
```

> **Important:** `package.json` mein `"dev": "vite"` likha hai — isliye `npm run dev` se local server chalta hai.

### `next.config.ts` — Next.js Settings
External images (Wikipedia URL) allow karne ke liye configuration.

### `tsconfig.json` — TypeScript Settings
`@/` path alias set karta hai — isliye code mein `import { X } from "@/components/X"` likhte hain full path ke bajaye.

---

## 🔄 REACT KE KEY CONCEPTS — Jo Is Project Mein Use Hue

### 1. State (`useState`)
```tsx
const [view, setView] = useState("intro");
// view = current value
// setView = value change karne ka function
// "intro" = starting value
```
State = website ki **memory**. Jab state change hoti hai, React automatically screen update karta hai.

### 2. Props (Parent se Child ko data bhejta hai)
```tsx
// Parent (page.tsx) yeh data bhejta hai:
<ExpandableTimelineItem
    item={item}          // ← prop
    isExpanded={true}    // ← prop
    onToggle={myFunc}    // ← prop (function)
/>

// Child (ExpandableTimelineItem.tsx) yeh receive karta hai:
const ExpandableTimelineItem = ({ item, isExpanded, onToggle }) => {
    // ab item, isExpanded, onToggle use kar sakte hain
}
```

### 3. Component (Reusable Building Block)
```tsx
// Ek component ek function hai jo JSX return karta hai
const MyButton = ({ label }) => {
    return <button>{label}</button>;
};

// Use karo jaise HTML element:
<MyButton label="Click Me" />
```

### 4. `useEffect` (Side effects — page load pe kuch karo)
```tsx
React.useEffect(() => {
    if (!expandedArticle) {
        window.speechSynthesis.cancel(); // Article band hone pe speech rok do
        setIsSpeaking(false);
    }
}, [expandedArticle]); // expandedArticle change hone pe yeh chale
```

### 5. `useMemo` (Heavy calculation cache karna)
```tsx
const filteredTimelineData = useMemo(() => {
    return TIMELINE_DATA.filter((item) => item.period === selectedPeriod);
}, [selectedPeriod]); // sirf tab recalculate karo jab selectedPeriod change ho
```

---

## 🎨 FRAMER MOTION — Animations Kaise Kaam Karti Hain

```tsx
// Normal div ke bajaye motion.div use karo:
<motion.div
    initial={{ opacity: 0, y: 20 }}  // pehle: transparent, neeche
    animate={{ opacity: 1, y: 0 }}   // ab: visible, normal position
    exit={{ opacity: 0, y: -20 }}    // jaate waqt: oopar fade out
    transition={{ duration: 0.5 }}   // 0.5 seconds mein
>
    Content
</motion.div>

// AnimatePresence — jab component remove ho toh exit animation karo:
<AnimatePresence>
    {isVisible && <motion.div exit={{opacity: 0}}>...</motion.div>}
</AnimatePresence>

// whileHover — hover pe:
<motion.div whileHover={{ scale: 1.05 }}>
    Hover karo mujhpe!
</motion.div>
```

---

## 🗺️ USER JOURNEY — Website Pe User Kya Karta Hai

```
1. Website open hoti hai → INTRO screen dikhti hai
        ↓ (Intro complete hoti hai)
2. DASHBOARD dikhta hai (Culture, Art, History, Timeline cards)
        ↓ (User "Timeline" pe click karta hai)
3. PERIODS page dikhta hai (Ancient / Medieval / Modern)
        ↓ (User "Ancient" pe click karta hai)
4. TIMELINE dikhti hai — Ancient ke saare events (10 events, zigzag)
        ↓ (User "Mauryan Empire" card pe click karta hai)
5. Card EXPAND hota hai — Sub-items dikhte hain (Foundation, Ashoka, etc.)
        ↓ (User "Ashoka" card pe click karta hai)
6. Ashoka card SELECT hota hai (bada ho jaata hai)
        ↓ (User "Video" icon pe click karta hai)
7. VIDEO play hota hai — Mauryan Empire ka documentary video
        ↓ (User "Article" icon pe click karta hai)
8. ARTICLE dikhti hai — Newspaper style content
        ↓ (User "Read Full Record" pe click karta hai)
9. FULL SCREEN article modal aata hai
        ↓ (User 🔊 button pe click karta hai)
10. TEXT-TO-SPEECH — Article read aloud hoti hai!
```

---

## 💡 FRONTEND vs BACKEND — Is Project Mein Kya Hai?

| | Is Project Mein |
|---|---|
| **Frontend** | ✅ Haan — React/Next.js se poora UI |
| **Backend** | ❌ Nahi — koi server nahi |
| **Database** | ❌ Nahi — data `timeline.ts` mein hardcoded |
| **API Calls** | ❌ Sirf Wikipedia image URL ke liye |
| **Node.js** | ✅ Haan — but sirf dev server run karne ke liye |
| **Express** | ❌ Nahi |

> **Sikhne ke liye:** Agar tu Node + Express seekhna chahta hai toh uske liye ek alag backend project banana hoga — jaise ek API server jo database se data fetch kare aur is frontend ko data de.

---

## 🔧 WEBSITE KAISE CHALATE HAIN

```powershell
# Terminal mein yeh type karo:
cd d:\Desktop\history-visual
npm run dev

# Phir browser mein jaao:
# http://localhost:3000
```

---

## 📚 SEEKHNE KA ORDER — Aman Ke Liye Roadmap

Agar tu React seekhna chahta hai, toh is order mein seekh:

### Step 1 — JavaScript Basics (1-2 weeks)
- Variables (`let`, `const`)
- Functions (arrow functions `=>`)
- Arrays aur Objects
- `.map()`, `.filter()` methods

### Step 2 — React Basics (2-3 weeks)
- `useState` hook
- Props
- Components
- JSX (HTML + JS mix)
- `useEffect`

### Step 3 — Is Project Ko Samajh (1 week)
- `app/page.tsx` line by line padh
- `app/data/timeline.ts` ka structure samajh
- `components/LandingPageItem.tsx` — simple component (96 lines only)
- `components/IndiascopeDashboard.tsx` — 57 lines, bahut easy

### Step 4 — Advanced (2-3 weeks)
- TypeScript (`.tsx` files)
- Framer Motion animations
- Next.js routing
- `components/ExpandableTimelineItem.tsx` — bada but khubsurat!

---

## ❓ FAQS — Common Questions

**Q: `@/` ka matlab kya hai? (jaise `import { X } from "@/components/X"`)**
A: Yeh ek shortcut hai. `@/` ka matlab hai project ka root folder. Isliye `@/components/X` = `d:\Desktop\history-visual\components\X`.

**Q: `.tsx` vs `.ts` vs `.jsx` vs `.js` kya hai?**
A: `.js` = JavaScript, `.ts` = TypeScript (safer JS), `.jsx` = JavaScript + HTML (React), `.tsx` = TypeScript + HTML (React). Is project mein mostly `.tsx` use hua hai.

**Q: `npm run dev` karne ke baad `npm` kya hai?**
A: NPM = Node Package Manager. Jab tune pehli baar project run kiya hoga aur `npm install` kiya hoga, tab sare packages (framer-motion, react, etc.) download hue. Ab `npm run dev` se local website chalta hai.

**Q: Mujhe React seekhne ke liye kahan jaana chahiye?**
A: 
- [react.dev](https://react.dev) — Official docs (English)
- YouTube pe "React tutorial Hindi" search karo

---

## 🏁 SUMMARY — Ek Line Mein Sab

> **Yeh website ek Next.js + React frontend app hai jo TypeScript mein likhi gayi hai. Koi backend/server/database nahi hai — sab data `timeline.ts` mein hardcoded hai. Framer Motion se animations hain aur Tailwind CSS se dark golden styling hai. Teri website India ka poora itihas ek interactive timeline mein dikhati hai — photos, videos, audio, maps, aur articles ke saath.**

---

*File banai gayi: 21 February 2026 | Aman ke liye ❤️*

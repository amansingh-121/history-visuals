export interface SubItem {
  title: string;
  date: string;
  points: string[];
  keyDevelopment?: string;
  image?: string;
  isSmallImage?: boolean;
}

export interface TimelineItem {
  id: string;
  title: string;
  description: string;
  image: string;
  alignment: "left" | "right";
  yPercentage: number;
  isSmall?: boolean;
  subItems?: SubItem[];
  period?: "ancient" | "medieval" | "modern";
}

export const TIMELINE_DATA: TimelineItem[] = [
  // --- ANCIENT PERIOD ---
  {
    id: "paleolithic",
    title: "Paleolithic Age (2.5M–10,000 BCE)",
    description: "The Stone Age: First tools, fire, and the dawn of human civilization.",
    image: "/PHOTOS/PALEOLITHIC 1 .png",
    alignment: "left",
    yPercentage: 2,
    period: "ancient",
    subItems: [
      {
        title: "Lower Paleolithic",
        date: "c. 2.5 million – 300,000 BCE",
        points: ["First stone tools (Oldowan)", "Homo habilis & Homo erectus", "Control of fire"],
        keyDevelopment: "Survival through tools and fire 🔥",
        image: "/PHOTOS/lower paleolithic.png",
        isSmallImage: true,
      },
      {
        title: "Middle Paleolithic",
        date: "c. 300,000 – 50,000 BCE",
        points: ["Neanderthals & early Sapiens", "Mousterian tools", "Burial practices"],
        keyDevelopment: "Social behavior and hunting 🏹",
        image: "/PHOTOS/middle paleolithic.png",
        isSmallImage: true,
      },
      {
        title: "Upper Paleolithic",
        date: "c. 50,000 – 10,000 BCE",
        points: ["Modern humans (Homo sapiens) dominate", "Cave paintings & carvings", "Complex social groups"],
        keyDevelopment: "Art, culture, and symbolic thinking 🎨",
        image: "/PHOTOS/UPPER PALEOLITHIC.png",
        isSmallImage: true,
      },
    ],
  },
  {
    id: "mesolithic",
    title: "Mesolithic Age (10,000–5,000 BCE)",
    description: "Climate shift and microlith tools.",
    image: "/PHOTOS/MESOLATHIC 1.png",
    alignment: "right",
    yPercentage: 7,
    period: "ancient",
    subItems: [
      { title: "Adaptation", date: "c. 10k BCE", points: ["Post-Ice Age climate shift"], image: "/PHOTOS/10,000 BCE NEOLITHIC.png", isSmallImage: true },
      { title: "Microliths", date: "c. 9k BCE", points: ["Small stone tools", "Bows & arrows"], image: "/PHOTOS/c. 9,000 BCE NEOLITHIC.png", isSmallImage: true },
      { title: "Settlements", date: "c. 8k BCE", points: ["Semi-permanent settlements"], image: "/PHOTOS/EARLY SETTTLEMENET  MESOLATHIC.png", isSmallImage: true },
    ],
  },
  {
    id: "neolithic",
    title: "Neolithic Age (10,000–2,000 BCE)",
    description: "Agricultural Revolution: Farming and permanent villages.",
    image: "/PHOTOS/NEOLITHIC 1.png",
    alignment: "left",
    yPercentage: 12,
    period: "ancient",
    subItems: [
      { title: "Farming", date: "10k BCE", points: ["Domestication of plants and animals"], image: "/PHOTOS/10,000 BCE NEOLITHIC.png", isSmallImage: true },
      { title: "Jericho", date: "9k BCE", points: ["Mud-brick houses"], image: "/PHOTOS/c. 9,000 BCE NEOLITHIC.png", isSmallImage: true },
      { title: "Specialization", date: "5k BCE", points: ["Crafts & pottery"], image: "/PHOTOS/5000 BCE NEOLITHIC.png", isSmallImage: true },
    ],
  },
  {
    id: "chalcolithic",
    title: "Chalcolithic Age (3,500–1,500 BCE)",
    description: "The Copper Age transition.",
    image: "/PHOTOS/chalcholathic.png",
    alignment: "right",
    yPercentage: 17,
    period: "ancient",
    subItems: [
      { title: "Copper tools", date: "3500 BCE", points: ["Use of copper tools", "Early farming villages"], image: "/PHOTOS/c. 3,500 BCE CHALCOLITHIC.png", isSmallImage: true },
      { title: "Growth", date: "3000 BCE", points: ["Agricultural communities", "Painted pottery"], image: "/PHOTOS/3,000 BCE CHALCOLATHIC.png", isSmallImage: true },
      { title: "Advancement", date: "2500 BCE", points: ["Advanced copper tools", "Craft specialization"], image: "/PHOTOS/2500 BCE CHALCOLATICS (2).png", isSmallImage: true },
      { title: "Proto-urban", date: "2000 BCE", points: ["Larger villages", "Long-distance trade"], image: "/PHOTOS/2000 BCE CHALCOLATIIC .png", isSmallImage: true },
      { title: "Transition", date: "1500 BCE", points: ["Decline of Chalcolithic", "Bronze Age begins"], image: "/PHOTOS/1500 BCE CHALCOLATHIC.png", isSmallImage: true },
    ],
  },
  {
    id: "proto-historic",
    title: "Proto-Historic Period (1,500–500 BCE)",
    description: "Iron Age and early Janapadas.",
    image: "/PHOTOS/proto history.png",
    alignment: "left",
    yPercentage: 22,
    period: "ancient",
    subItems: [
      { title: "Beginning", date: "1500 BCE", points: ["Bronze & early iron tools", "Rural settlements"], image: "/PHOTOS/1500 bce protohistory.png", isSmallImage: true },
      { title: "Iron Age", date: "1200 BCE", points: ["Widespread iron tools", "Iron ploughs boost agriculture"], image: "/PHOTOS/1200 bce protohistory.png", isSmallImage: true },
      { title: "Painted Grey Ware", date: "1000 BCE", points: ["PGW culture", "Tribal kingdoms"], image: "/PHOTOS/1000 bce protohistory (2).PNG", isSmallImage: true },
      { title: "Early States", date: "800 BCE", points: ["Formation of janapadas", "Structured rituals"], image: "/PHOTOS/800 bce protohistory (2).png", isSmallImage: true },
      { title: "Urban Centers", date: "600 BCE", points: ["Early writing & coinage", "Political systems"], image: "/PHOTOS/600 bce protohistory (2).png", isSmallImage: true },
    ],
  },
  {
    id: "indus-valley",
    title: "Indus Valley Civilization (3300–1300 BCE)",
    description: "Urban planning and Harappan culture.",
    image: "/PHOTOS/indus valley civilization .png",
    alignment: "right",
    yPercentage: 27,
    period: "ancient",
    subItems: [
      { title: "Early Harappan", date: "3300-2600 BCE", points: ["Early settlements", "Mud-brick houses", "Early trade"], image: "/PHOTOS/early harappan phase.png", isSmallImage: true },
      { title: "Mature Phase", date: "2600-1900 BCE", points: ["Planned cities", "Drainage systems", "Seals & script"], image: "/PHOTOS/mature harappan phase.png", isSmallImage: true },
      { title: "Late Phase", date: "1900-1300 BCE", points: ["Urban decline", "Population shifts"], image: "/PHOTOS/late harappan phase.png", isSmallImage: true },
    ],
  },
  {
    id: "vedic",
    title: "Vedic Period (1500–500 BCE)",
    description: "Rigveda to Mahajanapadas.",
    image: "/PHOTOS/VEDIC_PERIODS_1.png",
    alignment: "left",
    yPercentage: 32,
    period: "ancient",
    subItems: [
      { title: "Rigvedic Period", date: "1500 BCE", points: ["Indo-Aryan settlement", "Rigveda composition", "Pastoral economy"], image: "/PHOTOS/1500 bce vedic periods.png", isSmallImage: true },
      { title: "Expansion", date: "1200 BCE", points: ["Punjab to Ganga region", "Simple rituals"], image: "/PHOTOS/1200 bce vedic periods.png", isSmallImage: true },
      { title: "Later Vedic", date: "1000 BCE", points: ["Iron tools", "Varna system", "Agriculture dominates"], image: "/PHOTOS/1000 bce  later vedic periods.png", isSmallImage: true },
      { title: "Vedic Literature", date: "800 BCE", points: ["Samaveda, Yajurveda", "Complex rituals"], image: "/PHOTOS/800 bce later vedic periods.png", isSmallImage: true },
      { title: "Upanishads", date: "600 BCE", points: ["Philosophical thought", "Janapadas emerge"], image: "/PHOTOS/600 bce later vedic periods.png", isSmallImage: true },
    ],
  },
  {
    id: "mahajanapadas",
    title: "Mahajanapadas & New Religions (600–321 BCE)",
    description: "Rise of Magadha, Buddha, and Mahavira.",
    image: "/PHOTOS/600 bce mahajanapadas and new religions.png",
    alignment: "right",
    yPercentage: 37,
    period: "ancient",
    subItems: [
      { title: "16 Mahajanapadas", date: "600 BCE", points: ["Powerful states emerge", "Iron tools boost trade"], image: "/PHOTOS/600 bce mahajanapadas and new religions.png", isSmallImage: true },
      { title: "Buddha", date: "563 BCE", points: ["Gautama Buddha birth", "Questions Vedic rituals"], image: "/PHOTOS/563 bce maha and new religions.png", isSmallImage: true },
      { title: "Mahavira", date: "540 BCE", points: ["Jainism Tirthankara", "Ahimsa & asceticism"], image: "/PHOTOS/540 bce maha and new  religions.png", isSmallImage: true },
      { title: "Spread of New Religions", date: "500 BCE", points: ["Buddhism & Jainism spread", "Pali & Prakrit languages"], image: "/PHOTOS/500 bce maha and religions.png", isSmallImage: true },
      { title: "Magadha Rise", date: "450 BCE", points: ["Bimbisara & Ajatashatru", "Pataliputra capital"], image: "/PHOTOS/450 bce maha and relligions.png", isSmallImage: true },
      { title: "Decline of Smaller States", date: "400 BCE", points: ["Monastic institutions grow", "Urbanization increases"], image: "/PHOTOS/400 bce maha and religion.png", isSmallImage: true },
    ],
  },
  {
    id: "mauryan",
    title: "Mauryan Empire (321–185 BCE)",
    description: "Unification of India.",
    image: "/PHOTOS/mauryan empire.png",
    alignment: "left",
    yPercentage: 42,
    period: "ancient",
    subItems: [
      { title: "Foundation", date: "321 BCE", points: ["Chandragupta defeats Nanda", "Chanakya guidance", "Centralized admin"], image: "/PHOTOS/321 bce mauryan empire.png" },
      { title: "Expansion", date: "305 BCE", points: ["Conquers Afghanistan", "Treaty with Seleucus"], image: "/PHOTOS/305-297-BCE-Expansion-Mauryan.png", isSmallImage: true },
      { title: "Ashoka", date: "273 BCE", points: ["Kalinga War", "Converts to Buddhism", "Dhamma policy"], image: "/PHOTOS/273–232 BCE – Reign of Ashoka.png", isSmallImage: true },
      { title: "Decline", date: "232 BCE", points: ["Weak successors", "Regional rebellions"], image: "/PHOTOS/232–185 BCE – Decline mauriyan empire.png", isSmallImage: true },
    ],
  },
  {
    id: "gupta",
    title: "Gupta Empire (320–550 CE)",
    description: "Golden Age of Indian culture.",
    image: "/PHOTOS/GUPTA_GOLDEN_AGE-removebg-preview (2).png",
    alignment: "right",
    yPercentage: 47,
    period: "ancient",
    subItems: [
      { title: "Foundation", date: "320 CE", points: ["Chandragupta I founds empire", "Pataliputra capital"], image: "/PHOTOS/320 CE – Foundation gupta timeline.png" },
      { title: "Samudragupta", date: "335 CE", points: ["Napoleon of India", "Military conquests", "Patron of arts"], image: "/PHOTOS/c. 335–375 CE – Reign of Samudragupta.png" },
      { title: "Vikramaditya", date: "380 CE", points: ["Golden Age", "Kalidasa & Aryabhata", "Trade flourishes"], image: "/PHOTOS/c. 380–415 CE – Reign of Chandragupta II (Vikramaditya).png" },
      { title: "Later Guptas", date: "415 CE", points: ["Skandagupta defends against Hunas", "Gradual decline"], image: "/PHOTOS/415–455 CE – Later Guptas .png", isSmallImage: true },
      { title: "Decline", date: "500 CE", points: ["Weak successors", "Empire fragments"], image: "/PHOTOS/500-550-CE-Decline.png", isSmallImage: true },
    ],
  },
  {
    id: "early-medieval-transition",
    title: "Transition to Medieval (550–750 CE)",
    description: "Fragmentation and temple building.",
    image: "/PHOTOS/Late Ancient Transition (1).png",
    alignment: "left",
    yPercentage: 52,
    period: "ancient",
    subItems: [
      { title: "Fragmentation", date: "550 CE", points: ["Gupta decline", "Regional kingdoms emerge"], image: "/PHOTOS/550 CE LATE ANCINET .PNG", isSmallImage: true },
      { title: "Regional Powers", date: "600 CE", points: ["Pushyabhutis & Maitrakas", "Land grants to Brahmins"], image: "/PHOTOS/600 CE LATE ANCINCET.png", isSmallImage: true },
      { title: "Temple Architecture", date: "620 CE", points: ["Temple building begins", "Trade with Southeast Asia"], image: "/PHOTOS/620–650 CE LATE ANCIENT.png", isSmallImage: true },
      { title: "Early Rajputs", date: "650 CE", points: ["Rajput clans emerge", "Military aristocracy"], image: "/PHOTOS/650-700 CE LATE ANCIENT.PNG", isSmallImage: true },
      { title: "Consolidation", date: "700 CE", points: ["Feudal relationships", "Temple culture expands"], image: "/PHOTOS/700–750 CE LATE ANCIENT.png", isSmallImage: true },
    ],
  },

  // --- MEDIEVAL PERIOD ---
  {
    id: "medieval-tripartite",
    title: "Early Medieval (750–1000 CE)",
    description: "Palas, Pratiharas, and Rashtrakutas.",
    image: "/PHOTOS/early_medivel_india-removebg-preview.png",
    alignment: "right",
    yPercentage: 57,
    period: "medieval",
    subItems: [
      { title: "Fragmented India", date: "750 CE", points: ["Pratiharas, Palas, Rashtrakutas rise", "Feudal structures"], image: "/PHOTOS/750 ce post gupta.png", isSmallImage: true },
      { title: "Tripartite Struggle", date: "800 CE", points: ["Wars for Kannauj control", "Land grants increase"], image: "/PHOTOS/800 ce post gupta.png", isSmallImage: true },
      { title: "Art & Architecture", date: "850 CE", points: ["Rock-cut temples", "Regional literature"], image: "/PHOTOS/850 ce post gupta.png", isSmallImage: true },
      { title: "Regional Dominance", date: "900 CE", points: ["Chola rise in south", "Pratiharas, Palas, Rashtrakutas"], image: "/PHOTOS/900 ce post gupta.png", isSmallImage: true },
      { title: "Decentralization", date: "1000 CE", points: ["Feudal systems established", "Temple-based economy"], image: "/PHOTOS/1000 ce post gupta.png", isSmallImage: true },
    ],
  },
  {
    id: "delhi-sultanate",
    title: "Delhi Sultanate (1206–1526)",
    description: "Islamic Sultanates in the North.",
    image: "/PHOTOS/delhi sultnate.png",
    alignment: "left",
    yPercentage: 62,
    period: "medieval",
    subItems: [
      { title: "Mamluk Dynasty", date: "1206 CE", points: ["Qutb-ud-din Aibak founds", "Muslim rule begins"], image: "/PHOTOS/1206 delhi sultnate.png", isSmallImage: true },
      { title: "Khalji Dynasty", date: "1290 CE", points: ["Alauddin Khalji", "Market reforms", "Deccan expansion"], image: "/PHOTOS/1290–1320 CE  delhi sultnate.png", isSmallImage: true },
      { title: "Tughlaq Dynasty", date: "1320 CE", points: ["Muhammad bin Tughlaq", "Token currency", "Capital shifts"], image: "/PHOTOS/1320–1414 CE delhi suntnate.png", isSmallImage: true },
      { title: "Sayyid Dynasty", date: "1414 CE", points: ["Limited control", "Decentralization"], image: "/PHOTOS/1414–1451 CE delhi sunltanet.png", isSmallImage: true },
      { title: "Lodi Dynasty", date: "1451 CE", points: ["Afghan dynasty", "Weak central authority"], image: "/PHOTOS/1451–1526 CE delhi sultnate.png", isSmallImage: true },
    ],
  },
  {
    id: "vijayanagara",
    title: "Vijayanagara Empire (1336–1646)",
    description: "Empire of the South.",
    image: "/PHOTOS/vijaynagar_1-removebg-preview.png",
    alignment: "right",
    yPercentage: 67,
    period: "medieval",
    subItems: [
      { title: "Foundation", date: "1336 CE", points: ["Harihara & Bukka establish", "Defense against Delhi Sultanate"], image: "/PHOTOS/c. 1336 CE – Foundation of Vijayanagara.png", isSmallImage: true },
      { title: "Golden Age", date: "1400-1500 CE", points: ["Devaraya II expansion", "Hampi flourishes", "Trade with Europe"], image: "/PHOTOS/c. 1400–1500 CE – Golden Age of Vijayanagara.png", isSmallImage: true },
      { title: "Battle of Talikota", date: "1565 CE", points: ["Defeated by Deccan Sultanates", "Hampi destroyed"], image: "/PHOTOS/c. 1490–1565 CE – Vijayanagara Sultanates & Battle of TalikoTA.png", isSmallImage: true },
      { title: "Decline", date: "1570-1646 CE", points: ["Reduced to smaller kingdoms", "Regional fragmentation"], image: "/PHOTOS/c. 1570–1646 CE – Decline and Regional Fragmentation.png", isSmallImage: true },
    ],
  },
  {
    id: "mughal",
    title: "Mughal Empire (1526–1857)",
    description: "Imperial Zenith and Architecture.",
    image: "/PHOTOS/mughal empire.png",
    alignment: "left",
    yPercentage: 72,
    period: "medieval",
    subItems: [
      { title: "Babur", date: "1526 CE", points: ["Defeats Ibrahim Lodi", "First Battle of Panipat", "Founds Mughal Empire"], image: "/PHOTOS/1526 mughal empire.png", isSmallImage: true },
      { title: "Akbar", date: "1556 CE", points: ["Consolidates empire", "Religious tolerance", "Mansabdari system"], image: "/PHOTOS/1556–1605 mughal empire.png", isSmallImage: true },
      { title: "Jahangir", date: "1605 CE", points: ["Patron of art", "Trade with Europeans"], image: "/PHOTOS/1605–1627  mughal empire.png", isSmallImage: true },
      { title: "Shah Jahan", date: "1628 CE", points: ["Taj Mahal", "Red Fort", "Golden period of architecture"], image: "/PHOTOS/1628–1658 shahjaha (2).png", isSmallImage: true },
      { title: "Aurangzeb", date: "1658 CE", points: ["Largest extent", "Deccan expansion", "Conservative policies"], image: "/PHOTOS/1658 mughal empire.png", isSmallImage: true },
    ],
  },
  {
    id: "maratha",
    title: "Maratha & Regional Powers (1707–1857)",
    description: "Decentralized power after Aurangzeb.",
    image: "/PHOTOS/maratha and sikh.png",
    alignment: "right",
    yPercentage: 77,
    period: "medieval",
    subItems: [
      { title: "Aurangzeb Death", date: "1707 CE", points: ["Mughal decline begins", "Regional powers rise"], image: "/PHOTOS/death of aurangzeb.png", isSmallImage: true },
      { title: "Regional Emergence", date: "1710-1750 CE", points: ["Marathas expand", "Nawabs of Bengal, Awadh", "Sikh Confederacy"], image: "/PHOTOS/1710–1750 late medival .png", isSmallImage: true },
      { title: "Conflicts", date: "1750-1800 CE", points: ["Marathas dominate north", "Hyder Ali & Tipu Sultan", "British expansion begins"], image: "/PHOTOS/1750–1800 late medival.png", isSmallImage: true },
      { title: "British Expansion", date: "1800-1857 CE", points: ["British annex territories", "Doctrine of Lapse", "Regional powers subdued"], image: "/PHOTOS/1800–1857 late medival .png", isSmallImage: true },
    ],
  },

  // --- MODERN PERIOD ---
  // Timeline 1: East India Company (1600-1680) - WITH sub-items
  {
    id: "eic-1600-1680",
    title: "East India Company in India (1600–1680)",
    description: "Trade monopoly and early expansion.",
    image: "/PHOTOS/east india company.png",
    alignment: "left",
    yPercentage: 82,
    period: "modern",
    subItems: [
      { title: "Formation", date: "1600 CE", points: ["EIC established in England", "Royal Charter by Queen Elizabeth I", "Monopoly on trade"], image: "/PHOTOS/east india company.png" },
      { title: "First Trading Posts", date: "Early 1600s", points: ["Surat (1612), Madras (1639)", "Bengal Hooghly (1651), Bombay (1668)"], image: "/PHOTOS/early trading post eat india conpamy  (2).png" },
      { title: "Expansion", date: "Mid-1600s", points: ["Trade in spices, cotton, silk", "Farmans with local rulers", "Competed with Portuguese & Dutch"], image: "/PHOTOS/Mid-1600s expansion.png" },
      { title: "Influence Grows", date: "Late 1600s (1680)", points: ["Influence in Bengal, Madras, Gujarat", "Wealth accumulation", "Trading company, not political power yet"], image: "/PHOTOS/1680 influence.png" },
    ],
  },
  // Timeline 2: Siege of Hooghly (1686-1700) - WITH sub-items
  {
    id: "siege-hooghly",
    title: "Siege of Hooghly (1686–1700)",
    description: "Mughal action against Portuguese.",
    image: "/PHOTOS/SIEGE OF HOOGHLY 1686.png",
    alignment: "right",
    yPercentage: 86.5,
    period: "modern",
    subItems: [
      { title: "Siege Begins", date: "1686 CE", points: ["Aurangzeb orders action", "Portuguese accused of piracy"], image: "/PHOTOS/SIEGE OF HOOGHLY 1686.png", isSmallImage: true },
      { title: "Preparations", date: "1687-1688 CE", points: ["Qasim Khan leads forces", "Skirmishes on settlements"], image: "/PHOTOS/siedge of hoogle 1687–1688.png", isSmallImage: true },
      { title: "Formal Siege", date: "1689-1690 CE", points: ["Siege of Hooghly Fort", "Supply cuts"], image: "/PHOTOS/1689–1690 sidge of hoogle (2).png", isSmallImage: true },
      { title: "Prolonged Siege", date: "1691-1695 CE", points: ["Heavy attrition", "Trade disrupted"], image: "/PHOTOS/1691–1695 sidge of hoogle.png", isSmallImage: true },
      { title: "Fort Breach", date: "1696-1699 CE", points: ["Defenses breached", "Negotiations begin"], image: "/PHOTOS/1696–1699 sidge of hoogly (2).png", isSmallImage: true },
      { title: "Hooghly Captured", date: "1700 CE", points: ["Mughals capture Hooghly", "Portuguese influence reduced"], image: "/PHOTOS/1700 siedge of hoogly (2).png", isSmallImage: true },
    ],
  },
  // Timeline 3: Death of Aurangzeb (1707) - NO sub-items
  {
    id: "aurangzeb-death",
    title: "Death of Aurangzeb (1707)",
    description: "Mughal decline begins.",
    image: "/PHOTOS/1707 late medivel.png",
    alignment: "left",
    yPercentage: 91,
    period: "modern",
  },
  // Timeline 4: Battle of Plassey (1757) - NO sub-items
  {
    id: "battle-plassey",
    title: "Battle of Plassey (1757)",
    description: "British victory, Bengal control begins.",
    image: "/PHOTOS/battle of plassy.png",
    alignment: "right",
    yPercentage: 95.5,
    period: "modern",
  },
  // Timeline 5: Battle of Buxar (1764) - NO sub-items
  {
    id: "battle-buxar",
    title: "Battle of Buxar (1764)",
    description: "Decisive British victory, Diwani rights.",
    image: "/PHOTOS/battle of buxar.png",
    alignment: "left",
    yPercentage: 100,
    period: "modern",
  },
  // Timeline 6: First Anglo-Maratha War (1775-1782) - WITH sub-items
  {
    id: "anglo-maratha-war",
    title: "First Anglo-Maratha War (1775–1782)",
    description: "British-Maratha conflict.",
    image: "/PHOTOS/1775 CE – Start of the War .png",
    alignment: "right",
    yPercentage: 104.5,
    period: "modern",
    subItems: [
      { title: "Start of War", date: "1775 CE", points: ["Raghoba seeks British support", "War begins in Maharashtra"], image: "/PHOTOS/1775 CE – Start of the War .png", isSmallImage: true },
      { title: "Initial Conflicts", date: "1776-1777 CE", points: ["Skirmishes", "Maratha resistance"], image: "/PHOTOS/1776–1777 CE – Initial Conflicts (2).png", isSmallImage: true },
      { title: "Key Battles", date: "1778-1779 CE", points: ["Battle of Wadgaon", "Major British defeat"], image: "/PHOTOS/1778–1779 CE – Key Battles (2).png", isSmallImage: true },
      { title: "Continued Fighting", date: "1780-1781 CE", points: ["Guerrilla tactics", "Supply struggles"], image: "/PHOTOS/1780–1781 CE – Continued Fighting - Copy.png", isSmallImage: true },
      { title: "Treaty of Salbai", date: "1782 CE", points: ["Peace treaty", "20-year alliance"], image: "/PHOTOS/1782 CE – End of the War.png", isSmallImage: true },
    ],
  },
  // Timeline 7: Banaras Uprising (1855) - NO sub-items
  {
    id: "banaras-uprising",
    title: "Banaras Uprising (1855)",
    description: "Local resistance.",
    image: "/PHOTOS/banaras uprising.png",
    alignment: "left",
    yPercentage: 109,
    period: "modern",
  },
  // Timeline 8: First War of Independence (1857) - NO sub-items
  {
    id: "revolt-1857",
    title: "First War of Indian Independence (1857)",
    description: "Sepoy mutiny, major uprising.",
    image: "/PHOTOS/1857 revolt.png",
    alignment: "right",
    yPercentage: 113.5,
    period: "modern",
  },
  // Timeline 9: British Crown Rule (1858) - NO sub-items
  {
    id: "crown-rule",
    title: "Beginning of British Crown Rule (1858)",
    description: "Company rule ends, direct British control.",
    image: "/PHOTOS/british rule in india.png",
    alignment: "left",
    yPercentage: 118,
    period: "modern",
  },
  // Timeline 10: Birth of Gandhi (1869) - NO sub-items
  {
    id: "gandhi-birth",
    title: "Birth of Mahatma Gandhi (1869)",
    description: "Born at Porbandar.",
    image: "/PHOTOS/birth_of_mahatmagandhi-removebg-preview.png",
    alignment: "right",
    yPercentage: 122.5,
    period: "modern",
  },
  // Timeline 11: Indian National Congress (1885) - NO sub-items
  {
    id: "inc-formation",
    title: "Formation of Indian National Congress (1885)",
    description: "INC formed.",
    image: "/PHOTOS/indian_national_congress-Photoroom.png",
    alignment: "left",
    yPercentage: 127,
    period: "modern",
  },
  // Timeline 12: Bengal Partition (1905) - NO sub-items
  {
    id: "bengal-partition",
    title: "Partition of Bengal (1905)",
    description: "Divide and rule policy.",
    image: "/PHOTOS/bengal partition.png",
    alignment: "right",
    yPercentage: 131.5,
    period: "modern",
  },
  // Timeline 13: Muslim League (1906) - NO sub-items
  {
    id: "muslim-league",
    title: "Formation of All-India Muslim League (1906)",
    description: "Muslim League formed.",
    image: "/PHOTOS/all india muslim league (2).png",
    alignment: "left",
    yPercentage: 136,
    period: "modern",
  },
  // Timeline 14: World War I (1914-1918) - WITH sub-items
  {
    id: "world-war-1",
    title: "World War I: Indian Participation (1914–1918)",
    description: "India's contribution to WWI.",
    image: "/PHOTOS/world war 1 (2).png",
    alignment: "right",
    yPercentage: 140.5,
    period: "modern",
    subItems: [
      { title: "Outbreak of WWI", date: "1914 CE", points: ["WWI begins in Europe", "India contributes soldiers, resources", "IEF sent to Europe, Africa, Middle East"], image: "/PHOTOS/world war 1 (2).png", isSmallImage: true },
      { title: "Early Campaigns", date: "1914-1915 CE", points: ["Western Front, Gallipoli", "1.3M soldiers provided"], image: "/PHOTOS/world war 1 (2).png", isSmallImage: true },
      { title: "Middle Years", date: "1916-1917 CE", points: ["Mesopotamia, Egypt, Palestine", "Financial contributions"], image: "/PHOTOS/world war 1 (2).png", isSmallImage: true },
      { title: "End of WWI", date: "1918 CE", points: ["Armistice Nov 11", "74,000 casualties"], image: "/PHOTOS/world war 1 (2).png", isSmallImage: true },
    ],
  },
  // Timeline 15: Jallianwala Bagh (1919) - NO sub-items
  {
    id: "jallianwala-bagh",
    title: "Jallianwala Bagh Massacre (1919)",
    description: "Massacre in Amritsar, turning point.",
    image: "/PHOTOS/jallianwala bagh.png",
    alignment: "left",
    yPercentage: 145,
    period: "modern",
  },
  // Timeline 16: Non-Cooperation Movement (1920-1922) - WITH sub-items
  {
    id: "non-cooperation",
    title: "Non-Cooperation Movement (1920–1922)",
    description: "Gandhi's mass movement.",
    image: "/PHOTOS/1920 NON COOPERATION LAUNCH.png",
    alignment: "right",
    yPercentage: 149.5,
    period: "modern",
    subItems: [
      { title: "Launch", date: "1920 CE", points: ["Gandhi launches movement", "Triggered by Jallianwala & Rowlatt Act", "Khilafat support"], image: "/PHOTOS/1920 NON COOPERATION LAUNCH.png", isSmallImage: true },
      { title: "Mass Participation", date: "1920-1921 CE", points: ["Boycott British institutions", "Khadi promotion"], image: "/PHOTOS/non coperation moments.png", isSmallImage: true },
      { title: "Suspension", date: "1922 CE", points: ["Chauri Chaura incident", "Gandhi suspends movement"], image: "/PHOTOS/non coperation moments.png", isSmallImage: true },
    ],
  },
  // Timeline 17: Salt March (1930) - NO sub-items
  {
    id: "salt-march",
    title: "Civil Disobedience Movement - Salt March (1930)",
    description: "Dandi March.",
    image: "/PHOTOS/CIVIL DISOBEDIENCE MOMENT(SALT MARCH).png",
    alignment: "left",
    yPercentage: 154,
    period: "modern",
  },
  // Timeline 18: Government of India Act (1935) - NO sub-items
  {
    id: "govt-india-act",
    title: "Government of India Act, 1935",
    description: "Provincial autonomy, federal structure.",
    image: "/PHOTOS/MODERN INDIA.png",
    alignment: "right",
    yPercentage: 158.5,
    period: "modern",
  },
  // Timeline 19: Quit India (1942) - NO sub-items
  {
    id: "quit-india",
    title: "Quit India Movement (1942)",
    description: "Final push for independence, Do or Die.",
    image: "/PHOTOS/quit india.png",
    alignment: "left",
    yPercentage: 163,
    period: "modern",
  },
  // Timeline 20: Independence (1947) - NO sub-items
  {
    id: "independence",
    title: "Indian Independence & Partition (1947)",
    description: "15th August 1947, Mountbatten Plan.",
    image: "/PHOTOS/Independence & Partition Mountbatten Plan, 15th August 1947 (2).png",
    alignment: "right",
    yPercentage: 167.5,
    period: "modern",
  },
  // Timeline 21: Constitution (1950) - NO sub-items
  {
    id: "constitution",
    title: "Adoption of Indian Constitution (1950)",
    description: "Republic Day, Dr. Ambedkar.",
    image: "/PHOTOS/Constitution Drafting Committee, Republic Day (2).png",
    alignment: "left",
    yPercentage: 172,
    period: "modern",
  },
  // Timeline 22: India-China War (1962) - NO sub-items
  {
    id: "india-china-war",
    title: "India-China War (1962)",
    description: "Border conflict, Himalayan war.",
    image: "/PHOTOS/india_and_china_war (2).png",
    alignment: "right",
    yPercentage: 176.5,
    period: "modern",
  },
  // Timeline 23: India-Pakistan War (1965) - NO sub-items
  {
    id: "india-pakistan-war-1965",
    title: "India-Pakistan War (1965)",
    description: "Kashmir conflict, Tashkent Declaration.",
    image: "/PHOTOS/india and pakistan war (2).png",
    alignment: "left",
    yPercentage: 181,
    period: "modern",
  },
  // Timeline 24: Bangladesh Liberation (1971) - NO sub-items
  {
    id: "bangladesh-liberation",
    title: "Bangladesh Liberation War (1971)",
    description: "Support for Mukti Bahini, Victory.",
    image: "/PHOTOS/Bangladesh Liberation War Support for Mukti Bahini, Victory & Surrender.png",
    alignment: "right",
    yPercentage: 185.5,
    period: "modern",
  },
  // Timeline 25: Economic Reforms (1991) - NO sub-items
  {
    id: "economic-reforms",
    title: "Economic Reforms (1991)",
    description: "Liberalization, Budget 1991.",
    image: "/PHOTOS/Economic Reforms Budget 1991.png",
    alignment: "left",
    yPercentage: 190,
    period: "modern",
  },
  // Timeline 26: Modern India (Present) - NO sub-items
  {
    id: "modern-india",
    title: "Modern India (Present)",
    description: "Digital India, Global power.",
    image: "/PHOTOS/MODERN INDIA.png",
    alignment: "right",
    yPercentage: 194.5,
    period: "modern",
  },
];

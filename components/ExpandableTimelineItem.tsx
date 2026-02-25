import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { TimelineItem, SubItem } from "@/app/data/timeline";
import { cn } from "@/lib/cn";
import { Video, Headphones, Map, FileText, Wrench, ImageIcon, ChevronRight, Plus, Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";

interface ExpandableTimelineItemProps {
    item: TimelineItem;
    isExpanded: boolean;
    onToggle: () => void;
    index: number;
}

type MediaMode = 'Photos' | 'Audio' | 'Video' | 'Map' | 'Article' | 'Tools';

const ExpandableTimelineItem: React.FC<ExpandableTimelineItemProps> = ({
    item,
    isExpanded,
    onToggle,
    index,
}) => {
    const isLeft = index % 2 === 0;
    const [currentPage, setCurrentPage] = useState(0);
    // Track individual modes for each sub-item title
    const [subItemModes, setSubItemModes] = useState<Record<string, MediaMode>>({});
    // Track which sub-item is currently selected (clicked)
    const [selectedSubItemTitle, setSelectedSubItemTitle] = useState<string | null>(null);
    // State for full-screen article view
    const [expandedArticle, setExpandedArticle] = useState<{ title: string, content: string, date: string, image?: string } | null>(null);
    const [isSpeaking, setIsSpeaking] = useState(false);

    // Stop speech when modal closes
    React.useEffect(() => {
        if (!expandedArticle) {
            window.speechSynthesis.cancel();
            setIsSpeaking(false);
        }
    }, [expandedArticle]);

    const handleToggleSpeech = (e: React.MouseEvent, content: string) => {
        e.stopPropagation();
        if (isSpeaking) {
            window.speechSynthesis.cancel();
            setIsSpeaking(false);
        } else {
            const utterance = new SpeechSynthesisUtterance(content);
            utterance.onend = () => setIsSpeaking(false);
            window.speechSynthesis.speak(utterance);
            setIsSpeaking(true);
        }
    };

    const cardsPerPage = 4;
    const totalPages = Math.ceil((item.subItems?.length || 0) / cardsPerPage);
    const startIndex = currentPage * cardsPerPage;
    const visibleSubItems = item.subItems?.slice(startIndex, startIndex + cardsPerPage) || [];

    // Initialize/Reset selected item when visible sub-items change
    React.useEffect(() => {
        if (visibleSubItems.length > 0 && (!selectedSubItemTitle || !visibleSubItems.some(s => s.title === selectedSubItemTitle))) {
            setSelectedSubItemTitle(visibleSubItems[0].title);
        }
    }, [visibleSubItems, selectedSubItemTitle]);

    const handleNextPage = (e: React.MouseEvent) => {
        e.stopPropagation();
        const nextPage = (currentPage + 1) % totalPages;
        setCurrentPage(nextPage);
        // Automatically select the first item of the next page
        const nextVisible = item.subItems?.slice(nextPage * cardsPerPage, (nextPage + 1) * cardsPerPage) || [];
        if (nextVisible.length > 0) {
            setSelectedSubItemTitle(nextVisible[0].title);
        }
    };

    const handleModeChange = (newMode: MediaMode) => {
        if (selectedSubItemTitle) {
            setSubItemModes(prev => ({
                ...prev,
                [selectedSubItemTitle]: newMode
            }));
        }
    };

    // Get current mode for sidebar highlighting based on SELECTED item
    const currentSelectedMode = selectedSubItemTitle ? (subItemModes[selectedSubItemTitle] || 'Photos') : 'Photos';

    return (
        <motion.div
            layout
            initial={{ opacity: 1 }}
            className="relative flex flex-col items-center w-full"
        >

            {/* Main Item Card */}
            <div
                className={cn(
                    "relative w-full max-w-6xl flex items-center justify-center gap-12 py-16 px-4 cursor-pointer group",
                    isLeft ? "flex-row md:-translate-x-8" : "flex-row-reverse md:translate-x-8"
                )}
                onClick={onToggle}
            >

                {/* Content Side */}
                <div className={cn(
                    "flex-1 space-y-4 max-w-sm relative z-10",
                    isLeft ? "text-right" : "text-left"
                )}>
                    <motion.div
                        initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.1 }}
                        className="space-y-2 relative"
                    >
                        <h3 className="text-3xl md:text-4xl font-serif text-amber-100 group-hover:text-amber-400 transition-colors leading-tight drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)]">
                            {item.title}
                        </h3>
                        <p className="text-white/50 text-base leading-relaxed group-hover:text-white/80 transition-colors">
                            {item.description}
                        </p>
                    </motion.div>
                </div>

                {/* Image Side (ZIG-ZAG Centerpiece) - Floating Image */}
                <div className="relative w-40 h-40 md:w-[320px] md:h-[240px] flex-shrink-0 z-10 transition-all duration-500">
                    <motion.div
                        className="w-full h-full transition-all duration-500 relative"
                        whileHover={{ scale: 1.05 }}
                    >
                        {/* Glow effect */}
                        <div className="absolute inset-0 bg-amber-500/5 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                        <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-contain transition-transform duration-1000 group-hover:scale-110 drop-shadow-[0_15px_40px_rgba(0,0,0,0.8)] filter brightness-90 group-hover:brightness-110"
                        />
                    </motion.div>
                </div>
            </div>

            {/* Expandable Sub-Timeline */}
            <AnimatePresence>
                {isExpanded && item.subItems && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="w-full overflow-hidden bg-white/5 backdrop-blur-md border-y border-white/5"
                    >
                        <div className="relative w-full max-w-screen-2xl mx-auto py-12 px-6 flex items-center gap-6">
                            {/* Cards Container */}
                            <motion.div layout className="flex-1 flex flex-nowrap gap-4 items-center">
                                {visibleSubItems.map((sub, sIdx) => {
                                    const mode = subItemModes[sub.title] || 'Photos';
                                    const isSelected = sub.title === selectedSubItemTitle;
                                    return (
                                        <SubItemCard
                                            key={`${startIndex}-${sIdx}`}
                                            sub={sub}
                                            eraTitle={item.title}
                                            eraImage={item.image}
                                            mode={mode}
                                            isSelected={isSelected}
                                            onSelect={() => {
                                                if (isSelected) {
                                                    setSelectedSubItemTitle(null);
                                                } else {
                                                    setSelectedSubItemTitle(sub.title);
                                                }
                                            }}
                                            onExpandArticle={(data) => setExpandedArticle(data)}
                                        />
                                    );
                                })}

                                {/* Plus Button for Pagination moved inside the scroll area or handled differently if needed */}
                                {totalPages > 1 && (
                                    <button
                                        onClick={handleNextPage}
                                        className="flex-shrink-0 w-16 h-16 rounded-full bg-amber-500/20 border-2 border-amber-500/40 flex flex-col items-center justify-center text-amber-500 hover:bg-amber-500 hover:text-black shadow-[0_0_20px_rgba(245,158,11,0.2)] transition-all duration-300 group/plus"
                                        title="Next Items"
                                    >
                                        <Plus className="w-8 h-8 transition-transform group-hover/plus:rotate-90" />
                                        <span className="text-[8px] font-bold uppercase tracking-tighter mt-1">More</span>
                                    </button>
                                )}
                            </motion.div>

                            {/* Grid Media Sidebar */}
                            <div className="grid grid-cols-2 gap-2 border-l border-white/10 pl-4 ml-auto min-w-[120px]">
                                <SidebarIcon
                                    Icon={ImageIcon}
                                    label="Photos"
                                    active={currentSelectedMode === 'Photos'}
                                    onClick={() => handleModeChange('Photos')}
                                />
                                <SidebarIcon
                                    Icon={Video}
                                    label="Video"
                                    active={currentSelectedMode === 'Video'}
                                    onClick={() => handleModeChange('Video')}
                                />
                                <SidebarIcon
                                    Icon={Headphones}
                                    label="Audio"
                                    active={currentSelectedMode === 'Audio'}
                                    onClick={() => handleModeChange('Audio')}
                                />
                                <SidebarIcon
                                    Icon={Map}
                                    label="Map"
                                    active={currentSelectedMode === 'Map'}
                                    onClick={() => handleModeChange('Map')}
                                />
                                <SidebarIcon
                                    Icon={FileText}
                                    label="Article"
                                    active={currentSelectedMode === 'Article'}
                                    onClick={() => handleModeChange('Article')}
                                />
                                <SidebarIcon
                                    Icon={Wrench}
                                    label="Tools"
                                    active={currentSelectedMode === 'Tools'}
                                    onClick={() => handleModeChange('Tools')}
                                />
                            </div>
                        </div>
                        {/* Page Indicator */}
                        {totalPages > 1 && (
                            <div className="flex justify-center gap-2 pb-6">
                                {[...Array(totalPages)].map((_, i) => (
                                    <div
                                        key={i}
                                        className={cn(
                                            "w-2 h-2 rounded-full transition-all duration-300",
                                            currentPage === i ? "bg-amber-500 w-6" : "bg-white/20"
                                        )}
                                    />
                                ))}
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Full Screen Article Modal */}
            <AnimatePresence>
                {expandedArticle && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
                    >
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setExpandedArticle(null)}
                            className="absolute inset-0 bg-black/90 backdrop-blur-xl"
                        />

                        {/* Article Page */}
                        <motion.div
                            initial={{ scale: 0.9, y: 20, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.9, y: 20, opacity: 0 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="relative w-full max-w-4xl max-h-[90vh] bg-[#fcf9f2] text-[#2c1810] rounded-sm shadow-2xl overflow-hidden flex flex-col"
                        >
                            {/* Decorative border */}
                            <div className="absolute inset-4 border-2 border-[#2c1810]/10 pointer-events-none" />
                            <div className="absolute inset-6 border border-[#2c1810]/5 pointer-events-none" />

                            {/* Header */}
                            <div className="relative p-12 pb-6 flex justify-between items-start">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-px bg-amber-800/30" />
                                        <span className="text-amber-800 font-serif italic text-sm tracking-widest uppercase">{expandedArticle.date}</span>
                                        <div className="w-12 h-px bg-amber-800/30" />
                                    </div>
                                    <h2 className="text-5xl md:text-6xl font-serif leading-tight text-amber-950">
                                        {expandedArticle.title}
                                    </h2>
                                </div>
                                <button
                                    onClick={() => setExpandedArticle(null)}
                                    className="p-2 hover:bg-amber-100 rounded-full transition-colors text-amber-900 group"
                                >
                                    <Plus className="w-8 h-8 rotate-45 group-hover:scale-110 transition-transform" />
                                </button>
                            </div>

                            {/* Content Area */}
                            <div className="flex-1 overflow-y-auto px-12 pb-12 custom-scrollbar-paper">
                                <div className="grid md:grid-cols-12 gap-12">
                                    <div className="md:col-span-12">
                                        <div className="prose prose-amber max-w-none">
                                            <p className="text-xl md:text-2xl leading-relaxed font-serif first-letter:text-7xl first-letter:font-bold first-letter:mr-3 first-letter:float-left first-letter:text-amber-900">
                                                {expandedArticle.content}
                                            </p>

                                            {/* Fillers for more "Article" feel */}
                                            <div className="mt-8 space-y-6 text-[#2c1810]/80 font-serif leading-relaxed text-lg">
                                                <p>
                                                    The era represented here mark a significant milestone in human development. Through meticulous archaeological research and historical analysis, we've come to understand that this period was not merely a transition, but a foundation for everything that followed. The intricacies of their society, the mastery over their environment, and the emergence of complex cultural symbolisms tell a story of resilience and innovation.
                                                </p>
                                                <p>
                                                    Excavations at various key sites have revealed an astonishing level of organized activity. From the precision of their tools to the artistic expression found in their artifacts, every find adds a layer of depth to our understanding. Scholars continue to debate the finer points of their social hierarchy and resource management, yet the prevailing evidence points toward a highly sophisticated and interconnected community.
                                                </p>
                                            </div>


                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="bg-amber-950/5 p-6 border-t border-amber-950/10 flex justify-end items-center px-12">
                                <div className="flex gap-4">
                                    <button
                                        onClick={(e) => handleToggleSpeech(e, `${expandedArticle.title}. ${expandedArticle.content}`)}
                                        className={cn(
                                            "transition-colors p-2 rounded-full",
                                            isSpeaking ? "bg-amber-900 text-amber-100" : "text-amber-900/40 hover:text-amber-900 hover:bg-amber-900/10"
                                        )}
                                        title={isSpeaking ? "Stop Reading" : "Read Aloud"}
                                    >
                                        <Volume2 className={cn("w-5 h-5", isSpeaking && "animate-pulse")} />
                                    </button>
                                    <button className="text-amber-900/40 hover:text-amber-900 transition-colors">
                                        <FileText className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div >
    );
};

const getArticleContent = (eraTitle: string) => {
    const title = eraTitle.toLowerCase();
    if (title.includes("paleolithic")) return "The Paleolithic Age in India is characterized by the use of rudimentary stone tools. Early humans were nomadic hunter-gatherers, living in caves like Bhimbetka. They mastered fire and created some of the earliest known rock art, depicting animals and daily life.";
    if (title.includes("mesolithic")) return "The Mesolithic transition saw a shift to microliths—smaller, more efficient tools. Domestication of animals began, and settlements became more semi-permanent near water sources. This era marked the beginning of specialized gathering and social organization.";
    if (title.includes("neolithic")) return "The Neolithic Revolution brought farming and permanent settlements. People began cultivating crops like wheat and barley, and pottery was Developed for storage. Sites like Mehrgarh provide evidence of sophisticated early village life and agricultural practices.";
    if (title.includes("indus valley")) return "The Indus Valley Civilization was one of the most advanced urban societies of the ancient world. They featured grid-planned cities, elaborate drainage systems, and standardized weights. Trade flourished through the dockyards of Lothal and across the Arabian Sea.";
    if (title.includes("vedic")) return "The Vedic Period saw the composition of the Vedas and the rise of early kingdoms. Society was structured around small clans, eventually evolving into larger Janapadas. This era laid the foundation for Indian philosophy, rituals, and the caste system.";
    if (title.includes("mahajanapadas")) return "The age of Mahajanapadas marked the second urbanization in India. Sixteen major kingdoms vied for supremacy, with Magadha emerging as the most powerful. This period was also the intellectual cradle for Buddhism and Jainism, challenging older traditions.";
    if (title.includes("mauryan")) return "The Mauryan Empire, founded by Chandragupta Maurya, was the first pan-Indian empire. Under Ashoka, the empire reached its zenith, promoting Dhamma and non-violence. Their administrative system was highly centralized, as described in Kautilya's Arthashastra.";
    if (title.includes("gupta")) return "The Gupta Empire is known as the Golden Age of India. Science, mathematics, and literature flourished—pioneered by figures like Aryabhata and Kalidasa. The era saw the peak of Indian art and architecture, characterized by elegance and spiritual depth.";
    if (title.includes("mughal")) return "The Mughal Empire introduced a unique synthesis of Persian, Indian, and Islamic cultures. Famous for architectural marvels like the Taj Mahal, the empire also optimized land revenue systems and built vast infrastructure that connected the subcontinent.";
    if (title.includes("independence")) return "The struggle for independence was a transformative mass movement led by figures like Mahatma Gandhi. It pioneered non-violent resistance and brought together diverse communities to challenge colonial rule, culminating in the birth of the Republic of India.";

    return "The detailed records of this era indicate a significant shift in cultural and technological paradigms. Excavations have revealed intricate tools and artifacts that suggest a highly organized society with complex belief systems. The evidence found at various sites points towards established trade routes and sophisticated resource management.";
};

const getMediaPaths = (eraTitle: string) => {
    const title = eraTitle.toLowerCase();

    // Default paths
    let video = "/VIDEOS/Paleolithic_age_old_202602032313_ljjb1.mp4";
    let audio = "/AUDIO/Paleolithic Age.mp3";
    let tool = "/TOOLS/paleolithic age tool.png";

    // Audio Mapping
    if (title.includes("mesolithic")) audio = "/AUDIO/Mesolithic Age.mp3";
    else if (title.includes("neolithic")) audio = "/AUDIO/Neolithic Age.mp3";
    else if (title.includes("chalcolithic")) audio = "/AUDIO/Chalcolithic Age.mp3";
    else if (title.includes("proto-historic")) audio = "/AUDIO/PROTOHISTORY.mp3";

    // Video Mapping (Keywords matching filenames)
    if (title.includes("gupta")) video = "/VIDEOS/Gupta_empire__202602032350_miafq.mp4";
    else if (title.includes("transition to medieval")) video = "/VIDEOS/Late_ancient__202602032352_2g7kg.mp4";
    else if (title.includes("mahajanapadas")) video = "/VIDEOS/Mahajanapadas__new_202602032332_kwvez.mp4";
    else if (title.includes("mauryan")) video = "/VIDEOS/Mauryan_empire_short_202602032345_p21u0.mp4";
    else if (title.includes("post-gupta") || title.includes("fragmentation")) video = "/VIDEOS/Postgupta__early_202602032353_gvc73.mp4";
    else if (title.includes("post-mauryan")) video = "/VIDEOS/Postmauryan__classical_202602032348_nyl2x.mp4";
    else if (title.includes("proto-historic")) video = "/VIDEOS/Protohistory_transition_to_202602032323_zdh.mp4";
    else if (title.includes("chalcolithic")) video = "/VIDEOS/The_chalcolithic_age_202602032321_uda90.mp4";
    else if (title.includes("indus valley")) video = "/VIDEOS/The_indus_valley_202602032325_6pgbk.mp4";
    else if (title.includes("mesolithic")) video = "/VIDEOS/The_mesolithic_age_202602032316_co5d9.mp4";
    else if (title.includes("neolithic")) video = "/VIDEOS/The_neolithic_age_202602032318_f43wo.mp4";
    else if (title.includes("vedic")) video = "/VIDEOS/The_vedic_period_202602032327_cp4rp.mp4";
    else if (title.includes("delhi sultanate")) video = "/VIDEOS/__delhi_202602032356_po9b9.mp4";
    else if (title.includes("vijayanagara")) video = "/VIDEOS/_vijayanagara__202602032356_a68cg.mp4";

    // Tools Mapping
    if (title.includes("buxar")) tool = "/TOOLS/Battle of Buxar tools.png";
    else if (title.includes("plassey")) tool = "/TOOLS/Battle of Plassey tools.png";
    else if (title.includes("gandhi")) tool = "/TOOLS/Birth of Mahatma Gandhi ,tool .png";
    else if (title.includes("sultanate")) tool = "/TOOLS/Delhi Sultanate tools.png";
    else if (title.includes("early medieval india")) tool = "/TOOLS/Early Medieval India tools.png";
    else if (title.includes("east india company")) tool = "/TOOLS/East India Company tools.png";
    else if (title.includes("anglo-maratha")) tool = "/TOOLS/First Anglo-Maratha War .png";
    else if (title.includes("government of india act")) tool = "/TOOLS/Government of India Act.png";
    else if (title.includes("gupta empire")) tool = "/TOOLS/Gupta Empire (Golden Age) tool.png";
    else if (title.includes("independence")) tool = "/TOOLS/Independence & Partition , tools .png";
    else if (title.includes("constitution")) tool = "/TOOLS/Indian Constitution ,tools.png";
    else if (title.includes("indus valley")) tool = "/TOOLS/Indus Valley Civilization tool.png";
    else if (title.includes("iron age")) tool = "/TOOLS/Iron Age  Kingdoms tool.png";
    else if (title.includes("jallianwala")) tool = "/TOOLS/Jallianwala Bagh Massacre tool.png";
    else if (title.includes("mahajanapadas")) tool = "/TOOLS/Mahajanapadas & New Religions tool.png";
    else if (title.includes("mauryan")) tool = "/TOOLS/Mauryan Empire tool.png";
    else if (title.includes("mesolithic")) tool = "/TOOLS/Mesolithic Age tool.png";
    else if (title.includes("mughal")) tool = "/TOOLS/Mughal Empire tools.png";
    else if (title.includes("neolithic")) tool = "/TOOLS/Neolithic Age tool.png";
    else if (title.includes("post-gupta")) tool = "/TOOLS/Post-Gupta Period tool.png";
    else if (title.includes("post-mauryan")) tool = "/TOOLS/Post-Mauryan Period tools.png";
    else if (title.includes("proto-history")) tool = "/TOOLS/Proto-History tool.png";
    else if (title.includes("regional powers")) tool = "/TOOLS/Regional Powers tools.png";
    else if (title.includes("hooghly")) tool = "/TOOLS/Siege of Hooghly tools.png";
    else if (title.includes("vijayanagara")) tool = "/TOOLS/Vijayanagara Empire tool.png";
    else if (title.includes("muslim league")) tool = "/TOOLS/all india muslim league tools.png";
    else if (title.includes("aurangzeb")) tool = "/TOOLS/aurenjeb time tools.png";
    else if (title.includes("banaras")) tool = "/TOOLS/banaras uprising relellion against britisher ,tool.png";
    else if (title.includes("crown rule")) tool = "/TOOLS/british crown rule tools.png";
    else if (title.includes("chalcolithic")) tool = "/TOOLS/chalcolithic  age tool.png";
    else if (title.includes("economic reforms")) tool = "/TOOLS/economic reforms, tools.png";
    else if (title.includes("first war of independence")) tool = "/TOOLS/first war of independence tools.png";
    else if (title.includes("china war")) tool = "/TOOLS/india china war , tool .png";
    else if (title.includes("pakistan war")) tool = "/TOOLS/india pakistan war,tools.png";
    else if (title.includes("national congress")) tool = "/TOOLS/indian national congress toools.png";
    else if (title.includes("late ancient")) tool = "/TOOLS/late ancient trasaction tool .png";
    else if (title.includes("modern india")) tool = "/TOOLS/modern india ,tools.png";
    else if (title.includes("non coperation")) tool = "/TOOLS/non coperation moment , tool .png";
    else if (title.includes("quit india")) tool = "/TOOLS/quit india moment ,tool .png";
    else if (title.includes("salt march")) tool = "/TOOLS/salt march tool .png";
    else if (title.includes("vedic period")) tool = "/TOOLS/vedic period tools.png";
    else if (title.includes("world war 1")) tool = "/TOOLS/world war 1 tool .png";

    // Map Path mapping
    let map = "/PHOTOS/mature harappan phase.png";
    if (title.includes("medieval")) map = "/PHOTOS/1000 ce early  medieval india.png";
    else if (title.includes("modern")) map = "/PHOTOS/british rule in india.png";
    else if (title.includes("delhi sultanate")) map = "/PHOTOS/1206 delhi sultnate.png";
    else if (title.includes("mughal")) map = "/PHOTOS/mughal empire.png";
    else if (title.includes("independence") || title.includes("republic")) map = "/PHOTOS/MODERN INDIA.png";

    return { video, audio, tool, map };
};

const SpotifyAudioPlayer: React.FC<{
    audioSrc: string;
    title: string;
    subtitle: string;
    image: string;
}> = ({ audioSrc, title, subtitle, image }) => {
    const [isPlaying, setIsPlaying] = React.useState(false);
    const [progress, setProgress] = React.useState(0);
    const audioRef = React.useRef<HTMLAudioElement>(null);

    const togglePlay = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            const current = audioRef.current.currentTime;
            const duration = audioRef.current.duration;
            if (duration > 0) {
                setProgress((current / duration) * 100);
            }
        }
    };

    return (
        <div className="w-full h-full flex flex-col items-center justify-between bg-gradient-to-b from-amber-900/40 to-black p-4 rounded-xl relative overflow-hidden">
            {/* Glossy Overlay */}
            <div className="absolute inset-0 bg-white/5 pointer-events-none" />

            <audio
                ref={audioRef}
                src={audioSrc}
                onTimeUpdate={handleTimeUpdate}
                onEnded={() => setIsPlaying(false)}
            />

            <div className="flex items-center w-full gap-4 mt-2">
                {/* Album Art */}
                <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 shadow-lg border border-white/10">
                    <Image src={image} alt={title} fill className="object-cover" />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                    <h4 className="text-amber-200 font-bold truncate text-sm tracking-tight">{title}</h4>
                    <p className="text-white/40 text-[10px] uppercase tracking-tighter font-sans">{subtitle}</p>
                </div>

                <Volume2 className="w-4 h-4 text-white/40 cursor-pointer hover:text-white transition-colors" />
            </div>

            {/* Visualizer bars */}
            <div className="flex gap-0.5 items-end justify-center h-8 w-full opacity-30">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        animate={isPlaying ? { height: [4, 20, 10, 24, 8] } : { height: 4 }}
                        transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.05 }}
                        className="w-px bg-amber-500 rounded-full"
                    />
                ))}
            </div>

            {/* Controls */}
            <div className="w-full space-y-3 mb-2">
                <div className="flex items-center justify-center gap-6">
                    <SkipBack className="w-4 h-4 text-white/60 cursor-pointer hover:text-white transition-colors" />
                    <button
                        onClick={togglePlay}
                        className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center text-black hover:scale-105 transition-transform shadow-lg active:scale-95"
                    >
                        {isPlaying ? <Pause className="fill-current w-5 h-5" /> : <Play className="fill-current translate-x-0.5 w-5 h-5" />}
                    </button>
                    <SkipForward className="w-4 h-4 text-white/60 cursor-pointer hover:text-white transition-colors" />
                </div>

                {/* Progress Bar */}
                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden relative">
                    <motion.div
                        className="absolute top-0 left-0 h-full bg-amber-500"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>
        </div>
    );
};

const SubItemCard: React.FC<{
    sub: SubItem;
    eraTitle: string;
    eraImage: string;
    mode: MediaMode;
    isSelected: boolean;
    onSelect: () => void;
    onExpandArticle?: (data: { title: string, content: string, date: string }) => void;
}> = ({ sub, eraTitle, eraImage, mode, isSelected, onSelect, onExpandArticle }) => {
    const { video, audio, tool, map } = getMediaPaths(eraTitle);
    const article = getArticleContent(eraTitle);
    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{
                opacity: 1,
                scale: 1,
                width: isSelected ? 480 : 180
            }}
            whileHover={{ y: isSelected ? -4 : -8 }}
            transition={{
                layout: { duration: 0.6, ease: "easeOut" },
                width: { duration: 0.6, ease: "easeOut" }
            }}
            onClick={(e) => {
                e.stopPropagation();
                onSelect();
            }}
            className={cn(
                "flex-shrink-0 bg-black/60 border rounded-3xl p-5 space-y-5 transition-all duration-300 group/card shadow-2xl relative overflow-hidden cursor-pointer",
                isSelected
                    ? "border-amber-500 ring-2 ring-amber-500/40"
                    : "border-white/10 hover:border-amber-500/20"
            )}
        >
            {/* Content based on Mode */}
            <div className={cn(
                "relative w-full rounded-2xl overflow-hidden transition-all duration-500 p-2",
                isSelected ? "h-64" : "h-28"
            )}>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={mode + (isSelected ? '-focused' : '')}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.1 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="w-full h-full flex items-center justify-center"
                    >
                        {mode === 'Photos' && sub.image ? (
                            <Image
                                src={sub.image}
                                alt={sub.title}
                                fill
                                className="object-contain transition-transform duration-700"
                            />
                        ) : mode === 'Video' ? (
                            isSelected ? (
                                <div className="w-full h-full bg-black">
                                    <video
                                        src={video}
                                        controls
                                        autoPlay
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                            ) : (
                                <div className="flex flex-col items-center gap-4 text-amber-200/40">
                                    <Video className="w-16 h-16" />
                                    {!isSelected && <span className="text-[10px] uppercase font-bold tracking-[0.2em] hidden group-hover/card:block text-center px-2">Video</span>}
                                </div>
                            )
                        ) : mode === 'Audio' ? (
                            isSelected ? (
                                <SpotifyAudioPlayer
                                    audioSrc={audio}
                                    title={sub.title}
                                    subtitle={sub.date}
                                    image={sub.image || eraImage}
                                />
                            ) : (
                                <div className="flex flex-col items-center gap-4 text-amber-200/40">
                                    <Headphones className="w-16 h-16" />
                                </div>
                            )
                        ) : mode === 'Map' ? (
                            <div className="relative w-full h-full">
                                <Image
                                    src={map}
                                    alt="Geographic Context"
                                    fill
                                    className="object-cover opacity-60"
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Map className="w-16 h-16 text-amber-500/40" />
                                </div>
                            </div>
                        ) : mode === 'Article' ? (
                            isSelected ? (
                                <div className="w-full h-full bg-[#f4e4bc] p-6 overflow-hidden rounded-xl border-4 border-amber-900/20 relative shadow-inner group/article">
                                    {/* Paper Texture Overlay */}
                                    <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]" />

                                    <div className="relative h-full flex flex-col">
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center gap-2">
                                                <div className="w-1 h-8 bg-amber-900/40" />
                                                <h5 className="text-amber-950 font-serif text-xl font-bold tracking-tight">ANNALS</h5>
                                            </div>
                                            <div className="w-8 h-8 rounded-full border border-amber-900/20 flex items-center justify-center">
                                                <span className="text-[8px] font-bold text-amber-900/40">XII</span>
                                            </div>
                                        </div>

                                        <p className="text-amber-900/80 text-xs leading-relaxed font-serif italic line-clamp-4 flex-1">
                                            {article}
                                        </p>

                                        {/* THE SIGN (Expand Button) */}
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onExpandArticle?.({ title: sub.title, content: article, date: sub.date });
                                            }}
                                            className="mt-4 w-full py-2 bg-amber-900 text-[#f4e4bc] rounded-lg font-serif text-xs font-bold uppercase tracking-[0.2em] transform transition-all active:scale-95 hover:bg-amber-950 shadow-lg flex items-center justify-center gap-2 group/btn"
                                        >
                                            <div className="w-4 h-4 bg-[#f4e4bc] rounded-full flex items-center justify-center group-hover/btn:rotate-45 transition-transform">
                                                <Plus className="w-3 h-3 text-amber-900" />
                                            </div>
                                            Read Full Record
                                        </button>
                                    </div>

                                    {/* Decorative Corner Sign */}
                                    <div className="absolute -top-6 -right-6 w-12 h-12 bg-amber-600/10 rotate-45 border border-amber-600/20" />
                                </div>
                            ) : (
                                <div className="flex flex-col items-center gap-4 text-amber-200/40">
                                    <FileText className="w-16 h-16" />
                                    <span className="text-[10px] uppercase font-bold tracking-[0.2em]">Open Article</span>
                                </div>
                            )
                        ) : (
                            <div className="relative w-full h-full">
                                <Image
                                    src={tool}
                                    alt="Research Tools"
                                    fill
                                    className="object-contain"
                                />
                                {!isSelected && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                                        <Wrench className="w-12 h-12 text-amber-500/40" />
                                    </div>
                                )}
                            </div>
                        )
                        }
                    </motion.div>
                </AnimatePresence>

                {/* Selection Highlight Overlay */}
                <div className={cn(
                    "absolute inset-0 bg-amber-500/5 transition-opacity pointer-events-none",
                    isSelected ? "opacity-100" : "opacity-0 group-hover/card:opacity-100"
                )} />
            </div>

            <div className={cn("space-y-1 transition-all duration-500 mt-4", !isSelected && "opacity-40")}>
                <h4 className={cn(
                    "font-serif leading-tight transition-all line-clamp-2",
                    isSelected ? "text-xl text-amber-300" : "text-sm text-amber-100 group-hover/card:text-amber-300"
                )}>
                    {sub.title}
                </h4>
                <div className="inline-block px-2 py-0.5 bg-amber-500/10 border border-amber-500/20 rounded-md">
                    <span className="text-[9px] text-amber-500 font-sans uppercase tracking-[0.2em] font-bold">{sub.date}</span>
                </div>
            </div>

            {/* Selection glow */}
            <div className={cn(
                "absolute -bottom-12 -right-12 w-24 h-24 bg-amber-500/20 rounded-full blur-2xl transition-opacity pointer-events-none",
                isSelected ? "opacity-100" : "opacity-0 group-hover/card:opacity-40"
            )} />
        </motion.div>
    );
};

interface SidebarIconProps {
    Icon: any;
    label: string;
    active: boolean;
    onClick: () => void;
}

const SidebarIcon: React.FC<SidebarIconProps> = ({ Icon, label, active, onClick }) => (
    <div
        onClick={(e) => {
            e.stopPropagation();
            onClick();
        }}
        className="flex flex-col items-center gap-0.5 group/icon cursor-pointer transition-all"
    >
        <div className={cn(
            "p-2 rounded-lg border transition-all duration-300",
            active
                ? "bg-amber-500 border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.3)] scale-105"
                : "bg-white/5 border-white/5 group-hover/icon:border-amber-500/40 group-hover/icon:bg-amber-500/10"
        )}>
            <Icon className={cn(
                "w-4 h-4 transition-colors",
                active ? "text-black" : "text-white/40 group-hover/icon:text-amber-400"
            )} />
        </div>
        <span className={cn(
            "text-[7px] uppercase tracking-wider font-sans font-bold transition-colors whitespace-nowrap",
            active ? "text-amber-400" : "text-white/20 group-hover/icon:text-amber-200/60"
        )}>
            {label}
        </span>
    </div>
);

export default ExpandableTimelineItem;

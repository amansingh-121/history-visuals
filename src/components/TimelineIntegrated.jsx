"use client";

import React, { useRef, useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FogOverlay from "@/components/FogOverlay";
import LandingPageItem from "@/components/LandingPageItem";
import ExpandableTimelineItem from "@/components/ExpandableTimelineItem";
import VerticalZigZagPath from "@/components/VerticalZigZagPath";
import { useNavigate } from "react-router-dom";
import { categoryData } from "../data/categoryData";
import { TIMELINE_DATA } from "../../app/data/timeline";
import CategoryModal from "./CategoryModal";
import { Search } from "lucide-react";

export default function TimelineIntegrated() {
    const navigate = useNavigate();
    const containerRef = useRef(null);
    const [view, setView] = useState("periods");
    const [selectedPeriod, setSelectedPeriod] = useState(null);
    const [expandedId, setExpandedId] = useState(null);

    // Modal & Search States
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCategoryData, setSelectedCategoryData] = useState(null);
    const [initialModalIndex, setInitialModalIndex] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const searchRef = useRef(null);

    // Filter timeline data
    const filteredTimelineData = useMemo(() => {
        if (!selectedPeriod) return [];
        return TIMELINE_DATA.filter((item) => item.period === selectedPeriod);
    }, [selectedPeriod]);

    const handlePeriodSelect = (period) => {
        if (period) {
            setSelectedPeriod(period);
            setView("timeline");
        } else {
            setSelectedPeriod(null);
            setView("periods");
        }
        setExpandedId(null);
    };

    const toggleExpand = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        if (query.trim()) {
            const results = [];
            Object.keys(categoryData).forEach(catId => {
                const cat = categoryData[catId];
                if (cat.indexItems) {
                    cat.indexItems.forEach(item => {
                        if (item.title.toLowerCase().includes(query.toLowerCase())) {
                            results.push({
                                ...item,
                                categoryId: catId,
                                categoryTitle: cat.title
                            });
                        }
                    });
                }
            });
            setSuggestions(results.slice(0, 8));
            setShowSuggestions(true);
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setSearchQuery("");
        setShowSuggestions(false);
        setSelectedCategoryData(categoryData[suggestion.categoryId]);
        const idx = categoryData[suggestion.categoryId].indexItems?.findIndex(item =>
            item.title === suggestion.title
        );
        setInitialModalIndex(idx !== -1 ? idx : 0);
        setIsModalOpen(true);
    };

    // Close suggestions on click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <main
            ref={containerRef}
            className="relative w-full min-h-screen bg-[#1a120b] font-serif text-[#f8f1e7] selection:bg-amber-500 selection:text-black overflow-x-hidden"
        >
            <FogOverlay />

            <AnimatePresence mode="wait">
                {view === "periods" && (
                    <motion.div key="periods" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative z-10 w-full">
                        <header className="relative pt-32 pb-20 text-center space-y-6 z-20">
                            <button
                                onClick={() => navigate("/")}
                                className="absolute top-12 left-12 flex items-center gap-3 group text-white/40 hover:text-amber-200 transition-all duration-300 bg-black/40 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/5 hover:border-amber-500/30"
                            >
                                <span className="text-xl">←</span>
                                <span className="font-sans text-[10px] uppercase tracking-[0.3em] font-bold">Dashboard</span>
                            </button>

                            <div className="space-y-2">
                                <h1 className="text-7xl md:text-9xl font-serif tracking-[0.1em] text-transparent bg-clip-text bg-gradient-to-b from-amber-100 via-amber-400 to-amber-900 drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]">
                                    ITIHAAS
                                </h1>
                                <div className="flex items-center justify-center gap-4">
                                    <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-amber-500/50" />
                                    <p className="text-amber-200/80 text-sm md:text-base tracking-[0.6em] uppercase font-sans font-light">
                                        CHOOSE YOUR JOURNEY
                                    </p>
                                    <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-amber-500/50" />
                                </div>
                            </div>

                            {/* Global Search Bar */}
                            <div className="relative max-w-2xl mx-auto mt-8 px-4" ref={searchRef}>
                                <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-full px-6 py-3 backdrop-blur-md focus-within:border-amber-500/30 transition-all">
                                    <Search size={20} className="text-white/40" />
                                    <input
                                        type="text"
                                        placeholder="Search your Topic"
                                        className="bg-transparent border-none outline-none text-white w-full text-lg placeholder:text-white/20"
                                        value={searchQuery}
                                        onChange={handleSearchChange}
                                    />
                                </div>
                                {showSuggestions && suggestions.length > 0 && (
                                    <div className="absolute top-full left-4 right-4 mt-3 bg-[#1a120b] border border-white/10 rounded-2xl p-2 z-[60] shadow-2xl text-left">
                                        {suggestions.map((suggestion, idx) => (
                                            <div
                                                key={idx}
                                                onClick={() => handleSuggestionClick(suggestion)}
                                                className="p-4 hover:bg-white/5 rounded-xl cursor-pointer group transition-all"
                                            >
                                                <div className="text-white group-hover:text-amber-200 font-sans">{suggestion.title}</div>
                                                <div className="text-xs text-white/40 uppercase tracking-widest font-sans">{suggestion.categoryTitle}</div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </header>

                        <div id="timeline-landing" className={`relative pb-48 space-y-0 min-h-screen ${isModalOpen ? 'blur-md pointer-events-none' : ''}`}>
                            <VerticalZigZagPath count={3} />
                            <div className="relative">
                                {[
                                    { id: "ancient", title: "Ancient", desc: "The Dawn of Civilization", img: "/PHOTOS/PALEOLITHIC 1 .png" },
                                    { id: "medieval", title: "Medieval", desc: "The Era of Empires", img: "/PHOTOS/mughal empire.png" },
                                    { id: "modern", title: "Modern", desc: "The Road to Republic", img: "/PHOTOS/MODERN INDIA.png" },
                                ].map((era, idx) => (
                                    <LandingPageItem
                                        key={era.id}
                                        id={era.id}
                                        title={era.title}
                                        description={era.desc}
                                        image={era.img}
                                        index={idx}
                                        onClick={() => handlePeriodSelect(era.id)}
                                    />
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}

                {view === "timeline" && (
                    <motion.div key="timeline" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative z-10">
                        {/* Sticky Header */}
                        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-6 px-8 py-3 bg-[#1a120b]/60 backdrop-blur-2xl border border-white/10 rounded-full shadow-2xl">
                            <button
                                onClick={() => handlePeriodSelect(null)}
                                className="flex items-center gap-2 group text-white/60 hover:text-white transition-colors border-r border-white/10 pr-6 mr-2"
                            >
                                <span>←</span>
                                <span className="font-sans text-xs uppercase tracking-widest font-bold">Back</span>
                            </button>
                            <div className="flex items-center gap-3">
                                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                                <h2 className="text-xl md:text-2xl font-serif text-amber-200 capitalize tracking-tight">
                                    {selectedPeriod} Timeline
                                </h2>
                            </div>
                        </div>

                        {/* Vertical Timeline Flow */}
                        <div id="timeline-container" className={`relative pt-48 pb-48 space-y-0 min-h-[1200px] ${isModalOpen ? 'blur-md pointer-events-none' : ''}`}>
                            <VerticalZigZagPath count={filteredTimelineData.length} />

                            <div className="space-y-0">
                                {filteredTimelineData.map((item, idx) => (
                                    <ExpandableTimelineItem
                                        key={item.id}
                                        item={item}
                                        index={idx}
                                        isExpanded={expandedId === item.id}
                                        onToggle={() => toggleExpand(item.id)}
                                    />
                                ))}
                            </div>

                            <div className="text-center py-24 opacity-60">
                                <div className="w-16 h-1 bg-amber-500/30 mx-auto mb-4 rounded-full" />
                                <span className="text-amber-500 font-serif text-2xl tracking-widest uppercase">
                                    End of {selectedPeriod} Era
                                </span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <CategoryModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                categoryData={selectedCategoryData}
                initialIndex={initialModalIndex}
            />
        </main>
    );
}

"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import {
    Search,
    Play,
    Type,
    FileText,
    Map as MapIcon,
    Bookmark,
    Share2,
    Download,
    Volume2,
    VolumeX,
    PenTool,
    Highlighter,
    Search as SearchIcon,
    X,
    BookmarkCheck,
    Square
} from "lucide-react";
import './PremiumCategoryView.css';
import { categoryData } from '../data/categoryData';

interface IndexItem {
    title: string;
    content: string;
    image: string;
}

interface PremiumCategoryViewProps {
    onBack: () => void;
    title: string;
    image: string;
    indexItems?: IndexItem[];
    articleContent?: string;
    initialIndex?: number;
    allowGlobalSearch?: boolean;
    onCategoryChange?: (categoryId: string, itemTitle?: string) => void;
}

const PremiumCategoryView: React.FC<PremiumCategoryViewProps> = ({
    onBack,
    title,
    image,
    indexItems = [],
    articleContent = "",
    initialIndex = 0,
    allowGlobalSearch = true,
    onCategoryChange
}) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [activeIndex, setActiveIndex] = useState(initialIndex);

    useEffect(() => {
        setActiveIndex(initialIndex);
    }, [initialIndex]);

    const currentItem = indexItems.length > 0 ? indexItems[activeIndex] : null;
    const displayContent = currentItem ? currentItem.content : articleContent;
    const displayImage = currentItem ? currentItem.image : image;

    // Toolbar state
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [highlightMode, setHighlightMode] = useState(false);
    const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [showFullArticle, setShowFullArticle] = useState(false);
    const [activePen, setActivePen] = useState<null | 'green' | 'purple'>(null);
    const [toast, setToast] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [suggestions, setSuggestions] = useState<any[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);
    const [speechCharIndex, setSpeechCharIndex] = useState<number>(-1);
    const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

    const showToast = useCallback((message: string) => {
        setToast(message);
        setTimeout(() => setToast(null), 2500);
    }, []);

    // Close suggestions on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Cleanup speech on unmount
    useEffect(() => {
        return () => {
            window.speechSynthesis.cancel();
        };
    }, []);

    // Handle scroll-lock for internal full-screen article
    useEffect(() => {
        if (showFullArticle) {
            document.body.classList.add('no-scroll');
        } else {
            // Only remove if not in a parent modal? 
            // Actually, CategoryModal also manages this.
            // If CategoryModal is open, body should stay no-scroll.
            // But if PremiumCategoryView is a page, it should remove it.
            // The cleanest is to let CategoryModal handle its own, 
            // and PremiumCategoryView handle its internal one.
            if (!document.querySelector('.category-modal-overlay')) {
                document.body.classList.remove('no-scroll');
            }
        }
        return () => {
            if (!document.querySelector('.category-modal-overlay')) {
                document.body.classList.remove('no-scroll');
            }
        };
    }, [showFullArticle]);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    // --- Toolbar Handlers ---

    const handleMapClick = () => {
        const query = encodeURIComponent(`${title} India historical places`);
        window.open(`https://www.google.com/maps/search/${query}`, '_blank');
        showToast('Opening map...');
    };

    const handlePenClick = (color: 'green' | 'purple') => {
        setActivePen(prev => prev === color ? null : color);
        setHighlightMode(false);
        showToast(activePen === color ? 'Pen deactivated' : `${color === 'green' ? 'Green' : 'Purple'} pen active`);
    };

    const handleHighlighterClick = () => {
        setHighlightMode(prev => !prev);
        setActivePen(null);
        showToast(highlightMode ? 'Highlight mode off' : 'Highlight mode on — select text to highlight');
    };

    const handleBookmarkClick = () => {
        setIsBookmarked(prev => !prev);
        showToast(isBookmarked ? 'Bookmark removed' : 'Bookmarked!');
    };

    const handleFullArticleClick = () => {
        setShowFullArticle(true);
    };

    const handleFontSizeClick = () => {
        setFontSize(prev => {
            if (prev === 'normal') { showToast('Font size: Large'); return 'large'; }
            if (prev === 'large') { showToast('Font size: Extra Large'); return 'xlarge'; }
            showToast('Font size: Normal');
            return 'normal';
        });
    };

    const handleShareClick = async () => {
        const shareData = {
            title: title,
            text: `Check out this article about ${title}`,
            url: window.location.href,
        };
        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                await navigator.clipboard.writeText(window.location.href);
                showToast('Link copied to clipboard!');
            }
        } catch {
            await navigator.clipboard.writeText(window.location.href);
            showToast('Link copied to clipboard!');
        }
    };

    const handleDownloadClick = () => {
        const blob = new Blob([`${title}${currentItem ? ` - ${currentItem.title}` : ''}\n\n${displayContent}`], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${title.replace(/\s+/g, '_')}${currentItem ? `_${currentItem.title.replace(/\s+/g, '_')}` : ''}_article.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        showToast('Article downloaded!');
    };

    const handleSpeechClick = () => {
        const synth = window.speechSynthesis;

        if (isSpeaking) {
            synth.pause();
            setIsSpeaking(false);
            showToast('Speech paused');
        } else {
            if (synth.paused) {
                synth.resume();
                setIsSpeaking(true);
                showToast('Resuming...');
            } else {
                synth.cancel();

                // Ensure content isn't empty
                if (!displayContent.trim()) {
                    showToast('No content to read');
                    return;
                }

                const utterance = new SpeechSynthesisUtterance(displayContent);
                utteranceRef.current = utterance;
                utterance.lang = 'en-IN';
                utterance.rate = 0.95;

                utterance.onboundary = (event) => {
                    if (event.name === 'word') {
                        setSpeechCharIndex(event.charIndex);
                    }
                };

                utterance.onend = () => {
                    setIsSpeaking(false);
                    setSpeechCharIndex(-1);
                    utteranceRef.current = null;
                };

                utterance.onerror = (event) => {
                    console.error('Speech synthesis error:', event);
                    setIsSpeaking(false);
                    setSpeechCharIndex(-1);
                    utteranceRef.current = null;
                    if (event.error !== 'interrupted') {
                        showToast('Speech error occurred');
                    }
                };

                // Some browsers need a slight delay after cancel
                setTimeout(() => {
                    synth.speak(utterance);
                    setIsSpeaking(true);
                    showToast('Reading aloud...');
                }, 50);
            }
        }
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query);
        if (query.trim()) {
            if (allowGlobalSearch) {
                const results: any[] = [];
                Object.keys(categoryData).forEach(catId => {
                    const cat = (categoryData as any)[catId];
                    if (cat.indexItems) {
                        cat.indexItems.forEach((item: any) => {
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
            } else {
                const filtered = indexItems.filter(item =>
                    item.title.toLowerCase().includes(query.toLowerCase())
                );
                setSuggestions(filtered);
            }
            setShowSuggestions(true);
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
        }
    };

    const handleSuggestionClick = (item: any) => {
        if (item.categoryId && onCategoryChange && item.categoryId !== (Object.keys(categoryData).find(key => (categoryData as any)[key].title === title) || '')) {
            onCategoryChange(item.categoryId, item.title);
        } else {
            const idx = indexItems.findIndex(i => i.title === item.title);
            if (idx !== -1) {
                setActiveIndex(idx);
                setSearchQuery("");
                setShowSuggestions(false);
                window.speechSynthesis.cancel();
                setIsSpeaking(false);
            }
        }
        setSearchQuery("");
        setShowSuggestions(false);
    };

    const fontClass = fontSize === 'large' ? 'font-large' : fontSize === 'xlarge' ? 'font-xlarge' : '';

    return (
        <div className="premium-view-container">
            {/* Toast Notification */}
            {toast && (
                <div className="premium-toast">{toast}</div>
            )}

            {/* Full-Screen Article Overlay */}
            {showFullArticle && (
                <div className="premium-fullscreen-overlay">
                    <div className="fullscreen-article-content">
                        <button className="fullscreen-close-btn" onClick={() => {
                            setShowFullArticle(false);
                            window.speechSynthesis.cancel();
                            setIsSpeaking(false);
                        }}>
                            <X size={28} />
                        </button>
                        <h1 className="fullscreen-title">{title}{currentItem ? ` - ${currentItem.title}` : ''}</h1>
                        {displayContent.split('\n\n').map((paragraph: string, pIndex: number) => {
                            const paragraphsBefore = displayContent.split('\n\n').slice(0, pIndex);
                            const globalStart = paragraphsBefore.join('\n\n').length + (pIndex > 0 ? 2 : 0);
                            const globalEnd = globalStart + paragraph.length;

                            const isCurrentParagraph = speechCharIndex >= globalStart && speechCharIndex < globalEnd;

                            if (!isCurrentParagraph) {
                                return <p key={pIndex} className="fullscreen-paragraph">{paragraph}</p>;
                            }

                            const localIndex = speechCharIndex - globalStart;
                            const before = paragraph.substring(0, localIndex);
                            const match = paragraph.substring(localIndex).match(/^[^\s]+/);
                            const word = match ? match[0] : "";
                            const after = paragraph.substring(localIndex + word.length);

                            return (
                                <p key={pIndex} className="fullscreen-paragraph">
                                    {before}
                                    <span className="speech-highlight">{word}</span>
                                    {after}
                                </p>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Header with Title, Search and Back Button */}
            <header className="premium-header-row">
                <div className="premium-title-group">
                    <h1 className="premium-main-title">{title}</h1>
                </div>

                <div className="premium-search-wrapper" ref={searchRef}>
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="Search your Topic"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            onFocus={() => searchQuery.trim() && setShowSuggestions(true)}
                        />
                        <SearchIcon className="text-white/50 w-5 h-5 cursor-pointer" />
                    </div>
                    {showSuggestions && suggestions.length > 0 && (
                        <ul className="search-suggestions">
                            {suggestions.map((item, i) => (
                                <li key={i} onClick={() => handleSuggestionClick(item)}>
                                    {item.title}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <button onClick={onBack} className="premium-back-btn">
                    ← Back to Dashboard
                </button>
            </header>

            {/* Main Layout Grid */}
            <div className="premium-layout-grid">

                {/* Left Column */}
                <aside className="premium-left-column">
                    <div className="premium-main-media-card" onClick={togglePlay}>
                        <video
                            ref={videoRef}
                            className="premium-media-video"
                            loop
                            poster={displayImage}
                        >
                            <source src="/VIDEOS/The_indus_valley_202602032325_6pgbk.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                        {!isPlaying && (
                            <div className="premium-play-overlay">
                                <Play fill="black" size={24} />
                            </div>
                        )}
                    </div>

                    {/* Index Section */}
                    <div className="premium-index-card">
                        <h3 className="premium-index-title">Index</h3>
                        <ul className="premium-index-list">
                            {indexItems.map((item: IndexItem, idx: number) => (
                                <li
                                    key={idx}
                                    className={activeIndex === idx ? 'active' : ''}
                                    onClick={() => {
                                        setActiveIndex(idx);
                                        window.speechSynthesis.cancel();
                                        setIsSpeaking(false);
                                    }}
                                >
                                    {item.title}
                                </li>
                            ))}
                        </ul>
                    </div>
                </aside>

                {/* Right Content Area */}
                <main className="premium-content-well">
                    <div className="premium-toolbar-container">
                        <div className="premium-toolbar">
                            <div className="toolbar-item" onClick={handleMapClick} title="Open in Maps">
                                <MapIcon />
                            </div>
                            <div className={`toolbar-item toolbar-green ${activePen === 'green' ? 'active' : ''}`} onClick={() => handlePenClick('green')} title="Green Pen">
                                <PenTool />
                            </div>
                            <div className={`toolbar-item toolbar-purple ${activePen === 'purple' ? 'active' : ''}`} onClick={() => handlePenClick('purple')} title="Purple Pen">
                                <PenTool />
                            </div>
                            <div className={`toolbar-item toolbar-yellow ${highlightMode ? 'active' : ''}`} onClick={handleHighlighterClick} title="Highlight Text">
                                <Highlighter />
                            </div>
                            <div className={`toolbar-item ${isBookmarked ? 'active' : ''}`} onClick={handleBookmarkClick} title="Bookmark">
                                {isBookmarked ? <BookmarkCheck /> : <Bookmark />}
                            </div>
                            <div className={`toolbar-item ${showFullArticle ? 'active' : ''}`} onClick={handleFullArticleClick} title="Full Article View">
                                <FileText />
                            </div>
                            <div className={`toolbar-item ${fontSize !== 'normal' ? 'active' : ''}`} onClick={handleFontSizeClick} title="Change Font Size">
                                <Type />
                            </div>
                            <div className="toolbar-item" onClick={handleShareClick} title="Share">
                                <Share2 />
                            </div>
                            <div className="toolbar-item" onClick={handleDownloadClick} title="Download Article">
                                <Download />
                            </div>
                            <div className={`toolbar-item ${isSpeaking ? 'active toolbar-speaking' : ''}`} onClick={handleSpeechClick} title="Read Aloud">
                                {isSpeaking ? <Square size={20} /> : <Play size={20} />}
                            </div>
                        </div>
                    </div>

                    <article className={`premium-article-body ${fontClass} 
                        ${highlightMode ? 'highlighter-yellow' : ''} 
                        ${activePen === 'green' ? 'pen-green' : ''} 
                        ${activePen === 'purple' ? 'pen-purple' : ''}`}>
                        <h2>{currentItem ? currentItem.title : 'Content'}</h2>
                        {displayContent.split('\n\n').map((paragraph: string, pIndex: number) => {
                            // Calculate the global start index for this paragraph
                            const paragraphsBefore = displayContent.split('\n\n').slice(0, pIndex);
                            const globalStart = paragraphsBefore.join('\n\n').length + (pIndex > 0 ? 2 : 0);
                            const globalEnd = globalStart + paragraph.length;

                            const isCurrentParagraph = speechCharIndex >= globalStart && speechCharIndex < globalEnd;

                            if (!isCurrentParagraph) {
                                return <p key={pIndex}>{paragraph}</p>;
                            }

                            // If this is the current paragraph, find the word to highlight
                            const localIndex = speechCharIndex - globalStart;

                            // Simple word boundary detection (this is an approximation as Speech API behavior varies)
                            // We find the word starting at localIndex
                            const before = paragraph.substring(0, localIndex);
                            const match = paragraph.substring(localIndex).match(/^[^\s]+/);
                            const word = match ? match[0] : "";
                            const after = paragraph.substring(localIndex + word.length);

                            return (
                                <p key={pIndex}>
                                    {before}
                                    <span className="speech-highlight">{word}</span>
                                    {after}
                                </p>
                            );
                        })}
                    </article>
                </main>
            </div>
        </div>
    );
};

export default PremiumCategoryView;

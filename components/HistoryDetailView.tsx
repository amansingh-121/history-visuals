"use client";

import React, { useRef, useState } from "react";
import {
    Search,
    Play,
    Type,
    FileText,
    Map as MapIcon,
    History as HistoryIcon,
    Bookmark,
    Share2,
    Download,
    Volume2,
    PenTool,
    Highlighter,
    Eraser,
    Search as SearchIcon
} from "lucide-react";

interface HistoryDetailViewProps {
    onBack: () => void;
}

const HistoryDetailView: React.FC<HistoryDetailViewProps> = ({ onBack }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);

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

    return (
        <div className="history-view-container">
            {/* Header with Title, Search and Back Button */}
            <header className="history-header-row">
                <div className="history-title-group">
                    <h1 className="history-main-title">History</h1>
                </div>

                <div className="history-search-wrapper">
                    <div className="search-bar">
                        <input type="text" placeholder="Search your Topic" />
                        <SearchIcon className="text-white/50 w-5 h-5 cursor-pointer" />
                    </div>
                </div>

                <button onClick={onBack} className="history-back-btn">
                    ← Back to Dashboard
                </button>
            </header>

            {/* Main Layout Grid */}
            <div className="history-layout-grid">

                {/* Left Column */}
                <aside className="history-left-column">
                    <div className="history-main-media-card" onClick={togglePlay}>
                        <video
                            ref={videoRef}
                            className="history-media-video"
                            loop
                            poster="https://img.freepik.com/premium-photo/indian-warrior-king-portrait-warrior-ai-generated_91497-10905.jpg"
                        >
                            <source src="/VIDEOS/The_indus_valley_202602032325_6pgbk.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                        {!isPlaying && (
                            <div className="history-play-overlay">
                                <Play fill="black" size={24} />
                            </div>
                        )}
                    </div>

                    {/* Index Section */}
                    <div className="history-index-card">
                        <h3 className="history-index-title">Index</h3>
                        <ul className="history-index-list">
                            <li>Ancient Civilizations</li>
                            <li>Medieval Dynasties</li>
                            <li>Colonial struggle</li>
                            <li>Independence Era</li>
                            <li>Modern Transformation</li>
                        </ul>
                    </div>
                </aside>

                {/* Right Content Area */}
                <main className="history-content-well">
                    <div className="history-toolbar-container">
                        <div className="history-toolbar">
                            <div className="toolbar-item"><MapIcon /></div>
                            <div className="toolbar-item text-green-500"><PenTool /></div>
                            <div className="toolbar-item text-purple-500"><PenTool /></div>
                            <div className="toolbar-item text-yellow-400"><Highlighter /></div>
                            <div className="toolbar-item"><Bookmark /></div>
                            <div className="toolbar-item"><FileText /></div>
                            <div className="toolbar-item"><Type /></div>
                            <div className="toolbar-item"><Share2 /></div>
                            <div className="toolbar-item"><Download /></div>
                            <div className="toolbar-item"><Volume2 /></div>
                            <div className="toolbar-item"><Bookmark /></div>
                        </div>
                    </div>

                    <article className="history-article-body">
                        <h2>Content</h2>
                        <p>
                            Lorem ipsum dolor sit amet, <span className="history-highlight">consectetur</span> adipiscing elit. Pellentesque
                            nec augue sit amet nunc malesuada dapibus. Donec in odio sed nisi
                            fermentum congue ut et risus. Curabitur elementum risus id sagittis
                            auctor. Suspendisse potenti. Fusce aliquam metus et nisi tincidunt,
                            in finibus risus bibendum. Nulla facilisi. Quisque vestibulum dolor at
                            ligula eleifend, id fringilla neque sollicitudin. Duis non lorem ac augue
                            tempus volutpat at sed sapien. Cras eget ipsum sed mauris
                            fermentum sagittis.
                        </p>
                        <p>
                            Sed ut sapien a magna malesuada posuere. Nam tempor dui ac
                            magna molestie, at vehicula arcu tincidunt. Nulla vestibulum
                        </p>
                    </article>
                </main>
            </div>
        </div>
    );
};

export default HistoryDetailView;

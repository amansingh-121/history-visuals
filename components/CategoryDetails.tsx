"use client";

import React from "react";
import HistoryDetailView from "./HistoryDetailView";

const categoryData: Record<string, any> = {
    history: {
        title: "History",
        visitList: [],
        sections: [],
        mediaImg: "https://img.freepik.com/premium-photo/indian-warrior-king-portrait-warrior-ai-generated_91497-10905.jpg",
    },
    food: {
        title: "Food",
        visitList: [],
        sections: [],
        mediaImg: "/PHOTOS/indian food.png",
    },
    "food-history": {
        title: "Food History",
        visitList: [],
        sections: [],
        mediaImg: "/PHOTOS/food history 1.png",
    },
    culture: {
        title: "Culture",
        visitList: [],
        sections: [],
        mediaImg: "/PHOTOS/indian culture .png",
    },
    art: {
        title: "Art",
        visitList: [],
        sections: [],
        mediaImg: "/PHOTOS/art.png",
    },
    festivals: {
        title: "Festivals",
        visitList: [],
        sections: [],
        mediaImg: "/PHOTOS/indian festival holi.png",
    },
    timeline: {
        title: "Timeline of History",
        visitList: ["Ancient Era", "Medieval Period", "Modern India", "Future Scope"],
        sections: ["Prehistoric", "Classical Age", "Colonial Era", "Digital Revolution"],
        mediaImg: "/PHOTOS/Timeline image.png",
    },
    default: {
        title: "Indiascope",
        visitList: ["Explore India", "See the Sights", "Experience Magic"],
        sections: ["Overview", "Search More"],
        mediaImg: "/PHOTOS/heritage.jpg",
    },
};

interface CategoryDetailsProps {
    categoryType: string;
    onBack: () => void;
    onTimelineClick?: () => void;
}

const CategoryDetails: React.FC<CategoryDetailsProps> = ({ categoryType, onBack, onTimelineClick }) => {
    const data = categoryData[categoryType] || categoryData["default"];

    if (categoryType === "history") {
        return <HistoryDetailView onBack={onBack} />;
    }

    return (
        <div className="category-body">
            <header className="top-nav">
                <div className="nav-links">
                    <button onClick={onBack} className="text-[#888] hover:text-[#333] font-bold">
                        ← Dashboard
                    </button>
                    <a className={categoryType === "culture" ? "active" : ""}>Culture</a>
                    <a className={categoryType === "history" ? "active" : ""}>History</a>
                    <a onClick={onTimelineClick} className={categoryType === "timeline" ? "active" : ""}>
                        Timeline
                    </a>
                </div>
                <div className="nav-icons">
                    <button className="nav-icon">
                        <img src="https://img.icons8.com/ios-filled/50/ffffff/text.png" alt="Font" />
                    </button>
                    <button className="nav-icon">
                        <img src="https://img.icons8.com/ios-filled/50/ffffff/compare.png" alt="Compare" />
                    </button>
                    <button className="nav-icon">
                        <img src="https://img.icons8.com/ios-filled/50/ffffff/map.png" alt="Map" />
                    </button>
                </div>
            </header>

            <main className="page-container">
                <h1 id="category-title">{data.title}</h1>

                <div className="breadcrumb-search">
                    <div className="breadcrumb">
                        Home {">"}{" "}
                        <span id="current-category" className="text-amber-700">
                            {data.title}
                        </span>
                    </div>
                    <div className="search-container">
                        <input type="text" placeholder="Search your Topic" />
                        <button className="search-btn">
                            <img src="https://img.icons8.com/ios/50/999999/search--v1.png" alt="Search" />
                        </button>
                    </div>
                </div>

                <div className="main-layout">
                    <aside className="left-sidebar">
                        <div className="card summary-card">
                            <div className="card-header blue-header">
                                Summary of India
                                <span className="header-icon">↗</span>
                            </div>
                            <div className="card-body">
                                <h3 className="text-black">Places to visit in India</h3>
                                <p className="subtitle">Name of the place</p>
                                <ul id="visit-list">
                                    {data.visitList.map((item: string, idx: number) => (
                                        <li key={idx} className="text-slate-700">
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </aside>

                    <section className="center-content">
                        <div className="media-box" id="main-media" style={{ backgroundImage: `url('${data.mediaImg}')` }}>
                            <div className="play-overlay">
                                <button className="play-btn">▶</button>
                            </div>
                            <div className="expand-icon">⤢</div>
                        </div>
                    </section>

                    <aside className="right-sidebar">
                        <div className="card section-card">
                            <div className="card-header blue-header">Section</div>
                            <div className="card-body bg-[#607d8b]">
                                <ul id="section-list">
                                    {data.sections.map((item: string, idx: number) => (
                                        <li key={idx} className="text-white text-lg mb-2">
                                            <span className="bullet">▷</span> {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </aside>
                </div>
            </main>
        </div>
    );
};

export default CategoryDetails;

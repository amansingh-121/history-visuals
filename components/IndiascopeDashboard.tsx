"use client";

import React from "react";

const dashboardCategories = [
    { id: "culture", title: "Culture", image: "/PHOTOS/indian culture .png" },
    { id: "art", title: "Art", image: "/PHOTOS/art.png" },
    { id: "food-history", title: "Food History", image: "/PHOTOS/food history 1.png" },
    { id: "festivals", title: "Festivals", image: "/PHOTOS/indian festival holi.png" },
    { id: "history", title: "History", image: "/PHOTOS/taj mahal.jpg" },
    { id: "timeline", title: "Timeline", image: "/PHOTOS/Timeline image.png" },
];

interface IndiascopeDashboardProps {
    onCategoryClick: (id: string) => void;
}

const IndiascopeDashboard: React.FC<IndiascopeDashboardProps> = ({ onCategoryClick }) => {
    return (
        <div id="dashboard" className="visible">
            <header className="logo-section">
                <h1>indiascope</h1>
                <p>the mystery : the magic</p>
            </header>

            <section className="filter-bar">
                <button className="filter-btn">Categories</button>
                <button className="filter-btn">Time Zone</button>
                <button className="filter-btn">Locations</button>
                <button className="filter-btn">Filters</button>
                <button className="filter-btn" style={{ marginLeft: "auto" }}>
                    Clear all
                </button>
                <button className="filter-btn">All Filter</button>
            </section>

            <main className="content-grid">
                {dashboardCategories.map((cat) => (
                    <div
                        key={cat.id}
                        className="category-card"
                        style={{ backgroundImage: `url('${cat.image}')` }}
                        onClick={() => onCategoryClick(cat.id)}
                    >
                        <div className="category-inner">
                            <span className="vertical-title">{cat.title}</span>
                            <span className="category-name">{cat.title}</span>
                        </div>
                    </div>
                ))}
            </main>
        </div>
    );
};

export default IndiascopeDashboard;

import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import PremiumCategoryView from './PremiumCategoryView';
import { categoryData } from '../data/categoryData';
import CategoryModal from './CategoryModal';
import { Search } from 'lucide-react';
import './Category.css';

const Category = () => {
    const location = useLocation();
    const [data, setData] = useState(categoryData['default']);
    const [categoryType, setCategoryType] = useState('culture');

    // Modal & Search States
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCategoryData, setSelectedCategoryData] = useState(null);
    const [initialModalIndex, setInitialModalIndex] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const searchRef = useRef(null);
    const [initialIndex, setInitialIndex] = useState(0);

    const navigate = useNavigate();

    const premiumCategories = ['history', 'culture', 'art', 'food-history', 'festivals', 'leader', 'shakers-movers', 'indian-fighters'];

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const type = (params.get('type') || 'history').toLowerCase();
        const itemTitle = params.get('item');

        setCategoryType(type);
        const catData = categoryData[type] || categoryData['default'];
        setData(catData);

        if (itemTitle && catData.indexItems) {
            const idx = catData.indexItems.findIndex(item =>
                item.title.toLowerCase() === itemTitle.toLowerCase()
            );
            setInitialIndex(idx !== -1 ? idx : 0);
        } else {
            setInitialIndex(0);
        }
    }, [location]);

    // Scroll lock for modal
    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isModalOpen]);

    // Close suggestions when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [searchRef]);

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

    if (premiumCategories.includes(categoryType)) {
        return (
            <PremiumCategoryView
                onBack={() => navigate('/', { state: { skipIntro: true } })}
                title={data.title}
                image={data.mediaImg}
                indexItems={data.indexItems}
                articleContent={data.articleContent}
                initialIndex={initialIndex}
            />
        );
    }

    return (
        <div className="category-body">
            <header className="top-nav">
                <div className="nav-links">
                    <Link to="/timeline" className={categoryType === 'timeline' ? 'active' : ''}>Timeline</Link>
                    <span className={categoryType === 'culture' ? 'active' : ''} style={{ margin: '0 1.5rem', color: '#888', cursor: 'default' }}>Culture</span>
                    <span className={categoryType === 'history' ? 'active' : ''} style={{ margin: '0 1.5rem', color: '#888', cursor: 'default' }}>History</span>
                    <span className={categoryType === 'states' ? 'active' : ''} style={{ margin: '0 1.5rem', color: '#888', cursor: 'default' }}>States</span>
                </div>
                <div className="nav-icons">
                    <button className="nav-icon"><img src="https://img.icons8.com/ios-filled/50/ffffff/text.png" alt="Font" /></button>
                    <button className="nav-icon"><img src="https://img.icons8.com/ios-filled/50/ffffff/compare.png" alt="Compare" /></button>
                    <button className="nav-icon"><img src="https://img.icons8.com/ios-filled/50/ffffff/map.png" alt="Map" /></button>
                </div>
            </header>

            <main className="page-container">
                <h1 id="category-title">{data.title}</h1>

                <div className="breadcrumb-search">
                    <div className="breadcrumb">Home {'>'} <span id="current-category">{data.title}</span></div>
                    <div className="search-section-wrapper" ref={searchRef}>
                        <div className="search-container">
                            <input
                                type="text"
                                placeholder="Search your Topic"
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                            <button className="search-btn"><Search size={20} color="#999" /></button>
                        </div>
                        {showSuggestions && suggestions.length > 0 && (
                            <div className="search-suggestions-overlay">
                                {suggestions.map((suggestion, idx) => (
                                    <div
                                        key={idx}
                                        onClick={() => handleSuggestionClick(suggestion)}
                                        className="suggestion-item"
                                    >
                                        <div className="suggestion-title">{suggestion.title}</div>
                                        <div className="suggestion-cat">{suggestion.categoryTitle}</div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="main-layout">
                    <aside className="left-sidebar">
                        {data.visitList && data.visitList.length > 0 && (
                            <div className="card summary-card">
                                <div className="card-header blue-header">
                                    Summary of India
                                    <span className="header-icon">↗</span>
                                </div>
                                <div className="card-body">
                                    <h3>Places to visit in India</h3>
                                    <p className="subtitle">Name of the place</p>
                                    <ul id="visit-list">
                                        {data.visitList.map((item, idx) => (
                                            <li key={idx}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}
                    </aside>

                    <section className="center-content">
                        <div
                            className="media-box"
                            id="main-media"
                            style={{ backgroundImage: `url('${data.mediaImg}')` }}
                        >
                            <div className="play-overlay">
                                <button className="play-btn">▶</button>
                            </div>
                            <div className="expand-icon">⤢</div>
                        </div>
                    </section>

                    <aside className="right-sidebar">
                        {data.sections && data.sections.length > 0 && (
                            <div className="card section-card">
                                <div className="card-header blue-header">
                                    Section
                                </div>
                                <div className="card-body">
                                    <ul id="section-list">
                                        {data.sections.map((item, idx) => (
                                            <li key={idx}><span className="bullet">▷</span> {item}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}
                    </aside>
                </div>
            </main>

            <CategoryModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                categoryData={selectedCategoryData}
                initialIndex={initialModalIndex}
            />
        </div>
    );
};

export default Category;

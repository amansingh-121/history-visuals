import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronDown, Search } from 'lucide-react';
import { categoryData } from '../data/categoryData';
import CategoryModal from './CategoryModal';
import './Home.css';

const introImages = [
    { src: '/PHOTOS/taj mahal.jpg', name: 'The Taj Mahal' },
    { src: '/PHOTOS/indian quitab minar.png', name: 'Indian Qutub Minar' },
    { src: '/PHOTOS/indian old lady .png', name: 'Indian Old Lady' },
    { src: '/PHOTOS/cave painting.png', name: 'Cave Painting' }
];

const dashboardCategories = [
    { id: 'culture', title: 'Culture', image: '/PHOTOS/indian%20culture%20.png' },
    { id: 'art', title: 'Art', image: '/PHOTOS/art.png' },
    { id: 'food-history', title: 'Food History', image: '/PHOTOS/food%20history%201.png' },
    { id: 'festivals', title: 'Festivals', image: '/PHOTOS/indian%20festival%20holi.png' },
    { id: 'history', title: 'History', image: '/PHOTOS/taj%20mahal.jpg' },
    { id: 'timeline', title: 'Timeline', image: '/PHOTOS/Timeline%20image.png' }
];

const Home = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showDashboard, setShowDashboard] = useState(location.state?.skipIntro || false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [stripTransforms, setStripTransforms] = useState(Array(8).fill('rotateY(0deg)'));
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const [searchQuery, setSearchQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const searchRef = useRef(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCategoryData, setSelectedCategoryData] = useState(null);
    const [initialModalIndex, setInitialModalIndex] = useState(0);

    const premiumCategories = ['history', 'culture', 'art', 'food-history', 'festivals', 'leader', 'shakers-movers', 'indian-fighters'];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        if (query.trim().length > 0) {
            const allItems = [];
            Object.keys(categoryData).forEach(catId => {
                const cat = categoryData[catId];
                if (cat.indexItems) {
                    cat.indexItems.forEach(item => {
                        if (item.title.toLowerCase().includes(query.toLowerCase())) {
                            allItems.push({
                                ...item,
                                categoryId: catId,
                                categoryTitle: cat.title
                            });
                        }
                    });
                }
            });
            setSuggestions(allItems.slice(0, 8));
            setShowSuggestions(true);
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setSearchQuery("");
        setShowSuggestions(false);
        if (premiumCategories.includes(suggestion.categoryId)) {
            setSelectedCategoryData(categoryData[suggestion.categoryId]);
            const idx = categoryData[suggestion.categoryId].indexItems?.findIndex(item =>
                item.title === suggestion.title
            );
            setInitialModalIndex(idx !== -1 ? idx : 0);
            setIsModalOpen(true);
        } else {
            navigate(`/category?type=${suggestion.categoryId}&item=${encodeURIComponent(suggestion.title)}`);
        }
    };

    const handleSearchKeyDown = (e) => {
        if (e.key === 'Enter' && suggestions.length > 0) {
            handleSuggestionClick(suggestions[0]);
        }
    };

    const newCategories = [
        { id: 'leader', title: 'Leader' },
        { id: 'shakers-movers', title: 'Shakers and Movers' },
        { id: 'indian-fighters', title: 'Indian Fighters' }
    ];

    const handleNextImage = () => {
        if (isAnimating) return;

        if (currentIndex < introImages.length - 1) {
            setIsAnimating(true);

            // Start flip animation
            setStripTransforms(Array(8).fill('rotateY(90deg)'));

            setTimeout(() => {
                // Change image at 90deg point
                setCurrentIndex(prev => prev + 1);
                // Finish flip animation
                setStripTransforms(Array(8).fill('rotateY(0deg)'));

                setTimeout(() => {
                    setIsAnimating(false);
                }, 100);
            }, 100);
        } else {
            setShowDashboard(true);
        }
    };

    const handleCategoryClick = (id) => {
        if (id === 'timeline') {
            navigate('/timeline');
        } else if (premiumCategories.includes(id)) {
            setSelectedCategoryData(categoryData[id]);
            setInitialModalIndex(0);
            setIsModalOpen(true);
        } else {
            navigate(`/category?type=${id}`);
        }
    };

    return (
        <>
            <div id="intro-wrapper" style={{
                opacity: showDashboard ? 0 : 1,
                visibility: showDashboard ? 'hidden' : 'visible'
            }}>
                <div id="intro-container" onClick={handleNextImage}>
                    {stripTransforms.map((transform, index) => (
                        <div
                            key={index}
                            className="strip"
                            style={{
                                backgroundImage: `url('${introImages[currentIndex].src}')`,
                                backgroundPosition: `-${index * (100 / 8)}vw center`,
                                transform: transform
                            }}
                        ></div>
                    ))}
                </div>
                <div id="image-info">
                    <div className="intro-logo">
                        <h1>indiascope</h1>
                        <p>The mystery , The magic</p>
                    </div>
                </div>
            </div>

            <div id="dashboard" className={`${showDashboard ? 'visible' : ''} ${isModalOpen ? 'blur-background' : ''}`}>
                <header className="dashboard-header">
                    <div className="logo-section">
                        <h1>indiascope</h1>
                        <p>the mystery : the magic</p>
                    </div>

                    <div className="search-section" ref={searchRef}>
                        <div className="search-wrapper">
                            <Search className="search-icon" size={20} />
                            <input
                                type="text"
                                placeholder="Search for eras, leaders, or culture..."
                                className="premium-search"
                                value={searchQuery}
                                onChange={handleSearchChange}
                                onKeyDown={handleSearchKeyDown}
                                onFocus={() => searchQuery.trim() && setShowSuggestions(true)}
                            />
                            {showSuggestions && suggestions.length > 0 && (
                                <div className="search-suggestions-main">
                                    {suggestions.map((s, i) => (
                                        <div
                                            key={i}
                                            className="suggestion-item"
                                            onClick={() => handleSuggestionClick(s)}
                                        >
                                            <div className="suggestion-info">
                                                <span className="suggestion-title">{s.title}</span>
                                                <span className="suggestion-cat">{s.categoryTitle}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                <section className="filter-bar">
                    <div className="dropdown-container" ref={dropdownRef}>
                        <button
                            className={`filter-btn dropdown-trigger ${isDropdownOpen ? 'active' : ''}`}
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        >
                            Categories <ChevronDown size={14} className={`chevron ${isDropdownOpen ? 'open' : ''}`} />
                        </button>
                        {isDropdownOpen && (
                            <div className="category-dropdown">
                                {newCategories.map((cat) => (
                                    <div
                                        key={cat.id}
                                        className="dropdown-item"
                                        onClick={() => handleCategoryClick(cat.id)}
                                    >
                                        {cat.title}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <button className="filter-btn">Time Zone</button>
                    <button className="filter-btn">Locations</button>
                    <button className="filter-btn">Filters</button>
                    <button className="filter-btn" style={{ marginLeft: 'auto' }}>Clear all</button>
                    <button className="filter-btn">All Filter</button>
                </section>

                <main className="content-grid">
                    {dashboardCategories.map((cat) => (
                        <div
                            key={cat.id}
                            className="category-card"
                            style={{ backgroundImage: `url('${cat.image}')` }}
                            onClick={() => handleCategoryClick(cat.id)}
                        >
                            <div className="category-inner">
                                <span className="vertical-title">{cat.title}</span>
                                <span className="category-name">{cat.title}</span>
                            </div>
                        </div>
                    ))}
                </main>
            </div>

            <CategoryModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                categoryData={selectedCategoryData}
                initialIndex={initialModalIndex}
            />
        </>
    );
};

export default Home;

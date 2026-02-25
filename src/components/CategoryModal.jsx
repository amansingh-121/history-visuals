import React, { useEffect, useState } from 'react';
import PremiumCategoryView from './PremiumCategoryView';
import { X } from 'lucide-react';
import { categoryData as allCategories } from '../data/categoryData';

const CategoryModal = ({ isOpen, onClose, categoryData: initialData, initialIndex: initialIdx }) => {
    const [currentData, setCurrentData] = useState(initialData);
    const [currentIndex, setCurrentIndex] = useState(initialIdx);

    useEffect(() => {
        if (initialData) setCurrentData(initialData);
        if (initialIdx !== undefined) setCurrentIndex(initialIdx);
    }, [initialData, initialIdx]);

    useEffect(() => {
        const handleEsc = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleEsc);

        if (isOpen) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }

        return () => {
            window.removeEventListener('keydown', handleEsc);
            document.body.classList.remove('no-scroll');
        };
    }, [isOpen, onClose]);

    const handleCategoryChange = (catId, itemTitle) => {
        const newData = allCategories[catId];
        if (newData) {
            setCurrentData(newData);
            if (itemTitle && newData.indexItems) {
                const idx = newData.indexItems.findIndex(item => item.title === itemTitle);
                setCurrentIndex(idx !== -1 ? idx : 0);
            } else {
                setCurrentIndex(0);
            }
        }
    };

    if (!isOpen || !currentData) return null;

    return (
        <div className="category-modal-overlay" onClick={onClose}>
            <div className="category-modal-container" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close-btn" onClick={onClose}>
                    <X size={24} />
                </button>
                <div className="modal-content-wrapper">
                    <PremiumCategoryView
                        onBack={onClose}
                        title={currentData.title}
                        image={currentData.mediaImg}
                        indexItems={currentData.indexItems}
                        articleContent={currentData.articleContent}
                        initialIndex={currentIndex}
                        onCategoryChange={handleCategoryChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default CategoryModal;

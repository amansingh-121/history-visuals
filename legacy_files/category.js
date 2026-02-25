// Dummy data for categories
const categoryData = {
    'history': {
        title: 'History',
        visitList: [
            'Taj Mahal, Agra',
            'Qutub Minar, Delhi',
            'Ajanta & Ellora Caves',
            'Hampi Ruins'
        ],
        sections: [
            'Culture',
            'Indian Food',
            'Ancient History',
            'Medieval Period'
        ],
        mediaImg: 'https://img.freepik.com/premium-photo/indian-warrior-king-portrait-warrior-ai-generated_91497-10905.jpg'
    },
    'food': {
        title: 'Food',
        visitList: [
            'Chandni Chowk, Delhi',
            'Khao Galli, Mumbai',
            'Hyderabadi Biryani Hubs',
            'South Indian Temples (Prasadam)'
        ],
        sections: [
            'Spices of India',
            'Street Food',
            'Regional Cuisines',
            'Ancient Recipes'
        ],
        mediaImg: 'PHOTOS/indian food.png'
    },
    'culture': {
        title: 'Culture',
        visitList: [
            'Varanasi Ghats',
            'Rajasthan Palaces',
            'Kerala Backwaters',
            'Assam Tea Gardens'
        ],
        sections: [
            'Festivals',
            'Art Forms',
            'Traditions',
            'Languages'
        ],
        mediaImg: 'PHOTOS/indian culture .png'
    },
    'default': {
        title: 'Indiascope',
        visitList: ['Explore India', 'See the Sights', 'Experience Magic'],
        sections: ['Overview', 'Search More'],
        mediaImg: 'PHOTOS/heritage.jpg'
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryType = urlParams.get('type') || 'history';
    const data = categoryData[categoryType.toLowerCase()] || categoryData['default'];

    // Update Page Content
    document.title = `${data.title} - Indiascope`;
    document.getElementById('category-title').textContent = data.title;
    document.getElementById('current-category').textContent = data.title;

    // Update Header Active State
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        if (link.textContent.toLowerCase() === data.title.toLowerCase()) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Populate Visit List
    const visitListEl = document.getElementById('visit-list');
    visitListEl.innerHTML = '';
    data.visitList.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        visitListEl.appendChild(li);
    });

    // Populate Section List
    const sectionListEl = document.getElementById('section-list');
    sectionListEl.innerHTML = '';
    data.sections.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `<span class="bullet">▷</span> ${item}`;
        sectionListEl.appendChild(li);
    });

    // Update Media Box Image
    const mediaBox = document.getElementById('main-media');
    if (data.mediaImg) {
        mediaBox.style.backgroundImage = `url('${data.mediaImg}')`;
    }
});

const images = [
    { src: 'PHOTOS/taj mahal.jpg', name: 'The Taj Mahal' },
    { src: 'PHOTOS/indian quitab minar.png', name: 'Indian Qutub Minar' },
    { src: 'PHOTOS/indian old lady .png', name: 'Indian Old Lady' },
    { src: 'PHOTOS/cave painting.png', name: 'Cave Painting' }
];

let currentIndex = 0;
const wrapper = document.getElementById('intro-wrapper');
const container = document.getElementById('intro-container');
const strips = document.querySelectorAll('.strip');
const dashboard = document.getElementById('dashboard');

function updateStrips() {
    const currentData = images[currentIndex];

    // The container is 100vw wide
    // Each of the 6 strips is roughly 16.66vw wide
    strips.forEach((strip, index) => {
        strip.style.backgroundImage = `url('${currentData.src}')`;
        const offset = index * (100 / strips.length);
        strip.style.backgroundPosition = `-${offset}vw center`;
    });
}

let isAnimating = false;

function nextImage() {
    if (isAnimating) return;

    currentIndex++;
    if (currentIndex < images.length) {
        isAnimating = true;

        strips.forEach((strip, index) => {
            // First half of flip (to edge)
            setTimeout(() => {
                strip.style.transform = 'rotateY(90deg)';

                // Swap image at the edge point
                setTimeout(() => {
                    const currentData = images[currentIndex];
                    strip.style.backgroundImage = `url('${currentData.src}')`;
                    const offset = index * (100 / strips.length);
                    strip.style.backgroundPosition = `-${offset}vw center`;

                    // Second half of flip (back to front)
                    strip.style.transform = 'rotateY(0deg)';
                }, 100); // Ultra-fast swap
            }, 0); // Removed staggered delay
        });

        // Reset animation flag
        setTimeout(() => {
            isAnimating = false;
        }, 250); // Ultra-fast lock reset

    } else {
        // End of sequence, show dashboard
        wrapper.style.opacity = '0';
        wrapper.style.visibility = 'hidden';
        dashboard.style.opacity = '1';
        dashboard.style.visibility = 'visible';
        document.body.style.overflow = 'auto';
    }
}

// Initial set
updateStrips();

// Click listener
container.addEventListener('click', nextImage);
// Navigation for Category Cards
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.category-card');
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const name = card.querySelector('.category-name').textContent.trim();
            window.location.href = `category.html?type=${name.toLowerCase()}`;
        });
    });
});

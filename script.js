document.addEventListener('DOMContentLoaded', () => {
    // Header scroll effect
    const header = document.querySelector('.trust-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(10, 10, 15, 0.9)';
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
        } else {
            header.style.background = 'rgba(15, 15, 20, 0.6)';
            header.style.boxShadow = 'none';
        }
    });

    // Canvas Scroll Animation for Hero Section
    const canvas = document.getElementById('hero-canvas');
    if (canvas) {
        const context = canvas.getContext('2d');
        const scrollContainer = document.getElementById('hero-scroll');
        
        const text1 = document.getElementById('hero-text-1');
        const text2 = document.getElementById('hero-text-2');
        const text3 = document.getElementById('hero-text-3');

        const frameCount = 212;
        const currentFrame = index => (
            `images/ezgif-frame-${index.toString().padStart(3, '0')}.png`
        );

        const images = [];
        const preloadImages = () => {
            for (let i = 1; i <= frameCount; i++) {
                images[i] = new Image();
                images[i].src = currentFrame(i);
            }
        };

        preloadImages();

        const img = new Image();
        img.src = currentFrame(1);
        
        img.onload = function() {
            canvas.width = img.width;
            canvas.height = img.height;
            context.drawImage(img, 0, 0);
        }

        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY - scrollContainer.offsetTop;
            const maxScroll = scrollContainer.scrollHeight - window.innerHeight;
            
            if (scrollTop < 0 || scrollTop > maxScroll + window.innerHeight) return;

            const scrollFraction = Math.max(0, Math.min(1, scrollTop / maxScroll));
            const frameIndex = Math.min(frameCount - 1, Math.floor(scrollFraction * frameCount));
            const requestImageIndex = frameIndex + 1;
            
            if (images[requestImageIndex]) {
                requestAnimationFrame(() => {
                    context.clearRect(0, 0, canvas.width, canvas.height);
                    context.drawImage(images[requestImageIndex], 0, 0);
                });
            }
            
            // Text 1: Appears early, fades out as frame progresses
            updateTextAnimation(text1, scrollFraction, 0, 0.15, 0.2, 0.3);
            
            // Text 2: Appears midway
            updateTextAnimation(text2, scrollFraction, 0.35, 0.45, 0.55, 0.65);
            
            // Text 3: Appears near the end
            updateTextAnimation(text3, scrollFraction, 0.7, 0.8, 0.9, 1.0);
        });

        function updateTextAnimation(element, fraction, startIn, endIn, startOut, endOut) {
            if (fraction >= startIn && fraction <= endOut) {
                let opacity = 0;
                let y = 30;
                
                if (fraction < endIn) {
                    // Fading in
                    const progress = (fraction - startIn) / (endIn - startIn);
                    opacity = progress;
                    y = 30 * (1 - progress);
                } else if (fraction > startOut) {
                    // Fading out
                    const progress = (fraction - startOut) / (endOut - startOut);
                    opacity = 1 - progress;
                    y = -30 * progress;
                } else {
                    // Fully visible
                    opacity = 1;
                    y = 0;
                }
                
                element.style.opacity = opacity;
                element.style.transform = `translateY(${y}px)`;
            } else {
                element.style.opacity = 0;
                element.style.transform = `translateY(30px)`;
            }
        }
    }

    // Countdown Timer logic
    let timeInSeconds = 3 * 3600 + 45 * 60 + 30; // 3 hours, 45 mins, 30 secs
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    function updateTimer() {
        if (timeInSeconds <= 0) return;
        
        timeInSeconds--;
        
        const h = Math.floor(timeInSeconds / 3600);
        const m = Math.floor((timeInSeconds % 3600) / 60);
        const s = timeInSeconds % 60;
        
        if (hoursEl) hoursEl.textContent = h.toString().padStart(2, '0');
        if (minutesEl) minutesEl.textContent = m.toString().padStart(2, '0');
        if (secondsEl) secondsEl.textContent = s.toString().padStart(2, '0');
    }
    if (hoursEl) setInterval(updateTimer, 1000);

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                        otherItem.querySelector('.faq-question').classList.remove('active');
                    }
                });
                item.classList.toggle('active');
                question.classList.toggle('active');
            });
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const toggleSwitch = document.getElementById("theme-toggle");
    const body = document.body;

    // Theme - default to dark mode if no preference saved
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
        // User explicitly chose light mode, don't add dark-mode
    } else {
        // Default to dark mode (either no preference or "dark")
        body.classList.add("dark-mode");
        toggleSwitch.classList.add("dark");
        if (!savedTheme) {
            localStorage.setItem("theme", "dark");
        }
    }

    // Toggle theme (switch)
    toggleSwitch.addEventListener("click", function () {
        if (!body.classList.contains("dark-mode")) {
            body.classList.add("dark-mode");
            toggleSwitch.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            body.classList.remove("dark-mode");
            toggleSwitch.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    });

    // 3D Carousel functionality
    const projectsGrid = document.querySelector('.projects-grid');
    const dots = document.querySelectorAll('.dot');
    const projectItems = document.querySelectorAll('.project-item');
    
    if (projectsGrid && projectItems.length > 0) {
        function updateCarousel() {
            const containerWidth = projectsGrid.clientWidth;
            const scrollLeft = projectsGrid.scrollLeft;
            const containerCenter = scrollLeft + (containerWidth / 2);
            
            projectItems.forEach((item, index) => {
                const itemLeft = item.offsetLeft;
                const itemWidth = item.offsetWidth;
                const itemCenter = itemLeft + (itemWidth / 2);
                const distanceFromCenter = itemCenter - containerCenter;
                const normalizedDistance = distanceFromCenter / containerWidth;
                
                // Calculate 3D transforms
                const rotationY = normalizedDistance * 35; // Max 35deg rotation
                const scale = Math.max(0.75, 1 - Math.abs(normalizedDistance) * 0.3);
                const opacity = Math.max(0.4, 1 - Math.abs(normalizedDistance) * 0.8);
                const translateZ = Math.abs(normalizedDistance) < 0.3 ? 0 : -200 * Math.abs(normalizedDistance);
                
                // Apply 3D transform
                item.style.opacity = opacity;
                item.style.transform = `rotateY(${rotationY}deg) scale(${scale}) translateZ(${translateZ}px)`;
                
                // Text fill effect based on proximity to center
                const fillPercent = Math.max(0, Math.min(100, 100 - Math.abs(normalizedDistance) * 200));
                const h3 = item.querySelector('h3');
                if (h3) {
                    h3.style.setProperty('--fill-width', `${fillPercent}%`);
                }
            });
            
            // Update active dot (if exists)
            const itemWidth = 500 + 80; // width + gap
            const currentIndex = Math.round(scrollLeft / itemWidth);
            if (dots && dots.length > 0) {
                dots.forEach((dot, index) => {
                    if (index === currentIndex) {
                        dot.classList.add('active');
                    } else {
                        dot.classList.remove('active');
                    }
                });
            }
        }
        
        // Update on scroll
        projectsGrid.addEventListener('scroll', updateCarousel);
        
        // Initial update
        updateCarousel();
        
        // Dot click navigation (if exists)
        if (dots && dots.length > 0) {
            dots.forEach((dot, index) => {
                dot.addEventListener('click', function() {
                    const targetScroll = index * (500 + 80); // width + gap
                    projectsGrid.scrollTo({
                        left: targetScroll,
                        behavior: 'smooth'
                    });
                });
            });
        }
    }
});
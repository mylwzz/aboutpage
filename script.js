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

    // Carousel functionality
    const projectsGrid = document.querySelector('.projects-grid');
    const dots = document.querySelectorAll('.dot');
    const projectItems = document.querySelectorAll('.project-item');
    
    if (projectsGrid && dots.length > 0) {
        // Update active dot and card transforms based on scroll
        projectsGrid.addEventListener('scroll', function() {
            const containerWidth = projectsGrid.clientWidth;
            const scrollLeft = projectsGrid.scrollLeft;
            
            projectItems.forEach((item, index) => {
                const itemLeft = item.offsetLeft;
                const itemWidth = item.offsetWidth;
                const itemCenter = itemLeft + (itemWidth / 2);
                const containerCenter = scrollLeft + (containerWidth / 2);
                const distance = Math.abs(itemCenter - containerCenter);
                const maxDistance = containerWidth / 2;
                
                if (distance < maxDistance / 2) {
                    // Item is in center - make it fully visible
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                } else if (distance < maxDistance) {
                    // Item is partially visible - fade and scale
                    const scale = 0.85 + (0.15 * (1 - distance / maxDistance));
                    const opacity = 0.6 + (0.4 * (1 - distance / maxDistance));
                    item.style.opacity = opacity;
                    item.style.transform = `scale(${scale})`;
                } else {
                    // Item is far away
                    item.style.opacity = '0.6';
                    item.style.transform = 'scale(0.85)';
                }
            });
            
            // Update active dot
            const currentIndex = Math.round(scrollLeft / (425 + 0)); // 425px width + 0 gap
            dots.forEach((dot, index) => {
                if (index === currentIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        });
        
        // Dot click navigation
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                const targetScroll = index * 425; // 425px per project
                projectsGrid.scrollTo({
                    left: targetScroll,
                    behavior: 'smooth'
                });
            });
        });
    }
});
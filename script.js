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

    // Projects scroll limits
    const projectsGrid = document.querySelector('.projects-grid');
    if (projectsGrid) {
        projectsGrid.addEventListener('scroll', function() {
            const maxScroll = projectsGrid.scrollWidth - projectsGrid.clientWidth;
            const currentScroll = projectsGrid.scrollLeft;
            
            // Add some padding so projects don't scroll completely off screen
            const buffer = 100;
            
            // Prevent scrolling too far left (keep some of first project visible)
            if (currentScroll < -buffer) {
                projectsGrid.scrollLeft = -buffer;
            }
            
            // Prevent scrolling too far right (keep some of last project visible)
            if (currentScroll > maxScroll + buffer) {
                projectsGrid.scrollLeft = maxScroll + buffer;
            }
        });
    }
});
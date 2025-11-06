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

    // Initialize Swiper
    const swiper = new Swiper('.projectsSwiper', {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        initialSlide: 0,
        speed: 500,
        slideToClickedSlide: true,
        preventClicks: false,
        preventClicksPropagation: false,
        touchRatio: 1,
        threshold: 5,
        coverflowEffect: {
            rotate: 25,
            stretch: 0,
            depth: 250,
            modifier: 1,
            slideShadows: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: false,
        },
        keyboard: {
            enabled: true,
        },
        mousewheel: {
            forceToAxis: true,
            sensitivity: 1,
            releaseOnEdges: true,
        },
        breakpoints: {
            320: {
                slidesPerView: 1.2,
                coverflowEffect: {
                    rotate: 20,
                    depth: 200,
                }
            },
            768: {
                slidesPerView: 'auto',
                coverflowEffect: {
                    rotate: 25,
                    depth: 250,
                }
            },
            1024: {
                slidesPerView: 'auto',
                coverflowEffect: {
                    rotate: 25,
                    depth: 250,
                }
            }
        }
    });

    // Custom click handler for better control
    const slides = document.querySelectorAll('.swiper-slide');
    slides.forEach((slide, index) => {
        slide.addEventListener('click', function(e) {
            // Don't interfere if clicking a link
            if (e.target.tagName === 'A' || e.target.closest('a')) {
                return;
            }
            
            // Only slide to if not already active
            if (!slide.classList.contains('swiper-slide-active')) {
                swiper.slideTo(index);
            }
        });
    });
});

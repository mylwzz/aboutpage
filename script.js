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
        speed: 600,
        loop: false,
        loopAdditionalSlides: 0,
        watchSlidesProgress: true,
        slideToClickedSlide: true,
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
        on: {
            click: function(swiper, event) {
                // Find which slide was clicked
                const clickedSlide = event.target.closest('.swiper-slide');
                if (clickedSlide) {
                    const clickedIndex = parseInt(clickedSlide.getAttribute('data-swiper-slide-index')) || 
                                       Array.from(swiper.slides).indexOf(clickedSlide);
                    if (clickedIndex !== swiper.activeIndex) {
                        swiper.slideTo(clickedIndex);
                    }
                }
            }
        },
        breakpoints: {
            320: {
                coverflowEffect: {
                    rotate: 20,
                    depth: 200,
                }
            },
            768: {
                coverflowEffect: {
                    rotate: 25,
                    depth: 250,
                }
            },
            1024: {
                coverflowEffect: {
                    rotate: 25,
                    depth: 250,
                }
            }
        }
    });
});

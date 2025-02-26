document.addEventListener("DOMContentLoaded", function () {
    const toggleSwitch = document.getElementById("theme-toggle");
    const body = document.body;

    // Theme
    if (localStorage.getItem("theme") === "dark") {
        body.classList.add("dark-mode");
        toggleSwitch.classList.add("dark");
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
});

document.addEventListener("DOMContentLoaded", async function () {
    const quoteElement = document.getElementById("quote");

    try {
        let response = await fetch("https://api.quotable.io/random");
        if (!response.ok) throw new Error("Network response was not ok.");
        
        let data = await response.json();
        quoteElement.innerText = `"${data.content}" - ${data.author}`;
    } catch (error) {
        quoteElement.innerText = "“Success is not final, failure is not fatal: it is the courage to continue that counts.” - Winston Churchill";
    }
});
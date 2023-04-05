document.addEventListener("DOMContentLoaded", function () {
    const lazyBackgrounds = [].slice.call(document.querySelectorAll(".section-wide"));

    if ("IntersectionObserver" in window) {
        let lazyBackgroundObserver = new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    lazyBackgroundObserver.unobserve(entry.target);
                }
            });
        });

        lazyBackgrounds.forEach(function (lazyBackground) {
            lazyBackgroundObserver.observe(lazyBackground);
        });
    }
});

window.onscroll = function () {
    scrollFunction();
};

function scrollFunction() {
    if (document.body.scrollTop > 150 || document.documentElement.scrollTop > 150) {
        document.querySelector('.nav-logo-img').style.height = '8rem';
        document.querySelector('nav ul').style.fontSize = '1.6rem';
    } else {
        document.querySelector('.nav-logo-img').style.height = "12.5rem";
        document.querySelector('nav ul').style.fontSize = '2rem';
    }
}

let dateFooter = document.querySelector("#copyright");
let lastUpdated = document.querySelector("#last-updated");
let currentYear = new Date().getFullYear();
let updatedDate = new Date(document.lastModified).toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
});

dateFooter.innerHTML = `&copy; ${currentYear} Bountiful Foods`;
lastUpdated.innerHTML = `Last Updated: ${updatedDate}`;

let numDrinks = document.querySelector('#drink-count');
if (numDrinks) {
    if (!localStorage.numDrinks) {
        numDrinks.innerText = '0';
    } else {
        numDrinks.innerText = localStorage.numDrinks;
    }
}

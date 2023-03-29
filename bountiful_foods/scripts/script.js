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
        // document.querySelector('nav').style.padding = "30px 10px";
        document.querySelector('.nav-logo-img').style.height = '8rem';
        document.querySelector('nav ul').style.fontSize = '1.6rem';
    } else {
        // document.querySelector('nav').style.padding = "30px 10px";
        document.querySelector('.nav-logo-img').style.height = "12.5rem";
        document.querySelector('nav ul').style.fontSize = '2rem';
    }
}

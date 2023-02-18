function expandMenu(bars) {
    document.querySelectorAll(".navigation")[0].classList.toggle("responsive");
    bars.classList.toggle("close");
}

let headerDateDiv = document.querySelector("#header-date");
let headerDate = new Date(document.lastModified).toLocaleDateString("en-UK", { dateStyle: "full" });
headerDateDiv.innerHTML = headerDate;

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

dateFooter.innerHTML = `&copy; ${currentYear}`;
lastUpdated.innerHTML = `Last Updated: ${updatedDate}`;

let currentDate = new Date().getDay();
const pageBanner = document.querySelector(".banner");
if (currentDate == 1 || currentDate == 2) {
    pageBanner.style.display = "block";
}

// Lazy loading images

const imagesToLoad = document.querySelectorAll("img[data-src]");
const loadImages = (image) => {
    image.setAttribute("src", image.getAttribute("data-src"));
    image.onload = () => {
        image.removeAttribute("data-src");
    };
};
if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((items) => {
        items.forEach((item) => {
            if (item.isIntersecting) {
                loadImages(item.target);
                observer.unobserve(item.target);
            }
        });
    });
    imagesToLoad.forEach((img) => {
        observer.observe(img);
    });
} else {
    imagesToLoad.forEach((img) => {
        loadImages(img);
    });
}

let today = new Date();
let sinceLastVisit = 0;
if (!localStorage.lastVisit) {
  localStorage.lastVisit = today;
  localStorage.lastVisitCount = 0;
} else {
  let lastDate = Date.parse(localStorage.lastVisit);
  sinceLastVisit = ((Date.now() - lastDate) / 84600000);
  localStorage.lastVisitCount = sinceLastVisit.toFixed(0);
  localStorage.lastVisit = today;
}
document.querySelector('.last-visits').innerHTML = `It's been ${localStorage.lastVisitCount} days since your last visit.`;

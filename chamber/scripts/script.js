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
    sinceLastVisit = (Date.now() - lastDate) / 84600000;
    localStorage.lastVisitCount = sinceLastVisit.toFixed(0);
    localStorage.lastVisit = today;
}
if (document.querySelector(".last-visits")) {
    document.querySelector(".last-visits").innerHTML = `It's been ${localStorage.lastVisitCount} days since your last visit.`;
}

if (document.querySelector("#date-time")) {
    document.querySelector("#date-time").value = today;
}
const windowSearch = window.location.search;
const urlParams = new URLSearchParams(windowSearch);

if (urlParams.get("first-name")) {
    let firstName = urlParams.get("first-name");
    let lastName = urlParams.get("last-name");
    let positionName = urlParams.get("position");
    let userEmail = urlParams.get("email");
    let userCellNum = urlParams.get("cell-num");
    let businessName = urlParams.get("business-name");
    let businessDescription = urlParams.get("description");
    let submitTime = urlParams.get("date-time");

    document.querySelector(".thankyou-wrapper").innerHTML = `
    <h2>Thanks for your submission!</h2>
    <p>We will process your application within 4 business days</p>
    <h3>Your submission:</h3>
    <ul>
    <li>Name: ${firstName} ${lastName}</li>
    <li>Position: ${positionName}</li>
    <li>Email: ${userEmail}</li>
    <li>Cell: ${userCellNum}</li>
    <li>Business Name: ${businessName}</li>
    <li>Description: ${businessDescription}</li>
    <li>Submitted: ${submitTime}</li>
    </ul>`;
}

if (window.location.href.indexOf("directory.html") > -1) {


    async function getDirectory() {
        const response = await fetch("./json/data.json");
        const data = await response.json();
        buildDirectory(data.directory);
    }
    getDirectory();
    function buildDirectory(data) {
        const cardContainer = document.querySelector(".directory");
        data.forEach((business) => {
            let card = document.createElement("section");
            let bizName = document.createElement("h2");
            let bizLogo = document.createElement("img");
            let bizAddress = document.createElement("p");
            let bizDescription = document.createElement("p");
            let bizPhone = document.createElement("p");
            let bizWebsite = document.createElement("p");

            bizLogo.setAttribute("src", business.logo);
            bizLogo.setAttribute("alt", `${business.name} Logo`);
            bizLogo.setAttribute("loading", "lazy");
            bizLogo.setAttribute("height", "auto");

            bizName.textContent = `${business.name}`;
            bizAddress.textContent = `${business.address_street} ${business.address_city} ${business.address_state}`;
            bizDescription.textContent = `${business.description}`;
            bizDescription.classList.add("business-description");
            bizPhone.textContent = `${business.phone_number}`;
            bizWebsite.innerHTML = `<a href="${business.website}" target="_blank">${business.website}</a>`;

            card.appendChild(bizLogo);
            card.appendChild(bizName);
            card.appendChild(bizAddress);
            card.appendChild(bizPhone);
            card.appendChild(bizWebsite);
            card.appendChild(bizDescription);

            cardContainer.appendChild(card);
        });
    }
    const listViewBtn = document.querySelector('#list-view');
    const gridViewBtn = document.querySelector('#grid-view');

    listViewBtn.addEventListener('click', function() {
        const cardContainer = document.querySelector(".directory");
        cardContainer.classList.remove('main-grid');
        cardContainer.classList.add('main-rows');
    });
    gridViewBtn.addEventListener('click', function() {
        const cardContainer = document.querySelector(".directory");
        cardContainer.classList.remove('main-rows');
        cardContainer.classList.add('main-grid');
    })
}

function expandMenu(bars) {
    document.querySelectorAll('.navigation')[0].classList.toggle('responsive');
    bars.classList.toggle('close');
}

let headerDateDiv = document.querySelector('#header-date');
let headerDate = new Date(document.lastModified).toLocaleDateString('en-UK', {dateStyle: "full"});
headerDateDiv.innerHTML = headerDate;


let dateFooter = document.querySelector('#copyright');
let lastUpdated = document.querySelector('#last-updated');
let currentYear = new Date().getFullYear();
let updatedDate = new Date(document.lastModified).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"long", day:"numeric", hour:"numeric", minute:"numeric"})

dateFooter.innerHTML = `&copy; ${currentYear}`;
lastUpdated.innerHTML = `Last Updated: ${updatedDate}`;
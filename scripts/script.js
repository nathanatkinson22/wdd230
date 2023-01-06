console.log('Hello world!');

let dateFooter = document.querySelector('#copyright');
let lastUpdated = document.querySelector('#last-updated');
let currentYear = new Date().getFullYear();
let updatedDate = new Date(document.lastModified).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"long", day:"numeric", hour:"numeric", minute:"numeric"})
dateFooter.innerHTML = `© ${currentYear}`;
lastUpdated.innerHTML = `<p>Last Updated: ${updatedDate}`;

// Dark mode toggle
const darkButton = document.querySelector('#dark-mode');
darkButton.addEventListener('click', function() {
    document.body.classList.toggle("dark-theme");
    let sunIcon = this.querySelector('.fa-sun');
    if (sunIcon.classList.contains('fa-regular')) {
        // sunIcon.classList.remove('fa-regular');
        // sunIcon.classList.add('fa-solid');
        darkButton.innerHTML = `<i class="fa-solid fa-sun"></i> Turn the lights on`;
    } else {
        darkButton.innerHTML = `<i class="fa-regular fa-sun"></i> Turn the lights off`;
        // sunIcon.classList.add('fa-regular');
        // sunIcon.classList.remove('fa-solid');
    }
});
let dateFooter = document.querySelector('#copyright');
let lastUpdated = document.querySelector('#last-updated');
let currentYear = new Date().getFullYear();
let updatedDate = new Date(document.lastModified).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"long", day:"numeric", hour:"numeric", minute:"numeric"})
dateFooter.innerHTML = `&copy; ${currentYear}`;
lastUpdated.innerHTML = `<p>Last Updated: ${updatedDate}`;


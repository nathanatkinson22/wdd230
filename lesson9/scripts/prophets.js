const url = "https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json";

async function getProphetData(url) {
    const response = await fetch(url);
    const data = await response.json();
    // console.table(data.prophets);
    displayProphets(data.prophets);
}

getProphetData(url);

function displayProphets(data) {
    const cards = document.querySelector('div.cards'); // select the output container element

    data.forEach(prophet => {
        let card = document.createElement('section');
        let h2 = document.createElement('h2');
        let portrait = document.createElement('img');
        let birthPara = document.createElement('p');
        let placePara = document.createElement('p');

        h2.textContent = `${prophet.name} ${prophet.lastname}`;

        // Build the image portrait by setting all the relevant attribute
        portrait.setAttribute('src', prophet.imageurl);
        portrait.setAttribute('alt', `Portait of ${prophet.name} ${prophet.lastname}`);
        portrait.setAttribute('loading', 'lazy');
        portrait.setAttribute('width', '260');
        portrait.setAttribute('height', 'auto');

        birthPara.textContent = `Date of Birth: ${prophet.birthdate}`;
        placePara.textContent = `Place of Birth: ${prophet.birthplace}`;
    
        // Append the section(card) with the created elements
        card.appendChild(h2);
        card.appendChild(portrait);
        card.appendChild(birthPara);
        card.appendChild(placePara);
    
        cards.appendChild(card);
    });
}
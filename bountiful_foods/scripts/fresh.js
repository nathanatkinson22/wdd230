const jsonFile = "./fruit.json";
const listOne = document.querySelector("#fruit-one");
const listTwo = document.querySelector("#fruit-two");
const listThree = document.querySelector("#fruit-three");
const freshOutput = document.querySelector("#fresh-output");

async function getFruit() {
    try {
        const response = await fetch(jsonFile);
        if (response.ok) {
            const data = await response.json();
            addFruit(data, listOne);
            addFruit(data, listTwo);
            addFruit(data, listThree);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

getFruit();

function addFruit(fruitData, selectList) {
    fruitData.forEach((element) => {
        selectList.innerHTML += `<option value="${element.name}">${element.name}</option>`;
    });
}

async function getFruitData() {
    try {
        const response = await fetch(jsonFile);
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

let fruitCarbTotal = 0;
let fruitProteinTotal = 0;
let fruitFatTotal = 0;
let fruitSugarTotal = 0;
let fruitCalTotal = 0;
function addTotals(jsonData, fruitName) {
    jsonData.forEach((element) => {
        if (element.name == fruitName) {
            let fruitCarbs = element.nutritions.carbohydrates;
            let fruitProtein = element.nutritions.protein;
            let fruitFat = element.nutritions.fat;
            let fruitSugar = element.nutritions.sugar;
            let fruitCalories = element.nutritions.calories;
            fruitCarbTotal += fruitCarbs;
            fruitProteinTotal += fruitProtein;
            fruitFatTotal += fruitFat;
            fruitSugarTotal += fruitSugar;
            fruitCalTotal += fruitCalories;
        }
    });
}
function displayOrder(fruitOne, fruitTwo, fruitThree) {
    let orderName = document.querySelector("#first-name").value;
    let orderEmail = document.querySelector("#email").value;
    let orderPhone = document.querySelector("#phone").value;
    let specialInst = document.querySelector("#requests").value;
    let todayDate = new Date();
    freshOutput.innerHTML += `<p>Order date: ${todayDate}</p>
    <p>Name: ${orderName}</p>
    <p>Email: ${orderEmail}</p>
    <p>Phone: ${orderPhone}</p>
    <p>Fruits selected: ${fruitOne}, ${fruitTwo}, ${fruitThree}</p>
    <p>Special instructions: ${specialInst}</p>
    <h4>Order nutrition info:</h4>
    <p>Calories: ${fruitCalTotal.toFixed(2)}</p>
    <p>Carbs: ${fruitCarbTotal.toFixed(2)}</p>
    <p>Protein: ${fruitProteinTotal.toFixed(2)}</p>
    <p>Fat: ${fruitFatTotal.toFixed(2)}</p>
    <p>Sugar: ${fruitSugarTotal.toFixed(2)}</p>`;
}

const orderForm = document.querySelector("#fresh-order");
const orderBtn = document.querySelector("#order-btn");

function setNumDrinks() {
    if (!localStorage.numDrinks) {
        localStorage.numDrinks = 1;
    } else {
        let numberDrinks = parseInt(localStorage.numDrinks);
        localStorage.numDrinks = numberDrinks + 1;
    }
}
orderForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    let fruitOneVal = listOne.value;
    let fruitTwoVal = listTwo.value;
    let fruitThreeVal = listThree.value;
    console.log(fruitOneVal);
    const fruitData = await getFruitData();
    addTotals(fruitData, fruitOneVal);
    addTotals(fruitData, fruitTwoVal);
    addTotals(fruitData, fruitThreeVal);

    displayOrder(fruitOneVal, fruitTwoVal, fruitThreeVal);
    setNumDrinks();
    freshOutput.style.visibility = 'visible';
});

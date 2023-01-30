const listContainer = document.querySelector("#list");
const newItem = document.querySelector("#favchap");
const addBtn = document.querySelector("button");

addBtn.addEventListener("click", function () {
    let listItem = newItem.value;
    if (listItem) {
        let newListItem = document.createElement("li");
        let newListBtn = document.createElement("button");
        newListItem.appendChild(newListBtn);
        newListItem.innerText = listItem;
        newListBtn.innerText = "❌";
        listContainer.appendChild(newListItem);
    
        newListBtn.addEventListener("click", function () {
            listContainer.removeChild(newListItem);
        });
        newItem.focus();
        newItem.value = "";
    } else {
        document.querySelector('#required-text').innerText = 'This field is required!';
    }

});

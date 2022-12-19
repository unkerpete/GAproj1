// elements selectors
const addBtn = document.querySelector("#addToDisplay");
const inputValue = document.querySelector("#namesInput");
const displayTBody = document.querySelector("tbody");
const displaySection = document.querySelector(".displaySection");
const generateBtn = document.querySelector("#generateBtn");

// event listeners
addBtn.addEventListener("click", addToDisplay);
generateBtn.addEventListener("click", generateSubGroupsClicked);

// display input names and corresponding delete button to display section
function addToDisplay(e) {
  e.preventDefault();
  const newName = inputValue.value;
  if (newName !== "") {
    // TO ADD: reject numbers
    const newTr = document.createElement("tr");

    // creates the new name and corresponding button
    newTr.innerHTML = `<td class="finalNames" id="${newName}">${newName}</td><td><button class="btn btn-danger btnDelete" id="${newName}del">Delete</button></td>`;

    // appends the new names unto the display
    displayTBody.append(newTr);

    // resets the input field to empty
    inputValue.value = "";

    // make the delete buttons delete itself and name
    document.querySelector(`#${newName}del`).addEventListener("click", (e) => {
      document.querySelector(`#${newName}`).parentElement.remove();
    });
  }
}

// array container to store submitted names
const allNames = [];

// variable to store number of members per sub-group
let subGroupSize = "";

// Generate Sub-Groups button function and push all names into an array
function generateSubGroupsClicked() {
  // variable to store number of members per sub-group
  subGroupSize = document.querySelector("#subGroupSize").value;
  another();
}

function another() {
  console.log(subGroupSize);
}

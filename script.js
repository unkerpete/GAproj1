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
    // **************TO ADD: reject numbers************
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
const allSubmittedNames = [];

// variable to store amount of members of the overall group
let overallGroupSize = 0;

// variable to store amount of members per sub-group
let subGroupSize = 0;

// Generate Sub-Groups button function and push all names into an array
function generateSubGroupsClicked() {
  // variable to store number of members per sub-group
  subGroupSize = document.querySelector("#subGroupSize").value;
  // code to store each names into an array
  const arrOfNames = document.querySelectorAll(".finalNames");
  for (let i = 0; i < arrOfNames.length; i++) {
    allSubmittedNames.push(arrOfNames[i].innerText);
  }
  // store amount of members of the overall group
  overallGroupSize = arrOfNames.length;
  // calls next function to run
  displayFirstSession();
  // removes the click event listener on generate button, effectively allowing user to only click it ONCE *****maybe remove later*****
  generateBtn.removeEventListener("click", generateSubGroupsClicked);
}

function displayFirstSession() {
  // shuffles the array of submitted names
  let shuffledSubmittedNames = allSubmittedNames.sort(
    () => Math.random() - 0.5
  );

  // creates 1 row for the session, and the required number of columns to display each sub-group names
  const subGroupDisplay = document.querySelector("#subGroupsDisplay");
  for (let i = 0; i < 3; i++) {
    const subGroupDiv = document.createElement("div");
    subGroupDiv.innerText = "lalalaa";
    subGroupDisplay.appendChild(subGroupDiv);
  }
}

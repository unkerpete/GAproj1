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

// variable to keep track of how many sessions created
let sessionCounter = 1;

// Generate Sub-Groups button function and push all names into an array
function generateSubGroupsClicked() {
  // variable to store number of members per sub-group
  subGroupSize = document.querySelector("#subGroupSize").value;
  // code to store each name (as an object) into an array
  const arrOfNames = document.querySelectorAll(".finalNames");
  for (let i = 0; i < arrOfNames.length; i++) {
    allSubmittedNames[i] = {
      name: arrOfNames[i].innerText,
      hasMet: []
    }
  }
  // variable to store amount of members of the overall group
  overallGroupSize = arrOfNames.length;
  // calls this function that will calc the subGroups(columns) required for display
  createDisplayColumns(subGroupSize, overallGroupSize);

  //calls this function that will append names to each group for session1 only
  randomiseNames();

  // disable options: disable or remove button
  // removes the click event listener on generate button, effectively allowing user to only click it ONCE *****maybe remove later*****
  // generateBtn.removeEventListener("click", generateSubGroupsClicked);
  // generateBtn.remove();
}

function createDisplayColumns(subGroupSize, overallGroupSize) {
  const columnsRequired = Math.floor(overallGroupSize/subGroupSize);
  const subGroupsDisplay = document.querySelector("#subGroupsDisplay");
  subGroupsDisplay.innerHTML = 
  `<div class="session text-center"><div class="row"><div class="col subGroupSession">Session ${sessionCounter}</div></div></div><button class="btn btn-success">Next Sub-Group</button>`;
  for (let i = 1; i<columnsRequired+1; i++) {
    const session = document.querySelector(".subGroupSession");
    const groupNum = document.createElement("div");
    groupNum.setAttribute("class", `col s${sessionCounter}g${i}`);
    groupNum.innerText = `Group ${i}`;
    session.appendChild(groupNum);
  }
  sessionCounter += 1;
}

function randomiseNames() {
  // shuffles the array of submitted names
  let shuffledSubmittedNames = allSubmittedNames.sort(
    () => Math.random() - 0.5
  );

  let tempArray =[];

  for (let i = 0; i < shuffledSubmittedNames.length; i += subGroupSize) {
    splitArray = shuffledSubmittedNames.slice(i, i+subGroupSize);
    tempArray.push(splitArray);
  }

  console.log(tempArray);
  console.log(allSubmittedNames);
}


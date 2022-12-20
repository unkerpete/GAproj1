// elements selectors
const addBtn = document.querySelector("#addToDisplay");
const inputValue = document.querySelector("#namesInput");
const displayTBody = document.querySelector("tbody");
const displaySection = document.querySelector(".bottomDisplaySection");
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

// variable to keep track of how many sessions created
let sessionCounter = 1;

// variable to store number of groups required
let columnsRequired = 0;

// Generate Sub-Groups button function and push all names into an array
function generateSubGroupsClicked() {
  // code to store each name (as an object) into an array
  const arrOfNames = document.querySelectorAll(".finalNames");
  // variable to store number of members per sub-group
  const subGroupSize = document.querySelector("#subGroupSize").value;
  for (let i = 0; i < arrOfNames.length; i++) {
    allSubmittedNames[i] = {
      name: arrOfNames[i].innerText,
      hasMet: [],
    };
  }
  // variable to store amount of members of the overall group
  overallGroupSize = arrOfNames.length;

  // calls this function that will calc the subGroups(columns) required for display
  // createDisplayColumns(subGroupSize, overallGroupSize)

  // store number of groups required
  const groupsRequired = Math.floor(overallGroupSize / subGroupSize);

  //calls this function that will append names to each group for session1 only
  randomiseNames(allSubmittedNames, subGroupSize, groupsRequired);

  // disable options: disable or remove button
  // removes the click event listener on generate button, effectively allowing user to only click it ONCE *****maybe remove later*****
  // generateBtn.removeEventListener("click", generateSubGroupsClicked);
  // generateBtn.remove();
}

function createDisplayColumns(subGroupSize, overallGroupSize) {
  columnsRequired = Math.floor(overallGroupSize / subGroupSize);
  const subGroupsDisplay = document.querySelector("#subGroupsDisplay");
  subGroupsDisplay.innerHTML = `<div class="session text-center"><div class="row"><div class="col subGroupSession">Session ${sessionCounter}</div></div></div>`;
  for (let i = 1; i < columnsRequired + 1; i++) {
    const session = document.querySelector(".subGroupSession");
    const groupNum = document.createElement("div");
    groupNum.setAttribute("class", `col s${sessionCounter}g${i}`);
    groupNum.innerText = `Group ${i}`;
    session.appendChild(groupNum);
  }
  sessionCounter += 1;
}

function randomiseNames(arr, divider, subGroupsNum) {
  // shuffles the array of submitted names
  let shuffled = arr.sort(() => Math.random() - 0.5);

  // split the shuffled array into nested arrays with elements of divider no.
  const splitNames = [];
  for (let i = 0; i < subGroupsNum; i++) {
    const newGroup = [];
    for (let j = 0; j < divider; j++) {
      let member = shuffled.pop();
      newGroup.push(member);
    }
    splitNames.push(newGroup);
  }

  // // append the groupings and names in them
  // for (let i = 0; i < splitNames.length; i++) {
  //   for (let j = 0; j < splitNames[j].length; j++) {
  //     const nameInSubgroup = document.createElement("p");
  //     nameInSubgroup.setAttribute("class", "namesInSubGroups");
  //     nameInSubgroup.innerText = splitNames[j].name;
  //     const subGroup = document.querySelector(`.s${sessionCounter}g${i + 1}`);
  //     console.log(`.s${sessionCounter}g${i + 1}`);
  //     subGroup.append(nameInSubgroup);
  //   }
  // }

  // attempt 2 of appending groupings and names
  for (let i = 0; i < splitNames.length; i++) {
    const namesInGroup = splitNames[i].map((item) => {
      return item.name;
    });
    console.log(namesInGroup);
    const subGroup = document.createElement("div");
    subGroup.innerText = `Group ${i + 1} - ${namesInGroup}`;
    displaySection.append(subGroup);
    // namesInGroup = [];
  }

  // for (let i = 0; i < splitNames.length; i++) {
  //   displaySection.innerHTML += `<div> Group ${i + 1}: ${splitNames[i]} </div>`;
}

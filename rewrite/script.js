// elements selectors
const addBtn = document.querySelector("#addToDisplay");
const inputValue = document.querySelector("#namesInput");
const displayTBody = document.querySelector("tbody");
const displaySection = document.querySelector(".bottomDisplaySection");
const generateBtn = document.querySelector("#generateBtn");

// event listeners
addBtn.addEventListener("click", addToDisplay);
generateBtn.addEventListener("click", generateSubGroupsClicked);

// array container to store submitted names
const allSubmittedNames = [];
let splitNames = [];

// variable to store amount of members of the overall group
let overallGroupSize = 0;

// variable to keep track of how many sessions created
let sessionCounter = 1;

// variable to store number of groups required
let subGroupsRequired = 0;

// variable to store number of groups required
let subGroupSize = 0;

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
  } else {
    alert("Please enter a name");
  }
}

// Generate Sub-Groups button function and push all names into an array
function generateSubGroupsClicked() {
  // code to store each name (as an object) into an array
  const arrOfNames = document.querySelectorAll(".finalNames");

  // update number of members per sub-group
  subGroupSize = document.querySelector("#subGroupSize").value;

  // store all submitted names in an array allSubmittedNames
  for (let i = 0; i < arrOfNames.length; i++) {
    allSubmittedNames[i] = arrOfNames[i].innerText;
  }

  // variable to store amount of members of the overall group
  overallGroupSize = arrOfNames.length;

  // update number of groups required
  subGroupsRequired = Math.floor(overallGroupSize / subGroupSize);

  //calls this function that will append names to each group for session1 only
  randomiseNames(allSubmittedNames, subGroupSize, subGroupsRequired);

  // disable options: disable or remove button
  // removes the click event listener on generate button, effectively allowing user to only click it ONCE *****maybe remove later*****
  // generateBtn.removeEventListener("click", generateSubGroupsClicked);
  // generateBtn.remove();
}

function randomiseNames(arr, divider, subGroupsNum) {
  // shuffles the array of submitted names
  let shuffled = arr.sort(() => Math.random() - 0.5);
  // console.log(shuffled);
  // split the shuffled array into arrays
  for (let i = 0; i < subGroupsNum; i++) {
    const newGroup = [];
    for (let j = 0; j < divider; j++) {
      let member = shuffled.pop();
      newGroup.push(member);
    }
    splitNames.push(newGroup);
  }

  // loops through the splitNames main array. and in each inner array, maps each element (which is an object here) to return the object's name property value and store inside a new array NamesInGroup.
  for (let i = 0; i < splitNames.length; i++) {
    const namesInGroup = splitNames[i];
    // appends the namesInGroup array in displaySection.
    const subGroup = document.createElement("div");
    subGroup.innerText = `Group ${i + 1} - ${namesInGroup}`;
    displaySection.append(subGroup);
  }

  // append the session number to the first grouping
  const sessionNum = document.createElement("div");
  sessionNum.innerText = `Session ${sessionCounter}`;
  displaySection.insertBefore(sessionNum, displaySection.firstChild);

  // increase the sessionCounter by 1 for the next subgroup generation
  sessionCounter++;

  // removes the first generate session button and creates a new generate button the existing.
  generateBtn.remove();

  // // update the hasMet property of the objects in the main allSubmittedNames array with the name value of the other objects who were just grouped
  // updateMainArray(splitNames);

  // creates a new button that generates the next session of subGrouping
  const subsequentGenerationBtn = document.createElement("button");
  subsequentGenerationBtn.innerText = "Next Session";
  subsequentGenerationBtn.setAttribute("class", "btn btn-success");
  subsequentGenerationBtn.setAttribute("id", "subsequentGeneration");
  subsequentGenerationBtn.addEventListener(
    "click",
    generateNextGroup(splitNames)
  );
  displaySection.append(subsequentGenerationBtn);
}

//  
function generateNextGroup(previousGrouping) {
  // container to store next subGrouping
  let newGrouping = [];
 
  // loops through the previous array of arrays (), and pops the last member from each group to store in a tempArr. The tempArr will then be pushed into the newGrouping array to form the first subgroup of the newGrouping.
  let tempArr = [];
  for (let i = 0; i < subGroupSize; i++) {
    let newMember = previousGrouping[i].pop();
    tempArr.push(newMember);
  }
  newGrouping.push(tempArr);

  // the remaining names in the previousGrouping arr will then be pushed individually (they are currently in multiple nested arrays) into the leftOvers array
  let leftOvers = [];
  for (let i = 0; i < previousGrouping.length; i++) {
    for (let j = 0; j <previousGrouping[i].length; j++) {
      leftOvers.push(previousGrouping[i][j]);
    }
  }

  // randomise the leftOvers array
  leftOvers.sort(() => Math.random() - 0.5);

  // loops through the leftOvers array to create new
  for (let i = 0; i < subGroupsRequired - 1; i++) {
    let tempArr = [];
    for (let j = 0; j < subGroupSize; j++) {
      let newMember = leftOvers.pop()
      tempArr.push(newMember);
    }
    newGrouping.push(tempArr);
  }
  // console.log(newGrouping);

//   for (let i = 0; i < newGrouping.length; i++) {
//     const namesInGroup = newGrouping[i];
//     // appends the namesInGroup array in displaySection.
//     const subGroup = document.createElement("div");
//     subGroup.innerText = `Group ${i + 1} - ${namesInGroup}`;
//     displaySection.append(subGroup);
//   }
// }
}
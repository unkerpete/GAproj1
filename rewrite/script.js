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
  let newName = inputValue.value.split(" ");
  console.log(newName);
  if (newName !== null) {
    // creates the new name and corresponding button
    for (let i = 0; i < newName.length; i++) {
      let newTr = document.createElement("tr");
      newTr.innerHTML = `<td class="finalNames" id="${newName[i]}">${newName[i]}</td><td><button class="btn btn-danger btnDelete" id="${newName[i]}del">Delete</button></td>`;

      // appends the new names unto the display
      displayTBody.append(newTr);

      document
        .querySelector(`#${newName[i]}del`)
        .addEventListener("click", (e) => {
          document.querySelector(`#${newName[i]}del`).parentElement.remove();
        });
    }

    // resets the input field to empty
    inputValue.value = "";

    // resets the newName arrays to empty
    newName = [];
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
}

function randomiseNames(arr, divider, subGroupsNum) {
  if (subGroupSize < subGroupsRequired) {
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
      subGroup.innerHTML = `Group ${i + 1} - ${namesInGroup}`;
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

    // creates a new button that generates the next session of subGrouping
    const subsequentGenerationBtn = document.createElement("button");
    subsequentGenerationBtn.innerText = "Next Session";
    subsequentGenerationBtn.setAttribute("class", "btn btn-success");
    subsequentGenerationBtn.setAttribute("id", "subsequentGeneration");
    subsequentGenerationBtn.addEventListener("click", generateNextGroup);
    displaySection.append(subsequentGenerationBtn);
  } else alert("Sub-Group size cannot be less than the number of Sub-Groups");
}

//
function generateNextGroup() {
  document.querySelector("#subsequentGeneration").remove();
  // container to store next subGrouping
  let newGrouping = [];

  // loops through the previous array of arrays (), and pops the last member from each group to store in a tempArr. The tempArr will then be pushed into the newGrouping array to form the first subgroup of the newGrouping.
  let tempArr = [];
  for (let i = 0; i < subGroupSize; i++) {
    let newMember = splitNames[i].pop();
    tempArr.push(newMember);
  }
  newGrouping.push(tempArr);

  // the remaining names in the previousGrouping arr will then be pushed individually (they are currently in multiple nested arrays) into the leftOvers array
  let leftOvers = [];
  for (let i = 0; i < splitNames.length; i++) {
    for (let j = 0; j < splitNames[i].length; j++) {
      leftOvers.push(splitNames[i][j]);
    }
  }

  // randomise the leftOvers array
  leftOvers.sort(() => Math.random() - 0.5);

  // loops through the leftOvers array to create new
  for (let i = 0; i < subGroupsRequired - 1; i++) {
    let tempArr = [];
    for (let j = 0; j < subGroupSize; j++) {
      let newMember = leftOvers.pop();
      tempArr.push(newMember);
    }
    newGrouping.push(tempArr);
  }

  // appends the current session number
  const sessionNum = document.createElement("div");
  sessionNum.innerText = `Session ${sessionCounter}`;
  displaySection.append(sessionNum);
  sessionCounter++;

  //appends the namesInGroup array in displaySection.
  for (let i = 0; i < newGrouping.length; i++) {
    const namesInGroup = newGrouping[i];
    const subGroup = document.createElement("div");
    subGroup.innerText = `Group ${i + 1} - ${namesInGroup}`;
    displaySection.append(subGroup);
  }

  splitNames = newGrouping;

  // appends for generation button for subsequent sessions
  const subsequentGenerationBtn = document.createElement("button");
  subsequentGenerationBtn.innerText = "Next Session";
  subsequentGenerationBtn.setAttribute("class", "btn btn-success");
  subsequentGenerationBtn.setAttribute("id", "subsequentGeneration");
  subsequentGenerationBtn.addEventListener("click", generateNextGroup);
  displaySection.append(subsequentGenerationBtn);
}

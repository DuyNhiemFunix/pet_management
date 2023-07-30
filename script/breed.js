"use strict";
/* ---------------------------------------------------
    PROCESS FLOW
----------------------------------------------------- */
// let breedArr = JSON.parse(getFromStorage("breedArr") ?? "[]");
renderBreedData(breedArr);

// 'Submit' button
submitBtn.addEventListener("click", () => {
  const data = {
    id: breedArr.length + 1,
    name: inputBreed.value,
    type: inputType.value,
  };

  const validate = validateBreedData(data);
  if (validate) {
    breedArr.push(data);
    renderBreedData(breedArr);
    clearBreedInput();
  }

  saveToStorage("breedArr", JSON.stringify(breedArr));
});

/* ---------------------------------------------------
    FUNCTION AREA
----------------------------------------------------- */
// Validation data
function validateBreedData(x) {
  // Name validation
  const thElements = document.querySelectorAll(".breed-name");

  // Check if there are no .breed-name elements
  if (thElements.length === 0) {
    if (x.name.trim().length === 0) {
      alert("Name must not be empty!");
      return false;
    } else if (x.name.indexOf(" ") >= 0) {
      alert("Name must not contain spaces!");
      return false;
    }
  } else {
    for (let i = 0; i < thElements.length; i++) {
      if (x.name === thElements[i].innerText) {
        alert("Breed must be unique!");
        return false;
      } else if (x.name.trim().length === 0) {
        alert("Name must not be empty!");
        return false;
      } else if (x.name.indexOf(" ") >= 0) {
        alert("Name must not contain spaces!");
        return false;
      }
    }
  }
  // Type validation
  if (x.type == "Select Type") {
    alert("Please select Type!");
    return false;
  }

  return true;
}

// Render breed table row
function renderBreedData(y) {
  tableBodyEl.innerHTML = ""; // delete all row

  for (let pet of y) {
    const row = document.createElement("tr");
    row.innerHTML = `
      <th scope="row">${pet.id}</th>
      <td class="breed-name">${pet.name}</td>
      <td>${pet.type}</td>
      <td><button type="button" class="btn btn-danger" onclick="deleteBreed(${pet.id})">Delete</button></td>
    `;
    tableBodyEl.appendChild(row);
  }
}

// Clear input
function clearBreedInput() {
  inputBreed.value = "";
  inputType.value = "Select Type";
}

// Delete pet
function deleteBreed(z) {
  if (confirm("Are you sure?")) {
    breedArr = breedArr.filter((object) => {
      return object.id !== z;
    });
  }

  updateIdsAfterDeletion();
  renderBreedData(breedArr);
  saveToStorage("breedArr", JSON.stringify(breedArr));
}

// Update id after deletion
function updateIdsAfterDeletion() {
  for (let i = 0; i < breedArr.length; i++) {
    breedArr[i].id = i + 1;
  }
}

/* ---------------------------------------------------
    END PROCESS
----------------------------------------------------- */

"use strict";
/* ---------------------------------------------------
    PROCESS FLOW
----------------------------------------------------- */
// Render pet table
let petArr = JSON.parse(getFromStorage("petArr") ?? "[]");
renderTableData(petArr);

// Load breed list on change type
inputType.onchange = () => renderBreed(inputType.value);

// 'Submit' button
submitBtn.addEventListener("click", submitEditPet);

/* ---------------------------------------------------
    FUNCTION AREA
----------------------------------------------------- */
// Render edit table row
function renderTableData(y) {
  tableBodyEl.innerHTML = ""; // delete all row
  for (let pet of y) {
    const row = document.createElement("tr");
    row.innerHTML =
      createRowHTML(pet) +
      `<td><button type="button" class="btn btn-warning" onclick="startEditPet('${pet.id}')">Edit</button></td>`;
    tableBodyEl.appendChild(row);
  }
}

// Edit pet
function startEditPet(id) {
  containerForm.classList.remove("hide");
  // load pet data to form
  for (let pet of petArr) {
    if (pet.id === id) {
      inputId.value = pet.id;
      inputName.value = pet.name;
      inputAge.value = pet.age;
      inputType.value = pet.type;
      renderBreed(pet.type);
      inputWeight.value = pet.weight;
      inputLength.value = pet.lengthcm;
      inputBreed.value = pet.breed;
      inputColor.value = pet.color;
      inputVaccinated.checked = pet.vaccinated;
      inputDewormed.checked = pet.dewormed;
      inputSterilized.checked = pet.sterilized;
    }
  }
}

// Render Breed
function renderBreed(type) {
  const breedArr = JSON.parse(getFromStorage("breedArr") ?? "[]");
  inputBreed.innerHTML = `<option>Select Breed</option>`;

  for (let breed of breedArr) {
    if (breed.type === type) {
      const option = document.createElement("option");
      option.textContent = breed.name;
      inputBreed.appendChild(option);
    }
  }
}

// Save edit pet
function submitEditPet() {
  // get new pet info
  const data = {
    id: inputId.value,
    name: inputName.value,
    age: parseInt(inputAge.value),
    type: inputType.value,
    weight: parseInt(inputWeight.value),
    lengthcm: parseInt(inputLength.value),
    breed: inputBreed.value,
    color: inputColor.value,
    vaccinated: inputVaccinated.checked,
    dewormed: inputDewormed.checked,
    sterilized: inputSterilized.checked,
  };

  // update new pet info
  const validate = validateData(data);
  if (validate) {
    for (let pet of petArr) {
      if (pet.id === inputId.value) {
        pet.name = inputName.value;
        pet.age = parseInt(inputAge.value);
        pet.type = inputType.value;
        pet.weight = parseInt(inputWeight.value);
        pet.lengthcm = parseInt(inputLength.value);
        pet.breed = inputBreed.value;
        pet.color = inputColor.value;
        pet.vaccinated = inputVaccinated.checked;
        pet.dewormed = inputDewormed.checked;
        pet.sterilized = inputSterilized.checked;
        pet.dateAdd = getDate();
      }
    }

    containerForm.classList.add("hide");
    saveToStorage("petArr", JSON.stringify(petArr));
    renderTableData(petArr);
    alert("Update successful!");
  }
}

/* ---------------------------------------------------
    END PROCESS
----------------------------------------------------- */

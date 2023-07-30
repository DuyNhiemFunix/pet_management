"use strict";
/* ---------------------------------------------------
    PROCESS FLOW
----------------------------------------------------- */
// Load pet/breed data
const petArr = JSON.parse(getFromStorage("petArr") ?? "[]");
const breedArr = JSON.parse(getFromStorage("breedArr") ?? "[]");

// Preload all breed list (user can search by breed )
inputBreed.innerHTML = `<option>Select Breed</option>`;
for (let breed of breedArr) {
  const option = document.createElement("option");
  option.textContent = breed.name;
  inputBreed.appendChild(option);
}

// Load breed list on change Type
inputType.onchange = () => renderBreed(inputType.value);

// Find button
findBtn.addEventListener("click", findPet);

// Reset button
resetBtn.addEventListener("click", findReset);

/* ---------------------------------------------------
    FUNCTION AREA
----------------------------------------------------- */
// Render table row data
function renderTableData(y) {
  tableBodyEl.innerHTML = ""; // delete all row
  for (let pet of y) {
    const row = document.createElement("tr");
    row.innerHTML = createRowHTML(pet);
    tableBodyEl.appendChild(row);
  }
}

// Find pet
function findPet() {
  const id = inputId.value.trim();
  const name = inputName.value.trim();
  const type = inputType.value;
  const breed = inputBreed.value;
  const vaccinated = inputVaccinated.checked;
  const dewormed = inputDewormed.checked;
  const sterilized = inputSterilized.checked;

  const filteredPets = petArr.filter((pet) => {
    const matchesId = !id || pet.id.toLowerCase().includes(id.toLowerCase());
    const matchesName =
      !name || pet.name.toLowerCase().includes(name.toLowerCase());
    const matchesType = !type || pet.type === type || type === "Select Type";
    const matchesBreed =
      !breed || pet.breed === breed || breed === "Select Breed";
    const matchesVaccinated = vaccinated ? pet.vaccinated === true : true;
    const matchesDewormed = dewormed ? pet.dewormed === true : true;
    const matchesSterilized = sterilized ? pet.sterilized === true : true;

    return (
      matchesId &&
      matchesName &&
      matchesType &&
      matchesBreed &&
      matchesVaccinated &&
      matchesDewormed &&
      matchesSterilized
    );
  });

  renderTableData(filteredPets);
}

// Reset input
function findReset() {
  inputId.value = "";
  inputName.value = "";
  inputType.value = "Select Type";
  inputBreed.value = "Select Breed";
  inputVaccinated.checked = false;
  inputDewormed.checked = false;
  inputSterilized.checked = false;
  renderTableData([]);
}

/* ---------------------------------------------------
    END PROCESS
----------------------------------------------------- */

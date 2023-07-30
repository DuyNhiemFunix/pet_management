"use strict";
/* ---------------------------------------------------
PROCESS FLOW
----------------------------------------------------- */
// Import pet data
let petArr = JSON.parse(getFromStorage("petArr") ?? "[]");
renderTableData(petArr);
let healthyPetArr = [];

// Load Breed list
inputType.onchange = () => renderBreed(inputType.value);

// 'Submit' button
submitBtn.addEventListener("click", () => {
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
    bmi: "?",
    dateAdd: getDate(),
  };

  const validate = validateData(data);
  if (validate) {
    petArr.push(data);
    renderTableData(petArr);
    clearInput();
    healthyBtn.innerText = "Show Healthy Pet";
  }

  saveToStorage("petArr", JSON.stringify(petArr));
});

// 'Show Healthy Pet' button
healthyBtn.addEventListener("click", () => {
  if (healthyBtn.innerText === "Show Healthy Pet") {
    healthyPetArr = petArr.filter(function (object) {
      return (
        object.vaccinated === true &&
        object.dewormed === true &&
        object.sterilized === true
      );
    });
    if (healthyPetArr.length === 0) {
      tableBodyEl.innerHTML = "";
      const row = document.createElement("tr");
      row.innerHTML = `
      <td colspan='14' style="color: red; text-align: center;">No Healthy Pet</td>
    `;
      tableBodyEl.appendChild(row);
    } else {
      renderTableData(healthyPetArr);
      healthyBtn.innerText = "Show All";
    }
  } else if (healthyBtn.innerText === "Show All") {
    renderTableData(petArr);
    healthyBtn.innerText = "Show Healthy Pet";
  }
});

// 'Caculate BMI' button
bmiBtn.addEventListener("click", () => {
  if (petArr.length === 0) {
    tableBodyEl.innerHTML = "";
    const row = document.createElement("tr");
    row.innerHTML = `
    <td colspan='14' style="color: red; text-align: center;">No Pet for BMI Calculate</td>
  `;
    tableBodyEl.appendChild(row);
  } else {
    if (healthyBtn.innerText === "Show Healthy Pet") {
      calculateBmi(petArr);
      renderTableData(petArr);
    } else if (healthyBtn.innerText === "Show All") {
      calculateBmi(healthyPetArr);
      renderTableData(healthyPetArr);
    }
  }

  saveToStorage("petArr", JSON.stringify(petArr));
});

/* ---------------------------------------------------
    FUNCTION AREA
----------------------------------------------------- */
// Render table row data
function renderTableData(y) {
  tableBodyEl.innerHTML = "";

  for (let pet of y) {
    const row = document.createElement("tr");
    row.innerHTML =
      createRowHTML(pet) +
      `<td><button type="button" class="btn btn-danger" onclick="deletePet('${pet.id}')">Delete</button></td>`;
    tableBodyEl.appendChild(row);
  }
}

// Clear input
function clearInput() {
  inputId.value = "";
  inputName.value = "";
  inputAge.value = "";
  inputType.value = "Select Type";
  inputWeight.value = "";
  inputLength.value = "";
  inputBreed.value = "Select Breed";
  inputColor.value = "#000000";
  inputVaccinated.checked = false;
  inputDewormed.checked = false;
  inputSterilized.checked = false;
}

// Delete pet
function deletePet(z) {
  if (confirm("Are you sure?")) {
    petArr = petArr.filter((object) => {
      return object.id !== z;
    });
  }
  renderTableData(petArr);
  healthyBtn.innerText = "Show Healthy Pet";

  saveToStorage("petArr", JSON.stringify(petArr));
}

// Calculate bmi
function calculateBmi(w) {
  for (let i = 0; i < w.length; i++) {
    let pet = w[i];
    if (pet.type === "Dog") {
      pet.bmi = ((pet.weight * 703) / pet.lengthcm ** 2).toFixed(2);
    } else {
      pet.bmi = ((pet.weight * 886) / pet.lengthcm ** 2).toFixed(2);
    }
  }
}

/* ---------------------------------------------------
    END PROCESS
----------------------------------------------------- */

//
//
//
//
//

/* ---------------------------------------------------
    Add some sample pet for Mentor test the code.
    'Template Pets' button
----------------------------------------------------- */
const tempetBtn = $("tempet-btn");
tempetBtn.addEventListener("click", function () {
  localStorage.removeItem("petArr");
  petArr = [
    {
      id: "Pet01",
      name: "Luna",
      age: 12,
      type: "Cat",
      weight: 6,
      lengthcm: 35,
      breed: "Persian(c)",
      color: "#c800ff",
      vaccinated: true,
      dewormed: true,
      sterilized: true,
      bmi: "?",
      dateAdd: getDate(),
    },

    {
      id: "Pet02",
      name: "Bella",
      age: 9,
      type: "Dog",
      weight: 10,
      lengthcm: 60,
      breed: "Chihuahua(d)",
      color: "#f54d50",
      vaccinated: true,
      dewormed: true,
      sterilized: true,
      bmi: "?",
      dateAdd: getDate(),
    },

    {
      id: "Pet03",
      name: "Simba",
      age: 5,
      type: "Cat",
      weight: 7,
      lengthcm: 30,
      breed: "Bengal(c)",
      color: "#00aaff",
      vaccinated: true,
      dewormed: true,
      sterilized: false,
      bmi: "?",
      dateAdd: getDate(),
    },

    {
      id: "Pet04",
      name: "Max",
      age: 10,
      type: "Dog",
      weight: 15,
      lengthcm: 70,
      breed: "Beagle(d)",
      color: "#432828",
      vaccinated: true,
      dewormed: false,
      sterilized: true,
      bmi: "?",
      dateAdd: getDate(),
    },

    {
      id: "Pet05",
      name: "Benla",
      age: 9,
      type: "Cat",
      weight: 8,
      lengthcm: 27,
      breed: "Siamese(c)",
      color: "#1fa393",
      vaccinated: false,
      dewormed: true,
      sterilized: true,
      bmi: "?",
      dateAdd: getDate(),
    },

    {
      id: "Pet06",
      name: "Oliver",
      age: 4,
      type: "Cat",
      weight: 5,
      lengthcm: 15,
      breed: "Ragdoll(c)",
      color: "#c877ff",
      vaccinated: true,
      dewormed: true,
      sterilized: true,
      bmi: "?",
      dateAdd: getDate(),
    },

    {
      id: "Pet07",
      name: "Whiske",
      age: 2,
      type: "Cat",
      weight: 5,
      lengthcm: 25,
      breed: "Burmese(c)",
      color: "#00fac0",
      vaccinated: true,
      dewormed: true,
      sterilized: false,
      bmi: "?",
      dateAdd: getDate(),
    },

    {
      id: "Pet08",
      name: "Lucy",
      age: 6,
      type: "Dog",
      weight: 14,
      lengthcm: 48,
      breed: "Husky(d)",
      color: "#cfeb00",
      vaccinated: true,
      dewormed: false,
      sterilized: true,
      bmi: "?",
      dateAdd: getDate(),
    },

    {
      id: "Pet09",
      name: "Bailey",
      age: 5,
      type: "Dog",
      weight: 12,
      lengthcm: 43,
      breed: "Pomeranian(d)",
      color: "#f54000",
      vaccinated: true,
      dewormed: false,
      sterilized: true,
      bmi: "?",
      dateAdd: getDate(),
    },

    {
      id: "Pet10",
      name: "Charlie",
      age: 8,
      type: "Dog",
      weight: 7,
      lengthcm: 38,
      breed: "Poodle(d)",
      color: "#bfe880",
      vaccinated: false,
      dewormed: true,
      sterilized: false,
      bmi: "?",
      dateAdd: getDate(),
    },
  ];
  renderTableData(petArr);
  clearInput();
  tempetBtn.disabled = true;
  saveToStorage("petArr", JSON.stringify(petArr));

  //Create breed template
  localStorage.removeItem("breedArr");
  let breedArr = JSON.parse(getFromStorage("breedArr") ?? "[]");
  breedArr = [
    { id: 1, name: "Persian(c)", type: "Cat" },
    { id: 2, name: "Bengal(c)", type: "Cat" },
    { id: 3, name: "Chihuahua(d)", type: "Dog" },
    { id: 4, name: "Siamese(c)", type: "Cat" },
    { id: 5, name: "Beagle(d)", type: "Dog" },
    { id: 6, name: "Ragdoll(c)", type: "Cat" },
    { id: 7, name: "Burmese(c)", type: "Cat" },
    { id: 8, name: "Husky(d)", type: "Dog" },
    { id: 9, name: "Pomeranian(d)", type: "Dog" },
    { id: 10, name: "Poodle(d)", type: "Dog" },
  ];
  saveToStorage("breedArr", JSON.stringify(breedArr));
});

// ==============================================================

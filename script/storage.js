"use strict";
/* ---------------------------------------------------
    VARIABLE DECLARATION
----------------------------------------------------- */
const $ = document.getElementById.bind(document);

const sidebarTitleEl = $("sidebar-title");
const sidebarEl = $("sidebar");
const inputId = $("input-id");
const inputName = $("input-name");
const inputAge = $("input-age");
const inputType = $("input-type");
const inputWeight = $("input-weight");
const inputLength = $("input-length");
const inputColor = $("input-color-1");
const inputBreed = $("input-breed");
const inputVaccinated = $("input-vaccinated");
const inputDewormed = $("input-dewormed");
const inputSterilized = $("input-sterilized");
const submitBtn = $("submit-btn");
const healthyBtn = $("healthy-btn");
const bmiBtn = $("bmi-btn");
const tableBodyEl = $("tbody");
const findBtn = $("find-btn");
const resetBtn = $("reset-btn");
const containerForm = $("container-form");
const inputFile = $("input-file");
const importBtn = $("import-btn");
const exportBtn = $("export-btn");

/* ---------------------------------------------------
PROCESS FLOW
----------------------------------------------------- */
// Load pet/breed data
let petArr = JSON.parse(getFromStorage("petArr") ?? "[]");
let breedArr = JSON.parse(getFromStorage("breedArr") ?? "[]");

// Sidebar: load status
document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("sidebarState") === null) {
    sidebarEl.classList.add("active");
  } else {
    const sidebarState = getFromStorage("sidebarState");
    sidebarState === "active"
      ? sidebarEl.classList.add("active")
      : sidebarEl.classList.remove("active");
  }
});

// Sidebar: show/hide
sidebarTitleEl.addEventListener("click", () => {
  sidebarEl.classList.toggle("active");
  const isSidebarActive = sidebarEl.classList.contains("active");
  saveToStorage("sidebarState", isSidebarActive ? "active" : "inactive");
});

/* ---------------------------------------------------
    FUNCTION AREA
----------------------------------------------------- */
// Store data in localStorage
function saveToStorage(key, value) {
  localStorage.setItem(key, value);
}

// Retrieve data from local storage
function getFromStorage(key, defaultVal) {
  return localStorage.getItem(key) ?? defaultVal;
}

// Format date
function getDate() {
  let currentDate = new Date();
  let day = String(currentDate.getDate()).padStart(2, "0");
  let month = String(currentDate.getMonth() + 1).padStart(2, "0");
  let year = currentDate.getFullYear();
  let formattedDate = `${day}/${month}/${year}`;
  return formattedDate;
}

// Create Pet Row HTML
function createRowHTML(pet) {
  let vaccinatedMark = pet.vaccinated
    ? "bi-check-circle-fill"
    : "bi-x-circle-fill";
  let dewormedMark = pet.dewormed ? "bi-check-circle-fill" : "bi-x-circle-fill";
  let sterilizedMark = pet.sterilized
    ? "bi-check-circle-fill"
    : "bi-x-circle-fill";

  return `
    <tr>
      <th scope="row">${pet.id}</th>
      <td>${pet.name}</td>
      <td>${pet.age}</td>
      <td>${pet.type}</td>
      <td>${pet.weight} kg</td>
      <td>${pet.lengthcm} cm</td>
      <td>${pet.breed}</td>
      <td><i class="bi bi-square-fill" style="color: ${pet.color}"></i></td>
      <td><i class="bi ${vaccinatedMark}"></i></td>
      <td><i class="bi ${dewormedMark}"></i></td>
      <td><i class="bi ${sterilizedMark}"></i></td>
      <td>${pet.bmi}</td>
      <td>${pet.dateAdd}</td>
    </tr>
  `;
}

function validateData(x) {
  //Id validation
  const thElements = document.querySelectorAll('th[scope="row"]');
  // Check if there are no row elements
  if (thElements.length === 0) {
    if (x.id.trim().length === 0) {
      alert("ID must not be empty!");
      return false;
    } else if (x.id.indexOf(" ") >= 0) {
      alert("ID must not contain spaces!");
      return false;
    }
  } else {
    for (let i = 0; i < thElements.length; i++) {
      if (!inputId.disabled) {
        //If the input field is disabled, then skip (edit.html)
        if (x.id === thElements[i].innerText) {
          alert("ID must be unique!");
          return false;
        } else if (x.id.trim().length === 0) {
          alert("ID must not be empty!");
          return false;
        } else if (x.id.indexOf(" ") >= 0) {
          alert("ID must not contain spaces!");
          return false;
        }
      }
    }
  }
  //Name validation
  if (x.name.trim().length === 0) {
    alert("Name must not be empty!");
    return false;
  } else if (x.name.indexOf(" ") >= 0) {
    alert("Name must not contain spaces!");
    return false;
  }
  //Age validation
  if (isNaN(x.age) || x.age < 1 || x.age > 15) {
    alert("Age must be between 1 and 15!");
    return false;
  }
  //Type validation
  if (x.type == "Select Type") {
    alert("Please select Type!");
    return false;
  }
  //Weight validation
  if (isNaN(x.weight) || x.weight < 1 || x.weight > 15) {
    alert("Weight must be between 1 and 15!");
    return false;
  }
  //Length validation
  if (isNaN(x.lengthcm) || x.lengthcm < 1 || x.lengthcm > 100) {
    alert("Length must be between 1 and 100!");
    return false;
  }
  //Breed validation
  if (x.breed == "Select Breed") {
    alert("Please select Breed!");
    return false;
  }

  return true;
}

// Render breed in select box
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
/* ---------------------------------------------------
    END PROCESS
----------------------------------------------------- */

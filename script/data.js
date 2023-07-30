"use strict";
// import "FileSaver.js" in data.html
/* ---------------------------------------------------
    PROCESS FLOW
----------------------------------------------------- */
// Import data button
importBtn.addEventListener("click", importFile);
// Export data button
exportBtn.addEventListener("click", exportData);

/* ---------------------------------------------------
    FUNCTION AREA
----------------------------------------------------- */
// Export data using library: FileSaver.js
function exportData() {
  const arrPet = getFromStorage("petArr") ?? "[]";
  if (arrPet === null || JSON.parse(arrPet).length === 0) {
    alert("No data to export.");
    return;
  }
  const arrPetData = new Blob([arrPet], { type: "text/plain;charset=utf-8" });
  saveAs(arrPetData, "PetData.json");
}

// Import data
function importFile() {
  if (inputFile.files.length === 0) {
    alert("Please choose a file to import.");
    return;
  }

  const reader = new FileReader();
  reader.readAsText(inputFile.files[0]);

  reader.onload = function (event) {
    const fileContent = event.target.result;
    localStorage.setItem("petArr", fileContent);
    alert("Import successful!");
  };
}

/* ---------------------------------------------------
    END PROCESS
    Thank you Mentor, for reviewing and evaluating. 
----------------------------------------------------- */

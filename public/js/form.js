let collar1 = document.getElementById("collarInput1");
let collar2 = document.getElementById("collarInput2");
// const petType = document.getElementById("petType");
// const catHairType = document.getElementById("catHairType");
// const dogHairType = document.getElementById("dogHairType");
// const dogEarType = document.getElementById("dogEarType");
// const catHairTypeInputs = catHairType.getElementsByTagName("input");
// const dogHairTypeInputs = dogHairType.getElementsByTagName("input");
// const dogEarTypeInputs = dogEarType.getElementsByTagName("input");

collar1.addEventListener("click", (e) => {
  if (
    (e.target.value = "true") &&
    !document.getElementById("collarColorInput")
  ) {
    let collarInputDiv = document.getElementById("collarInput");
    let input = document.createElement("input");
    input.name = "collarInformationInput";
    input.type = "text";
    input.id = "collarInformationInput";

    let label = document.createElement("label");
    label.innerHTML = "Collar Information";
    label.for = "collarInformationInput";
    label.id = "collarInformationLabel";
    collarInputDiv.after(label, input);

    input = document.createElement("input");
    input.name = "collarColorInput";
    input.type = "text";
    input.id = "collarColorInput";

    label = document.createElement("label");
    label.innerHTML = "Collar Color";
    label.for = "collarColorInput";
    label.id = "collarColorLabel";
    collarInputDiv.after(label, input);
  }
});

collar2.addEventListener("click", (e) => {
  if (
    (e.target.value = "false") &&
    document.getElementById("collarColorInput")
  ) {
    let collarColorInput = document.getElementById("collarColorInput");
    let collarColorLabel = document.getElementById("collarColorLabel");
    collarColorInput.remove();
    collarColorLabel.remove();

    let collarInformationInput = document.getElementById(
      "collarInformationInput"
    );
    let collarInformationLabel = document.getElementById(
      "collarInformationLabel"
    );
    collarInformationInput.remove();
    collarInformationLabel.remove();
  }
});

// petType.addEventListener("change", (e) => {
//   if (e.target.value === "cat") {
//     catHairType.style.display = "flex";
//     dogHairType.style.display = "none";
//     dogEarType.style.display = "none";
//     for (let ele of catHairTypeInputs) {
//       ele.setAttribute("required", "");
//     }
//     for (let ele of dogHairTypeInputs) {
//       ele.removeAttribute("required");
//     }
//     for (let ele of dogEarTypeInputs) {
//       ele.removeAttribute("required");
//     }
//   } else {
//     catHairType.style.display = "none";
//     dogHairType.style.display = "flex";
//     dogEarType.style.display = "block";
//     for (let ele of catHairTypeInputs) {
//       ele.removeAttribute("required");
//     }
//     for (let ele of dogHairTypeInputs) {
//       ele.setAttribute("required", "");
//     }
//     for (let ele of dogEarTypeInputs) {
//       ele.setAttribute("required", "");
//     }
//   }
// });

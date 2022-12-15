let collar1 = document.getElementById("colarInput1");
let collar2 = document.getElementById("colarInput2");
const petType = document.getElementById("petType");
const catHairType = document.getElementById("catHairType");
const dogHairType = document.getElementById("dogHairType");
const dogEarType = document.getElementById("dogEarType");
const catHairTypeInputs = catHairType.getElementsByTagName("input");
const dogHairTypeInputs = dogHairType.getElementsByTagName("input");
const dogEarTypeInputs = dogEarType.getElementsByTagName("input");

collar1.addEventListener("click", (e) => {
  if (
    (e.target.value = "true") &&
    !document.getElementById("colarColorInput")
  ) {
    let collarInputDiv = document.getElementById("colarInput");
    let input = document.createElement("input");
    input.name = "colarInformationInput";
    input.type = "text";
    input.id = "colarInformationInput";

    let label = document.createElement("label");
    label.innerHTML = "Colar Information";
    label.for = "colarInformationInput";
    label.id = "colarInformationLabel";
    collarInputDiv.after(label, input);

    input = document.createElement("input");
    input.name = "colarColorInput";
    input.type = "text";
    input.id = "colarColorInput";

    label = document.createElement("label");
    label.innerHTML = "Colar Color";
    label.for = "colarColorInput";
    label.id = "colarColorLabel";
    collarInputDiv.after(label, input);
  }
});

collar2.addEventListener("click", (e) => {
  if (
    (e.target.value = "false") &&
    document.getElementById("colarColorInput")
  ) {
    let collarColorInput = document.getElementById("colarColorInput");
    let colarColorLabel = document.getElementById("colarColorLabel");
    collarColorInput.remove();
    colarColorLabel.remove();

    let collarInformationInput = document.getElementById(
      "colarInformationInput"
    );
    let colarInformationLabel = document.getElementById(
      "colarInformationLabel"
    );
    collarInformationInput.remove();
    colarInformationLabel.remove();
  }
});

petType.addEventListener("change", (e) => {
  if (e.target.value === "cat") {
    catHairType.style.display = "flex";
    dogHairType.style.display = "none";
    dogEarType.style.display = "none";
    for (let ele of catHairTypeInputs) {
      ele.setAttribute("required", "");
    }
    for (let ele of dogHairTypeInputs) {
      ele.removeAttribute("required");
    }
    for (let ele of dogEarTypeInputs) {
      ele.removeAttribute("required");
    }
  } else {
    catHairType.style.display = "none";
    dogHairType.style.display = "flex";
    dogEarType.style.display = "block";
    for (let ele of catHairTypeInputs) {
      ele.removeAttribute("required");
    }
    for (let ele of dogHairTypeInputs) {
      ele.setAttribute("required", "");
    }
    for (let ele of dogEarTypeInputs) {
      ele.setAttribute("required", "");
    }
  }
});

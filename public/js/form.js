let collar1 = document.getElementById("colarInput1");
let collar2 = document.getElementById("colarInput2");

collar1.addEventListener("click", (e) => {
  if (
    (e.target.value = "true") &&
    !document.getElementById("colarColorInput")
  ) {
    let collarInputDiv = document.getElementById("colarInput");
    let input = document.createElement("input");
    input.name = "colarColorInput";
    input.type = "text";
    input.id = "colarColorInput";

    let label = document.createElement("label");
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
  }
});

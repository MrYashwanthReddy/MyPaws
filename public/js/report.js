let lostDiv = document.getElementById("reportLostDiv");
let foundDiv = document.getElementById("reportFoundDiv");

lostDiv.style.display = "none";
foundDiv.style.display = "none";

function lost() {
  lostDiv.style.display = "flex";
  $("#report").hide();
}

function found() {
  foundDiv.style.display = "flex";
  $("#report").hide();
}

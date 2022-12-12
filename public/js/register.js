let outputProfileImage = document.getElementById("outputProfileImage");
let inputProfileImage = document.getElementById("profileImageInput");

//outputProfileImage.style.display = "none";

inputProfileImage.addEventListener("change", (e) => {
  outputProfileImage.style.display = "flex";
  outputProfileImage.src = URL.createObjectURL(e.target.files[0]);
});

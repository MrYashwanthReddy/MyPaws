let outputProfileImage = document.getElementById("outputProfileImage");
let inputProfileImage = document.getElementById("profileImageInput");

inputProfileImage.addEventListener("change", (e) => {
  outputProfileImage.src = URL.createObjectURL(e.target.files[0]);
});

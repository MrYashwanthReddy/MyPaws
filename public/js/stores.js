// const success = (e) => {
//   if (e) {
//     let lat = e.coords.latitude;
//     let lon = e.coords.longitude;

//     let location = lat + "," + lon;

//     let xhr = new XMLHttpRequest();
//     xhr.open("POST", "pet-stores", true);
//     xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//     xhr.send(`location=${location}`);
//   }
// };

// const error = (e) => {
//   if (e) {
//     console.log(e);
//     return;
//   }
// };

// setInterval(() => {
//   navigator.geolocation.getCurrentPosition(success, error);
// }, 1000000);

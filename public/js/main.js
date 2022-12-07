async function loadFeed() {
  let { data } = await axios.get("/get-feed");

  let res = "";
  data.forEach((f) => {
    let imgs = ``;
    JSON.parse(f.images).forEach((i, idx) => {
      imgs += `<div class="carousel-item ${idx == 0 ? "active" : ""}">
                <img class="d-block w-100" src="${i}">
            </div>`;
    });

    res += `<div class="feed-main" data-id="${f._id}">
            <div class="feed-user">
                <span>${f.users[0].firstName} ${f.users[0].lastName}</span>
            </div>
            <div class="feed-img">
                <div id="images-list-${f._id}" class="carousel slide" data-ride="carousel">
                    <div class="carousel-inner">
                        ${imgs}
                    </div>
                    <a class="carousel-control-prev" href="#images-list-${f._id}" role="button" data-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="sr-only">Previous</span>
                    </a>
                    <a class="carousel-control-next" href="#images-list-${f._id}" role="button" data-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="sr-only">Next</span>
                    </a>
                </div>
                
            </div>
            <div class="feed-data"><span>${f.data}</span></div>
            <div class="feed-footer"><button>Comment</button></div>
        </div>`;
  });

  document.getElementById("live-feed").innerHTML = res;
  $(".carousel").carousel();
}
if (document.getElementById("live-feed") != undefined) {
  loadFeed();
}

//Not in main.js

// async function loadFeed() {
//     let { data } = await axios.get('/get-feed');
//     console.log(data);

//     let res = "";
//     data.forEach(f => {

//         let imgs = ``;
//         JSON.parse(f.images).forEach((i, idx) => {
//             imgs += `<div class="carousel-item ${idx == 0 ? 'active' : ''}">
//                 <img class="d-block w-100" src="${i}">
//             </div>`
//         })

//         res += `<div class="feed-main" data-id="${f._id}">
//             <div class="feed-user">
//                 <span>${f.users[0].firstName} ${f.users[0].lastName}</span>
//             </div>
//             <div class="feed-img">
//                 <div id="images-list-${f._id}" class="carousel slide" data-ride="carousel">
//                     <div class="carousel-inner">
//                         ${imgs}
//                     </div>
//                     <a class="carousel-control-prev" href="#images-list-${f._id}" role="button" data-slide="prev">
//                         <span class="carousel-control-prev-icon" aria-hidden="true"></span>
//                         <span class="sr-only">Previous</span>
//                     </a>
//                     <a class="carousel-control-next" href="#images-list-${f._id}" role="button" data-slide="next">
//                         <span class="carousel-control-next-icon" aria-hidden="true"></span>
//                         <span class="sr-only">Next</span>
//                     </a>
//                 </div>

//             </div>
//             <div class="feed-data"><span>${f.data}</span></div>
//             <div class="feed-footer"><button>Comment</button></div>
//         </div>`;
//     });

//     document.getElementById('live-feed').innerHTML = res;
//     $('.carousel').carousel()
// }
// if (document.getElementById('live-feed') != undefined) {
//     loadFeed();
// }

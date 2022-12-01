async function loadFeed(){
    let {data} = await axios.get('/get-feed');
    console.log(data);

    let res = "";
    data.forEach(f => {
        res += `<div class="feed-main" data-id="${f._id}">
            <div class="feed-user">
                <span>${f.userId}</span>
                <span>username</span>
            </div>
            <div class="feed-img">
                <img
                    src="https://images.unsplash.com/photo-1579353977828-2a4eab540b9a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2FtcGxlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=700&q=60" />
            </div>
            <div class="feed-data"><span>${f.data}</span></div>
            <div class="feed-footer"><button>Comment</button></div>
        </div>`;
    });

    document.getElementById('live-feed').innerHTML = res;
}
if(document.getElementById('live-feed') != undefined){
    loadFeed();
}


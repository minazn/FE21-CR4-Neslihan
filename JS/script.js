var movies = JSON.parse(movieList);

for (let val of movies){
    document.getElementById("movie-listing").innerHTML += 
    `<div class="col-lg-4 col-md-6 col-sm-12 col-12 d-flex flex-column mb-4" id="movie-card">
    <div class="row g-0 align-items-center bg-light">
        <div class="col-4">
            <img src=` + val.image + ` class="img-fluid rounded-start" alt="` + val.movieName + `">
        </div>
        <div class="col-8">
        <div class="card-body">
            <h5 class="card-title">`+ val.movieName + `</h5>
            <p class="card-text">Released: ` + val.releaseDate + ` <br> Genre: `+ val.genre + `</p>
            <div class="d-flex justify-content-between">
                <h4> € ` + val.price + `</h4>
                <div>
                    <span class="nr-of-likes">Like &#128077</span>          
                    <button type="button" class="btn like_btn text-white"><b>` + val.likes + `</b></button>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="row desription p-2 m-0 text-center align-items-center">
    <p>` + val.description +
    `</p>
</div>
</div>`;
}

//prepare array for sorting
var unsorted_arr = [];

for (let i=0; i<movies.length; i++){
    unsorted_arr.push(movies[i].likes);
}

// Incrementing the Likes
var btn = document.getElementsByTagName("button");

for (let i=0; i<movies.length; i++){
    btn[i].addEventListener("click",addLike);
}


function addLike(){
    //the innerHTML is including the <b> tag, so i have to substract the closing </b>, to use substring.
    // I could also remove the bold tag from the HTML, but I chose to keep it :)
    let substract_boldtag = this.innerHTML.length - 4;
    //the number of likes starts after the opening bold tag
    let tmp = Number(this.innerHTML.substring(3,substract_boldtag));
    //for sorting
    var idx = movies.findIndex(x => x.likes === tmp);
    //incrementing innerHTML after btn click
    tmp += 1;
    this.innerHTML = `<b>` + tmp +`</b>`;

    //for sorting
    unsorted_arr[idx] += 1;
    movies[idx].likes += 1;
    console.log(unsorted_arr);
}

// unsorted_arr.sort(function(a, b){return a - b});
console.log(btn.length);




// console.log(unsorted_arr.sort(function(a, b){return a - b}));
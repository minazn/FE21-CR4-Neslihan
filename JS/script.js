var movies = JSON.parse(movieList);

//I don't want to write this block multiple times(e.g for sorting), so I am creating a function
var content = document.getElementById("movie-listing");

function writeContentOfMoviePage(obj) {
    content.innerHTML +=
        `<div class="col-lg-4 col-md-6 col-sm-12 col-12 d-flex flex-column mb-4" id="movie-card">
    <div class="row g-0 align-items-center bg-light card-white-block">
        <div class="col-4">
            <img src=` + obj.image + ` class="img-fluid rounded-start" alt="` + obj.movieName + `">
        </div>
        <div class="col-8">
        <div class="card-body">
            <h5 class="card-title">`+ obj.movieName + `</h5>
            <p class="card-text">Released: ` + obj.releaseDate + ` <br> Genre: ` + obj.genre + `</p>
            <div class="d-flex justify-content-between">
                <h6 class = "price"> € ` + obj.price + `</h6>
                <div>
                    <span class="nr-of-likes">Like &#128077</span>          
                    <button type="button" class="btn text-white like-btn"><b>` + obj.likes + `</b></button>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="row desription p-2 m-0 text-center align-items-center">
    <p>` + obj.description +
        `</p>
</div>
</div>`;
}

for (let val of movies) {
    writeContentOfMoviePage(val);
}



// Incrementing the Likes
var btn = document.getElementsByClassName("like-btn");

for (let i = 0; i < movies.length; i++) {
    btn[i].addEventListener("click", addLike);
}

var idx = 0;

//prepare array for sorting
var unsorted_arr = [];

for (let i = 0; i < movies.length; i++) {
    unsorted_arr.push(movies[i].likes);
}

function addLike() {
    //the innerHTML is including the <b> tag, so i have to substract the closing </b>, to use substring.
    // I could also remove the bold tag from the HTML, but I chose to keep it :)
    let substract_boldtag = this.innerHTML.length - 4;
    //the number of likes starts after the opening bold tag
    let tmp = Number(this.innerHTML.substring(3, substract_boldtag));
    //for sorting; I googled this command. It returns the index of an object
    // I acutally wanted to addLike() after the sorting as well, but sth is not working (see function in comment below)
    if (sorted == false) {
        idx = movies.findIndex(x => x.likes === tmp);
    } else {
        idx = sorted_movies.findIndex(x => x.likes === tmp);
    }
    //incrementing innerHTML after btn click
    tmp += 1;
    this.innerHTML = `<b>` + tmp + `</b>`;

    //for sorting
    unsorted_arr[idx] += 1;
    movies[idx].likes += 1;
}

//this is not working, after clicking the sort button and then the like button
// function addLike(){
//     console.log("test");
// }


// here we handle the sorting


var sort_btn = document.getElementById("sort-btn");
sort_btn.addEventListener("click", sortLikes);


var idx_of_sorted_likes = 0;

var sorted_movies = JSON.parse(movieList);
var sorted = false;

function sortLikes() {
    let sorted_arr = unsorted_arr.sort(function (a, b) { return b - a });
    for (let i = 0; i < movies.length; i++) {
        idx_of_sorted_likes = movies.findIndex(x => x.likes === sorted_arr[i]);
        //sort the objects.
        sorted_movies[i].movieName = movies[idx_of_sorted_likes].movieName;
        sorted_movies[i].image = movies[idx_of_sorted_likes].image;
        sorted_movies[i].description = movies[idx_of_sorted_likes].description;
        sorted_movies[i].releaseDate = movies[idx_of_sorted_likes].releaseDate;
        sorted_movies[i].genre = movies[idx_of_sorted_likes].genre;
        sorted_movies[i].price = movies[idx_of_sorted_likes].price;
        sorted_movies[i].likes = movies[idx_of_sorted_likes].likes;
    }

    content.innerHTML = "";

    for (let val of sorted_movies) {
        writeContentOfMoviePage(val);
    }
    sorted = true;
}













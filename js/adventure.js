//Getting the link - all movies (Page 1 - 20 movies)
let movieList = getObj("https://yts.mx/api/v2/list_movies.json?genre=adventure");

//Sorting using movie ID - descending by year 2021
let movieArray = movieList.data.movies;
movieArray.sort((a, b) => parseFloat(b.year) - parseFloat(a.year));

//Act as the counter for the loop
let movieCounter = movieList.data.limit;

//function to obtain the images
function getMovie(n){
  //Get image poster
  let getImage = movieList.data.movies[n].medium_cover_image;
  //Get movie title
  let getTitle = movieList.data.movies[n].title;
  //Get movie year
  let getYear = movieList.data.movies[n].year;
  //Get movie rating
  let getRating = movieList.data.movies[n].rating;
  //Get genre desc
  let getGenreDesc = movieList.data.movies[n].genres;
  let getGenreDescSep = getGenreDesc.join("," + "\n"); //Prints to a new line
  //Get movie runtime
  let getRuntime = movieList.data.movies[n].runtime;
  //Get movie summary
  let getSummary = movieList.data.movies[n].summary;
  
//Create the img tag - img-fluid
let image = document.createElement("img");
image.setAttribute("class", "img-fluid");
image.setAttribute("id", "genre");
image.setAttribute("src", getImage);

//Create the div tag - col-sm-3
let col = document.createElement("div");
col.setAttribute("class","col-sm-3");
col.appendChild(image);

//Create the div tag - for overlay
let overlay = document.createElement("div");
overlay.setAttribute("class", "overlay");
col.appendChild(overlay);

//Create the h4 tag - for overlay - movieTitle & Year
let movie_title = document.createElement("p");
movie_title.setAttribute("class", "movie_title");
movie_title.innerHTML = getTitle +" ("+getYear+")";
overlay.appendChild(movie_title);

//Create the p tag - for genre
let genre_desc = document.createElement("p");
genre_desc.setAttribute("class", "genre_desc");
genre_desc.innerHTML = getGenreDescSep;
overlay.appendChild(genre_desc);

//Create a hyperlink - for torrent
  
//Create the button tag - for overlay
let view_more = document.createElement("button");
view_more.setAttribute("class", "view_more_btn");
view_more.innerHTML = "VIEW MORE"
overlay.appendChild(view_more);
  
//Get the main row class id
let main_row = document.getElementById("main_row");

//Connecting everything
main_row.appendChild(col);

// Get the modal
let modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];


// When the user clicks the button, open the modal 
view_more.onclick = function()
{
  modal.style.display = "block";
  //document.getElementById("headertitle").innerHTML = movieTitle;
  document.getElementById("poster").src = getImage;
  document.getElementById("title").innerHTML = getTitle;
  document.getElementById("genres").innerHTML = getGenreDescSep;
  document.getElementById("rate").innerHTML = getRating;
  document.getElementById("year").innerHTML = getYear;
  document.getElementById("runtime").innerHTML = getRuntime;
  document.getElementById("summary").innerHTML = getSummary;
  }
  
  // When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

} /*END*/

//Loading images to HTML - 6 movies you want to post
for(let count=0; count < movieCounter; count++){
  getMovie(count);
}

//Getting the request?
function getObj(yourUrl){
    var Httpreq = new XMLHttpRequest(); // a new request
    Httpreq.open("GET",yourUrl,false);
    Httpreq.send(null);
    return JSON.parse(Httpreq.responseText);       
}

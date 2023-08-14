/*const search = document
  .getElementById("search")
  .addEventListener("click", callMovies);
*/
const menuToggle = document.getElementById("menu-toggle");
const mobileLinks = document.getElementById("mobile-links");

const movie_genre = document.getElementById("genre");
const movie_year = document.getElementById("year");

const nextBtn = document.getElementById("next_btn");
let movieItem = document.getElementById("output");

function randomNumberGenerator() {
  let randomNumber = Math.floor(Math.random() * 20);
  console.log(randomNumber);
  return randomNumber;
}

function callMovies() {
  const callGenre = `with_genres=${movie_genre.value}`;
  let pageNumber = `&page=${randomNumberGenerator()}`;

  const url = "https://advanced-movie-search.p.rapidapi.com/discover/movie?";
  const final = url + callGenre + pageNumber;

  console.log(final);

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "0c61322343mshe5386bc17e61688p19e553jsnd4d160510343",
      "X-RapidAPI-Host": "advanced-movie-search.p.rapidapi.com",
    },
  };
  let strs;

  fetch(final, options)
    .then((response) => response.json())
    .then((movies) => {
      console.log(movies.page, final);
      const item = movies.results;

      console.log(item);

      //get the genre value from user input
      const display_genre = movie_genre.value;
      console.log(display_genre);

      for (let i = 0; i < item.length; i++) {
        const element = item[i];

        const releaseDateValue = element.release_date;
        strs = releaseDateValue.split("-");

        homeDisplay(strs);

        output += `
        <div class= "movie-card">
            <img src=${element.poster_path} class ="movie-img">
            <div class ="movie-text">
            <h3 class ="movie-title">${element.original_title}</h3>
            <br>
            <p class="movie-overview">${element.overview}</p>
            <p class="movie-year">${strs[0]}</p>
            <br>
            </div>
        </div>
        `;
      }

      //display the movie info here
      movieItem.innerHTML = output;
      console.log(movieItem);
    })

    //error message
    .catch((err) => console.error(err));
}

function nextMoviePage() {
  movieItem.innerHTML = " ";
  callMovies();
}

function homeDisplay(strs) {
  let year = strs;

  if (year === "2023") {
  }
}

menuToggle.addEventListener("click", () => {
  if (mobileLinks.contains("links")) {
    mobileLinks.remove("links").add("nav-links");
  } else {
    mobileLinks.add("links").remove("nav-links");
  }
});
/*
 get the array of all genres ids and their names
 store that in another array called genre
 
 write a switch case that decides the genre id from the name typed by
 users
 then for each genre change the genre value to that specific id
 and then pass the value to the call Movies 

 */

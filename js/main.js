var genreID_JSON = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Science Fiction",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
  10759: "Action & Adventure",
  10762: "Kids",
  10763: "News",
  10764: "Reality",
  10765: "Sci-Fi & Fantasy",
  10766: "Soap",
  10767: "Talk",
  10768: "War & Politics",
};

var api_key =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMzgzNjlhOGQ3M2Y1OWVmZDk0MjhjMDMxYWE5NGEwYyIsInN1YiI6IjVlZDUzOTg3MWIxNTdkMDAxZjU2ZjMxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.t6oglj_4DkYEeq59zGSFArZw-r9oUG0Rh8mbWCtW6zk";

function getGenreName(id) {
  return genreID_JSON[id];
}

function getTrailerID(movie_id) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMzgzNjlhOGQ3M2Y1OWVmZDk0MjhjMDMxYWE5NGEwYyIsInN1YiI6IjVlZDUzOTg3MWIxNTdkMDAxZjU2ZjMxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.t6oglj_4DkYEeq59zGSFArZw-r9oUG0Rh8mbWCtW6zk",
    },
  };

  fetch(
    `https://api.themoviedb.org/3/movie/${movie_id}/videos?language=en-US`,
    options
  )
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
}

function openModal(movie) {
  var movie_id = movie.id;
  var modal = document.getElementById("myModal");
  var title = document.getElementById("modal-title");
  var year = document.getElementById("modal-year");
  var director = document.getElementById("modal-director");
  var genres = document.getElementById("modal-genres");
  var ratings = document.getElementById("modal-ratings");
  var description = document.getElementById("modal-description");
  var trailerVideo = document.getElementById("trailer-video");

  title.innerHTML = movie.title;
  year.innerHTML = movie.release_date;
  director.innerHTML = "filmDetails.director";
  genres.innerHTML = movie.genre_ids
    ? movie.genre_ids.map((id) => getGenreName(id)).join(", ")
    : "Not Found";
  ratings.innerHTML = movie.vote_average + "/10";
  description.innerHTML = movie.overview;

  trailerVideo.src = "https://www.youtube.com/embed/";

  modal.style.display = "block";
}

function closeModal() {
  var modal = document.getElementById("myModal");
  modal.style.display = "none";
}

// Close the modal when clicking outside of it
window.onclick = function (event) {
  var modal = document.getElementById("myModal");
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// tuşlar üst üste binmesin diye
function toggleButton(event) {
  event.stopPropagation(); // Stop event propagation to prevent opening the modal
  var button = event.target;
  if (button.classList.contains("added")) {
    button.classList.remove("added");
    button.innerText = button.innerText.replace(" Added", "");
  } else {
    button.classList.add("added");
    button.innerText += " Added";
  }
}

function fetchMovieData() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${api_key}`,
    },
  };

  return fetch(
    "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
    options
  )
    .then((response) => response.json())
    .then((data) => data.results);
}

function fetchUpcomingMovieData() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMzgzNjlhOGQ3M2Y1OWVmZDk0MjhjMDMxYWE5NGEwYyIsInN1YiI6IjVlZDUzOTg3MWIxNTdkMDAxZjU2ZjMxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.t6oglj_4DkYEeq59zGSFArZw-r9oUG0Rh8mbWCtW6zk",
    },
  };

  return fetch(
    "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
    options
  )
    .then((response) => response.json())
    .then((data) => data.results);
}

function fetchTopRatedMovieData() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMzgzNjlhOGQ3M2Y1OWVmZDk0MjhjMDMxYWE5NGEwYyIsInN1YiI6IjVlZDUzOTg3MWIxNTdkMDAxZjU2ZjMxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.t6oglj_4DkYEeq59zGSFArZw-r9oUG0Rh8mbWCtW6zk",
    },
  };

  return fetch(
    "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
    options
  )
    .then((response) => response.json())
    .then((data) => data.results);
}

function fetchPopularMovieData() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMzgzNjlhOGQ3M2Y1OWVmZDk0MjhjMDMxYWE5NGEwYyIsInN1YiI6IjVlZDUzOTg3MWIxNTdkMDAxZjU2ZjMxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.t6oglj_4DkYEeq59zGSFArZw-r9oUG0Rh8mbWCtW6zk",
    },
  };

  return fetch(
    "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
    options
  )
    .then((response) => response.json())
    .then((data) => data.results);
}

// Function to create and populate the movie div
function createMovieDiv(movie) {
  // Create new elements
  const filmDiv = document.createElement("div");
  const image = document.createElement("img");
  const title = document.createElement("h3");
  const addButtonContainer = document.createElement("div");
  const watchedButton = document.createElement("button");
  const watchLaterButton = document.createElement("button");

  // Set attributes and text content
  filmDiv.classList.add("film");
  filmDiv.onclick = function () {
    openModal(movie);
  }; // Replace 'potc' with the appropriate movie identifier
  image.src = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
    : "/default-poster.jpg";
  image.alt = movie.title;
  title.textContent = movie.title;
  addButtonContainer.classList.add("add-buttons");
  watchedButton.classList.add("watched-btn");
  watchedButton.textContent = "Watched";
  watchedButton.onclick = function (event) {
    toggleButton(event);
  };
  watchLaterButton.classList.add("watch-later-btn");
  watchLaterButton.textContent = "Watch Later";
  watchLaterButton.onclick = function (event) {
    toggleButton(event);
  };

  // Append elements
  addButtonContainer.appendChild(watchedButton);
  addButtonContainer.appendChild(watchLaterButton);
  filmDiv.appendChild(image);
  filmDiv.appendChild(title);
  filmDiv.appendChild(addButtonContainer);

  return filmDiv;
}

// Function to append movie div to parent container
function appendMovieDiv(movieDiv, id) {
  const parentContainer = document.getElementById(id);
  parentContainer.appendChild(movieDiv);
}

// Fetch movie data and create movie divs
fetchMovieData()
  .then((movies) => {
    movies.forEach((movie) => {
      const movieDiv1 = createMovieDiv(movie);
      appendMovieDiv(movieDiv1, "film-row");
    });
  })
  .catch((error) => {
    console.error("Error fetching movie data:", error);
  });

fetchUpcomingMovieData()
  .then((movies) => {
    movies.forEach((movie) => {
      const movieDiv2 = createMovieDiv(movie);
      appendMovieDiv(movieDiv2, "film-row-upcoming");
    });
  })
  .catch((error) => {
    console.error("Error fetching movie data:", error);
  });

fetchTopRatedMovieData()
  .then((movies) => {
    movies.forEach((movie) => {
      const movieDiv3 = createMovieDiv(movie);
      appendMovieDiv(movieDiv3, "film-row-top-rated");
    });
  })
  .catch((error) => {
    console.error("Error fetching movie data:", error);
  });

fetchPopularMovieData()
  .then((movies) => {
    movies.forEach((movie) => {
      const movieDiv4 = createMovieDiv(movie);
      appendMovieDiv(movieDiv4, "film-row-popular");
    });
  })
  .catch((error) => {
    console.error("Error fetching movie data:", error);
  });


async function fetchMovieTitle(query) {
  const modifiedQuery = query.split(" ").join("%20");
  const url = `https://api.themoviedb.org/3/search/movie?query=${modifiedQuery}&include_adult=false&language=en-US&page=1`;
  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMzgzNjlhOGQ3M2Y1OWVmZDk0MjhjMDMxYWE5NGEwYyIsInN1YiI6IjVlZDUzOTg3MWIxNTdkMDAxZjU2ZjMxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.t6oglj_4DkYEeq59zGSFArZw-r9oUG0Rh8mbWCtW6zk`,
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    const json = await response.json();
    return json.results;
  } catch (err) {
    console.error("There has been a problem with your fetch operation:", err);
    return [];
  }
}

function showMovieResults(movies) {
  const filmListElement = document.getElementById("film-list");
  const filmListContainer = filmListElement.querySelector(
    ".film-list-container"
  );
  filmListContainer.innerHTML = "";
  if (movies.length > 0) {
    const movieTitles = movies
      .map((movie) => {
        const movieData = encodeURIComponent(JSON.stringify(movie));
        return `<p class="film-title" data-movie="${movieData}">${movie.title} (${movie.release_date})</p>`;
      })
      .join("");
    filmListContainer.innerHTML = movieTitles;
    const filmTitles = document.querySelectorAll(".film-title");
    filmTitles.forEach((title) => {
      title.addEventListener("click", function () {
        const selectedMovie = JSON.parse(
          decodeURIComponent(this.getAttribute("data-movie"))
        );
        displaySelectedMovie(selectedMovie);
      });
    });
  } else {
    filmListContainer.innerHTML = "<p>No movies found with that name.</p>";
  }
}

function displaySelectedMovie(movie) {
  const selectedFilmsContainer = document.getElementById("selected-film-list");
  const newFilmDiv = document.createElement("div");
  newFilmDiv.className = "selected-film-item movie-card";
  const posterPath = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "placeholder-image-url"; // Use a placeholder if no poster
  newFilmDiv.innerHTML = `
    <img src="${posterPath}" alt="${movie.title} Poster" style="width: 30%; height: auto;"/>
    <h2>${movie.title}</h2>
    <button class='delete-film-button '>Delete</button>
  `;
  selectedFilmsContainer.appendChild(newFilmDiv);
  document
    .getElementById("film-list")
    .querySelector(".film-list-container").innerHTML = "";
  document.getElementById("film-name-input").value = "";

  newFilmDiv
    .querySelector(".delete-film-button")
    .addEventListener("click", function () {
      newFilmDiv.remove();
      updateListStatus();
    });
}

document
  .getElementById("film-name-input")
  .addEventListener("input", function () {
    const filmName = this.value;
    if (filmName.trim() !== "") {
      fetchMovieTitle(filmName)
        .then(showMovieResults)
        .catch((error) => {
          console.error("Error fetching movie data:", error);
        });
    } else {
      updateListStatus();
    }
  });

function updateListStatus() {
  const selectedFilmsContainer = document.getElementById("selected-film-list");
  const filmListElement = document.getElementById("film-list");
  const filmListContainer = filmListElement.querySelector(
    ".film-list-container"
  );

  if (selectedFilmsContainer.children.length > 0) {
    filmListContainer.innerHTML = "";
  } else {
    filmListContainer.innerHTML =
      "<p>Your list is empty. Add films using the field above, or from the links on a film poster or page.</p>";
  }
}

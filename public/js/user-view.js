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

function getGenreName(id) {
  return genreID_JSON[id];
}

function getMovieTrailerID(movie_id) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMzgzNjlhOGQ3M2Y1OWVmZDk0MjhjMDMxYWE5NGEwYyIsInN1YiI6IjVlZDUzOTg3MWIxNTdkMDAxZjU2ZjMxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.t6oglj_4DkYEeq59zGSFArZw-r9oUG0Rh8mbWCtW6zk",
    },
  };

  return fetch(
    `https://api.themoviedb.org/3/movie/${movie_id}/videos?language=en-US`,
    options
  )
    .then((response) => response.json())
    .then((data) => data.results);
}

function getMovieCrewDetails(movie_id) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMzgzNjlhOGQ3M2Y1OWVmZDk0MjhjMDMxYWE5NGEwYyIsInN1YiI6IjVlZDUzOTg3MWIxNTdkMDAxZjU2ZjMxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.t6oglj_4DkYEeq59zGSFArZw-r9oUG0Rh8mbWCtW6zk",
    },
  };

  return fetch(
    `https://api.themoviedb.org/3/movie/${movie_id}/credits?language=en-US`,
    options
  )
    .then((response) => response.json())
    .then((data) => data.cast);
}

function searchMovie(movie_name) {
  const modifiedMovieName = movie_name.split(" ").join("%20");
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMzgzNjlhOGQ3M2Y1OWVmZDk0MjhjMDMxYWE5NGEwYyIsInN1YiI6IjVlZDUzOTg3MWIxNTdkMDAxZjU2ZjMxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.t6oglj_4DkYEeq59zGSFArZw-r9oUG0Rh8mbWCtW6zk",
    },
  };

  return fetch(
    `https://api.themoviedb.org/3/search/movie?query=${movie_name}&include_adult=false&language=en-US&page=1`,
    options
  )
    .then((response) => response.json())
    .then((data) => data.results)
    .catch((err) => console.error(err));
}

function showModal(movie) {
  var movie_id = movie.id;
  var modal = document.getElementById("movieModal");
  var title = document.getElementById("modal-title");
  var year = document.getElementById("modal-year");
  var director = document.getElementById("modal-crew");
  var genres = document.getElementById("modal-genres");
  var ratings = document.getElementById("modal-ratings");
  var description = document.getElementById("modal-description");
  var trailerVideo = document.getElementById("trailer-video");

  var crewMembersPromise = getMovieCrewDetails(movie.id).then((crew) => {
    return crew
      .slice(0, 5)
      .map((member) => {
        return member.name; // Return the name of the crew member
      })
      .join(", ");
  });

  crewMembersPromise.then((crewMembers) => {
    director.innerHTML = crewMembers;
  });

  var trailerVideoPromise = getMovieTrailerID(movie.id).then((videos) => {
    const idArr = [];
    return videos.map((video) => {
      if (video.site == "YouTube" && video.type == "Trailer") {
        idArr.push(video.key);
      }
      return idArr;
    });
  });

  trailerVideoPromise.then((trailerVideoID) => {
    trailerVideo.src = "https://www.youtube.com/embed/" + trailerVideoID[0][0];
  });

  title.innerHTML = movie.title;
  year.innerHTML = movie.release_date;
  genres.innerHTML = movie.genre_ids
    ? movie.genre_ids.map((id) => getGenreName(id)).join(", ")
    : "Not Found";
  ratings.innerHTML = movie.vote_average + "/10";
  description.innerHTML = movie.overview;

  modal.style.display = "block";
}
function closeModal() {
  var modal = document.getElementById("movieModal");
  modal.style.display = "none";
}

// Close the modal when clicking outside of it
window.onclick = function (event) {
  var modal = document.getElementById("movieModal");
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

function toggleRecommendSection() {
  var section = document.getElementById("recommend-section");
  section.classList.toggle("show");
}

const buttonGroups = document.querySelectorAll(".button-group");

buttonGroups.forEach((buttonGroup) => {
  buttonGroup.addEventListener("click", (event) => {
    const clickedButton = event.target;
    if (clickedButton.tagName !== "BUTTON") return;

    const selectedButton = buttonGroup.querySelector(".selected");
    if (selectedButton) {
      selectedButton.classList.remove("selected");
    }

    clickedButton.classList.toggle("selected");
  });
});

async function aiRequest() {
  const mood =
    document.querySelector(".button-group button.selected[data-type='mood']")
      ?.innerText || "neutral";
  const genre =
    document.querySelector(".button-group button.selected[data-type='genre']")
      ?.innerText || "any";
  const length =
    document.querySelector(".button-group button.selected[data-type='length']")
      ?.innerText || "medium";

  const message = `Can you recommend 5 movies for a person who is feeling ${mood}, and wants to watch a ${length} length ${genre} movie and also can you give the recommendations in the form of json which will be like {'movie_name': 'reason'} reason is the sentence which explains why you recommend this movie. only give json object`;

  const url = "https://open-ai21.p.rapidapi.com/chatgpt";
  const options = {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": "a6cc142f64msh717235eb0600797p14895ajsn160776a45425",
      "X-RapidAPI-Host": "open-ai21.p.rapidapi.com",
    },
    body: JSON.stringify({
      messages: [
        {
          role: "user",
          content: message,
        },
      ],
      web_access: false,
    }),
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    const parsedData = JSON.parse(data.result);
    console.log(parsedData);

    displayRecommendations(parsedData);
    return parsedData;
  } catch (err) {
    console.error(err);
    return null;
  }
}

async function aiRequestRandomMovies() {
  const message = `Can you recommend 5 movies also can you give the recommendations in the form of json which will be like {'movie_name': 'reason'} reason is the sentence which explains why you recommend this movie. only give json object`;

  const url = "https://open-ai21.p.rapidapi.com/chatgpt";
  const options = {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": "a6cc142f64msh717235eb0600797p14895ajsn160776a45425",
      "X-RapidAPI-Host": "open-ai21.p.rapidapi.com",
    },
    body: JSON.stringify({
      messages: [
        {
          role: "user",
          content: message,
        },
      ],
      web_access: false,
    }),
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    const parsedData = JSON.parse(data.result);
    console.log(parsedData);

    displayRecommendations(parsedData);
    return parsedData;
  } catch (err) {
    console.error(err);
    return null;
  }
}

function createMovieDiv(movieData, filmListContainer, reason) {
  // Create new elements
  const movieDiv = document.createElement("div");
  const image = document.createElement("img");
  const title = document.createElement("h4");
  const description = document.createElement("p");
  const reasonParagraph = document.createElement("p");
  const seeMoreButton = document.createElement("button");
  const addToListsButton = document.createElement("button");
  // Set attributes and text content
  movieDiv.classList.add("movie-card");
  image.src = `https://image.tmdb.org/t/p/original/${movieData.poster_path}`;
  image.alt = `${movieData.title} Poster`;
  title.textContent = movieData.title;
  reasonParagraph.textContent = `Why we selected this movie for you: ${reason}`;
  seeMoreButton.textContent = "See More";
  seeMoreButton.classList.add("see-more-btn");
  seeMoreButton.onclick = function () {
    showModal(movieData);
  };

  // Append elements to movieDiv
  movieDiv.appendChild(image);
  movieDiv.appendChild(title);
  movieDiv.appendChild(description);
  movieDiv.appendChild(reasonParagraph);
  movieDiv.appendChild(seeMoreButton);

  // Append movieDiv to filmListContainer
  filmListContainer.appendChild(movieDiv);
}

async function displayRecommendations(recommendations) {
  const filmListContainer = document.querySelector(".film-list-container");
  filmListContainer.innerHTML = ""; // Clear previous recommendations

  for (const movieName in recommendations) {
    if (recommendations.hasOwnProperty(movieName)) {
      const reason = recommendations[movieName];
      try {
        const movieData = await searchMovie(movieName).then((data) => data[0]);
        if (movieData) {
          createMovieDiv(movieData, filmListContainer, reason);
        } else {
          console.error(`Movie data not found for ${movieName}`);
        }
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    }
  }
}

async function recommendMovies() {
  const data = await aiRequest();
  if (data) {
    const filmListSection = document.getElementById("film-list");
    filmListSection.style.display = "block";
  }
}

async function randomRecommendMovies() {
  const data = await aiRequestRandomMovies();
  if (data) {
    const filmListSection = document.getElementById("film-list");
    filmListSection.style.display = "block";
  }
}

document
  .querySelector(".recommend-based-on-preference")
  .addEventListener("click", recommendMovies);

document
  .querySelector(".recommend-random")
  .addEventListener("click", randomRecommendMovies);

function openModal(filmId) {
  var modal = document.getElementById("myModal");
  var title = document.getElementById("modal-title");
  var year = document.getElementById("modal-year");
  var director = document.getElementById("modal-director");
  var ratings = document.getElementById("modal-ratings");
  var description = document.getElementById("modal-description");
  var trailerVideo = document.getElementById("trailer-video");

  // Assuming you have an object or database containing film details
  var filmDetails = getFilmDetailsById(filmId);

  // Populate modal with film details
  title.innerHTML = filmDetails.title;
  year.innerHTML = filmDetails.year;
  director.innerHTML = filmDetails.director;
  ratings.innerHTML = filmDetails.ratings;
  description.innerHTML = filmDetails.description;

  trailerVideo.src = "https://www.youtube.com/embed/" + filmDetails.trailerId;

  modal.style.display = "block";
}

function getFilmDetailsById(filmId) {
  if (filmId === "potc") {
    return {
      title: "Pirates of the Caribbean: Dead Men Tell No Tales",
      year: "2017",
      director: "Joachim Rønning & Espen Sandberg",
      ratings: "6.5/10",
      description:
        "Captain Jack Sparrow (Johnny Depp) finds the winds of ill-fortune blowing even more strongly when deadly ghost pirates led by his old nemesis, the terrifying Captain Salazar (Javier Bardem), escape from the Devil's Triangle, determined to kill every pirate at sea...including him. Captain Jack's only hope of survival lies in seeking out the legendary Trident of Poseidon, a powerful artifact that bestows upon its possessor total control over the seas.",
      trailerId: "Hgeu5rhoxxY",
    };
  } else if (filmId === "dune2") {
    return {
      title: "Dune: Part Two",
      year: "2024",
      director: "Denis Villeneuve",
      ratings: "8.9/10",
      description:
        "Paul Atreides unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, he endeavors to prevent a terrible future only he can foresee.",
      trailerId: "Way9Dexny3w",
    };
  } else if (filmId === "babyd") {
    return {
      title: "Baby Driver",
      year: "2017",
      director: "Edgar Wright",
      ratings: "7.5/10",
      description:
        "Baby is a young and partially hearing impaired getaway driver who can make any wild move while in motion with the right track playing. It's a critical talent he needs to survive his indentured servitude to the crime boss, Doc, who values his role in his meticulously planned robberies. However, just when Baby thinks he is finally free and clear to have his own life with his new girlfriend, Debora, Doc coerces him back for another job.",
      trailerId: "zTvJJnoWIPk",
    };
  } else if (filmId === "ant") {
    return {
      title: "Ant-man",
      year: "2015",
      director: "Peyton Reed",
      ratings: "7.2/10",
      description:
        "Armed with the astonishing ability to shrink in scale but increase in strength, con-man Scott Lang must embrace his inner-hero and help his mentor, Dr. Hank Pym, protect the secret behind his spectacular Ant-Man suit from a new generation of towering threats. Against seemingly insurmountable obstacles, Pym and Lang must plan and pull off a heist that will save the world.",
      trailerId: "pWdKf3MneyI",
    };
  } else {
    return null; // Handle other cases or return null if film not found
  }
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

/*
<div class="film" onclick="openModal('ant')">
            <img src="/img/antman.jpg" alt="Antman" />
            <h3>Ant-man</h3>
            <div class="add-buttons">
              <button class="watched-btn" onclick="toggleButton(event)">
                Watched
              </button>
              <button class="watch-later-btn" onclick="toggleButton(event)">
                Watch Later
              </button>
            </div>
          </div>
*/
function parseResponse(response) {
  var modal = document.getElementById("myModal");
  var title = document.getElementById("modal-title");
  var year = document.getElementById("modal-year");
  var director = document.getElementById("modal-director");
  var ratings = document.getElementById("modal-ratings");
  var description = document.getElementById("modal-description");
  var trailerVideo = document.getElementById("trailer-video");

  const arr = [];
  return response.json().then((responseJSON) => {
    const results = responseJSON.results;
    const movieNames = results.map((movie) => {
      const movieJSON = {};
      title.innerHTML = movie.title;
      year.innerHTML = movie.release_date;
      director.innerHTML = "filmDetails.director";
      ratings.innerHTML = movie.vote_average;
      description.innerHTML = movie.overview;

      movieJSON["title"] = movie.title;
      movieJSON["overview"] = movie.overview;
      movieJSON["poster_path"] =
        "https://image.tmdb.org/t/p/w500" + movie.backdrop_path;
      movieJSON["release_date"] = movie.release_date;
      movieJSON["rating"] = movie.vote_average;
      arr.push(movieJSON);
    });
    return arr;
  });
}

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMzgzNjlhOGQ3M2Y1OWVmZDk0MjhjMDMxYWE5NGEwYyIsInN1YiI6IjVlZDUzOTg3MWIxNTdkMDAxZjU2ZjMxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.t6oglj_4DkYEeq59zGSFArZw-r9oUG0Rh8mbWCtW6zk",
  },
};

fetch(
  "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
  options
)
  .then((response) => parseResponse(response))
  .then((movieNames) => console.log(movieNames))
  .catch((err) => console.error(err));

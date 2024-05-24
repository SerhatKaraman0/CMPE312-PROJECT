async function fetchData() {
  const url =
    "https://flixster.p.rapidapi.com/reviews/list?emsId=cbad9abb-8440-31a6-8caf-61ae45c2263b&limit=20&offset=0&withComments=true";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "231e8c0a41msh425246a33b3dfb4p1d8bb5jsn65619af7d609",
      "X-RapidAPI-Host": "flixster.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json(); // Parse response as JSON
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}

fetchData(); // Call the async function to start fetching data

function fetchMovieTitle(query) {
  const options = {
      method: 'GET',
      headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5M2E4YmM4MTEyZGU1YzQ5MzczNDRhMTYyM2FhYWRjNyIsInN1YiI6IjY1Y2M4YTUxZWZkM2MyMDE3YzM3OGNhYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Qqn-gB_FimWpdPTbfdAF2y-DzhwdiDahd5TxH0Gshpg'
      }
  };

  const url = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`;

  return fetch(url, options)
      .then(res => res.json())
      .then(json => json.results) // JSON'dan sadece film sonuçlarını al
      .catch(err => console.error('error:' + err));
}

function showMovieResults(movies) {
  const filmListElement = document.getElementById("film-list");
  const filmListContainer = filmListElement.querySelector(".film-list-container");
  filmListContainer.innerHTML = ""; // Temizleme
  if (movies.length > 0) {
      const movieTitles = movies.map(movie => `<p class="film-title">${movie.title} ${movie.release_date}</p>`).join("");
      filmListContainer.innerHTML = movieTitles;
      const filmTitles = document.querySelectorAll(".film-title");
      filmTitles.forEach(title => {
          title.addEventListener("click", function () {
              const selectedFilmsContainer = document.getElementById("selected-film-list");
              const selectedFilmTitle = this.textContent;
              const newFilmDiv = document.createElement("div");
              newFilmDiv.className = "selected-film-item";
              newFilmDiv.innerHTML = `
                  <span>${selectedFilmTitle}</span>
                  <button class="delete-film-button">Delete</button>
              `;
              selectedFilmsContainer.appendChild(newFilmDiv);
              // Film seçildiğinde, listelenen filmleri temizleme
              filmListContainer.innerHTML = "";
              document.getElementById("film-name-input").value = "";
          });
      });
  } else {
      filmListContainer.innerHTML = "<p>No movies found with that name.</p>";
  }
}

document.getElementById("film-name-input").addEventListener("input", function () {
  const filmName = this.value;
  if (filmName.trim() !== "") {
      fetchMovieTitle(filmName)
          .then(showMovieResults)
          .catch((error) => {
              console.error("Error fetching movie data:", error);
          });
  } else {
    updateListStatus(); // Film ismi boşsa, film listesini temizle
  }
});

// Seçilen filmi silme işlevselliği
document.getElementById("selected-films").addEventListener("click", function (event) {
  if (event.target.classList.contains("delete-film-button")) {
      event.target.parentElement.remove();
      updateListStatus(); // Listeyi güncelle
  }
});

// Listeyi güncelleme fonksiyonu
function updateListStatus() {
  const selectedFilmsContainer = document.getElementById("selected-film-list");
  const filmListElement = document.getElementById("film-list");
  const filmListContainer = filmListElement.querySelector(".film-list-container");

  if (selectedFilmsContainer.children.length > 0) {
      filmListContainer.innerHTML = ""; // Temizleme
  } else {
      filmListContainer.innerHTML = "<p>Your list is empty. Add films using the field above, or from the links on a film poster or page.</p>";
  }
}
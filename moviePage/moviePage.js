const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get("id");

const display = document.getElementById("display");

const backButton = document.getElementById("back");

backButton.addEventListener("click", backToHome);

function backToHome() {
  window.location.href = "../index.html";
}

const x = fetch(
  `https://www.omdbapi.com/?i=${movieId}&page=1&apikey=4132a0d5&`
);
x.then(function (response) {
  return response.json();
}).then(function (data) {
  displayMovieDetails(data);
});

function displayMovieDetails(data) {
  const movieMain = document.createElement("div");
  movieMain.className = "movie-main";
  if (data.Poster == "N/A") {
    data.Poster = "../noImage.png";
  }
  movieMain.innerHTML = `
    <div id="poster-details">
    <img src=${data.Poster}
        alt="">
    <div id="movie-extras">
        
        <div id="movie-title">
            <b>${data.Title}</b>
        </div>
        <hr class="line">
        <div class="movie-details-1">
            <p>${data.Type}</p>
            <p>${data.Released}</p>
        </div>
        <div class="movie-details-1">
            <p>${data.Runtime}</p>
            <p>${data.Genre}</p>
        </div>
        <div class="movie-details-2">
            <p>Directed By :-</p>
            <p class="data">${data.Director}</p>
        </div>
        <div class="movie-details-2">
            <p>Actors :-</p>
            <p class="data">${data.Actors}</p>
        </div>
        <div class="movie-details-2">
            <p>Languages :-</p>
            <p class="data">${data.Language}</p>
        </div>
        <hr class="line">
        <div id="plot">
            <p>${data.Plot}</p>
        </div>
        </div>
    </div>
    `;
  display.append(movieMain);
}

const searchInput = document.getElementById("search-input");

const displaySearchItem = document.getElementById("display-Search-Item");

var noSearchItem = displaySearchItem.innerHTML;

const searchBtn = document.getElementById("btn");

const asideMain = document.getElementById("aside-main");

const asideMainFavList = document.getElementById("aside-main-fav-list");

var noFavItem = asideMain.innerHTML;

// Searching functionality-..................................................................
searchInput.addEventListener("input", readSearchInput);
searchBtn.addEventListener("click", readSearchInput);

// Reading INput given by the user
function readSearchInput(e) {
  let searchedItem = searchInput.value.trim();
  if (searchedItem.length > 0) {
    loadSearchItem(searchedItem);
  }
}

// loading movies Array from api according to searched by user;
function loadSearchItem(searchedItem) {
  let x = fetch(
    `https://www.omdbapi.com/?s=${searchedItem}&page=1&apikey=4132a0d5&`
  );
  x.then(function (response) {
    return response.json();
  }).then(function (data) {
    renderList(data.Search);
  });
}
//  display the list on main............

function renderList(resultList) {
  if (resultList != undefined) {
    displaySearchItem.innerHTML = "";
    for (var i = 0; i < resultList.length; i++) {
      let renderItem = document.createElement("div");
      let renderListItem = resultList[i];
      renderItem.classList.add("search-item");
      renderItem.dataset.id = `${renderListItem.imdbID}`;
      renderItem.dataset.is_present = "false";
      if (renderListItem.Poster == "N/A") {
        renderListItem.Poster = "noImage.png";
      }
      renderItem.innerHTML = `
            <img src=${renderListItem.Poster}
          alt="image not available">
        <div class="search-item-details">
          <p>${renderListItem.Title}</p>
          <p>${renderListItem.Year}</p>
          <p>${renderListItem.Type}</p>
        </div>
        <div class="add-fav-info" >
        <i class="fa-solid fa-circle-info" data-id=${renderListItem.imdbID}></i>
          <i class="far fa-heart fa-lg fav-icon"  data-id=${renderListItem.imdbID} data-is_present="false"></i>
        </div>
            `;
      if (displaySearchItem.children.length > 9) {
        displaySearchItem.replaceChild(
          renderItem,
          displaySearchItem.children[i]
        );
      } else {
        displaySearchItem.append(renderItem);
      }
    }
  } else {
    displaySearchItem.innerHTML = noSearchItem;
  }
}

// callingApiToAddMovieInFav
function callingApiToAddMovieInFav(e) {
  if (e.target.dataset.is_present == "false") {
    //Calling api using imdbId
    let x = fetch(
      `https://www.omdbapi.com/?i=${e.target.dataset.id}&page=1&apikey=4132a0d5&`
    );
    x.then(function (response) {
      return response.json();
    }).then(function (data) {
      e.target.dataset.is_present = true;
      addingElementToFavourite(data);
    });
  }
}

// Adding Element to the favourites list;
function addingElementToFavourite(data) {
  let favMovie = document.createElement("li");

  favMovie.dataset.id = `${data.imdbID}`;
  if (data.Poster == "N/A") {
    data.Poster = "noImage.png";
  }
  favMovie.innerHTML = `
    <div class="fav-movies">
    <img src=${data.Poster}
    alt="image not available">
     <div class="fav-movies-details">
      <p>${data.Title}</p>
      <p>${data.Year}</p>
      <p>${data.Type}</p>
      <p>${data.Genre}</p>
    </div>
    <div class="fav-movies-remove-fav">
    <i class="fa-solid fa-circle-info" data-id=${data.imdbID}></i>
    <i class="fa-solid fa-trash-can fa-lg un-fav-icon" data-id=${data.imdbID}></i>
    </div>
    </div>`;
  if (asideMain.innerHTML == noFavItem) {
    asideMain.innerHTML = "";
  }
  asideMainFavList.append(favMovie);
  asideMain.append(asideMainFavList);
  saveData();
}

// Removing element from fav list;
function removeMovieFromFav(e) {
  for (var x = 0; x < asideMainFavList.children.length; x++) {
    if (asideMainFavList.children[x].dataset.id === e.target.dataset.id) {
      asideMainFavList.removeChild(asideMainFavList.children[x]);
    }
    const favIcon = document.getElementsByClassName("fav-icon");
    for (var icon = 0; icon < favIcon.length; icon++) {
      var el = favIcon[icon];
      if (el.dataset.id == e.target.dataset.id) {
        el.dataset.is_present = false;
      }
    }
  }
  if (asideMainFavList.children.length == 0) {
    asideMain.innerHTML = noFavItem;
  }
  saveData();
}

document.addEventListener("click", clickEventHandlers);

function clickEventHandlers(e) {
  if (e.target.className == "far fa-heart fa-lg fav-icon") {
    callingApiToAddMovieInFav(e);
  }

  if (e.target.className == "fa-solid fa-trash-can fa-lg un-fav-icon") {
    removeMovieFromFav(e);
  }

  if (e.target.className == "fa-solid fa-circle-info") {
    window.location.href = `moviePage/moviePage.html?id=${e.target.dataset.id}`;
  }
}
function saveData() {
  localStorage.setItem("xdata", asideMain.innerHTML);
}
function displayData() {
  asideMain.innerHTML = localStorage.getItem("xdata");
}
displayData();

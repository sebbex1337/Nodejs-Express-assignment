import { createArtist, getArtists, updateArtist, deleteArtist, getFavorites, addToFavorite, removeFromFavorite } from "./js-modules/http.js";
import { sortArtists, filterArtists } from "./js-modules/sorting.js";

window.addEventListener("load", initApp);

let selectedArtist;
let artists = [];
let favoriteIds = [];

function initApp() {
	updateAristsGrid();

	document.querySelector("#form-create").addEventListener("submit", createArtistClicked);
	document.querySelector("#form-update").addEventListener("submit", updateArtistClicked);
	document.querySelector("#sort-by").addEventListener("change", sortByChanged);
	document.querySelector("#filter-by").addEventListener("change", filterByChanged);
	document.querySelector("#favoritesCheckBox").addEventListener("change", favoritesClicked);
}

function favoritesClicked(event) {
	const isChecked = event.target.checked;
	console.log(isChecked);
	if (isChecked) {
		displayArtists(favoriteIds);
	} else {
		displayArtists(artists);
	}
}

/* Event functions */
/* CREATE */
async function createArtistClicked(event) {
	event.preventDefault();
	const form = this;
	const name = form.name.value;
	const birthdate = form.birthdate.value;
	const activeSince = form.activeSince.value;
	const genres = form.genres.value;
	const labels = form.labels.value;
	const website = form.website.value;
	const shortDescription = form.shortDescription.value;
	const image = form.image.value;
	const favorite = false;
	const response = await createArtist(name, birthdate, activeSince, genres, labels, website, image, shortDescription, favorite);
	if (response.ok) {
		form.reset();
		updateAristsGrid();
		console.log("Artist added");
	}
}

function selectArtist(artist) {
	selectedArtist = artist;
	const form = document.querySelector("#form-update");
	console.log(selectedArtist);
	form.name.value = artist.name;
	form.birthdate.value = artist.birthdate;
	form.activeSince.value = artist.activeSince;
	form.genres.value = artist.genres;
	form.labels.value = artist.labels;
	form.website.value = artist.website;
	form.image.value = artist.image;
	form.shortDescription.value = artist.shortDescription;

	form.scrollIntoView({ behavior: "smooth" });
}

/* UPDATE */
async function updateArtistClicked(event) {
	event.preventDefault();
	const form = this;
	const name = form.name.value;
	const birthdate = form.birthdate.value;
	const activeSince = form.activeSince.value;
	const genres = form.genres.value;
	const labels = form.labels.value;
	const website = form.website.value;
	const shortDescription = form.shortDescription.value;
	const image = form.image.value;
	const favorite = form.favorite.checked;
	const response = await updateArtist(selectedArtist.id, name, birthdate, activeSince, genres, labels, website, image, shortDescription, favorite);
	if (response.ok) {
		form.reset();
		updateAristsGrid();
		console.log("Artist updated");
	}
}

/* DELETE */
async function deleteArtistClicked(id) {
	const response = await deleteArtist(id);
	if (response.ok) {
		console.log(`Artist deleted ${id}`);
		updateAristsGrid();
	}
}

/* Display functions */
function displayArtists(listOfArtists) {
	document.querySelector("#artists").innerHTML = "";

	if (listOfArtists.length !== 0) {
		for (const artist of listOfArtists) {
			displayArtist(artist);
		}
	} else {
		document.querySelector("#artists").innerHTML = "Sorry! No artists were found";
	}
}

function displayArtist(artist) {
	document.querySelector("#artists").insertAdjacentHTML(
		"beforeend",
		/* HTML */ `
			<article class="grid-item">
				<img src="${artist.image}" />
				<section>
					<h2>${artist.name}</h2>
					<p>Birthdate: ${artist.birthdate}</p>
					<p>Active since: ${artist.activeSince}</p>
					<p>Genres: ${artist.genres}</p>
					<p>Labels: ${artist.labels}</p>
					<a href="${artist.website}">Website</a>
					<p>${artist.shortDescription}</p>
				</section>
				<section class="btns">
					<button class="btn-delete">Delete</button>
					<button class="btn-update">Update</button>
					<button class="btn-add">Add to Favorites</button>
					<button class="btn-remove">Remove from Favorites</button>
				</section>
			</article>
		`
	);
	document.querySelector("#artists article:last-child .btn-update").addEventListener("click", () => selectArtist(artist));
	document.querySelector("#artists article:last-child .btn-delete").addEventListener("click", () => deleteArtistClicked(artist.id));
	document.querySelector("#artists article:last-child .btn-add").addEventListener("click", () => addToFavorite(artist.id));
	document.querySelector("#artists article:last-child .btn-remove").addEventListener("click", () => removeFromFavorite(artist.id));
}

/* Function for updating the artist grid so they don't duplicate */
async function updateAristsGrid() {
	artists = await getArtists();
	favoriteIds = await getFavorites();
	console.log(favoriteIds);
	displayArtists(artists);
	console.log("Reloaded grid");
}

/* Sorting */
function sortByChanged(event) {
	const selectedValue = event.target.value;
	displayArtists(sortArtists(artists, selectedValue));
}

/* Filter */
function filterByChanged(event) {
	const selectedValue = event.target.value;
	displayArtists(filterArtists(artists, selectedValue));
}

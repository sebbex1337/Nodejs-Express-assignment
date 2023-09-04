import { createArtist, getArtists, updateArtist, deleteArtist } from "./js-modules/http.js";

window.addEventListener("load", initApp);

let selectedArtist;

function initApp() {
	updateAristsGrid();

	document.querySelector("#form-create").addEventListener("submit", createArtistClicked);
	document.querySelector("#form-update").addEventListener("submit", updateArtistClicked);
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
	const response = await createArtist(name, birthdate, activeSince, genres, labels, website, image, shortDescription);
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
	const response = await updateArtist(
		selectedArtist.id,
		name,
		birthdate,
		activeSince,
		genres,
		labels,
		website,
		image,
		shortDescription
	);
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
				<h2>${artist.name}</h2>
				<p>Birthdate: ${artist.birthdate}</p>
				<p>Active since: ${artist.activeSince}</p>
				<p>Genres: ${artist.genres}</p>
				<p>Labels: ${artist.labels}</p>
				<a href="${artist.website}">Website</a>
				<p>${artist.shortDescription}</p>
				<section class="btns">
					<button class="btn-delete">Delete</button>
					<button class="btn-update">Update</button>
				</section>
			</article>
		`
	);
	document
		.querySelector("#artists article:last-child .btn-update")
		.addEventListener("click", () => selectArtist(artist));
	document
		.querySelector("#artists article:last-child .btn-delete")
		.addEventListener("click", () => deleteArtistClicked(artist.id));
}

/* Function for updating the artist grid so they don't duplicate */
async function updateAristsGrid() {
	const artists = await getArtists();
	displayArtists(artists);
}

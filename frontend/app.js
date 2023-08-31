import { createArtist, getArtists } from "./js-modules/http.js";

window.addEventListener("load", initApp);

let artists;

function initApp() {
	updateAristsGrid();

	document.querySelector("#form-create").addEventListener("submit", createArtistClicked);
}

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
				<img src="" />
				<h2>${artist.name}</h2>
				<p>Birthdate: ${artist.birthdate}</p>
				<p>Active since: ${artist.activeSince}</p>
				<p>Genres: ${artist.genres}</p>
				<p>Labels: ${artist.labels}</p>
				<a href="${artist.website}">Website</a>
				<p>${artist.shortDescription}</p>
				<section class="btns">
					<button>Delete</button>
					<button>Update</button>
				</section>
			</article>
		`
	);
}

/* Function for updating the artist grid so they don't duplicate */
async function updateAristsGrid() {
	artists = await getArtists();
	displayArtists(artists);
}

const endpoint = "./backend/data";

window.addEventListener("load", initApp);

let artists;

async function initApp() {
	console.log("Running");
	artists = await getArtists();
	console.log(artists);
	displayArtists(artists);
}

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

async function getArtists() {
	const response = await fetch(`${endpoint}/artists.json`);
	const data = await response.json();
	return data;
}

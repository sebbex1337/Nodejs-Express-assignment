import express from "express";
import fs from "fs/promises";
import cors from "cors";

const app = express();
const port = 3333;

app.use(express.json());
app.use(cors());

app.listen(port, () => {
	console.log(`App is running on http://localhost:${port}`);
});

app.get("/artists", async (request, response) => {
	const artists = await getArtists();
	response.json(artists);
});

app.get("/artists/:id", async (request, response) => {
	const id = Number(request.params.id);

	const artists = await getArtists();
	let artistToGet = artists.find((artist) => artist.id === id);

	response.json(artistToGet);
});

app.post("/artists", async (request, response) => {
	const newArtist = request.body;
	console.log(newArtist);
	newArtist.id = new Date().getTime();

	const artists = await getArtists();

	artists.push(newArtist);
	fs.writeFile("./backend/data/artists.json", JSON.stringify(artists));
	response.json(artists);
});

app.put("/artists/:id", async (request, response) => {
	const id = Number(request.params.id);
	console.log(id);

	const artists = await getArtists();
	let artistToUpdate = artists.find((artist) => artist.id === id);
	const body = request.body;
	console.log(body);
	console.log(artistToUpdate);
	artistToUpdate.name = body.name;
	artistToUpdate.birthdate = body.birthdate;
	artistToUpdate.activeSince = body.activeSince;
	artistToUpdate.genres = body.genres;
	artistToUpdate.labels = body.labels;
	artistToUpdate.website = body.website;
	artistToUpdate.image = body.image;
	artistToUpdate.shortDescription = body.shortDescription;
	fs.writeFile("./backend/data/artists.json", JSON.stringify(artists));
	response.json(artists);
});

app.delete("/artists/:id", async (request, response) => {
	const id = Number(request.params.id);
	console.log(id);

	const artists = await getArtists();
	let newArtists = artists.filter((artist) => artist.id !== id);
	fs.writeFile("./backend/data/artists.json", JSON.stringify(newArtists));
	response.json(artists);
});

/* Favorites */
app.get("/favorites", async (request, response) => {
	const favoriteIds = await getFavorites();

	const artists = await getArtists();
	const favorites = artists.filter((artist) => favoriteIds.includes(artist.id));

	response.json(favorites);
});

app.post("/favorites", async (request, response) => {
	const favID = request.body.id;
	const favs = await getFavorites();

	if (!favs.includes(favID)) {
		favs.push(favID);
		writeFavorites(favs);
	}

	const artists = await getArtists();
	const favorites = artists.filter((artist) => favs.includes(artist.id));
	response.json(favorites);
});

app.delete("/favorites/:id", async (request, response) => {
	const favID = Number(request.params.id);
	const favs = await getFavorites();

	if (favs.includes(favID)) {
		const newFavs = favs.filter((id) => id !== favID);
		writeFavorites(newFavs);

		const artists = await getArtists();
		const favorites = artists.filter((artist) => newFavs.includes(artist.id));

		response.json(favorites);
	} else {
		response.status(404).json({ error: "Favorites does not contain the id!" });
	}
});

/* Helper function */
async function getArtists() {
	const data = await fs.readFile("./backend/data/artists.json");
	return JSON.parse(data);
}

async function getFavorites() {
	const data = await fs.readFile("./backend/data/favorites.json");
	return JSON.parse(data);
}

async function writeFavorites(listOfFavorites) {
	fs.writeFile("./backend/data/favorites.json", JSON.stringify(listOfFavorites));
}

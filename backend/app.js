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

/* Helper function */
async function getArtists() {
	const data = await fs.readFile("./backend/data/artists.json");
	return JSON.parse(data);
}

async function getFavorites() {
	const data = await fs.readFile("./backend/data/favorites.json");
	return JSON.parse(data);
}

/* Favorites */
app.get("/favorites", async (request, response) => {
	const favorites = await getFavorites();
	response.json(favorites);
});

app.post("/favorites", async (request, response) => {
	const favorite = await getFavorites();
	const newFavorite = request.body;
});

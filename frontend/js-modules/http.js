const endpoint = "http://localhost:3333";

/* Artists */
async function getArtists() {
	const response = await fetch(`${endpoint}/artists`);
	const data = await response.json();
	return data;
}

async function createArtist(name, birthdate, activeSince, genres, labels, website, image, shortDescription, favorite) {
	const newArtist = {
		name: name,
		birthdate: birthdate,
		activeSince: activeSince,
		genres: genres,
		labels: labels,
		website: website,
		image: image,
		shortDescription: shortDescription,
		favorite: favorite,
	};
	const artistAsJson = JSON.stringify(newArtist);
	const response = await fetch(`${endpoint}/artists`, {
		method: "POST",
		body: artistAsJson,
		headers: {
			"Content-Type": "application/json",
		},
	});
	return response;
}

async function updateArtist(id, name, birthdate, activeSince, genres, labels, website, image, shortDescription, favorite) {
	const artistToUpdate = {
		name: name,
		birthdate: birthdate,
		activeSince: activeSince,
		genres: genres,
		labels: labels,
		website: website,
		image: image,
		shortDescription: shortDescription,
		favorite: favorite,
	};
	const artistAsJson = JSON.stringify(artistToUpdate);
	const response = await fetch(`${endpoint}/artists/${id}`, {
		method: "PUT",
		body: artistAsJson,
		headers: {
			"Content-Type": "application/json",
		},
	});
	return response;
}

async function deleteArtist(id) {
	const response = await fetch(`${endpoint}/artists/${id}`, {
		method: "DELETE",
	});
	return response;
}

/* Favorites */
async function getFavorites() {
	const response = await fetch(`${endpoint}/favorites`);
	const data = await response.json();
	return data;
}

async function addToFavorite(id) {
	const newFav = {
		id: id,
	};
	const newFavAsJson = JSON.stringify(newFav);
	const response = await fetch(`${endpoint}/favorites`, {
		method: "POST",
		body: newFavAsJson,
		headers: {
			"Content-Type": "application/json",
		},
	});
	return response;
}

async function removeFromFavorite(id) {
	const response = await fetch(`${endpoint}/favorites/${id}`, {
		method: "DELETE",
	});
	return response;
}

export { endpoint, getArtists, createArtist, updateArtist, deleteArtist, getFavorites, addToFavorite, removeFromFavorite };

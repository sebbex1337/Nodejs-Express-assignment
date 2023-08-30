const endpoint = "./backend/data";

async function getArtists() {
	const response = await fetch(`${endpoint}/artists.json`);
	const data = await response.json();
	return data;
}

async function createArtist(name, birthdate, activeSince, genres, labels, website, image, shortDescription) {
	const newArtist = {
		id: new Date().getTime(),
		name: name,
		birthdate: birthdate,
		activeSince: activeSince,
		genres: genres,
		labels: labels,
		website: website,
		image: image,
		shortDescription: shortDescription,
	};
	const artistAsJson = JSON.stringify(newArtist);
	const response = await fetch(`${endpoint}/artists.json`, {
		method: "POST",
		body: artistAsJson,
	});
	return response;
}

async function updateArtist(id, name, birthdate, activeSince, genres, labels, website, image, shortDescription) {
	const artistToUpdate = {
		name: name,
		birthdate: birthdate,
		activeSince: activeSince,
		genres: genres,
		labels: labels,
		website: website,
		image: image,
		shortDescription: shortDescription,
	};
	const artistAsJson = JSON.stringify(artistToUpdate);
	const response = await fetch(`${endpoint}/artists/${id}.json`, {
		method: "PUT",
		body: artistAsJson,
	});
	return response;
}

export { endpoint, getArtists, createArtist, updateArtist };

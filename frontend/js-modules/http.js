const endpoint = "http://localhost:3333";

async function getArtists() {
	const response = await fetch(`${endpoint}/artists`);
	const data = await response.json();
	return data;
}

async function createArtist(name, birthdate, activeSince, genres, labels, website, image, shortDescription) {
	const newArtist = {
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
	const response = await fetch(`${endpoint}/artists`, {
		method: "POST",
		body: artistAsJson,
		headers: {
			"Content-Type": "application/json",
		},
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

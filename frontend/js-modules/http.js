const endpoint = "./backend/data";

async function getArtists() {
	const response = await fetch(`${endpoint}/artists.json`);
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
	const response = await fetch(`${endpoint}/artists.json`, {
		method: "POST",
		body: artistAsJson,
	});
	return response;
}

export { endpoint, getArtists, createArtist };

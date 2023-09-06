/* Sorting */
function sortArtists(listOfArtists, sortBy) {
	if (sortBy === "") {
		return listOfArtists;
	}
	if (sortBy === "name") {
		return listOfArtists.sort((artistA, artistB) => artistA.name.localeCompare(artistB.name));
	}
	if (sortBy === "birthdate") {
		return listOfArtists.sort((artistA, artistB) => artistA.birthdate.localeCompare(artistB.birthdate));
	}
	if (sortBy === "activeSince") {
		return listOfArtists.sort((artistA, artistB) => artistA.activeSince.localeCompare(artistB.activeSince));
	}
}

/* Filter */
function filterArtists(listOfArtists, filterBy) {
	switch (filterBy) {
		case "":
			return listOfArtists;
		case "favorites":
			console.log(listOfArtists);
			return listOfArtists.filter((artist) => artist.favorite === true);
		case "Pop":
			return listOfArtists.filter((artist) => artist.genres.includes(filterBy));
		case "Hip-hop":
			return listOfArtists.filter((artist) => artist.genres.includes(filterBy));
		case "R&B":
			return listOfArtists.filter((artist) => artist.genres.includes(filterBy));
		case "Rap":
			return listOfArtists.filter((artist) => artist.genres.includes(filterBy));
		case "Electronic":
			return listOfArtists.filter((artist) => artist.genres.includes(filterBy));
		case "Indie":
			return listOfArtists.filter((artist) => artist.genres.includes(filterBy));
		case "Country":
			return listOfArtists.filter((artist) => artist.genres.includes(filterBy));
		case "Reggae":
			return listOfArtists.filter((artist) => artist.genres.includes(filterBy));
		case "Folk":
			return listOfArtists.filter((artist) => artist.genres.includes(filterBy));
		case "Soul":
			return listOfArtists.filter((artist) => artist.genres.includes(filterBy));
		case "Rock":
			return listOfArtists.filter((artist) => artist.genres.includes(filterBy));
		case "Funk":
			return listOfArtists.filter((artist) => artist.genres.includes(filterBy));
	}
}

/* Searching */
function searchArtists(listOfArtists, searchValue) {
	searchValue = searchValue.toLowerCase();
	return listOfArtists.filter((artist) => artist.name.toLowerCase().includes(searchValue));
}

export { sortArtists, filterArtists, searchArtists };

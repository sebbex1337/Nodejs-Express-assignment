function sortArtists(sortBy) {
	if (sortBy === "name") {
		return artists.sort((artistA, artistB) => artistA.name > artistB.name);
	}
	if (sortBy === "birthdate") {
		return artists.sort((artistA, artistB) => artistA.birthdate > artistB.birthdate);
	}
}

function sortByChanged(event) {
	const selectedValue = event.target.value;
	displayArtists(sortArtists(selectedValue));
}

function filterArtists(filterBy) {
	switch (filterBy) {
		case "":
			return artists;
		case "favorites":
			return artists.filter((artist) => artist.favorite === filterBy);
	}
}
function filterByChanged(event) {
	const selectedValue = event.target.value;
	displayArtists(filterArtists(selectedValue));
}

function searchArtists(searchValue) {
	searchValue = searchValue.toLowerCase();
	return artists.filter((artist) => artist.name.toLowerCase().includes(searchValue));
}
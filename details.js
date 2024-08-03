// Get the game ID from the URL query parameters
const urlParams = new URLSearchParams(window.location.search);
const gameId = urlParams.get('id');

if (gameId) {
    fetchGameDetails(gameId); // Fetch game details if the game ID is present in the URL
} else {
    alert('No game ID provided'); // Alert if no game ID is present
}

/**
 * Function to fetch game details from the RAWG API
 * @param {string} id - The ID of the game to fetch details for
 */
function fetchGameDetails(id) {
    const apiKey = '597efc0e1314442aa3924922abd7d2b9'; // RAWG API key
    const apiUrl = `https://api.rawg.io/api/games/${id}?key=${apiKey}`; // API URL with the game ID and API key

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`); // Throw an error if response is not ok
            }
            return response.json(); // Convert the response to JSON
        })
        .then(data => {
            displayGameDetails(data); // Call the function to display game details
        })
        .catch(error => {
            console.error('Error fetching game details:', error); // Log any errors
            alert('Failed to fetch game details. Please try again later.'); // Alert the user about the error
        });
}

/**
 * Function to display game details on the webpage
 * @param {Object} game - The game object returned by the API
 */
function displayGameDetails(game) {
    document.getElementById('game-title').textContent = game.name; // Set the game title

    // Set the inner HTML of the game details element with the game details
    document.getElementById('game-details').innerHTML = `
        <img src="${game.background_image}" alt="${game.name}">
        <p>Released: ${game.released}</p>
        <p>Rating: ${game.rating}</p>
        <p>${game.description_raw}</p>
        <a href="${game.metacritic_url}" target="_blank">View on Metacritic</a>
    `;
}

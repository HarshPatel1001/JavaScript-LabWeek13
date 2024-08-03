// Event listener for the search button
document.getElementById('searchButton').addEventListener('click', function() {
    const query = document.getElementById('search').value.trim(); // Get the search query and trim whitespace
    if (query) {
        searchGames(query); // Call the function to search for games
    } else {
        alert('Please enter a search term'); // Alert if search query is empty
    }
});

/**
 * Function to search games from the RAWG API
 * @param {string} query - The search query entered by the user
 */
function searchGames(query) {
    const apiKey = '597efc0e1314442aa3924922abd7d2b9'; // RAWG API key
    const apiUrl = `https://api.rawg.io/api/games?key=${apiKey}&search=${query}`; // API URL with the query and API key

    console.log(`Searching for games with query: ${query}`); // Log the search query

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`); // Throw an error if response is not ok
            }
            return response.json(); // Convert the response to JSON
        })
        .then(data => {
            console.log('Data received from API:', data); // Log the data received from the API
            displayGames(data.results); // Call the function to display games
        })
        .catch(error => {
            console.error('Error fetching games:', error); // Log any errors
            alert('Failed to fetch games. Please try again later.'); // Alert the user about the error
        });
}

/**
 * Function to display games on the webpage
 * @param {Array} games - Array of game objects returned by the API
 */
function displayGames(games) {
    const gamesContainer = document.getElementById('games'); // Get the games container element
    gamesContainer.innerHTML = ''; // Clear any previous content

    if (games.length === 0) {
        gamesContainer.innerHTML = '<p>No games found. Please try a different search term.</p>'; // Display message if no games found
        return;
    }

    games.forEach(game => {
        const gameElement = document.createElement('div'); // Create a new div element for each game
        gameElement.classList.add('game'); // Add the 'game' class to the div

        // Set the inner HTML of the game element with the game details
        gameElement.innerHTML = `
            <img src="${game.background_image}" alt="${game.name}">
            <div>
                <h2>${game.name}</h2>
                <p>Released: ${game.released}</p>
                <p>Rating: ${game.rating}</p>
                <a href="game-details.html?id=${game.id}">View Details</a>
            </div>
        `;

        gamesContainer.appendChild(gameElement); // Append the game element to the games container
    });
}

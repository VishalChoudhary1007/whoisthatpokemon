const apiUrl = "https://pokeapi.co/api/v2/pokemon/";
let currentPokemon = null;

// DOM Elements
const pokemonImage = document.getElementById('pokemon-image');
const guessInput = document.getElementById('guess-input');
const submitGuessBtn = document.getElementById('submit-guess');
const resultSection = document.getElementById('result-section');
const revealedImage = document.getElementById('pokemon-revealed');
const pokemonName = document.getElementById('pokemon-name');
const pokemonInfo = document.getElementById('pokemon-info');
const feedback = document.getElementById('feedback');
const playAgainBtn = document.getElementById('play-again');
const guessSection = document.getElementById('guess-section');

// Fetch random Pokémon data
async function fetchRandomPokemon() {
    const randomId = Math.floor(Math.random() * 150) + 1;  // Gen 1 Pokémon (ID 1-151)
    const response = await fetch(`${apiUrl}${randomId}`);
    const data = await response.json();
    currentPokemon = data;
    
    displaySilhouette(data);
}

// Display the silhouette of the Pokémon
function displaySilhouette(pokemon) {
    pokemonImage.src = pokemon.sprites.front_default;
    pokemonImage.style.filter = "brightness(0)";
    pokemonImage.style.maxWidth = "200px";
}

// Handle guess submission
submitGuessBtn.addEventListener('click', () => {
    const userGuess = guessInput.value.toLowerCase();
    if (userGuess === currentPokemon.name) {
        showResult(true);
        let pop=document.getElementById("pop");
        pop.style.display="flex";
    } else {
        showResult(false);
        let pop=document.getElementById("pop");
        // pop.style.display="flex";

    }
});

// Show the result after a guess
function showResult(isCorrect) {
    // Hide the form and silhouette
    guessSection.style.display = 'none';
    pokemonImage.style.display = 'none';
    
    // Display the result section
    resultSection.style.display = 'block';

    // Display the revealed Pokémon image and details
    revealedImage.src = currentPokemon.sprites.other['official-artwork'].front_default;
    revealedImage.classList.add('animated-pokemon'); // Add movement animation
    pokemonName.textContent = `It's ${currentPokemon.name.charAt(0).toUpperCase() + currentPokemon.name.slice(1)}!`;

    let abilities = currentPokemon.abilities.map(ability => ability.ability.name).join(', ');
    let types = currentPokemon.types.map(type => type.type.name).join(', ');

    pokemonInfo.textContent = `Type: ${types}, Abilities: ${abilities}`;

    // Provide feedback
    feedback.textContent = isCorrect ? 'Well done!' : 'Better luck next time!';
}

// Play again and reload a new Pokémon
playAgainBtn.addEventListener('click', () => {
    resultSection.style.display = 'none';
    guessSection.style.display = 'block';
    pokemonImage.style.display = 'block';
    guessInput.value = '';
    fetchRandomPokemon();
});

// Initialize game
fetchRandomPokemon();

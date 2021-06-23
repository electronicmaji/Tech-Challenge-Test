// Exercise Requirements
// Please create an app that displays a group of the Pokemon characters and metadata from an external API. This exercise will use the PokeApi (https://pokeapi.co/docs/v2.html) as the main data source to list Pokemon from the following endpoint: https://pokeapi.co/api/v2/pokemon.
// Use Javascript to retrieve the first 20 entries from the provided endpoint
// Each Pokemon entry displayed should include the following information:
// - Name of the pokemon
// - Image of the pokemon
// - Height in decimetres with the label height,
// - Weight in hectograms with label weight,
// - Abilities display in a comma-separated list with the label abilities
// For this challenge, there’s no design comp. Instead, we want to see how you experiment with CSS and limited design direction. To inform your app’s design please use the following guidelines:
// Display each Pokemon in a card format (http://ui-patterns.com/patterns/cards).
// Cards should display in a grid layout with (3-4 columns) for desktop and larger viewports and a single column for mobile or smaller viewports. Use CSS Grid or Flex-box to build the layout.
// Header
// To give users an overview of the Pokemon collection, create a page header that highlights the following data points:
// The average weight of all the Pokemon listed
// The name of pokemon with the most “base_experience”

// Extra Credit
// Add pager links to see the next 20 results or the previous 20 results if available.
// If no results are available the respective pager links should be disabled.
// Display the image of for each pokeman in the card

// Assumptions
// We have provided some utility functions to fetch data from the API and insert markup into the DOM. You are free to modify these functions and/or create your own.
// To implement the JavaScript portion of the assignment you may use any JavaScript library or framework (ie jQuery, React).
// For the styling portion of the assignment, you must write your own custom SCSS or CSS. You may not use Bootstrap or a similar framework. The font family, font weights and branding colors are availble as CSS custom properties.
// The written code should be production quality.
// The app should be responsive and functional in the current versions of Chrome and FF.

// Endpoint for pokemon list
const API_URL = "https://pokeapi.co/api/v2/pokemon";

/**
 * Fetches data from a given API endpoint.
 * @param {string} API_URL - URL of the API endpoint.
 * @return {Promise} - Promise that resolves as a JSON object of the response.
 */

async function fetchData(API_URL) {
  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
}

//Fetch additional API data into an array to ease implementation of sprite images, abilities, average of weight, and base experience.

async function fetchPokemons() {
  const arr = [];
  const data = await fetchData(API_URL);
  for (let item of data.results) {
    const pokeData = await fetchData(item.url);
    root.appendChild(generateCard(pokeData));
    arr.push(pokeData);
  }
  const experience = arr.reduce((prev, current) => {
    return prev.base_experience > current.base_experience ? prev : current; //Variable to find highest base_experience using reducer function to compare each value
  });
  const sum = arr.reduce((n, { weight }) => n + weight, 0); //Variable to add together weight of first 20 pokémon using reducre function 
  weightElem.innerHTML = Math.round (sum / arr.length); //Output average of weights to HTML via division by number of pokémon.
  nameElem.innerHTML = experience.name; //Output result of experience variable to HTML by Pokemon Name

}

fetchPokemons(); //Execute additional async function

const weightElem = document.getElementById("weight"); //Write average of weights to weight ID 
const nameElem = document.getElementById("experience"); //Write highest Base experience to name ID

/**
 * Creates DOM element.
 * @param {string} elementTagName - URL of the API endpoint.
 * @param {string[]} cssClasses - Array of string class names.
 * @return {Element} - New DOM element.
 */
const createElement = (elementTagName, cssClasses) => {
  const element = document.createElement(elementTagName);

  if (cssClasses) {
    element.classList.add(...cssClasses);
  }
  return element;
};


/**
 * Creates a card item.
 * @param {Object} data - Data to display in card.
 * @param {string} data.name - Name of Pokemon.
 * @param {string} data.weight - Pokemon's weight, as it should be displayed.
 * @param {string} data.height - Pokemon's height, as it should be displayed.
 * @param {string} data.sprites.front_default - Pokemon's sprite imagee.
 * @return {HTMLElement} - HTML element with card content.
 */
const generateCard = (data) => {
  const cardElement = createElement("div", ["cards"]);
  const abilities = data.abilities //Variable created to map the abilities data from the API
    .map(({ ability }) => ability.name)
    .join(", ");
  const cardMarkup = `
  <div class="card">
    <div class="sprites"><img src="${data.sprites.front_default}"></div>
    <h3 class="card-name">${data.name}</h3>
    <div class="sub-grid">
      <div class="card-weight">${data.weight}</div>
      <div class="card-height">${data.height}</div>
      <div class="sub-weight">WEIGHT</div>
      <div class="sub-height">HEIGHT</div>
    </div>
    <br>
    <!---Output Abilities as comma separated list --->
    <div class="card-abilities">${abilities}</div>
    <div class="sub-abilities">ABILITIES</div
    

  </div>
`;
  cardElement.innerHTML = cardMarkup; 
  return cardElement;
};






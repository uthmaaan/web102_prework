/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
 */

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from "./games.js";

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA);

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
 */

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
  // loop over each item in the data
  games.forEach((game) => {
    // create a new div element, which will become the game card
    const div = document.createElement("div");
    // add the class game-card to the list
    div.classList.add("game-card");
    ////////
    const gameImg = document.createElement("img");
    gameImg.classList.add("game-img");
    gameImg.src = `${game.img}`;
    ///////
    const gameName = document.createElement("h4");
    gameName.classList.add("game-name");
    gameName.innerHTML = `${game.name}`;
    ////////
    const gameDes = document.createElement("p");
    gameDes.classList.add("game-description");
    gameDes.innerHTML = `${game.description}`;
    ///////
    const gameBacker = document.createElement("p");
    gameBacker.classList.add("game-backer");
    gameBacker.innerHTML = `Backer: ${game.backers}`;
    //////
    // set the inner HTML using a template literal to display some info
    // about each game
    // TIP: if your images are not displaying, make sure there is space
    // between the end of the src attribute and the end of the tag ("/>")
    div.appendChild(gameImg);
    div.insertAdjacentElement("beforeend", gameName);
    div.insertAdjacentElement("beforeend", gameDes);
    div.insertAdjacentElement("beforeend", gameBacker);
    // append the game to the games-container
    document.querySelector("#games-container").appendChild(div);
  });
}
addGamesToPage(GAMES_JSON);

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
 */

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");
// use reduce() to count the number of total contributions by summing the backers
const totalBackers = GAMES_JSON.reduce((acc, game) => acc + game.backers, 0);
// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `
${totalBackers.toLocaleString("en-US")}
`;
// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const totalPledged = GAMES_JSON.reduce((acc, game) => acc + game.pledged, 0);
// set inner HTML using template literal
raisedCard.innerHTML = `
$${totalPledged.toLocaleString("en-US")}
`;
// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
const totalGames = GAMES_JSON.length;
gamesCard.innerHTML = `
${totalGames}
`;

// let ani = ["huu", "jiii", "kiii"];
// let firts = ani.reduce((sum, annn) => {
//   return annn.charAt(0);
// }, "");
// console.log(firts);
/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
 */

// show only games that do not yet have enough funding
function filterUnfundedOnly(games) {
  deleteChildElements(gamesContainer);

  // use filter() to get a list of games that have not yet met their goal
  const unfundedGames = games.filter((game) => {
    if (game.goal > game.pledged) return game;
  });
  // use the function we previously created to add the unfunded games to the DOM
  addGamesToPage(unfundedGames);
}

// show only games that are fully funded
function filterFundedOnly(games) {
  deleteChildElements(gamesContainer);

  // use filter() to get a list of games that have met or exceeded their goal
  const fundedGames = games.filter((game) => {
    if (game.pledged > game.goal) return game;
  });
  // use the function we previously created to add unfunded games to the DOM
  addGamesToPage(fundedGames);
}

// show all games
function showAllGames(games) {
  deleteChildElements(gamesContainer);

  // add all games from the JSON data to the DOM
  addGamesToPage(games);
}
showAllGames(GAMES_JSON);
// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
// unfundedBtn.addEventListener("click", filterUnfundedOnly(GAMES_JSON));
unfundedBtn.addEventListener("click", function () {
  filterUnfundedOnly(GAMES_JSON);
});
fundedBtn.addEventListener("click", function () {
  filterFundedOnly(GAMES_JSON);
});
allBtn.addEventListener("click", function () {
  showAllGames(GAMES_JSON);
});
/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
 */

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games

const totalUnfundedGames = GAMES_JSON.filter(
  (game) => game.goal > game.pledged
);

// create a string that explains the number of unfunded games using the ternary operator
const displayStr = `
A total of $${totalPledged.toLocaleString(
  "en-US"
)} has been raised for 4 games. Currently, ${
  totalUnfundedGames.length
} games remains unfunded. We need your help to fund these amazing games!
`;
// create a new DOM element containing the template string and append it to the description container
const newPara = document.createElement("p");
newPara.innerHTML = displayStr;
descriptionContainer.appendChild(newPara);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames = GAMES_JSON.sort((item1, item2) => {
  return item2.pledged - item1.pledged;
});

function firstSecond(games) {
  const [firstGame, secondGame] = sortedGames;

  const firstGameEl = document.createElement("div");
  firstGameEl.classList.add("runner-game-card");
  //////////
  const firstGameImg = document.createElement("img");
  firstGameImg.classList.add("game-img");
  firstGameImg.src = `${firstGame.img}`;
  /////////
  const firstGameName = document.createElement("h4");
  firstGameName.classList.add("game-name");
  firstGameName.innerHTML = `${firstGame.name}`;
  /////////
  const firstGameDes = document.createElement("p");
  firstGameDes.classList.add("game-description");
  firstGameDes.innerHTML = `${firstGame.description}`;
  ////////////
  const firstGameBacker = document.createElement("p");
  firstGameBacker.classList.add("game-backer");
  firstGameBacker.innerHTML = `${firstGame.backers}`;
  ////////////
  firstGameEl.appendChild(firstGameImg);
  firstGameEl.appendChild(firstGameName);
  firstGameEl.appendChild(firstGameDes);
  firstGameEl.appendChild(firstGameBacker);
  /////////////
  firstGameContainer.appendChild(firstGameEl);
  //////////
  const secondGameEl = document.createElement("div");
  secondGameEl.classList.add("runner-game-card");
  //////////
  const secondGameImg = document.createElement("img");
  secondGameImg.classList.add("game-img");
  secondGameImg.src = `${secondGame.img}`;
  /////////
  const secondGameName = document.createElement("h4");
  secondGameName.classList.add("game-name");
  secondGameName.innerHTML = `${secondGame.name}`;
  /////////
  const secondGameDes = document.createElement("p");
  secondGameDes.classList.add("game-description");
  secondGameDes.innerHTML = `${secondGame.description}`;
  ////////////
  const secondGameBacker = document.createElement("p");
  secondGameBacker.classList.add("game-backer");
  secondGameBacker.innerHTML = `${secondGame.backers}`;
  ////////////
  secondGameEl.appendChild(secondGameImg);
  secondGameEl.appendChild(secondGameName);
  secondGameEl.appendChild(secondGameDes);
  secondGameEl.appendChild(secondGameBacker);
  /////////////
  secondGameContainer.appendChild(secondGameEl);
}
firstSecond(GAMES_JSON);

// Additional Funtionality
const modal = document.querySelector("#search-game-container");
const overlay = document.querySelector(".overlay");
const form = document.querySelector(".form");
const searchBar = document.querySelector("#search");
const searchGameContainer = document.getElementById("search-game-container");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const searchedGame = searchBar.value;

  const gamesName = GAMES_JSON.reduce((acc, game) => {
    acc.push(game.name);
    return acc;
  }, []);
  console.log(gamesName);
  //////
  const matchedGame = GAMES_JSON.reduce((acc, game) => {
    if (game.name.includes(searchedGame)) {
      acc.push(game);
    }
    return acc;
  }, []);

  if (matchedGame) {
    matchedGame.forEach((game) => {
      const searchGameModal = document.createElement("div");
      searchGameModal.classList.add(".game-card");
      searchGameModal.classList.add(".hidden");
      //////////
      const searchGameImg = document.createElement("img");
      searchGameImg.classList.add("game-img");
      searchGameImg.src = `${game.img}`;
      /////////
      const searchGameName = document.createElement("h4");
      searchGameName.classList.add("game-name");
      searchGameName.innerHTML = `${game.name}`;
      /////////
      const searchGameDes = document.createElement("p");
      searchGameDes.classList.add("game-description");
      searchGameDes.innerHTML = `${game.description}`;
      ////////////
      const searchGameBacker = document.createElement("p");
      searchGameBacker.classList.add("game-backer");
      searchGameBacker.innerHTML = `${game.backers}`;
      ////////////
      searchGameModal.appendChild(searchGameImg);
      searchGameModal.appendChild(searchGameName);
      searchGameModal.appendChild(searchGameDes);
      searchGameModal.appendChild(searchGameBacker);
      /////////////
      modal.appendChild(searchGameModal);
    });
  }
  if (matchedGame.length === 0) {
    const noMatchCard = document.createElement("div");
    noMatchCard.classList.add(".game-card");
    noMatchCard.classList.add(".hidden");

    const noMatchMessage = document.createElement("p");
    noMatchMessage.classList.add("game-name");
    noMatchMessage.innerHTML = `Sorry we don't have any matching to "${searchedGame}" on our games list. Look below to find all our games.`;

    noMatchCard.appendChild(noMatchMessage);

    return modal.appendChild(noMatchCard);
  }

  console.log(matchedGame);
  ////////Clearing
  searchBar.value = "";
  //////////////////////
});

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
  deleteChildElements(searchGameContainer);
};

form.addEventListener("submit", openModal);

overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

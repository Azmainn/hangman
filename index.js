import { words } from "./words.en.js";

let theWord = randomWord(words);
const alphabets = "abcdefghijklmnopqrstuvwxyz";
let guesses = [];

//Elements
const divWord = document.querySelector(".word-display");
const divButtons = document.querySelector(".alphabet-container");
const divGuesses = document.querySelector(".wrong-guesses");
const divGame = document.querySelector(".game-container");
const failureSection = document.querySelector(".correct-word");
const hangmanPart = document.querySelectorAll(".hangman-part");
const newGameButton = document.querySelector(".new-game-btn");
const gameStatus = document.querySelector(".game-status");

// Event Handlers
divButtons.addEventListener("click", function (e) {
  if (e.target.matches(".letter-btn")) {
    const letter = e.target.dataset.letter;
    guess(letter);

    e.target.classList.add("disabled");
    e.target.classList.add(theWord.includes(letter) ? "correct" : "incorrect");
    generateLetters();
    updateWrongGuesses();
    revealHangman(getNumberOfWrongGuesses());

    if (isWon()) {
      divGame.classList.add("game-won");
    }

    if (isLost()) {
      divGame.classList.add("game-lost");
      failureSection.innerHTML = `${theWord}`;
    }
  }
});

document.addEventListener("click", function (e) {
  console.log();
  if (e.target.matches(".new-game-btn")) {
    newGame();
  }
});

//Generators

function randomWord(words) {
  let number = Math.floor(Math.random() * words.length);
  return words[number];
}

function newGame() {
  if (isWon()) {
    divGame.classList.remove("game-won");
  }
  if (isLost()) {
    divGame.classList.remove("game-lost");
  }

  guesses = [];
  clearHangman();
  theWord = randomWord(words);
  generateLetters();
  generateButtons();
  updateWrongGuesses();
}

function generateButtons() {
  divButtons.innerHTML = Array.from(alphabets)
    .map(
      (l) =>
        `<button class="letter-btn ${
          !guesses.includes(l)
            ? ""
            : theWord.includes(l)
              ? "correct disabled"
              : "incorrect disabled"
        }"  data-letter="${l}">${l.toUpperCase()}</button>`,
    )
    .join("");
}

function generateLetters() {
  divWord.innerHTML = Array.from(theWord)
    .map(
      (l) => `<span class="word-letter">
        ${guesses.includes(l) ? l.toUpperCase() : "_"}
    </span>`,
    )
    .join("");
}

function updateWrongGuesses() {
  divGuesses.innerHTML = `<span>Wrong guesses: </span>
                    <span class="wrong-count">${getNumberOfWrongGuesses()}</span>
                    <span>/6</span>`;
}

function getNumberOfWrongGuesses() {
  return guesses.filter((l) => !theWord.includes(l)).length;
}

function isWon() {
  return Array.from(theWord).every((l) => guesses.includes(l));
}

function isLost() {
  return getNumberOfWrongGuesses() === 6;
}

function guess(l) {
  guesses.push(l);
}

function revealHangman(number) {
  hangmanPart.forEach((part, wrongGuess) => {
    part.classList.toggle("revealed", wrongGuess < number);
  });
}

function clearHangman() {
  hangmanPart.forEach((e) => e.classList.remove("revealed"));
}

isWon();
isLost();

generateLetters();

generateButtons();

getNumberOfWrongGuesses();
updateWrongGuesses();

'use strict';

// Selecting elements
const playerZero = document.querySelector('.player--0');
const playerOne = document.querySelector('.player--1');
const scoreZero = document.querySelector('#score--0');
const scoreOne = document.querySelector('#score--1');
const currentScoreZero = document.getElementById('current--0');
const currentScoreOne = document.getElementById('current--1');

const diceElement = document.querySelector('.dice');
const btnNewGame = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Declaring variables
let scores, currentScore, activePlayer, playing;

// Starting conditions
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  scoreZero.textContent = 0;
  scoreOne.textContent = 0;
  currentScoreZero.textContent = 0;
  currentScoreOne.textContent = 0;

  diceElement.classList.add('hidden');
  playerZero.classList.remove('player--winner');
  playerOne.classList.remove('player--winner');
  playerZero.classList.add('player--active');
  playerOne.classList.remove('player--active');
};

init();

const switchPlayers = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  playerZero.classList.toggle('player--active');
  playerOne.classList.toggle('player--active');
};

// Rolling dice functionality

btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2.Display the dice
    diceElement.classList.remove('hidden');
    diceElement.src = `./Pictures/dice-${dice}.png`;

    // 3. Check if the dice is 1
    if (dice !== 1) {
      // Add dice to current score
      currentScore = currentScore + dice;
      document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    } else {
      // Switch to next player
      switchPlayers();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active player's total score
    scores[activePlayer] += currentScore;
    // scores[1] = scores[1] + currentScore; for player one
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

    // 2. Check if the player's score is >= 100
    if (scores[activePlayer] >= 100) {
      // Finish the game
      playing = false;
      diceElement.classList.add('hidden');
      document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
      document.querySelector(`.player-${activePlayer}`).classList.remove('player--active');
    } else {
      // Switch the player
      switchPlayers();
    }
  }
});

// Reset the game

btnNewGame.addEventListener('click', init);

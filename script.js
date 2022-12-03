'use strict';

//selecting elements
const score0El = document.querySelector(`#score--0`);
const score1El = document.querySelector(`#score--1`); //can be used getElementById
const current0El = document.getElementById(`current--0`);
const current1El = document.getElementById(`current--1`);
const diceEl = document.querySelector(`.dice`);
const btnNew = document.querySelector(`.btn--new`);
const btnRoll = document.querySelector(`.btn--roll`);
const btnHold = document.querySelector(`.btn--hold`);
const player0El = document.querySelector(`.player--0`);
const player1El = document.querySelector(`.player--1`);
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  //toggler- if class is there, it will remove it, and its not there, it will add
  player0El.classList.toggle(`player--active`);
  player1El.classList.toggle(`player--active`);
};

//starting conditions
let scores, currentScore, activePlayer, playing; //defining variables outside of the function

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  diceEl.classList.add(`hidden`);
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  player0El.classList.remove(`player--winner`);
  player1El.classList.remove(`player--winner`);
  player0El.classList.add(`player--active`);
  player1El.classList.remove(`player--active`);
};
//rolling dice functionallity
btnRoll.addEventListener(`click`, function () {
  if (playing) {
    //1. generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    //2. display the dice
    diceEl.classList.remove(`hidden`);
    diceEl.src = `dice-${dice}.png`;
    //3. check for rolled 1
    if (dice !== 1) {
      //Add dice to current score
      currentScore += dice; // adds dice to current score
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // if rolled 1, switch to another player
      switchPlayer();
    }
  }
});
init();
btnHold.addEventListener(`click`, function () {
  if (playing) {
    //1. add current score to active players score
    //scores[1]=scores[1]+curretnScore
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //2.check if palyers score is >=100
    if (scores[activePlayer] >= 20) {
      playing = false;
      diceEl.classList.add(`hidden`);
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add(`player--winner`);
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove(`player--active`);
    } else {
      // finish the game
      // switch to the next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener(`click`, init());

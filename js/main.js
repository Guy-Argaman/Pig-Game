'use strict'

// true: player 1, false: player 2;
let playerTurn = true;
let win = false;

function init() {
    restartGame();
}

function restartGame() {
    let totalScorePlayerOne = document.querySelector('#score--0');
    let totalScorePlayerTwo = document.querySelector('#score--1');
    let scorePlayerOne = document.querySelector('#current--0');
    let scorePlayerTwo = document.querySelector('#current--1');
    let playerOne = document.querySelector('.player--0');
    let playerTwo = document.querySelector('.player--1');
    let msg = document.querySelector('.msg');

    msg.style.display = 'none';
    totalScorePlayerOne.innerText = 0;
    totalScorePlayerTwo.innerText = 0;
    scorePlayerOne.innerText = 0;
    scorePlayerTwo.innerText = 0;
    win = false;
    playerTurn = true;
    playerOne.classList.add('player--active');
    playerTwo.classList.remove('player--active');
}

function rollDice() {

    let randomNum = getRandomInt(1, 6);
    let dice = document.querySelector('.dice');
    let score = document.querySelector('.player--active .current-score');
    let playerOne = document.querySelector('.player--0');
    let playerTwo = document.querySelector('.player--1');

    if (win) {
        return;
    }
    dice.src = `/img/dice-${randomNum}.png`;


    if (randomNum !== 1) {
        score.innerText = +score.innerText + randomNum;

    } else {
        score.innerText = 0;
        playerOne.classList.remove('player--active');
        playerTwo.classList.add('player--active');

        if (!playerTurn) {
            playerOne.classList.add('player--active');
            playerTwo.classList.remove('player--active');
        }
        playerTurn = !playerTurn;
    }
}

function addScore() {
    let totalScore = document.querySelector('.player--active .score');
    let score = document.querySelector('.player--active .current-score');
    let playerOne = document.querySelector('.player--0');
    let playerTwo = document.querySelector('.player--1');

    if (win) {
        return;
    }
    if (+score.innerText === 0) {
        return;
    }
    if (playerTurn) {
        playerOne.classList.remove('player--active');
        playerTwo.classList.add('player--active');
        totalScore.innerText = Number(totalScore.innerText) + +score.innerText;
        score.innerText = 0;
    } else if (!playerTurn) {
        totalScore.innerText = Number(totalScore.innerText) + +score.innerText;
        playerOne.classList.add('player--active');
        playerTwo.classList.remove('player--active');
        score.innerText = 0;
    }
    checkVictory();
    playerTurn = !playerTurn;
}

function checkVictory() {
    let totalScorePlayerOne = document.querySelector('#score--0').innerText;
    let totalScorePlayerTwo = document.querySelector('#score--1').innerText;
    let msg = document.querySelector('.msg')
    let playerOne = document.querySelector('.player--0');
    let playerTwo = document.querySelector('.player--1');

    if (totalScorePlayerOne >= 100) {
        msg.innerText = 'PLAYER ONE WINS!';
        msg.style.display = 'block';
        win = true;
        playerOne.classList.toggle('player--active')
        playerTwo.classList.toggle('player--active')
        return;
    }
    else if (totalScorePlayerTwo >= 100) {
        msg.innerText = 'PLAYER TWO WINS!';
        msg.style.display = 'block';
        win = true;
        playerOne.classList.toggle('player--active')
        playerTwo.classList.toggle('player--active')
        return;
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}
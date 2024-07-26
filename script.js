// script.js

const startPage = document.querySelector('.start-page');
const gamePage = document.querySelector('.game-page');
const onePlayerBtn = document.getElementById('one-player-btn');
const twoPlayersBtn = document.getElementById('two-players-btn');
const choices = document.querySelectorAll('.choice');
const playerChoice = document.getElementById('playerChoice');
const computerChoice = document.getElementById('computerChoice');
const roundResult = document.getElementById('roundResult');
const body = document.body;

let gameMode = '';
let player1Choice = '';
let player2Choice = '';

onePlayerBtn.addEventListener('click', () => {
    gameMode = 'onePlayer';
    startPage.style.display = 'none';
    gamePage.style.display = 'block';
    body.style.background = '#ADD8E6'; // light blue
    playGame();
});

twoPlayersBtn.addEventListener('click', () => {
    gameMode = 'twoPlayers';
    startPage.style.display = 'none';
    gamePage.style.display = 'block';
    body.style.background = '#ADD8E6'; // light blue
    playGame();
});

function playGame() {
    if (gameMode === 'onePlayer') {
        // 1 player game logic
        choices.forEach(choice => {
            choice.addEventListener('click', () => {
                const playerSelection = choice.id;
                const computerSelection = getComputerChoice();
                const result = determineWinner(playerSelection, computerSelection);
                displayResults(playerSelection, computerSelection, result);
            });
        });
    } else if (gameMode === 'twoPlayers') {
        // 2 players game logic
        choices.forEach(choice => {
            choice.addEventListener('click', () => {
                if (player1Choice === '') {
                    player1Choice = choice.id;
                    alert('Player 1 has chosen ' + player1Choice);
                    choices.forEach(choice => {
                        choice.disabled = true;
                    });
                    setTimeout(() => {
                        choices.forEach(choice => {
                            choice.disabled = false;
                        });
                    }, 1000);
                } else if (player2Choice === '') {
                    player2Choice = choice.id;
                    alert('Player 2 has chosen ' + player2Choice);
                    const result = determineWinner(player1Choice, player2Choice);
                    displayResults(player1Choice, player2Choice, result, 'Player 1', 'Player 2');
                    player1Choice = '';
                    player2Choice = '';
                }
            });
        });
    }
}

// Define game choices as constants
const CHOICES = {
    ROCK: 'rock',
    PAPER: 'paper',
    SCISSORS: 'scissors',
    LIZARD: 'lizard',
    SPOCK: 'spock',
};

// Define game rules
const GAME_RULES = {
    [CHOICES.ROCK]: [CHOICES.SCISSORS, CHOICES.LIZARD],
    [CHOICES.PAPER]: [CHOICES.ROCK, CHOICES.SPOCK],
    [CHOICES.SCISSORS]: [CHOICES.PAPER, CHOICES.LIZARD],
    [CHOICES.LIZARD]: [CHOICES.SPOCK, CHOICES.PAPER],
    [CHOICES.SPOCK]: [CHOICES.ROCK, CHOICES.SCISSORS],
};

// Function to get computer choice
function getComputerChoice() {
    const choicesArray = Object.values(CHOICES);
    return choicesArray[Math.floor(Math.random() * choicesArray.length)];
}

// Function to determine the winner
function determineWinner(playerSelection, computerSelection) {
    if (playerSelection === computerSelection) {
        return "It's a tie!";
    } else if (GAME_RULES[playerSelection].includes(computerSelection)) {
        return 'You win!';
    } else {
        return 'Computer wins!';
    }
}

// Function to display the results
function displayResults(playerSelection, computerSelection, result, player1, player2) {
    if (gameMode === 'onePlayer') {
        playerChoice.textContent = `Your choice: ${playerSelection} `;
        computerChoice.textContent = `Computer's choice: ${computerSelection} `;
    } else if (gameMode === 'twoPlayers') {
        playerChoice.textContent = `${player1}'s choice: ${playerSelection} `;
        computerChoice.textContent = `${player2}'s choice: ${computerSelection} `;
    }
    roundResult.textContent = result;

    // Update background color based on the result
    if (result === 'You win!' || result === `${player1} wins!`) {
        body.style.background = '#C6F7D0'; // pastel green
    } else if (result === 'Computer wins!' || result === `${player2} wins!`) {
        body.style.background = '#FFC5C5'; // baby pink
    } else {
        body.style.background = '#ADD8E6'; // light blue
    }
}
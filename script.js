const submitButton = document.getElementById('submit');
const playerInputSection = document.querySelector('.player-input');
const gameBoardSection = document.querySelector('.game-board');
const messageDiv = document.querySelector('.message');
const cells = document.querySelectorAll('.cell');

let player1 = '';
let player2 = '';
let currentPlayer = '';
let currentPlayerName = '';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

// Winning combinations for Tic Tac Toe
const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

// Function to switch players
function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    currentPlayerName = currentPlayer === 'X' ? player1 : player2;
    messageDiv.textContent = `${currentPlayerName}, you're up!`;
}

// Function to check for winner
function checkWinner() {
    let won = false;
    winningCombinations.forEach(combination => {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            won = true;
        }
    });

    if (won) {
        messageDiv.textContent = `${currentPlayerName} congratulations, you won!`;
        gameActive = false;
    } else if (!board.includes('')) {
        messageDiv.textContent = "It's a draw!";
        gameActive = false;
    }
}

// Function to handle cell click
function handleCellClick(e) {
    const cell = e.target;
    const cellIndex = cell.id - 1;

    if (board[cellIndex] !== '' || !gameActive) return;

    board[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;

    checkWinner();
    if (gameActive) switchPlayer();
}

// Function to start the game
function startGame() {
    player1 = document.getElementById('player-1').value || 'Player 1';
    player2 = document.getElementById('player-2').value || 'Player 2';

    currentPlayer = 'X';
    currentPlayerName = player1;

    messageDiv.textContent = `${currentPlayerName}, you're up!`;

    playerInputSection.classList.add('hidden');
    gameBoardSection.classList.remove('hidden');
}

// Event listeners
submitButton.addEventListener('click', startGame);
cells.forEach(cell => cell.addEventListener('click', handleCellClick));

// script.js
const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetButton = document.getElementById("reset");

let currentPlayer = "X";
let gameState = Array(9).fill(null);
let gameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function handleCellClick(e) {
    const cell = e.target;
    const index = cell.getAttribute("data-index");

    if (gameState[index] || !gameActive) return;

    gameState[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add("taken");

    if (checkWin()) {
        statusText.textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
    } else if (gameState.every(cell => cell)) {
        statusText.textContent = "It's a draw!";
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusText.textContent = `Player ${currentPlayer}'s turn`;
    }
}

function checkWin() {
    return winningConditions.some(combination => {
        return combination.every(index => gameState[index] === currentPlayer);
    });
}

function resetGame() {
    gameState.fill(null);
    currentPlayer = "X";
    gameActive = true;
    statusText.textContent = "Player X's turn";
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("taken");
    });
}

cells.forEach(cell => cell.addEventListener("click", handleCellClick));
resetButton.addEventListener("click", resetGame);
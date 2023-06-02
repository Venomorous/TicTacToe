const cellElements = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const winningMessageElement = document.getElementById("winning-message");
const winningMessageTextElement = document.querySelector(
    "[data-winning-message-text]"
);
const restartButton = document.getElementById("restart");
const scoreX = document.getElementById("scoreX");
const scoreO = document.getElementById("scoreO");
const scoreDraw = document.getElementById("draws");
let circleTurn;
const X_CLASS = "x";
const CIRCLE_CLASS = "o";
const WINNING_COMBINATIONS = [
    [0, 1, 2], // 1st row
    [3, 4, 5], // 2nd row
    [6, 7, 8], // 3rd row
    [0, 3, 6], // 1st column
    [1, 4, 7], // 2nd column
    [2, 5, 8], // 3rd column
    [0, 4, 8], // 1st diagonal
    [2, 4, 6], // 2nd diagonal
];

let xCounter = 0;
let oCounter = 0;
let drawCounter = 0;

startGame();

restartButton.addEventListener("click", startGame);

function startGame() {
    scoreX.innerText = `X won ${xCounter} times`;
    scoreO.innerText = `O won ${oCounter} times`;
    scoreDraw.innerText = `Draws: ${drawCounter}`;
    circleTurn = false;
    cellElements.forEach((cell) => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(CIRCLE_CLASS);
        cell.removeEventListener("click", handleClick);
        cell.addEventListener("click", handleClick, { once: true });
    });
    setBoardHoverClass();
    winningMessageElement.classList.remove("show");
}

function handleClick(e) {
    const cell = e.target;
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;

    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
        console.log("winner");
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
        setBoardHoverClass();
    }
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}

function swapTurns() {
    circleTurn = !circleTurn;
}

function setBoardHoverClass() {
    board.classList.remove(X_CLASS);
    board.classList.remove(CIRCLE_CLASS);
    if (circleTurn) {
        board.classList.add(CIRCLE_CLASS);
    } else {
        board.classList.add(X_CLASS);
    }
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some((combination) => {
        return combination.every((index) => {
            return cellElements[index].classList.contains(currentClass);
        });
    });
}

function endGame(draw) {
    if (draw) {
        winningMessageTextElement.innerText = "Draw!";
        drawCounter++;
    } else {
        if (circleTurn) {
            winningMessageTextElement.innerText = "O Wins!";
            oCounter++;
        } else {
            winningMessageTextElement.innerText = "X Wins!";
            xCounter++;
        }
        // winningMessageTextElement.innerText = `${
        //     circleTurn ? "O's" : "X's"
        // } Wins!`;
    }
    winningMessageElement.classList.add("show");
}

function isDraw() {
    return [...cellElements].every((cell) => {
        return (
            cell.classList.contains(X_CLASS) ||
            cell.classList.contains(CIRCLE_CLASS)
        );
    });
}
